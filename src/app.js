/* eslint-disable no-unused-vars */
import express from "express";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import taskRoute from "./routes/taskRoute.js";

const app = express();

app.use(express.json());

app.use(cors());

app.use("/users", userRoute);
app.use("/tasks", taskRoute);

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
