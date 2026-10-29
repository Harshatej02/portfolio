import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { profile, projects } from "@/lib/portfolio";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const t = loaderData ? `${loaderData.project.title} — ${profile.name}` : "Project";
    const d = loaderData?.project.summary ?? "Data analysis project";
    return {
      meta: [
        { title: t },
        { name: "description", content: d },
        { property: "og:title", content: t },
        { property: "og:description", content: d },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProjectPage,
});

function ProjectPage() {
  const { project: p } = Route.useLoaderData();
  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <Link to="/" hash="projects" className="text-sm text-muted-foreground hover:text-foreground">← Back to projects</Link>
      <article className="animate-rise mt-8">
        <p className="text-sm uppercase tracking-[0.2em] text-primary">{p.tag}</p>
        <h1 className="mt-3 text-4xl font-bold md:text-5xl">{p.title}</h1>
        <p className="mt-3 text-muted-foreground">{p.period}</p>
        <div className="bg-gradient-brand mt-8 h-1 w-24 rounded-full" />
        <p className="mt-8 text-lg text-muted-foreground">{p.summary}</p>
        <h2 className="mt-10 text-2xl font-semibold">Highlights</h2>
        <ul className="mt-4 space-y-3">
          {p.highlights.map((h) => (
            <li key={h} className="glass rounded-lg p-4">{h}</li>
          ))}
        </ul>
        <h2 className="mt-10 text-2xl font-semibold">Tools</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {p.stack.map((s) => <li key={s} className="rounded-full bg-secondary px-3 py-1 text-sm">{s}</li>)}
        </ul>
        {p.team && <p className="mt-8 text-sm text-muted-foreground">{p.team}</p>}
        {p.documents && p.documents.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold">Documents</h2>
            <div className="mt-3 flex flex-wrap gap-3">
              {p.documents.map((d) => (
                <a key={d.url} href={d.url} download={d.filename} className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-secondary">
                  Download {d.label} (PDF)
                </a>
              ))}
            </div>
          </div>
        )}
        {p.note && <p className="mt-10 rounded-lg border border-accent/40 p-4 text-sm text-muted-foreground">{p.note}</p>}
        {p.repo && (
          <a href={p.repo} target="_blank" rel="noopener noreferrer" className="bg-gradient-brand mt-8 inline-block rounded-lg px-5 py-3 font-medium text-primary-foreground">View repository</a>
        )}
      </article>
    </main>
  );
}
