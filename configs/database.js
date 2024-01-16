const mongoose = require("mongoose");


const connect = () => {
    console.log('Mongoose connection requested....');
    return mongoose.connect("mongodb://127.0.0.1/TaxBillingApp");
};


module.exports = {
     connect
}