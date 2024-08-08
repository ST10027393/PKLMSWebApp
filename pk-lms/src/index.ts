import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import Student from './models/students';
import Staff from './models/staff';
import Task from './models/tasks'; 

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/lms';

mongoose.connect(mongoUri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Middleware to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '..', 'public')));

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Handle form student submission
app.post('/add-student', async (req, res) => {
    const { name, surname, grade, compLevel } = req.body;

    if (!name || !surname || !grade || !compLevel) {
        return res.status(400).send('Name, Surname, Grade, and Compuer Level are required');
    }

    try {
        const student = new Student({ name });
        await student.save();
        res.send('Student saved successfully!');
    } catch (err) {
        res.status(500).send('Failed to save student');
    }
});

// Handle form staff submission
app.post('/add-staff', async (req, res) => {
    const { name, surname, role, email, seclevel } = req.body;

    if (!name || !surname || !role || !email || !seclevel) {
        return res.status(400).send('Name, Surname, Role, email, and Security Level are required');
    }

    try {
        const staff = new Staff({ name });
        await staff.save();
        res.send('Staff saved successfully!');
    } catch (err) {
        res.status(500).send('Failed to save staff');
    }
});

// Handle form task submission
app.post('/add-task', async (req, res) => {
    const { description, title, staffId, dueDate } = req.body;

    if (!description || !title || !staffId || !dueDate) {
        return res.status(400).send('A Title, Description, Staff Assignment, and Due Date are required');
    }

    try {
        const task = new Task({ description });
        await task.save();
        res.send('Task saved successfully!');
    } catch (err) {
        res.status(500).send('Failed to save task');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
