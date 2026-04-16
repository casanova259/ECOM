"use client";

import { MessageCircle, QrCode, CreditCard, Phone } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const WHATSAPP_NUMBER = "919876543210"; // replace with your number
const WHATSAPP_MESSAGE = encodeURIComponent("Hi! I'd like to place an order from Wooltis.");

const PaymentForm = () => {
  const [method, setMethod] = useState<"online" | "offline">("online");

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-9 h-9 rounded-full bg-[#f0e8df] flex items-center justify-center">
          <CreditCard className="w-4 h-4 text-[#c9917a]" />
        </div>
        <div>
          <h2 className="text-lg font-black text-[#2c2420]" style={{ fontFamily: "var(--font-playfair)" }}>
            Payment
          </h2>
          <p className="text-xs text-[#b5a090]">Choose how you'd like to pay</p>
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
        /* QR PAYMENT */
        <div className="flex flex-col items-center gap-6">
          <div className="bg-[#faf7f2] border border-[#e8ddd4] rounded-3xl p-8 flex flex-col items-center gap-4 w-full">
            <p className="text-xs tracking-[0.3em] text-[#b5a090] uppercase">Scan to Pay</p>

            {/* QR Code — replace src with your actual QR */}
            <div className="w-48 h-48 bg-white rounded-2xl shadow-md flex items-center justify-center border border-[#f0e8df] overflow-hidden relative">
              {/* Replace with your actual QR image */}
              <div className="flex flex-col items-center gap-2 text-[#e8ddd4]">
                <QrCode className="w-24 h-24 text-[#2c2420]" />
                <p className="text-xs text-[#b5a090]">Your QR here</p>
              </div>
              {/* Uncomment and add your QR image:
              <Image src="/qr-code.png" alt="Payment QR" fill className="object-contain p-2" />
              */}
            </div>

            <div className="text-center">
              <p className="text-sm font-semibold text-[#2c2420]">Scan with any UPI App</p>
              <p className="text-xs text-[#b5a090] mt-1">PhonePe · GPay · Paytm · BHIM</p>
            </div>

            {/* UPI logos */}
            <div className="flex items-center gap-4 mt-2">
              {["PhonePe", "GPay", "Paytm"].map((app) => (
                <span key={app} className="text-xs text-[#b5a090] bg-white border border-[#f0e8df] px-3 py-1 rounded-full">
                  {app}
                </span>
              ))}
            </div>
          </div>

          <p className="text-xs text-[#b5a090] text-center leading-relaxed max-w-xs">
            After payment, share the screenshot on WhatsApp to confirm your order instantly.
          </p>

          {/* WhatsApp confirm */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#1fb558] transition-colors text-white py-3.5 rounded-2xl text-sm font-semibold"
          >
            <MessageCircle className="w-4 h-4" />
            Confirm Order on WhatsApp
          </a>
        </div>
      ) : (
        /* OFFLINE ORDER */
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
                Our team is ready to help you place your order personally. We're available Mon–Sat, 10am–7pm.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <a
                href="tel:+919876543210"
                className="flex-1 flex items-center justify-center gap-2 bg-[#2c2420] hover:bg-[#3d3230] transition-colors text-white py-3.5 rounded-2xl text-sm font-semibold"
              >
                <Phone className="w-4 h-4" /> Call Now
              </a>
              
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#1fb558] transition-colors text-white py-3.5 rounded-2xl text-sm font-semibold"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
            </div>
          </div>

          <p className="text-xs text-[#b5a090] text-center">
            Replace the phone number in{" "}
            <code className="bg-[#f0e8df] px-1.5 py-0.5 rounded text-[#c9917a]">WHATSAPP_NUMBER</code>{" "}
            with your actual number.
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;