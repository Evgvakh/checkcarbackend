import jwt from 'jsonwebtoken';

export const checkAdminToken = (req, res, next) => {    
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.json({ message: 'Authorization failed, no token' })
        }
        const decodedToken = jwt.verify(token, "OkCheckCarToken")
        req.user = decodedToken;
        console.log(decodedToken)
        if (decodedToken.role && decodedToken.role === 'admin') { next() } else { return res.json({ message: 'Authorization failed, no token' }) };
    } catch (error) {
        return res.json({ message: 'Authorization failed' });
    }
}