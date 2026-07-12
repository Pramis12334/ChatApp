const mongoose = require('mongoose');

 const connectDB = async () => {
try{
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("MONGODB connected sucessfully", conn.connection.host);

} catch(error) {
    console.error("Error while connecting Database: ", error);
    process.exit(1);
}
}

module.exports = {connectDB};