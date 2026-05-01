"use client";

import { MessageCircle, QrCode, CreditCard, Phone, Loader2, CheckCircle } from "lucide-react";
import { useState } from "react";
import { createOrder } from "@/lib/orders";
import useCartStore from "@/stores/cartStore";
import { ShippingFormInputs } from "@/types";

const WHATSAPP_NUMBER = " 98729 92930";

interface PaymentFormProps {
  shippingData: ShippingFormInputs;
  total: number;
}

const PaymentForm = ({ shippingData, total }: PaymentFormProps) => {
  const [method, setMethod] = useState<"online" | "offline">("online");
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState<string>();
  const { cart, clearCart } = useCartStore();

  const whatsappMessage = encodeURIComponent(
    `Hi! I'd like to confirm my RASHI KNITWEAR order.\n\nOrder ID: ${orderId || "pending"}\nItems: ${cart.map((i) => `${i.name} (${i.selectedSize}, ${i.selectedColor}) x${i.quantity}`).join(", ")}\nTotal: $${total.toFixed(2)}\n\nShipping to: ${shippingData.name}, ${shippingData.address}, ${shippingData.city}`
  );

  const handleConfirmOrder = async () => {
    setLoading(true);
    try {
      const result = await createOrder(cart, shippingData, total);
      if (result.success && result.orderId) {
        setOrderId(result.orderId);
        setOrderPlaced(true);
        clearCart();
      } else {
        alert(result.error || "Failed to place order. Please try again.");
      }
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ─── Order Success State ───────────────────────────────────────────────────
  if (orderPlaced) {
    return (
      <div className="flex flex-col items-center gap-6 py-8 text-center">
        <div className="w-16 h-16 rounded-full bg-[#f0fdf4] flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-[#25d366]" />
        </div>
        <div>
          <p className="text-xs tracking-[0.3em] text-[#b5a090] uppercase mb-2">Order Placed!</p>
          <h3 className="text-2xl font-black text-[#2c2420] mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
            Thank you 🧶
          </h3>
          <p className="text-sm text-[#8a7b72]">
            Your order <span className="font-semibold text-[#2c2420]">#{orderId?.slice(0, 8).toUpperCase()}</span> has been placed.
          </p>
          <p className="text-xs text-[#b5a090] mt-1">Now confirm it on WhatsApp to complete payment.</p>
        </div>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#1fb558] transition-colors text-white py-3.5 rounded-2xl text-sm font-semibold"
        >
          <MessageCircle className="w-4 h-4" />
          Confirm on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-9 h-9 rounded-full bg-[#f0e8df] flex items-center justify-center">
          <CreditCard className="w-4 h-4 text-[#c9917a]" />
        </div>
        <div>
          <h2 className="text-lg font-black text-[#2c2420]" style={{ fontFamily: "var(--font-playfair)" }}>
            Payment
          </h2>
          <p className="text-xs text-[#b5a090]">Choose how you would like to pay</p>
        </div>
      </div>

      {/* Toggle */}
      <div className="flex gap-3 mb-8">
        {[
          { key: "online", label: "Pay Online", icon: QrCode },
          { key: "offline", label: "Order via Call", icon: Phone },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setMethod(key as "online" | "offline")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold border-2 transition-all duration-200 ${
              method === key
                ? "border-[#2c2420] bg-[#2c2420] text-white"
                : "border-[#e8ddd4] bg-white text-[#8a7b72] hover:border-[#c9917a]"
            }`}
          >
            <Icon className="w-4 h-4" /> {label}
          </button>
        ))}
      </div>

      {method === "online" ? (
        <div className="flex flex-col items-center gap-6">
          <div className="bg-[#faf7f2] border border-[#e8ddd4] rounded-3xl p-8 flex flex-col items-center gap-4 w-full">
            <p className="text-xs tracking-[0.3em] text-[#b5a090] uppercase">Scan to Pay</p>
            <div className="w-48 h-48 bg-white rounded-2xl shadow-md flex items-center justify-center border border-[#f0e8df]">
              <div className="flex flex-col items-center gap-2">
                <img src="/QR.png" className="w-24 h-24 text-[#2c2420]" />
                <p className="text-xs text-[#b5a090]">Your QR here</p>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-[#2c2420]">Scan with any UPI App</p>
              <p className="text-xs text-[#b5a090] mt-1">PhonePe · GPay · Paytm · BHIM</p>
            </div>
            <div className="flex items-center gap-4 mt-2">
              {["PhonePe", "GPay", "Paytm"].map((app) => (
                <span key={app} className="text-xs text-[#b5a090] bg-white border border-[#f0e8df] px-3 py-1 rounded-full">
                  {app}
                </span>
              ))}
            </div>
          </div>

          <p className="text-xs text-[#b5a090] text-center leading-relaxed max-w-xs">
            After payment, click below to confirm your order on WhatsApp.
          </p>

          {/* Confirm button → creates order then opens WhatsApp */}
          <button
            onClick={handleConfirmOrder}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#1fb558] disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-white py-3.5 rounded-2xl text-sm font-semibold"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <MessageCircle className="w-4 h-4" />
            )}
            {loading ? "Placing Order..." : "Confirm Order on WhatsApp"}
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6">
          <div className="bg-[#faf7f2] border border-[#e8ddd4] rounded-3xl p-8 flex flex-col items-center gap-5 w-full text-center">
            <div className="w-16 h-16 rounded-full bg-[#f0e8df] flex items-center justify-center">
              <Phone className="w-7 h-7 text-[#c9917a]" />
            </div>
            <div>
              <p className="text-xs tracking-[0.3em] text-[#b5a090] uppercase mb-2">Prefer to order offline?</p>
              <h3 className="text-2xl font-black text-[#2c2420] mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
                Call or WhatsApp Us
              </h3>
              <p className="text-[#8a7b72] text-sm leading-relaxed max-w-xs mx-auto">
                Our team is ready to help you place your order personally. Available Mon–Sat, 10am–7pm.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <a
                href="tel:+919193752346"
                className="flex-1 flex items-center justify-center gap-2 bg-[#2c2420] hover:bg-[#3d3230] transition-colors text-white py-3.5 rounded-2xl text-sm font-semibold"
              >
                <Phone className="w-4 h-4" /> Call Now
              </a>
              <button
                onClick={handleConfirmOrder}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#1fb558] disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-white py-3.5 rounded-2xl text-sm font-semibold"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <MessageCircle className="w-4 h-4" />}
                {loading ? "Placing..." : "WhatsApp"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;