import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main className="container mx-auto px-4 py-32 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-serif text-4xl md:text-5xl text-forest mb-8">Privacy Policy</h1>
          <div className="prose prose-forest max-w-none text-charcoal-light space-y-6">
            <p className="text-lg">At HerbsEra, accessible from herbsera.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by HerbsEra and how we use it.</p>
            
            <section>
              <h2 className="text-2xl font-serif text-charcoal mt-8 mb-4">1. Information We Collect</h2>
              <p>The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.</p>
              <p>If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-charcoal mt-8 mb-4">2. How We Use Your Information</h2>
              <p>We use the information we collect in various ways, including to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide, operate, and maintain our website;</li>
                <li>Improve, personalize, and expand our website;</li>
                <li>Understand and analyze how you use our website;</li>
                <li>Develop new products, services, features, and functionality;</li>
                <li>Communicate with you, either directly or through one of our partners;</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-charcoal mt-8 mb-4">3. Log Files</h2>
              <p>HerbsEra follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics.</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-charcoal mt-8 mb-4">4. Cookies and Web Beacons</h2>
              <p>Like any other website, HerbsEra uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited.</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-charcoal mt-8 mb-4">5. CCPA Privacy Rights & GDPR Data Protection Rights</h2>
              <p>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the right to access, rectification, erasure, and data portability.</p>
            </section>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
