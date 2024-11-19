const config = {
    env: process.env.NODE_ENV || 'development', 
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || "d4TNgYLgPjtG1wef", 
    //mongoUri: process.env.MONGODB_URI ||"mongodb+srv://Blessing:tSI401u1D8LCeeHM@cluster0.3wekmcz.mongodb.net/Skeleton?retryWrites=true&w=majority"||
    mongoUri: process.env.MONGODB_URI ||"mongodb+srv://isaporras1122:d4TNgYLgPjtG1wef@cluster0.vtjca.mongodb.net/Skeleton?retryWrites=true&w=majority&appName=Cluster0"||
    process.env.MONGO_HOST ||
    'mongodb://' + (process.env.IP || 'localhost') + ':' + 
   (process.env.MONGO_PORT || '27017') +
    '/mernproject' 
    }
    export default config
   
   