// ─────────────────────────────────────────────────────────────────────────────
// 📁 Contenu éditable du portfolio — aligné sur le CV (septembre 2026).
// Cible : poste d'administrateur systèmes & réseaux sécurisés.
// Fichiers dans /public : photo.png · CV-Arnold-Edwin-FOMEDONG.pdf · images/ · images/certs/
// ─────────────────────────────────────────────────────────────────────────────

export const PHOTO_URL = "/photo.png";
export const CV_URL = "/CV-Arnold-Edwin-FOMEDONG.pdf";
export const CV_FILENAME = "CV-Arnold-Edwin-FOMEDONG.pdf";

export const CONTACT = {
  email: "arnoldedwinpro@gmail.com",
  phone: "+33 7 44 91 47 64", // "" pour masquer
  phoneHref: "tel:+33744914764",
  github: "https://github.com/hackthus",
  linkedin: "https://www.linkedin.com/in/arnold-edwin",
  tryhackme: "https://tryhackme.com/p/Hackthus",
  credly: "https://www.credly.com/users/arnold-edwin-fomedong/", 
  hackthebox: "https://profile.hackthebox.com/profile/019cb52a-e565-720b-8a49-7346a6b361ee",
} as const;

export interface NavLink { label: string; href: string }
export interface Skill { icon: string; title: string; tags: string[] }

export const PROJECT_CATEGORIES = ["Systèmes & Réseaux", "Sécurité défensive", "Offensif & CTF"] as const;
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];
export const OFFENSIVE_CATEGORY: ProjectCategory = "Offensif & CTF";
export const FILTERS: string[] = ["Tous", ...PROJECT_CATEGORIES];

export interface Project {
  image: string; gradient: string; title: string; desc: string; tags: string[];
  status: "Terminé" | "En cours"; url: string; category: ProjectCategory; featured?: boolean;
}
export interface ExperienceItem {
  period: string; title: string; org: string; isJob?: boolean;
  desc?: string;        // formation : une phrase
  points?: string[];    // expérience : puces
}
export interface Cert {
  image: string; title: string; sub: string; issuer: string; done: boolean;
  credentialId?: string; verifyUrl?: string;
}
export interface Stat { value: string; label: string }
export interface TerminalLine { prompt: boolean; text: string; color?: string; pulse?: boolean }
export interface Offer { title: string; text: string; proof: string }

