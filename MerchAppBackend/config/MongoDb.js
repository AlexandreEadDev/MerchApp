import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "MerchX",
    });
    console.log("Mongo Connected");
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDatabase;
