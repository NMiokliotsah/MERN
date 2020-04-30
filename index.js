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
const profileRouter     = require('./routes/profile');
const session           = require('express-session');
const keys              = require('./keys');
const flash             = require('connect-flash');
const csrf              = require('csurf');
const userMiddleware    = require('./middleware/user');
const varMiddleware     = require('./middleware/variables');
const fileMiddleware    = require('./middleware/file');
const errorHandler      = require('./middleware/error');
const MongoStore        = require('connect-mongodb-session')(session);

const app = express();
const PORT = process.env.PORT || 3000;

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: require('./utils/hbs-helper')
});
const store = new MongoStore({
    collection: 'sessions',
    uri: keys.MONGODB_URI
});

app.engine('hbs', hbs.engine); //initialize hbs engine
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use('images', express.static(path.join(__dirname, 'images')));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: keys.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store
}));
app.use(fileMiddleware.single('avatar'));
app.use(csrf());
app.use(flash());
app.use(varMiddleware);
app.use(userMiddleware);
app.use('/', homeRoute);
app.use('/add', addRoute);
app.use('/courses', coursesRoute);
app.use('/card', cardRoute);
app.use('/orders', orderRoute);
app.use('/auth', authRoute);
app.use('/profile', profileRouter);
app.use(errorHandler);

async function start() {
    try {
        await mongoose.connect(keys.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        });
    } catch (e) {
        console.log(e);
    }
}

start();

