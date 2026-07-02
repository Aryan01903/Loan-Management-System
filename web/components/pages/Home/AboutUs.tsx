export default function AboutUs() {
  return (
    <div className="bg-white shadow-[0_2px_20px_-4px_rgba(15,23,42,0.08)] rounded-2xl p-6 md:p-8 border border-slate-200">
      <div className="flex items-center gap-3 mb-4">
        <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#0F2C4C] text-[#E8A33D] font-black text-sm leading-none shrink-0">
          C
        </span>
        <h2 className="text-lg md:text-xl font-bold text-[#0F2C4C]">
          About CredAxis
        </h2>
      </div>

      <p className="text-sm md:text-base leading-relaxed text-slate-600">
        CredAxis is a modern Loan Management System designed to simplify
        the complete lifecycle of loans — from application to closure.
        It enables borrowers to apply for loans, while internal teams like
        sales, sanction, disbursement, and collection manage approvals,
        disbursement, and repayments efficiently.
      </p>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          "Easy loan application",
          "Role-based workflow system",
          "Real-time payment tracking",
          "Secure & scalable architecture",
        ].map((item) => (
          <div key={item} className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#E8A33D]/15 shrink-0">
              <svg
                width="11"
                height="11"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 3L4.5 8.5L2 6"
                  stroke="#0F2C4C"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="text-sm text-slate-600 font-medium">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}