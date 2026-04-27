"use client";

import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { ScrollArea } from "./ui/scroll-area";
import { useState } from "react";
import { createProduct } from "@/lib/actions/products";
import { uploadProductImage } from "@/lib/upload";
import { ProductCategory, ProductClothingCategory, ProductColor, ProductSize } from "@/lib/supabase/types";
import { Loader2 } from "lucide-react";

const audiences: ProductCategory[] = ["women", "men", "children"];

const clothingCategories: ProductClothingCategory[] = [
  "Sweater", "Scarf", "Keychain", "Doll", "Cardigan",
];

const colors: ProductColor[] = [
  "blue", "green", "red", "yellow", "purple", "orange",
  "pink", "brown", "gray", "black", "white",
];

const sizes: ProductSize[] = [
  "xs", "s", "m", "l", "xl", "xxl",
];

const formSchema = z.object({
  name: z.string().min(1, { message: "Product name is required!" }),
  short_description: z.string().min(1).max(120),
  description: z.string().min(1, { message: "Description is required!" }),
  price: z.coerce.number().min(0.01, { message: "Price must be greater than 0!" }),
  category: z.enum(["women", "men", "children"] as const),
  clothing_category: z.enum([
    "Sweater", "Scarf", "Keychain", "Doll", "Cardigan",
  ] as const),
  sizes: z.array(z.string()).min(1, { message: "Select at least one size!" }),
  colors: z.array(z.string()).min(1, { message: "Select at least one color!" }),
});

const AddProduct = () => {
  const [imageFiles, setImageFiles] = useState<Record<string, File>>({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { sizes: [], colors: [] },
  });

  const selectedColors = form.watch("colors");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      // 1. Upload images to Supabase Storage for each selected color
      const images: Record<string, string> = {};
      for (const color of values.colors) {
        const file = imageFiles[color];
        if (file) {
          const { url, error } = await uploadProductImage(file, values.name, color);
          if (error || !url) throw new Error(`Image upload failed for ${color}: ${error}`);
          images[color] = url;
        }
      }

      // 2. Insert product into Supabase
      const result = await createProduct({
        name: values.name,
        short_description: values.short_description,  // ← must match exactly
        description: values.description,
        price: values.price,
        category: values.category,
        clothing_category: values.clothing_category,
        sizes: values.sizes as ProductSize[],
        colors: values.colors as ProductColor[],
        images: images as Record<ProductColor, string>,
      });

      if (!result.success) throw new Error(result.error);

      setSuccessMsg("Product added successfully!");
      form.reset();
      setImageFiles({});
    } catch (err: any) {
      setErrorMsg(err.message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SheetContent className="w-full sm:max-w-xl">
      <ScrollArea className="h-screen pr-4">
        <SheetHeader className="mb-6">
          <SheetTitle>Add Product</SheetTitle>
          <SheetDescription>
            Fill in the details below to add a new handmade woolen product to your store.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pb-12">

            {/* Name */}
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl><Input placeholder="e.g. Chunky Knit Cardigan" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* Short Description */}
            <FormField control={form.control} name="short_description" render={({ field }) => (
              <FormItem>
                <FormLabel>Short Description</FormLabel>
                <FormControl><Input placeholder="One-liner shown on product cards" {...field} /></FormControl>
                <FormDescription>Max 120 characters.</FormDescription>
                <FormMessage />
              </FormItem>
            )} />

            {/* Full Description */}
            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem>
                <FormLabel>Full Description</FormLabel>
                <FormControl><Textarea placeholder="Describe the wool type, knitting style, care instructions..." rows={4} {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* Price */}
            <FormField control={form.control} name="price" render={({ field }) => (
              <FormItem>
                <FormLabel>Price (Rs)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" min="0" placeholder="29.99" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* Audience (category) */}
            <FormField control={form.control} name="category" render={({ field }) => (
              <FormItem>
                <FormLabel>Audience</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="Select audience" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {audiences.map((a) => (
                      <SelectItem key={a} value={a} className="capitalize">{a}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Men &amp; Children collections will be visible once launched.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )} />

            {/* Product Type */}
            <FormField control={form.control} name="clothing_category" render={({ field }) => (
              <FormItem>
                <FormLabel>Product Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="Select product type" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {clothingCategories.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />

            {/* Sizes */}
            <FormField control={form.control} name="sizes" render={({ field }) => (
              <FormItem>
                <FormLabel>Available Sizes</FormLabel>
                <FormDescription className="mt-0 mb-2">
                  Leave unchecked for one-size products like Keychains or Dolls.
                </FormDescription>
                <FormControl>
                  <div className="grid grid-cols-4 gap-2 mt-1">
                    {sizes.map((size) => (
                      <div key={size} className="flex items-center gap-1.5">
                        <Checkbox
                          checked={field.value?.includes(size)}
                          onCheckedChange={(checked) => {
                            const current = field.value || [];
                            field.onChange(
                              checked ? [...current, size] : current.filter((v) => v !== size)
                            );
                          }}
                        />
                        <label className="text-xs cursor-pointer uppercase">{size}</label>
                      </div>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* Colors + Image Upload */}
            <FormField control={form.control} name="colors" render={({ field }) => (
              <FormItem>
                <FormLabel>Colors &amp; Images</FormLabel>
                <FormControl>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-2">
                      {colors.map((color) => (
                        <div key={color} className="flex items-center gap-1.5">
                          <Checkbox
                            checked={field.value?.includes(color)}
                            onCheckedChange={(checked) => {
                              const current = field.value || [];
                              field.onChange(
                                checked ? [...current, color] : current.filter((v) => v !== color)
                              );
                              if (!checked) {
                                setImageFiles((prev) => {
                                  const next = { ...prev };
                                  delete next[color];
                                  return next;
                                });
                              }
                            }}
                          />
                          <label className="text-xs flex items-center gap-1 cursor-pointer">
                            <span
                              className="w-3 h-3 rounded-full border border-border inline-block"
                              style={{ backgroundColor: color }}
                            />
                            {color}
                          </label>
                        </div>
                      ))}
                    </div>

                    {/* Image upload per selected color */}
                    {selectedColors && selectedColors.length > 0 && (
                      <div className="mt-4 space-y-3 border rounded-md p-3 bg-muted/40">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          Upload image per color
                        </p>
                        {selectedColors.map((color) => (
                          <div key={color} className="flex items-center gap-3">
                            <span
                              className="w-3 h-3 rounded-full flex-shrink-0 border border-border"
                              style={{ backgroundColor: color }}
                            />
                            <span className="text-sm w-14 capitalize">{color}</span>
                            <Input
                              type="file"
                              accept="image/*"
                              className="text-xs h-8"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) setImageFiles((prev) => ({ ...prev, [color]: file }));
                              }}
                            />
                            {imageFiles[color] && (
                              <span className="text-xs text-green-600">✓</span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* Feedback */}
            {successMsg && (
              <p className="text-sm text-green-600 font-medium">{successMsg}</p>
            )}
            {errorMsg && (
              <p className="text-sm text-destructive font-medium">{errorMsg}</p>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Saving..." : "Add Product"}
            </Button>
          </form>
        </Form>
      </ScrollArea>
    </SheetContent>
  );
};

export default AddProduct;
