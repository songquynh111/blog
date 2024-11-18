import express from "express";
import courseController from "../app/controllers/CourseController.js"; // Đảm bảo thêm .js vào đường dẫn

const router = express.Router();

router.get("/create", courseController.create);
router.post("/store", courseController.store);
router.get("/:slug", courseController.show);
router.get("/:id/edit", courseController.edit);
router.post("/hanlde-form-action", courseController.handleFormAction);
router.put("/:id", courseController.update);
router.delete("/:id", courseController.destroy);
router.delete("/:id/force", courseController.forceDestroy);
router.patch("/:id/restore", courseController.restore);

export default router;
