import jwt from 'jsonwebtoken';


const isAuthenticated = (request, response, next) => {
    try {
        const token = request.cookies.token;
        // console.log("Token:- ", token);

        if(!token){
            return response.status(401).json({
                message: "User not authenticated!"
            });
        };

        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // console.log("Decoded token:- ", decode);
        if(!decode){
            return response.status(401).json({
                message: "Invalid token!"
            })
        };
        
        request.id = decode.userId;
        next();
    }   
    
    catch (error) {
        console.log("Authentication error:- ", error)    
    }
}

export default isAuthenticated;