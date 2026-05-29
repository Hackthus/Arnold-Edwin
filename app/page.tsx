"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Shield,
  GitBranch,
  Link,
  Terminal,
  ArrowRight,
  ExternalLink,
  Mail,
  Phone,
  Menu,
  X,
  ChevronDown,
  CheckCircle,
  Circle,
} from "lucide-react";

// ─── Data ──────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "À propos", href: "#about" },
  { label: "Projets", href: "#projects" },
  { label: "Expérience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const SKILLS = [
  {
    icon: "🌐",
    title: "Réseaux",
    tags: ["TCP/IP", "DNS", "DHCP", "VLAN", "VPN", "Routing", "Switching", "Firewall"],
  },
  {
    icon: "🖥️",
    title: "Systèmes",
    tags: ["Linux", "Windows Server", "Active Directory", "GPO", "PowerShell", "Bash"],
  },
  {
    icon: "🔐",
    title: "Cybersécurité",
    tags: ["Nmap", "Burp Suite", "Metasploit FrameWork", "Sliver C2", "Wireshark", "Nessus", "OpenVAS", "Suricata", "Snort"],
  },
  {
    icon: "☁️",
    title: "Cloud & Virtualisation",
    tags: ["AWS", "Azure", "Oracle Cloud", "VMware ESXi", "Proxmox", "Docker", "WSL", "Kubernetes"],
  },
  {
    icon: "📊",
    title: "Supervision & SIEM",
    tags: ["Nagios", "Zabbix", "Grafana", "Centreon", "Splunk", "Elastic", "Wazuh"],
  },
  {
    icon: "⚡",
    title: "Automatisation",
    tags: ["Python", "Bash", "PowerShell", "Scripting", "OSINT"],
  },
];

const PROJECTS = [
  {
    emoji: "🌐",
    gradient: "from-cyan-500/20 to-blue-500/10",
    title: "Zero Trust Network",
    desc: "Infrastructure réseau sécurisée avec segmentation, VPN, firewall et architecture Zero Trust complète.",
    tags: ["VPN", "Firewall", "Linux", "Networking"],
    status: "Terminé",
    url: "https://github.com/Hackthus/Zero-Trust",
  },
  {
    emoji: "🔐",
    gradient: "from-purple-500/20 to-cyan-500/10",
    title: "Wreath Network Pentest",
    desc: "Pentest complet d'un environnement Microsoft Windows + Web avec exploitation Active Directory.",
    tags: ["Active Directory", "Pentest", "Windows", "Burp Suite"],
    status: "Terminé",
    url: "https://github.com/Hackthus/Wreath-Network",
  },
  {
    emoji: "🐧",
    gradient: "from-green-500/20 to-cyan-500/10",
    title: "MFA Linux Server",
    desc: "Sécurisation SSH Linux avec authentification multi-facteurs et durcissement système complet.",
    tags: ["Linux", "SSH", "MFA", "Hardening"],
    status: "Terminé",
    url: "https://github.com/Hackthus/MFA-Serveur-SSH-Linux/",
  },
  {
    emoji: "🕷️",
    gradient: "from-red-500/20 to-orange-500/10",
    title: "WebSpider",
    desc: "Outil Python de test automatisé de sécurité des applications web (XSS, SQLi, IDOR).",
    tags: ["Python", "Web Security", "Automation", "OWASP"],
    status: "Terminé",
    url: "https://github.com/Hackthus/Webspider",
  },
  {
    emoji: "📡",
    gradient: "from-yellow-500/20 to-cyan-500/10",
    title: "PacketFilter",
    desc: "Outil Linux de gestion et filtrage de trafic réseau sécurisé avec analyse en temps réel.",
    tags: ["Linux", "Networking", "Security", "Python"],
    status: "Terminé",
    url: "https://github.com/Hackthus/PacketFilter",
  },
  {
    emoji: "🔍",
    gradient: "from-orange-500/20 to-red-500/10",
    title: "OSINT Finder",
    desc: "Outil d'investigation OSINT pour la collecte d'informations open-source sur des cibles.",
    tags: ["Python", "OSINT", "Reconnaissance", "Security"],
    status: "Terminé",
    url: "https://github.com/hackthus",
  },
  {
    emoji: "🎓",
    gradient: "from-blue-500/20 to-purple-500/10",
    title: "Sensibilisation Cyber",
    desc: "Programme de sensibilisation à la cybersécurité pour entreprises et collaborateurs.",
    tags: ["Documentation", "Awareness", "Training"],
    status: "Terminé",
    url: "https://github.com/Hackthus/Sensibilisation-Cyber",
  },
  {
    emoji: "📚",
    gradient: "from-cyan-500/20 to-purple-500/10",
    title: "Cybersecurity Wiki",
    desc: "Wiki et documentation cybersécurité pour partage de connaissances techniques.",
    tags: ["Documentation", "Cybersecurity", "Linux", "Networking"],
    status: "En cours",
    url: "https://hackthus.github.io/The-Hackers-237",
  },
  {
    emoji: "📝",
    gradient: "from-teal-500/20 to-green-500/10",
    title: "WriteUps & Audits",
    desc: "Rapports d'audit de sécurité et write-ups CTF rédigés selon les standards professionnels.",
    tags: ["Audit", "Report", "CTF", "HackTheBox"],
    status: "En cours",
    url: "https://github.com/Hackthus/WriteUps",
  },
];

