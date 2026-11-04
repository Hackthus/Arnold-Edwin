"use client";

import { useState, useEffect, useRef } from "react";
import type { ReactElement, FormEvent, ChangeEvent } from "react";
import { motion, MotionConfig, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import {
  Shield, GitBranch, Link as LinkIcon, Terminal, ArrowRight, ExternalLink, Mail,
  Phone, Menu, X, ChevronDown, CheckCircle, Circle, Download, BadgeCheck, Copy,
} from "lucide-react";

import {
  CONTACT, CV_URL, CV_FILENAME, PHOTO_URL, NAV_LINKS, ABOUT_FACTS, ATOUTS, OFFER, PROFILES, SKILLS, PROJECTS,
  EXPERIENCE, EDUCATION, CERTS, STATS, TERMINAL_LINES, FILTERS, OFFENSIVE_CATEGORY, AUTODIDACTE,
} from "@/lib/data";

import type { Cert, ExperienceItem, Profile, Project, Stat } from "@/lib/data";

// Anneau de focus clavier partagé (accessibilité)
const FOCUS = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400";
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "xnjrrjag";

// ─── Petits composants utilitaires ───────────────────────────────────────────

function SectionTitle({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }): ReactElement {
  return (
    <div className="text-center mb-14">
      <p className="text-cyan-400 uppercase tracking-[0.3em] text-xs font-mono mb-4">{eyebrow}</p>
      <h2 className="text-4xl md:text-5xl font-black">{title}</h2>
      {sub && <p className="text-gray-400 mt-4 max-w-xl mx-auto text-sm">{sub}</p>}
    </div>
  );
}

function ScrollProgress(): ReactElement {
  const [progress, setProgress] = useState<number>(0);
  useEffect(() => {
    const onScroll = (): void => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[2px]" aria-hidden="true">
      <div className="h-full bg-cyan-400" style={{ width: `${progress}%` }} />
    </div>
  );
}

function Counter({ value, label }: Stat): ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [count, setCount] = useState<string>("0");

  useEffect(() => {
    if (!inView) return;
    // "Top1%" → préfixe "Top", nombre 1, suffixe "%"   |   "228+" → "", 228, "+"
    const match = value.match(/^(\D*)(\d+)(\D*)$/);
    if (!match || reduce) { setCount(value); return; }
    const [, prefix, digits, suffix] = match;
    const num = parseInt(digits, 10);
    const step = Math.max(1, Math.ceil(num / 40));
    let current = 0;
    const id = setInterval(() => {
      current += step;
      if (current >= num) { setCount(prefix + num + suffix); clearInterval(id); }
      else setCount(prefix + current + suffix);
    }, 30);
    return () => clearInterval(id);
  }, [inView, value, reduce]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-black text-cyan-400 tabular-nums" aria-label={`${value} ${label}`}>{count}</div>
      <div className="text-gray-400 text-sm mt-1">{label}</div>
    </div>
  );
}

// ─── Navbar ──────────────────────────────────────────────────────────────────

function Navbar(): ReactElement {
  const [open, setOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = (): void => setScrolled(window.scrollY > 20);
    const onKey = (e: KeyboardEvent): void => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("keydown", onKey); };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive("#" + e.target.id); }),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    NAV_LINKS.forEach((l) => { const el = document.getElementById(l.href.slice(1)); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="Navigation principale" className={`fixed top-2 left-0 right-0 z-40 transition-all duration-500 ${scrolled ? "px-4" : "px-0"}`}>
      <div className={`mx-auto max-w-6xl flex items-center justify-between px-6 py-4 transition-all duration-500 ${scrolled ? "rounded-2xl border border-white/10 bg-black/80 backdrop-blur-2xl shadow-2xl shadow-black/30" : "border-b border-white/5"}`}>
        <a href="#" className={`flex items-center gap-2 text-cyan-400 font-black text-xl tracking-widest rounded ${FOCUS}`}>
          <Shield size={22} className="drop-shadow-[0_0_8px_rgba(34,211,238,0.7)]" aria-hidden="true" /> HACKTHUS
        </a>

        <div className="hidden lg:flex gap-6 text-sm">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} aria-current={active === l.href ? "page" : undefined}
              className={`transition-colors duration-300 font-mono rounded ${FOCUS} ${active === l.href ? "text-cyan-400" : "text-gray-400 hover:text-white"}`}>
              {active === l.href && <span className="text-cyan-500 mr-1" aria-hidden="true">›</span>}{l.label}
            </a>
          ))}
        </div>

        <a href={CV_URL} download={CV_FILENAME}
          className={`hidden lg:flex items-center gap-2 bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 text-sm px-4 py-2 rounded-xl hover:bg-cyan-400 hover:text-black transition-all duration-300 ${FOCUS}`}>
          <Download size={14} aria-hidden="true" /> Télécharger CV
        </a>

        <button className={`lg:hidden text-gray-400 hover:text-white rounded ${FOCUS}`} onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={open} aria-controls="mobile-menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <motion.div id="mobile-menu" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="lg:hidden mx-4 mt-2 rounded-2xl border border-white/10 bg-black/90 backdrop-blur-2xl p-6 flex flex-col gap-4">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className={`text-gray-300 hover:text-cyan-400 font-mono transition rounded ${FOCUS}`}>{l.label}</a>
          ))}
          <a href={CV_URL} download={CV_FILENAME} className={`flex items-center justify-center gap-2 border border-cyan-400/30 text-cyan-400 font-bold py-3 rounded-xl ${FOCUS}`}>
            <Download size={16} aria-hidden="true" /> Télécharger mon CV
          </a>
          <a href={`mailto:${CONTACT.email}`} className={`text-center bg-cyan-400 text-black font-bold py-3 rounded-xl ${FOCUS}`}>Envoyer un email</a>
        </motion.div>
      )}
    </nav>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function HeroTerminal(): ReactElement {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState<number>(reduce ? TERMINAL_LINES.length : 0);

  useEffect(() => {
    if (visible >= TERMINAL_LINES.length) return;
    const t = setTimeout(() => setVisible((v) => v + 1), visible % 2 === 0 ? 600 : 300);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <div className="w-full rounded-2xl border border-cyan-500/20 bg-black/70 backdrop-blur-2xl overflow-hidden shadow-2xl shadow-cyan-500/10 font-mono text-sm text-left">
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-white/[0.02]">
        <div className="flex gap-2" aria-hidden="true">
          <div className="w-3 h-3 rounded-full bg-red-500/80" /><div className="w-3 h-3 rounded-full bg-yellow-500/80" /><div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex items-center gap-2 text-gray-500 text-xs"><Terminal size={12} aria-hidden="true" /> hackthus@kali:~$</div>
      </div>
      {/* Décoratif : on évite d'annoncer chaque ligne aux lecteurs d'écran */}
      <div className="p-5 space-y-1.5 min-h-[200px] overflow-x-auto" aria-hidden="true">
        {TERMINAL_LINES.slice(0, visible).map((line, i) => (
          <p key={i} className={line.prompt ? "text-cyan-400" : (line.color ?? "text-gray-300")}>
            {line.prompt && <span className="text-gray-600 mr-2">$</span>}
            <span className={line.pulse ? "animate-pulse motion-reduce:animate-none" : ""}>{line.text}</span>
          </p>
        ))}
        {visible < TERMINAL_LINES.length && <span className="inline-block w-2 h-4 bg-cyan-400 animate-pulse motion-reduce:animate-none" />}
      </div>
      <p className="sr-only">Terminal : Arnold Edwin, administrateur systèmes et réseaux sécurisés [ certifications ADRTS, CLLMSP, CCNA, AV/EDR ] disponible en Île-de-France.</p>
    </div>
  );
}

function ProfilePhoto(): ReactElement {
  const [failed, setFailed] = useState<boolean>(false);
  return (
    <div className="relative">
      <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-cyan-400 animate-spin motion-reduce:animate-none [animation-duration:4s] opacity-70" aria-hidden="true" />
      <div className="absolute rounded-full bg-black" style={{ inset: "3px" }} aria-hidden="true" />
      {failed ? (
        <div className="relative w-44 h-44 md:w-52 md:h-52 rounded-full bg-cyan-400/10 border-2 border-cyan-400/40 flex items-center justify-center">
          <span className="text-4xl md:text-5xl font-black text-cyan-400">AEF</span>
        </div>
      ) : (
        <Image src={PHOTO_URL} alt="Portrait d'Arnold Edwin FOMEDONG" width={208} height={208} priority onError={() => setFailed(true)}
          className="relative w-44 h-44 md:w-52 md:h-52 rounded-full object-cover border-2 border-black" />
      )}
    </div>
  );
}

// ─── Projets ─────────────────────────────────────────────────────────────────

/** Image avec repli élégant si le fichier est absent de /public/images */
function ProjectImage({ p, priority }: { p: Project; priority: boolean }): ReactElement {
  const [failed, setFailed] = useState<boolean>(false);
  if (failed) return <div className="absolute inset-0 flex items-center justify-center"><Shield className="text-cyan-400/40" size={48} aria-hidden="true" /></div>;
  return (
    <Image src={p.image} alt={`Aperçu du projet ${p.title}`} fill priority={priority} onError={() => setFailed(true)}
      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
      className="object-cover group-hover:scale-105 transition duration-700" />
  );
}

// ─── Certifications ──────────────────────────────────────────────────────────

function CertCard({ c }: { c: Cert }): ReactElement {
  const [copied, setCopied] = useState<boolean>(false);

  const copyId = async (): Promise<void> => {
    if (!c.credentialId) return;
    try { await navigator.clipboard.writeText(c.credentialId); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* clipboard indisponible */ }
  };

  return (
    <article className="group relative rounded-3xl border-2 border-cyan-400/30 bg-gradient-to-b from-cyan-400/[0.07] to-white/[0.02] backdrop-blur-xl p-8 text-center hover:border-cyan-400 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 flex flex-col">
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-cyan-400 text-black text-xs font-black tracking-wide shadow-lg shadow-cyan-500/40">
        {c.done ? <CheckCircle size={13} aria-hidden="true" /> : <Circle size={13} aria-hidden="true" />}
        {c.done ? "CERTIFIÉ" : "EN COURS"}
      </span>

      <div className="relative w-full h-52 mt-4 mb-6 rounded-2xl overflow-hidden border-2 border-cyan-400/30 bg-white shadow-xl">
        <Image src={c.image} alt={`Badge de certification ${c.title}`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-contain p-2 group-hover:scale-105 transition duration-500" />
      </div>

      <h3 className="text-2xl md:text-3xl font-black group-hover:text-cyan-400 transition-colors duration-500">{c.title}</h3>
      <p className="text-gray-400 mt-2 text-sm leading-relaxed">{c.sub}</p>
      {c.issuer && <p className="text-gray-500 text-xs font-mono mt-1">Émis par {c.issuer}</p>}

      <div className="mt-auto pt-6 flex flex-col items-center gap-3">
        {c.credentialId && (
          <button type="button" onClick={copyId} className={`inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-cyan-400 rounded ${FOCUS}`} aria-label={`Copier l'identifiant ${c.credentialId}`}>
            ID : {c.credentialId} <Copy size={12} aria-hidden="true" /> <span aria-live="polite" className="text-green-400">{copied ? "copié" : ""}</span>
          </button>
        )}
        {c.verifyUrl ? (
          <a href={c.verifyUrl} target="_blank" rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 border border-cyan-400/40 bg-cyan-400/10 text-cyan-300 text-sm font-mono font-bold px-4 py-2.5 rounded-xl hover:bg-cyan-400 hover:text-black transition-all duration-300 ${FOCUS}`}>
            <BadgeCheck size={15} aria-hidden="true" /> Vérifier le certificat
            <span className="sr-only"> {c.title} (nouvel onglet)</span>
          </a>
        ) : (
          <span className="inline-flex items-center gap-2 text-xs font-mono text-gray-500 border border-white/10 rounded-xl px-3 py-2">
            <BadgeCheck size={14} aria-hidden="true" /> Vérification sur demande
          </span>
        )}
      </div>
    </article>
  );
}

// ─── Formulaire de contact ───────────────────────────────────────────────────

type FormStatus = "idle" | "sending" | "success" | "error";
interface FormState { name: string; email: string; message: string; website: string } // website = honeypot
type FormErrors = Partial<Record<"name" | "email" | "message", string>>;

const EMPTY_FORM: FormState = { name: "", email: "", message: "", website: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(f: FormState): FormErrors {
  const errors: FormErrors = {};
  if (f.name.trim().length < 2) errors.name = "Indiquez votre nom (2 caractères minimum).";
  if (!EMAIL_RE.test(f.email.trim())) errors.email = "Adresse email invalide.";
  if (f.message.trim().length < 10) errors.message = "Votre message est trop court (10 caractères minimum).";
  return errors;
}

const INPUT = "w-full rounded-2xl bg-black/40 border px-5 py-4 outline-none focus:border-cyan-400 transition text-white placeholder-gray-600";

function ContactForm(): ReactElement {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  const set = (k: keyof FormState) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (k !== "website" && errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (form.website) { setStatus("success"); return; } // bot : on ignore silencieusement

    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: form.name.trim(), email: form.email.trim(), message: form.message.trim() }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch { setStatus("error"); }
  };

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-green-500/30 bg-green-500/10 backdrop-blur-xl p-10 flex flex-col items-center justify-center gap-4 min-h-[400px]" role="status">
        <CheckCircle size={52} className="text-green-400" aria-hidden="true" />
        <h3 className="text-2xl font-bold">Message envoyé !</h3>
        <p className="text-gray-400 text-center">Je vous répondrai dans les plus brefs délais.</p>
        <button onClick={() => { setStatus("idle"); setForm(EMPTY_FORM); }} className={`mt-4 border border-white/10 px-6 py-3 rounded-xl hover:border-cyan-400 hover:text-cyan-400 transition ${FOCUS}`}>
          Envoyer un autre message
        </button>
      </div>
    );
  }

  const field = (id: "name" | "email" | "message", label: string, node: ReactElement): ReactElement => (
    <div>
      <label htmlFor={`contact-${id}`} className="block mb-3 text-sm text-gray-400">{label}</label>
      {node}
      {errors[id] && <p id={`err-${id}`} className="text-red-400 text-xs mt-2" role="alert">{errors[id]}</p>}
    </div>
  );
  const common = (id: "name" | "email" | "message") => ({
    id: `contact-${id}`, value: form[id], onChange: set(id), "aria-invalid": !!errors[id],
    "aria-describedby": errors[id] ? `err-${id}` : undefined,
    className: `${INPUT} ${errors[id] ? "border-red-400/60" : "border-white/10"}`,
  });

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-10 space-y-6">
      {field("name", "Nom", <input type="text" autoComplete="name" placeholder="Votre nom" {...common("name")} />)}
      {field("email", "Email", <input type="email" autoComplete="email" placeholder="Votre email" {...common("email")} />)}
      {field("message", "Message", <textarea rows={5} placeholder="Votre message..." {...common("message")} className={`${common("message").className} resize-none`} />)}

      {/* Honeypot : invisible pour les humains */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-website">Ne pas remplir</label>
        <input id="contact-website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={set("website")} />
      </div>

      {status === "error" && <p className="text-red-400 text-sm" role="alert">Une erreur est survenue. Écrivez-moi directement par email.</p>}
      <button type="submit" disabled={status === "sending"}
        className={`w-full flex items-center justify-center gap-2 bg-cyan-400 text-black font-bold py-4 rounded-2xl hover:bg-cyan-300 transition disabled:opacity-60 disabled:cursor-not-allowed ${FOCUS}`}>
        {status === "sending" ? <span className="animate-pulse motion-reduce:animate-none">Envoi en cours...</span> : <>Envoyer le message <ArrowRight size={16} aria-hidden="true" /></>}
      </button>
    </form>
  );
}

const PROFILE_ICONS: Record<Profile["icon"], ReactElement> = {
  github: <GitBranch size={20} />,
  linkedin: <LinkIcon size={20} />,
  tryhackme: <Terminal size={20} />,
  hackthebox: <Terminal size={20} />,
  credly: <BadgeCheck size={20} />,
  other: <Shield size={20} />,
};

// ─── Page ────────────────────────────────────────────────────────────────────

function Timeline({ items }: { items: ExperienceItem[] }): ReactElement {
  return (
    <ol className="relative max-w-5xl mx-auto mb-20">
      <div className="absolute left-4 md:left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent" aria-hidden="true" />
      {items.map((e, i) => {
        const left = i % 2 === 0; // alternance automatique
        return (
          <motion.li key={e.title + e.period} initial={{ opacity: 0, x: left ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className={`relative mb-12 flex flex-col md:flex-row ${left ? "" : "md:flex-row-reverse"} items-start`}>
            <div className="absolute left-[7px] md:left-1/2 w-4 h-4 rounded-full bg-black border-2 border-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.6)] -translate-x-1/2 mt-8" aria-hidden="true" />
            <div className={`ml-10 md:ml-0 md:w-1/2 ${left ? "md:pr-10" : "md:pl-10"}`}>
              <div className={`rounded-2xl border ${e.isJob ? "border-cyan-400/30 bg-cyan-400/[0.05]" : "border-white/10 bg-white/[0.03]"} backdrop-blur-xl p-7 hover:border-cyan-400/40 transition duration-500`}>
                <p className="text-cyan-400 text-xs font-mono mb-2">{e.period}</p>
                <h4 className="text-lg font-bold mb-1">{e.title}</h4>
                {e.isJob && <span className="inline-block mb-2 text-xs font-mono bg-cyan-400/10 text-cyan-400 px-2 py-0.5 rounded-md border border-cyan-400/20">Stage</span>}
                <p className="text-gray-400 text-sm mb-3">{e.org}</p>
                {e.points ? (
                  <ul className="space-y-1.5 text-gray-300 text-sm leading-relaxed list-disc pl-4 marker:text-cyan-400">
                    {e.points.map((pt) => <li key={pt}>{pt}</li>)}
                  </ul>
                ) : (
                  <p className="text-gray-300 text-sm leading-relaxed">{e.desc}</p>
                )}
              </div>
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}

const matchesFilter = (p: Project, f: string): boolean => f === "Tous" || p.category === f;

export default function Home(): ReactElement {
  const [filter, setFilter] = useState<string>("Tous");
  const filtered = PROJECTS.filter((p) => matchesFilter(p, filter));

  const contactItems: { label: string; value: string; href: string; icon: ReactElement }[] = [
    { label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}`, icon: <Mail size={16} /> },
    ...(CONTACT.phone ? [{ label: "Téléphone", value: CONTACT.phone, href: CONTACT.phoneHref, icon: <Phone size={16} /> }] : []),
    { label: "LinkedIn", value: "linkedin.com/in/arnold-edwin", href: CONTACT.linkedin, icon: <LinkIcon size={16} /> },
    { label: "GitHub", value: "github.com/hackthus", href: CONTACT.github, icon: <GitBranch size={16} /> },
    { label: "TryHackMe", value: "tryhackme.com/p/Hackthus", href: CONTACT.tryhackme, icon: <Terminal size={16} /> },
    { label: "Credly", value: "https://www.credly.com/users/arnold-edwin-fomedong/", href: CONTACT.credly, icon: <BadgeCheck size={16} /> },
    { label: "HacktheBox", value: "https://profile.hackthebox.com/profile/019cb52a-e565-720b-8a49-7346a6b361ee", href: CONTACT.hackthebox, icon: <Terminal size={16} /> },
  ];

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative min-h-screen bg-black text-white overflow-hidden font-sans">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-cyan-400 focus:text-black focus:px-4 focus:py-2 focus:rounded-xl focus:font-bold">
          Aller au contenu principal
        </a>
        <ScrollProgress />

        {/* Fond */}
        <div className="pointer-events-none" aria-hidden="true">
          <div className="fixed top-0 left-0 w-[600px] h-[600px] bg-cyan-500/10 blur-[140px] rounded-full" />
          <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[140px] rounded-full" />
          <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <Navbar />

        <div id="main-content">
          {/* ── Hero ── */}
          <section className="relative z-10 flex flex-col items-center text-center px-6 pt-36 pb-24" aria-labelledby="hero-title">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              className="mb-10 px-5 py-2 rounded-full border border-cyan-400/30 text-cyan-400 text-[11px] sm:text-xs font-mono tracking-widest bg-cyan-400/5">
              DISPONIBLE · PARIS . ÎLE-DE-FRANCE
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }}
              className="flex flex-col-reverse sm:flex-row items-center justify-center gap-6 md:gap-10">
              <h1 id="hero-title" className="leading-tight tracking-tight text-center sm:text-left">
                <span className="block text-2xl md:text-3xl lg:text-4xl font-black">Arnold Edwin</span>
                <span className="block text-3xl md:text-4xl lg:text-5xl font-black text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]">FOMEDONG</span>
                <span className="block mt-2 text-xs md:text-sm font-mono font-normal text-gray-400 tracking-wide">Administrateur Systèmes, Réseaux &amp; Cybersécurité</span>
              </h1>
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 0.6 }} className="flex-shrink-0">
                <ProfilePhoto />
              </motion.div>
            </motion.div>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-7 text-gray-400 max-w-2xl text-sm md:text-base leading-relaxed">
              Jeune diplômé en Ingénierie Systèmes, Réseaux et Cybersécurité, je recherche un poste d&apos;administrateur
              systèmes et réseaux. Déploiement et support N1-N3, Windows Server/Linux, Active Directory, réseaux
              segmentés et durcissement : je fais fonctionner le système d&apos;information et je le sécurise.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="flex flex-wrap gap-3 mt-8 justify-center">
              <a href={CV_URL} download={CV_FILENAME} className={`flex items-center gap-2 bg-cyan-400 text-black px-6 py-3 rounded-2xl font-bold hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-500/20 text-sm ${FOCUS}`}>
                <Download size={15} aria-hidden="true" /> Télécharger mon CV
              </a>
              <a href="#projects" className={`group flex items-center gap-2 border border-cyan-400/40 bg-cyan-400/5 text-cyan-400 px-6 py-3 rounded-2xl font-bold hover:bg-cyan-400 hover:text-black transition-all text-sm ${FOCUS}`}>
                Voir les projets <ArrowRight size={15} className="group-hover:translate-x-1 transition" aria-hidden="true" />
              </a>
              <a href="#certifications" className={`flex items-center gap-2 border border-white/10 bg-white/5 backdrop-blur px-6 py-3 rounded-2xl hover:border-cyan-400 hover:text-cyan-400 transition-all text-sm ${FOCUS}`}>
                <BadgeCheck size={15} aria-hidden="true" /> Certifications vérifiables
              </a>
              <a href={`mailto:${CONTACT.email}`} className={`flex items-center gap-2 border border-white/10 bg-white/5 backdrop-blur px-6 py-3 rounded-2xl hover:border-cyan-400 hover:text-cyan-400 transition-all text-sm ${FOCUS}`}>
                <Mail size={15} aria-hidden="true" /> M&apos;écrire
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="flex gap-5 mt-6 text-gray-500 justify-center">
              <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 hover:text-cyan-400 transition text-xs font-mono rounded ${FOCUS}`}><GitBranch size={16} aria-hidden="true" /> github.com/hackthus</a>
              <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 hover:text-cyan-400 transition text-xs font-mono rounded ${FOCUS}`}><LinkIcon size={16} aria-hidden="true" /> linkedin</a>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="w-full max-w-2xl mt-14">
              <HeroTerminal />
            </motion.div>

            <a href="#about" aria-label="Défiler vers la section suivante" className={`mt-12 text-gray-600 hover:text-cyan-400 transition animate-bounce motion-reduce:animate-none rounded ${FOCUS}`}><ChevronDown size={28} /></a>
          </section>

          {/* ── Stats ── */}
          <section className="relative z-10 px-6 md:px-20 py-16" aria-label="Statistiques">
            <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 md:p-10">
              {STATS.map((s) => <Counter key={s.label} {...s} />)}
            </div>
          </section>

          {/* ── Ce que j'apporte ── */}
          <section className="relative z-10 px-6 md:px-20 py-16" aria-labelledby="offer-title">
            <h2 id="offer-title" className="text-center text-3xl md:text-4xl font-black mb-10">Ce que j&apos;apporte à une équipe IT</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {OFFER.map((o) => (
                <li key={o.title} className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-7 hover:border-cyan-400/40 transition duration-500">
                  <h3 className="text-lg font-bold text-cyan-400 mb-2">{o.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{o.text}</p>
                  <p className="text-gray-500 text-xs font-mono mt-3">{o.proof}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* ── À propos ── */}
          <section id="about" className="relative z-10 px-6 md:px-20 py-24" aria-labelledby="about-title">
            <div className="max-w-4xl mx-auto">
              <SectionTitle eyebrow="Profil" title="À propos" />
              <h3 id="about-title" className="sr-only">À propos</h3>
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 md:p-10 grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    Je veux mettre mes compétences au service des utilisateurs et contribuer au bon fonctionnement du
                    système d&apos;information. Ma formation en cybersécurité me permet d&apos;administrer les systèmes et
                    les réseaux en intégrant la sécurité dès le départ (durcissement, IAM, segmentation), et la pratique
                    offensive en laboratoire (TryHackMe, Netacad, Hackthebox, CTF) m&apos;aide à anticiper les failles.
                  </p>
                  <ul className="flex flex-wrap gap-2 mt-5">
                    {ATOUTS.map((a) => <li key={a} className="px-3 py-1 rounded-lg bg-cyan-400/10 border border-cyan-400/20 text-xs text-cyan-300 font-mono">{a}</li>)}
                  </ul>
                </div>
                <dl className="space-y-4">
                  {ABOUT_FACTS.map((f) => (
                    <div key={f.label}>
                      <dt className="text-xs font-mono text-cyan-400">{f.label}</dt>
                      <dd className="text-sm text-gray-200">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </section>

          {/* ── Compétences ── */}
          <section id="skills" className="relative z-10 px-6 md:px-20 py-24">
            <SectionTitle eyebrow="Expertise" title="Compétences Techniques" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {SKILLS.map((s, i) => (
                <motion.div key={s.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-7 hover:border-cyan-400/40 transition duration-500 hover:-translate-y-1">
                  <div className="text-3xl mb-4" aria-hidden="true">{s.icon}</div>
                  <h3 className="text-lg font-bold mb-4">{s.title}</h3>
                  <ul className="flex flex-wrap gap-2">
                    {s.tags.map((tag) => <li key={tag} className="px-3 py-1 rounded-lg bg-cyan-400/10 border border-cyan-400/20 text-xs text-cyan-300 font-mono">{tag}</li>)}
                  </ul>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ── Projets ── */}
          <section id="projects" className="relative z-10 px-6 md:px-20 py-24">
            <SectionTitle eyebrow="Portfolio" title="Projets Cybersécurité" />
            <div className="flex flex-wrap justify-center gap-3 mb-12" role="group" aria-label="Filtrer les projets">
              {FILTERS.map((f) => (
                <button key={f} onClick={() => setFilter(f)} aria-pressed={filter === f}
                  className={`px-4 py-2 rounded-xl text-sm font-mono transition-all ${FOCUS} ${filter === f ? "bg-cyan-400 text-black font-bold" : "border border-white/10 text-gray-400 hover:border-cyan-400/40 hover:text-cyan-400"}`}>
                  {f}
                </button>
              ))}
            </div>
            <p className="sr-only" role="status" aria-live="polite">{filtered.length} projet(s) affiché(s)</p>
            {(filter === "Tous" || filter === OFFENSIVE_CATEGORY) && (
              <p className="text-center text-xs font-mono text-gray-500 mb-8 max-w-2xl mx-auto">
                Note : les projets offensifs sont réalisés à des fins éducatives, en laboratoire ou sur des environnements autorisés (TryHackMe, Hack The Box, labs personnels).
              </p>
            )}

            {filtered.length === 0 ? (
              <p className="text-center text-gray-500 text-sm font-mono">Aucun projet ne correspond à ce filtre pour le moment.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {filtered.map((p, i) => (
                  <motion.article key={p.title} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                    className="group rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-xl hover:border-cyan-400/40 transition duration-500 hover:-translate-y-1 flex flex-col">
                    <div className={`h-40 bg-gradient-to-br ${p.gradient} relative overflow-hidden`}>
                      <ProjectImage p={p} priority={i < 2} />
                      <span className="absolute top-3 right-3 z-10 px-2 py-1 rounded-lg bg-black/60 backdrop-blur border border-white/10 text-[10px] font-mono text-cyan-300">{p.status}</span>
                      {p.featured && <span className="absolute top-3 left-3 z-10 px-2 py-1 rounded-lg bg-cyan-400 text-black text-[10px] font-mono font-bold">★ Projet phare</span>}
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-lg font-bold mb-2">{p.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">{p.desc}</p>
                      <ul className="flex flex-wrap gap-2 mb-5">
                        {p.tags.map((t) => <li key={t} className="px-2 py-1 rounded-lg bg-cyan-400/10 border border-cyan-400/20 text-xs text-cyan-300 font-mono">{t}</li>)}
                      </ul>
                      <a href={p.url} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-mono transition rounded ${FOCUS}`}>
                        <ExternalLink size={14} aria-hidden="true" /> Voir le projet<span className="sr-only"> : {p.title}</span>
                      </a>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </section>

          {/* ── Parcours ── */}
          <section id="experience" className="relative z-10 px-6 md:px-20 py-24">
            <SectionTitle eyebrow="Career" title="Expérience & Formation" />
            <h3 className="text-center text-xl font-bold text-cyan-400 font-mono mb-10">Expériences professionnelles</h3>
            <Timeline items={EXPERIENCE} />
            <h3 className="text-center text-xl font-bold text-cyan-400 font-mono mt-8 mb-10">Diplômes &amp; formations</h3>
            <Timeline items={EDUCATION} />
          </section>

          {/* ── Certifications ── */}
          <section id="certifications" className="relative z-10 px-6 md:px-20 py-24" aria-label="Certifications">
            <SectionTitle eyebrow="Credentials" title="Certifications" sub="Chaque certification peut être contrôlée auprès de l'organisme émetteur via le lien de vérification." />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {CERTS.map((c) => <CertCard key={c.title} c={c} />)}
            </div>

            <div className="max-w-4xl mx-auto mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
              <h3 className="text-lg font-bold mb-4 text-cyan-400 font-mono">Formations autodidactes</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-400">
                {AUTODIDACTE.map((item) => (
                  <li key={item} className="flex items-start gap-2"><span className="text-cyan-500 mt-0.5" aria-hidden="true">›</span><span>{item}</span></li>
                ))}
              </ul>
            </div>
            
            <div id="profiles" className="max-w-4xl mx-auto mt-10 scroll-mt-28">
              <h3 className="text-lg font-bold mb-4 text-cyan-400 font-mono">Profils publics</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PROFILES.filter((p) => p.url).map((p) => (
                  <li key={p.name}>
                    <a href={p.url} target="_blank" rel="noopener noreferrer"
                      className={`group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 hover:border-cyan-400/40 hover:-translate-y-0.5 transition duration-300 ${FOCUS}`}>
                      <span className="text-cyan-400" aria-hidden="true">{PROFILE_ICONS[p.icon]}</span>
                      <span className="flex-1 min-w-0">
                        <span className="block font-bold text-sm">{p.name}</span>
                        <span className="block text-xs text-gray-400">{p.description}</span>
                        {p.handle && <span className="block text-xs font-mono text-gray-500 truncate">{p.handle}</span>}
                      </span>
                      <ExternalLink size={14} className="text-gray-500 group-hover:text-cyan-400 transition" aria-hidden="true" />
                      <span className="sr-only">(nouvel onglet)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </section>

          {/* ── Contact ── */}
          <section id="contact" className="relative z-10 px-6 md:px-20 py-24">
            <SectionTitle eyebrow="Contact" title="Travaillons Ensemble" sub="Disponible pour un poste d'administrateur systèmes et réseaux sécurisés : Île-de-France et partout en France, présentiel ou télétravail." />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 md:p-10">
                <h3 className="text-2xl font-bold mb-8">Informations</h3>
                <ul className="space-y-6">
                  {contactItems.map((item) => {
                    const ext = item.href.startsWith("http");
                    return (
                      <li key={item.label} className="flex items-start gap-4">
                        <span className="text-cyan-400 mt-0.5" aria-hidden="true">{item.icon}</span>
                        <div>
                          <p className="text-gray-500 text-xs font-mono mb-1">{item.label}</p>
                          <a href={item.href} target={ext ? "_blank" : undefined} rel={ext ? "noopener noreferrer" : undefined} className={`text-gray-200 hover:text-cyan-400 transition text-sm rounded break-all ${FOCUS}`}>{item.value}</a>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <a href={CV_URL} download={CV_FILENAME} className={`mt-8 w-full flex items-center justify-center gap-2 border border-cyan-400/30 bg-cyan-400/5 text-cyan-400 font-bold py-3.5 rounded-2xl hover:bg-cyan-400 hover:text-black transition-all duration-300 ${FOCUS}`}>
                  <Download size={16} aria-hidden="true" /> Télécharger mon CV
                </a>
                <div className="mt-4 p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse motion-reduce:animate-none" aria-hidden="true" />
                  <span className="text-green-400 text-sm font-mono">Disponible</span>
                </div>
              </div>
              <ContactForm />
            </div>
          </section>
        </div>

        {/* ── Footer ── */}
        <footer className="relative z-10 border-t border-white/10 py-10 px-6 md:px-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-6xl mx-auto">
            <div className="flex items-center gap-2 text-cyan-400 font-black tracking-widest"><Shield size={18} aria-hidden="true" /> HACKTHUS</div>
            <p className="text-gray-500 text-xs font-mono">© {new Date().getFullYear()} Arnold Edwin FOMEDONG : Administrateur Systèmes, Réseaux &amp; Cybersécurité</p>
            <div className="flex gap-4 items-center">
              <a href={CV_URL} download={CV_FILENAME} className={`text-gray-500 hover:text-cyan-400 transition flex items-center gap-1 text-xs font-mono rounded ${FOCUS}`}><Download size={14} aria-hidden="true" /> CV</a>
              <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={`text-gray-500 hover:text-cyan-400 transition rounded ${FOCUS}`}><GitBranch size={18} /></a>
              <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={`text-gray-500 hover:text-cyan-400 transition rounded ${FOCUS}`}><LinkIcon size={18} /></a>
            </div>
          </div>
        </footer>
      </main>
    </MotionConfig>
  );
}
