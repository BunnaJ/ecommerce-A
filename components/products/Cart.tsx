'use client';
import Image from 'next/image';
import { useStore } from '@/store/useStore';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { cart, updateQty, removeFromCart, checkout } = useStore();
  const router = useRouter();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    const order = checkout(); // Convert cart → order
    if (!order) return;       // Cart empty, do nothing
    router.push('/checkout'); // Navigate to checkout page
  };

  return (
    <div className="min-h-screen bg-leaner-to-b from-[#cbd6da] to-white p-6">
      <div className="mx-auto max-w-4xl rounded-3xl bg-white/70 p-6 shadow backdrop-blur">

        <h1 className="mb-6 md:text-2xl font-bold text-gray-900">Your Cart</h1>

        {cart.length === 0 ? (
          <p className="text-gray-500">
            Your cart is empty.
          </p>
        ) : (
          <>
            <div className="space-y-4">
              {cart.map(item => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between rounded-xl bg-[#e9ebed] p-4 gap-2"
                >
                  {/* Product info */}
                  <div className="flex items-center gap-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded-lg"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        ₦{item.price.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Quantity + Remove */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2 sm:mt-0">
                    {/* Quantity controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQty(item.id, Math.max(1, item.quantity - 1))
                        }
                        className="h-8 w-8 rounded-md  border border-red-700 bg-gray-300 text-lg font-bold text-gray-700 hover:bg-gray-400 transition"
                      >
                        -
                      </button>

                      <span className="w-8 text-center font-medium">{item.quantity}</span>

                      <button
                        onClick={() => updateQty(item.id, item.quantity + 1)}
                        className="h-8 w-8 rounded-md border border-b-emerald-700 bg-gray-300 text-lg font-bold text-gray-700 hover:bg-gray-400 transition"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove button */}
                   
                  </div>

                 <div className="flex items-center justify-end ">
                 <button
                      onClick={() => removeFromCart(item.id)}
                      className="mt-2 sm:mt-0 text-sm text-red-500 hover:underline border p-1 rounded bg-pink-50"
                    >
                      Remove
                    </button>
                 </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-6  flex items-center justify-between border-t pt-4 font-semibold p-3">
              <span>Total</span>
              <span className='bg-[#e8e2e0] p-3 border-b border-b-emerald-800'>₦{total.toLocaleString()}</span>
            </div>

            {/* Checkout */}
            <button
              onClick={handleCheckout}
              className="mt-6 w-full rounded-xl bg-black py-3 text-center text-white hover:bg-gray-900"
            >
              Proceed to Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
