type TestimonialT = {
  name: string;
  role: string;
  quote: string;
};

export default function Testimonial({ testimonial }: { testimonial: TestimonialT }) {
  return (
    <blockquote className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <p className="text-slate-800 dark:text-slate-100">“{testimonial.quote}”</p>
      <footer className="mt-4 text-sm text-slate-600 dark:text-slate-400">
        — {testimonial.name}, {testimonial.role}
      </footer>
    </blockquote>
  );
}
