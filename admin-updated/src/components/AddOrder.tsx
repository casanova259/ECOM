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
import { createOrder } from "@/lib/actions/orders";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  amount: z.coerce.number().min(1, { message: "Amount must be at least $1!" }),
  user_id: z.string().min(1, { message: "User ID is required!" }),
  status: z.enum(["pending", "processing", "success", "failed"]),
});

const AddOrder = () => {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { status: "pending" },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");
    try {
      const result = await createOrder({
        amount: values.amount,
        user_id: values.user_id,
        status: values.status,
      });
      if (!result.success) throw new Error(result.error);
      setSuccessMsg("Order created successfully!");
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
        <SheetTitle>Add Order</SheetTitle>
        <SheetDescription>
          Manually create an order / payment record.
        </SheetDescription>
      </SheetHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField control={form.control} name="amount" render={({ field }) => (
            <FormItem>
              <FormLabel>Amount (USD)</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" min="0" placeholder="99.99" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="user_id" render={({ field }) => (
            <FormItem>
              <FormLabel>User ID</FormLabel>
              <FormControl><Input placeholder="uuid from users table" {...field} /></FormControl>
              <FormDescription>
                Find this in the Users table → Copy user ID.
              </FormDescription>
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
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />

          {successMsg && <p className="text-sm text-green-600 font-medium">{successMsg}</p>}
          {errorMsg && <p className="text-sm text-destructive font-medium">{errorMsg}</p>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Saving..." : "Create Order"}
          </Button>
        </form>
      </Form>
    </SheetContent>
  );
};

export default AddOrder;
