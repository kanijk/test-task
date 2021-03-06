
const Constant = {  
    APP_PORT: process.env.PORT || 5000,
    ENV: process.env.NODE_ENV || "development",
    
    MONGO_PATH: "mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true",

    MSGS: {
        SUCCESS: "success", 
        INVALID_REQUEST: "Invalid request payload received !",
        INTERNAL_ERROR: "Some unexpected error occurred !"
    }

}

module.exports = Constant;