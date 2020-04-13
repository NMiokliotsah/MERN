const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const homeRoute = require('./routes/home');
const coursesRoute = require('./routes/courses');
const addRoute = require('./routes/add');
const cardRoute = require('./routes/card');


const app = express();

const PORT = process.env.PORT || 3000;

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

app.engine('hbs', hbs.engine); //initialize hbs engine
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true})); // ????
app.use('/', homeRoute);
app.use('/courses', coursesRoute);
app.use('/add', addRoute);
app.use('/card', cardRoute);

app.listen(PORT, () => {
    console.log("Server is running")
}); 