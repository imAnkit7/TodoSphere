const jwt = require('jsonwebtoken')
const JWT_SECRET = 'mySecretKey@123'
function authenticateToken(req, res, next) {
    const header = req.headers['authorization']
    const token = header && header.split(" ")[1]
    if (!token)
        return res.status(401).json({ message: 'No token' })

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            // Differentiate between token errors for better debugging
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expired' });
            }
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.user = user
        next()

    })
}


module.exports = authenticateToken
