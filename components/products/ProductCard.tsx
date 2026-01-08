'use client';
import Image from 'next/image';
import { useStore } from '@/store/useStore';

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  image: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const addToCart = useStore(s => s.addToCart);

  const inStock = product.stock > 0;

  return (
    <div className="group rounded-2xl bg-[#f2f3f7] p-4 shadow-md transition hover:-translate-y-1 hover:shadow-xl">
      
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden rounded-xl bg-white">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="mt-4 space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">
          {product.name}
        </h3>

        <p className="text-gray-700 font-medium">
          ₦{product.price.toLocaleString()}
        </p>

        {/* Stock badge */}
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
            inStock
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-600'
          }`}
        >
          {inStock ? `${product.stock} available` : 'Out of stock'}
        </span>
      </div>

      {/* CTA */}
      <button
        disabled={!inStock}
        onClick={() =>
          addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
          })
        }
        className="mt-5 w-full rounded-xl bg-gray-900 py-2.5 text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        Add to Cart
      </button>
    </div>
  );
}
