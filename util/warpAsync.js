//Direct export the function (arrow function)
module.exports = (fn) => { //fn is function here
    return (req,res,next) => {
        fn(req,res,next).catch(next); //Catch will catch all error
    }
}
