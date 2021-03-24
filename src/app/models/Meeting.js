const mongoose = require('../../database');

const MeetingSchema = new mongoose.Schema({
    meetWith: {
        type: String,
        required: true,
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    completed: {
        type: Boolean,
        required: true,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    scheduledTo: {
        type: Date,
        required: true,
    },
});

const Meeting = mongoose.model('Meeting', MeetingSchema);

module.exports = Meeting;