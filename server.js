require('dotenv').config();
const express = require('express');
const fs = require('fs');
const https = require('https');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();

// Set up HTTPS
const privateKey = fs.readFileSync('C:/Users/antho/Downloads/My Protfolio Website/Certificates/key.pem', 'utf8');
const certificate = fs.readFileSync('C:/Users/antho/Downloads/My Protfolio Website/Certificates/cert.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client', 'build'))); // Serves the files from the React app's build directory

// Verify the MongoDB URI
console.log('MongoDB URI:', process.env.MONGODB_URI);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

// Start HTTPS server
const httpsServer = https.createServer(credentials, app);
const PORT = process.env.PORT || 5000;
httpsServer.listen(PORT, () => {
    console.log(`Server running on https://localhost:${PORT}`);
});
