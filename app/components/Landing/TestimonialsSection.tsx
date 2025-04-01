
import React from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "This PDF to XML converter has saved our team countless hours of manual data entry. It's fast, accurate, and incredibly easy to use.",
    author: "Sarah Johnson",
    position: "Data Analyst, TechCorp"
  },
  {
    quote: "The accuracy of the conversion is impressive. We process hundreds of invoices daily, and this tool has streamlined our entire workflow.",
    author: "Michael Chen",
    position: "Operations Manager, InvoicePro"
  },
  {
    quote: "As a developer, I appreciate how well-structured the XML output is. It integrates perfectly with our existing systems without any cleanup.",
    author: "David Rodriguez",
    position: "Senior Developer, DataFlow"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Professionals
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See what our users are saying about our PDF to XML conversion tool
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-gray-50 p-8 rounded-xl border border-gray-100 shadow-sm relative"
            >
              <Quote className="w-10 h-10 text-brand-blue/20 absolute top-4 right-4" />
              <p className="text-gray-700 mb-6 relative z-10">
                "{testimonial.quote}"
              </p>
              <div>
                <p className="font-semibold text-gray-900">{testimonial.author}</p>
                <p className="text-gray-500 text-sm">{testimonial.position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
