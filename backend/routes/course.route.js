import express from "express"
import { isAuthenticated } from "../middleware/isAuthenticated.js"
import { createCourse, createLecture, deleteCourse, editCourse, editLecture,  getCourseById, getCourseLecture, getCreatorCourses, getPublishedCourse, removeLecture, togglePublishedCourse} from "../controllers/course.controller.js"
import { singleUpload } from "../middleware/multer.js"

const router = express.Router()
router.post('/', isAuthenticated, createCourse);

// 2. Get all published courses
router.get('/published-courses', getPublishedCourse);

// 3. Get creator's own courses
router.get('/', isAuthenticated, getCreatorCourses);

// 4. Lecture routes (most specific FIRST)
router.get('/:courseId/lecture', isAuthenticated, getCourseLecture);
router.post('/:courseId/lecture', isAuthenticated, createLecture);
router.post('/:courseId/lecture/:lectureId', isAuthenticated, editLecture);

// 5. Remove a lecture
router.delete('/lecture/:lectureId', isAuthenticated, removeLecture);

// 6. Course-level operations
router.get('/:courseId', isAuthenticated, getCourseById);
router.put('/:courseId', isAuthenticated, singleUpload, editCourse);
router.patch('/:courseId', togglePublishedCourse);
router.delete('/:courseId', isAuthenticated, deleteCourse);





export default router;