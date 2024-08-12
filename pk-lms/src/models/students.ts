import mongoose, { Schema, Document } from 'mongoose';

interface IStudent extends Document {
    name: string;
    surname: string;
    grade: number;
    compLevel: number;
}

const StudentSchema: Schema = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    grade: { type: Number, required: true },
    compLevel: { type: Number, required: true }
});

const Student = mongoose.model<IStudent>('Student', StudentSchema);

export default Student;
