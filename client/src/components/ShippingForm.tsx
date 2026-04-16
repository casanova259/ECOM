"use client";

import { ShippingFormInputs, shippingFormSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

const fields = [
  { id: "name", label: "Full Name", type: "text", placeholder: "Jane Doe", autoComplete: "name" },
  { id: "email", label: "Email Address", type: "email", placeholder: "jane@example.com", autoComplete: "email" },
  { id: "phone", label: "Phone Number", type: "tel", placeholder: "1234567890", autoComplete: "tel" },
  { id: "address", label: "Street Address", type: "text", placeholder: "123 Wool Lane", autoComplete: "street-address" },
  { id: "city", label: "City", type: "text", placeholder: "New York", autoComplete: "address-level2" },
] as const;

const ShippingForm = ({ setShippingForm }: { setShippingForm: (data: ShippingFormInputs) => void }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ShippingFormInputs>({
    resolver: zodResolver(shippingFormSchema),
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<ShippingFormInputs> = (data) => {
    setShippingForm(data);
    router.push("/cart?step=3", { scroll: false });
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-9 h-9 rounded-full bg-[#f0e8df] flex items-center justify-center">
          <MapPin className="w-4 h-4 text-[#c9917a]" />
        </div>
        <div>
          <h2 className="text-lg font-black text-[#2c2420]" style={{ fontFamily: "var(--font-playfair)" }}>
            Shipping Details
          </h2>
          <p className="text-xs text-[#b5a090]">Where should we send your order?</p>
        </div>
      </div>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field) => (
          <div key={field.id} className="flex flex-col gap-1.5">
            <label htmlFor={field.id} className="text-xs font-semibold text-[#8a7b72] tracking-wider uppercase">
              {field.label}
            </label>
            <input
              id={field.id}
              type={field.type}
              placeholder={field.placeholder}
              autoComplete={field.autoComplete}
              {...(field.id === "phone" ? { inputMode: "numeric" as const, maxLength: 10 } : {})}
              {...register(field.id)}
              className="w-full bg-[#faf7f2] border border-[#e8ddd4] rounded-xl px-4 py-3 text-sm text-[#2c2420] placeholder:text-[#c8bdb7] outline-none focus:border-[#c9917a] focus:ring-2 focus:ring-[#c9917a]/10 transition-all"
            />
            {errors[field.id] && (
              <p className="text-xs text-red-400">{errors[field.id]?.message}</p>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full mt-2 bg-[#2c2420] hover:bg-[#3d3230] transition-colors text-white py-3.5 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2"
        >
          Continue to Payment <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export default ShippingForm;