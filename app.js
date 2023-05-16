const express = require("express");

const { open } = require("sqlite");
const path = require("path");
const dbPath = path.join(__dirname, "moviesData.db");

const sqlite3 = require("sqlite3");

const app = express();

app.use(express.json());

let database = null;

const initializeDBWithServer = async () => {
  try {
    database = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3001, () => {
      console.log("Server running at http://localhost:3000/");
    });
  } catch (error) {
    console.log(`DB ERROR: ${error.message}`);
    process.exit(1);
  }
};

initializeDBWithServer();

const getMovies = (movie) => {
  return {
    movieId: movie.movie_id,
    directorId: movie.director_id,
    movieName: movie.movie_name,
    leadActor: movie.lead_actor,
  };
};

//GET ALL Movies API
app.get("/movies/", async (request, response) => {
  const moviesQuery = `SELECT movie_name FROM movie ORDER BY movie_id;`;
  const getAllMovies = await database.all(moviesQuery);
  response.send(getAllMovies.map((eachMovie) => getMovies(eachMovie)));
});

//POST API
app.post("/movies/", async (request, response) => {
  const { directorId, movieName, leadActor } = request.body;

  const addMovieQuery = `INSERT INTO movie (director_id,movie_name,lead_actor) 
  VALUES 
  ('${directorId}','${movieName}','${leadActor}');`;

  const dbResponse = await database.run(addMovieQuery);
  response.send("Movie Successfully Added");
});

//GET movieId API
app.get("/movies/:movieId/", async (request, response) => {
  const { movieId } = request.params;
  const movieIdQuery = `SELECT * FROM movie WHERE movie_id = 
  ${movieId};`;
  const dbResponse = await database.get(movieIdQuery);
  response.send(getMovies(dbResponse));
});

//PUT API
app.put("/movies/:movieId/", async (request, response) => {
  const { movieId } = request.params;
  const { directorId, movieName, leadActor } = request.body;
  const updateMovieQuery = `UPDATE movie SET director_id='${directorId}',movie_name='${movieName}',
    lead_actor='${leadActor}' WHERE movie_id=${movieId};`;
  await database.run(updateMovieQuery);
  response.send("Movie Details Updated");
});

//DELETE Movie API
app.delete("/movies/:movieId/", async (request, response) => {
  const { movieId } = request.params;
  const deleteMovie = `DELETE FROM movie WHERE movie_id = ${movieId};`;
  await database.run(deleteMovie);
  response.send("Movie Removed");
});

//GET ALL directors API
app.get("/directors/", async (request, response) => {
  const directorsQuery = `SELECT * FROM director ORDER BY director_id;`;
  const getAllDirectors = await database.all(directorsQuery);
  response.send(getAllDirectors);
});

//GET movieName with directorId API
app.get("/directors/:directorId/movies/", async (request, response) => {
  const { directorId } = request.params;
  const getMovieByDirector = `SELECT movie_name FROM movie WHERE director_id=${directorId};`;
  const dbResponse = await database.all(getMovieByDirector);
  response.send(dbResponse);
});

module.exports = app;
