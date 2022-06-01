// npm init -y and then npm install fastify for fastify packages to be installed.
//npm install nodemon -g for autmatic server restarting (do not need to install globally anymore, -g is global)
// nodemon "name of file"

const fastify = require("fastify")();

let students = [
  {
    id: 1,
    last: "Last1",
    first: "First1",
  },
  {
    id: 2,
    last: "Last2",
    first: "First2",
  },
  {
    id: 3,
    last: "Last3",
    first: "First3",
  },
];

fastify.get("/cit/student", (request, reply) => {
  // const response  = appendToStudent(newStudent);
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(students);
});

fastify.get("/cit/student/:id", (request, reply) => {
  const { id } = request.params; // request.query uses html text, params accepts data.
  let student = null;
  for (const item of students) {
    if (item.id === parseInt(id)) {
      student = item;
      break;
    }
  }

  if (!student) {
    reply
      .code(404)
      .header("Content-Type", "text/html; charset=utf-8")
      .send("Not Found");
  } else {
    if (student) {
      reply
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send(student);
    }
  }
});

// "*" catches any unmatched routes. wildcard route.

fastify.get("*", (request, reply) => {
  reply
    .code(404)
    .header("Content-Type", "text/HTML; charset=utf-8")
    .send("Not Found");
});

fastify.post("/cit/student", (request, reply) => {
  const { last, first } = request.body;
  const id = null; // this means 0.

  if (!last || !first) {
    //"or" which can execute if one of them is still true (&& is both have to be true)
    reply
      .code(404)
      .header("Content-Type", "text/html; charset=utf-8")
      .send("Not Found");
  } else {
    //for students.push
    let id = 0;
    for (const student of students) {
      if (student.id > id) {
        id = student.id;
      }
    }
    id++;
    students.push({ id, last, first });

    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send(students[students.length - 1]);
  }
  let response = request.body;
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(response);
});

//Start server here:

const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
