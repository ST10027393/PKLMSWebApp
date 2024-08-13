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
        const student = new Student({ name, surname, grade, compLevel });
        await student.save();
        res.send('Student saved successfully!');
    } catch (err) {
        res.status(500).send('Failed to save student');
    }
});

// Handle form staff submission
app.post('/add-staff', async (req, res) => {
    const { name, surname, role, email, securityLevel } = req.body;

    if (!name || !surname || !role || !email || !securityLevel) {
        return res.status(400).send('Name, Surname, Role, email, and Security Level are required');
    }

    try {
        const staff = new Staff({ name, surname, role, email, securityLevel });
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
        const task = new Task({ description, title, staffId, dueDate });
        await task.save();
        res.send('Task saved successfully!');
    } catch (err) {
        res.status(500).send('Failed to save task');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Endpoint to get staff members for the dropdown
app.get('/staff-list', async (req, res) => {
    try {
        const staffList = await Staff.find({}, 'name surname'); // Fetch only name and surname fields
        res.json(staffList);
    } catch (err) {
        res.status(500).send('Failed to retrieve staff list');
    }
});

// Endpoint to get student data
app.get('/student-list', async (req, res) => {
    try {
        const students = await Student.find({});
        res.json(students);
    } catch (err) {
        res.status(500).send('Failed to retrieve student data');
    }
});

//Endpoint for downloading student data as excel file
app.get('/studentDisplay', async (req, res) => {
    try {
        const students = await Student.find({});
        res.json(students);
    } catch (err) {
        res.status(500).send('Failed to retrieve students');
    }
});

