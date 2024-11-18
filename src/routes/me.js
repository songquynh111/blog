import express from 'express';
import meController from '../app/controllers/MeController.js'; // Đảm bảo thêm .js vào đường dẫn

const router = express.Router();

router.get('/stored/courses', meController.storedCourses);

export default router;
