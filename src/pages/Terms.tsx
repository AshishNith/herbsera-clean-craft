import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const Terms = () => {
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main className="container mx-auto px-4 py-32 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-serif text-4xl md:text-5xl text-forest mb-8">Terms and Conditions</h1>
          <div className="prose prose-forest max-w-none text-charcoal-light space-y-6">
            <p className="text-lg">Welcome to HerbsEra. These terms and conditions outline the rules and regulations for the use of Herbsera's Website.</p>
            
            <section>
              <h2 className="text-2xl font-serif text-charcoal mt-8 mb-4">1. Introduction</h2>
              <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use HerbsEra if you do not agree to take all of the terms and conditions stated on this page.</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-charcoal mt-8 mb-4">2. Intellectual Property Rights</h2>
              <p>Other than the content you own, under these Terms, Herbsera and/or its licensors own all the intellectual property rights and materials contained in this Website.</p>
              <p>You are granted limited license only for purposes of viewing the material contained on this Website.</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-charcoal mt-8 mb-4">3. Restrictions</h2>
              <p>You are specifically restricted from all of the following:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Publishing any Website material in any other media;</li>
                <li>Selling, sublicensing and/or otherwise commercializing any Website material;</li>
                <li>Publicly performing and/or showing any Website material;</li>
                <li>Using this Website in any way that is or may be damaging to this Website;</li>
                <li>Using this Website in any way that impacts user access to this Website;</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-charcoal mt-8 mb-4">4. Your Privacy</h2>
              <p>Please read our Privacy Policy.</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-charcoal mt-8 mb-4">5. Governing Law & Jurisdiction</h2>
              <p>These Terms will be governed by and interpreted in accordance with the laws of the State of India, and you submit to the non-exclusive jurisdiction of the state and federal courts located in India for the resolution of any disputes.</p>
            </section>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
