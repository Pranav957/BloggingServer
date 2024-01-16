const express = require('express');
const passport=require('passport');
const router = express.Router();

const userApi=require("../../../controllers/api/v1/usersController");

console.log('reached here!');
router.get('/getAllUsers',passport.authenticate('jwt',{session:false}),userApi.getAllUsers);
router.get('/getUser/:id',passport.authenticate('jwt',{session:false}),userApi.getUserById);
router.post('/createUser',passport.authenticate('jwt',{session:false}),userApi.createUser);
router.put('/updateUser/:id',passport.authenticate('jwt',{session:false}),userApi.updateUser);
router.delete('/deleteUser/:id',passport.authenticate('jwt',{session:false}),userApi.deleteUser);

router.post('/create-session',userApi.createSession);

module.exports = router;