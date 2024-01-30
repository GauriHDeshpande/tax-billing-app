const express = require("express");
const apiRouter = require('./routes/index');
const { connect } = require("./configs/database");
const authRouter = require("./routes/authRoutes");
const bodyParser = require("body-parser");
const passport = require("passport");
require("./utils/auth");

const app = express();

app.use(bodyParser.urlencoded({extended: false}))
app.use('/', authRouter);
app.use('/api', passport.authenticate('jwt', {session: false}) ,apiRouter);

// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.json({
//         success: false,
//         error: err
//     });
// });

app.listen(3001, async () => {
    await connect();
    console.log("Database connected successfully...");
    console.log('server started successfully at 3001.');
});