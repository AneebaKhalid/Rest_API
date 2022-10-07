import express from 'express';
import bodyParser from 'body-parser';
import movieRoutes from './routes/movies.js'
import officeRoutes from './Routes/offices.js'
import bookingRoutes from './Routes/bookings.js'
import mongoose from 'mongoose';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect("mongodb+srv://roomy:roomy@roomy-admin.xtpnmuh.mongodb.net/?retryWrites=true&w=majority");


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept, Authorization,');
    if (req.methon === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, PUT');
        res.status(200).json({});
    }
    next();
});

app.use('/movies', movieRoutes);
app.use('/offices', officeRoutes);
app.use('/bookings', bookingRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({ error: { message: error.message } });
});

app.listen(port, () => console.log(`Running on PORT: http://localhost:${port}`));