"use client";

import { useEffect, useState } from 'react'
import { transmit } from '../lib/transmit'

export function useNotifications(userId) {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    if (!userId) return;

    const subscription = transmit.subscription(`notifications/${userId}`);

    async function subscribe() {
      await subscription.create();
      subscription.onMessage((data) => {
        console.log(data);
        setNotifications((prev) => [data, ...prev]);
      });
    }

    subscribe();

    console.log("notifications : ", subscription);

    return () => {
      subscription.delete(); // Unsubscribe ketika komponen unmount
    };
  }, [userId]);

  return notifications;
}
