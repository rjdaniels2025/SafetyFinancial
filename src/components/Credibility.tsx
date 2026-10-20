import { CheckCircle, Shield, Users, Award, FileCheck, Heart } from 'lucide-react';

export default function Credibility() {
  const benefits = [
    {
      icon: Award,
      text: "Voted one of Canada's most trusted insurance providers",
    },
    {
      icon: FileCheck,
      text: 'Flexible terms and easy-to-understand coverage',
    },
    {
      icon: Heart,
      text: 'No medical or blood test required',
    },
    {
      icon: Shield,
      text: 'Instant decision with no hidden steps',
    },
    {
      icon: Users,
      text: 'Experienced advisors who serve your interests',
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 via-white to-gray-50 overflow-x-hidden">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-br from-green-600 to-green-700 p-3 rounded-2xl shadow-lg">
              <Award className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Canadians for life insurance coverage
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of Canadian families who have secured their financial future with Safety Financial
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-green-700" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700 font-medium leading-relaxed">{benefit.text}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center justify-center space-x-8 px-8 py-4 bg-white rounded-2xl shadow-lg">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">50,000+</div>
              <div className="text-sm text-gray-600 mt-1">Policies Issued</div>
            </div>
            <div className="h-12 w-px bg-gray-200"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">4.9/5</div>
              <div className="text-sm text-gray-600 mt-1">Customer Rating</div>
            </div>
            <div className="h-12 w-px bg-gray-200"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">15+</div>
              <div className="text-sm text-gray-600 mt-1">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
