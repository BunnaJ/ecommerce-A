import ProductCard from './ProductCard';
import Navbar from '../navbar/Navbar';
import { Sniglet } from 'next/font/google';

export const sniglet = Sniglet({
  subsets: ['latin'],
  weight: ['400', '800'],
})

const products = [
  {
    id: '1',
    name: 'Watch',
    price: 700000,
    stock: 12,
    image: '/p1.jpg',
  },
  {
    id: '2',
    name: 'nike shoe',
    price: 58000,
    stock: 0,
    image: '/p4.avif',
  },
  {
    id: '3',
    name: 'cartier',
    price: 900000,
    stock: 12,
    image: '/p2.jpg',
  },
  {
    id: '4',
    name: 'headset',
    price: 50000,
    stock: 0,
    image: '/p3.webp',
  },
  {
    id: '5',
    name: 'iphone15',
    price: 800000,
    stock: 12,
    image: '/p5.jpg'
  },
  {
    id: '6',
    name: 'Lv bag',
    price: 38000,
    stock: 5,
    image: '/p6.jpeg',
  },
];

export default function ProductPageSection() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      
      {/* CONTENT CONTAINER */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        
        {/* Header + Navbar */}
        <div className="mb-10 flex flex-col gap-4">
          <Navbar />

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
             Products page
            </h1>
            <p className={`${sniglet.className} text-sm text-gray-600`}>
  Quality products curated for you
</p>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </section>
    </div>
  );
}
