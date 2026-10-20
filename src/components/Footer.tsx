export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10 text-sm text-gray-600">
        <p className="font-semibold text-gray-800">
          Safety Financial Consulting
        </p>

        <p className="mt-2">
          Educational, consultation, and referral-based financial services.
          We do not provide lending, credit repair, or tax advice directly.
          All services are subject to eligibility and third-party terms.
        </p>

        <p className="mt-4 text-xs">
          © {new Date().getFullYear()} Safety Financial Consulting. All rights reserved.
        </p>
      </div>
    </footer>
  );
}