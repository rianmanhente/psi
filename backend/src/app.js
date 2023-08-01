const express = require('express');
const session = require('express-session');
require('./config/dotenv')();
require('./config/sequelize');
require('./config/Auth');

const app = express();
const port = process.env.PORT;
//const cors = require('cors');
const routes = require('./routes/routes');

app.use(session({
  secret: 'mypassword',
  resave: false,
  saveUninitialized: true
}));

const passport = require("passport");
require("./middlewares/jwtPassport")(passport);
app.use(passport.initialize());
app.use(passport.session())


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(routes);


app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`${process.env.APP_NAME} Server listening at http://localhost:${port}`);
});
