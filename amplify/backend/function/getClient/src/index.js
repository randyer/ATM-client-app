const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
    console.log(event);

    const clientCONNECTION = new Client({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        ssl: {
            rejectUnauthorized: true, // Ensure the server certificate is validated
            ca: fs.readFileSync(path.join(__dirname, 'us-east-2-bundle.pem')).toString(), // Path to your certificate file
        },
    });

    try {
        await clientCONNECTION.connect();
        console.log('Database connection established');

        const clientPhone = event.pathParameters.clientPhone;
        console.log(`Fetching details for phone number: ${clientPhone}`);

        const res = await clientCONNECTION.query('SELECT * FROM client WHERE phone = $1', [clientPhone]);

        let clientData;
        if (res.rows.length > 0) {
            clientData = { 'clientPhone': clientPhone, 'clientName': res.rows[0].name };
        } else {
            clientData = { 'clientPhone': clientPhone, 'clientName': "client " + clientPhone };
        }

        const response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            body: JSON.stringify(clientData),
        };

        return response;
    } catch (error) {
        console.error('Database connection error', error);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Database connection failed' }),
        };
    } finally {
        await clientCONNECTION.end();
        console.log('Database connection closed');
    }
};
