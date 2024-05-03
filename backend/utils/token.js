import jwt from "jsonwebtoken";

const newtoken = (userId, res) => {

    const secretKey = process.env.JWT_SECRET || 'fallback_secret_key';
    
    const token = jwt.sign({userId}, secretKey, {
        expiresIn: '30d'
    })

    res.cookie("jwt", token, {
        maxAge: 30 * 24 * 60 * 60 * 1000, //ms
        httpOnly: true,
        sameSite: "strict"
    })
}

export default newtoken;