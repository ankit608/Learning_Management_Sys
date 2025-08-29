import express from "express"
import { editCourse, getCourseByUser, getSingleCourse, uploadCourse } from "../controller/course.controller"
import { authorizeRoles, isAuthenticated } from "../middleware/auth"
import { getAllCourses } from "../controller/course.controller"
import { addAnswer } from "../controller/course.controller" 
const courseRouter = express.Router()

courseRouter.post("/create-course",isAuthenticated,authorizeRoles("admin"),uploadCourse)
courseRouter.put("/edit-course",isAuthenticated,authorizeRoles("admin"),editCourse)
courseRouter.get("/get-course/:id",getSingleCourse)
courseRouter.get("/get-courses",getAllCourses)
courseRouter.get("/get-course-content/:id",isAuthenticated,getCourseByUser)
courseRouter.post("/add-answer",isAuthenticated,addAnswer)

export default courseRouter