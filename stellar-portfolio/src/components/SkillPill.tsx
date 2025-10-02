export default function SkillPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-300 px-3 py-1 text-sm dark:border-slate-700">
      {label}
    </span>
  );
}