const EXPERIENCE = [
  {
    period: "2025 — Présent",
    title: "Master 2 Cybersécurité",
    org: "Nexa Digital School — Paris",
    desc: "Spécialisation en cybersécurité offensive, administration systèmes, réseaux sécurisés et cloud.",
    side: "left",
  },
  {
    period: "2025",
    title: "Master 1 Chef Projet Cybersécurité",
    org: "Cyber Management School — Paris",
    desc: "Gouvernance cybersécurité, gestion des risques et sécurité des systèmes d'information.",
    side: "right",
  },
  {
    period: "2023 — 2024",
    title: "Licence Administration Systèmes & DevOps",
    org: "École IT — Orléans",
    desc: "Administration Linux/Windows, virtualisation, cloud computing et automatisation.",
    side: "left",
  },
  {
    period: "2021 — 2022",
    title: "DEC Réseautique & Sécurité Informatique",
    org: "CCNB — Canada",
    desc: "Fondamentaux réseaux, sécurité et infrastructure.",
    side: "right",
  },
  {
    period: "Mai — Oct 2022",
    title: "Stage Administrateur Systèmes & Réseaux",
    org: "Edil Techno",
    desc: "Administration Linux/Windows Server, gestion AD & GPO, déploiement Nessus, scripts PowerShell/Bash/Python, supervision infrastructure.",
    side: "left",
    isJob: true,
  },
];

const CERTS = [
  { icon: "🛡️", title: "CCNA", sub: "Cisco Certified Network Associate", done: true },
  { icon: "🔐", title: "CEH", sub: "Certified Ethical Hacker (CISCO)", done: true },
  { icon: "⚡", title: "ADRTS", sub: "Active Directory Red Team Specialist", done: false },
];

const STATS = [
  { value: "7+", label: "Certificats de completions" },
  { value: "25+", label: "Projets GitHub" },
  { value: "3", label: "Certifications" },
  { value: "50+", label: "Machines CTF" },
];

// ─── Typewriter Hook ────────────────────────────────────────────────────────

function useTypewriter(lines: string[], speed: number = 45) {
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (lineIdx >= lines.length) { setDone(true); return; }
    if (charIdx < lines[lineIdx].length) {
      const t = setTimeout(() => {
        setDisplayed(prev => {
          const copy = [...prev];
          copy[lineIdx] = (copy[lineIdx] || "") + lines[lineIdx][charIdx];
          return copy;
        });
        setCharIdx(c => c + 1);
      }, speed);
      return () => clearTimeout(t);
    } else {
      const pause = setTimeout(() => {
        setLineIdx(l => l + 1);
        setCharIdx(0);
      }, 400);
      return () => clearTimeout(pause);
    }
  }, [lineIdx, charIdx, lines, speed]);

  return { displayed, done };
}

// ─── Animated Counter ───────────────────────────────────────────────────────

function Counter({ value, label }: { value: string; label: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const num = parseInt(value.replace(/\D/g, ""));
    const suffix = value.replace(/[0-9]/g, "");
    let start = 0;
    const step = Math.ceil(num / 40);
    const interval = setInterval(() => {
      start += step;
      if (start >= num) { setCount(num + suffix); clearInterval(interval); }
      else setCount(start + suffix);
    }, 30);
    return () => clearInterval(interval);
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-black text-cyan-400 tabular-nums">{count}</div>
      <div className="text-gray-400 text-sm mt-1">{label}</div>
    </div>
  );
}

// ─── Scroll Progress ────────────────────────────────────────────────────────

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-transparent">
      <div
        className="h-full bg-cyan-400 transition-all duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

