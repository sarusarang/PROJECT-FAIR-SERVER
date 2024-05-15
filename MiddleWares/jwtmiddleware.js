const jwt = require('jsonwebtoken')


const jwtmiddlewareFun = (req, res, next) => {



    try {

        const token = req.headers.authorization.split(" ")[1]

        if (token) {

            console.log("indise");

            const result = jwt.verify(token, process.env.Secret_key)
            req.payload = result.userid
            next()
        }
        else {

            res.status(406).json("please Login")
        }

    }

    catch {

        res.status(406).json("Please Login")
    }


}

module.exports = jwtmiddlewareFun