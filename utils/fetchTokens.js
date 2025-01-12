const axios = require('axios');

async function fetchTokens(email, password) {
    const url = 'https://ckhtmevlcepvzkixgtxm.supabase.co/auth/v1/token?grant_type=password';
    const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNraHRtZXZsY2VwdnpraXhndHhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYzNjM0NjEsImV4cCI6MjA1MTkzOTQ2MX0._f8wEbAtzMmzesm3UHxhffmw-b2UxAHXAAE0uOd1ODE";
    console.log("fetchTOkens")
    try {
        const response = await axios.post(
            url,
            { email, password },
            {
                headers: {
                    "apikey": apiKey,
                    "Content-Type": "application/json"
                }
            }
        );
        console.log("respnose data",response.data)
        return await response.data ;
    } catch (err) {
        console.error("Error:", err.response ? err.response.data : err.message);
        return null;
    }
}

module.exports = fetchTokens;