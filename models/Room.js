import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    images: {
        type: [String],
    },

    maxPeople: {
        type: Number,
        required: true,
    },

    size: {
        type: String,
        required: true,
    },

    bedding: {
        type: String,
        required: true,
    },

    desc: {
        type: String,
        required: true,
    },

    roomNumbers: [{
        number: Number,
        unavailableDates: {
            type: [Date]
        }
    }],
}, { timestamps: true });


export default mongoose.model("Room", RoomSchema);