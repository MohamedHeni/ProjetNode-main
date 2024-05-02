const express=require("express")
const router=express.Router()
const UserControllers=require("../Controllers/UserControllers")


router.post("/singup",UserControllers.signup)
router.post("/login",UserControllers.login)
router.post("/confirmedcompte/:code",UserControllers.confirmedmail)

module.exports=router