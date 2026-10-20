import { useState, useEffect } from 'react';
import { X, CheckCircle, Clock, ChevronRight, ChevronLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface QuoteFormModalProps {
  onClose: () => void;
}

export default function QuoteFormModal({ onClose }: QuoteFormModalProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [formData, setFormData] = useState({
    insuranceType: '',
    coverageAmount: '',
    term: '',
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    smoker: '',
    message: '',
  });

  const handleOptionSelect = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    setCountdown((prev) => Math.max(0, prev - 15));
    setTimeout(() => {
      setStep(step + 1);
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formAnswers = `Insurance Type: ${formData.insuranceType}
Coverage Amount: ${formData.coverageAmount}
Term: ${formData.term}
Date of Birth: ${formData.dateOfBirth}
Smoker: ${formData.smoker}
Message: ${formData.message || 'N/A'}`;

      const webhookData = {
        form_type: 'insurance_quote',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        form_answers: formAnswers,
        submitted_at: new Date().toISOString(),
      };

      const [dbResult, telegramResult] = await Promise.allSettled([
        supabase.from('insurance_quotes').insert([
          {
            insurance_type: formData.insuranceType,
            coverage_amount: formData.coverageAmount,
            term: formData.term,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            date_of_birth: formData.dateOfBirth,
            smoker: formData.smoker === 'yes',
            message: formData.message,
          },
        ]),
        fetch('/.netlify/functions/telegram', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            formType: 'insurance_quote',
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            service_type: formData.insuranceType,
            coverage_amount: formData.coverageAmount,
            coverage_type: formData.term,
            quote_details: `DOB: ${formData.dateOfBirth}, Smoker: ${formData.smoker}`,
            message: formData.message,
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

      setIsSuccess(true);
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-12 max-w-md w-full text-center animate-scale-in">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Quote Request Received!</h3>
          <p className="text-gray-600">
            Thank you for your interest. A licensed insurance advisor will contact you within 24 hours with your personalized quote and coverage options.
          </p>
        </div>
      </div>
    );
  }

  const totalSteps = 4;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col animate-slide-up">
        <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Get Your Free Quote</h2>
            <div className="flex items-center justify-between mt-1">
              <p className="text-sm text-gray-500">Step {step} of {totalSteps}</p>
              {countdown > 0 && (
                <div className="flex items-center space-x-1 text-orange-600">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs font-medium">{countdown} seconds</span>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 ml-2"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="h-2 bg-gray-100 flex-shrink-0">
          <div
            className="h-full bg-gradient-to-r from-gray-700 to-green-600 transition-all duration-500"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>

        <div className="p-4 sm:p-8 overflow-y-auto flex-1">
          {step === 1 && (
            <div className="animate-fade-in">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
                What type of insurance are you interested in?
              </h3>
              <div className="space-y-3">
                {[
                  { label: 'Term Life Insurance', value: 'term-life' },
                  { label: 'Whole Life Insurance', value: 'whole-life' },
                  { label: 'Universal Life Insurance', value: 'universal-life' },
                  { label: 'Critical Illness Insurance', value: 'critical-illness' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleOptionSelect('insuranceType', option.value)}
                    className="w-full text-left p-4 rounded-xl border-2 border-gray-200 hover:border-green-600 hover:bg-green-50 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 group-hover:text-green-600 font-medium">
                        {option.label}
                      </span>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transform group-hover:translate-x-1 transition-all" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
                What coverage amount are you looking for?
              </h3>
              <div className="space-y-3">
                {[
                  { label: '$100,000 - $250,000', value: '100000-250000' },
                  { label: '$250,000 - $500,000', value: '250000-500000' },
                  { label: '$500,000 - $1,000,000', value: '500000-1000000' },
                  { label: '$1,000,000 - $2,000,000', value: '1000000-2000000' },
                  { label: '$2,000,000 - $5,000,000', value: '2000000-5000000' },
                  { label: 'Over $5,000,000', value: '5000000+' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleOptionSelect('coverageAmount', option.value)}
                    className="w-full text-left p-4 rounded-xl border-2 border-gray-200 hover:border-green-600 hover:bg-green-50 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 group-hover:text-green-600 font-medium">
                        {option.label}
                      </span>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transform group-hover:translate-x-1 transition-all" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
                What coverage term are you considering?
              </h3>
              <div className="space-y-3">
                {[
                  { label: '10 Years', value: '10' },
                  { label: '15 Years', value: '15' },
                  { label: '20 Years', value: '20' },
                  { label: '25 Years', value: '25' },
                  { label: '30 Years', value: '30' },
                  { label: 'Lifetime (Whole Life)', value: 'lifetime' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleOptionSelect('term', option.value)}
                    className="w-full text-left p-4 rounded-xl border-2 border-gray-200 hover:border-green-600 hover:bg-green-50 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 group-hover:text-green-600 font-medium">
                        {option.label}
                      </span>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transform group-hover:translate-x-1 transition-all" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <form onSubmit={handleSubmit} className="animate-fade-in">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
                Almost done! Let's get your contact information
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Are you a smoker? *
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        required
                        value="no"
                        checked={formData.smoker === 'no'}
                        onChange={(e) => setFormData({ ...formData, smoker: e.target.value })}
                        className="mr-2"
                      />
                      <span className="text-gray-700">No</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        required
                        value="yes"
                        checked={formData.smoker === 'yes'}
                        onChange={(e) => setFormData({ ...formData, smoker: e.target.value })}
                        className="mr-2"
                      />
                      <span className="text-gray-700">Yes</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Information (Optional)
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all resize-none"
                    placeholder="Any specific questions or health conditions we should know about?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-gray-700 to-green-600 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? 'Submitting...' : 'Get My Free Quote'}
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center mt-4">
                By submitting, you agree to be contacted by a Safety Financial insurance advisor. Your information is kept confidential and secure.
              </p>
            </form>
          )}
        </div>

        {step > 1 && (
          <div className="p-4 sm:p-6 border-t border-gray-200 flex-shrink-0">
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors font-medium"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scale-in {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}