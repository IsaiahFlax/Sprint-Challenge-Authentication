const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require("express-session")
const knexSessionStore = require("connect-session-knex")(session)

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

const sessionConfig = {

    name: "this is the session name",
    secret:
      process.env.SECRETS ||
      "I am nothing more than a man, and yet I am everything.",
    cookie: {
      //miliseconds
      maxAge: 3600 * 1000,
      secure: false, //should be true in production
      httpOnly: true //Only thing that can access this is html
    },
    resave: false, //don't want to resave data in db
    saveUninitialized: false, //gdpr -> need permission to save cookie. Can't automatically
  
    store: new knexSessionStore({
      knex: require("../database/dbConfig.js"),
      //which table contains session data
      tablename: "sessions",
      sidfieldname: "sid",
      createTable: true,
      clearInterval: 3600 * 1000
    })
  }

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use(session(sessionConfig))
server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

server.get("/", (req, res) => {
    res.json({ api: "up" });
  })

module.exports = server;
