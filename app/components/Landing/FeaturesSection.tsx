
import React from 'react';
import { CheckCircle, Zap, ShieldCheck, FileSearch } from 'lucide-react';

const featuresList = [
  {
    icon: <Zap className="w-10 h-10 text-brand-blue" />,
    title: 'Lightning Fast',
    description: 'Convert PDFs to properly structured XML in seconds, not minutes or hours.'
  },
  {
    icon: <CheckCircle className="w-10 h-10 text-brand-blue" />,
    title: 'Accurate Conversion',
    description: 'Advanced algorithms ensure your data is correctly extracted and structured.'
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-brand-blue" />,
    title: 'Secure & Private',
    description: 'Your files are encrypted and automatically deleted after processing.'
  },
  {
    icon: <FileSearch className="w-10 h-10 text-brand-blue" />,
    title: 'Smart Parsing',
    description: 'Our system intelligently recognizes tables, forms, and structured content.'
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our PDF to XML Converter?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Designed with precision and performance in mind, our tool makes document conversion simpler than ever.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresList.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
