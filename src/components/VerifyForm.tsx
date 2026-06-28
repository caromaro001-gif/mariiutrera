import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const formSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  selectedPlan: z.string().min(1, "Please select a plan"),
  paymentMethod: z.enum(["cashapp", "bitcoin"]),
  cashappUsername: z.string().optional(),
  btcHash: z.string().optional(),
  amountPaid: z.string().min(1, "Amount is required"),
  notes: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.paymentMethod === "cashapp" && !data.cashappUsername) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Cash App Username is required",
      path: ["cashappUsername"]
    });
  }
  if (data.paymentMethod === "bitcoin" && !data.btcHash) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Transaction Hash is required",
      path: ["btcHash"]
    });
  }
});

type FormValues = z.infer<typeof formSchema>;

export function VerifyForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      selectedPlan: "monthly",
      paymentMethod: "cashapp",
      cashappUsername: "",
      btcHash: "",
      amountPaid: "",
      notes: "",
    },
  });

  useEffect(() => {
    const handleSelectPlan = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        form.setValue("selectedPlan", customEvent.detail);
      }
    };
    window.addEventListener('select-plan', handleSelectPlan);
    return () => window.removeEventListener('select-plan', handleSelectPlan);
  }, [form]);

  const paymentMethod = form.watch("paymentMethod");

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;
      if (!endpoint) {
        throw new Error("Formspree endpoint not configured");
      }

      let body: FormData | string;
      let headers: Record<string, string> = {};

      if (file) {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          if (value) formData.append(key, value);
        });
        formData.append("screenshot", file);
        body = formData;
        // Don't set Content-Type for FormData, fetch does it automatically with boundary
      } else {
        body = JSON.stringify(data);
        headers = { "Content-Type": "application/json" };
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers,
        body,
      });

      if (!res.ok) {
        throw new Error("Failed to submit form");
      }

      toast({
        title: "Success",
        description: "Thank you! Your payment is being reviewed. Access instructions will be sent once payment is confirmed.",
      });
      form.reset();
      setFile(null);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an issue submitting your verification. Please try again or contact support.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="verify" className="py-24 bg-background relative border-t border-white/5">
      <div className="container mx-auto px-4 max-w-2xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl font-bold text-white mb-4" data-testid="verify-heading">
            Verify Your Payment
          </h2>
          <p className="text-gray-400">
            Submit your details below after sending payment to gain access.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass p-6 md:p-10 rounded-3xl"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" className="bg-black/50 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-primary" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@example.com" className="bg-black/50 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-primary" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="selectedPlan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Selected Plan</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-black/50 border-white/10 text-white focus:ring-primary">
                          <SelectValue placeholder="Select a plan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-900 border-white/10 text-white">
                        <SelectItem value="monthly" className="focus:bg-white/10 focus:text-primary">Monthly Access - $25</SelectItem>
                        <SelectItem value="vip" className="focus:bg-white/10 focus:text-primary">VIP Access - $50</SelectItem>
                        <SelectItem value="lifetime" className="focus:bg-white/10 focus:text-primary">Lifetime Premium - $150</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-gray-300">Payment Method Used</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex gap-4"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="cashapp" className="border-white/20 text-primary" />
                          </FormControl>
                          <FormLabel className="font-normal text-gray-300 cursor-pointer">Cash App</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="bitcoin" className="border-white/20 text-primary" />
                          </FormControl>
                          <FormLabel className="font-normal text-gray-300 cursor-pointer">Bitcoin (BTC)</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {paymentMethod === "cashapp" && (
                <FormField
                  control={form.control}
                  name="cashappUsername"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Your Cash App $Cashtag</FormLabel>
                      <FormControl>
                        <Input placeholder="$Username" className="bg-black/50 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-primary" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              )}

              {paymentMethod === "bitcoin" && (
                <FormField
                  control={form.control}
                  name="btcHash"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Transaction Hash (TXID)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 1a2b3c..." className="bg-black/50 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-primary" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="amountPaid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Amount Paid</FormLabel>
                    <FormControl>
                      <Input placeholder="$25.00" className="bg-black/50 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-primary" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Payment Screenshot (optional)</label>
                <Input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="bg-black/50 border-white/10 text-white file:text-primary file:font-medium file:border-0 file:bg-transparent cursor-pointer" 
                />
                <p className="text-xs text-gray-500">Helps speed up the verification process.</p>
              </div>

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Notes (optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Any additional info..." 
                        className="bg-black/50 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-primary resize-none min-h-[100px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-accent text-black font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(255,215,0,0.2)] hover:shadow-[0_0_30px_rgba(255,215,0,0.4)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
                data-testid="btn-verify-submit"
              >
                {isSubmitting ? "Verifying..." : "Verify Payment"}
              </button>
            </form>
          </Form>
        </motion.div>
      </div>
    </section>
  );
}