const express = require("express");
const { createPost,updatePost,deletePost,getPost,getAllPost } = require("../controllers/posts.controllers")
const router = express.Router();

//create post
router.post('/create',createPost);
//update post
router.put('/:id',updatePost);
//delete post 
router.delete('/:id',deletePost);
//get post
router.get('/:id',getPost);
//get all posts
router.get('/',getAllPost);

module.exports=router