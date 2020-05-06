const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const schema = require('./schema/schema');
const Song = require('./models/songs');

const isDev = process.env.NODE_ENV !== 'production';
const MONGODB_URI = process.env.MONGODB_URI || '';
const PORT = process.env.PORT || 5000;

// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);
  // Fork workers.
  for (let i = 0; i < numCPUs; i++) { cluster.fork(); }
  cluster.on('exit', (worker, code, signal) => { console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`); });
} 

else {
  const app = express();

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

  // GraphQL requests.
  app.use("/graphql", graphqlHTTP({ schema:schema, graphiql: true }));

  // Answer API requests.
  app.get('/api', (req, res) => {
    res.set('Content-Type', 'application/json');
    res.json({"message":"Hello from the custom server!"});
  });

  // All remaining requests return the React app, so it can handle routing.
  app.get('*', (request, response) => { response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html')); });

  mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
  .then(result => {
    app.listen(PORT,()=>console.log('On port ' + PORT));
  })
  .catch(err => {
    console.log('Cant connect to mongodb: ' + err);
  });

  //app.listen(PORT, () => {
    //console.error(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${PORT}`);
  //});
}
