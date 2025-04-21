// blog.routes.js
import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import { authMiddleware } from "../middlewares/user.middleware.js";
import {
  createBlogs,
  getAllBlogs,
  getSingleBlog,
  updateBlogs,
  deleteBlog
} from "../controllers/blog.controller.js";

const router = Router();


router.use(authMiddleware);


router
  .route("/")
  .get(getAllBlogs) 
  .post(
    upload.fields([
      {
        name: "avatar",
        maxCount: 1,
      },
    ]),
    createBlogs 
  );

router
  .route("/:id")
  .get(getSingleBlog)     
  .patch(
    upload.fields([
      {
        name: "avatar",
        maxCount: 1,
      },
    ]),
    updateBlogs            
  )
  .delete(deleteBlog);      

export default router;
