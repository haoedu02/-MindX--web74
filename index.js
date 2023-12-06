import express from "express";
import databaseService from "./services/database.service.js";
const app = express();
const PORT = 4000;

databaseService.run();

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Error ${err.message}`);
  } else {
    console.log(`Your server is listening on PORT ${PORT}`);
  }
});
