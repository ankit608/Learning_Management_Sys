import express from 'express'
import { registrationUse, socialAuth, updateAccessToken, updateUserinfo } from '../controller/controller'
import { activateUser } from '../controller/controller';
import { loginUser } from '../controller/controller';
import { LogoutUser } from '../controller/controller';
import { isAuthenticated } from '../middleware/auth';
import { authorizeRoles } from '../middleware/auth';
import { updateProfilePicture } from '../controller/controller';
const UserRouter = express.Router();

UserRouter.post('/registration',registrationUse)
UserRouter.post('/activate-user',activateUser)
UserRouter.post("/login",loginUser)
UserRouter.post('/logout',isAuthenticated,LogoutUser)
UserRouter.get("/refreshtoken",updateAccessToken)
UserRouter.get("/me",isAuthenticated,updateAccessToken)
UserRouter.post("/socialAuth",socialAuth)
UserRouter.put("/update-user",isAuthenticated,updateUserinfo)
UserRouter.put("/update-user-avatar",isAuthenticated,updateProfilePicture)
export default  UserRouter