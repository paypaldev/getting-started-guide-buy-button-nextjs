"use client";

import {
  PayPalProvider,
  PayPalOneTimePaymentButton,
  OnApproveDataOneTimePayments,
} from "@paypal/react-paypal-js/sdk-v6";
import { createOrder, captureOrder } from "@/app/actions";

// Wrap in PayPalProvider — this loads and initialises the SDK script
export default function PayPalCheckout() {
  return (
    <PayPalProvider
      clientId={process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!}
      environment={
        (process.env.NEXT_PUBLIC_PAYPAL_ENVIRONMENT as
          | "sandbox"
          | "production") ?? "sandbox"
      }
      components={["paypal-payments"]}
      pageType="checkout"
    >
      <PayPalOneTimePaymentButton
        createOrder={async () => {
          const { id } = await createOrder();
          return { orderId: id };
        }}
        onApprove={async ({ orderId }: OnApproveDataOneTimePayments) => {
          await captureOrder(orderId);
          console.log("Payment captured!");
        }}
        presentationMode="auto"
      />
    </PayPalProvider>
  );
}
