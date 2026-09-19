const mongoose = require("mongoose");
const data = require("./data.js");
const Listing = require("../models/listening.js")

const MONGO_URl = "mongodb://127.0.0.1:27017/wanderlust";

main()
.then(() => {
    return initDB();
})
.then(() => {
        console.log("Initialization complete");
    })
.catch((err) => {
    console.log(err);
})

async function main() {
    await mongoose.connect(MONGO_URl);
}

const initDB = async () => {
    await Listing.deleteMany({})
    //it means go to each data and made owner to id = ....
    data.data = data.data.map((obj) => ({
        ...obj,
        //i make the Dinu name owner of all existing listing
        owner : "6aae56207b3d5f9dd87dd9b0",
    }))
    await Listing.insertMany(data.data)
    console.log("Data was initialized")
};

