import jwt from 'jsonwebtoken'



export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization
   console.log("Auth Headers:", authHeader)

    if(!authHeader){
    return res.status(401).json({message: "Unauthorized"})
    }

    const token = authHeader.split(" ")[1]
    try{
      const decoded = jwt.verify(token, process.env.SECRET_KEY)
      req.user = decoded
      next()
    }
    catch(err){
      return res.status(403).json({message: "Invalid token", err})
    }


}