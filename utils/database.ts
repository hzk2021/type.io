import mongoose from "mongoose";

let isConnected = false; // track connection status

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) return console.log("MongoDB already has an active connection");
    
    try {
        await mongoose.connect(process.env.MONGODB_URI!, {
            dbName: "typeIO"
        });

        isConnected = true;
        console.log("MongoDB connected");
    } catch (error) {
        console.error(error);
    }

};