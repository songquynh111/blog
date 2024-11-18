import express from 'express';
import siteController from '../app/controllers/SiteController.js'; // Thêm .js vào cuối đường dẫn

const router = express.Router();

router.get('/search', siteController.search);
router.get('/', siteController.index);

export default router;
