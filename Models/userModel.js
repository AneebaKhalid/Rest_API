import mongoose from 'mongoose';

export const options = { discriminatorKey: 'kind', timestamps: true }
const userSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,

        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            default: false,
            required: true
        },
        bookings: [{
            type: String
        }]
    },
    options
)

export default mongoose.model('User', userSchema);