import express from 'express';
import newsController from '../app/controllers/NewsController.js'; // Đảm bảo thêm .js vào đường dẫn

const router = express.Router();

router.get('/:slug', newsController.show);
router.get('/', newsController.index);

export default router;
