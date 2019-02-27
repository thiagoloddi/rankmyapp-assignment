import express from "express";
import path from "path";
import bodyParser from 'body-parser';

import compression from "compression";
import createRouter from "./api/router/alarms.router";

const env = process.env.NODE_ENV || 'local';

const app = express();

app.set('mongoUrl', process.env.MONGO_URL || 'mongodb://localhost/rankmyapp');

app.use(compression());

app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const port = process.env.PORT || "8080";

app.use('/alarms', createRouter());

app.get("*", (req, res) => {
  res.render("index");
});

export default app;
