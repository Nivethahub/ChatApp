import express from "express"
import { chatcontroller } from "../Controllers/chatcontroller"
const router = express.Router()
router.post("/newchat/:UserID/:ParticipantID",chatcontroller.createChat)
router.get("/chatdatas/:UserID",chatcontroller.ListChatDetails)
router.get("/datas/:UserID/:ParticipantID/:skipValue/:limitValue",chatcontroller.ListChatDetails)
export default router