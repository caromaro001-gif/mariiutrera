import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Copy, CheckCircle2, Bitcoin, DollarSign, Image as ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  plan: z.string().min(1, "Plan selection is required"),
  paymentMethod: z.string().min(1, "Payment method is required"),
  cashappHandle: z.string().optional(),
  btcHash: z.string().optional(),
  amountPaid: z.string().min(1, "Amount is required"),
  notes: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.paymentMethod === "cashapp" && !data.cashappHandle) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["cashappHandle"],
      message: "Cash App Username is required for Cash App payments",
    });
  }
  if (data.paymentMethod === "bitcoin" && !data.btcHash) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["btcHash"],
      message: "Transaction Hash is required for Bitcoin payments",
    });
  }
});

type FormValues = z.infer<typeof formSchema>;

export function Payment({ prefilledPlan }: { prefilledPlan: string }) {
  const [copiedApp, setCopiedApp] = useState(false);
  const [copiedBtc, setCopiedBtc] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const cashappHandle = import.meta.env.VITE_CASHAPP || "$MariiUtreraPremium";
  const btcAddress = import.meta.env.VITE_BTC_ADDRESS || "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh";
  const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT || "https://formspree.io/f/placeholder";

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      plan: prefilledPlan || "",
      paymentMethod: "",
      cashappHandle: "",
      btcHash: "",
      amountPaid: "",
      notes: "",
    },
  });

  const watchPaymentMethod = form.watch("paymentMethod");

  const copyToClipboard = (text: string, isApp: boolean) => {
    navigator.clipboard.writeText(text);
    if (isApp) {
      setCopiedApp(true);
      setTimeout(() => setCopiedApp(false), 2000);
    } else {
      setCopiedBtc(true);
      setTimeout(() => setCopiedBtc(false), 2000);
    }
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });
      
      if (fileInputRef.current?.files?.[0]) {
        formData.append("screenshot", fileInputRef.current.files[0]);
      }

      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setIsSuccess(true);
        setSubmitError(null);
        form.reset();
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        const body = await response.json().catch(() => ({}));
        setSubmitError(
          (body as { error?: string }).error ||
          "Submission failed. Please try again or contact support via WhatsApp."
        );
      }
    } catch (error) {
      console.error(error);
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="payment" className="py-24 bg-background relative border-t border-primary/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-white mb-4"
          >
            Complete Your <span className="text-gradient-gold">Payment</span>
          </motion.h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto font-light">
            Follow the steps below to secure your access.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Step 1: Send Payment */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-8 rounded-full bg-primary text-black flex items-center justify-center font-bold">1</div>
              <h3 className="text-2xl font-serif text-white">Send Payment</h3>
            </div>
            
            <div className="space-y-6">
              {/* CashApp Card */}
              <div className="glass-panel rounded-xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#00D632]/10 rounded-full blur-2xl -mr-10 -mt-10" />
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#00D632] flex items-center justify-center text-white">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Cash App</h4>
                </div>
                <div className="flex items-center justify-between bg-black/40 rounded-lg p-3 border border-white/10 font-mono text-[#00D632] text-sm md:text-base">
                  <span>{cashappHandle}</span>
                  <button 
                    onClick={() => copyToClipboard(cashappHandle, true)}
                    className="p-2 hover:bg-white/10 rounded-md transition-colors text-white/70"
                    aria-label="Copy CashApp handle"
                  >
                    {copiedApp ? <CheckCircle2 className="w-5 h-5 text-[#00D632]" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Bitcoin Card */}
              <div className="glass-panel rounded-xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#F7931A]/10 rounded-full blur-2xl -mr-10 -mt-10" />
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#F7931A] flex items-center justify-center text-white">
                    <Bitcoin className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Bitcoin (BTC)</h4>
                </div>
                <div className="flex items-center justify-between bg-black/40 rounded-lg p-3 border border-white/10 font-mono text-[#F7931A] text-xs md:text-sm overflow-x-auto gap-4">
                  <span className="truncate">{btcAddress}</span>
                  <button 
                    onClick={() => copyToClipboard(btcAddress, false)}
                    className="p-2 hover:bg-white/10 rounded-md transition-colors text-white/70 shrink-0"
                    aria-label="Copy BTC address"
                  >
                    {copiedBtc ? <CheckCircle2 className="w-5 h-5 text-[#F7931A]" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Verification Form */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-8 rounded-full bg-primary text-black flex items-center justify-center font-bold">2</div>
              <h3 className="text-2xl font-serif text-white">Verify Access</h3>
            </div>

            <div className="glass-panel rounded-xl p-6 md:p-8">
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-10"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="text-2xl font-serif text-primary mb-2">Thank You</h4>
                  <p className="text-white/70">
                    Your payment is being reviewed. Access instructions will be sent to your email once confirmed.
                  </p>
                </motion.div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/80">Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/80">Email</FormLabel>
                            <FormControl>
                              <Input placeholder="john@example.com" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="plan"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/80">Selected Plan</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value || prefilledPlan}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a plan" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="monthly">Monthly Access ($25)</SelectItem>
                                <SelectItem value="vip">VIP Access ($50)</SelectItem>
                                <SelectItem value="lifetime">Lifetime Premium ($150)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="paymentMethod"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/80">Payment Method</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="How did you pay?" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="cashapp">Cash App</SelectItem>
                                <SelectItem value="bitcoin">Bitcoin (BTC)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {watchPaymentMethod === "cashapp" && (
                      <FormField
                        control={form.control}
                        name="cashappHandle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/80">Your Cash App Username ($cashtag)</FormLabel>
                            <FormControl>
                              <Input placeholder="$YourHandle" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    {watchPaymentMethod === "bitcoin" && (
                      <FormField
                        control={form.control}
                        name="btcHash"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/80">BTC Transaction Hash</FormLabel>
                            <FormControl>
                              <Input placeholder="txid..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <FormField
                      control={form.control}
                      name="amountPaid"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/80">Amount Paid (USD)</FormLabel>
                          <FormControl>
                            <Input placeholder="50.00" type="number" step="0.01" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-2">
                      <FormLabel className="text-white/80">Payment Screenshot (Optional)</FormLabel>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center justify-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-md cursor-pointer hover:bg-white/10 transition-colors text-sm text-white/80 w-full">
                          <ImageIcon className="w-4 h-4" />
                          <span>Upload File</span>
                          <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*"
                            ref={fileInputRef}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-white/40 italic">Note: File upload requires a supported Formspree plan.</p>
                    </div>

                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/80">Additional Notes (Optional)</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Any other details..." className="resize-none" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {submitError && (
                      <p className="text-red-400 text-sm text-center">{submitError}</p>
                    )}
                    <Button type="submit" disabled={isSubmitting} className="w-full mt-6 text-md h-12">
                      {isSubmitting ? "Submitting..." : "Verify Payment"}
                    </Button>
                  </form>
                </Form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
