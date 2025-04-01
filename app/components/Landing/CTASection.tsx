
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-brand-blue to-brand-teal">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Convert Your PDF Documents?
        </h2>
        <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
          Join thousands of users who save time and reduce errors by using our PDF to XML conversion tool.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button className="bg-white text-brand-blue hover:bg-gray-100 px-8 py-6 rounded-md font-medium text-lg">
            Start Converting Now
          </Button>
          <Button variant="outline" className="border-white text-white hover:bg-white/20 px-8 py-6 rounded-md font-medium text-lg flex items-center gap-2">
            See Pricing
            <ArrowRight size={20} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
