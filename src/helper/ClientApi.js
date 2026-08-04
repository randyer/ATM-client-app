import { get, put } from "aws-amplify/api";

// Every client gets a concrete list_position within its status group so the
// custom sort never has to guess where position-less clients belong. Clients
// missing a position are appended to the bottom of their group in arrival
// order (oldest status change first; no timestamp goes last). Returns the
// clients that were assigned a position so the caller can persist them.
function normalizePositions(clients) {
  const assigned = [];
  const groups = {};
  clients.forEach((client) => {
    (groups[client.status] = groups[client.status] || []).push(client);
  });

  Object.values(groups).forEach((group) => {
    let maxPos = Math.max(
      0,
      ...group
        .map((c) => c.list_position)
        .filter((v) => v != null && !isNaN(v))
    );

    group
      .filter((c) => c.list_position == null)
      .sort((a, b) => {
        if (!a.last_status_change && !b.last_status_change) return 0;
        if (!a.last_status_change) return 1;
        if (!b.last_status_change) return -1;
        return new Date(a.last_status_change) - new Date(b.last_status_change);
      })
      .forEach((c) => {
        c.list_position = ++maxPos;
        assigned.push({ id: c.id, list_position: c.list_position });
      });
  });

  return assigned;
}

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

      const assigned = normalizePositions(formattedClients);
      setClients(formattedClients);

      // Persist backfilled positions so clients without a stored order don't
      // get re-appended below newer arrivals on the next fetch
      if (assigned.length > 0) {
        try {
          await put({
            apiName: "apiclient",
            path: "/clients",
            options: { body: assigned },
          });
          console.log(
            `Backfilled list_position for ${assigned.length} clients`
          );
        } catch (error) {
          console.error("Error persisting backfilled positions:", error);
        }
      }
    } else {
      console.log("Response is not an array:", response);
    }
  } catch (error) {
    console.error("Error fetching clients:", error);
  }
}
