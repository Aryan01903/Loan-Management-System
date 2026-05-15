
export default function AboutUs() {
    return (
        <>
            <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-200 text-zinc-600">
                <h2 className="text-xl font-semibold text-zinc-700 mb-4">
                    🏢 About CredAxis
                </h2>

                <p className="text-sm md:text-base leading-relaxed">
                    CredAxis is a modern Loan Management System designed to simplify
                    the complete lifecycle of loans — from application to closure.
                    It enables borrowers to apply for loans, while internal teams like
                    sales, sanction, disbursement, and collection manage approvals,
                    disbursement, and repayments efficiently.
                </p>

                <div className="mt-4 text-sm text-zinc-500 space-y-2">
                    <p>✔ Easy Loan Application</p>
                    <p>✔ Role-Based Workflow System</p>
                    <p>✔ Real-time Payment Tracking</p>
                    <p>✔ Secure & Scalable Architecture</p>
                </div>
            </div>
        </>
    )
}
