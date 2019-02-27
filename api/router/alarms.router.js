import express from 'express';
import * as alarms from '../controllers/alarms.controller';
import { handle } from './handler';
const createRouter = () => {

  var router = express.Router();

  router.post("/", handle(alarms.create));
  router.get("/", handle(alarms.getAll));
  
  router.get("/:alarm_id", handle(alarms.getOne));
  router.put("/:alarm_id", handle(alarms.edit));
  router.delete("/:alarm_id", handle(alarms.remove));

  return router;
}

export default createRouter;