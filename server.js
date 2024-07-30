const dotenv = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const PORT = 3000;

// MongoDB connection
mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true });

// Define User schema and model
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', UserSchema);

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get("/register", (req, res) =>{ 
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(401).send('Invalid credentials');
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        console.log('Login unsuccessful');
        return res.status(401).send('Invalid credentials');
    }

    // Login successful
    console.log('Login successful');
    res.send('Login successful');
});

// Handle registration POST request
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        console.log('User registered successfully');
        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error:', error);
        console.log('User registration error');
        res.status(500).send('Server error');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
