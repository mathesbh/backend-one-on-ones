const mongoose = require('../../database');

const MeetingSchema = new mongoose.Schema({
    memberName: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    scheduled: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Meeting = mongoose.model('Meeting', MeetingSchema);

module.exports = Meeting;