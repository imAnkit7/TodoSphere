const express = require('express')
// const List = require('./db/todolist')
const jwt = require("jsonwebtoken")
//secret key for the jwt token
const JWT_SECRET = 'mySecretKey@123'
const authenticateToken = require('./authenticateToken')
const { List, Hist, User } = require('./db/todolist')
require('./db/config')
const app = express()
var cors = require('cors')
app.use(express.json())

app.use(cors())

app.post('/add', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const listData = { ...req.body, userId };

        let list = new List(listData)
        let result = await list.save()
        res.send(result)
    } catch {
        res.status(500).json({ message: 'Error saving list item.' });
    }
})
app.post('/user', async (req, res) => {
    const name = req.body.username;
    const email = req.body.email.trim().toLowerCase();
    const password = req.body.password;
    let existingUser = await User.findOne({ email: email });

    if (existingUser) {
        // If the user already exists, send a response with a message
        return res.status(400).send({ message: "Email is already in use" });
    }
    let user = new User({ name, email, password })
    let result = await user.save()
    res.send(result)
})

app.get('/todos', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;

        let result = await List.find({ userId: userId, status: "pending" })
        if (result.length > 0) {
            res.send(result)
        } else {
            res.send({ Empty: 'No todo found' })
        }
    } catch {
        res.status(500).json({ message: 'Error .' });
    }
})
app.post('/userlogin', async (req, res) => {
    const { email } = req.body
    const { password } = req.body
    try {
        let user = await User.findOne({ email })
        // let result = await User.find({username})
        if (user && user.password === password) {
            const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' })
            res.status(200).json({ message: 'Login successful', token, user });
        } else {
            res.status(400).send({ Empty: 'No todo found' })
        }
    }
    catch (err) {
        console.log(err)
    }
})

app.delete('/todos/:id', authenticateToken, async (req, res) => {  //whenever you write id in postman don'use {':'} brfore id
    let result = await List.deleteOne({ _id: req.params.id })
    res.send(result)
})

app.get('/past', authenticateToken, async (req, res) => {
    const userId = req.user.id
    let result = await List.find({ userId: userId, status: "completed" })
    if (result.length > 0) {
        res.send(result)
    } else {
        res.send({ Empty: 'No todo found' })
    }
})
app.patch('/past/:id', authenticateToken, async (req, res) => {
    try {
        // const userId = req.user.id;
        // console.log(status)
        const { status } = req.body;
        const updateData = {
            status
        };
        if (status === "completed") {
            updateData.completedAt = new Date();
        } else {
            updateData.completedAt = null;
        }
        const updatedTodo = await List.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );
        res.status(200).json(updatedTodo);
    } catch {
        res.status(500).json({ message: "Error updating status" });
    }

})

//Forgot password reset
app.post("/forgot-password", async (req, res) => {

    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
        // return res.json({ message: "" })
        return res.status(400).send({ message: "User not found" });
    }

    user.password = password

    await user.save()

    res.json({ message: "Password Updated" })

})

app.listen(5000, () => console.log('port is running'))
