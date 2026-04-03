import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const Privacy = () => {
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
          <span className="text-[11px] font-headline font-black uppercase tracking-[0.4em] text-emerald-900/40 mb-6 block">Legal Foundation</span>
          <h1 className="text-5xl md:text-7xl font-headline font-black text-emerald-950 uppercase tracking-tighter leading-none mb-12">
            Privacy <span className="text-emerald-900/30 italic">Policy</span>
          </h1>
          
          <div className="prose prose-emerald max-w-none space-y-12 text-emerald-950/70 font-body leading-relaxed">
            <section className="bg-white p-10 md:p-16 rounded-[3rem] border border-emerald-950/5 shadow-sm">
              <p className="text-xl font-medium text-emerald-950 mb-8 border-l-4 border-lime-400 pl-6">
                At HerbsEra, we believe that your digital privacy is as sacred as your physical well-being. This document outlines how we protect and manage the data you entrust to us.
              </p>
              
              <div className="space-y-10">
                <div>
                  <h2 className="text-2xl font-headline font-black uppercase tracking-tight text-emerald-950 mb-4">1. Data Collection</h2>
                  <p>We collect information that allows us to deliver the HerbsEra experience to you. This includes your name, delivery address, and contact details provided during the ritual of purchase or account creation.</p>
                </div>

                <div>
                  <h2 className="text-2xl font-headline font-black uppercase tracking-tight text-emerald-950 mb-4">2. Purpose of Use</h2>
                  <p>Your data exists only to serve your experience. We use it to process your crystalline soap orders, personalize your journey through our boutique, and occasionally share botanical insights if you've joined our circle.</p>
                </div>

                <div>
                  <h2 className="text-2xl font-headline font-black uppercase tracking-tight text-emerald-950 mb-4">3. Security Protcols</h2>
                  <p>We employ industry-leading encryption and security layers. Your financial details are handled through secure, PCI-compliant gateways and are never stored directly on our botanical servers.</p>
                </div>

                <div>
                  <h2 className="text-2xl font-headline font-black uppercase tracking-tight text-emerald-950 mb-4">4. Digital Cookies</h2>
                  <p>Our boutique uses essential cookies to remember your cart and preferences. These are small fragments of data that ensure your return to HerbsEra is as seamless as your first visit.</p>
                </div>

                <div>
                  <h2 className="text-2xl font-headline font-black uppercase tracking-tight text-emerald-950 mb-4">5. Your Rights</h2>
                  <p>You hold the ultimate power over your data. You may request access, rectification, or complete erasure of your personal information at any time by contacting our botanical concierge.</p>
                </div>
              </div>
            </section>
            
            <p className="text-center text-sm font-headline font-black uppercase tracking-[0.2em] text-emerald-900/40">Last Updated: April 2024</p>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
