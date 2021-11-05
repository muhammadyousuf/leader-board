const mongoose = require("mongoose");
console.log(process.env.DB_URI);

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log(err)
        console.log("Error Occured while Connection wih Database");
    }
    else {
        console.log("connection successfully established");
    }
})