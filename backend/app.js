// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const db = require('./models');

// const app = express();

// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Import routes
// require('./routes/admin.routes')(app);
// require('./routes/course.routes')(app);
// require('./routes/departments.routes')(app);
// require('./routes/externals.routes')(app);
// require('./routes/majors.routes')(app);
// require('./routes/students.routes')(app);
// require('./routes/credential.routes')(app);
// require('./routes/accesscontrol.routes')(app);

// // Sync database
// db.sequelize.sync({ force: false })
//   .then(() => {
//     console.log('Database & tables created!');
//   })
//   .catch(err => {
//     console.error('Unable to create database & tables:', err);
//   });



// // Set port, listen for requests
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./models');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // React app URL
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure session middleware
const sessionStore = new SequelizeStore({
  db: db.sequelize,
});

app.use(session({
  secret: 'your_secret_key',
  store: sessionStore,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true in production with HTTPS
}));

// Sync session store
sessionStore.sync();

// Import routes
require('./routes/admin.routes')(app);
require('./routes/course.routes')(app);
require('./routes/departments.routes')(app);
require('./routes/externals.routes')(app);
require('./routes/majors.routes')(app);
require('./routes/students.routes')(app);
require('./routes/credential.routes')(app);
require('./routes/accesscontrol.routes')(app);

// Sync database
db.sequelize.sync({ force: false })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => {
    console.error('Unable to create database & tables:', err);
  });

// Set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
