"use client";

import PaymentForm from "@/components/PaymentForm";
import ShippingForm from "@/components/ShippingForm";
import useCartStore from "@/stores/cartStore";
import { ShippingFormInputs } from "@/types";
import { ArrowRight, Trash2, ShoppingBag, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

const steps = [
  { id: 1, title: "Cart" },
  { id: 2, title: "Shipping" },
  { id: 3, title: "Payment" },
];

const CartPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [shippingForm, setShippingForm] = useState<ShippingFormInputs>();
  const activeStep = parseInt(searchParams.get("step") || "1");
  const { cart, removeFromCart, incrementQuantity, decrementQuantity } = useCartStore();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = subtotal * 0.1;
  const shipping = 10;
  const total = subtotal - discount + shipping;

  return (
    <div className="min-h-screen bg-[#faf7f2] pt-24 pb-16">
      <div className="max-w-[1400px] mx-auto px-6">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs tracking-[0.4em] text-[#b5a090] uppercase mb-2">Wooltis</p>
          <h1
            className="text-4xl md:text-5xl font-black text-[#2c2420]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Your Cart
          </h1>
        </div>

        {/* Steps */}
        <div className="flex items-center gap-0 mb-12 max-w-sm">
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center gap-1.5">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${step.id === activeStep
                    ? "bg-[#2c2420] text-white"
                    : step.id < activeStep
                      ? "bg-[#c9917a] text-white"
                      : "bg-[#e8ddd4] text-[#b5a090]"
                  }`}>
                  {step.id < activeStep ? "✓" : step.id}
                </div>
                <span className={`text-xs whitespace-nowrap ${step.id === activeStep ? "text-[#2c2420] font-semibold" : "text-[#b5a090]"
                  }`}>
                  {step.title}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`w-16 h-px mb-5 mx-2 transition-all duration-300 ${step.id < activeStep ? "bg-[#c9917a]" : "bg-[#e8ddd4]"
                  }`} />
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* LEFT — Steps Content */}
          <div className="w-full lg:w-7/12 bg-white rounded-3xl p-8 shadow-sm border border-[#f0e8df]">
            {activeStep === 1 ? (
              cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 gap-4">
                  <ShoppingBag className="w-12 h-12 text-[#e8ddd4]" />
                  <p className="text-[#b5a090] text-sm">Your cart is empty</p>
                  <Link
                    href="/products"
                    className="text-xs tracking-widest uppercase bg-[#2c2420] text-white px-6 py-2.5 rounded-full hover:bg-[#3d3230] transition-colors"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col divide-y divide-[#f0e8df]">
                  {cart.map((item) => (
                    <div
                      key={item.id + item.selectedSize + item.selectedColor}
                      className="flex items-center justify-between py-6 first:pt-0 last:pb-0"
                    >
                      {/* Left: image + info */}
                      <div className="flex gap-5 flex-1 min-w-0">
                        {/* Image */}
                        <div className="relative w-20 h-24 bg-[#f7f2ed] rounded-2xl overflow-hidden shrink-0">
                          <Image
                            src={item.images[item.selectedColor]}
                            alt={item.name}
                            fill
                            className="object-contain p-2"
                          />
                        </div>

                        {/* Name, meta, quantity */}
                        <div className="flex flex-col justify-between py-1 min-w-0">
                          <div>
                            <p className="text-sm font-semibold text-[#2c2420] mb-1">{item.name}</p>
                            <div className="flex items-center gap-3 text-xs text-[#b5a090]">
                              <span>Size: {item.selectedSize.toUpperCase()}</span>
                              <span>·</span>
                              <span className="flex items-center gap-1">
                                Color:
                                <span
                                  className="w-3 h-3 rounded-full inline-block border border-gray-200"
                                  style={{ backgroundColor: item.selectedColor }}
                                />
                              </span>
                            </div>
                          </div>

                          {/* Quantity controls */}
                          <div className="flex items-center gap-2 mt-3">
                            <button
                              onClick={() => decrementQuantity(item)}
                              className="w-7 h-7 rounded-full bg-[#f0e8df] hover:bg-[#e8ddd4] transition-colors text-[#2c2420] flex items-center justify-center"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-semibold text-[#2c2420] w-5 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => incrementQuantity(item)}
                              className="w-7 h-7 rounded-full bg-[#f0e8df] hover:bg-[#e8ddd4] transition-colors text-[#2c2420] flex items-center justify-center"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Right: trash top, price bottom */}
                      <div className="flex flex-col items-end justify-between h-24 shrink-0 pl-4">
                        <button
                          onClick={() => removeFromCart(item)}
                          className="w-8 h-8 rounded-full bg-[#fdf0ee] hover:bg-[#fde0dc] transition-colors text-[#e07060] flex items-center justify-center"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <p className="text-sm font-bold text-[#2c2420]">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : activeStep === 2 ? (
              <ShippingForm setShippingForm={setShippingForm} />
            ) : activeStep === 3 && shippingForm ? (
              <PaymentForm shippingData={shippingForm} total={total} />
            ) : (
              <div className="flex flex-col items-center justify-center py-12 gap-3">
                <p className="text-[#b5a090] text-sm text-center">
                  Please complete the shipping details to continue to payment.
                </p>
                <button
                  onClick={() => router.push("/cart?step=2", { scroll: false })}
                  className="text-xs text-[#c9917a] underline"
                >
                  Go back to shipping
                </button>
              </div>
            )}
          </div>

          {/* RIGHT — Order Summary */}
          <div className="w-full lg:w-5/12 h-max">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#f0e8df]">
              <h2
                className="text-xl font-black text-[#2c2420] mb-6"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Order Summary
              </h2>

              {/* Mini cart preview */}
              {cart.length > 0 && (
                <div className="flex flex-col gap-3 mb-6 pb-6 border-b border-[#f0e8df]">
                  {cart.map((item) => (
                    <div key={item.id + item.selectedSize + item.selectedColor} className="flex items-center gap-3">
                      <div className="relative w-10 h-10 bg-[#f7f2ed] rounded-xl overflow-hidden shrink-0">
                        <Image
                          src={item.images[item.selectedColor]}
                          alt={item.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <p className="text-xs text-[#8a7b72] flex-1 line-clamp-1">
                        {item.name}{" "}
                        <span className="text-[#b5a090]">× {item.quantity}</span>
                      </p>
                      <p className="text-xs font-semibold text-[#2c2420]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-col gap-3 mb-6">
                <div className="flex justify-between text-sm">
                  <p className="text-[#8a7b72]">Subtotal</p>
                  <p className="font-medium text-[#2c2420]">${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-sm">
                  <p className="text-[#8a7b72]">Discount (10%)</p>
                  <p className="font-medium text-[#c9917a]">−${discount.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-sm">
                  <p className="text-[#8a7b72]">Shipping</p>
                  <p className="font-medium text-[#2c2420]">${shipping.toFixed(2)}</p>
                </div>
                <div className="w-full h-px bg-[#f0e8df]" />
                <div className="flex justify-between">
                  <p className="font-bold text-[#2c2420]">Total</p>
                  <p className="font-black text-[#2c2420] text-lg">${total.toFixed(2)}</p>
                </div>
              </div>

              {activeStep === 1 && (
                <button
                  onClick={() => router.push("/cart?step=2", { scroll: false })}
                  disabled={cart.length === 0}
                  className="w-full bg-[#2c2420] hover:bg-[#3d3230] disabled:bg-[#e8ddd4] disabled:text-[#b5a090] disabled:cursor-not-allowed transition-colors text-white py-3.5 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2"
                >
                  Proceed to Shipping <ArrowRight className="w-4 h-4" />
                </button>
              )}

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-4 mt-5">
                {["🔒 Secure", "🧶 Handmade", "🌿 Eco"].map((badge) => (
                  <span key={badge} className="text-xs text-[#b5a090]">{badge}</span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CartPage;
