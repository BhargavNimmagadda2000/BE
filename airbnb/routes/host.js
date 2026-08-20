const express = require('express');
const hostRouter = express.Router();

hostRouter.get('/host/add-home', (req, res) => {
    res.send(`
        <h1>
            Add Home
        </h1>
        <form action="/host/add-home" method="POST">
            <label for="name">Name:</label>
            <input type="text" placeholder="Name" name="name"><br><br>
            <button type="submit">Submit</button>
        </form>
        <a href="/">Back to Home</a>
    `);
});

hostRouter.post('/host/add-home', (req, res) => {
    res.send(`
        <h1>
            Home Added Successfully
        </h1>
        <a href="/">Back to Home</a>
    `);
        console.log(req.body)
});

module.exports = hostRouter;