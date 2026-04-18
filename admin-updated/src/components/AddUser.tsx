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
import { createUser } from "@/lib/actions/users";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  full_name: z.string().min(2, { message: "Full name must be at least 2 characters!" }).max(50),
  email: z.string().email({ message: "Invalid email address!" }),
  phone: z.string().min(7).max(20).optional().or(z.literal("")),
  address: z.string().min(2).optional().or(z.literal("")),
  city: z.string().min(2).optional().or(z.literal("")),
  status: z.enum(["active", "inactive"]).default("active"),
});

const AddUser = () => {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { status: "active" },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");
    try {
      const result = await createUser({
        full_name: values.full_name,
        email: values.email,
        phone: values.phone || null,
        address: values.address || null,
        city: values.city || null,
        avatar_url: null,
        status: values.status,
      });
      if (!result.success) throw new Error(result.error);
      setSuccessMsg("User added successfully!");
      form.reset();
    } catch (err: any) {
      setErrorMsg(err.message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SheetContent className="w-full sm:max-w-md">
      <SheetHeader className="mb-6">
        <SheetTitle>Add User</SheetTitle>
        <SheetDescription>
          Manually add a customer to the database.
        </SheetDescription>
      </SheetHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField control={form.control} name="full_name" render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl><Input placeholder="Jane Smith" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl><Input type="email" placeholder="jane@example.com" {...field} /></FormControl>
              <FormDescription>Visible to admins only.</FormDescription>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="phone" render={({ field }) => (
            <FormItem>
              <FormLabel>Phone <span className="text-muted-foreground text-xs">(optional)</span></FormLabel>
              <FormControl><Input placeholder="+91 98765 43210" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="address" render={({ field }) => (
            <FormItem>
              <FormLabel>Address <span className="text-muted-foreground text-xs">(optional)</span></FormLabel>
              <FormControl><Input placeholder="123 Main St" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="city" render={({ field }) => (
            <FormItem>
              <FormLabel>City <span className="text-muted-foreground text-xs">(optional)</span></FormLabel>
              <FormControl><Input placeholder="Ludhiana" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="status" render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />

          {successMsg && <p className="text-sm text-green-600 font-medium">{successMsg}</p>}
          {errorMsg && <p className="text-sm text-destructive font-medium">{errorMsg}</p>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Saving..." : "Add User"}
          </Button>
        </form>
      </Form>
    </SheetContent>
  );
};

export default AddUser;
