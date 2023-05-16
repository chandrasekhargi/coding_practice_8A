const express = require("express");
<<<<<<< HEAD

const { open } = require("sqlite");
const path = require("path");
const dbPath = path.join(__dirname, "moviesData.db");

const sqlite3 = require("sqlite3");

const app = express();

app.use(express.json());

=======
const app = express();
app.use(express.json());

const { open } = require("sqlite");
const path = require("path");
const dbPath = path.join(__dirname, "covid19India.db");

const sqlite3 = require("sqlite3");

>>>>>>> covid Q
let database = null;

const initializeDBWithServer = async () => {
  try {
    database = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
<<<<<<< HEAD
    app.listen(3001, () => {
      console.log("Server running at http://localhost:3001/");
=======
    app.listen(3000, () => {
      console.log("Server is running at http://localhost:3000/");
>>>>>>> covid Q
    });
  } catch (error) {
    console.log(`DB ERROR: ${error.message}`);
    process.exit(1);
  }
};

initializeDBWithServer();

<<<<<<< HEAD
const getMovies = (movie) => {
  return {
    movieId: movie.movie_id,
    directorId: movie.director_id,
    movieName: movie.movie_name,
    leadActor: movie.lead_actor,
  };
};

const getDirectors = (director) => {
  return {
    directorId: director.director_id,
    directorName: director.director_name,
  };
};

const movieName = (each) => {
  return {
    movieName: each.movie_name,
  };
};

//GET ALL Movies API
app.get("/movies/", async (request, response) => {
  const moviesQuery = `SELECT * FROM movie ORDER BY movie_id;`;
  const getAllMovies = await database.all(moviesQuery);
  response.send(getAllMovies.map((each) => movieName(each)));
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
  response.send(getAllDirectors.map((each) => getDirectors(each)));
});

//GET movieName with directorId API
app.get("/directors/:directorId/movies/", async (request, response) => {
  const { directorId } = request.params;
  const getMovieByDirector = `SELECT * FROM movie WHERE director_id=${directorId};`;
  const dbResponse = await database.all(getMovieByDirector);
  response.send(dbResponse.map((each) => movieName(each)));
=======
const getInstanceObj = (eachState) => {
  return {
    stateId: eachState.state_id,
    stateName: eachState.state_name,
    population: eachState.population,
  };
};

const getInstanceDistrictObj = (district) => {
  return {
    districtId: district.district_id,
    districtName: district.district_name,
    stateId: district.state_id,
    cases: district.cases,
    cured: district.cured,
    active: district.active,
    deaths: district.deaths,
  };
};

const getStatsObj = (state) => {
  return {
    totalCases: state.cases,
    totalCured: state.cured,
    totalActive: state.active,
    totalDeaths: state.deaths,
  };
};

//GET states API
app.get("/states/", async (request, response) => {
  const statesQuery = `SELECT * FROM state ORDER BY state_id;`;
  const dbResponse = await database.all(statesQuery);
  const getAllStates = dbResponse.map((eachState) => getInstanceObj(eachState));
  response.send(getAllStates);
});

//GET state API
app.get("/states/:stateId/", async (request, response) => {
  const { stateId } = request.params;
  const query = `SELECT * FROM state WHERE state_id=${stateId};`;
  const getResponse = await database.get(query);
  response.send(getInstanceObj(getResponse));
});

//POST District API
app.post("/districts/", async (request, response) => {
  const { districtName, stateId, cases, cured, active, deaths } = request.body;

  const postQuery = `INSERT INTO district (district_name,state_id,cases,cured,active,deaths) 
    VALUES ('${districtName}','${stateId}','${cases}','${cured}','${active}','${deaths}');`;

  await database.run(postQuery);
  response.send("District Successfully Added");
});

//GET District API
app.get("/districts/:districtId/", async (request, response) => {
  const { districtId } = request.params;
  const districtQuery = `SELECT * FROM district WHERE district_id=${districtId};`;
  const getDistrict = await database.get(districtQuery);
  response.send(getInstanceDistrictObj(getDistrict));
});

//DELETE district API
app.delete("/districts/:districtId/", async (request, response) => {
  const { districtId } = request.params;
  const deleteQuery = `DELETE FROM district WHERE district_id=${districtId};`;
  await database.run(deleteQuery);
  response.send("District Removed");
});

//PUT district API
app.put("/districts/:districtId/", async (request, response) => {
  const { districtId } = request.params;
  const { districtName, stateId, cases, cured, active, deaths } = request.body;

  const updateQuery = `UPDATE district SET 
  district_name='${districtName}',state_id='${stateId}',cases='${cases}',cured='${cured}',active='${active}',deaths='${deaths}' 
  WHERE district_id=${districtId};`;

  await database.run(updateQuery);
  response.send("District Details Updated");
});

//GET state API
app.get("/states/:stateId/stats", async (request, response) => {
  const { stateId } = request.params;
  const query = `SELECT * FROM district WHERE state_id=${stateId};`;
  const getResponse = await database.get(query);
  response.send(getStatsObj(getResponse));
});

app.get("/districts/:districtId/details", async (request, response) => {
  const { districtId } = request.params;
  const query = `SELECT * FROM district WHERE district_id=${districtId};`;
  const getResponse = await database.get(query);

  const stateQuery = `SELECT state_name AS stateName FROM state WHERE state_id = ${getResponse.state_id}`;
  const getStateName = await database.get(stateQuery);
  response.send(getStateName);
>>>>>>> covid Q
});

module.exports = app;
