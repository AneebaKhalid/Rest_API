import express from 'express';
import mongoose from 'mongoose';
import officeModel from '../Models/officeModel.js'; // Database Model import from Models
const router = express.Router();

// Getting all the Offices
router.get('/', (req, res, next) => {

    officeModel.find()
        .select('name location rooms _id roomBookings')
        .exec()
        .then(data => {
            const response = {
                count: data.length,
                offices: data.map(item => {
                    return {
                        name: item.name,
                        location: item.location,
                        rooms: item.rooms,
                        _id: item._id,
                        request: {
                            type: 'GET',
                            url: `http://localhost:3000/offices/find/${item._id}`
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

// Getting Office by name or id
router.get('/find/:id', (req, res) => {
    const id = req.params.id;
    officeModel.findById(id)
        .select('name location rooms _id roomBookings')
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

// Creating a new Office
router.post('/', (req, res) => {
    // Creating an object of office to post data
    const office = new officeModel({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        location: req.body.location,
        rooms: req.body.rooms
    });

    office.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: `Office is created with name : ${office.name}`,
                createdOffice: {
                    name: result.name,
                    location: result.location,
                    rooms: result.rooms,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: `http://localhost:3000/offices/${result._id}`
                    }
                }
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Not Posted Error occured',
                error: error
            });
        });
    
});

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    officeModel.remove({ _id: id })
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

// Update Office
router.patch('/:id', (req, res, next) => {
    const id = req.params.id;
    const updateOperation = {};
    for (const opr of req.body) {
        updateOperation[opr.propName] = opr.value;
    }
    officeModel.updateOne({ _id: id }, { $set: updateOperation })
        .select('name location rooms _id')
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Office Updated',
                request: {
                    type: 'GET',
                    url: `http://localhost:3000/offices/${id}`
                }
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            });
        })
});

export default router;