
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const contestRouter = require('./routes/contest.router');
const itemRouter = require('./routes/item.router');
const organizationRouter = require('./routes/organization.router');
const scoreRouter = require('./routes/score.router');
const teamRouter = require('./routes/team.router');
const aws_sign = require('./upload/controller/controller');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

//cors for file upload to AWS
app.use(cors());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/contest', contestRouter);
app.use('/api/item', itemRouter);
app.use('/api/organization', organizationRouter);
app.use('/api/score', scoreRouter);
app.use('/api/team', teamRouter);
app.use('/api/aws', aws_sign.sign_s3);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

module.exports = app;