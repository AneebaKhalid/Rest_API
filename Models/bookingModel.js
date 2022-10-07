import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,

        name: {
            type: String,
            required: true
        },
        officeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Office',
            required: true
        },
        userId: {
            type: String,//mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        date: {
            type: String,
            required: true
        },
        timeslot: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
)

export default mongoose.model('Booking', bookingSchema);