import express from "express"
import userRoutes from '../Routes/userRoutes'
const apigateway = express()
apigateway.use(express.json())
apigateway.use('/api/users',userRoutes)
export default apigateway