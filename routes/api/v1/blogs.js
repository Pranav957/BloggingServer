const express = require('express');
const router = express.Router();
const passport=require('passport');

const blogApi=require("../../../controllers/api/v1/BlogsController");

router.get('/getAllBlogs',blogApi.getBlogs);
// router.get('/getAllBlogs',passport.authenticate('jwt',{session:false}),blogApi.getBlogs);
router.get('/getBlog/:id',passport.authenticate('jwt',{session:false}),blogApi.getBlogById);
router.post('/createBlog',passport.authenticate('jwt',{session:false}),blogApi.createBlog);
router.put('/updateBlog/:id',passport.authenticate('jwt',{session:false}),blogApi.updateBlog);
router.delete('/deleteBlog/:id',passport.authenticate('jwt',{session:false}),blogApi.deleteBlog);

module.exports = router;