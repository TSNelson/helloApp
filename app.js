// DevOps with Docker, Node and Express Demo App

const express = require('express');
const mongoose = require('mongoose');
const { MONGO_URL, REDIS_URL, REDIS_PORT, SESSION_SECRET } = require('./config/config');

const session = require('express-session');
const redis = require('redis');

const cors = require('cors');

let RedisStore = require('connect-redis')(session);
let redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT
});

const appRoutes = require('./routes/appRoutes');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

const app = express();

// Connecting to your apps' database:
// when your containers are in the same docker network, they can use docker dns, and you don't have to know the ip address of the database container. Instead, you refer to it by the service name of the container. Using mongoose to work with a mongo database, the connection is established using mongoose.connect, and takes a specially formatted URL that is contained in the config file.

// To ensure a database connection, this function would retry connecting to the database wraps the call to mongoose.connect
const connectWithRetry = () => {
  mongoose.connect(MONGO_URL, { // these options just silence a few warnings
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
    .then(() => console.log('Success! Connected to database!!!'))
    .catch(err => {
      console.log('Error connecting to database:', err);
      // here you would handle the case that the connection fails
      // this would endlessly retry the connection every 5 seconds, and could be easily improved upon
      setTimeout(connectWithRetry, 5000);
    });
}

//connectWithRetry(); // ran into a bug trying to use this function to connect

mongoose.connect(MONGO_URL, { // these options just silence a few warnings
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

// allow headers the proxy server adds
app.enable("trust proxy");
// cors middleware enables cross-origin api calls without running into cors errors
app.use(cors({}));

// store sessions in Redis
console.log('Adding session middleware');
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: SESSION_SECRET,
  cookie: {
    secure: false, 
    resave: false,
    saveUninitialized: false,
    httpOnly: true,
    maxAge: 3000000
  }
}));


// middleware attaches body to request
app.use(express.json());

app.use(express.static('public'));

app.use('/', appRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/posts', postRoutes);

app.listen(port, 
           process.env.HOST,
           () => {
             console.log(`Server is listening on ${host}:${port}`)
           }
);