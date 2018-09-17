module.exports = function(app, fs) {
  app.get('/', (req, res) => {
    res.render('index', {
      title: "MY node.js",
      length: 5
    });
  });
}
  
