import { CONSENT_NOTICE_GENERAL, CONSENT_NOTICE_NO_LIMITS } from "@/data/legal";

export function ConsentNotice({ variant = "general" }: { variant?: "general" | "no-limits" }) {
  const text = variant === "no-limits" ? CONSENT_NOTICE_NO_LIMITS : CONSENT_NOTICE_GENERAL;

  return (
    <div className="glass-panel rounded-2xl border-l-2 border-l-ember px-6 py-5">
      <p className="font-sans text-sm leading-relaxed text-smoke">{text}</p>
    </div>
  );
}
