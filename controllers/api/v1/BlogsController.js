const Blog = require('../../../models/blog'); 
const blogMailer=require('../../../config/Mailers/blogsMailer')

module.exports.getBlogs = async function(req, res) {
    try {
        const blogs = await Blog.find().sort('-createdAt').populate('author');
        return res.json(200, { message: "List of blogs", blogs });
    } catch (error) {
        return res.json(500, { message: "Internal Server Error" });
    }
};

module.exports.getBlogById = async function(req, res) {
    try {
        const blog = await Blog.findById(req.params.id).populate('author');
        if (!blog) {
            return res.json(404, { message: "Blog not found" });
        }
        return res.json(200, { message: "Blog found", blog });
    } catch (error) {
        console.log(error);
        return res.json(500, { message: "Internal Server Error" });
    }
};

module.exports.createBlog = async function(req, res) {
    try {
        const { content, title, author } = req.body;
        let newBlog = await Blog.create({ content, title, author });
        newBlog=await newBlog.populate('author','name email');
        blogMailer.newBlog(newBlog);
        return res.json(201, { message: "Blog created successfully", blog: newBlog });
    } catch (error) {
        console.log("error is here>>>>>>>>>>>>>>>>>>>",error);
        return res.json(500, { message: "Internal Server Error" });
    }
};

module.exports.updateBlog = async function(req, res) {
    try {
          const blog1= await Blog.findById(req.params.id);
          if (!blog1) {
            return res.json(404, { message: "Blog not found" });
        }
          if(blog1.author!=req.user.id)
          {
               return res.status(200).json({message:"You Can't Update This Blog"});
          }
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        return res.json(200, { message: "Blog updated successfully", blog: updatedBlog });
    } catch (error) {
        return res.json(500, { message: "Internal Server Error" });
    }
};

module.exports.deleteBlog = async function(req, res) {
    try {
        const blog=await Blog.findById(req.params.id);
        if (!blog) {
            return res.json(404, { message: "Blog not found" });
        }
        if(blog.user==req.user.id)
        {
            const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
            return res.json(200, { message: "Blog deleted successfully", blog: deletedBlog });
        }
        else{
            return res.status(401).json({message:"you cant DELETE this post!!"});
        }

    } catch (error) {
        return res.json(500, { message: "Internal Server Error" });
    }
};

