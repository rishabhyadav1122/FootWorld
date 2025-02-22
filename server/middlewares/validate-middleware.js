const validate = (schema)=> async(req,res,next) =>{
    try {
        const parseBody = await schema.parseAsync(req.body)
        req.body = parseBody
        next()
    } catch (err) {
        const message  = "Fill the details properly"
        const extraDetails = err.errors[0].message
        // res.status(400).json({msg:message})
        const status = 422
        const error = {
            status,
            message,
            extraDetails,
        }

        next(error)
    }
}

module.exports = validate