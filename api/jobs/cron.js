import { CronJob } from 'cron';

const jobs = {};

export const addJob = (id, period, job) => {
  // console.log(`Scheduling job with id ${id} every ${period} minutes`)
  const cronJob = new CronJob(`0 */${period} * * * *`, job);
  jobs[id] = cronJob;
  cronJob.start();
}

export const removeJob = id => {
  if(jobs[id]) {
    // console.log(`Removing job with id ${id}`);
    jobs[id].stop();
    delete jobs[id];
  }
}