
const User=require("../Models/UserModels")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const nodemailer = require('nodemailer');
const tokensecret = "smlertjhmelrkjt62rzmtlhzrkt"
const dotenv=require( 'dotenv')
dotenv.config();
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'henim6227@gmail.com',
        pass: 'vjas rigr vbqc frnc',
    },
    tls: {
        rejectUnauthorized: false
    },
});
exports.signup = async (req, res) => {
    try {
        const existeuser = ((req.body.email).toLowerCase()).trim()
        const existbd = await User.findOne({
            email: existeuser
        })

        if (existbd) {
            await res.status(401).json({ message: "email déja existe" })
        } else {
            let password = req.body.password
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(password, salt);
            let signup = new User({
                nom:req.body.nom,
            prenom: req.body.prenom,
            email: existeuser,
                role: "user",
                password: hashed,
                Numerotelephone:req.body.Numerotelephone
                


            })

            const save_singup = await signup.save()
            res.status(200).json({ resultat: save_singup, message: "user singup  avec succes" })


        }

    } catch (error) {
        console.log(error);
        res.status(400).json(error)

    }
}
exports.login = async (req, res) => {
    try {
  
        const existemail = ((req.body.email).toLowerCase()).trim()

        const existeuser = await User.findOne({ email: existemail});
        if (!existeuser) {
            return res.status(401).json("Check your email");
        }

        const providedPassword = req.body.password;
        const passwordValid = await bcrypt.compare(providedPassword, existeuser.password);

        if (!passwordValid) {
            return res.status(401).json("Check your  password");
        } 
        else if (existeuser.confirmed==false){
            const response = Math.floor(Math.random() * (9999 - 1000) + 1000)

            transporter.sendMail({
                from: 'Admin Salle',
                to: existeuser.email,
                subject: 'Sending Email using to confirme  your acount',
                

                html: `<b>Hey ${existeuser.nom} ${existeuser.prenom}! </b> 
  <br>welcome to our application <br/>  
  please use this code : <b> ${response}</b> to activate your compte`,

            },

                async (err, succes) => {
                    if (err) {
                        console.log(err);
                        return res.status(400).json(err)
                    } else {
                        await User.findByIdAndUpdate({ _id: existeuser._id }, {
                            codegenerated: response
                        })
                        return res.status(301).json("we send a code to activate your compte .");
                    }

                })



        }else{

        const payload = {
            id: existeuser._id,
            role: existeuser.role
        };

            const token =  jwt.sign(payload, process.env.scretorkey);
                console.log(token);

        

      return  res.status(200).json({ resultat: existeuser, token: token, message: "Sign in successful" });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json("Failed to sign in.");
    }
}

exports.confirmedmail=async(req,res)=>{
    try {
        const Code =req.params.code

        const user_exist=await User.findOne({
            codegenerated: Code
        })
        if (user_exist) {
            await User.findByIdAndUpdate({ _id: user_exist._id }, {
                confirmed: true
            })
            await User.findByIdAndUpdate({ _id: user_exist._id }, {
                $unset: { codegenerated: 1 }
            })
            const payload = {
                id: user_exist._id,
                role: user_exist.role
            };

            const token = jwt.sign(payload, process.env.scretorkey);


         

            res.status(200).json({ resultat: user_exist, token: token, message: "Sign in successful." });
        }
    } catch (error) {
        console.log(error);
    }
}
