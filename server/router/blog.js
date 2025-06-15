const router = require("express").Router();
const Blogcontroller = require("../controllers/blog-controller");
const upload=require("../middelware/Image_upload");

router.get("/fetchAllBlogs",Blogcontroller.fetchAllBlogs);
router.post("/addblog" ,upload.single("image"),Blogcontroller.addblog);
router.get("/blogs/:id" ,Blogcontroller.getDisById);
router.put('/blogs/:id/views', Blogcontroller.incrementViews);
router.put('/blogs/:id/like', Blogcontroller.toggleLike);

module.exports =router;