// ─── Navbar ─────────────────────────────────────────────────────────────────

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map(l => l.href.slice(1));
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActive("#" + e.target.id); });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav className={`fixed top-2 left-0 right-0 z-40 transition-all duration-500 ${scrolled ? "px-4" : "px-0"}`}>
      <div className={`mx-auto max-w-6xl flex items-center justify-between px-6 py-4 transition-all duration-500 ${scrolled ? "rounded-2xl border border-white/10 bg-black/80 backdrop-blur-2xl shadow-2xl shadow-black/30" : "border-b border-white/5"}`}>
        <a href="#" className="flex items-center gap-2 text-cyan-400 font-black text-xl tracking-widest">
          <Shield size={22} className="drop-shadow-[0_0_8px_rgba(34,211,238,0.7)]" />
          HACKTHUS
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex gap-6 text-sm">
          {NAV_LINKS.map(l => (
            <a
              key={l.href}
              href={l.href}
              className={`transition-all duration-300 font-mono ${active === l.href ? "text-cyan-400" : "text-gray-400 hover:text-white"}`}
            >
              {active === l.href && <span className="text-cyan-500 mr-1">›</span>}
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="mailto:arnoldedwinpro@gmail.com"
          className="hidden md:flex items-center gap-2 bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 text-sm px-4 py-2 rounded-xl hover:bg-cyan-400 hover:text-black transition-all duration-300"
        >
          <Mail size={14} />
          Contact
        </a>

        {/* Mobile burger */}
        <button
          className="md:hidden text-gray-400 hover:text-white"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mx-4 mt-2 rounded-2xl border border-white/10 bg-black/90 backdrop-blur-2xl p-6 flex flex-col gap-4"
        >
          {NAV_LINKS.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-gray-300 hover:text-cyan-400 font-mono transition"
            >
              {l.label}
            </a>
          ))}
          <a
            href="mailto:arnoldedwinpro@gmail.com"
            className="mt-2 text-center bg-cyan-400 text-black font-bold py-3 rounded-xl"
          >
            Envoyer un email
          </a>
        </motion.div>
      )}
    </nav>
  );
}

// ─── Hero Terminal ───────────────────────────────────────────────────────────

const TERMINAL_LINES = [
  { prompt: true,  text: "whoami" },
  { prompt: false, text: "arnold-fomedong", color: "text-green-400" },
  { prompt: true,  text: "certifications --list" },
  { prompt: false, text: "CCNA  •  CEH  •  ADRTS (in progress)", color: "text-gray-300" },
  { prompt: true,  text: "skills --top" },
  { prompt: false, text: "Linux  •  Active Directory  •  Pentest  •  SOC  •  Cloud", color: "text-gray-300" },
  { prompt: true,  text: "status" },
  { prompt: false, text: "[SYSTEM ONLINE — AVAILABLE FOR STAGE]", color: "text-green-400", pulse: true },
];

function HeroTerminal() {
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    if (visible >= TERMINAL_LINES.length) return;
    const t = setTimeout(() => setVisible(v => v + 1), visible % 2 === 0 ? 600 : 300);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <div className="mt-16 w-full max-w-2xl rounded-2xl border border-cyan-500/20 bg-black/70 backdrop-blur-2xl overflow-hidden shadow-2xl shadow-cyan-500/10 font-mono text-sm">
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-white/[0.02]">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex items-center gap-2 text-gray-500 text-xs">
          <Terminal size={12} />
          hackthus@kali:~$
        </div>
      </div>
      <div className="p-5 space-y-1.5 min-h-[180px]">
        {TERMINAL_LINES.slice(0, visible).map((line, i) => (
          <p
            key={i}
            className={line.prompt ? "text-cyan-400" : (line.color || "text-gray-300")}
          >
            {line.prompt && <span className="text-gray-600 mr-2">$</span>}
            <span className={line.pulse ? "animate-pulse" : ""}>{line.text}</span>
          </p>
        ))}
        {visible < TERMINAL_LINES.length && (
          <span className="inline-block w-2 h-4 bg-cyan-400 animate-pulse" />
        )}
      </div>
    </div>
  );
}

// ─── Contact Form ────────────────────────────────────────────────────────────

