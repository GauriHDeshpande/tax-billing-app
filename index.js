const express = require("express");
const apiRouter = require('./routes/index');
const { connect } = require("./configs/database");
const User = require("./models/user");

const app = express();

app.use('/api', apiRouter);

app.get('/', (req, res) => {
    res.status(200).send({
        success: true,
        message: "Server started successfully...",
        data: {}
    })
});

app.listen(3001, async () => {
    await connect();
    console.log("Database connected successfully...");
    console.log('server started successfully at 3001.');
    let user = await User.create({
        email: "abc@gmail.com",
        password: "12345",
        username: "ABC"
    });
    console.log(user);
});