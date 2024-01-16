const mongoose=require('mongoose');

const blogSchema=new mongoose.Schema({
    content:{
    type:String,
    required:true
    },

    title:{
        type:String,
        required:true
    },

    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }


},{
    timestamps:true
});

const Blog=mongoose.model('Blog',blogSchema);
module.exports=Blog;