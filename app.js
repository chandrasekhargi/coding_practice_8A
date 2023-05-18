const express = require("express");
const app = express();
app.use(express.json());

const { open } = require("sqlite");
const path = require("path");
const dbPath = path.join(__dirname, "todoApplication.db");

const sqlite3 = require("sqlite3");

let database = null;

const initializeDBWithServer = async () => {
  try {
    database = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server is running at http://localhost:3000/");
    });
  } catch (error) {
    console.log(`DB ERROR: ${error.message}`);
    process.exit(1);
  }
};

initializeDBWithServer();

app.get("/todos/", async (request, response) => {
  const {
    priority = "",
    status = "",
    limit = 100,
    offset = 0,
    order = "ASC",
    order_by = "id",
  } = request.query;
  const query = `SELECT * FROM todo 
  WHERE priority LIKE '%${priority}%' AND status LIKE '%${status}%'
  GROUP BY ${order_by}  ORDER BY ${order_by} ${order} LIMIT ${limit} OFFSET ${offset};`;
  const result = await database.all(query);
  response.send(result);
});

app.get("/todos/:todoId/", async (request, response) => {
  const { todoId } = request.params;
  const query = `SELECT * FROM todo WHERE id=${todoId};`;
  const dbResponse = await database.get(query);
  response.send(dbResponse);
});

app.post("/todos/", async (request, response) => {
  const { todo, priority, status } = request.body;
  const query = `INSERT INTO todo (todo,priority,status) VALUES ('${todo}','${priority}','${status}');`;

  await database.run(query);
  response.send("Todo Successfully Added");
});

app.put("/todos/:todoId", async (request, response) => {
  const { todoId } = request.params;
  const bodyDetails = request.body;
  const { status, priority, todo } = bodyDetails;
  let query = null;

  switch (true) {
    case bodyDetails.status === undefined && bodyDetails.todo === undefined:
      query = `UPDATE todo SET priority='${priority}' WHERE id=${todoId};`;
    case bodyDetails.priority === undefined && bodyDetails.status === undefined:
      query = `UPDATE todo SET todo='${todo}' WHERE id=${todoId};`;
    case bodyDetails.priority === undefined && bodyDetails.todo === undefined:
      query = `UPDATE todo SET status='${status}' WHERE id=${todoId};`;
  }
  const getKey = Object.keys(bodyDetails);
  const getAnswer = getKey[0];

  await database.run(query);

  response.send(`${getAnswer} Updated`);
});

app.delete("/todos/:todoId", async (request, response) => {
  const { todoId } = request.params;
  const query = `DELETE FROM todo WHERE id=${todoId};`;
  await database.run(query);
  response.send("Todo Deleted");
});

module.exports = app;
