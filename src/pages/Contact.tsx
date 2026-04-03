import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. We'll get back to you soon.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const faqs = [
    {
      question: "How long does shipping take?",
      answer:
        "Orders are processed within 1-2 business days. Standard shipping takes 5-7 days, while express shipping takes 2-3 days.",
    },
    {
      question: "Are your products suitable for sensitive skin?",
      answer:
        "Yes! All our products are dermatologically tested and formulated to be gentle on all skin types, including sensitive skin.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Currently, we ship across India. International shipping is coming soon!",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Contact Us | Support & Inquiries – HerbsEra"
        description="Have questions about our gemstone soaps? Reach out to the HerbsEra team. We're here to help with orders, product inquiries, and wholesale opportunities."
        keywords="contact herbsera, gemstone soap support, skincare inquiries india, herbsera address, customer service soap"
      />
      <Header />

      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 bg-cream-dark">
        <div className="container-content text-center px-4">
          <span className="inline-block text-sage font-medium tracking-widest uppercase text-xs sm:text-sm mb-3 sm:mb-4">
            Get in Touch
          </span>
          <h1 className="heading-display text-charcoal mb-4 sm:mb-6">
            We'd Love to Hear
            <br />
            <span className="text-forest">From You</span>
          </h1>
          <p className="text-body max-w-2xl mx-auto px-4">
            Have a question, feedback, or just want to say hello? We're here to
            help.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="container-content">
          <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 md:gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="heading-card text-charcoal mb-6 sm:mb-8">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Name
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="bg-cream-dark border-border rounded-xl h-11 sm:h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Email
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className="bg-cream-dark border-border rounded-xl h-11 sm:h-12"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Subject
                  </label>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    required
                    className="bg-cream-dark border-border rounded-xl h-11 sm:h-12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    rows={4}
                    required
                    className="bg-cream-dark border-border rounded-xl resize-none"
                  />
                </div>
                <Button variant="hero" type="submit" className="w-full sm:w-auto">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Info & FAQs */}
            <div>
              <div className="mb-8 sm:mb-12">
                <h2 className="heading-card text-charcoal mb-6 sm:mb-8">
                  Contact Information
                </h2>
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-sage-light flex items-center justify-center flex-shrink-0">
                      <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-forest" />
                    </div>
                    <div>
                      <p className="font-medium text-charcoal mb-0.5 sm:mb-1">Email</p>
                      <a
                        href="mailto:hello@herbsera.com"
                        className="text-charcoal-light hover:text-forest transition-colors text-sm sm:text-base"
                      >
                        hello@herbsera.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-sage-light flex items-center justify-center flex-shrink-0">
                      <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-forest" />
                    </div>
                    <div>
                      <p className="font-medium text-charcoal mb-0.5 sm:mb-1">Phone</p>
                      <a
                        href="tel:+919876543210"
                        className="text-charcoal-light hover:text-forest transition-colors text-sm sm:text-base"
                      >
                        +91 98765 43210
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-sage-light flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-forest" />
                    </div>
                    <div>
                      <p className="font-medium text-charcoal mb-0.5 sm:mb-1">Location</p>
                      <p className="text-charcoal-light text-sm sm:text-base">
                        Mumbai, Maharashtra, India
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="heading-card text-charcoal mb-4 sm:mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4 sm:space-y-6">
                  {faqs.map((faq) => (
                    <div
                      key={faq.question}
                      className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-cream-dark"
                    >
                      <h4 className="font-medium text-charcoal mb-1.5 sm:mb-2 text-sm sm:text-base">
                        {faq.question}
                      </h4>
                      <p className="text-charcoal-light text-xs sm:text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
