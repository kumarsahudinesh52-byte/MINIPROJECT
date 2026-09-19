//For schema we created the file


const mongoose = require("mongoose");
const Schema = mongoose.Schema; //predefine 
const Review = require("./review.js");
const { listingSchema } = require("../schema");
// ---->  ../ means "go up one folder from the current file's folder."
const listeningSchema = new Schema({
    title : {
        type : String,
        required : true,
    },
    description : String,
    image : {
        url : String,
        filename : String,
    },
    // image : {
    //     type : String,
    //     default : "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
    //     //default is when you not write image means not give image parameter
    //     set : (v) => v === "" ? "https://images.unsplash.com/photo-1564013799919-ab600027ffc6" : v,
    //     //When you enter image = "" --> then default image print
    // },
    price : Number,
    location : String,
    country : String,
    reviews : [
        {
            type : Schema.Types.ObjectId, //Store a obj
            ref : "Review", //From this model we take 
        },
    ],
    //Now listing have a owner
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User",
    },
    geometry: {
        type: {
            type: String,
            enum: ["Point"],
            required: true
        },

        coordinates: {
            type: [Number],
            required: true
        }
    },
    category: {
    type: String,
    enum: [
        "Trending",
        "Rooms",
        "Iconic City",
        "Mountains",
        "Castles",
        "Amazing Pools",
        "Camping",
        "Farms",
        "Arctic",
        "Dooms",
        "Boats",
        
       ]
     },
});


//We create a post middleware as when we delete a listing by findByIdAndDelete then this middleware called 

//As it contain findOneAndDelete --> which related to findByIdAndDelete  as in post middleware calls

listeningSchema.post("findOneAndDelete", async (listing) => {
    if(listing) { //if review exist
        await Review.deleteMany({_id : {$in : listing.reviews} }); //Select all his review and delete from Review model
    }
})



const Listing = mongoose.model("Listing", listeningSchema);
module.exports = Listing;