const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env file

// Here is where we import modules
// We begin by loading Express
const express = require("express");
const mongoose = require("mongoose"); // require package
const methodOverride = require("method-override"); // new
const morgan = require("morgan"); //new
const app = express();

// server.js

// GET /
app.get("/", async (req, res) => {
    res.render("index.ejs");
  });

  // Connect to MongoDB using the connection string in the .env file
mongoose.connect(process.env.MONGODB_URI);
// log connection status to terminal on start
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });

  const Food = require("./models/food.js");
  app.use(express.urlencoded({ extended: false }));
  app.use(methodOverride("_method")); // new
app.use(morgan("dev")); //new

  // GET /food
  app.get("/food", async (req, res) => {
    const allFood= await Food.find();
    res.render("food/index.ejs", { food: allFood });
  });


  app.get("/food/new", (req, res) => {
    res.render("food/new.ejs");
  });

  app.get("/food/:foodId", async (req, res) => {
    const foundFood = await Food.findById(req.params.foodId);
    res.render("food/show.ejs", { food: foundFood });
  });
  app.post("/food", async (req, res) => {
     if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }
  await Food.create(req.body);
  res.redirect("/food");
  
  });

  app.delete("/food/:foodId", async (req, res) => {
    await Food.findByIdAndDelete(req.params.foodId);
    res.redirect("/food");
  });

  app.get("/food/:foodId/edit", async (req, res) => {
    const foundFood = await Food.findById(req.params.foodId);
    res.render("food/edit.ejs", {
      food: foundFood,
    });
  });

  // server.js

app.put("/food/:foodId", async (req, res) => {
    // Handle the 'isReadyToEat' checkbox data
    if (req.body.isReadyToEat === "on") {
      req.body.isReadyToEat = true;
    } else {
      req.body.isReadyToEat = false;
    }
    

    await Food.findByIdAndUpdate(req.params.foodId, req.body);
  
    res.redirect(`/food/${req.params.foodId}`);
  });
  
 
app.listen(3000, () => {
  console.log("Listening on port 3000");
});