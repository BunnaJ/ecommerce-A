"use client";

import Image from "next/image";
import { useStore } from "@/store/useStore";
import { ShoppingCart } from "lucide-react";
import { Sniglet } from "next/font/google";
import { useState } from "react";

export const sniglet = Sniglet({
  subsets: ["latin"],
  weight: ["400", "800"],
});

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  image: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const addToCart = useStore((s) => s.addToCart);
  const inStock = product.stock > 0;

  const [toast, setToast] = useState<null | {
    message: string;
    type: "success" | "error";
  }>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 1500);
  };

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#dfe1e3] p-4 backdrop-blur-xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      
      {/* Glow effect */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
        <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-linear-to-br from-indigo-500/20 to-purple-500/20 blur-3xl" />
      </div>

      {/* Toast */}
      {toast && (
        <div
          className={`absolute top-4 right-4 z-20 rounded-xl px-3 py-1.5 text-xs font-semibold shadow-md
            ${
              toast.type === "success"
                ? "bg-emerald-600 text-white"
                : "bg-red-600 text-white"
            }`}
        >
          {toast.message}
        </div>
      )}

      {/* Image */}
      <div className="relative z-10 flex h-52 items-center justify-center rounded-2xl bg-linear-to-br from-gray-50 to-gray-100 p-4">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mt-4 space-y-2">
        <h3
          className={`${sniglet.className} line-clamp-1 text-base font-semibold tracking-tight text-[#4e5b5d]`}
        >
          {product.name}
        </h3>

        <p className="md:text-lg font-bold text-gray-900">
          ₦{product.price.toLocaleString()}
        </p>

        {/* Stock */}
        <div className="flex items-center gap-2 text-xs font-medium">
          <span
            className={`h-2 w-2 rounded-full ${
              inStock ? "bg-emerald-500" : "bg-red-500"
            }`}
          />
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              inStock
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {inStock ? `${product.stock} in stock` : "Out of stock"}
          </span>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={() => {
          if (!inStock) {
            showToast("Out of stock", "error");
            return;
          }

          addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
          });

          showToast("Added to cart", "success");
        }}
        className="
          mt-5 flex w-full items-center justify-center gap-2 rounded-2xl
          bg-[#c1bdbc]
          py-3 text-sm font-semibold text-black
          shadow-md
          transition duration-200
          hover:scale-[1.02] hover:shadow-lg
          border-b hover:border-dashed border-b-amber-800
          active:scale-[0.98]
          hover:bg-[#cdcdcd]
        "
      >
        <ShoppingCart size={16} />
        {inStock ? "Add to Cart" : "Out of Stock"}
      </button>
    </div>
  );
}
