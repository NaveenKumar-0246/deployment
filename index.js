const express = require('express');
const triggerApi = require('./Render'); // Adjust path as necessary

const app = express();
const PORT = process.env.PORT || 3000;

// Basic route to verify the server is running
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Schedule the API trigger
setInterval(triggerApi, 600000); // Triggers API every 10 minutes

// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    triggerApi(); // Trigger immediately on startup if desired
});
