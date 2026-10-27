import { useState } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import { Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

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

export const ContactForm = () => {
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
        }
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
        }
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
    <div className="bg-card p-8 rounded-lg shadow-sm border border-border transition-all duration-300 hover:shadow-[0_10px_25px_rgba(167,139,250,0.1)] relative">
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

      <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
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
                : "border-border hover:border-primary/30 focus:ring-primary"
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
          <label htmlFor="email" className="block text-sm font-medium mb-2">
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
                : "border-border hover:border-primary/30 focus:ring-primary"
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
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={cn(
              "w-full px-4 py-3 rounded-md border bg-background focus:outline-hidden focus:ring-2 resize-none transition-all",
              errors.message
                ? "border-red-500/70 focus:ring-red-500/50 bg-red-500/5"
                : "border-border hover:border-primary/30 focus:ring-primary"
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
            "btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:scale-100"
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
  );
};

export default ContactForm;
