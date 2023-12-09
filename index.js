import express from "express";
import userRoute from "./routes/users.route.js";
import databaseService from "./services/database.service.js";
import { defaultErrorHandler } from "./middlewares/error.middlewares.js";
import { config } from "dotenv";
config();
const app = express();
const PORT = 4000;
app.use(express.json());
databaseService.run();

app.use("/users", userRoute);

app.use(defaultErrorHandler);

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Error ${err.message}`);
  } else {
    console.log(`Your server is listening on PORT ${PORT}`);
  }
});
