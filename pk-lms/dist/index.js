"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const students_1 = __importDefault(require("./models/students"));
const staff_1 = __importDefault(require("./models/staff"));
const tasks_1 = __importDefault(require("./models/tasks"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/lms';
mongoose_1.default.connect(mongoUri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));
// Middleware to parse URL-encoded data
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Serve static files from the 'public' directory
app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'public')));
// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '..', 'public', 'index.html'));
});
// Handle form student submission
app.post('/add-student', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, surname, grade, compLevel } = req.body;
    if (!name || !surname || !grade || !compLevel) {
        return res.status(400).send('Name, Surname, Grade, and Compuer Level are required');
    }
    try {
        const student = new students_1.default({ name, surname, grade, compLevel });
        yield student.save();
        res.send('Student saved successfully!');
    }
    catch (err) {
        res.status(500).send('Failed to save student');
    }
}));
// Handle form staff submission
app.post('/add-staff', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, surname, role, email, securityLevel } = req.body;
    if (!name || !surname || !role || !email || !securityLevel) {
        return res.status(400).send('Name, Surname, Role, email, and Security Level are required');
    }
    try {
        const staff = new staff_1.default({ name, surname, role, email, securityLevel });
        yield staff.save();
        res.send('Staff saved successfully!');
    }
    catch (err) {
        res.status(500).send('Failed to save staff');
    }
}));
// Handle form task submission
app.post('/add-task', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { description, title, staffId, dueDate } = req.body;
    if (!description || !title || !staffId || !dueDate) {
        return res.status(400).send('A Title, Description, Staff Assignment, and Due Date are required');
    }
    try {
        const task = new tasks_1.default({ description, title, staffId, dueDate });
        yield task.save();
        res.send('Task saved successfully!');
    }
    catch (err) {
        res.status(500).send('Failed to save task');
    }
}));
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
// Endpoint to get staff members for the dropdown
app.get('/staff-list', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const staffList = yield staff_1.default.find({}, 'name surname'); // Fetch only name and surname fields
        res.json(staffList);
    }
    catch (err) {
        res.status(500).send('Failed to retrieve staff list');
    }
}));
// Endpoint to get student data
app.get('/student-list', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield students_1.default.find({});
        res.json(students);
    }
    catch (err) {
        res.status(500).send('Failed to retrieve student data');
    }
}));
// Endpoint to get staff data
app.get('/staff-data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const staffData = yield staff_1.default.find({});
        res.json(staffData);
    }
    catch (err) {
        res.status(500).send('Failed to retrieve staff list');
    }
}));
// Endpoint to get student data
app.get('/task-list', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield students_1.default.find({});
        res.json(tasks);
    }
    catch (err) {
        res.status(500).send('Failed to retrieve student data');
    }
}));
//Endpoint for downloading student data as excel file
app.get('/studentDisplay', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield students_1.default.find({});
        res.json(students);
    }
    catch (err) {
        res.status(500).send('Failed to retrieve students');
    }
}));
//Endpoint for downloading staff data as excel file
app.get('/staffDisplay', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const staffs = yield staff_1.default.find({});
        res.json(staffs);
    }
    catch (err) {
        res.status(500).send('Failed to retrieve staff');
    }
}));
//Endpoint for downloading tasks data as excel file
app.get('/taskDisplay', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield tasks_1.default.find({});
        res.json(tasks);
    }
    catch (err) {
        res.status(500).send('Failed to retrieve tasks');
    }
}));
// Search for students by name or surname
app.get('/search-student', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req.query; // Get search query from request
    if (!query) {
        return res.status(400).send('Search query is required');
    }
    try {
        // Find students whose name or surname matches the query (case-insensitive)
        const students = yield students_1.default.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { surname: { $regex: query, $options: 'i' } }
            ]
        });
        if (students.length === 0) {
            return res.status(404).send('No students found');
        }
        res.json(students);
    }
    catch (err) {
        res.status(500).send('Failed to search for students');
    }
}));
// Edit a student's information by ID
app.put('/edit-student/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, surname, grade, compLevel } = req.body;
    try {
        const updatedStudent = yield students_1.default.findByIdAndUpdate(id, { name, surname, grade, compLevel }, { new: true, runValidators: true } // Return the updated document
        );
        if (!updatedStudent) {
            return res.status(404).send('Student not found');
        }
        res.send('Student updated successfully');
    }
    catch (err) {
        res.status(500).send('Failed to update student');
    }
}));
// Delete a student by ID
app.delete('/delete-student/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedStudent = yield students_1.default.findByIdAndDelete(id);
        if (!deletedStudent) {
            return res.status(404).send('Student not found');
        }
        res.send('Student deleted successfully');
    }
    catch (err) {
        res.status(500).send('Failed to delete student');
    }
}));
