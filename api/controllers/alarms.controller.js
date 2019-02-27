import mongoose from 'mongoose';
import { addJob, removeJob } from '../jobs/cron';
import { searchOnYouTube } from '../jobs/searchOnYouTube';

export const create = async (params, body) => {
  const Alarms = mongoose.model('alarms');

  try {
    const data = await Alarms(body).save();
    addJob(data._id, data.period, searchOnYouTube.bind(null, body));
    return { status: 200, data };
  } catch(e) {
    return { status: 500, data: e };
  }
}

export const getAll = async () => {
  const Alarms = mongoose.model('alarms')
  
  try {
    const data = await Alarms.find();
    return { status: 200, data };
  } catch(e) {
    return { status: 500, data: e };
  }
}

export const getOne = async ({ alarm_id }) => {
  const Alarms = mongoose.model('alarms');

  try {
    const data = await Alarms.findOne({ _id: alarm_id }, {}, { lean: true });

    if(data) {
      return { status: 200, data };
    } else {
      return { status: 500, data: 'User Not Found' };
    }
  } catch(e) {
    return { status: 500, data: e };
  }
}

export const edit = async ({ alarm_id }, body) => {
  const Alarms = mongoose.model('alarms');

  try {
    const data = await Alarms.findOneAndUpdate({ _id: alarm_id }, body, { new: true, lean: true });
    removeJob(alarm_id);
    addJob(alarm_id, data.period, searchOnYouTube.bind(null, data));
    return { status: 200, data };
  } catch(e) {
    return { status: 500, data: e };
  }
}

export const remove = async ({ alarm_id }) => {
  const Alarms = mongoose.model('alarms');

  try {
    await Alarms.findOneAndDelete({ _id: alarm_id });
    removeJob(alarm_id);
    return { status: 200 };
  } catch(e) {
    return { status: 500, data: e };
  }
}