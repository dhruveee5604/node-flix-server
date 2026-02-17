import mongoose, { Schema } from 'mongoose';

interface IAppointment {
    title: string;
    date: Date;
    duration: number; // in minutes
    confirmed: boolean;
}

const AppointmentSchema = new Schema<IAppointment>({
    title: {
        type: String,
        required: [true, 'Title Required']
    },
    date: {
        type: Date,
        required: [true, 'Date Required']
    },
    duration: {
        type: Number,
        min: 1,
        required: [true, 'Duration Required']
    },
    confirmed: {
        type: Boolean,
        default: false
    }
});

// make model public. As it's a mongoose model it inherits the mongoose CRUD methods
const Appointment = mongoose.model<IAppointment>('Appointment', AppointmentSchema);
export default Appointment;