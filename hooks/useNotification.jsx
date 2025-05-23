"use client";

import { useEffect, useState } from 'react'
import { createTransmit } from '../lib/transmit'
import { useLogOut } from '@/provider/LogOutProvider';

export function useNotifications(userRole = null, classId = null) {
  const { isLogOut } = useLogOut();
  
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('notifications');
    if (saved) {
      try {
        setNotifications(JSON.parse(saved));
      } catch (error) {
        console.error('Gagal parse notifications dari localStorage:', error);
        setNotifications([]);
      }
    }
  }, []);

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
        console.log('Notif Admin:', data);

        setNotifications((prev) => {
          const exists = prev.some(n => n.message?.id === data.message?.id);
          if (exists) return prev;

          const updated = [data, ...prev];
          localStorage.setItem('notifications', JSON.stringify(updated));
          return updated;
        });
      });
    }

    async function subscribeForTeachers() {
      await subscriptionForTeachers.create();
      subscriptionForTeachers.onMessage((data) => {
        console.log('Notif Teacher:', data);

        setNotifications((prev) => {
          const exists = prev.some(n => n.message?.id === data.message?.id);
          if (exists) return prev;

          const updated = [data, ...prev];
          localStorage.setItem('notifications', JSON.stringify(updated));
          return updated;
        });
      });
    }

    if (isLogOut) {
      subscriptionForAdmins.delete();
      subscriptionForTeachers.delete();
      localStorage.removeItem('notifications');
      setNotifications([]);
    }

    subscribeForAdmins();
    subscribeForTeachers();

    return () => {
      if (subscriptionForAdmins == null  && subscriptionForTeachers == null) return;
      subscriptionForAdmins.delete();
      subscriptionForTeachers.delete();
    };

  }, [userRole, isLogOut, classId]);

  return notifications;
}
