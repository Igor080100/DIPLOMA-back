"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3008;
app.use(express_1.default.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,
    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404,
};
const dbTasks = [
    {
        "date": "2023-10-28",
        "task": "1111"
    },
    {
        "date": "2023-10-28",
        "task": "2222"
    },
];
app.get('/api/tasks', (req, res) => {
    res.json(dbTasks);
});
app.post('/api/tasks/:date', (req, res) => {
    const date = req.params.date;
    const newTask = req.body.task;
    dbTasks.push({ date, task: newTask });
    res.sendStatus(HTTP_STATUSES.CREATED_201);
});
app.put('/api/tasks/:date/:index', (req, res) => {
    const date = req.params.date;
    const index = parseInt(req.params.index);
    const updatedTask = req.body.task;
    const taskToUpdate = dbTasks.find(task => task.date === date);
    if (taskToUpdate && dbTasks.indexOf(taskToUpdate) === index) {
        taskToUpdate.task = updatedTask;
        res.sendStatus(HTTP_STATUSES.OK_200);
    }
    else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }
});
app.delete('/api/tasks/:date/:index', (req, res) => {
    const date = req.params.date;
    const index = parseInt(req.params.index);
    const taskToDelete = dbTasks.find(task => task.date === date);
    if (taskToDelete && dbTasks.indexOf(taskToDelete) === index) {
        dbTasks.splice(index, 1);
        res.sendStatus(HTTP_STATUSES.OK_200);
    }
    else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }
});
app.listen(port, () => {
    console.log(port + ' OK!');
});
