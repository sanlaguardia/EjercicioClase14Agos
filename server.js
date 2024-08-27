const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./app/config/db.config.js');

// Sync database
db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and Resync with { force: true }');
});

// Middleware
app.use(cors({ origin: 'http://localhost:4200', optionsSuccessStatus: 200 }));
app.use(bodyParser.json());

// Combined routes
const routers = require('./app/routes/routers.js');
app.use('/', routers);

app.get("/", (req, res) => {
  res.json({ message: "Bienvenido Estudiantes de UMG" });
});

// Start server
const server = app.listen(8080, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log("App listening at http://%s:%s", host, port);
});
