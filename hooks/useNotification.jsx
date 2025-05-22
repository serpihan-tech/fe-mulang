"use client";

import { useEffect, useState } from 'react'
import { createTransmit } from '../lib/transmit'
import { useLogOut } from '@/provider/LogOutProvider';

export function useNotifications(userRole = "student", classId = 5) {
  const [notifications, setNotifications] = useState([]);
  const { isLogOut } = useLogOut();

  useEffect(() => {
    if (!userRole) return;

    const transmit = createTransmit();
    if (!transmit) return;

    const ClassId = Number(classId);
    console.log("userRole:", userRole, "ClassId:", ClassId);
    const subscriptionForAdmins = transmit.subscription(`notifications/${userRole}`);
    const subscriptionForTeachers = transmit.subscription(`notifications/teachers/class/${ClassId}`);

    async function subscribeForAdmins() {
      await subscriptionForAdmins.create();
      subscriptionForAdmins.onMessage((data) => {
        console.log(data);
        setNotifications((prev) => [data, ...prev]);
      });
    }

    async function subscribeForTeachers() {
      await subscriptionForTeachers.create();
      subscriptionForTeachers.onMessage((data) => {
        console.log(data);
        setNotifications((prev) => [data, ...prev]);
      });
    }

    if (isLogOut) {
      subscriptionForAdmins.delete();
      subscriptionForTeachers.delete();
    }

    subscribeForAdmins();
    subscribeForTeachers();

    return () => {
      // Optional: unsubscribe on unmount
      subscriptionForAdmins.delete();
      subscriptionForTeachers.delete();
    };

  }, [userRole, isLogOut, classId]);

  return notifications;
}
