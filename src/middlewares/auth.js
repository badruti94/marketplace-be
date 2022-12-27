const jwt = require('jsonwebtoken')

const isLoginByRole = (req, res, next, role) => {
    const authorizationHeader = req.header('Authorization')
    if (!authorizationHeader) {
        return res.status(403).send({
            message: 'No token found'
        })
    }

    const token = authorizationHeader.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY)
        req.userId = decoded.userId
        req.userRole = decoded.userRole

        if (role !== 'no role') {
            if (role !== decoded.userRole) {
                return res.status(403).send({
                    message: 'Forbidden'
                })
            }
        }

        next()
    } catch (error) {
        return res.status(403).send({
            message: 'Token is invalid'
        })
    }
}

exports.isLogin = (req, res, next) => {
    isLoginByRole(req, res, next, 'no role')
}

exports.isLoginAdmin = (req, res, next) => {
    isLoginByRole(req, res, next, 'admin')
}