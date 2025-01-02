import { Request, Response } from "express";
import { Types } from 'mongoose'; 
import Chatmodel from "../Schemas/chatmodel";
import Usermodel from "../Schemas/usermodel";
export class chatcontroller {
  static async createChat(req: Request, res: Response): Promise<any> {
    try {
      const { Context, Type } = req.body;
      const { UserID, ParticipantID } = req.params;
      if (!UserID || !ParticipantID || !Context || !Type) {
        return res
          .status(400)
          .json({ error: "Sender, receiver, and Context are required" });
      }
      const findUserID = await Usermodel.findOne({
        _id: req.params.UserID,
        isArchieve: false,
      });
      const findparticipant = await Usermodel.findOne({
        _id: req.params.ParticipantID,
        isArchieve: false,
      });

      if (!findUserID && !findparticipant) {
        return res.send("UserID or ParticipantID not recognized");
      } else {
        // Create a new message
        const newMessage = new Chatmodel({
          Sender: UserID,
          Receiver: ParticipantID,
          Context: Context,
          Type: Type,
          Status: "sent", // Default status
        });

        await newMessage.save();
        return res.status(201).json({ newMessage });
      }
    } catch (error: any) {
      return res.status(500).send(error.message);
    }
  }

  static async ListChatDetails(req: Request, res: Response):Promise<any> {
    try {
      const FindUser = await Usermodel.findOne({ _id: req.params.UserID,isArchieve:false });
      if (!FindUser) {
        return res.send("User Not found");
      } else {
        const ListDetails = await Chatmodel
          .find({ $or:[{Sender: req.params.UserID},{Receiver:req.params.UserID }]})
          .sort({ timestamp: -1 })
          .select("Context timestamp Type")
          .populate({
            path: "Receiver",
            model: Usermodel,
            select: "Username Profilepicture Role Email",
          })
          .populate({
            path: "Sender",
            model: Usermodel,
            select: "Username Profilepicture Role Email",
          });;

         // Map to store the latest message for each unique user
         const latestMessagesMap = new Map<string, any>();

         for (const message of ListDetails) {
          const sendercheck = message.Sender as any
          const receivercheck = message.Receiver as any
           const isSender = sendercheck._id.toString() === req.params.UserID;
           const otherUser = isSender ? receivercheck : sendercheck;
           const otherUserId = otherUser._id.toString();
   
           // Update map if there's no entry or if the current message is more recent
           if (
             !latestMessagesMap.has(otherUserId) ||
             new Date(message.timestamp) >
               new Date(latestMessagesMap.get(otherUserId).timestamp)
           ) {
             // Store only the other user's Username and Profilepicture
             latestMessagesMap.set(otherUserId, {
               _id: message._id,
               User: {
                 _id: otherUser._id,
                 Username: otherUser.Username,
                 Profilepicture: otherUser.Profilepicture,
                 Email:otherUser.Email,
                 Role:otherUser.Role
               },
               Context: message.Context,
               timestamp: message.timestamp,
               Type:message.Type
             });
           }
         }
   
         // Convert the map values to an array and send as response
         const latestMessages = Array.from(latestMessagesMap.values());
         return res.status(200).send(latestMessages);
      }
    } catch (error: any) {
      return res.status(500).send(error.message);
    }
  }

  static async listofchat(req: Request, res: Response) {
    try {
      const skip = parseInt(req.params.skipValue, 10);
      const limit = parseInt(req.params.limitValue, 10);
      const { UserID, ParticipantID } = req.params;
      const findUserID = await Usermodel.findOne({ _id: UserID,isArchieve:false });
      const findparticipant = await Usermodel.findOne({ _id: ParticipantID,isArchieve:false });
      if (!findUserID || !findparticipant) {
        return res.status(404).send("UserID or ParticipantID not recognized");
      }
      if (
        !(findUserID._id instanceof Types.ObjectId) || 
        !(findparticipant._id instanceof Types.ObjectId) ||
        !findUserID._id.equals(UserID) ||
        !findparticipant._id.equals(ParticipantID)
      ) {
        return res.status(400).send("UserID or ParticipantID do not match");
      } else {
        const datas = await Chatmodel
          .find({
            $or: [
              { Sender: findUserID._id, Receiver: findparticipant._id },
              { Sender: findparticipant._id, Receiver: findUserID._id },
            ],isArchieve:false
          })
          .sort({ timestamp: -1 })
          .skip(skip)
          .limit(limit);
        const reversedData = datas.reverse();
        res.json(reversedData);
      }
    } catch (error: any) {
      return res.status(500).send(error.message);
    }
  }
}
