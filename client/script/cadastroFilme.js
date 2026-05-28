const form = document.getElementById("movieForm");

const moviesDiv = document.getElementById("movies");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const movie = {
    title: title.value,
    year: year.value,
    image: image.value,
    description: description.value,
  };

  await fetch("http://localhost:3000/movies", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movie),
  });

  loadMovies();
});

async function loadMovies() {
  const response = await fetch("http://localhost:3000/movies");

  const movies = await response.json();

  moviesDiv.innerHTML = "";

  movies.forEach((movie) => {
    moviesDiv.innerHTML += `
      <div class="movie-card">
        <img src="${movie.image}" />

        <h2>${movie.title}</h2>

        <p>${movie.year}</p>

        <a href="movie.html?id=${movie.id}">
          Ver Filme
        </a>
      </div>
    `;
  });
}

loadMovies();