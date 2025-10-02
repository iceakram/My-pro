import Image from "next/image";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="relative aspect-[16/9] w-full">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
          priority={false}
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm text-slate-600 dark:text-slate-400">{project.description}</p>
        <ul className="mt-3 flex flex-wrap gap-2" aria-label="Technologies used">
          {project.tags.map((t) => (
            <li key={t} className="rounded-full border border-slate-200 px-2 py-0.5 text-xs dark:border-slate-700">
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex gap-3">
          {project.links.demo && (
            <a
              href={project.links.demo}
              className="rounded-md bg-sky-600 px-3 py-1.5 text-sm text-white hover:bg-sky-700"
              target="_blank" rel="noopener noreferrer"
            >
              Live Demo
            </a>
          )}
          {project.links.repo && (
            <a
              href={project.links.repo}
              className="rounded-md border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
              target="_blank" rel="noopener noreferrer"
            >
              Source Code
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
