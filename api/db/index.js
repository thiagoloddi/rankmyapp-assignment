import mongoose from "mongoose";
import alarms from "./models/alarms.model";

const mongodb = async app => {
    const mongoUrl = app.get('mongoUrl');

    mongoose.model('alarms', alarms);

    mongoose.set('useFindAndModify', false);
    
    await mongoose.connect(mongoUrl, { useNewUrlParser: true });
}

export default mongodb;