"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Who is eligible to apply for a loan?",
    a: "You need to be between 23 and 50 years old, earn at least ₹25,000 per month, hold a valid PAN, and be salaried or self-employed. Applications from unemployed applicants aren't accepted.",
  },
  {
    q: "How is my eligibility checked?",
    a: "Every application runs through our automated Business Rule Engine the moment you submit your details. It checks age, income, PAN validity, and employment status, and gives you an instant decision — no waiting on manual review.",
  },
  {
    q: "What documents do I need to upload?",
    a: "Just your latest salary slip, in PDF, JPG, or PNG format, under 5 MB. We use it to verify income against what you've declared in your application.",
  },
  {
    q: "How is interest calculated on my loan?",
    a: "We use simple interest at a fixed rate of 12% per annum, calculated on your loan amount and tenure. The calculator on the application page updates your total repayment live as you adjust the amount and tenure sliders.",
  },
  {
    q: "What loan amounts and tenures are available?",
    a: "You can borrow between ₹50,000 and ₹5,00,000, with a repayment tenure of 30 to 365 days. Choose what fits your need — the repayment breakdown updates instantly as you move the sliders.",
  },
  {
    q: "What happens after I apply?",
    a: "Your application moves through our internal pipeline — sanction review, disbursement, and finally repayment tracking. You can follow its status at every stage from your dashboard.",
  },
  {
    q: "How do I make repayments?",
    a: "Repayments are recorded against your loan with a unique transaction reference. Once your total payments equal your total repayment amount, your loan is automatically marked closed.",
  },
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="pt-10 md:pt-16">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-lg md:text-xl font-semibold tracking-[0.2em] text-[#E8A33D] uppercase mb-3">
            FAQs
          </p>
          <h2 className="text-2xl md:text-4xl font-extrabold text-[#0F2C4C]">
            Questions, answered
          </h2>
          <p className="text-sm md:text-base text-slate-500 mt-3">
            Everything you need to know before you apply.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.q}
                className={`border rounded-2xl overflow-hidden transition-colors duration-200 ${
                  isOpen
                    ? "border-[#0F2C4C]/20 bg-slate-50"
                    : "border-slate-200 bg-white"
                }`}
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 md:px-6 md:py-5 text-left cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm md:text-base font-semibold text-[#0F2C4C]">
                    {item.q}
                  </span>
                  <span
                    className={`flex items-center justify-center w-7 h-7 rounded-full bg-[#E8A33D]/15 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 1V11M1 6H11" stroke="#0F2C4C" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-200 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-4 md:px-6 md:pb-5 text-sm text-slate-500 leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
    </section>
  );
}