import mongoose from "mongoose";

// Connect to MongoDB
const connectDB = async () => {
    try {
       const dbData = await mongoose.connect(`${process.env.MONGODB_URI}/socketio`)
       console.log(`MongoDB hosted at ${dbData.connection.host}`)
    } catch (error) {
        console.log('Error while connecting to DB: ', error)
        throw error;
    }
    
}

export default connectDB;