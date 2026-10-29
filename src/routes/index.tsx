import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { certifications, education, experience, profile, projects, skills } from "@/lib/portfolio";
import { AskPortfolio } from "@/components/AskPortfolio";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUpRight, Menu, X } from "lucide-react";

const TITLE = "Kambala Teja Sri Harsha — Data Analyst Portfolio";
const DESC =
  "Entry-level Data Analyst in Bangalore skilled in Python, SQL, machine learning, statistical analysis and dashboard/GIS visualization.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const nav = [
  ["About", "about"],
  ["Skills", "skills"],
  ["Projects", "projects"],
  ["Experience", "experience"],
  ["Education", "education"],
  ["Ask", "ask"],
  ["Contact", "contact"],
] as const;

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-24 border-t border-border px-5 py-16 md:py-20">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-semibold md:text-4xl">{title}</h2>
      <div className="mt-10">{children}</div>
    </section>
  );
}

function Index() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    // Stop the browser from restoring the old scroll position on reload.
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (!window.location.hash) window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen">
      <header className="absolute inset-x-0 top-0 z-40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-7">
          <a href="#top" className="font-display text-base font-bold uppercase md:text-lg">
            <span>{profile.name}<span className="text-primary">.</span></span>
          </a>
          <nav aria-label="Main" className="hidden gap-6 md:flex">
            {nav.map(([l, id]) => (
              <a
                key={id}
                href={`#${id}`}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l}
              </a>
            ))}
          </nav>
          <Button
            variant="ghost" size="icon"
            className="md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mnav"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
        {open && (
          <nav
            id="mnav"
            aria-label="Mobile"
            className="flex flex-col border-t border-border bg-background px-5 py-3 md:hidden"
          >
            {nav.map(([l, id]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className="py-2 text-muted-foreground hover:text-foreground"
              >
                {l}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main id="top">
        <section className="portfolio-hero">
          <img
            src="/profile.png"
            alt={`${profile.name}, ${profile.role}`}
            className="hero-photo"
          />
          <div className="hero-shade" />
          <div className="mx-auto flex h-full min-h-[680px] max-w-6xl flex-col justify-center px-5 pb-20 pt-32 md:pt-24">
            <div className="animate-rise max-w-[820px]">
              <p className="mb-7 flex items-center gap-4 text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground"><span className="h-px w-9 bg-primary" /> Portfolio</p>
              <h1 className="hero-name uppercase">
                {profile.name.split(" ").slice(0, 2).join(" ")}
                <br />
                {profile.name.split(" ").slice(2).join(" ")}
                <span className="text-primary">.</span>
              </h1>
              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.25em] md:text-base">{profile.role}</p>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">I turn raw data into actionable insights — with Python, SQL and machine learning.</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button asChild size="lg" className="h-12 rounded-none text-xs uppercase tracking-[0.1em]"><a href="#projects">View the work <ArrowDown /></a></Button>
                <Button asChild size="lg" variant="outline" className="h-12 rounded-none bg-transparent text-xs uppercase tracking-[0.1em]"><a href="#contact">Get in touch <ArrowUpRight /></a></Button>
                {profile.resumeUrl && <Button asChild variant="outline" size="lg" className="h-12 rounded-none bg-transparent"><a href={profile.resumeUrl} download>Download résumé</a></Button>}
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-8 mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              <p>{profile.location} · Open to opportunities</p>
              <a href="#about" className="flex items-center gap-2">Scroll <ArrowDown className="size-3" /></a>
            </div>
          </div>
        </section>

        <Section id="about" eyebrow="About" title="Data analyst, end to end">
          <div className="grid gap-8 md:grid-cols-3">
            <p className="text-lg leading-relaxed text-muted-foreground md:col-span-2">
              I'm an entry-level Data Analyst with hands-on experience in Python, SQL, machine
              learning, data cleaning, statistical analysis, predictive modeling, and dashboard and
              GIS visualization. I enjoy taking messy, raw data through cleaning, exploration and
              modeling to deliver clear insights that support decisions.
            </p>
            <dl className="grid gap-4 border-l border-border pl-6 text-sm">
              <div>
                <dt className="text-muted-foreground">Based in</dt>
                <dd className="font-medium">{profile.location}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Degree</dt>
                <dd className="font-medium">B.E. Computer Science · CGPA 8.61</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Focus</dt>
                <dd className="font-medium">Analytics · ML · GIS</dd>
              </div>
            </dl>
          </div>
        </Section>

        <Section id="skills" eyebrow="Skills" title="Toolkit">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((g) => (
              <div key={g.title} className="glass rounded-md p-6">
                <h3 className="font-semibold">{g.title}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <li
                      key={s}
                      className="rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section id="projects" eyebrow="Projects" title="Featured work">
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((p, i) => (
              <Link
                key={p.slug}
                to="/projects/$slug"
                params={{ slug: p.slug }}
                className="group glass relative overflow-hidden rounded-md p-7 transition-all hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="bg-gradient-brand absolute inset-x-0 top-0 h-1" />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="text-primary">{p.tag}</span>
                  <span className="font-display text-3xl font-bold text-muted-foreground/70">0{i + 1}</span>
                </div>
                <h3 className="mt-4 text-2xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.period}</p>
                <p className="mt-4 text-muted-foreground">{p.summary}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <li key={s} className="rounded-md border border-border px-2 py-0.5 text-xs">
                      {s}
                    </li>
                  ))}
                </ul>
                <span className="mt-6 inline-block text-sm font-medium text-primary">
                  Read case study →
                </span>
              </Link>
            ))}
          </div>
        </Section>

        <Section id="experience" eyebrow="Experience" title="Internships & programs">
          <ol className="relative border-l border-border pl-8">
            {experience.map((e) => (
              <li key={e.title} className="relative pb-10 last:pb-0">
                <span className="bg-gradient-brand absolute -left-[39px] top-1.5 h-3.5 w-3.5 rounded-full ring-4 ring-background" />
                <span className="rounded-full border border-accent/50 px-2.5 py-0.5 text-xs text-accent">
                  {e.type}
                </span>
                <h3 className="mt-2 text-xl font-semibold">{e.title}</h3>
                <p className="text-muted-foreground">{e.org}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="education" eyebrow="Education & certifications" title="Learning">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              {education.map((e) => (
                <div key={e.degree} className="glass rounded-md p-6">
                  <p className="text-sm text-primary">{e.years}</p>
                  <h3 className="mt-1 text-lg font-semibold">{e.degree}</h3>
                  <p className="text-muted-foreground">{e.school}</p>
                  {e.extra && <p className="mt-2 text-sm font-medium">{e.extra}</p>}
                </div>
              ))}
            </div>
            <ul className="glass divide-y divide-border rounded-md px-6">
              {certifications.map((c) => (
                <li key={c.name} className="py-4">
                  <p className="font-medium">{c.name}</p>
                  <p className="text-sm text-muted-foreground">{c.issuer}</p>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <Section id="ask" eyebrow="Ask" title="Ask about my work">
          <AskPortfolio />
        </Section>

        <Section id="contact" eyebrow="Contact" title="Let's work together">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <ContactItem label="Email" value={profile.email} href={`mailto:${profile.email}`} />
            <ContactItem
              label="Phone"
              value={profile.phone}
              href={`tel:${profile.phone.replace(/\s/g, "")}`}
            />
            <ContactItem
              label="LinkedIn"
              value="harsha-tej-48b134264"
              href={profile.linkedin}
              external
            />
            <ContactItem label="GitHub" value={profile.github} href={profile.github} external />
          </div>
        </Section>
      </main>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} {profile.name}
      </footer>
    </div>
  );
}

function ContactItem({
  label,
  value,
  href,
  external,
}: {
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group rounded-lg p-2 -m-2 hover:bg-secondary"
    >
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 break-all font-medium group-hover:text-primary">{value}</p>
    </a>
  );
}
