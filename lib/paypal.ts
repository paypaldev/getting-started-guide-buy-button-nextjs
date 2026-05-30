import {
  Client,
  Environment,
  OrdersController,
  CheckoutPaymentIntent,
} from "@paypal/paypal-server-sdk";

// Singleton — one client instance per serverless function warm start
const paypalClient = new Client({
  clientCredentialsAuthCredentials: {
    oAuthClientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
    oAuthClientSecret: process.env.PAYPAL_CLIENT_SECRET!,
  },
  environment:
    process.env.NEXT_PUBLIC_PAYPAL_ENVIRONMENT === "production"
      ? Environment.Production
      : Environment.Sandbox,
});

const ordersController = new OrdersController(paypalClient);

export async function createPayPalOrder(amount: string): Promise<string> {
  const { result } = await ordersController.createOrder({
    body: {
      intent: CheckoutPaymentIntent.Capture,
      purchaseUnits: [
        {
          amount: {
            currencyCode: "USD",
            value: amount,
          },
        },
      ],
    },
  });

  if (!result.id) {
    throw new Error("PayPal order creation failed: missing order ID");
  }

  return result.id;
}

export async function capturePayPalOrder(orderId: string): Promise<unknown> {
  const { result } = await ordersController.captureOrder({ id: orderId });
  return result;
}
