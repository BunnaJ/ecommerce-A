'use client';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function Navbar() {
  const cartCount = useStore(
    state => state.cart.reduce((sum, i) => sum + i.quantity, 0)
  );

  return (
    <nav className="flex items-center justify-between rounded-2xl bg-[#f2f3f7] px-6 py-4 shadow-sm backdrop-blur border border-amber-200">
      <Link href="/products" className="text-lg font-bold text-gray-900">
        ShopLife
      </Link>

      <Link href="/cart" className="relative">
        <ShoppingCart className="h-6 w-6 text-gray-800" />

        {cartCount > 0 && (
          <span className="absolute -right-2 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full border bg-blue-400 px-1 text-xs font-medium text-black">
            {cartCount}
          </span>
        )}
      </Link>
    </nav>
  );
}
