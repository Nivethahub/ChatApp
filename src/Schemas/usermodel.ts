import mongoose, { Document, model, Schema } from "mongoose";
export interface IUser extends Document {
  userName: string;
  Email: string;
  passWord: string;
  profilePicture: string;
  role: string;
  isArchieve: boolean;
  createdAt: number;
  updatedAt: number;
  Organization: string;
  token: string;
  tokenCreatedAt?: Date;
  recentlyviewedScence: mongoose.Types.ObjectId;
}

const UserSchema: Schema = new Schema({
    userName: { type: String, unique: true },
    Email: { type: String, required: true, unique: true },
    passWord: { type: String, required: true },
  profilePicture: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    default: "User",
    enum: ["User", "Admin", "Owner"],
  },
  isArchieve: { type: Boolean, default: false },
  tokenCreatedAt: { type: Date },
  Organization: { type: String },
  token: { type: String },
  createdAt: { type: Number, default: Date.now() },
  updatedAt: { type: Number, default: Date.now() },
  recentlyviewedScence: { type: Schema.Types.ObjectId, ref: "Scene" },
});


const Usermodel = model<IUser>("UserData",UserSchema,"UserData")
export default Usermodel

