import mongoose, { Document, model, Schema } from "mongoose";
import { IUser } from "./usermodel";
export interface IChat extends Document {
  Sender: IUser["_id"];
  Receiver: IUser["_id"];
  Context: string;
  timestamp: Date;
  Status: string;
  isArchieve: Boolean;
  Type: String;
}
const ChatSchema: Schema = new Schema({
  Sender: { type: Schema.Types.ObjectId, ref: "User" },
  Receiver: { type: Schema.Types.ObjectId, ref: "User" },
  Context: { type: String },
  Type: { type: String, enum: ["Text", "File", "Image"] },
  timestamp: { type: Date, default: Date.now },
  Status: { type: String, enum: ["sent", "delivered", "read"] },
  isArchieve: { type: Boolean, default: false },
});

const Chatmodel = model<IChat>("chatData",ChatSchema,"chatData")
export default Chatmodel
