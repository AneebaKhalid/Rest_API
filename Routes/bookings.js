import express from 'express';
import mongoose from 'mongoose';
import bookingModel from '../Models/bookingModel.js'; // Database Model imported from Models
import officeModel from '../Models/officeModel.js';
const router = express.Router();

// Post Booking
router.post('/:officeId', async (req, res, next) => {
    const id = req.params.officeId;
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

// Update Booking by ID
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

// Delete Booking by ID
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

// Get Booking by ID
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

// Getting all Bookings
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

/* Getting all the Bookings
router.get('/', (req, res, next) => {

    bookingModel.find()
        .select('name officeId userId date timeslot _id')
        .exec()
        .then(data => {
            const response = {
                count: data.length,
                bookings: data.map(item => {
                    return {
                        name: item.name,
                        _id: item._id,
                        officeId: item.officeId,
                        userId: item.userId,
                        date: item.date,
                        timeslot: item.timeslot,
                        request: {
                            type: 'GET',
                            url: `http://localhost:3000/bookings/${item._id}`
                        }
                    }
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

// Getting Booking by ID
router.get('/find/:bookingId', (req, res) => {
    const id = req.params.bookingId;
    bookingModel.findById(id)
        .select('name userId officeId date timeslot _id')
        .exec()
        .then(data => {
            if (data) {
                res.status(200).json(data);
            }
            else {
                res.status(404).json({
                    message: 'Not a valid Data'
                });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: error });
        });
});

// Creating a new Booking
router.post('/:officeId', (req, res) => {
    // Creating an object of booking to post data
    const id = req.params.officeId;
    const booking = new bookingModel({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        officeId: req.params.officeId,
        userId: req.body.userId,
        date: req.body.date,
        timeslot: req.body.timeslot
    });

    const office = new officeModel({
        roomBookings: [id]
    });

   
    booking.save()
        .then(result => {
            console.log(result);
           
            res.status(201).json({
                message: `Booking is created with name : ${office.roomBookings}`,
                office: office.updateOne({ _id: booking.officeId }, { $set: { roomBookings: booking._id } }).exec().then().catch(),
                createdBooking: {
                    name: result.name,
                    _id: result._id,
                    officeId: result.officeId,
                    userId: result.userId,
                    date: result.date,
                    timeslot:result.timeslot,
                    request: {
                        type: 'GET',
                        url: `http://localhost:3000/bookings/${result._id}`
                    }
                }
            });
            //officeModel.updateOne({ _id: booking.officeId }, { $set: { roomBookings: booking._id } }).exec().then().catch();
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Booking Failed',
                error: error
            });
    });

});

// Delete Booking
router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    bookingModel.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            });
        })
});

// Update a Booking
router.patch('/:id', (req, res, next) => {
    const id = req.params.id;
    const updateOperation = {};
    for (const opr of req.body) {
        updateOperation[opr.propName] = opr.value;
    }
    bookingModel.updateOne({ _id: id }, { $set: updateOperation })
        .select('name officeId userId date timeslot _id')
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Booking Updated',
                request: {
                    type: 'GET',
                    url: `http://localhost:3000/bookings/${id}`
                }
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            });
        })
});*/