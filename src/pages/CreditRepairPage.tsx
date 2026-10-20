import { useState, useEffect } from "react";

export default function CreditRepairPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("/.netlify/functions/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "Credit Repair",
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          message: formData.get("message"),
        }),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setSuccess(true);
      e.currentTarget.reset();
    } catch {
      alert("Submission failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-700 to-green-600 bg-clip-text text-transparent">
          Credit Repair Services
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Professional credit repair and counselling services to help you rebuild your credit score.
        </p>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input 
                name="name" 
                required 
                placeholder="John Doe" 
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input 
                name="email" 
                type="email" 
                required 
                placeholder="john@example.com" 
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
              <input 
                name="phone" 
                required 
                placeholder="(555) 123-4567" 
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Brief Description (Optional)
              </label>
              <textarea
                name="message"
                placeholder="Tell us about your credit situation..."
                className="w-full border border-gray-300 p-3 rounded-lg h-32 resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="bg-gradient-to-r from-gray-700 to-green-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? "Submitting..." : "Book a Free Credit Repair Consultation"}
            </button>
          </form>

          {success && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 font-medium">✓ Your request has been submitted successfully!</p>
              <p className="text-green-600 text-sm mt-1">We'll contact you within 24 hours.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}