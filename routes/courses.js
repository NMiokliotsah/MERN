const {Router} = require('express');
const courses = require('../data/courses.json');
const router = Router();

router.get('/', (req, res) => {
    res.render('courses', {
        title:'Courses',
        isCourses: true,
        courses
    });
});

module.exports = router;