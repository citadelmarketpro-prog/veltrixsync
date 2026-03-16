import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const OPEN_ROLES = [
  { title: "Senior Frontend Engineer",      dept: "Engineering",  location: "Remote / Limassol, CY",  type: "Full-time" },
  { title: "Backend Engineer (Node.js)",    dept: "Engineering",  location: "Remote / London, UK",    type: "Full-time" },
  { title: "Product Designer (UI/UX)",      dept: "Design",       location: "Remote",                 type: "Full-time" },
  { title: "Compliance Officer",            dept: "Legal",        location: "Limassol, CY",            type: "Full-time" },
  { title: "Growth Marketing Manager",      dept: "Marketing",    location: "Remote / London, UK",    type: "Full-time" },
  { title: "Customer Support Specialist",   dept: "Support",      location: "Remote",                 type: "Full-time" },
];

const PERKS = [
  { title: "Remote-First Culture",   body: "Work from anywhere. We're a globally distributed team that trusts you to deliver." },
  { title: "Competitive Package",    body: "Market-rate salary, equity participation, and performance bonuses." },
  { title: "Health & Wellness",      body: "Comprehensive health insurance and a monthly wellness allowance." },
  { title: "Learning Budget",        body: "$2,000/year for conferences, courses, and books. We invest in your growth." },
  { title: "Flexible Hours",         body: "We measure output, not hours. Structure your day around how you work best." },
  { title: "Team Retreats",          body: "Annual company retreats where we come together to build, learn, and celebrate." },
];

const DEPT_COLORS: Record<string, string> = {
  Engineering: "bg-[#e8f0fe] text-[#1a4080] dark:bg-[#0e1e40] dark:text-[#7aacf8]",
  Design:      "bg-[#fce8f3] text-[#8a1060] dark:bg-[#2a0e20] dark:text-[#f080c0]",
  Legal:       "bg-[#fef3e2] text-[#7a4a00] dark:bg-[#2a1a00] dark:text-[#f0c060]",
  Marketing:   "bg-[#edf4e5] text-[#3a6020] dark:bg-[#1a3020] dark:text-[#B0D45A]",
  Support:     "bg-[#f3e8fe] text-[#5a1080] dark:bg-[#1e0e30] dark:text-[#c080f0]",
};

export default function CareersPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="w-full bg-white dark:bg-[#0b1c11] border-b border-[#e5e5e5] dark:border-[#1e3827]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-[72px] pt-16 lg:pt-24 pb-14 lg:pb-20">
          <div className="max-w-2xl">
            <p className="text-[12px] font-bold tracking-widest text-[#B0D45A] uppercase mb-4">
              We&apos;re hiring
            </p>
            <h1 className="text-[36px] lg:text-[56px] font-bold leading-[1.08] text-[#001011] dark:text-white">
              Build the future of social trading with us
            </h1>
            <p className="mt-5 text-[14px] lg:text-[15px] leading-[1.8] text-[#555555] dark:text-[#8fa896]">
              VeltrixSync is a fast-growing, globally distributed team passionate about
              making investing accessible to everyone. If you want to work on a product
              used by millions of people worldwide, we&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="w-full bg-[#f7f7f2] dark:bg-[#071612]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-[72px] py-14 lg:py-20">
          <h2 className="text-[24px] lg:text-[32px] font-bold text-[#001011] dark:text-white mb-10">
            Why work at VeltrixSync?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PERKS.map((p, i) => (
              <div key={i} className="rounded-xl border border-[#e5e5e5] dark:border-[#1e3827] bg-white dark:bg-[#0a1a10] p-6 flex flex-col gap-2">
                <h3 className="text-[14px] font-bold text-[#001011] dark:text-white">{p.title}</h3>
                <p className="text-[13px] leading-[1.7] text-[#555555] dark:text-[#8fa896]">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section className="w-full bg-white dark:bg-[#0b1c11] border-t border-[#e5e5e5] dark:border-[#1e3827]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-[72px] py-14 lg:py-20">
          <h2 className="text-[24px] lg:text-[32px] font-bold text-[#001011] dark:text-white mb-10">
            Open positions
          </h2>
          <div className="flex flex-col divide-y divide-[#e5e5e5] dark:divide-[#1e3827] border border-[#e5e5e5] dark:border-[#1e3827] rounded-2xl overflow-hidden">
            {OPEN_ROLES.map((r, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-5 bg-white dark:bg-[#0a1a10] hover:bg-[#fafaf6] dark:hover:bg-[#0c1e12] transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <span className={`self-start text-[10px] font-bold px-2.5 py-1 rounded-full ${DEPT_COLORS[r.dept] ?? "bg-[#eaeadf] text-[#555555]"}`}>
                    {r.dept}
                  </span>
                  <span className="text-[14px] font-semibold text-[#001011] dark:text-white">{r.title}</span>
                </div>
                <div className="flex items-center gap-6 shrink-0">
                  <span className="text-[12px] text-[#666666] dark:text-[#8fa896]">{r.location}</span>
                  <span className="text-[11px] text-[#888888] dark:text-[#5a7060]">{r.type}</span>
                  <button className="text-[12px] font-semibold text-[#B0D45A] hover:underline underline-offset-2">
                    Apply →
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-[13px] text-[#666666] dark:text-[#8fa896]">
            Don&apos;t see a role that fits? Send your CV to{" "}
            <a href="mailto:careers@veltrixsync.com" className="text-[#B0D45A] hover:underline underline-offset-2">
              careers@veltrixsync.com
            </a>{" "}
            and we&apos;ll keep you in mind for future openings.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
