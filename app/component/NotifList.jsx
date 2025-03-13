"use client";

import { useNotifications } from "../../hooks/useNotification";
import { useEffect, useState } from "react";

export default function NotificationList({ userId }) {
  const notifications = useNotifications(userId);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Limit to the latest 5 notifications
  const latestNotifications = notifications?.slice(0, 5);

  return (
    <div style={styles.container} className={isMounted ? "fade-in" : ""}>
      <h2 style={styles.title}>🔔 Notifikasi</h2>

      <div style={styles.notificationBox}>
        <ul style={styles.notificationList}>
          {latestNotifications?.length > 0 ? (
            latestNotifications.map(({ message }) => (
              <li key={message.id} style={styles.notificationItem}>
                <h3 style={styles.notificationTitle}>{message.title}</h3>
                <p style={styles.notificationContent}>{message.content}</p>
                <p style={styles.notificationMeta}>
                  <strong>📂 Category:</strong> {message.category}
                </p>
                <p style={styles.notificationMeta}>
                  <strong>📅 Date:</strong> {new Date(message.date).toLocaleString()}
                </p>
              </li>
            ))
          ) : (
            <p style={styles.noNotifications}>Tidak ada notifikasi.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

// 🎨 CSS in JS
const styles = {
  container: {
    backgroundColor: "#121212",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    width: "90%",
    maxWidth: "600px",
    padding: "20px",
    textAlign: "center",
    opacity: 0,
    transform: "translateY(20px)",
    transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  notificationBox: {
    backgroundColor: "#1e1e1e",
    borderRadius: "12px",
    padding: "15px",
    boxShadow: "0 4px 10px rgba(255, 255, 255, 0.1)",
    width: "100%",
  },
  notificationList: {
    listStyle: "none",
    padding: 0,
  },
  notificationItem: {
    backgroundColor: "#292929",
    borderRadius: "10px",
    padding: "15px",
    marginBottom: "10px",
    textAlign: "left",
    opacity: 0,
    transform: "translateY(10px)",
    animation: "fadeIn 0.4s forwards ease-in-out",
    transition: "transform 0.2s ease-in-out",
    cursor: "pointer",
  },
  notificationItemHover: {
    transform: "translateY(-3px)",
    backgroundColor: "#333",
  },
  notificationTitle: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  notificationContent: {
    fontSize: "14px",
    color: "#bbb",
    margin: "5px 0",
  },
  notificationMeta: {
    fontSize: "12px",
    color: "#888",
  },
  noNotifications: {
    color: "#888",
    fontSize: "14px",
  },
};

// 🌀 Animasi CSS
const globalStyles = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .fade-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }

  .notification-item:hover {
    transform: translateY(-3px) !important;
    background-color: #333 !important;
  }
`;

// Inject global styles
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = globalStyles;
document.head.appendChild(styleSheet);
