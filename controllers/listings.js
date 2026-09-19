const {isLoggedIn, saveRedirectUrl, isOwner, validateListing} = require("../middleware.js");
const Listing = require("../models/listening.js");
const axios = require("axios");

module.exports.index = async (req,res) => {
    const allListings = await Listing.find({});
    res.render("listing/index", {allListings}) //Dont write /listing/index as path is treated as absolute path and error came
    //No async await if .than() use
    // Listing.find({}).then((res) => {
    //     console.log(res);
    // })
};

module.exports.edit = async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);

    if(!listing){
        req.flash("error","Listing you requested for does not exist!");
        return res.redirect("/listings"); //You should return it otherwise the next render will cause error
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250");

    res.render("listing/edit", {listing , originalImageUrl})
};

module.exports.update = async (req,res) => {
    // if(!req.body.listing) {
    //     throw new ExpressError(400,"Send valid data for listing");
    // }


    //isOwner middleware -->came in place
    let {id} = req.params;

    // let listings =  await Listing.findById(id);
    // //This all for hoppscotch and postman req
    // if(!listings.owner._id.equals(res.locals.Curruser._id)){
    //     req.flash("error","You don't have permission to edit");
    //     return  res.redirect(`/listings/${id}`)
    // }

    let listing = await Listing.findById(id);

    if(!listing){
        req.flash("error","Listing you requested for does not exist!");
        return res.redirect("/listings");
    }


    // Update title, description, price, location, country etc.
    Object.assign(listing, req.body.listing);


    // =========================
    // GEOCODING
    // =========================

    const response = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
            params: {
                q: `${listing.location}, ${listing.country}`,
                format: "json",
                limit: 1
            },
            headers: {
                "User-Agent": "WonderLust-App"
            }
        }
    );


    if (response.data.length === 0) {
        req.flash("error", "Location could not be found!");
        return res.redirect(`/listings/${id}/edit`);
    }


    const location = response.data[0];


    // Update geometry
    listing.geometry = {
        type: "Point",
        coordinates: [
            Number(location.lon),
            Number(location.lat)
        ]
    };


    if(typeof req.file != "undefined"){ //if you not send image so req.file == undefined
        let url = req.file.path;
        let filename = req.file.filename;

        listing.image = {url,filename};

        await listing.save();
    }

    // if (typeof req.file !== "undefined") {
    //     let url = req.file.path;
    //     let filename = req.file.filename;

    //     listing.image = {
    //         url,
    //         filename
    //     };
    // }


    // // =========================
    // // SAVE EVERYTHING
    // // =========================

    // await listing.save();


    // SAVE EVERYTHING
    // This is required even when there is no new image
    await listing.save();


    req.flash("success","Listing Updated");
    res.redirect(`/listings/${id}`);
};


module.exports.delete = async (req,res) => {
    let {id} = req.params;

    let deleteListing = await Listing.findByIdAndDelete(id);

    console.log(deleteListing);

    req.flash("success","Listing Deleted");

    res.redirect("/listings");
};


module.exports.create = async (req,res,next) => {
    //Save these as the model changed
    let url = req.file.path;
    let filename = req.file.filename;

    //simply prints both values with .. between them.
    console.log(url, "..", filename);


    //  try{
    //Here we check listing obj if not send then this if work
    //What if --> all give just title miss like that in hoppscotch (or) postman
    //Use joi
    //let result = listingSchema.validate(req.body);
    //console.log(result);
    // if(result.error){ //if result have err it mean if is true
    //     throw new ExpressError(400,result.error)  //-->It call the 4 para middleware as it is a obj
    // }
    // if(!req.body.listing){
    //     throw new ExpressError(400,"Send valid data for listing");
    // }


    //You can do one thing put all in if and check like !req.body.listing.location ,.......
    let listing = new Listing(req.body.listing);

    listing.owner = req.user._id; //save current user id as owner

    //Add the image
    listing.image = {url,filename};



    // =========================
    // GEOCODING
    // =========================

    const response = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
            params: {
                q: `${listing.location}, ${listing.country}`,
                format: "json",
                limit: 1
            },
            headers: {
                "User-Agent": "WonderLust-App"
            }
        }
    );

    if (response.data.length === 0) {
        req.flash("error", "Location could not be found!");
        return res.redirect("/listings/new");
    }

    const location = response.data[0];

    listing.geometry = {
        type: "Point",
        coordinates: [
            Number(location.lon),
            Number(location.lat)
        ]
    };

    // Check before saving
    console.log("GEOMETRY:", listing.geometry);

    //save default location for now
    // listing.geometry = {
    //     type: "Point",
    //     coordinates: [88.3639, 22.5726]
    // };

    await listing.save();


    //Flash created
    req.flash("success","New Listing Created");

    res.redirect("/listings")

    // }
    // catch(err){
    //     next(err);//--> As it is async we need to call next for middleware(must call)
    //     //if there is no middleware so express will handle itself
    // }
}


module.exports.show = async (req,res) => {
    let {id} = req.params;

    const listing = await Listing.findById(id).populate({
        path:"reviews",
        populate : {
            path : "author",
        }, //This is nested populate
    })
    .populate("owner");

    //We also populate owner as we get whole object
    //so show.ejs use all these
    //--->populate for give (whole review object)

    //if listing not there we want to give a flash
    if(!listing){
        req.flash("error","Listing you requested for does not exist!");
        return res.redirect("/listings"); //You should return it otherwise the next render will cause error
    }

    res.render("listing/show", {listing});
}


//As per Listing Category we render different pages

module.exports.Trending = async (req,res) => {
    const allListings = await Listing.find({category : 'Trending'});

    console.log(allListings); // temporary

    res.render("listing/page", {
        allListings,
        category: "Trending"
    });
}


module.exports.Rooms = async (req,res) => {
    const allListings = await Listing.find({category : "Rooms"});

    res.render("listing/page", {
        allListings,
        category:"Rooms"
    });
}


module.exports.IconicCity = async (req,res) => {
    const allListings = await Listing.find({category : "Iconic City"});

    res.render("listing/page", {
        allListings,
        category : "Iconic City"
    });
}


module.exports.Mountains = async (req,res) => {
    const allListings = await Listing.find({category : "Mountains"});

    res.render("listing/page", {
        allListings,
        category : "Mountains"
    });
}


module.exports.Castles = async (req,res) => {
    const allListings = await Listing.find({category : "Castles"});

    res.render("listing/page", {
        allListings,
        category : "Castles"
    });
}


module.exports.AmazingPools = async (req,res) => {
    const allListings = await Listing.find({category : "Amazing Pools"});

    res.render("listing/page", {
        allListings,
        category : "Amazing Pools"
    });
}


module.exports.Camping = async (req,res) => {
    const allListings = await Listing.find({category : "Camping"});

    res.render("listing/page", {
        allListings,
        category : "Camping"
    });
}


module.exports.Farms = async (req,res) => {
    const allListings = await Listing.find({category : "Farms"});

    res.render("listing/page", {
        allListings,
        category : "Farms"
    });
}


module.exports.Arctic = async (req,res) => {
    const allListings = await Listing.find({category : "Arctic"});

    res.render("listing/page", {
        allListings,
        category : "Arctic"
    });
}


module.exports.Dooms = async (req,res) => {
    const allListings = await Listing.find({category : "Dooms"});

    res.render("listing/page", {
        allListings,
        category : "Dooms"
    });
}


module.exports.Boats = async (req,res) => {
    const allListings = await Listing.find({category : "Boats"});

    res.render("listing/page", {
        allListings,
        category : "Boats"
    });
}

