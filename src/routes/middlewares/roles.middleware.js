export const rolesMiddlewareAdmin = (req, res, next) => {
    if(req.user.role === 'admin'){
        next()
    } else {
        res.send({error: 'No tienen acceso a esta ruta.' })
    }
}

export const rolesMiddlewareUser = (req, res, next) => {
    if(req.user.role === 'user'){
        next()
    } else {
        res.send({error: 'No tienen acceso a esta ruta.' })
    }
}