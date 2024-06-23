const exp = require("constants");
const express = require("express");
const { connectDatabase } = require("./databaseConnection/databaseConnect");
const { router } = require("./authrouter/authrouter");
const app = express();
app.use(express.json());
app.use("/",router)
connectDatabase().then(() => {
  app.listen(8000, () => {
    console.log("listingin at 6000");
  });
});
