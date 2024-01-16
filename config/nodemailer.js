const nodeMailer=require("nodemailer");
const ejs=require('ejs'); 
const path=require('path');

let transporter=nodeMailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    auth:{
        user:'kulkarnipranav54@gmail.com',
        pass:'onoz ixqh tzbd eybq'
    }
});



let renderTemplate=(data,relativePath)=>{
    let mailHtml;
    ejs.renderFile(path.join(__dirname,'../views/mailers',relativePath),data,function(err,template){
        if(err)
          {
            console.log('error in rendering Template',err);
            return ;
          }
          mailHtml=template;
    }
    );
    return mailHtml;
}

module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}

// user:'recruitmenttrackerteams@gmail.com',
// pass:'hcvvadymyvzsjmjc'