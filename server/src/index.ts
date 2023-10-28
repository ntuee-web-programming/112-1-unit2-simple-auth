import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

import { signIn, signUp } from "./controllers/auth";
import todoRoutes from "./routes/todos";
import { env } from "./utils/env";

const app = express();
const port = env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use("/todos", todoRoutes);
app.post("/signin", signIn);
app.post("/signup", signUp);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is listening on: http://localhost:${port}`);
});
