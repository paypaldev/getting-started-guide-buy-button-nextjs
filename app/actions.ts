"use server";

import { createPayPalOrder, capturePayPalOrder } from "@/lib/paypal";

export async function createOrder(): Promise<{ id: string }> {
  // In a real app, read the amount from the cart or database
  const orderId = await createPayPalOrder("9.99");
  return { id: orderId };
}

export async function captureOrder(orderId: string): Promise<unknown> {
  return capturePayPalOrder(orderId);
}
