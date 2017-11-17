const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const {CLIENT_ORIGIN} = require('./config');

const {router: usersRouter} = require('./user/router');
const {basicStrategy, jwtStrategy} = require('./strategies');

mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require('./config');

app.use(passport.initialize());
passport.use(basicStrategy);
passport.use(jwtStrategy);

app.use('/api/users/', usersRouter);

// A protected endpoint which needs a valid JWT to access it
app.get(
    '/api/protected',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        return res.json({
            data: 'rosebud'
        });
    }
);

app.use(
    cors({
        origin: CLIENT_ORIGIN
    })
);
app.get('/api/*', (req, res) => {
  res.json({ok: true});
});

app.listen(PORT, () => console.log(`Yup its on ${PORT}`));

module.exports = {app};
