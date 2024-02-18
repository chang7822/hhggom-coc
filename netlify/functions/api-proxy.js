const fetch = require('node-fetch');

exports.handler = async function (event, context) {
    const { clanTag } = event.queryStringParameters;
    const API_URL = `https://api.clashofclans.com/v1/clans/${encodeURIComponent(clanTag)}/currentwar`;
    const API_KEY = process.env.VITE_APP_API_KEY;

    try {
        const response = await fetch(API_URL, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Accept': 'application/json'
            }
        });
        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        return {
            statusCode: error.statusCode || 500,
            body: JSON.stringify({ error: "An error occurred" })
        };
    }
};
