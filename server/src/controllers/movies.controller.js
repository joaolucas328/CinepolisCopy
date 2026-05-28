const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function createMovie(req, res) {
  try {
    const { title, description, image, year } = req.body;

    const movie = await prisma.movie.create({
      data: {
        title,
        description,
        image,
        year,
      },
    });

    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function getMovies(req, res) {
  try {
    const movies = await prisma.movie.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(movies);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function getMovieById(req, res) {
  try {
    const { id } = req.params;

    const movie = await prisma.movie.findUnique({
      where: {
        id: Number(id),
      },
    });

    res.json(movie);
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {
  createMovie,
  getMovies,
  getMovieById,
};