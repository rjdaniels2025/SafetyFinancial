import { useState } from "react";

export default function BusinessFundingPage() {
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
          formType: "Business Funding & Grants",
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          businessName: formData.get("businessName"),
          employees: formData.get("employees"),
          fundingInterest: formData.get("fundingInterest"),
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
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold">Business Funding & Grants</h1>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4 mt-8">
        <input name="name" required placeholder="Full Name" className="border p-3 rounded" />
        <input name="email" type="email" required placeholder="Email" className="border p-3 rounded" />
        <input name="phone" required placeholder="Phone" className="border p-3 rounded" />
        <input name="businessName" placeholder="Business Name" className="border p-3 rounded" />
        <input name="employees" placeholder="Number of Employees" className="border p-3 rounded" />

        <select name="fundingInterest" className="border p-3 rounded">
          <option value="">Funding Interest</option>
          <option value="Business Loan">Business Loan</option>
          <option value="Grant">Grant</option>
          <option value="Unsure">Unsure</option>
        </select>

        <button type="submit" disabled={loading} className="md:col-span-2 bg-black text-white py-3 rounded">
          {loading ? "Submitting..." : "Request More Information"}
        </button>
      </form>

      {success && (
        <p className="text-green-600 mt-4">Your request has been submitted.</p>
      )}
    </div>
  );
}