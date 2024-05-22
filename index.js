const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");

const app = express();
const port = 3000;

// routes
const userRoutes = require("./routes/userRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const descriptionRoutes = require("./routes/descriptionRoutes");

// express functions
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// testing
app.get("/", (req, res) => { 
    res.json({info: "Hello World! from Node.js, Express, and PostgreSQL!"});
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


// endpoints
app.use("/users", userRoutes);
app.use("/feedback", feedbackRoutes);
app.use("/description", descriptionRoutes);


            