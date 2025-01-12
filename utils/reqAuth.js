const fetchTokens = require('./fetchTokens'); // Make sure the path to fetchTokens is correct

async function reqAuth(email, password) {
    try {
        const data = await fetchTokens(email, password);
        console.log("fetchTokens response in reqAuth:", data); // Debug to confirm what fetchTokens returns

        if (data && data.access_token && data.refresh_token) {
            return {
                token: data.access_token,
                refreshToken: data.refresh_token,
                code: 200,
            };
        } else {
            // If data is missing access_token or refresh_token
            return {
                token: null,
                refreshToken: null,
                code: 400,
            };
        }
    } catch (error) {
        console.error("Error in reqAuth:", error);
        return {
            token: null,
            refreshToken: null,
            code: 500,
        };
    }
}

module.exports = reqAuth;
