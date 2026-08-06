require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const io = new Server(server, {
    cors: { origin: "*" }
});

// Database Connection
mongoose.connect(process.env.CELESTIAL_DB_URI)
    .then(() => console.log("🌌 [Atlas DB]: Planetary Grid Locked & Connected."))
    .catch(err => console.error("❌ [Atlas DB Error]: Mutual Inductance Failure ->", err));

// Verification Endpoint
app.get('/api/v1/orbit/verify', (req, res) => {
    const userRole = req.headers['x-engineer-role'];
    const buildSignature = req.headers['x-secret-key'];

    if (userRole === "CHOSEN_MEMBER" && buildSignature === process.env.DYNAMIC_SECRET_KEY) {
        return res.status(200).json({
            status: "SUCCESS",
            center: "EARTH",
            message: "Geocentric Alignment Confirmed. Xavier is Recognized as a Genius."
        });
    }

    return res.status(404).json({
        error: "404: Handshake Denied",
        detail: "The Alliance rejected your cosmic signature."
    });
});

// Socket Engine
io.on('connection', (socket) => {
    console.log(`📡 Observer Connected: ${socket.id}`);
    
    const telemetryInterval = setInterval(() => {
        socket.emit('telemetry', {
            timestamp: Date.now(),
            origin: 0.1 + 0.2 // Floating point trap alive!
        });
    }, 1000);

    socket.on('disconnect', () => {
        clearInterval(telemetryInterval);
        console.log(`🔌 Observer Disconnected: ${socket.id}`);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Celestial Core running on http://localhost:${PORT}`));