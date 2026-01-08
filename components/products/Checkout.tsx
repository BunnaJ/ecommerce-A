'use client';
import { useStore } from '@/store/useStore';
import Link from 'next/link';

export default function CheckoutPage() {
  const orders = useStore(state => state.orders);

  // Get the latest order
  const latestOrder = orders[orders.length - 1];

  if (!latestOrder) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">No order has been placed yet.</p>
        <Link href="/products" className="ml-4 text-blue-600 hover:underline">
          Go to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-[#cbd6da] to-white p-6">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white/70 p-6 shadow backdrop-blur">

        <h1 className="text-2xl font-bold mb-4 text-gray-900">Order Confirmation</h1>

        <div className="space-y-3">
          <p><span className="font-semibold">Order ID:</span> {latestOrder.id}</p>
          <p><span className="font-semibold">Status:</span> {latestOrder.status}</p>
          <p><span className="font-semibold">Total:</span> ₦{latestOrder.total.toLocaleString()}</p>

          <div>
            <p className="font-semibold mb-1">Items Ordered:</p>
            <ul className="ml-4 list-disc">
              {latestOrder.items.map(item => (
                <li key={item.id}>{item.name} × {item.quantity}</li>
              ))}
            </ul>
          </div>
        </div>

        <Link
          href="/"
          className="mt-6 block w-full rounded-xl bg-gray-900 py-3 text-center text-white hover:bg-black transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