function ContactForm() {
  const [form, setForm] = useState<{
    name: string;
    email: string;
    message: string;
  }>({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setStatus("sending");

    try {
      const res = await fetch(
        "https://formspree.io/f/xnjrrjag",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-green-500/30 bg-green-500/10 backdrop-blur-xl p-10 flex flex-col items-center justify-center gap-4 min-h-[400px]">
        <CheckCircle size={52} className="text-green-400" />
        <h3 className="text-2xl font-bold">Message envoyé !</h3>
        <p className="text-gray-400 text-center">
          Je vous répondrai dans les plus brefs délais.
        </p>

        <button
          onClick={() => {
            setStatus("idle");
            setForm({ name: "", email: "", message: "" });
          }}
          className="mt-4 border border-white/10 px-6 py-3 rounded-xl hover:border-cyan-400 hover:text-cyan-400 transition"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10"
    >
      <div className="space-y-6">

        <div>
          <label className="block mb-3 text-sm text-gray-400">
            Nom
          </label>

          <input
            type="text"
            placeholder="Votre nom"
            value={form.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setForm((f) => ({ ...f, name: e.target.value }))
            }
            className="w-full rounded-2xl bg-black/40 border border-white/10 px-5 py-4 outline-none focus:border-cyan-400 transition text-white placeholder-gray-600"
            required
          />
        </div>

        <div>
          <label className="block mb-3 text-sm text-gray-400">
            Email
          </label>

          <input
            type="email"
            placeholder="Votre email"
            value={form.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setForm((f) => ({ ...f, email: e.target.value }))
            }
            className="w-full rounded-2xl bg-black/40 border border-white/10 px-5 py-4 outline-none focus:border-cyan-400 transition text-white placeholder-gray-600"
            required
          />
        </div>

        <div>
          <label className="block mb-3 text-sm text-gray-400">
            Message
          </label>

          <textarea
            rows={5}
            placeholder="Votre message..."
            value={form.message}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setForm((f) => ({ ...f, message: e.target.value }))
            }
            className="w-full rounded-2xl bg-black/40 border border-white/10 px-5 py-4 outline-none focus:border-cyan-400 transition resize-none text-white placeholder-gray-600"
            required
          />
        </div>

        {status === "error" && (
          <p className="text-red-400 text-sm">
            Une erreur est survenue. Essayez par email directement.
          </p>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full flex items-center justify-center gap-2 bg-cyan-400 text-black font-bold py-4 rounded-2xl hover:bg-cyan-300 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "sending" ? (
            <span className="animate-pulse">
              Envoi en cours...
            </span>
          ) : (
            <>
              Envoyer le message <ArrowRight size={16} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function Home() {
  const [filter, setFilter] = useState("Tous");
  const FILTERS = ["Tous", "Pentest", "Linux", "Python", "Cloud", "Documentation"];

  const filteredProjects = PROJECTS.filter(p => {
    if (filter === "Tous") return true;
    return p.tags.some(t => t.toLowerCase().includes(filter.toLowerCase()));
  });

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden font-sans">
      <ScrollProgress />

      {/* ── Background ── */}
      <div className="pointer-events-none">
        <div className="fixed top-0 left-0 w-[600px] h-[600px] bg-cyan-500/10 blur-[140px] rounded-full" />
        <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[140px] rounded-full" />
        <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <Navbar />

      {/* ── Hero ── */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-40 pb-24">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-6">
          <span className="px-5 py-2 rounded-full border border-cyan-400/30 text-cyan-400 text-xs font-mono tracking-widest bg-cyan-400/5">
            CYBERSECURITY ENGINEER — PARIS & PÉRIPHÉRIES
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black max-w-5xl leading-[1.05] tracking-tight"
        >
          Arnold Edwin
          <br />
          <span className="text-cyan-400 drop-shadow-[0_0_30px_rgba(34,211,238,0.5)]">FOMEDONG</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-6 text-gray-400 max-w-2xl text-base md:text-lg leading-relaxed"
        >
          Ingénieur Systèmes, Réseaux & Cybersécurité — Administration, Pentest,{" "}
          Active Directory, SOC & Infrastructures sécurisées.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="flex flex-wrap gap-4 mt-10 justify-center"
        >
          <a
            href="#projects"
            className="group flex items-center gap-2 bg-cyan-400 text-black px-7 py-3.5 rounded-2xl font-bold hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-500/20"
          >
            Voir les projets
            <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
          </a>
          <a
            href="mailto:arnoldedwinpro@gmail.com"
            className="flex items-center gap-2 border border-white/10 bg-white/5 backdrop-blur px-7 py-3.5 rounded-2xl hover:border-cyan-400 hover:text-cyan-400 transition-all"
          >
            <Mail size={16} />
            M'écrire
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="w-full max-w-2xl mt-14"
        >
          <HeroTerminal />
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="flex gap-6 mt-12 text-gray-500"
        >
          <a href="https://github.com/hackthus" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-cyan-400 transition text-sm font-mono">
            <GitBranch size={18} /> github.com/hackthus
          </a>
          <a href="https://www.linkedin.com/in/arnold-edwin" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-cyan-400 transition text-sm font-mono">
            <Link size={18} /> linkedin
          </a>
        </motion.div>

        <a href="#about" className="mt-16 text-gray-600 hover:text-cyan-400 transition animate-bounce">
          <ChevronDown size={28} />
        </a>
      </section>

      {/* ── Stats ── */}
      <section className="relative z-10 px-6 md:px-20 py-16">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-10">
          {STATS.map(s => <Counter key={s.label} {...s} />)}
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="about" className="relative z-10 px-6 md:px-20 py-24">
        <div className="text-center mb-16">
          <p className="text-cyan-400 uppercase tracking-[0.3em] text-xs font-mono mb-4">Expertise</p>
          <h2 className="text-4xl md:text-5xl font-black">Compétences Techniques</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {SKILLS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-7 hover:border-cyan-400/40 transition duration-500 hover:-translate-y-1"
            >
              <div className="text-3xl mb-4">{s.icon}</div>
              <h3 className="text-lg font-bold mb-4 text-white">{s.title}</h3>
              <div className="flex flex-wrap gap-2">
                {s.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-lg bg-cyan-400/10 border border-cyan-400/20 text-xs text-cyan-300 font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="relative z-10 px-6 md:px-20 py-24">
        <div className="text-center mb-12">
          <p className="text-cyan-400 uppercase tracking-[0.3em] text-xs font-mono mb-4">Portfolio</p>
          <h2 className="text-4xl md:text-5xl font-black">Projets Cybersécurité</h2>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-mono transition-all ${
                filter === f
                  ? "bg-cyan-400 text-black font-bold"
                  : "border border-white/10 text-gray-400 hover:border-cyan-400/40 hover:text-cyan-400"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredProjects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="group rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-xl hover:border-cyan-400/40 transition duration-500 hover:-translate-y-1 flex flex-col"
            >
              <div className={`h-40 bg-gradient-to-br ${p.gradient} flex items-center justify-center text-6xl relative`}>
                {p.emoji}
                <span className={`absolute top-3 right-3 text-xs font-mono px-2 py-1 rounded-lg ${p.status === "Terminé" ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"}`}>
                  {p.status === "Terminé" ? "✓" : "●"} {p.status}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-bold mb-2">{p.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">{p.desc}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {p.tags.map(t => (
                    <span key={t} className="px-2 py-1 rounded-lg bg-cyan-400/10 border border-cyan-400/20 text-xs text-cyan-300 font-mono">{t}</span>
                  ))}
                </div>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-mono transition"
                >
                  <ExternalLink size={14} /> Voir le projet
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Experience ── */}
      <section id="experience" className="relative z-10 px-6 md:px-20 py-24">
        <div className="text-center mb-20">
          <p className="text-cyan-400 uppercase tracking-[0.3em] text-xs font-mono mb-4">Career</p>
          <h2 className="text-4xl md:text-5xl font-black">Expérience & Formations</h2>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="absolute left-4 md:left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent" />

          {EXPERIENCE.map((e, i) => (
            <motion.div
              key={e.title}
              initial={{ opacity: 0, x: e.side === "left" ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`relative mb-12 flex flex-col md:flex-row ${e.side === "right" ? "md:flex-row-reverse" : ""} items-start md:items-start`}
            >
              <div className="absolute left-[7px] md:left-1/2 w-4 h-4 rounded-full bg-black border-2 border-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.6)] -translate-x-1/2 mt-8" />
              <div className={`ml-10 md:ml-0 md:w-1/2 ${e.side === "left" ? "md:pr-10" : "md:pl-10"}`}>
                <div className={`rounded-2xl border ${e.isJob ? "border-cyan-400/30 bg-cyan-400/[0.05]" : "border-white/10 bg-white/[0.03]"} backdrop-blur-xl p-7 hover:border-cyan-400/40 transition duration-500`}>
                  <p className="text-cyan-400 text-xs font-mono mb-2">{e.period}</p>
                  <h3 className="text-lg font-bold mb-1">{e.title}</h3>
                  {e.isJob && <span className="inline-block mb-2 text-xs font-mono bg-cyan-400/10 text-cyan-400 px-2 py-0.5 rounded-md border border-cyan-400/20">Stage</span>}
                  <p className="text-gray-400 text-sm mb-3">{e.org}</p>
                  <p className="text-gray-300 text-sm leading-relaxed">{e.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Certifications ── */}
      <section className="relative z-10 px-6 md:px-20 py-24">
        <div className="text-center mb-16">
          <p className="text-cyan-400 uppercase tracking-[0.3em] text-xs font-mono mb-4">Certifications</p>
          <h2 className="text-4xl md:text-5xl font-black">Certifications & Learning</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {CERTS.map(c => (
            <div
              key={c.title}
              className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 backdrop-blur-xl p-8 text-center hover:scale-105 transition duration-500 relative"
            >
              {!c.done && (
                <span className="absolute top-4 right-4 text-xs font-mono bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-2 py-0.5 rounded-lg">In progress</span>
              )}
              <div className="text-5xl mb-4">{c.icon}</div>
              <h3 className="text-2xl font-black mb-2">{c.title}</h3>
              <p className="text-gray-400 text-sm">{c.sub}</p>
              <div className="mt-4 flex justify-center">
                {c.done
                  ? <CheckCircle size={18} className="text-green-400" />
                  : <Circle size={18} className="text-yellow-400" />
                }
              </div>
            </div>
          ))}
        </div>

        {/* Autodidacte */}
        <div className="max-w-4xl mx-auto mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
          <h3 className="text-lg font-bold mb-4 text-cyan-400 font-mono">Formations autodidactes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-400">
            {[
              "TryHackMe – Sécurité des IA (en cours)",
              "TryHackMe – Path Web Application Pentesting",
              "TryHackMe – Path Junior Penetration Tester",
              "CISCO Netacad – Certified Ethical Hacker",
              "CISCO Netacad – IOT & Transformation Digitale",
              "CISCO Netacad – Bases du matériel informatique",
            ].map(item => (
              <div key={item} className="flex items-start gap-2">
                <span className="text-cyan-500 mt-0.5">›</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="relative z-10 px-6 md:px-20 py-24">
        <div className="text-center mb-16">
          <p className="text-cyan-400 uppercase tracking-[0.3em] text-xs font-mono mb-4">Contact</p>
          <h2 className="text-4xl md:text-5xl font-black">Travaillons Ensemble</h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto text-sm">
            Disponible pour des stages, alternances et projets en cybersécurité, administration systèmes et réseaux.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Info */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-10">
            <h3 className="text-2xl font-bold mb-8">Informations</h3>
            <div className="space-y-6">
              {[
                { label: "Email", value: "arnoldedwinpro@gmail.com", href: "mailto:arnoldedwinpro@gmail.com", icon: <Mail size={16} /> },
                { label: "Téléphone", value: "+33 7 44 91 47 64", href: "tel:+33744914764", icon: <Phone size={16} /> },
                { label: "LinkedIn", value: "linkedin.com/in/arnold-edwin", href: "https://www.linkedin.com/in/arnold-edwin", icon: <Link size={16} /> },
                { label: "GitHub", value: "github.com/hackthus", href: "https://github.com/hackthus", icon: <GitBranch size={16} /> },
                { label: "TryHackMe", value: "tryhackme.com/p/Hackthus", href: "https://tryhackme.com/p/Hackthus", icon: <Shield size={16} /> },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-4">
                  <span className="text-cyan-400 mt-0.5">{item.icon}</span>
                  <div>
                    <p className="text-gray-500 text-xs font-mono mb-1">{item.label}</p>
                    <a href={item.href} target="_blank" rel="noopener noreferrer"
                      className="text-gray-200 hover:text-cyan-400 transition text-sm">
                      {item.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-sm font-mono">Disponible pour stage - 2026</span>
            </div>
          </div>

          {/* Form */}
          <ContactForm />
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-white/10 py-10 px-6 md:px-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-cyan-400 font-black tracking-widest">
            <Shield size={18} />
            HACKTHUS
          </div>
          <p className="text-gray-600 text-xs font-mono">
            © 2026 Arnold Edwin FOMEDONG - Cybersecurity Engineer 
          </p>
          <div className="flex gap-4">
            <a href="https://github.com/hackthus" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-cyan-400 transition">
              <GitBranch size={18} />
            </a>
            <a href="https://www.linkedin.com/in/arnold-edwin" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-cyan-400 transition">
              <Link size={18} />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}