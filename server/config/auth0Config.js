import {auth} from 'express-oauth2-jwt-bearer'

const jwtCheck=auth({
    audience: "https://dev-p4ihja24zlmgfy8p.us.auth0.com/api/v2/" ,
    issuerBaseURL:"https://dev-p4ihja24zlmgfy8p.us.auth0.com/",
    tokenSigningAlg:"RS256"
})

export default jwtCheck;