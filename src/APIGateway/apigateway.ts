import express from "express"
import userRoutes from '../Routes/userRoutes'
import chatRoutes from '../Routes/chatRoutes' 
const apigateway = express()
apigateway.use(express.json())
apigateway.use('/api/users',userRoutes)
apigateway.use('/api/chats',chatRoutes)
export default apigateway