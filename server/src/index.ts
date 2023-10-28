import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import { signIn, signUp } from "./controllers/auth";
import userRoutes from "./routes/users";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use("/users", userRoutes);
app.post("/signin", signIn);
app.post("/signup", signUp);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is listening on: http://localhost:${port}`);
});
