"use client";

import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "How do I book a cab with HighwayCab?",
    answer: "Booking a cab is simple! Just enter your pickup location, destination, date, and time on our homepage. Select your preferred car type and click 'Search Cabs'. Choose from available options and confirm your booking."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept multiple payment methods including cash, credit/debit cards, UPI, and digital wallets. You can pay online during booking or choose to pay the driver directly."
  },
  {
    question: "Are your drivers verified and experienced?",
    answer: "Yes, all our drivers go through thorough background checks, verification processes, and regular training. They are experienced professionals who know the routes well."
  },
  {
    question: "Can I modify or cancel my booking?",
    answer: "Yes, you can modify your booking details up to 2 hours before the scheduled pickup time. Cancellations are free if made at least 4 hours before the pickup time."
  },
  {
    question: "What safety measures do you follow?",
    answer: "We prioritize passenger safety with GPS tracking, 24/7 customer support, emergency assistance button in our app, and regular vehicle maintenance checks."
  },
  {
    question: "Do you provide intercity services?",
    answer: "Yes, HighwayCab specializes in intercity travel. We provide comfortable and reliable cab services between major cities with professional drivers."
  }
];

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="border border-gray-200 rounded-lg mb-3">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
      >
        <h3 className="font-poppins font-medium text-navy-blue pr-4">
          {question}
        </h3>
        <div className="text-golden-yellow">
          {isOpen ? <FaChevronUp className="w-4 h-4" /> : <FaChevronDown className="w-4 h-4" />}
        </div>
      </button>
      {isOpen && (
        <div className="px-4 pb-4">
          <p className="text-gray-600 leading-relaxed">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 lg:py-24 bg-light-gray">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-poppins font-bold text-navy-blue mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our cab booking services.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Still have questions? We're here to help!
          </p>
          <button className="bg-golden-yellow text-navy-blue font-poppins font-semibold px-8 py-3 rounded-lg hover:bg-yellow-400 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
}