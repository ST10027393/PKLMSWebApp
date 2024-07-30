import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/lms';

mongoose.connect(mongoUri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

app.get('/', (req, res) => {
    res.send('Hello, Learner Management System!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

//version testing