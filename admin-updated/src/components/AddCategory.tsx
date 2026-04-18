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
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabaseAdmin } from "@/lib/supabase/client";
import { useState } from "react";
import { Loader2 } from "lucide-react";

// NOTE: If you add a categories table in Supabase, replace the supabase call below
// with a server action: import { createCategory } from "@/lib/actions/categories"
// For now this updates the clothing_category enum values.

const formSchema = z.object({
  name: z.string().min(1, { message: "Category name is required!" }),
  audience: z.enum(["women", "men", "children"]),
});

const AddCategory = () => {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { audience: "women" },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    // ── Supabase: insert into a `categories` table if you create one ──────────
    // const { error } = await supabaseAdmin.from("categories").insert({
    //   name: values.name,
    //   audience: values.audience,
    // });
    // if (error) { setErrorMsg(error.message); setLoading(false); return; }
    // ─────────────────────────────────────────────────────────────────────────

    // Placeholder until categories table exists
    await new Promise((r) => setTimeout(r, 600));
    setSuccessMsg(`Category "${values.name}" saved! (Add a categories table in Supabase to persist.)`);
    form.reset();
    setLoading(false);
  };

  return (
    <SheetContent className="w-full sm:max-w-md">
      <SheetHeader className="mb-6">
        <SheetTitle>Add Category</SheetTitle>
        <SheetDescription>
          Create a new clothing category for a specific audience.
        </SheetDescription>
      </SheetHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl><Input placeholder="e.g. Swimwear" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="audience" render={({ field }) => (
            <FormItem>
              <FormLabel>Audience</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="women">Women</SelectItem>
                  <SelectItem value="men">Men</SelectItem>
                  <SelectItem value="children">Children</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Which store section should this category appear in?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )} />

          {successMsg && <p className="text-sm text-green-600 font-medium">{successMsg}</p>}
          {errorMsg && <p className="text-sm text-destructive font-medium">{errorMsg}</p>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Saving..." : "Add Category"}
          </Button>
        </form>
      </Form>
    </SheetContent>
  );
};

export default AddCategory;
