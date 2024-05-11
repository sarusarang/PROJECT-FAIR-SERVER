const express = require('express')
const usercontroller = require('../Controller/userController')
const projectcontroller =  require('../Controller/ProjectController')
const jwtmiddle = require('../MiddleWares/jwtmiddleware')
const multer = require('../MiddleWares/multerMIddleware')


const router = express.Router()

router.post('/register',usercontroller.userRegister)

router.post('/login',usercontroller.userlogin)

router.post('/addprojects',jwtmiddle,multer.single('image'),projectcontroller.addprojects)

router.get('/homeprojects',projectcontroller.homeprojects)

router.get('/allprojects',jwtmiddle,projectcontroller.allprojects)

router.get('/userprojects',jwtmiddle,projectcontroller.userprojects)


module.exports=router