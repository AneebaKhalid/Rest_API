import express from 'express';
const router = express.Router();

// Create User
router.post('/', async (req, res, next) => {

    const newBooking = new bookingModel({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        officeId: req.params.officeId,
        userId: req.body.userId,
        date: req.body.date,
        timeslot: req.body.timeslot
    });

    try {
        const savedBooking = await newBooking.save();
        try {
            await officeModel.updateOne({ _id: newBooking.officeId }, { $push: { roomBookings: newBooking.name } })
        }
        catch (err) {
            next(err)
        }
        res.status(200).json({
            message: 'Booking is Done!',
            booking: savedBooking,
            request: {
                type: 'GET',
                url: `http://localhost:3000/bookings/find/${id}`
            }
        });
    } catch (err) {
        next(err)
    }
});

// Update User by ID
router.put('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const updateBooking = await bookingModel.updateOne({ _id: id }, { $set: req.body })
        res.status(200).json({
            message: 'Booking Updated',
            booking: updateBooking,
            request: {
                type: 'GET',
                url: `http://localhost:3000/bookings/find/${id}`
            }
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// Delete User by ID
router.delete('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        await bookingModel.findByIdAndDelete(id);
        res.status(200).json("Booking Deleted");
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// Get Users by ID
router.get('/find/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const booking = await bookingModel.findById(id);
        res.status(200).json(booking);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// Getting all Users
router.get('/', async (req, res, next) => {
    try {
        const data = await bookingModel.find();
        res.status(200).json(data
        );
    }
    catch (err) {
        res.status(500).json(err);
    }
});
export default router;