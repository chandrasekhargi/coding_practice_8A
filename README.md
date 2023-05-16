<<<<<<< HEAD
# Movies

Given two files `app.js` and a database file `moviesData.db` consisting of two tables `movie` and `director`.

Write APIs to perform CRUD operations on the tables `movie`, `director` containing the following columns,

**Movie Table**

| Columns     | Type    |
| ----------- | ------- |
| movie_id    | INTEGER |
| director_id | INTEGER |
| movie_name  | TEXT    |
| lead_actor  | TEXT    |

**Director Table**

| Columns       | Type    |
| ------------- | ------- |
| director_id   | INTEGER |
| director_name | TEXT    |

### API 1

#### Path: `/movies/`
=======
# Covid-19 India

Given two files `app.js` and a database file `covid19India.db` consisting of two tables `state` and `district`.

Write APIs to perform CRUD operations on the tables `state`, `district` containing the following columns,

**State Table**

| Columns    | Type    |
| ---------- | ------- |
| state_id   | INTEGER |
| state_name | TEXT    |
| population | INTEGER |

**District Table**

| Columns       | Type    |
| ------------- | ------- |
| district_id   | INTEGER |
| district_name | TEXT    |
| state_id      | INTEGER |
| cases         | INTEGER |
| cured         | INTEGER |
| active        | INTEGER |
| deaths        | INTEGER |

### API 1

#### Path: `/states/`
>>>>>>> covid Q

#### Method: `GET`

#### Description:

<<<<<<< HEAD
Returns a list of all movie names in the movie table
=======
Returns a list of all states in the state table
>>>>>>> covid Q

#### Response

```
[
  {
<<<<<<< HEAD
    movieName: "Captain America: The First Avenger",
=======
    stateId: 1,
    stateName: "Andaman and Nicobar Islands",
    population: 380581
>>>>>>> covid Q
  },

  ...
]
```

### API 2

<<<<<<< HEAD
#### Path: `/movies/`
=======
#### Path: `/states/:stateId/`

#### Method: `GET`

#### Description:

Returns a state based on the state ID

#### Response

```
{
  stateId: 8,
  stateName: "Delhi",
  population: 16787941
}
```

### API 3

#### Path: `/districts/`
>>>>>>> covid Q

#### Method: `POST`

#### Description:

<<<<<<< HEAD
Creates a new movie in the movie table. `movie_id` is auto-incremented
=======
Create a district in the district table, `district_id` is auto-incremented
>>>>>>> covid Q

#### Request

```
{
<<<<<<< HEAD
  "directorId": 6,
  "movieName": "Jurassic Park",
  "leadActor": "Jeff Goldblum"
=======
  "districtName": "Bagalkot",
  "stateId": 3,
  "cases": 2323,
  "cured": 2000,
  "active": 315,
  "deaths": 8
>>>>>>> covid Q
}
```

#### Response

```
<<<<<<< HEAD
Movie Successfully Added
```

### API 3

#### Path: `/movies/:movieId/`
=======
District Successfully Added
```

### API 4

#### Path: `/districts/:districtId/`
>>>>>>> covid Q

#### Method: `GET`

#### Description:

<<<<<<< HEAD
Returns a movie based on the movie ID
=======
Returns a district based on the district ID
>>>>>>> covid Q

#### Response

```
{
<<<<<<< HEAD
  movieId: 12,
  directorId: 3,
  movieName: "The Lord of the Rings",
  leadActor: "Elijah Wood",
}
```

### API 4

#### Path: `/movies/:movieId/`

#### Method: `PUT`

#### Description:

Updates the details of a movie in the movie table based on the movie ID

#### Request

```
{
  "directorId": 24,
  "movieName": "Thor",
  "leadActor": "Christopher Hemsworth"
}
```
=======
  districtId: 322,
  districtName: "Haveri",
  stateId: 36,
  cases: 2816,
  cured: 2424,
  active: 172,
  deaths: 220,
}
```

### API 5

#### Path: `/districts/:districtId/`

#### Method: `DELETE`

#### Description:

Deletes a district from the district table based on the district ID
>>>>>>> covid Q

#### Response

```
<<<<<<< HEAD
Movie Details Updated

```

### API 5

#### Path: `/movies/:movieId/`

#### Method: `DELETE`

#### Description:

Deletes a movie from the movie table based on the movie ID
=======
District Removed

```

### API 6

#### Path: `/districts/:districtId/`

#### Method: `PUT`

#### Description:

Updates the details of a specific district based on the district ID

#### Request

```
{
  "districtName": "Nadia",
  "stateId": 3,
  "cases": 9628,
  "cured": 6524,
  "active": 3000,
  "deaths": 104
}
```
>>>>>>> covid Q

#### Response

```
<<<<<<< HEAD
Movie Removed
```

### API 6

#### Path: `/directors/`
=======

District Details Updated

```

### API 7

#### Path: `/states/:stateId/stats/`
>>>>>>> covid Q

#### Method: `GET`

#### Description:

<<<<<<< HEAD
Returns a list of all directors in the director table
=======
Returns the statistics of total cases, cured, active, deaths of a specific state based on state ID
>>>>>>> covid Q

#### Response

```
<<<<<<< HEAD
[
  {
    directorId: 1,
    directorName: "Joe Johnston",
  },

  ...
]
```

### API 7

#### Path: `/directors/:directorId/movies/`
=======
{
  totalCases: 724355,
  totalCured: 615324,
  totalActive: 99254,
  totalDeaths: 9777
}

```

### API 8

#### Path: `/districts/:districtId/details/`
>>>>>>> covid Q

#### Method: `GET`

#### Description:

<<<<<<< HEAD
Returns a list of all movie names directed by a specific director
=======
Returns an object containing the state name of a district based on the district ID
>>>>>>> covid Q

#### Response

```
<<<<<<< HEAD
[
  {
    movieName: "Captain Marvel",
  },

  ...
]
=======

{
  stateName: "Maharashtra"
}

>>>>>>> covid Q
```

<br/>

Use `npm install` to install the packages.

**Export the express instance using the default export syntax.**

**Use Common JS module syntax.**
