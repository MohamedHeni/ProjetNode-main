const express=require("express")
const router=express.Router()
const Reservationcontrollers=require("../Controllers/ReservationControllers")
router.post("/ajouter/:id",Reservationcontrollers.addReservation)
router.put("/update/:id",Reservationcontrollers.updateReservation)
router.delete("/delete/:id",Reservationcontrollers.deleteReservation)
router.put("/annulerreservation/:id",Reservationcontrollers.annullerreservation)
router.get("/getallreservation/",Reservationcontrollers.getAllresrrvationarchiver)
router.get("/getonereservation/:id",Reservationcontrollers.getReservation)
router.get("/getreservationbyuser/:id",Reservationcontrollers.getreservatyByuser)




module.exports=router