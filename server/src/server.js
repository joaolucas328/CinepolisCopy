const express = require("express");
const cors = require("cors");

const movieRoutes = require("./routes/movies.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/movies", movieRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando!");
});