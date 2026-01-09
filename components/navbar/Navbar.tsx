'use client';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { ShoppingBag } from "lucide-react";
import { Sniglet } from 'next/font/google';

export const sniglet = Sniglet({
  subsets: ['latin'],
  weight: ['400', '800'],
})

export default function Navbar() {
  const cartCount = useStore(
    state => state.cart.reduce((sum, i) => sum + i.quantity, 0)
  );

  return (
    <nav className="flex items-center justify-between rounded-2xl bg-[#cccccc] px-6 py-4 shadow-sm backdrop-blur border border-[#f1f1f1]">

<Link
  href="/products"
  className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-gray-900"
>
  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-[#c1bdbc] to-[#e1ded8] shadow-sm">
    <ShoppingBag size={18} className="text-amber-700" />
  </span>

  <span className={sniglet.className}>
    ShopLife
  </span>
</Link>


      <div className="bg-[#c2b6ae] p-3 rounded">
      <Link href="/cart" className="relative">
        <ShoppingCart className="h-6 w-6  text-[#58301e]" />

        {cartCount > 0 && (
          <span className="absolute -right-2 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full border bg-blue-400 px-1 text-xs font-medium text-black">
            {cartCount}
          </span>
        )}
      </Link>
      </div>
    </nav>
  );
}
