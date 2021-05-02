// DevOps with Docker, Node and Express Demo App

const express = require('express');

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

const app = express();
app.use(express.static('public'));

const appRoutes = require('./routes/appRoutes');

app.use(appRoutes);

app.listen(port, 
           process.env.HOST,
           () => {
             console.log(`Server is listening on ${host}:${port}`)
           }
);