import Booking from "../models/Booking.js";
import Room from "../models/Room.js";

export const generateId = (length) => {
    const reandomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = '';
    for (let i = 0; i < length; i++) {
        result += reandomChars.charAt(
            Math.floor(Math.random() * reandomChars.length)
        )
    }
    return result;
}

export const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
};