const express=require('express');
const path=require('path');
const bodyparser=require('body-parser')
const port=8005;

const passportJWT=require('./config/passport-jwt-strategy');
const db=require('./config/mongoose');
const Blog=require('./models/blog');


const app=express();

app.use(express.json());
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(bodyparser.urlencoded({extended:false}));
app.use(express.static('assets'));
app.use('/',require('./routes'));

//middleware1
// app.use(function(req,res,next){
//     console.log("middleware 1 called");
//     req.myName="pranav"
//     next();
// });


// //middleware2
// app.use(function(req,res,next){
//     console.log("middleware 1 called",req.myName);
//     req.myName="Arpan"
//     next();
// })

var blogs=[
    {
        id:1,
        title:"title1",
        content:"content1"
    },
    {
        id:2,
        title:"title2",
        content:"content2"
    },
    {
        id:3,
        title:"title3",
        content:"content3"
    }
]

app.get('/',function(req,res){
    // console.log(req);
    // res.send('<h1>its running</h1>');

    Blog.find({}).then(function(blogs1){
        
        return res.render('home',{
            title:"my blogging app",
            blogs:blogs1
        });
    }).catch(function(err){
        console.log('Error occured while fetching blogs');
        res.status(500).send('Internal Server Error');
    })
    // return res.render('home',{
    //     title:"my blogging app",
    //     blogs:blogs
    // });
})

app.post('/create-blog',function(req,res){
    // blogs.push(req.body);
    Blog.create(req.body).then(function(newBlog){
        
        console.log("***********",newBlog);
        return res.redirect('back');
        // return res.redirect('/');  //back
    }).catch(function(err){
        
            console.log('Error in creating Blog');
            res.status(500).send("Internal server error");
        
    });
    
})

app.get('/delete-blog/:id',function(req,res){
    console.log(req.params);  //console.log(req.query);
    let id=req.params.id;      //let id=req.query.id

    Blog.findByIdAndDelete(id).then(function(){
        console.log('blog deleted successfully');
        return res.redirect('back');
    }).catch(function(err){
        
            console.log("Error while deleting blog");
            res.status(500).send("Internal server error");
    });

    // let blogIndex=blogs.findIndex((blog)=>blog.id==id);
    // if(blogIndex!=-1)
    // {
    //     blogs.splice(blogIndex,1);
    // }

    // return res.redirect('back');
})

app.listen(port,function(err){
    if(err)
    {
        console.log("Error in running server");
    }
    console.log('Server is up and running on port',port);
})