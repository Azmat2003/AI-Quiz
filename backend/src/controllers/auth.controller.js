// signup, login, logout, forget-password
import User from "../models/user.model.js";
import {hash, compare} from 'bcrypt';
import jwt from 'jsonwebtoken';
import welcomeEmail from "../emails/welcome.js"; 
import { sendEmail } from "../services/email.service.js";
import forgotPasswordEmail from "../emails/forgotpassword.js";

const signup = async (req, res)=>{
    try{
        // const {name, email, password} = req.body;
        const user = req.body;

        // hashing the password
        const hashedPwd = await hash(user.password, 10);
        const newUser = {...user, password : hashedPwd};

        // store it in db
        const db_res = await User.create(newUser);
        console.log(db_res);

        // send an email to the user when he/she registers
        const to = user.email;
        const subject = "Congratuations, You've been registered!";
        const link = `${process.env.FRONTEND_BASE_URL}/login`;    // login
        const html = welcomeEmail(user.name, link);
        const mail_response = await sendEmail(to, subject, html);

        // send the response
        res.status(201).json({
            message : "User created succesfully, Please Login",
            user : db_res
        })

    }
    catch(err){
        return res.status(500).json({
            message : "Internal Server Error"
        })
    }
}

const login = async (req, res)=>{
    try{
        // req.body => email, pwd
        const {email, password : pwd} = req.body;

        console.log(req.body);

        // look for the user in db
        const data = await User.findOne({email});

        if(!data){
            return res.status(401).json({
                message : "User does not exist",
            })
        }

        // compare pwd
        const hashedPwd = data.password;
        const result = await compare(pwd, hashedPwd);
        
        console.log("result", result);
        if(!result){
            return res.status(401).json({
                message : "Incorrect password or email"
            })
        }

        // generate jwt token
        const payload = {
            id : data._id,
            // email, pwd, other data
        }

        console.log(payload);

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY
        )

        console.log("token", token);

        // 1. in cookies
        res.cookie('token', token, {
            httpOnly: true, // restrict the access of cookie via JavaScript code
        });

        // 2. inside json
        return res.status(201).json({
            message : "Logged in",
            user : {
                name: data.name,
            }
            // token,
        })
    }
    catch(err){
        return res.status(500).json({
            message : "Internal Server Error"
        })
    }
}

const logout = (req, res)=>{
    console.log("Inside logout");
    try{
        console.log("try logout");
        res.clearCookie('token');
        console.log("try logout");

        return res.status(201).json({
            message : "Logout success"
        })
    }
    catch(err){
        return res.status(500).json({
            message : "Internal Server Error"
        })
    }
}

const forgotPassword = async (req, res)=>{
    try{
        const { email } = req.body;

        const user = await User.findOne({email : email});

        if(!user){
            return res.status(404).json({
                message : "User not found"
            })
        }

        // genrate a token
        const payload = {
            id : user._id
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn : "1D"
        });

        // send an email
        // email template
        const to = email;
        const subject = "Reset Password Mail";
        // link => localhost:5173/reset-password/token
        const link = `${process.env.FRONTEND_BASE_URL}/reset-password/${token}`
        const html = forgotPasswordEmail(link);

        const response = await sendEmail(to, subject, html);

        return res.json({
            message : "Password Reset Link has been shared to your email"
        })
    }
    catch(err){
        return res.status(500).json({
            message : "Server Error"
        })
    }
}

const resetPassword = async (req, res) => {
    try {
        // 1. token => params
        const { token } = req.params;
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized. Token not found",
            });
        }

        // 2. password for update
        const { password } = req.body;

        // 3. verify token
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // 4. id from token
        const id = payload.id;

        // 5. search in DB
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({
                message : "User Not Found"
            })
        }

        // 6. Hash the new pwd
        const hashedPwd = await hash(password, 10);

        // 7. Update in DB
        const resposne = await User.findByIdAndUpdate(id, {password : hashedPwd});

        // 8. res => success
        return res.status(200).json({
            message : "Password Updated, Please Login again"
        })
    } 
    catch (err) {
        return res.status(500).json({
            message : "Server Error"
        })
    }
};

export {signup, login, logout, forgotPassword, resetPassword}