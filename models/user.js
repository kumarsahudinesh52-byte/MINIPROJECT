//Make a user model for login and sign-in
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const  passportLocalMongoose  = require("passport-local-mongoose").default; //Require the local mongoose

//default use for
//Give me the default property from the object returned by require()
const userSchema = new Schema ({
    email : {
        type : String,
        required : true,
    },
});

//Username and password will be in Schema by passport-local-mongoose
//Need to do plug-in the Schema to .plugin
//plugin is default method by mongoose
//passportLocalMongoose is function provided by passport-local-mongoose
userSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model("User", userSchema);



