"use client";

import { useEffect, useState } from 'react'
import { transmit } from '../lib/transmit'

export function useNotifications(userId, userRole) {
  const [notifications, setNotifications] = useState([])
  console.log("userId : " , userId, "User role : ", userRole)
  useEffect(() => {
    if (!userId) return;

    const subscription = transmit.subscription(`notifications/${userRole}`);

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
      subscription.delete(); // ! Jangan di-unsubscribe ketika di unmount
        // TODO : Implement unsubscribe di logOut
    };
  }, [userId]);

  return notifications;
}
