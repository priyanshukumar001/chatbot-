import express from 'express';
import User from '../models/User.js'; //mongodb user model
import argon2 from 'argon2';

const router = express.Router();

//signup
router.post('/signup', async (req, res) => {
    let { name, email, password, dateOfBirth } = req.body;
    name = name.trim(); //this is the name variable that we have already declared with previous object
    email = email.trim();
    password = password.trim();
    dateOfBirth = dateOfBirth.trim();

    if (name == "" || email == "" || password == "" || dateOfBirth == "") {
        res.json({
            status: "FAILED",
            message: "Empty input fields!"
        })
    } else if (!/^[a-zA-Z]*$/.test(name)) {
        res.json({
            status: "FAILED",
            message: "Invalid name entered!"
        })
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        res.json({
            status: "FAILED",
            message: "Invalid email entered!"
        })
    } else if (!new Date(dateOfBirth).getTime()) {
        res.json({
            status: "FAILED",
            message: "Invalid date of birth entered!"
        })
    } else if (password.length < 8) {
        res.json({
            status: "FAILED",
            message: "Password is too short!"
        })
    } else {

        //checking if user already exist
        try {
            const result = await User.findOne({ email });
            if (result) {
                //checks if a user already exits
                res.json({
                    status: "FAILED",
                    message: "User with the provided email already exists"
                })
            } else {
                //password handling
                try {
                    const hash = await argon2.hash(password);
                    //try creating a new user
                    try {
                        const newUser = new User({
                            name,
                            email,
                            password: hash,
                            dateOfBirth
                        });
                        await newUser.save();
                        console.log('new user created!');
                        res.json({
                            status: "Success",
                            message: "Successfully created new User!",
                            data: newUser
                        });
                    } catch (error) {
                        res.json({
                            status: "Failed",
                            message: "Error occured while saving new user!"
                        })
                    }
                } catch (error) {
                    res.json({
                        status: "FAILED",
                        message: "Error Hashing Password!"
                    })
                }

            }
        } catch (error) {
            console.log(err);
            res.json({
                status: "FAILED",
                message: "An error occurred while checking for existing user!"
            });
        }

    }
});

//login
router.post('/login', async (req, res) => {
    let { email, password } = req.body;

    if (email == "" || password == "") {
        res.json({
            status: "FAILED",
            message: "Empty credentials applied!"
        })
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        res.json({
            status: "FAILED",
            message: "Invalid email entered!"
        })
    } else {
        email = email.trim();
        password = password.trim();
        try {
            const result = await User.findOne({ email });
            if (result) {
                try {
                    const storedPassword = result?.password;
                    const verification = await argon2.verify(storedPassword, password);
                    if (verification) {
                        res.json({
                            status: "Success",
                            message: "Signin Successful!",
                            data: result
                        })
                    } else {
                        res.json({
                            status: "FAILED",
                            message: "Invalid password!"
                        })
                    }
                } catch (error) {
                    res.json({
                        status: "FAILED",
                        message: "Error verifying password!"
                    })
                }
            } else {
                res.json({
                    status: "FAILED",
                    message: "Invalid Credentials!"
                })
            }
        } catch (error) {
            res.json({
                status: "FAILED",
                message: "Error verifying user!"
            });
        }
    }
});

export default router;
