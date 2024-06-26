

function readAuthData (request, response, next) {
    let authData = null
    if (request.body.auth || request.headers.authorization) {
        authData = request.body.auth || request.headers.authorization;
    }

    if (authData){
        console.log("Auth data provided: " + authData);
        request.authMiddleware = {}
        request.authMiddleware.data = authData
        next();
    } else {
        response.json({
            message: "Please log in before continuing"
        })
    }
}

function verifyAuthData(request, response, next) {
    let localCopyOfAuthData = request.authMiddleware.data;

    console.log(localCopyOfAuthData);

    next();
}

module.exports = {
    readAuthData,
    verifyAuthData
}

/* 
request comes in to the server
match a route
run middleware on route
response once all middleware is done

instance.verb(
    path
    middleware01
        next()
    middleware02
        next()
    middleware03 ------> response.json()
        next()
    response.json()
)
*/