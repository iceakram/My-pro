import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import SkillPill from "@/components/SkillPill";
import Testimonial from "@/components/Testimonial";
import ContactForm from "@/components/ContactForm";
import projects from "@/data/projects";
import testimonials from "@/data/testimonials";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        {/* Hero */}
        <section
          aria-label="Introduction"
          className="border-b border-slate-200 bg-gradient-to-b from-sky-50 to-white dark:from-slate-900 dark:to-slate-950"
        >
          <div className="container mx-auto py-24">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
                Building reliable, accessible, and fast web experiences.
              </h1>
              <p className="mt-6 text-lg text-slate-700 dark:text-slate-300">
                I’m a senior full‑stack engineer who turns complex problems into elegant, maintainable products.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="inline-flex items-center rounded-md bg-sky-600 px-4 py-2 text-white hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                >
                  View Projects
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center rounded-md border border-slate-300 px-4 py-2 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-900"
                >
                  Contact Me
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <Section id="about" title="About Me">
          <div className="prose dark:prose-invert">
            <p>
              With 10+ years of experience across startups and enterprises, I specialize in modern web
              platforms (React, Next.js, Node.js) with a deep focus on performance, accessibility (WCAG 2.2),
              and clean architecture.
            </p>
            <p>
              I partner with teams to ship products that are robust, scalable, and delightful to use.
            </p>
          </div>
        </Section>

        {/* Projects */}
        <Section id="projects" title="Projects">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <li key={p.slug}>
                <ProjectCard project={p} />
              </li>
            ))}
          </ul>
        </Section>

        {/* Skills */}
        <Section id="skills" title="Skills">
          <div className="flex flex-wrap gap-2">
            {[
              "TypeScript",
              "React",
              "Next.js",
              "Node.js",
              "Edge & Serverless",
              "PostgreSQL",
              "Prisma",
              "AWS / Vercel",
              "CI/CD",
              "Accessibility (WCAG 2.2)",
              "Testing (Jest/Playwright)",
              "Performance & SEO"
            ].map((s) => (
              <SkillPill key={s} label={s} />
            ))}
          </div>
        </Section>

        {/* Testimonials */}
        <Section id="testimonials" title="Testimonials">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {testimonials.map((t, i) => (
              <Testimonial key={i} testimonial={t} />
            ))}
          </div>
        </Section>

        {/* Contact */}
        <Section id="contact" title="Contact">
          <ContactForm />
        </Section>
      </main>
      <Footer />
    </>
  );
}
