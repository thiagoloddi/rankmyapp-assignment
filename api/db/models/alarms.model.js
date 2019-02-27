import mongoose, { Schema } from "mongoose";

const alarmsModel = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true,  },
    search_term: { type: String, required: true },
    period: { type: Number, required: true }
});


export default alarmsModel;