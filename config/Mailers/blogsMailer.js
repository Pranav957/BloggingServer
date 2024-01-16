const nodeMailer=require('../nodemailer');

exports.newBlog=(blog)=>{
    console.log('Inside new blog mailer',blog);
    let htmlString=nodeMailer.renderTemplate({blog:blog},'/BlogMailer.ejs');

    nodeMailer.transporter.sendMail({
        from:'kulkarnipranav54@gmail.com',
        to:blog.author.email,
        subject:"New blog published!",
        // html:'<h1>yup,Your blog is now published!</h1>'
        html:htmlString
    },(err,info)=>{
        if(err)
        {
            console.log('error in sending mail',err);
            return;
        }

        console.log("message sent",info);
        return;
    });

}