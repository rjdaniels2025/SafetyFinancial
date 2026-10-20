import { useState } from "react";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      await fetch("/.netlify/functions/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "General Contact",
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          message: formData.get("message"),
        }),
      });

      setSuccess(true);
      e.currentTarget.reset();
    } catch {
      alert("Submission failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold">Contact Us</h1>

      <form onSubmit={handleSubmit} className="grid gap-4 mt-8">
        <input name="name" required placeholder="Full Name" className="border p-3 rounded" />
        <input name="email" type="email" required placeholder="Email" className="border p-3 rounded" />
        <input name="phone" placeholder="Phone" className="border p-3 rounded" />

        <textarea
          name="message"
          required
          placeholder="Your message"
          className="border p-3 rounded h-32"
        />

        <button type="submit" disabled={loading} className="bg-black text-white py-3 rounded">
          {loading ? "Submitting..." : "Send Message"}
        </button>
      </form>

      {success && (
        <p className="text-green-600 mt-4">Your message has been sent.</p>
      )}
    </div>
  );
}