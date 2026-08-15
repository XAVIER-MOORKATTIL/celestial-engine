import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

// Define the live Render production backend URL
const BACKEND_URL = 'https://celestial-backend-college.onrender.com';

export default function App() {
    const [status, setStatus] = useState("Awaiting Handshake...");
    const [telemetry, setTelemetry] = useState(null);

    useEffect(() => {
        // Connect WebSockets directly to Render
        const socket = io(BACKEND_URL);

        socket.on('telemetry', (data) => {
            setTelemetry(data);
        });

        return () => socket.disconnect();
    }, []);

    const verifyAlignment = async () => {
        setStatus("Verifying Spatial Center...");
        try {
            // Fetch API endpoint from Render
            const res = await fetch(`${BACKEND_URL}/api/v1/orbit/verify`, {
                headers: {
                    'x-engineer-role': 'CHOSEN_MEMBER',
                    'x-secret-key': 'ORBIT_SECRET_XAVIER_999'
                }
            });
            const data = await res.json();
            if (res.ok) {
                setStatus(`SUCCESS: Center is ${data.center}! ${data.message}`);
            } else {
                setStatus(`FAILED: ${data.detail}`);
            }
        } catch (e) {
            setStatus("Network Failure: Event Loop Starved or Cold Start in Progress.");
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#090d16',
            color: '#00f2fe',
            fontFamily: 'monospace',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
        }}>
            <h1 style={{ borderBottom: '2px solid #00f2fe', paddingBottom: '0.5rem' }}>
                🌌 Quantum Geocentric Control Engine
            </h1>
            
            <button 
                onClick={verifyAlignment}
                style={{
                    padding: '1rem 2rem',
                    fontSize: '1.1rem',
                    backgroundColor: '#00f2fe',
                    color: '#090d16',
                    border: 'none',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    margin: '2rem 0'
                }}
            >
                Initiate Mastermind Handshake
            </button>

            <div style={{ background: '#111827', padding: '1.5rem', borderRadius: '8px', width: '80%', maxWidth: '600px' }}>
                <h3>System Status:</h3>
                <p style={{ color: status.includes('SUCCESS') ? '#4ade80' : '#f87171' }}>{status}</p>
                
                <h3>Live Telemetry:</h3>
                {telemetry ? (
                    <pre style={{ color: '#e2e8f0' }}>
                        {JSON.stringify(telemetry, null, 2)}
                    </pre>
                ) : (
                    <p style={{ color: '#94a3b8' }}>Waiting for socket stream...</p>
                )}
            </div>
        </div>
    );
}