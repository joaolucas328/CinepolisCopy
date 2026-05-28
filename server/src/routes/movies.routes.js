const express = require("express")

const {
    createMovie,
    getMovies,
    getMovieById,
} =  require("../controllers/movies.controller");

const router = express.Router();

router.post("/", createMovie);

router.get("/", getMovies);

router.get("/:id", getMovieById);

module.exports = router;