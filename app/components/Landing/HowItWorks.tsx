
import React from 'react';
import { Upload, Cog, Download, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: <Upload className="w-12 h-12 text-white" />,
    title: 'Upload Your PDF',
    description: 'Simply drag & drop your PDF file or click to browse and select.'
  },
  {
    icon: <Cog className="w-12 h-12 text-white" />,
    title: 'Automatic Processing',
    description: 'Our system analyzes and extracts data from your PDF document.'
  },
  {
    icon: <Download className="w-12 h-12 text-white" />,
    title: 'Download XML',
    description: 'Get your perfectly structured XML file ready for use in your systems.'
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Three simple steps to convert your PDF documents to XML format
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 relative">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center text-center group w-full md:w-1/3">
                <div className="bg-gradient-to-r from-brand-blue to-brand-teal rounded-full p-6 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 max-w-xs">
                  {step.description}
                </p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block text-gray-300">
                  <ArrowRight className="w-8 h-8" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
