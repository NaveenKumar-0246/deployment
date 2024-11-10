const https = require('https');
const express = require('express');

const apiUrl = 'https://sportsapplication95763.onrender.com/App/GetMatch';

function isDisabledHours() {
    const now = new Date();
    const hours = now.getHours();
    
    // Check if the current time is between 2 AM and 4 AM
    return hours >= 2 && hours < 4;
}

const triggerApi = async () => {
    if (isDisabledHours()) {
        console.log('API triggering is disabled between 2 AM and 4 AM.');
        return; // Skip the API call if it's within disabled hours
    }

    console.log('Triggering API...');

    try {
        // Send the request using https
        https.get(apiUrl, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                console.log(`Response status: ${res.statusCode}, data:`, data);
            });
        }).on('error', (e) => {
            console.error('Error triggering API:', e.message);
        });
    } catch (error) {
        console.error('Unexpected error triggering API:', error.message);
    }
};

// Set interval to trigger the API every 10 minutes (600000 ms)
setInterval(triggerApi, 600000);

module.exports = triggerApi;