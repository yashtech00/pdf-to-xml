
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, FileCode } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-white to-blue-50">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Transform Your <span className="text-brand-blue">PDFs</span> into <span className="text-brand-teal">XML</span> in Seconds
            </h1>
            <p className="text-xl text-gray-700">
              Fast, accurate, and secure PDF to XML conversion for developers, data analysts, and business professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="bg-brand-blue hover:bg-blue-800 text-white px-6 py-6 rounded-md font-medium text-lg flex items-center gap-2">
                Get Started Free
                <ArrowRight size={20} />
              </Button>
              <Button variant="outline" className="border-brand-teal text-brand-teal hover:bg-brand-teal/10 px-6 py-6 rounded-md font-medium text-lg">
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative h-64 md:h-auto">
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <div className="absolute bg-brand-blue/10 w-64 h-64 rounded-full blur-3xl animate-pulse-slow"></div>
              <div className="absolute bg-brand-teal/10 w-64 h-64 rounded-full -translate-x-20 translate-y-10 blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
            </div>
            <div className="relative bg-white p-6 rounded-xl shadow-lg max-w-md mx-auto transform transition-all duration-500 hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FileText className="text-brand-blue" size={24} />
                  <span className="font-medium">invoice.pdf</span>
                </div>
                <ArrowRight className="text-gray-400" size={20} />
                <div className="flex items-center gap-2">
                  <FileCode className="text-brand-teal" size={24} />
                  <span className="font-medium">invoice.xml</span>
                </div>
              </div>
              <div className="h-40 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
                PDF to XML Preview
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
