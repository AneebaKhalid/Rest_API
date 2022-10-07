import mongoose from 'mongoose';

const officeSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: {
		type: String,
		required: true
	},
	location: {
		type: String,
		required: true
	},
	rooms: {
		type: Number,
		required: true
	},
	roomBookings: [{
		type: String
    }]
});

export default mongoose.model('Office', officeSchema);