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

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
  
  {/* Order Meta */}
  <div className="grid grid-cols-2 gap-4 text-sm">
    <div>
      <p className="text-gray-500">Order ID</p>
      <p className="font-semibold text-gray-900">{latestOrder.id}</p>
    </div>

    <div>
      <p className="text-gray-500">Status</p>
      <span
        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold
          ${
            latestOrder.status === 'completed'
              ? 'bg-emerald-50 text-emerald-700'
              : latestOrder.status === 'pending'
              ? 'bg-amber-50 text-amber-700'
              : 'bg-red-50 text-red-700'
          }`}
      >
        {latestOrder.status}
      </span>
    </div>
  </div>

  {/* Total */}
  <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
    <p className="text-sm text-gray-600">Total Amount</p>
    <p className="text-lg font-bold text-gray-900">
      ₦{latestOrder.total.toLocaleString()}
    </p>
  </div>

  {/* Items */}
  <div>
    <p className="mb-2 text-sm font-semibold text-gray-900">Items Ordered</p>
    <ul className="space-y-2">
      {latestOrder.items.map(item => (
        <li
          key={item.id}
          className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 text-sm"
        >
          <span className="text-gray-800">
            {item.name}
          </span>
          <span className="font-semibold text-gray-600">
            × {item.quantity}
          </span>
        </li>
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
