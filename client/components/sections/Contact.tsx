import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useRef } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [shake, setShake] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(formData.email)) newErrors.email = "Invalid email address";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }

    setIsSubmitting(true);

    try {
      const isConfigured =
        !EMAILJS_SERVICE_ID.startsWith("YOUR_") &&
        !EMAILJS_TEMPLATE_ID.startsWith("YOUR_") &&
        !EMAILJS_PUBLIC_KEY.startsWith("YOUR_");

      if (isConfigured) {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
          },
          EMAILJS_PUBLIC_KEY,
        );
      } else {
        await new Promise((r) => setTimeout(r, 1200));
      }

      setIsSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setIsSuccess(false), 4000);
    } catch {
      setErrors({ message: "Failed to send. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass = (field: keyof FormData) =>
    `input-glass ${errors[field] ? "border-red-400" : ""}`;

  return (
    <section id="contact" className="section-padding bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-0.5 w-12 bg-gradient-main" />
            <span className="text-primary text-sm font-bold tracking-widest uppercase">
              Get In Touch
            </span>
            <div className="h-0.5 w-12 bg-gradient-main" />
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
            Contact Us
          </h2>
          <p className="text-text-secondary max-w-md mx-auto">
            Have a project in mind? Send a message and I&apos;ll get back to you as soon as possible.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="flex justify-center"
        >
          <motion.div
            animate={shake ? { x: [0, -6, 6, -6, 0] } : { x: 0 }}
            transition={{ duration: 0.35 }}
            className="w-full max-w-[600px] glass-card rounded-xl p-8 md:p-10"
          >
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col items-center justify-center py-12"
                >
                  <CheckCircle className="w-14 h-14 text-primary mb-4" />
                  <p className="text-white font-medium">Message sent successfully!</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5"
                  noValidate
                >
                  {(
                    [
                      { id: "name", label: "Name", type: "text", placeholder: "Your name" },
                      { id: "email", label: "Email", type: "email", placeholder: "your@email.com" },
                      { id: "subject", label: "Subject", type: "text", placeholder: "Project inquiry" },
                    ] as const
                  ).map((field) => (
                    <div key={field.id}>
                      <label htmlFor={field.id} className="sr-only">
                        {field.label}
                      </label>
                      <input
                        id={field.id}
                        type={field.type}
                        name={field.id}
                        value={formData[field.id]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className={fieldClass(field.id)}
                        autoComplete={field.id === "email" ? "email" : "on"}
                      />
                      {errors[field.id] && (
                        <p className="text-red-400 text-xs mt-1.5">{errors[field.id]}</p>
                      )}
                    </div>
                  ))}

                  <div>
                    <label htmlFor="message" className="sr-only">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message..."
                      rows={5}
                      className={`${fieldClass("message")} resize-none`}
                    />
                    {errors.message && (
                      <p className="text-red-400 text-xs mt-1.5">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    data-cursor="hover"
                    className="w-full bg-gradient-main hover:opacity-90 disabled:opacity-70 text-white font-medium py-4 rounded-btn transition-all duration-300 ease-out flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] shadow-glow-brand"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Contact Us"
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
