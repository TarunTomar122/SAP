import cors from "cors";
import express from "express";

const app = express();

app.use(cors());

const PORT = 4040;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
