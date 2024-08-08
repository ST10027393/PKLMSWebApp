import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the staff document
interface ITask extends Document {
    title: string;
    description: string;
    staffId: mongoose.Schema.Types.ObjectId; // Reference to a Staff document
    dueDate: Date;
}

// Define the schema for the task
const TaskSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true, maxlength: 100 },
    staffId: { type: Schema.Types.ObjectId, ref: 'Staff', required: true }, // Reference to the Staff model
    dueDate: { type: Date, required: true }
});

// Create and export the Task model
const Task = mongoose.model<ITask>('Task', TaskSchema);

export default Task;
