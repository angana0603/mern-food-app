const mongoose = require("mongoose");
const mongoURI =
  "mongodb://sahaangana0603:Ange%401994@ac-7laxnew-shard-00-00.wuyv07y.mongodb.net:27017,ac-7laxnew-shard-00-01.wuyv07y.mongodb.net:27017,ac-7laxnew-shard-00-02.wuyv07y.mongodb.net:27017/yummyMERN?ssl=true&replicaSet=atlas-10lwqw-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.set("strictQuery", false);
const connectToMongoDB = async () => {
  mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
    if (err) console.log("---", err);
    else {
      console.log("connected");
      const fetch_Data = await mongoose.connection.db.collection("food_items");
      fetch_Data.find({}).toArray(async function (err, data) {
        const foodCategory = await mongoose.connection.db.collection(
          "foodCategory"
        );
        foodCategory.find({}).toArray(function (err, catData) {
          if (err) console.log(err);
          else {
            global.food_items = data;
            global.foodCategory = catData;
          }
        });
      });
    }
  });
};

module.exports = connectToMongoDB;
