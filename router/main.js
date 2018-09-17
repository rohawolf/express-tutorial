module.exports = function(app, fs) {

  app.get('/', (req, res) => {
    res.render('index', {
      title: "MY node.js",
      length: 5
    });
  });

  app.get('/users', (req, res) => {
    fs.readFile(__dirname + '/../data/user.json', 
    'utf8',
    (err, data) => {
      console.log(data);
      res.end(data);
    });
  });

  app.get('/users/:username', (req, res) => {
    fs.readFile(__dirname + '/../data/user.json',
      'utf8',
      (err, data) => {
        const users = JSON.parse(data);
        res.json(users[req.params.username]);
      });
  });

  app.post('/users/add/:username', (req, res) => {
    const result = {};
    const username = req.params.username;
    
    //check validity
    if(!req.body['password'] || !req.body['name']) {
      result['success'] = 0;
      result['error'] = 'invalid request';
      res.json(result);
      return;
    }

    //load data & check duplication
    fs.readFile(__dirname + '/../data/user.json',
      'utf8',
      (err, data) => {
        const users = JSON.parse(data);
        if(users[username]) {
          // duplicate!
          result['success'] = 0;
          result['error'] = 'duplicate';
          res.json(result);
          return;
        }

        //add data
        users[username] = req.body;

        //save data
        fs.writeFile(__dirname + '/../data/user.json',
          JSON.stringify(users, null, '\t'),
          'utf8',
          (err, data) => {
            result['success'] = 1;
            res.json(result);
          });
      });
  });

  app.put('/users/update/:username', (req, res) => {
    const result = {};
    const username = req.params.username;
    
    //check validity
    if(!req.body['password'] || !req.body['name']) {
      result['success'] = 0;
      result['error'] = 'invalid request';
      res.json(result);
      return;
    }

    //load data & check duplication
    fs.readFile(__dirname + '/../data/user.json',
      'utf8',
      (err, data) => {
        const users = JSON.parse(data);
        if(!users[username]) {
          // not fount!
          result['success'] = 0;
          result['error'] = 'not fount';
          res.json(result);
          return;
        }

        //update data
        users[username] = req.body;

        //save data
        fs.writeFile(__dirname + '/../data/user.json',
          JSON.stringify(users, null, '\t'),
          'utf8',
          (err, data) => {
            result['success'] = 1;
            res.json(result);
          });
      });
  });

  app.delete('/users/delete/:username', (req, res) => {
    const result = {};
    const username = req.params.username;

    //load data & check duplication
    fs.readFile(__dirname + '/../data/user.json',
      'utf8',
      (err, data) => {
        const users = JSON.parse(data);
        
        // not fount!
        if(!users[username]) {
          result['success'] = 0;
          result['error'] = 'not fount';
          res.json(result);
          return;
        }

        //update data
        delete users[username];

        //save data
        fs.writeFile(__dirname + '/../data/user.json',
          JSON.stringify(users, null, '\t'),
          'utf8',
          (err, data) => {
            result['success'] = 1;
            res.json(result);
          });
      });
  });
}
  
