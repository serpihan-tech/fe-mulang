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
        console.error('Gagal parse notifications dari localStorage:', error.message);
        setNotifications([]);
      }
    }
  }, []);

  useEffect(() => {
    if (!userRole) return;

    const transmit = createTransmit();
    if (!transmit) return;

    //const classId = Number(classId);
    console.log("userRole:", userRole, "classId:", classId);
    const subscriptionFromAdmin = transmit.subscription(`notifications/${userRole}`);
    const subscriptionFromTeacher = transmit.subscription(`notifications/teachers/class/${classId}`);

    async function subscribeForAdmins() {
      await subscriptionFromAdmin.create();
      subscriptionFromAdmin.onMessage((data) => {
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
      await subscriptionFromTeacher.create();
      subscriptionFromTeacher.onMessage((data) => {
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
      subscriptionFromAdmin.delete();
      subscriptionFromTeacher.delete();
      localStorage.removeItem('notifications');
      setNotifications([]);
    }

    subscribeForAdmins();
    subscribeForTeachers();

    return () => {
      if (subscriptionFromAdmin == null  && subscriptionFromTeacher == null) return;
      subscriptionFromAdmin.delete();
      subscriptionFromTeacher.delete();
    };

  }, [userRole, isLogOut, classId]);

  return notifications;
}
