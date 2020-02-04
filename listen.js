const app = require('./app');

app.listen(9090, () => {
  console.log('listening on port 9090!')
});

//the listen method binds the app to the relevant port, so it can listen for requests on, in this case, port 9090