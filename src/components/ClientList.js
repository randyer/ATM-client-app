import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as NeedsReview } from "../icons/importantFill.svg";
import { ReactComponent as StarFill } from "../icons/startFill.svg";
import { ReactComponent as Arrow } from "../icons/backArrow.svg";

const ClientList = ({
  clients,
  getInitials,
  sortMethod,
  setSortMethod,
  onUpdateListOrder, // new prop
}) => {
  const [localClients, setLocalClients] = useState([]);

  useEffect(() => {
    if (!clients || clients.length === 0) return;

    let initialized = [...clients];

    const allNull = initialized.every((c) => c.list_position == null);
    const someNull = initialized.some((c) => c.list_position == null);

    if (allNull) {
      initialized = initialized.map((c, i) => ({
        ...c,
        list_position: i + 1,
      }));
      setLocalClients(initialized);
      console.log("All positions were null, initializing order");
      onUpdateListOrder?.(initialized); // ✅ Call only in this case
      return;
    }

    if (someNull) {
      let maxPos =
        Math.max(
          0,
          ...initialized
            .map((c) => c.list_position)
            .filter((v) => v != null && !isNaN(v))
        ) || 0;

      initialized = initialized.map((c) =>
        c.list_position == null ? { ...c, list_position: ++maxPos } : c
      );
      setLocalClients(initialized);
      console.log("Some positions were null, fixing order");
      onUpdateListOrder?.(initialized); // ✅ Call only in this case
      return;
    }

    // If no missing positions, just sync local state without triggering update
    setLocalClients(initialized);
  }, [clients]);

  const sortClients = (clientsToSort) => {
    const clientsCopy = [...clientsToSort];
    switch (sortMethod) {
      case "alphabetical":
        return clientsCopy.sort((a, b) =>
          `${a.first_name} ${a.last_name}`.localeCompare(
            `${b.first_name} ${b.last_name}`
          )
        );
      case "queue":
        return clientsCopy.sort(
          (a, b) =>
            new Date(a.last_status_change) - new Date(b.last_status_change)
        );
      case "recentlyModified":
        return clientsCopy.sort(
          (a, b) => new Date(b.last_updated) - new Date(a.last_updated)
        );
      case "custom":
        return clientsCopy.sort((a, b) => {
          if (a.list_position == null && b.list_position == null) return 0;
          if (a.list_position == null) return 1;
          if (b.list_position == null) return -1;
          return a.list_position - b.list_position;
        });
      default:
        return clientsCopy;
    }
  };

  const handleMove = (clientId, direction) => {
    setLocalClients((prev) => {
      const sorted = sortClients(prev);
      const index = sorted.findIndex((c) => c.id === clientId);
      if (index === -1) return prev;

      const swapIndex = direction === "up" ? index - 1 : index + 1;
      if (swapIndex < 0 || swapIndex >= sorted.length) return prev;

      const updated = [...sorted];
      [updated[index], updated[swapIndex]] = [
        updated[swapIndex],
        updated[index],
      ];

      const reindexed = updated.map((c, i) => ({
        ...c,
        list_position: i + 1,
      }));

      // Only trigger update if order actually changed
      const hasChanged = reindexed.some(
        (c, i) =>
          c.id !== prev[i]?.id || c.list_position !== prev[i]?.list_position
      );

      if (hasChanged) {
        console.log("Order changed, notifying parent");
        onUpdateListOrder?.(reindexed);
      } else {
        console.log("No change in order, skipping update");
      }

      return reindexed;
    });
  };

  return (
    <div>
      <ul className="client-list">
        {sortClients(localClients).map((client) => (
          <li key={client.id} className="client-item">
            <Link to={`/client/${client.id}`} className="client-link">
              <div className="client-info-container">
                <div className="client-initials">
                  {getInitials(client.first_name, client.last_name)}
                </div>
                <div className="client-info">
                  <div className="client-name">
                    {client.first_name} {client.last_name}
                  </div>
                  <div className="client-phone">
                    {client.general_notes
                      ? client.general_notes.length > 55
                        ? `${client.general_notes.substring(0, 55)}...`
                        : client.general_notes
                      : ""}
                  </div>
                </div>
              </div>
              <div className="client-info-container">
                {client.needs_review ? (
                  <NeedsReview className="svg-icon" />
                ) : (
                  <NeedsReview className="svg-icon-hidden" />
                )}
                {client.favorite ? (
                  <StarFill className="svg-icon" />
                ) : (
                  <StarFill className="svg-icon-hidden" />
                )}
              </div>
            </Link>

            {/* Up/Down Arrows */}
            {sortMethod === "custom" && (
              <>
                <Arrow
                  style={{ transform: "rotate(90deg)", cursor: "pointer" }}
                  onClick={() => handleMove(client.id, "up")}
                />
                <Arrow
                  style={{ transform: "rotate(-90deg)", cursor: "pointer" }}
                  onClick={() => handleMove(client.id, "down")}
                />
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientList;
