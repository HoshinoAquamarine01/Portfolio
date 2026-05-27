import toast from "react-hot-toast";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Mail,
  Phone,
  Map,
  Linkedin,
  Send,
  Facebook,
  Github,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils.js";

emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateForm = (data) => {
  const errors = {};

  if (!data.name.trim()) {
    errors.name = "Name is required";
  } else if (data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.email = "Please enter a valid email";
  }

  if (!data.message.trim()) {
    errors.message = "Message cannot be empty";
  } else if (data.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters";
  }

  return errors;
};

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
      );

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID_OWNER,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          to_email: import.meta.env.VITE_RECEIVER_EMAIL,
          subject: "New Contact Message",
        },
      );

      toast.success("Message sent! I will get back to you soon.", {
        duration: 4000,
      });
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
    } catch (err) {
      toast.error("Failed to send message. Please try again.");
      console.error("EmailJS Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section id="contact" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        {isSubmitting && (
          <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
            <div className="flex flex-col items-center">
              <Loader2 className="animate-spin text-primary mb-2" size={40} />
              <span className="text-lg font-semibold text-primary">
                Sending...
              </span>
            </div>
          </div>
        )}
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Get In <span className="text-primary">Touch</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          I am always open to discussing new projects, creative ideas or
          opportunities to be part of your visions. Feel free to reach out to
          me.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8 ">
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
            <div className="space-y-6 justify-center">
              <div className="flex items-start space-x-4 transition-all duration-300 hover:scale-[1.02]">
                <div className="p-3 rounded-full bg-primary/10 transition-all duration-300 hover:bg-primary/20">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium"> Email</h4>
                  <a
                    href="mailto:phamgiabao141105@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-all duration-300 smooth-link"
                  >
                    phamgiabao141105@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4 transition-all duration-300 hover:scale-[1.02]">
                <div className="p-3 rounded-full bg-primary/10 transition-all duration-300 hover:bg-primary/20">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium"> Phone</h4>
                  <a
                    href="tel:+840353754605"
                    className="text-muted-foreground hover:text-primary transition-all duration-300 smooth-link"
                  >
                    +84353754605
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4 transition-all duration-300 hover:scale-[1.02]">
                <div className="p-3 rounded-full bg-primary/10 transition-all duration-300 hover:bg-primary/20">
                  <Map className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium"> Location</h4>
                  <p className="text-muted-foreground">
                    Ho Chi Minh City, Vietnam
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-8">
              <h4 className="font-medium mb-4"> Connect With Me </h4>
              <div className="flex space-x-4 justify-center">
                <a
                  href="https://www.linkedin.com/in/baogia2005/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn profile"
                  className="text-foreground/80 hover:text-primary transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_8px_rgba(167,139,250,0.5)]"
                >
                  <Linkedin />
                </a>
                <a
                  href="https://github.com/vanhuy2005"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub profile"
                  className="text-foreground/80 hover:text-primary transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_8px_rgba(167,139,250,0.5)]"
                >
                  <Github />
                </a>
                <a
                  href="https://www.facebook.com/pham.gia.bao.543583/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook profile"
                  className="text-foreground/80 hover:text-primary transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_8px_rgba(167,139,250,0.5)]"
                >
                  <Facebook />
                </a>
              </div>
            </div>
          </div>
          <div className="bg-card p-8 rounded-lg shadow-sm border border-border transition-all duration-300 hover:shadow-[0_10px_25px_rgba(167,139,250,0.1)]">
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={cn(
                    "w-full px-4 py-3 rounded-md border bg-background focus:outline-hidden focus:ring-2 transition-all",
                    errors.name
                      ? "border-red-500/70 focus:ring-red-500/50 bg-red-500/5"
                      : "border-border hover:border-primary/30 focus:ring-primary",
                  )}
                  placeholder="Your name here..."
                />
                {errors.name && (
                  <p
                    id="name-error"
                    className="text-sm text-red-500 mt-2 flex items-center gap-1"
                  >
                    ✕ {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={cn(
                    "w-full px-4 py-3 rounded-md border bg-background focus:outline-hidden focus:ring-2 transition-all",
                    errors.email
                      ? "border-red-500/70 focus:ring-red-500/50 bg-red-500/5"
                      : "border-border hover:border-primary/30 focus:ring-primary",
                  )}
                  placeholder="Your email here..."
                />
                {errors.email && (
                  <p
                    id="email-error"
                    className="text-sm text-red-500 mt-2 flex items-center gap-1"
                  >
                    ✕ {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  aria-invalid={!!errors.message}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                  className={cn(
                    "w-full px-4 py-3 rounded-md border bg-background focus:outline-hidden focus:ring-2 resize-none transition-all",
                    errors.message
                      ? "border-red-500/70 focus:ring-red-500/50 bg-red-500/5"
                      : "border-border hover:border-primary/30 focus:ring-primary",
                  )}
                  placeholder="Your message here..."
                  rows="5"
                />
                {errors.message && (
                  <p
                    id="message-error"
                    className="text-sm text-red-500 mt-2 flex items-center gap-1"
                  >
                    ✕ {errors.message}
                  </p>
                )}
              </div>
              <button
                disabled={isSubmitting}
                type="submit"
                aria-busy={isSubmitting}
                className={cn(
                  "btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:scale-100",
                )}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={16} />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
