const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                courseId: {
                    type: Schema.Types.ObjectId,
                    require: true,
                    ref: 'Course'
                },
                count: {
                    type: Number,
                    require: true,
                    default: 1
                }
            }
        ]
    }
});

module.exports = model('User', userSchema);