import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const Terms = () => {
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
          <span className="text-[11px] font-headline font-black uppercase tracking-[0.4em] text-emerald-900/40 mb-6 block">Legal Agreement</span>
          <h1 className="text-5xl md:text-7xl font-headline font-black text-emerald-950 uppercase tracking-tighter leading-none mb-12">
            Terms & <span className="text-emerald-900/30 italic">Conditions</span>
          </h1>
          
          <div className="prose prose-emerald max-w-none space-y-12 text-emerald-950/70 font-body leading-relaxed">
            <section className="bg-white p-10 md:p-16 rounded-[3rem] border border-emerald-950/5 shadow-sm">
              <p className="text-xl font-medium text-emerald-950 mb-8 border-l-4 border-lime-400 pl-6">
                By entering the world of HerbsEra, you agree to the following terms and guidelines. These ensure a harmonious relationship between our craft and your experience.
              </p>
              
              <div className="space-y-10">
                <div>
                  <h2 className="text-2xl font-headline font-black uppercase tracking-tight text-emerald-950 mb-4">1. Acceptance of Terms</h2>
                  <p>Accessing HerbsEra signifies your agreement to comply with these terms. If any part of these guidelines does not resonate with you, we kindly ask that you refrain from using our botanical boutique.</p>
                </div>

                <div>
                  <h2 className="text-2xl font-headline font-black uppercase tracking-tight text-emerald-950 mb-4">2. Intellectual Property</h2>
                  <p>All content within HerbsEra—including cinematic imagery, botanical descriptions, and gemstone research—is our intellectual soul. Use of these materials for commercial purposes without our blessing is strictly prohibited.</p>
                </div>

                <div>
                  <h2 className="text-2xl font-headline font-black uppercase tracking-tight text-emerald-950 mb-4">3. User Obligations</h2>
                  <p>As a guest of HerbsEra, you agree to use our platform with integrity. Attempting to disrupt our digital architecture or misrepresent your identity is a violation of our mutual trust.</p>
                </div>

                <div>
                  <h2 className="text-2xl font-headline font-black uppercase tracking-tight text-emerald-950 mb-4">4. Limitation of Liability</h2>
                  <p>HerbsEra strives for absolute crystalline perfection, but we cannot be held liable for any indirect or consequential damages arising from the use of our website or artisanal products beyond their intended botanical purpose.</p>
                </div>

                <div>
                  <h2 className="text-2xl font-headline font-black uppercase tracking-tight text-emerald-950 mb-4">5. Governing Law</h2>
                  <p>These terms are governed by the laws of India. Any disputes arising from your journey with us shall be resolved through the jurisdiction of Indian courts, with an emphasis on mutual respect and clarity.</p>
                </div>
              </div>
            </section>
            
            <p className="text-center text-sm font-headline font-black uppercase tracking-[0.2em] text-emerald-900/40">Effective Date: April 2024</p>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
