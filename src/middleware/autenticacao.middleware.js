const jwt = require('jsonwebtoken')

function autenticar(req, res, next){
    const auth = auth && req.header['authorization']
    const tokem = auth && auth.split('')[1]
    if(!tokem){
        return res.sendStatus(401)
    }else{
        jwt.verify(tokem, process.env.ACCESS_TOKEN, (err, payload) => {
            if(err) return res.sendStatus(403)
            req.user = payload
            next()
        })
    }
}

module.exports = autenticar