
import ContactForm from "@/components/contact/ContactForm";

export default function Contact() {
  return (
    <div className="container py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Have questions about Vision Sentinel? Our team is ready to help you with any inquiries about our facial recognition system.
        </p>
      </div>
      
      <ContactForm />
    </div>
  );
}
