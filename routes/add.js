const { Router } = require('express');
const Course = require('../models/course');
const { validationResult } = require('express-validator')
const { courseValidate } = require('../utils/validators');
const auth = require('../middleware/auths');
const router = Router();

router.get('/', auth, (req, res) => {
    res.render('addCourse', {
        title: "Add",
        isAdd: true
    });
});

router.post('/', auth, courseValidate, async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(402).render('addCourse', {
            title: "Add",
            isAdd: true,
            error: errors.array()[0].msg,
            data: {
                title: req.body.title,
                price: req.body.price,
                img: req.body.img,
            }
        });
    }
    const course = new Course({
        title: req.body.title,
        price: req.body.price,
        img: req.body.img,
        userId: req.user
    });

    try {
        await course.save();
        res.redirect('/courses');
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;