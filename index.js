const express           = require('express');
const exphbs            = require('express-handlebars');
const path              = require('path');
const mongoose          = require('mongoose');
const homeRoute         = require('./routes/home');
const coursesRoute      = require('./routes/courses');
const addRoute          = require('./routes/add');
const cardRoute         = require('./routes/card');
const orderRoute        = require('./routes/orders');
const authRoute         = require('./routes/auth');
const session           = require('express-session');
const userMiddleware    = require('./middleware/user');
const MongoStore        = require('connect-mongodb-session')(session);
const varMiddleware     = require('./middleware/variables');
const User              = require('./models/user');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = `mongodb+srv://Nikita:CSFuiwvxWYhgW74G@cluster0-wxbi5.mongodb.net/shop`;
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});
const store = new MongoStore({
    collection: 'sessions',
    uri: MONGODB_URI
});

app.engine('hbs', hbs.engine); //initialize hbs engine
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'some secret value',
    resave: false,
    saveUninitialized: false,
    store
}));
app.use(varMiddleware);
app.use(userMiddleware);
app.use('/', homeRoute);
app.use('/add', addRoute);
app.use('/courses', coursesRoute);
app.use('/card', cardRoute);
app.use('/orders', orderRoute);
app.use('/auth', authRoute);

async function start() {
    try {
        await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        });
    } catch (e) {
        console.log(e);
    }
}

start();

