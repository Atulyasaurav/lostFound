const axios = require('axios');
require('dotenv').config();

async function fetchTokens(email, password) {
    const url = 'https://ckhtmevlcepvzkixgtxm.supabase.co/auth/v1/token?grant_type=password';
    const apiKey = process.env.APIKEY;
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
        return await response.data ;
    } catch (err) {
        console.error("Error:", err.response ? err.response.data : err.message);
        return null;
    }
}

module.exports = fetchTokens;