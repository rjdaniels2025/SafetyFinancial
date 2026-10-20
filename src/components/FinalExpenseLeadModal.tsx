import { useState } from 'react';
import { X, Heart, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface FinalExpenseLeadModalProps {
  onClose: () => void;
}

export default function FinalExpenseLeadModal({ onClose }: FinalExpenseLeadModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    coverageAmount: '',
    healthConditions: '',
    currentInsurance: '',
    smoker: '',
    howSoon: '',
  });

  const totalSteps = 3;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
      const formAnswers = `Age: ${formData.age}
Coverage Amount: ${formData.coverageAmount}
Health Conditions: ${formData.healthConditions}
Current Insurance: ${formData.currentInsurance}
Smoker: ${formData.smoker}
How Soon: ${formData.howSoon}`;

      const webhookData = {
        form_type: 'final_expense',
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        form_answers: formAnswers,
        submitted_at: new Date().toISOString(),
      };

      const [dbResult, telegramResult] = await Promise.allSettled([
        supabase.from('final_expense_leads').insert([
          {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            age: parseInt(formData.age),
            coverage_amount: formData.coverageAmount,
            health_conditions: formData.healthConditions,
            current_insurance: formData.currentInsurance,
            smoker: formData.smoker,
            how_soon: formData.howSoon,
          },
        ]),
        fetch('/.netlify/functions/telegram', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            formType: 'final_expense',
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            phone: formData.phone,
            age: formData.age,
            coverage_amount: formData.coverageAmount,
            health_conditions: formData.healthConditions,
            current_insurance: formData.currentInsurance,
            smoker: formData.smoker,
            how_soon: formData.howSoon,
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
            We've received your information and will contact you shortly with your personalized final expense insurance options.
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
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Final Expense Quote</h2>
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
            {[1, 2, 3].map((step) => (
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
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Smith"
                  />
                </div>
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Age *
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  required
                  min="50"
                  max="85"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="65"
                />
                <p className="text-xs text-gray-500 mt-1">Ages 50-85 qualify for coverage</p>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Coverage Details</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Desired Coverage Amount *
                </label>
                <select
                  name="coverageAmount"
                  value={formData.coverageAmount}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                >
                  <option value="">Select coverage amount</option>
                  <option value="5000">$5,000</option>
                  <option value="10000">$10,000</option>
                  <option value="15000">$15,000</option>
                  <option value="20000">$20,000</option>
                  <option value="25000">$25,000</option>
                  <option value="30000">$30,000</option>
                  <option value="40000">$40,000</option>
                  <option value="50000">$50,000</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Do you currently have life insurance? *
                </label>
                <select
                  name="currentInsurance"
                  value={formData.currentInsurance}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                >
                  <option value="">Select an option</option>
                  <option value="yes">Yes, I have coverage</option>
                  <option value="no">No, I don't have coverage</option>
                  <option value="unsure">I'm not sure</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Are you a smoker? *
                </label>
                <select
                  name="smoker"
                  value={formData.smoker}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                >
                  <option value="">Select an option</option>
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                  <option value="former">Former smoker (quit 1+ years ago)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  When do you want coverage to start? *
                </label>
                <select
                  name="howSoon"
                  value={formData.howSoon}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                >
                  <option value="">Select timeframe</option>
                  <option value="immediately">Immediately</option>
                  <option value="within-week">Within a week</option>
                  <option value="within-month">Within a month</option>
                  <option value="just-browsing">Just browsing</option>
                </select>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Health Information</h3>

              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-green-800">
                  <strong>Note:</strong> Final expense insurance typically doesn't require a medical exam.
                  This information helps us provide the most accurate quote.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Do you have any of the following health conditions? (Optional)
                </label>
                <textarea
                  name="healthConditions"
                  value={formData.healthConditions}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Examples: diabetes, heart disease, cancer, etc. (Optional)"
                />
                <p className="text-xs text-gray-500 mt-2">
                  This information is optional and helps us prepare your quote. Most conditions don't prevent coverage.
                </p>
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
                    <span>Get personalized quotes from top-rated insurers</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>No medical exam required for approval</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>Coverage can start as soon as today</span>
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
                disabled={isSubmitting}
                className="bg-gradient-to-r from-gray-700 to-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Get My Quote'}
              </button>
            )}
          </div>
        </form>

        <p className="text-xs text-gray-500 text-center mt-6">
          By submitting this form, you agree to be contacted about final expense insurance options.
        </p>
      </div>
    </div>
  );
}