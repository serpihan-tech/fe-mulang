"use client";

import { Transmit } from '@adonisjs/transmit-client'

export function createTransmit() {
  if (typeof window === 'undefined') return null;

  console.log("tesssssssss");

  const transmit = new Transmit({
    baseUrl: "https://be-mulang.serpihantech.com", // ! kalau pakai ngrok, akan error CORS
    uidGenerator: () => {
      return "123456";
    },

    maxReconnectAttempts: 5,

    beforeSubscribe: (channel) => {
      console.log("beforeSubscribe");
      return {
        headers: {
          "authorization": `Bearer ${sessionStorage.getItem('token')}`,
          "ngrok-skip-browser-warning": "6024",
        },
      }
    },


    onReconnectAttempt: (att) => {
      console.log("onReconnectAttempt", att);
    },

  });

  return transmit
}
