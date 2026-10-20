import { useState } from 'react';
import { X, ChevronRight, CheckCircle, ChevronLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface LeadCaptureModalProps {
  onClose: () => void;
  preSelectedService?: string;
}

export default function LeadCaptureModal({ onClose, preSelectedService }: LeadCaptureModalProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    interest: preSelectedService || '',
    timeline: '',
    currentCoverage: '',
    budget: '',
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const getQuestionsForService = (service: string) => {
    switch (service) {
      case 'Tax Solutions':
        return {
          step2: {
            title: 'What best describes your tax situation?',
            options: ['I want to pay less tax going forward', 'I owe back taxes', 'I have unfiled returns', 'I need help with business taxes', 'Not sure'],
            field: 'timeline',
          },
          step3: {
            title: 'How do you earn most of your income?',
            options: ['Employee (T4 / W-2)', 'Self-employed / contractor', 'Business owner (incorporated)', 'Mix of the above'],
            field: 'currentCoverage',
          },
          step4: {
            title: 'Roughly how much do you owe or pay in taxes each year?',
            options: ['Under $5,000', '$5,000 – $20,000', '$20,000 – $50,000', 'Over $50,000', 'Not sure'],
            field: 'budget',
          },
        };
      case 'Debt Solutions':
        return {
          step2: {
            title: 'What is your approximate total debt?',
            options: ['Under $10,000', '$10,000 – $25,000', '$25,000 – $50,000', '$50,000 – $100,000', 'Over $100,000'],
            field: 'timeline',
          },
          step3: {
            title: 'What types of debt do you have?',
            options: ['Credit cards', 'Loans / lines of credit', 'Tax debt', 'Business debt', 'A mix of several'],
            field: 'currentCoverage',
          },
          step4: {
            title: 'How are you keeping up with payments?',
            options: ['On time but struggling', 'Missing some payments', 'In collections', 'Only paying minimums'],
            field: 'budget',
          },
        };
      case 'Credit Building':
        return {
          step2: {
            title: 'What is your current credit score range?',
            options: ['Below 550', '550 – 619', '620 – 679', '680 – 739', 'Not sure'],
            field: 'timeline',
          },
          step3: {
            title: 'What is affecting your credit?',
            options: ['Collections / charge-offs', 'Late payments', 'High balances', 'Errors on my report', 'Limited credit history'],
            field: 'currentCoverage',
          },
          step4: {
            title: 'What is your main credit goal?',
            options: ['Buy a home', 'Vehicle or personal financing', 'Business funding', 'Lower my interest rates', 'General improvement'],
            field: 'budget',
          },
        };
      case 'Business Growth & Funding':
        return {
          step2: {
            title: 'How long has your business been operating?',
            options: ['Not started yet', 'Under 1 year', '1 – 3 years', '3+ years'],
            field: 'timeline',
          },
          step3: {
            title: 'What is your approximate monthly revenue?',
            options: ['Pre-revenue', 'Under $10,000', '$10,000 – $50,000', '$50,000 – $150,000', 'Over $150,000'],
            field: 'currentCoverage',
          },
          step4: {
            title: 'How much funding are you looking for?',
            options: ['Under $25,000', '$25,000 – $100,000', '$100,000 – $250,000', '$250,000+', 'Not sure yet'],
            field: 'budget',
          },
        };
      default:
        return {
          step2: {
            title: 'Are you looking for help personally or for a business?',
            options: ['Personal', 'Business', 'Both'],
            field: 'timeline',
          },
          step3: {
            title: 'What is your biggest financial challenge right now?',
            options: ['Paying too much tax', 'Too much debt', 'Low credit score', 'Need funding to grow', 'All of the above'],
            field: 'currentCoverage',
          },
          step4: {
            title: 'When would you like to get started?',
            options: ['Immediately', 'Within 1 month', 'Within 3 months', 'Just exploring options'],
            field: 'budget',
          },
        };
    }
  };

  const questions = getQuestionsForService(formData.interest);

  const handleOptionSelect = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    setTimeout(() => {
      setStep(step + 1);
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formAnswers = `Interest: ${formData.interest || 'General'}
${questions.step2.title} ${formData.timeline}
${questions.step3.title} ${formData.currentCoverage}
${questions.step4.title} ${formData.budget}`;

      // Send to both Supabase and Telegram
      const [dbResult, telegramResult] = await Promise.allSettled([
        supabase?.from('leads').insert([
          {
            interest: formData.interest,
            timeline: formData.timeline,
            current_coverage: formData.currentCoverage,
            budget: formData.budget,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
          },
        ]),
        fetch('/api/telegram', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            formType: 'lead_capture',
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            interest: formData.interest,
            timeline: formData.timeline,
            current_coverage: formData.currentCoverage,
            budget: formData.budget,
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

      if (dbResult.status === 'rejected' || (dbResult.status === 'fulfilled' && dbResult.value?.error)) {
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
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-emerald-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h3>
          <p className="text-gray-600">
            We've received your information and a We Win strategist will contact you within one business day.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col animate-slide-up">
        <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">Free Strategy Call</h2>
            <p className="text-sm text-gray-500 mt-1">Step {step} of {preSelectedService ? 4 : 5}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 ml-2"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {step === 1 && !preSelectedService && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">What are you interested in?</h3>
                <p className="text-sm text-gray-500 mb-6">Select the service that best matches your needs</p>
              </div>
              <div className="grid gap-3">
                {['Tax Solutions', 'Debt Solutions', 'Credit Building', 'Business Growth & Funding', 'Not sure — full financial review'].map((service) => (
                  <button
                    key={service}
                    onClick={() => handleOptionSelect('interest', service)}
                    className="group w-full p-4 text-left border-2 border-gray-200 rounded-2xl hover:border-emerald-600 hover:bg-emerald-50 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900 group-hover:text-emerald-600">
                        {service}
                      </span>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {((step === 2 && !preSelectedService) || (step === 1 && preSelectedService)) && (
            <div className="space-y-4">
              <div>
                <button
                  onClick={() => setStep(step - 1)}
                  className="flex items-center text-gray-600 hover:text-gray-900 mb-4 text-sm"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back
                </button>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
                  {questions.step2.title}
                </h3>
                <p className="text-sm text-gray-500 mb-6">This helps us tailor our recommendations</p>
              </div>
              <div className="grid gap-3">
                {questions.step2.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect(questions.step2.field, option)}
                    className="group w-full p-4 text-left border-2 border-gray-200 rounded-2xl hover:border-emerald-600 hover:bg-emerald-50 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900 group-hover:text-emerald-600">
                        {option}
                      </span>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {((step === 3 && !preSelectedService) || (step === 2 && preSelectedService)) && (
            <div className="space-y-4">
              <div>
                <button
                  onClick={() => setStep(step - 1)}
                  className="flex items-center text-gray-600 hover:text-gray-900 mb-4 text-sm"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back
                </button>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
                  {questions.step3.title}
                </h3>
                <p className="text-sm text-gray-500 mb-6">Understanding your current situation</p>
              </div>
              <div className="grid gap-3">
                {questions.step3.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect(questions.step3.field, option)}
                    className="group w-full p-4 text-left border-2 border-gray-200 rounded-2xl hover:border-emerald-600 hover:bg-emerald-50 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900 group-hover:text-emerald-600">
                        {option}
                      </span>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {((step === 4 && !preSelectedService) || (step === 3 && preSelectedService)) && (
            <div className="space-y-4">
              <div>
                <button
                  onClick={() => setStep(step - 1)}
                  className="flex items-center text-gray-600 hover:text-gray-900 mb-4 text-sm"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back
                </button>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
                  {questions.step4.title}
                </h3>
                <p className="text-sm text-gray-500 mb-6">Final question before your contact details</p>
              </div>
              <div className="grid gap-3">
                {questions.step4.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect(questions.step4.field, option)}
                    className="group w-full p-4 text-left border-2 border-gray-200 rounded-2xl hover:border-emerald-600 hover:bg-emerald-50 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900 group-hover:text-emerald-600">
                        {option}
                      </span>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {((step === 5 && !preSelectedService) || (step === 4 && preSelectedService)) && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <button
                  onClick={() => setStep(step - 1)}
                  className="flex items-center text-gray-600 hover:text-gray-900 mb-4 text-sm"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back
                </button>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
                  Almost there! How can we reach you?
                </h3>
                <p className="text-sm text-gray-500 mb-6">We'll use this to send your personalized recommendations</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Information (Optional)
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                    placeholder="Any specific questions or requirements?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-4 rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? 'Submitting...' : 'Book My Free Strategy Call'}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  By submitting, you agree to receive educational information about our services. No obligation to purchase.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}