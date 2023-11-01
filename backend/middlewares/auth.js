import jwt from "jsonwebtoken"

export const authenticateToken = (req, res, next)=>{
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    if(token===null){
        res.status(404).json({
            message: "Token null",
            data: [],
            check: false
        })
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET, (error, employee)=>{
            if(error){
                res.status(400).json({
                    message: error.message,
                    data: [],
                    check: false
                })
            }

            req.employee = employee
            next()
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: [],
            check: false
        })
    }
}