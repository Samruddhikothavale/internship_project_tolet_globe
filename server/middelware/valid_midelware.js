const validate=(schema)=> async(req,res,next)=>{
    try {
        const parseBody= await schema.parseAsync(req.body);
        req.body=parseBody;
        next();
    } catch (error) {
       
        const status=422;
        const message = 'Fill the input properly';
        const extraDetails=error?.errors?.[0]?.message || "Validation error";
        //res.status(400).json({msg:message});
        const err ={
            status , message ,extraDetails
        };

        console.log(err);
        next(err);
    }
};

module.exports = validate;