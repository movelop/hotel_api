import mongoose from 'mongoose';

const FacilitySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    img: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model('Facility', FacilitySchema);