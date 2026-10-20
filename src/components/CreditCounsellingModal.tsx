import { useState } from 'react';
import { X, TrendingUp, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface CreditCounsellingModalProps {
  onClose: () => void;
}

export default function CreditCounsellingModal({ onClose }: CreditCounsellingModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    totalDebt: '',
    debtTypes: [] as string[],
    monthlyIncome: '',
    notes: '',
  });

  const totalSteps = 2;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (value: string) => {
    setFormData({
      ...formData,
      debtTypes: formData.debtTypes.includes(value)
        ? formData.debtTypes.filter((item) => item !== value)
        : [...formData.debtTypes, value],
    });
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formAnswers = `Total Debt: ${formData.totalDebt}
Debt Types: ${formData.debtTypes.join(', ')}
Monthly Income: ${formData.monthlyIncome}
Notes: ${formData.notes || 'N/A'}`;

      const webhookData = {
        form_type: 'credit_counselling_referral',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        form_answers: formAnswers,
        submitted_at: new Date().toISOString(),
      };

      const [dbResult, telegramResult] = await Promise.allSettled([
        supabase.from('credit_counselling_referrals').insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            total_debt: formData.totalDebt,
            debt_types: formData.debtTypes,
            monthly_income: formData.monthlyIncome,
            notes: formData.notes,
          },
        ]),
        fetch('/.netlify/functions/telegram', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            formType: 'credit_counselling',
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            debt_amount: formData.totalDebt,
            debt_types: formData.debtTypes,
            monthly_income: formData.monthlyIncome,
            message: formData.notes,
            form_answers: formAnswers,
          }),
        }).then(res => {
          if (!res.ok) {
            throw new Error(`Telegram API returned ${res.status}`);
          }
          return res.json();
        }),
      ]);

      if (dbResult.status === 'rejected' || (dbResult.status === 'fulfilled' && dbResult.value.error)) {
        console.error('Database error:', dbResult);
      }

      if (telegramResult.status === 'rejected') {
        console.error('Telegram error:', telegramResult.reason);
      }

      setShowSuccess(true);
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your information. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h3>
          <p className="text-gray-600">
            We've received your information and will connect you with a trusted credit counselling professional shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl my-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-blue-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Credit Counselling Referral</h2>
              <p className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-8">
          <div className="flex space-x-2">
            {[1, 2].map((step) => (
              <div
                key={step}
                className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                  step <= currentStep ? 'bg-green-600' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Information</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="John Smith"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="john.smith@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm text-blue-800">
                  <strong>Your privacy matters:</strong> All information is kept confidential and will only be shared with your assigned credit counselling professional.
                </p>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Financial Information</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estimated Total Debt *
                </label>
                <select
                  name="totalDebt"
                  value={formData.totalDebt}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                >
                  <option value="">Select debt range</option>
                  <option value="under-5000">Under $5,000</option>
                  <option value="5000-10000">$5,000 - $10,000</option>
                  <option value="10000-25000">$10,000 - $25,000</option>
                  <option value="25000-50000">$25,000 - $50,000</option>
                  <option value="50000-100000">$50,000 - $100,000</option>
                  <option value="over-100000">Over $100,000</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Type of Debt (Select all that apply) *
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'credit-cards', label: 'Credit Cards' },
                    { value: 'personal-loans', label: 'Personal Loans' },
                    { value: 'collections', label: 'Collections' },
                    { value: 'medical-bills', label: 'Medical Bills' },
                    { value: 'student-loans', label: 'Student Loans' },
                    { value: 'payday-loans', label: 'Payday Loans' },
                    { value: 'other', label: 'Other' },
                  ].map((debt) => (
                    <label key={debt.value} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.debtTypes.includes(debt.value)}
                        onChange={() => handleCheckboxChange(debt.value)}
                        className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500"
                      />
                      <span className="text-gray-700">{debt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Income Range *
                </label>
                <select
                  name="monthlyIncome"
                  value={formData.monthlyIncome}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                >
                  <option value="">Select income range</option>
                  <option value="under-2000">Under $2,000</option>
                  <option value="2000-3000">$2,000 - $3,000</option>
                  <option value="3000-4000">$3,000 - $4,000</option>
                  <option value="4000-5000">$4,000 - $5,000</option>
                  <option value="5000-7500">$5,000 - $7,500</option>
                  <option value="over-7500">Over $7,500</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Any additional information you'd like to share..."
                />
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-3">What happens next?</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start space-x-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>We'll review your information within 24 hours</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>You'll be connected with a qualified credit counsellor</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>Free initial consultation to discuss your options</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>Personalized debt management plan if appropriate</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Back
              </button>
            ) : (
              <div></div>
            )}

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={handleNext}
                className="bg-gradient-to-r from-gray-700 to-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting || formData.debtTypes.length === 0}
                className="bg-gradient-to-r from-gray-700 to-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Get My Referral'}
              </button>
            )}
          </div>
        </form>

        <p className="text-xs text-gray-500 text-center mt-6">
          By submitting this form, you agree to be contacted by a credit counselling professional.
        </p>
      </div>
    </div>
  );
}