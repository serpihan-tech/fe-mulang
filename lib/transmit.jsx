"use client";

import { Transmit } from '@adonisjs/transmit-client'

export function createTransmit() {
  if (typeof window === 'undefined') return null; // hindari SSR error

  console.log("tesssssssss");

  const transmit = new Transmit({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: false,
    uidGenerator: () => {
      return "123456";
    },


    beforeSubscribe: (channel) => {
      console.log("beforeSubscribe");
      return {
        headers: {
          "authorization": `Bearer ${sessionStorage.getItem('token')}`,
          "ngrok-skip-browser-warning": "6024",
        },
      }
    }
  });

  return transmit
}
