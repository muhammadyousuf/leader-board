const { BadRequestError } = require("./error")
const  joiResponse = (result, res, next) => {
    if (!result.error) {
        next();
    } else {
        const errorArr = [];
        for (i in result.error.details) {
            let makeKey = `${result.error.details[i].path}`;
            var obj = {};
            obj[makeKey] = result.error.details[i].message
            errorArr.push(obj);
        }
        return res.status(400).json(new BadRequestError({ message: errorArr }));
    }
}


module.exports = { joiResponse }