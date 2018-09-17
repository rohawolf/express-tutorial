module.exports = function(app, fs) {

  app.get('/', (req, res) => {
    res.render('index', {
      title: "MY node.js",
      length: 5
    });
  });

  app.get('/list', (req, res) => {
    fs.readFile(__dirname + '/../data/user.json', 
    'utf8',
    (err, data) => {
      console.log(data);
      res.end(data);
    });
  });

  app.get('/list/:username', (req, res) => {
    fs.readFile(__dirname + '/../data/user.json',
      'utf8',
      (err, data) => {
        const users = JSON.parse(data);
        res.json(users[req.params.username]);
      });
  });

}
  
