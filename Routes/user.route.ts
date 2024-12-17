import express from 'express'
import { registrationUse, updateAccessToken } from '../controller/controller'
import { activateUser } from '../controller/controller';
import { loginUser } from '../controller/controller';
import { LogoutUser } from '../controller/controller';
import { isAuthenticated } from '../middleware/auth';
import { authorizeRoles } from '../middleware/auth';
const UserRouter = express.Router();

UserRouter.post('/registration',registrationUse)
UserRouter.post('/activate-user',activateUser)
UserRouter.post("/login",loginUser)
UserRouter.post('/logout',isAuthenticated,LogoutUser)
UserRouter.get("/refreshtoken",updateAccessToken)
export default  UserRouter