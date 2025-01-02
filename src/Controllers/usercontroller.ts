import { Response, Request } from "express";
import Usermodel from "../Schemas/usermodel";
export class UserController {
  static async Signup(req: Request, res: Response):Promise<any> {
    try {
      const { Email, passWord, userName } = req.body;
      console.log('req.bod: ', req.body)
      if (!(Email && passWord && userName))
        return res.status(400).send("All input were compulsory");
      const userExists = await Usermodel.findOne({
        Email: Email,
        userName: userName,
      });
      if (userExists)
        return res.status(409).json({ message: "User already Signedup" });
      const newUser = await Usermodel.create({ Email, userName, passWord });
      console.log('newUser: ', newUser);
      if (newUser)
        return res.status(201).json({ message: "User created successfully" });
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
  }

  static async Login(req: Request, res: Response):Promise<any> {
    try {
      const { Email, passWord } = req.body;
      if (!(Email && passWord))
        return res.status(400).send("All input were compulsory");
      const confirm_email = await Usermodel.findOne({
        Email: Email,
      });
      if (confirm_email) {
        const confirm_pwd = await Usermodel.findOne({Email:confirm_email.Email,passWord:passWord})
        if (confirm_pwd) {
          return res.status(200).json({message:"user loggedIn successfully"})
        } else {
          return res.status(404).json({message:"Invalid password"})
        }
      } else {
        return res.status(404).json({message:"Invalid MailID"})
      }
      
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
  }
}
