import { get } from "aws-amplify/api";

export async function fetchClients(setClients) {
  try {
    // Add the Authorization header to the request
    const restOperation = await get({
      apiName: "apiclient",
      path: "/clients",
    });

    const { body } = await restOperation.response;
    const response = await body.json();
    console.log("response: ", response);

    if (Array.isArray(response)) {
      console.log("Updating clients state with response data.");

      // Reformat the dob field to 'yyyy-mm-dd' format
      const formattedClients = response.map((client) => {
        if (client.dob) {
          client.dob = new Date(client.dob).toISOString().split("T")[0];
        }
        return client;
      });

      setClients(formattedClients);
    } else {
      console.log("Response is not an array:", response);
    }
  } catch (error) {
    console.error("Error fetching clients:", error);
  }
}
