const { Client } = require("pg");
const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
  console.log(event);

  const clientCONNECTION = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
      rejectUnauthorized: true,
      ca: fs
        .readFileSync(path.join(__dirname, "us-east-2-bundle.pem"))
        .toString(),
    },
  });

  try {
    await clientCONNECTION.connect();
    console.log("Database connection established");

    const data = event.body ? event.body : {};

    const insertQuery = `
      INSERT INTO client (
        first_name, last_name, phone, email, dob, street, city, state, zip,
        emergency_contact, emergency_contact_phone, heard_about_us, current_symptoms,
        past_symptoms, past_injuries, past_surgeries, form_data
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17
      ) RETURNING *;
    `;
    const insertValues = [
      data.hasOwnProperty("first_name") ? data.first_name : null,
      data.hasOwnProperty("last_name") ? data.last_name : null,
      data.hasOwnProperty("phone") ? data.phone : null,
      data.hasOwnProperty("email") ? data.email : null,
      data.hasOwnProperty("dob") ? data.dob : null,
      data.hasOwnProperty("street") ? data.street : null,
      data.hasOwnProperty("city") ? data.city : null,
      data.hasOwnProperty("state") ? data.state : null,
      data.hasOwnProperty("zip") ? data.zip : null,
      data.hasOwnProperty("emergency_contact") ? data.emergency_contact : null,
      data.hasOwnProperty("emergency_contact_phone")
        ? data.emergency_contact_phone
        : null,
      data.hasOwnProperty("heard_about_us") ? data.heard_about_us : null,
      data.hasOwnProperty("current_symptoms") ? data.current_symptoms : null,
      data.hasOwnProperty("past_symptoms") ? data.past_symptoms : null,
      data.hasOwnProperty("past_injuries") ? data.past_injuries : null,
      data.hasOwnProperty("past_surgeries") ? data.past_surgeries : null,
      data.hasOwnProperty("form_data") ? data.form_data : null,
    ];

    const insertRes = await clientCONNECTION.query(insertQuery, insertValues);
    const response = insertRes.rows[0];

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(response),
    };
  } catch (error) {
    console.error("Database operation failed", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Database operation failed" }),
    };
  } finally {
    await clientCONNECTION.end();
    console.log("Database connection closed");
  }
};
