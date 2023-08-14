const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;
const connectToMongoDB = require("./db");
connectToMongoDB();


app.use(cors()); // Enable CORS for all routes

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Reqested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

app.use("/api", require("./Routes/CreatUser"));
app.use("/api", require("./Routes/ShowData"));
const orderRoutes = require("./Routes/OrderData"); // Example routes path
app.use("/", orderRoutes);

const paymentRouter = require('./Routes/payment');
app.use('/payment', paymentRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
