const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const homeRoute = require('./routes/home');
const coursesRoute = require('./routes/courses');
const addRoute = require('./routes/add');
const cardRoute = require('./routes/card');
const orderRoute = require('./routes/orders');
const User = require('./models/user');

const app = express();

const PORT = process.env.PORT || 3000;

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

app.engine('hbs', hbs.engine); //initialize hbs engine
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(async (req, res, next) => {
    try {
        const user = await User.findById('5e9865cd22d4234ec020c923');
        req.user = user;
        next();
    } catch (e) {
        console.log(e);
    }
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use('/', homeRoute);
app.use('/add', addRoute);
app.use('/courses', coursesRoute);
app.use('/card', cardRoute);
app.use('/orders', orderRoute);

async function start() {
    try {
        const url = `mongodb+srv://Nikita:CSFuiwvxWYhgW74G@cluster0-wxbi5.mongodb.net/shop`;
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        const candidate = await User.findOne();
        
        if (!candidate) {
            const user = new User({
                name: "Nikita",
                email: "test@gmail.com",
                cart: { items: [] }
            });
            await user.save();
        }
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        });
    } catch (e) {
        console.log(e);
    }
}

start();

