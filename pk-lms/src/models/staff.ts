import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the staff document
interface IStaff extends Document {
    name: string;
    surname: string;
    email: string;
    role: string;
    securityLevel: string; // Changed to match the form field
}

// Define the schema for the staff
const StaffSchema: Schema = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
    securityLevel: { type: String, required: true } // Changed to match the form field
});

// Create and export the Staff model
const Staff = mongoose.model<IStaff>('Staff', StaffSchema);

export default Staff;
