require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

//Contact Us begining
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const SendmailTransport = require('nodemailer/lib/sendmail-transport')

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

//CONTACT US
app.use(bodyParser.urlencoded({
    extended : true
}))

app.get('/',(req,res) =>{
    res.send(`<h1 style = 'text-align:center; color:blue;'>Welcome to my Home page`)

})


app.post('/api/sendEmail',(req,res) =>{
    res.send("Yes i got")
    let data = req.body
    console.log(data)
    const transporter = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user : 'dharshan8088@gmail.com',
            pass : 'urbcnyzuiannngvu'
        }
    })
    const mailOptions = {
        from : 'dharshan8088@gmail.com',
        to : 'dharshanss.20cse@kongu.edu,aadishn.20cse@kongu.edu,gokulk.20cse@kongu.edu',
        subject : 'Message From Client',
        html : `
        <ul>
            <li><h1 style = 'color :green ';>Name : ${data.fname}</h1></li>
            <li><h1 style = 'color :blue ';>Phone_Number  : ${data.phonenumber}</h1></li>
            <li><h1 style = 'color :red ';>Email  : ${data.email}</h1></li>
            <li><h1 style = 'color :pink ';>Message  : ${data.message}</h1></li>
        </ul>
        `
    }
    transporter.sendMail(mailOptions ,(error,info) =>{
        if(error){
            console.log(error)
        } else {
            console.log(`Email Sent : ${info.response}`)
        }
    } )
    transporter.close()
})


// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
 
