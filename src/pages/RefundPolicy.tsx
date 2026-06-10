import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-[#f8f9fa] selection:bg-lime-400 selection:text-emerald-950">
      <Header />
      <main className="container-content pt-48 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <span className="text-[11px] font-headline font-black uppercase tracking-[0.4em] text-emerald-900/40 mb-6 block">Order Support</span>
          <h1 className="text-5xl md:text-7xl font-headline font-black text-emerald-950 uppercase tracking-tighter leading-none mb-12">
            Cancellation <span className="text-emerald-900/30 italic">& Refund</span>
          </h1>
          
          <div className="prose prose-emerald max-w-none space-y-12 text-emerald-950/70 font-body leading-relaxed">
            <section className="bg-white p-10 md:p-16 rounded-[3rem] border border-emerald-950/5 shadow-sm">
              <p className="text-xl font-medium text-emerald-950 mb-8 border-l-4 border-lime-400 pl-6">
                Because HerbsEra soaps are handcrafted, natural personal care items, we must maintain strict hygiene protocols. Please review our policies regarding cancellation, damages, and refunds.
              </p>
              
              <div className="space-y-10">
                <div>
                  <h2 className="text-2xl font-headline font-black uppercase tracking-tight text-emerald-950 mb-4">1. Hygiene & Return Policy</h2>
                  <p>
                    Due to the artisanal, personal nature of our skincare products, **we do not accept returns or exchanges** once an item has been delivered. This ensures that every bar shipped to our customers is pristine and untouched.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-headline font-black uppercase tracking-tight text-emerald-950 mb-4">2. Damaged or Incorrect Shipments</h2>
                  <p>
                    If your crystalline soap arrives broken, damaged, or does not match your order details, we will gladly send a free replacement or issue a full refund.
                  </p>
                  <p className="mt-2">
                    To claim a replacement or refund for a damaged item:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Contact us within **48 hours** of receiving your package.</li>
                    <li>Provide your order number and email address.</li>
                    <li>Attach clear photographs or a short unboxing video showing the packaging damage.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-headline font-black uppercase tracking-tight text-emerald-950 mb-4">3. Order Cancellation</h2>
                  <p>
                    You may cancel your HerbsEra order at any time **before it is dispatched (shipped)** from our warehouse. Typically, orders are processed and shipped within 12–24 hours.
                  </p>
                  <p className="mt-2">
                    If the order is already in transit with our logistics partners, we cannot cancel or stop delivery. In such cases, if you refuse the package at delivery, the actual shipping charges will be deducted from your refund.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-headline font-black uppercase tracking-tight text-emerald-950 mb-4">4. Refund Settlement</h2>
                  <p>
                    Once your refund request is verified and approved by our quality control concierge, the refund will be processed back to your original payment method.
                  </p>
                  <p className="mt-2">
                    *   **Online Payments (UPI, Cards, Net Banking):** Standard processing time is **5 to 7 business days** for the credit to appear in your account, depending on your bank.
                    *   **Cash on Delivery (COD):** Refunds will be made via bank transfer or UPI. We will request your bank account details securely via email or phone.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-headline font-black uppercase tracking-tight text-emerald-950 mb-4">5. Reaching Our Concierge</h2>
                  <p>
                    If you have any questions or require help resolving an order issue, please visit our <Link to="/contact" className="text-forest underline font-bold">Contact Page</Link> or reach out directly via email:
                  </p>
                  <div className="mt-4 p-6 bg-cream-dark rounded-2xl flex flex-col gap-2">
                    <p className="text-sm">📧 **Support Email:** contact@herbsera.in</p>
                    <p className="text-sm">📞 **Helpline:** +91 98765 43210 (Mon–Sat, 10 AM – 6 PM)</p>
                  </div>
                </div>
              </div>
            </section>
            
            <p className="text-center text-sm font-headline font-black uppercase tracking-[0.2em] text-emerald-900/40">Last Updated: June 2026</p>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default RefundPolicy;
