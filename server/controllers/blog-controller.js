const Blog = require("../models/blog-model");



exports.addblog = async (req, res) => {
  try {
    const { title, description, author, role } = req.body;
    const image = req.file.path;
    const newBlog = new Blog({ title, description, author, role, image });
    await newBlog.save();
    console.log(newBlog);
    return res.status(200).json({ success: true, message: "blog added ." });

  } catch (error) {
    console.log("Blog not created", error);
    res.status(500).json({ message: "Blog not created" });
  }
}

exports.fetchAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ created: -1 });
    res.status(200).json({ success: true, blogs });

  } catch (error) {
    res.status(500).json({ error: "Internal serber error" });
  }
}

exports.getDisById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    console.log(blog);
    if (!blog) {
      res.status(400).json({ error: "no blog found" });
    }
    res.status(200).json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ error: "Internal serber error" });
  }
}

exports.incrementViews = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    blog.viwes = (blog.viwes || 0) + 1;
    await blog.save();
    return res.status(200).json({ success: true, viwes: blog.viwes });
  } catch (error) {
    return res.status(500).json({ message: "Error incrementing views" });
  }
};

exports.toggleLike = async (req, res) =>  {
 
  const { liked } = req.body;
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    blog.likes = Math.max(blog.likes + (liked ? 1 : -1), 0);
    await blog.save();
    res.json({ likes: blog.likes });
  } catch (err) {
    res.status(500).json({ message: "Error toggling like" });
  }
}
