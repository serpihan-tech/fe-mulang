"use client";

import { Transmit } from '@adonisjs/transmit-client'

export const transmit = new Transmit({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  uidGenerator: () => {
    return "123456"
  },
  beforeSubscribe: (channel) => {
    return {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    }
  }
})