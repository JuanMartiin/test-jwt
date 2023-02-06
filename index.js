const express = require('express');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bodyparser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`servidor andando en: ${PORT}`)
});

app.post('/login', async (req, res) => {
   
    // create token
    const token = jwt.sign({
        name: "juan",
        id: "1"
    }, process.env.TOKEN_SECRET);
    
    res.header('auth-token', token).json({
        data: {token}
    });
});

const midd = (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
        if (!token) return res.status(403).json("Access denied.");

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded;
        next();
        
        
    } catch (error) {
        res.status(400).send("Invalid token");
    }
};

app.get("/request", midd, (req, res) => {
    
        res.json("Token validado");
});
