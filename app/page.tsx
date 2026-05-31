import Image from "next/image";
import PayPalCheckout from "@/components/PayPalCheckout";

export default function ProductPage() {
  return (
    <main className="mx-auto max-w-md p-8">
      <h1 className="mb-2 text-2xl font-bold">Developer Hoodie</h1>
      <p className="mb-1 text-gray-600">
        Our PayPal hoodie is perfect for developers who want to stay cozy while
        coding.
      </p>
      <p className="mb-6 text-xl font-semibold">$9.99</p>

      <div className="relative mb-6 h-48 w-full overflow-hidden rounded">
        <Image
          src="/paypal-swag.png"
          alt="Developer Hoodie with PayPal logo"
          fill
          sizes="(max-width: 768px) 100vw, 448px"
          className="object-cover"
          priority
        />
      </div>

      <PayPalCheckout />
    </main>
  );
}