export const NAV_LINKS: NavLink[] = [
  { label: "À propos", href: "#about" },
  { label: "Compétences", href: "#skills" },
  { label: "Projets", href: "#projects" },
  { label: "Parcours", href: "#experience" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

// Ce que l'employeur gagne — chaque bloc renvoie à une preuve réelle (CV / projets).
export const OFFER: Offer[] = [
  { title: "Déploiement & support N1–N3", text: "Postes Windows 11, déploiement PXE/Proxmox, diagnostic matériel, logiciel et BIOS, documentation des interventions.", proof: "METM : Technicien Support N1/N2/N3" },
  { title: "Windows Server, Linux & Active Directory", text: "Comptes, groupes, droits d'accès, GPO, sauvegarde et restauration, supervision de la disponibilité.", proof: "Edil Techno . ADRTS . Licence Administrateur Systèmes & DevOps" },
  { title: "Réseaux segmentés et sécurisés", text: "VLAN, firewall, VPN, DNS/DHCP, routage et switching, diagnostic réseau.", proof: "CCNA · DEC en Réseautique et Sécurité Informatique  · projet Zero Trust" },
  { title: "Durcissement & détection", text: "Durcissement système, MFA SSH, gestion des identités (IAM), SIEM/IDS/IPS, analyse de vulnérabilités.", proof: "Projets MFA Linux Server, Zero Trust et IAM Authentik/OPA" },
];

export const ABOUT_FACTS: { label: string; value: string }[] = [
  { label: "Recherche", value: "Poste d'administrateur systèmes & réseaux sécurisés" },
  { label: "Formation", value: "Master Ingénieur Systèmes, Réseaux & Cybersécurité" },
  { label: "Localisation", value: "Meudon (92) · Paris et périphérie" },
  { label: "Mode de travail", value: "Présentiel ou télétravail" },
  // TODO: précise ton niveau d'anglais (ex. « B1 », « B2 ») plutôt que de laisser le recruteur deviner
  { label: "Langues", value: "Français · Anglais" },
  { label: "Centres d'intérêt", value: "Cyber & IA · Sport · Écriture · Dessin" },
];

export const ATOUTS: string[] = ["Rigoureux", "Autonome", "À l'écoute", "Apprentissage rapide", "Bonne capacité d'analyse"];

// Ordre = priorité pour la cible (systèmes & réseaux d'abord, sécurité défensive ensuite).
export const SKILLS: Skill[] = [
  { icon: "🖥️", title: "Systèmes", tags: ["Windows Server", "Linux", "Active Directory & GPO", "Durcissement des systèmes", "Sauvegarde et restauration", "Gestion des identités (IAM)", "Support N1/N2/N3"] },
  { icon: "🌐", title: "Réseaux", tags: ["TCP/IP", "DNS", "DHCP", "LAN . WAN", "WIFI",  "VLAN & segmentation", "Pfsense", "VPN", "Routage et switching", "Diagnostic et dépannage réseau"] },
  { icon: "🔐", title: "Sécurité défensive", tags: ["Sécurité Active Directory", "Audit de sécurité", "Analyse de vulnérabilités", "Gestion des risques IT", "SIEM (Splunk/Wazuh) · IDS/IPS (Snort) · AV/EDR", "Réponse aux incidents"] },
  { icon: "📊", title: "Supervision", tags: ["Nagios", "Zabbix", "Grafana", "Centreon", "Splunk", "Elastic", "Wazuh", "Snort"] },
  { icon: "☁️", title: "Virtualisation & Cloud", tags: ["VMware ESXi", "Proxmox", "Docker", "Kubernetes", "WSL", "AWS", "Azure", "Oracle Cloud"] },
  { icon: "⚡", title: "Scripting & Automatisation", tags: ["PowerShell", "Script Shell", "Python", "Ansible", "CI/CD"] },
  { icon: "🤖", title: "Outils IA", tags: ["Claude Code", "GitHub Copilot", "Cursor", "Serveur MCP", "Ollama"] },
];

// Les projets "défensifs / infra" passent en premier ; les 3 ★ sont les plus pertinents pour la cible.
export const PROJECTS: Project[] = [
  { image: "/images/zero-trust.png", gradient: "from-cyan-500/20 to-blue-500/10", title: "Zero Trust Network", status: "Terminé", category: "Systèmes & Réseaux", featured: true, tags: ["VPN", "Firewall", "Linux", "Networking"], desc: "Infrastructure réseau sécurisée avec segmentation, VPN, firewall et architecture Zero Trust complète.", url: "https://github.com/Hackthus/Zero-Trust" },
  { image: "/images/iam-authentik-architecture.png", gradient: "from-emerald-500/20 to-cyan-500/10", title: "Modern IAM Platform with Authentik & OPA", status: "Terminé", category: "Sécurité défensive", featured: true, tags: ["Docker Compose", "Authentik", "OpenID Connect", "OAuth2", "Open Policy Agent", "RBAC"], desc: "Plateforme IAM conteneurisée : Authentik comme fournisseur d'identité, OAuth2/OpenID Connect, JWT sécurisés, API Flask protégée et OPA pour un contrôle d'accès RBAC externalisé.", url: "https://github.com/Hackthus/iam-lab" },
  { image: "/images/mfa-linux-server.png", gradient: "from-green-500/20 to-cyan-500/10", title: "MFA Linux Server", status: "Terminé", category: "Sécurité défensive", featured: true, tags: ["Linux", "SSH", "MFA", "Hardening"], desc: "Sécurisation SSH Linux avec authentification multi-facteurs et durcissement système complet.", url: "https://github.com/Hackthus/MFA-Serveur-SSH-Linux/" },
  { image: "/images/docker-wordpress-stack.png", gradient: "from-sky-500/20 to-blue-500/10", title: "Docker WordPress Infrastructure", status: "Terminé", category: "Systèmes & Réseaux", tags: ["Docker", "WordPress", "Docker Compose", "MySQL", "Redis"], desc: "Infrastructure WordPress conteneurisée avec Docker Compose : MySQL, Redis, phpMyAdmin et automatisation via WP-CLI.", url: "https://github.com/Hackthus/docker-wordpress-stack" },
  { image: "/images/biometric-security.png", gradient: "from-blue-500/20 to-purple-500/10", title: "Sécurité Biométrique Aéroportuaire", status: "Terminé", category: "Sécurité défensive", tags: ["Biométrie", "Face Recognition", "Fingerprint", "AES-256", "RGPD", "IAM"], desc: "Conception d'un système de contrôle d'accès sécurisé pour les zones sensibles aéroportuaires, combinant reconnaissance faciale et empreintes digitales, avec chiffrement des données, journalisation des accès et gestion centralisée des identités.", url: "https://github.com/Hackthus/Projet-Cyber-2025" },
  { image: "/images/cybersecurity-wiki.png", gradient: "from-cyan-500/20 to-purple-500/10", title: "Cybersecurity Wiki", status: "En cours", category: "Offensif & CTF", featured: true, tags: ["Documentation", "Cybersecurity", "Linux", "Networking"], desc: "Wiki et documentation cybersécurité pour partage de connaissances techniques.", url: "https://hackthus.github.io/The-Hackers-237" },
  { image: "/images/sensibilisation-cyber.png", gradient: "from-blue-500/20 to-purple-500/10", title: "Sensibilisation Cyber", status: "Terminé", category: "Sécurité défensive", tags: ["Documentation", "Awareness", "Training"], desc: "Programme de sensibilisation à la cybersécurité pour entreprises et collaborateurs.", url: "https://github.com/Hackthus/Sensibilisation-Cyber" },
  { image: "/images/wreath-network.png", gradient: "from-purple-500/20 to-cyan-500/10", title: "Wreath Network Pentest", status: "Terminé", category: "Offensif & CTF", tags: ["Active Directory", "Pentest", "Windows", "Burp Suite"], desc: "Pentest d'un environnement Windows + Web en laboratoire, avec exploitation Active Directory.", url: "https://github.com/Hackthus/Wreath-Network" },
  { image: "/images/writeups-audits.png", gradient: "from-teal-500/20 to-green-500/10", title: "WriteUps & Audits", status: "En cours", category: "Offensif & CTF", tags: ["Audit", "Report", "CTF", "HackTheBox"], desc: "Rapports d'audit, analyses de vulnérabilités et write-ups CTF selon des méthodologies professionnelles.", url: "https://github.com/Hackthus/WriteUps" },
  { image: "/images/webspider.png", gradient: "from-red-500/20 to-orange-500/10", title: "WebSpider", status: "Terminé", category: "Offensif & CTF", tags: ["Python", "Web Security", "Automation", "OWASP"], desc: "Outil Python de test automatisé de sécurité web (XSS, SQLi, IDOR).", url: "https://github.com/Hackthus/Webspider" },
  { image: "/images/reverse-shell-generator.png", gradient: "from-purple-500/20 to-red-500/10", title: "Reverse Shell Generator", status: "Terminé", category: "Offensif & CTF", tags: ["Bash", "Pentest", "CTF", "Automation"], desc: "Générateur de reverse shells en Bash pour labs de cybersécurité, CTF, TryHackMe et Hack The Box.", url: "https://github.com/Hackthus/Reverse-Shell-Generator" },
  // TODO: remplacer par l'URL exacte du dépôt (ici : profil GitHub)
  { image: "/images/osint-finder.png", gradient: "from-orange-500/20 to-red-500/10", title: "OSINT Finder", status: "Terminé", category: "Offensif & CTF", tags: ["Python", "OSINT", "Reconnaissance"], desc: "Outil d'investigation OSINT pour la collecte d'informations open-source.", url: "https://github.com/Hackthus/Finder" },
];

// Expériences — reprises du CV. TODO : ajoute 1 résultat chiffré par poste
// (ex. « 40 postes déployés », « temps de déploiement réduit de X % ») si tu en as.
export const EXPERIENCE: ExperienceItem[] = [
  { period: "Mars 2026 - Aout 2026", title: "Technicien Support N1/N2/N3", org: "METM · Rosny-sous-Bois", isJob: true, points: [
    "Préparation, installation, configuration et déploiement de postes, serveurs, switch et firewall",
    "Administration des comptes utilisateurs, gestion des droits d'accès et support Active Directory",
    "Déploiement , supervision du réseau via logiciel de sécurité et monitoring : Wazuh, Zabbix et scanner de vulnérabilité Nessus",
    "Diagnostic et gestion des anomalies logicielles et matérielles ",
    "Automatisation des contrôles et vérifications techniques via des scripts shell, python et powershell",
    "Prise en charge des incidents techniques N1/N2/N3, escalade et suivi jusqu'à leur résolution",
    "Respect des procédures de déploiement et de contrôle qualité",
    "Documentation des interventions et mise à jour des procédures",
  ] },
  { period: "Mai 2022 - octobre. 2022", title: "Administrateur Systèmes et Réseaux", org: "Edil Techno · Douala, Cameroun", isJob: true, points: [
    "Administration des serveurs Windows/Linux et d'Active Directory (comptes, groupes, droits d'accès)",
    "Mise en place et administration des stratégies de groupe (GPO)",
    "Configuration et dépannage réseau : firewall, switch, routeur",
    "Automatisation des tâches d'administration (PowerShell, Bash, Python)",
    "Supervision des serveurs et équipements pour garantir la disponibilité",
    "Sauvegarde et restauration des données",
    "Documentation des interventions et mise à jour des procédures",
  ] },
];


export const EDUCATION: ExperienceItem[] = [
  { period: "2025 - 2026", title: "Master Ingénieur Systèmes, Réseaux et Cybersécurité", org: "Nexa Digital School · Paris", desc: "Administration systèmes, réseaux sécurisés, cybersécurité et cloud." },
  { period: "2025", title: "Master 1 Chef de Projet Cybersécurité", org: "Cyber Management School · Boulogne-Billancourt", desc: "Gouvernance cybersécurité, gestion des risques et sécurité des systèmes d'information." },
  { period: "2024", title: "Licence Administration Systèmes et DevOps", org: "École IT · Orléans", desc: "Administration Linux/Windows, virtualisation, cloud computing et automatisation." },
  { period: "2021 - 2023", title: "DEC Réseautique et Sécurité Informatique", org: "CCNB · Canada", desc: "Fondamentaux réseaux, sécurité et infrastructure." },
  { period: "2020", title: "L1 Sciences économiques et gestion appliquées", org: "Université de Douala · Cameroun", desc: "Économie, gestion, management, comptabilité et statistiques." },
];

// ✅ Renseigne verifyUrl (+ credentialId) pour chaque certification. Sans lien : « Vérification sur demande ».
export const CERTS: Cert[] = [
  { image: "/images/certs/adrts.jpeg", title: "ADRTS", sub: "Certified Active Directory Red Team Specialist", issuer: "", done: true, credentialId: "", verifyUrl: "https://labs.cyberwarfare.live/credential/achievement/6a424533265336623faedad6" },
  { image: "/images/certs/btf.png", title: "BTF", sub: "Certified Blue Team Fundamentals", issuer: "", done: true, credentialId: "", verifyUrl: "https://labs.cyberwarfare.live/credential/achievement/6aedea4b206a82a1584001a8" },
  { image: "/images/certs/cllmsp.png", title: "CLLMSP", sub: "Certified LLM Security Professional", issuer: "", done: true, credentialId: "", verifyUrl: "https://courses.redteamleaders.com/exam-completion/daac95c65d63bb89" },
  { image: "/images/certs/ccna.jpg", title: "CCNA", sub: "Cisco Certified Network Associate", issuer: "Cisco", done: true, credentialId: "", verifyUrl: "https://www.credly.com/earner/earned/badge/3bacbcd7-578f-4387-b576-e8adfe9479cc" },
  { image: "/images/certs/av-edr-evasion.png", title: "AV/EDR", sub: "AV/EDR Evasion Practical Techniques", issuer: "", done: true, credentialId: "", verifyUrl: "https://courses.redteamleaders.com/completion/155dd44fac7044f1" },
  
];

export const STATS: Stat[] = [
  { value: "5", label: "Certifications" },
  { value: "2", label: "Expériences pro" },
  { value: "30+", label: "Projets GitHub" },
  { value: 'Top1%', label: "Classement TryHackMe" },
  { value: "8+", label: "Certificats de complétion" },
  { value: "35+", label: "Badges numériques" },
];

export const TERMINAL_LINES: TerminalLine[] = [
  { prompt: true, text: "whoami" },
  { prompt: false, text: "arnold-edwin : administrateur systèmes, réseaux & cybersécurité", color: "text-green-400" },
  { prompt: true, text: "skills --top" },
  { prompt: false, text: "Windows Server  •  Linux  •  Active Directory  •  VLAN/VPN/Firewall  •  Proxmox/ESXi", color: "text-gray-300" },
  { prompt: true, text: "certifications --list" },
  { prompt: false, text: "ADRTS  •  CLLMSP  •  CCNA • AV/EDR", color: "text-gray-300" },
  { prompt: true, text: "status" },
  { prompt: false, text: "[DISPONIBLE] Île-de-France · présentiel ou télétravail", color: "text-green-400", pulse: true },
];

// Cisco NetAcad / TryHackMe — noms alignés sur le CV (+ 2 parcours TryHackMe absents du CV : à synchroniser).
export const AUTODIDACTE: string[] = [
  "Cisco NetAcad – Hacker éthique",
  "Cisco NetAcad – Principes de base du support client informatique",
  "Cisco NetAcad – Introduction à l'IoT",
  "Cisco NetAcad – Notions de base en matériel informatique",
  "TryHackMe – Jr Penetration Tester",
  "TryHackMe – Web Application Pentesting",
];

export interface Profile {
  name: string;
  handle: string;
  description: string;
  url: string; // vide = la carte n'est pas affichée
  icon: "github" | "linkedin" | "tryhackme" | "credly" | "other" | "hackthebox";
}

export const PROFILES: Profile[] = [
  { name: "GitHub", handle: "@Hackthus", description: "Projets, labs et outils", url: CONTACT.github, icon: "github" },
  { name: "LinkedIn", handle: "@arnold-edwin", description: "Parcours et recommandations", url: CONTACT.linkedin, icon: "linkedin" },
  { name: "TryHackMe", handle: "@Hackthus", description: "Salles, parcours et badges publics", url: CONTACT.tryhackme, icon: "tryhackme" },
  { name: "Credly", handle: "@arnold-edwin-fomedong", description: "Badges numériques vérifiables (Cisco…)", url: CONTACT.credly, icon: "credly" },
  { name: "HacktheBox", handle: "@hackthus", description: "Machines et challenges", url: CONTACT.hackthebox, icon: "tryhackme" },
  { name: "Root-Me", handle: "", description: "Challenges de sécurité", url: "", icon: "other" },
];