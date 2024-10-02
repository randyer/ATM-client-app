const { Client } = require("pg");
const fs = require("fs");
const path = require("path");

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(event);

  const clientCONNECTION = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
      rejectUnauthorized: true, // Ensure the server certificate is validated
      ca: fs
        .readFileSync(path.join(__dirname, "us-east-2-bundle.pem"))
        .toString(),
    },
  });

  try {
    await clientCONNECTION.connect();
    console.log("Database connection established");

    let response;
    const method = event.httpMethod;
    let id;

    let data;

    // Only parse body if it's a POST, PUT, or DELETE request
    if (method === "POST" || method === "PUT" || method === "DELETE") {
      if (event.body) {
        data =
          typeof event.body === "string" ? JSON.parse(event.body) : event.body;
      }
    }
    id = event.pathParameters?.clientId || false;
    switch (method) {
      case "GET":
        if (id) {
          const res = await clientCONNECTION.query(
            "SELECT * FROM client WHERE id = $1",
            [id]
          );
          response = res.rows[0];
        } else {
          const res = await clientCONNECTION.query("SELECT * FROM client");
          response = res.rows;
        }
        break;

      case "POST":
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
          data.hasOwnProperty("first_name") && data.first_name !== ""
            ? data.first_name
            : null,
          data.hasOwnProperty("last_name") && data.last_name !== ""
            ? data.last_name
            : null,
          data.hasOwnProperty("phone") && data.phone !== "" ? data.phone : null,
          data.hasOwnProperty("email") && data.email !== "" ? data.email : null,
          data.hasOwnProperty("dob") && data.dob !== "" ? data.dob : null,
          data.hasOwnProperty("street") && data.street !== ""
            ? data.street
            : null,
          data.hasOwnProperty("city") && data.city !== "" ? data.city : null,
          data.hasOwnProperty("state") && data.state !== "" ? data.state : null,
          data.hasOwnProperty("zip") && data.zip !== "" ? data.zip : null,
          data.hasOwnProperty("emergency_contact") &&
          data.emergency_contact !== ""
            ? data.emergency_contact
            : null,
          data.hasOwnProperty("emergency_contact_phone") &&
          data.emergency_contact_phone !== ""
            ? data.emergency_contact_phone
            : null,
          data.hasOwnProperty("heard_about_us") && data.heard_about_us !== ""
            ? data.heard_about_us
            : null,
          data.hasOwnProperty("current_symptoms") &&
          data.current_symptoms !== ""
            ? data.current_symptoms
            : null,
          data.hasOwnProperty("past_symptoms") && data.past_symptoms !== ""
            ? data.past_symptoms
            : null,
          data.hasOwnProperty("past_injuries") && data.past_injuries !== ""
            ? data.past_injuries
            : null,
          data.hasOwnProperty("past_surgeries") && data.past_surgeries !== ""
            ? data.past_surgeries
            : null,
          data.hasOwnProperty("form_data") && data.form_data !== ""
            ? data.form_data
            : null,
        ];
        const insertRes = await clientCONNECTION.query(
          insertQuery,
          insertValues
        );
        response = insertRes.rows[0];
        break;

      case "PUT":
        const updateQuery = `
            UPDATE client SET
              first_name = $1,
              last_name = $2,
              phone = $3,
              email = $4,
              dob = $5,
              street = $6,
              city = $7,
              state = $8,
              zip = $9,
              emergency_contact = $10,
              emergency_contact_phone = $11,
              heard_about_us = $12,
              current_symptoms = $13,
              past_symptoms = $14,
              past_injuries = $15,
              past_surgeries = $16,
              form_data = $17,
              general_notes = $18,
              objective = $19,
              assessment = $20,
              plan = $21,
              favorite = $22,
              needs_review = $23,
              status = $24,
              last_updated = $25,
              last_status_change = $26,
              scheduling_notes = $27
          WHERE id = $28 RETURNING *;
        `;
        const updateValues = [
          data.first_name,
          data.last_name,
          data.phone,
          data.email,
          data.dob,
          data.street,
          data.city,
          data.state,
          data.zip,
          data.emergency_contact,
          data.emergency_contact_phone,
          data.heard_about_us,
          data.current_symptoms,
          data.past_symptoms,
          data.past_injuries,
          data.past_surgeries,
          data.form_data,
          data.general_notes,
          data.objective,
          data.assessment,
          data.plan,
          data.favorite,
          data.needs_review,
          data.status,
          data.last_updated,
          data.last_status_change,
          data.scheduling_notes,
          id,
        ];
        const updateRes = await clientCONNECTION.query(
          updateQuery,
          updateValues
        );
        response = updateRes.rows[0];
        break;

      case "DELETE":
        id = event.pathParameters.clientId;
        const deleteQuery = "DELETE FROM client WHERE id = $1 RETURNING *;";
        const deleteRes = await clientCONNECTION.query(deleteQuery, [id]);
        response = deleteRes.rows[0];
        break;

      default:
        response = {
          message: `Unsupported HTTP method. Event: ${Object.keys(event)} `,
        };
    }

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
    console.error("Database connection error", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Database operation failed" }),
    };
  } finally {
    await clientCONNECTION.end();
    console.log("Database connection closed");
  }
};
