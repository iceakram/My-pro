export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 py-10 dark:border-slate-800">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          © {new Date().getFullYear()} Your Name. All rights reserved.
        </p>
        <nav aria-label="Footer">
          <ul className="flex items-center gap-4 text-sm">
            <li><a href="#projects" className="hover:underline">Projects</a></li>
            <li><a href="#contact" className="hover:underline">Contact</a></li>
            <li><a href="/sitemap.xml" className="hover:underline">Sitemap</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
