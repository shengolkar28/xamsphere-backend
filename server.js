const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// API route to get exams
app.post('/get-exams', (req, res) => {
    const { stream } = req.body;
    const filePath = path.join(__dirname, 'data', 'exams.json');

    fs.readFile(filePath, 'utf-8', (err, fileData) => {
        if (err) {
            console.error("Error reading file:", err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        const examData = JSON.parse(fileData);
        const exams = examData[stream?.toLowerCase()] || [];
        res.json({ exams });
    });
});

// Catch-all to serve homepage.html for any other routes
app.get('/*any', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'homepage.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
