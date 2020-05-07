import Express from 'express';
import BodyParser from 'body-parser';
import Controller from './controller';
import cookieParser from 'cookie-parser';


const app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.status(200).send("Hello World!");
  });

const getUserHandler = (req, res, next) => {
    const userHandler = Controller.getdbName() // <--- This line is causing the jest error
} 


module.exports = app;