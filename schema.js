//Here we created the schema for joi 
const Joi = require("joi");

module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        title : Joi.string().required(), //-->It should be string and not null
        description : Joi.string().required(),
        location : Joi.string().required(),
        country : Joi.string().required(),
        price : Joi.number().required().min(0), //-->Price min should be 0
        image : Joi.string().allow("",null), //-->Image can be null and "" string as we already define default for this in mongoose schema
    }).required(), //-->The listing obj should not be empty
});


//For review we make Joi
module.exports.reviewSchema = Joi.object({
    review : Joi.object({
        rating : Joi.number().required().min(1).max(5),
        comment : Joi.string().required(),
    }).required(),
});