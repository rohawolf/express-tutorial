const express = require('express');
const app = express();
const router = require('./router/main')(app);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

const server = app.listen(3000, () => {
   console.log("Express server has started on port 3000"); 
});

app.use(express.static('public'));
