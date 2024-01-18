const express = require('express');
const passport = require("passport");
const jwt = require("jsonwebtoken");

const helpController = require('../../controllers/helpController');

const router = express.Router();

router.get('/help', helpController.helpDetails);

router.post(
    '/signup',
     passport.authenticate('signup', {session: false}) ,
     async (req, res) => {
        res.status(200).json({
            success: true,
            message: "Signup successful.",
            data: {
                user: req.user
            }
        })
     }
);

router.post(
    '/login', 
    async (req, res) => {
        passport.authenticate('login', 
            async (err,user, next) => {
                try{
                    if(err || !user){
                        const error = new Error("Something went wrong....!");
                        return next(error);
                    }
                    req.login(
                        user,
                        {session: false},
                        async (err) => {
                            if(err) return next(err)
                            const body = {_id: user._id, email: user.email};
                            const token = jwt.sign({user: body}, 'TOP-SECRET');
                            return res.status(200).json({
                                token,
                                success: true,
                                message: "LoggedIn successfully...!"
                            })
                        }
                    )
                }catch(err){
                    console.log(err);
                }
            }
        )
    }    
)
module.exports = router;