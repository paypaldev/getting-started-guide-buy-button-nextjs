"use client";

import {
  PayPalProvider,
  usePayPalOneTimePaymentSession,
  usePayPal,
  INSTANCE_LOADING_STATE,
} from "@paypal/react-paypal-js/sdk-v6";
import { createOrder, captureOrder } from "@/app/actions";

// The PayPal button — must be rendered inside PayPalProvider
function PayPalButton() {
  const { loadingStatus, error: sdkError } = usePayPal();

  const { isPending, error, handleClick } = usePayPalOneTimePaymentSession({
    // Server Action — runs on the server, returns the order ID
    createOrder: async () => {
      const { id } = await createOrder();
      return { orderId: id };
    },

    // Called after the buyer approves — Server Action captures the funds
    onApprove: async (data) => {
      await captureOrder(data.orderId);
      console.log("Payment captured successfully:", data.orderId);
    },

    // Auto-detects the best presentation mode (popup vs. redirect)
    presentationMode: "auto",
  });

  if (loadingStatus === INSTANCE_LOADING_STATE.PENDING || isPending) {
    return <div className="h-12 w-full animate-pulse rounded bg-gray-200" />;
  }

  if (loadingStatus === INSTANCE_LOADING_STATE.REJECTED || sdkError || error) {
    return (
      <p className="text-sm text-red-600">
        Could not load PayPal. Please refresh and try again.
      </p>
    );
  }

  // paypal-button is a typed web component from the v6 SDK
  return <paypal-button onClick={handleClick} type="pay" />;
}

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
      pageType="product-details"
    >
      <PayPalButton />
    </PayPalProvider>
  );
}
