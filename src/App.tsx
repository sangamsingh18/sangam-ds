import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ChevronDown,
  ExternalLink,
  Code,
  Cpu,
  Database,
  Layers,
  Send,
  MapPin,
  Menu,
  X,
  GraduationCap,
  Calendar,
  Building2,
  Sun,
  Moon,
  Download,
  LineChart,
} from "lucide-react";

// Theme toggle hook
function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage first
    const saved = localStorage.getItem("theme");
    if (saved === "dark") return true;
    if (saved === "light") return false;
    // Default to system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    // Apply theme to document
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Save preference
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if no user preference is saved
      if (!localStorage.getItem("theme")) {
        setIsDark(e.matches);
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return { isDark, toggleTheme };
}

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.74] },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08 } },
};

// Skill data
const skillCategories = [
  {
    title: "Programming Languages",
    icon: Code,
    skills: ["Python", "C++", "C", "SQL", "Java"],
  },
  {
    title: "Data Science & AI",
    icon: Cpu,
    skills: ["Data Analytics", "Machine Learning", "Deep Learning", "Generative AI", "EDA"],
  },
  {
    title: "Libraries & Frameworks",
    icon: Layers,
    skills: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Scikit-learn", "TensorFlow", "OpenCV", "React", "Node.js"],
  },
  {
    title: "Tools & Core CS",
    icon: Database,
    skills: ["Git", "GitHub", "APIs", "VS Code", "Jupyter", "DSA", "OOPs", "DBMS", "OS"],
  },
];

// Projects data
const projects = [
  {
    title: "loan-approval-system-ml ",
    description:
      "An end-to-end machine learning project for loan approval prediction involving data cleaning, feature engineering, model building, and evaluation.",
    tech: ["Pandas", "Numpy", "Matplotlib", "Seaborn", "scikit-learn", "Streamlit"],
    featured: true,
    github: "https://github.com/sangamsingh18"
  },
  {
    title: "blinkit-sales-dashboard",
    description:
      "AI-powered system that identifAn interactive Power BI dashboard showcasing Blinkit sales analysis, including revenue, order trends, and category-wise performance",
    tech: ["Power BI", "DAX", "Data Visualization", "Data Analysis"],
    featured: true,
    github: "https://github.com/sangamsingh18",
  },
  {
    title: "customer-churn-analysis",
    description:
      "A data analysis project focused on understanding and analyzing customer churn using Python",
    tech: ["Pandas", "Numpy", "Matplotlib", "Seaborn"],
    featured: false,
    github: "https://github.com/sangamsingh18",
  },
  {
    title: "flipkart-product-scraper",
    description:
      "Flipkart web scraping project using Python to extract product details like price, rating, and reviews.",
    tech: ["Pandas", "Numpy", "Python", "BeautifulSoup", "requests", "CSV","HTML"],
    featured: false,
    github: "https://github.com/sangamsingh18",
  },
  {
    title: "Academic Projects",
    description:
      "Collection of academic projects including data structures implementations, algorithm visualizations, database management systems, and computer graphics applications.",
    tech: ["C++", "Java", "SQL", "Python",],
    featured: false,
    github: "https://github.com/sangamsingh18",
  },
];

// Navigation items
const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

function App() {
  const { isDark, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formErrors, setFormErrors] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const { scrollYProgress } = useScroll();
  const headerBg = useTransform(
    scrollYProgress,
    [0, 0.05],
    isDark 
      ? ["rgba(15, 23, 42, 0)", "rgba(15, 23, 42, 0.95)"]
      : ["rgba(248, 250, 252, 0)", "rgba(248, 250, 252, 0.95)"]
  );
  const headerBorder = useTransform(
    scrollYProgress,
    [0, 0.05],
    isDark
      ? ["rgba(51, 65, 85, 0)", "rgba(51, 65, 85, 1)"]
      : ["rgba(226, 232, 240, 0)", "rgba(226, 232, 240, 1)"]
  );

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.slice(1));
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const validateForm = () => {
    const errors = { name: "", email: "", message: "" };
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
      isValid = false;
    } else if (formData.message.length < 10) {
      errors.message = "Message must be at least 10 characters";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({ name: "", email: "", message: "" });

    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans selection:bg-blue-100 selection:text-blue-900 dark:selection:bg-blue-900/30 dark:selection:text-blue-300 transition-colors duration-300">
      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:60px_60px] dark:bg-[linear-gradient(rgba(51,65,85,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(51,65,85,0.2)_1px,transparent_1px)]" />
      </div>

      {/* Header */}
      <motion.header
        style={{ backgroundColor: headerBg, borderBottomColor: headerBorder }}
        className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#home");
              }}
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-9 h-9 rounded-lg bg-slate-900 dark:bg-white flex items-center justify-center">
                <span className="text-white dark:text-slate-900 font-bold text-lg">SS</span>
              </div>
              <span className="text-slate-900 dark:text-slate-100 font-semibold hidden sm:block">Sangam Singh</span>
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className={`relative px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-lg ${
                    activeSection === item.href.slice(1)
                      ? "text-blue-700 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20"
                      : "text-slate-700 hover:text-slate-950 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Social Links & Theme Toggle */}
            <div className="hidden lg:flex items-center gap-2">
              {[
                { icon: Github, href: "https://github.com/sangamsingh18", label: "GitHub" },
                { icon: Linkedin, href: "www.linkedin.com/in/sangam-singh-94a52633b", label: "LinkedIn" },
                { icon: Mail, href: "mailto:singhsangam1800@gmail.com", label: "Email" },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all duration-200 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
              
              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                className="p-2.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all duration-200 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: isMenuOpen ? "auto" : 0,
            opacity: isMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.74] }}
          className="lg:hidden overflow-hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700"
        >
          <nav className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className={`block w-full text-left px-4 py-3 text-base font-semibold rounded-lg transition-colors ${
                  activeSection === item.href.slice(1)
                    ? "text-blue-700 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20"
                    : "text-slate-700 hover:text-slate-950 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="flex items-center justify-between px-4 pt-3 pb-1 border-t border-slate-100 dark:border-slate-700 mt-3">
              <div className="flex gap-2">
                {[
                  { icon: Github, href: "https://github.com/sangamsingh18", label: "GitHub" },
                  { icon: Linkedin, href: "www.linkedin.com/in/sangam-singh-94a52633b", label: "LinkedIn" },
                  { icon: Mail, href: "singhsangam1800@gmail.com", label: "Email" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 dark:text-slate-400 dark:hover:text-blue-400 dark:hover:bg-blue-900/20"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
              
              {/* Mobile Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all duration-200 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                {isDark ? "Light Mode" : "Dark Mode"}
              </button>
            </div>
          </nav>
        </motion.div>
      </motion.header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center pt-16 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Content */}
              <motion.div
                initial="initial"
                animate="animate"
                variants={staggerContainer}
                className="order-2 lg:order-1"
              >
                <motion.div variants={fadeInUp} className="mb-6">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 text-sm font-medium rounded-full border border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Available for opportunities
                  </span>
                </motion.div>

                <motion.h1
                  variants={fadeInUp}
                  className="hero-heading text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
                  style={{ color: isDark ? '#f1f5f9' : '#020617' }}
                >
                  Hi, I&apos;m{" "}
                  <span className="text-blue-700 dark:text-blue-400">Sangam Singh</span>
                </motion.h1>

                <motion.p
                  variants={fadeInUp}
                  className="hero-subtitle text-xl sm:text-2xl mb-6 font-semibold"
                  style={{ color: isDark ? '#94a3b8' : '#1e293b' }}
                >
                  Computer Science & AI Enthusiast
                </motion.p>

                <motion.div variants={fadeInUp} className="flex flex-wrap gap-2 mb-8">
                  {[ "Data Science", "Data Analysis","Data Structures","full-stack developer"].map((skill) => (
                    <span
                      key={skill}
                      className="skill-chip px-3 py-1.5 text-sm font-bold rounded-lg border-2"
                      style={{
                        backgroundColor: isDark ? '#334155' : '#f1f5f9',
                        color: isDark ? '#e2e8f0' : '#0f172a',
                        borderColor: isDark ? '#475569' : '#64748b'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </motion.div>

                <motion.p
                  variants={fadeInUp}
                  className="hero-paragraph text-lg mb-10 leading-relaxed max-w-xl font-medium"
                  style={{ color: isDark ? '#94a3b8' : '#334155' }}
                >
                  I&apos;m a passionate Computer Science student specializing in Artificial
                  Intelligence and Machine Learning. I love building intelligent systems that
                  solve real-world problems and make a positive impact on society.
                </motion.p>

                <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                  <motion.button
                    onClick={() => scrollToSection("#projects")}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg shadow-blue-200 dark:shadow-blue-900/30"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Projects
                    <ChevronDown className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = '/resume.pdf';
                      link.download = 'Sangam_Singh_Data_Analyst_Resume.pdf';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-700 font-semibold rounded-xl border-2 border-slate-200 hover:border-blue-300 hover:text-blue-600 transition-all duration-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 dark:hover:border-blue-500 dark:hover:text-blue-400"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Download Resume
                    <Download className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    onClick={() => scrollToSection("#contact")}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-700 font-semibold rounded-xl border-2 border-slate-200 hover:border-blue-300 hover:text-blue-600 transition-all duration-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 dark:hover:border-blue-500 dark:hover:text-blue-400"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Contact Me
                    <Mail className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              </motion.div>

              {/* Right Content - Profile Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.74] }}
                className="order-1 lg:order-2 flex justify-center"
              >
                <div className="relative">
                  {/* Decorative Ring */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-100 to-slate-200 blur-2xl opacity-60" />
                  
                  {/* Profile Image Container */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative w-64 h-64 sm:w-80 sm:h-80"
                  >
                    <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl">
                      <img
                      src="/SANGAM.jpg"
                      alt="Sangam Singh"
                      className="w-full h-full object-cover"
                    />

                    </div>
                    
                    {/* Sparkle Icon */}
                    <motion.div
                      animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute -top-2 -right-2 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg"
                    >
                      <LineChart className="w-6 h-6 text-blue-600" />
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2 text-slate-600 dark:text-slate-400"
            >
              <span className="text-sm font-bold">Scroll to explore</span>
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 lg:py-32 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                About Me
              </h2>
              <div className="w-20 h-1.5 bg-blue-600 rounded-full" />
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700"
              >
                <h3 className="text-xl font-bold text-slate-950 dark:text-slate-100 mb-4">
                  Who I Am
                </h3>
                <p className="text-slate-800 dark:text-slate-400 leading-relaxed text-lg font-medium">
                  I am Sangam Singh, a motivated Computer Science student with a strong interest in AI, Machine Learning, and software development. I enjoy learning new technologies, building practical projects, and continuously improving my problem-solving skills.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700"
              >
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-3">
                  <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  Education
                </h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 bg-blue-600 rounded-full" />
                      <div className="w-0.5 h-full bg-slate-200 dark:bg-slate-700 mt-2" />
                    </div>
                    <div className="pb-6">
                      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm mb-1">
                        <Calendar className="w-4 h-4" />
                        <span>2023 – 2027</span>
                      </div>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                        B.Tech in Computer Science & Engineering
                      </h4>
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mt-1">
                        <Building2 className="w-4 h-4" />
                        <span>Parul University, Vadodara</span>
                      </div>
                      <span className="inline-block mt-3 px-3 py-1 bg-green-50 text-green-700 text-sm font-medium rounded-full border border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
                        Expected Graduation: 2027--
                        CGPA - 8.15
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24 lg:py-32 bg-slate-50 dark:bg-slate-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Skills & Technologies
              </h2>
              <div className="w-20 h-1.5 bg-blue-600 rounded-full" />
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6">
              {skillCategories.map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                      <category.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-950 dark:text-slate-100">
                      {category.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg border border-slate-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors duration-200 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 dark:hover:border-blue-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-24 lg:py-32 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Experience
              </h2>
              <div className="w-20 h-1.5 bg-blue-600 rounded-full" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                    Admission Assistant Intern
                  </h3>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <Building2 className="w-4 h-4" />
                    <span className="font-medium">Parul University</span>
                    <span className="text-slate-400 dark:text-slate-500">•</span>
                    <span>In-Office Internship</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg border border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800">
                  <Calendar className="w-4 h-4" />
                  March 2025 – November 2025
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-3">Tools Used:</p>
                <div className="flex flex-wrap gap-2">
                  {["Excel", "Google Sheets", "CRM Software"].map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1.5 bg-white text-slate-700 text-sm font-medium rounded-lg border border-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <ul className="space-y-4">
                {[
                  "Managed and updated admission data for 1000+ student applications, ensuring high accuracy across departments.",
                  "Assisted prospective students by responding to inquiries and guiding them through the application and enrollment process.",
                  "Collaborated with faculty members and counselors to improve student engagement and streamline the overall admission workflow.",
                  "Strengthened time management, organizational, communication, and marketing skills through hands-on responsibilities.",
                ].map((item, index) => (
                  <li key={index} className="flex gap-3 text-slate-800 dark:text-slate-400">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2.5 flex-shrink-0" />
                    <span className="leading-relaxed font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 lg:py-32 bg-slate-50 dark:bg-slate-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Projects
              </h2>
              <div className="w-20 h-1.5 bg-blue-600 rounded-full" />
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="group bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span className="px-2.5 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full border border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800">
                        Featured
                      </span>
                    )}
                  </div>

                  <p className="text-slate-800 dark:text-slate-400 leading-relaxed mb-6 flex-grow font-medium">
                    {project.description}
                  </p>

                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-md border border-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-800 transition-colors duration-200 dark:bg-slate-700 dark:hover:bg-slate-600"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Github className="w-4 h-4" />
                    View Code
                    <ExternalLink className="w-3.5 h-3.5" />
                  </motion.a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Opportunities Section */}
        <section className="py-24 lg:py-32 bg-white dark:bg-slate-900">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-8 sm:p-12 text-center border border-slate-200 dark:border-slate-700"
            >
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                Currently Open To
              </h3>
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                {["Internships", "Collaborations", "Entry-Level Roles"].map((opportunity) => (
                  <span
                    key={opportunity}
                    className="px-5 py-2.5 bg-white text-slate-700 text-sm font-semibold rounded-xl border border-slate-200 shadow-sm dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600"
                  >
                    {opportunity}
                  </span>
                ))}
              </div>
              <p className="text-slate-800 dark:text-slate-400 text-lg font-medium">
                Open to opportunities in AI, ML, and Software Development
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 lg:py-32 bg-slate-50 dark:bg-slate-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Get In Touch
              </h2>
              <div className="w-20 h-1.5 bg-blue-600 rounded-full" />
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="space-y-4"
              >
                {[
                  { icon: Mail, label: "Email", value: "singhsangam1800@gmail.com", href: "singhsangam1800@gmail.com" },
                  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/sangamsingh", href: "https://linkedin.com/in/sangam-singh-94a52633b" },
                  { icon: Github, label: "GitHub", value: "github.com/sangamsingh", href: "https://github.com/sangamsingh18" },
                  { icon: MapPin, label: "Location", value: "Vadodara, India", href: null },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 dark:bg-slate-800 dark:border-slate-700 dark:hover:border-blue-500"
                  >
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 dark:bg-blue-900/20">
                      <item.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 font-bold">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-slate-950 dark:text-slate-100 font-bold hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-slate-950 dark:text-slate-100 font-bold">{item.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm dark:bg-slate-800 dark:border-slate-700"
              >
                {submitSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center py-12"
                  >
                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4 dark:bg-green-900/20">
                      <Send className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">Message Sent!</h3>
                    <p className="text-slate-600 dark:text-slate-400">Thank you for reaching out. I&apos;ll get back to you soon.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-bold text-slate-900 dark:text-slate-300 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-4 py-3 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 dark:bg-slate-700 dark:text-slate-100 ${
                          formErrors.name ? "border-red-300" : "border-slate-300 dark:border-slate-600"
                        }`}
                        placeholder="Your name"
                      />
                      {formErrors.name && (
                        <p className="mt-1.5 text-sm text-red-600 font-medium">{formErrors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-bold text-slate-900 dark:text-slate-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-4 py-3 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 dark:bg-slate-700 dark:text-slate-100 ${
                          formErrors.email ? "border-red-300" : "border-slate-300 dark:border-slate-600"
                        }`}
                        placeholder="your.email@example.com"
                      />
                      {formErrors.email && (
                        <p className="mt-1.5 text-sm text-red-600 font-medium">{formErrors.email}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-bold text-slate-900 dark:text-slate-300 mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className={`w-full px-4 py-3 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 resize-none dark:bg-slate-700 dark:text-slate-100 ${
                          formErrors.message ? "border-red-300" : "border-slate-300 dark:border-slate-600"
                        }`}
                        placeholder="Your message..."
                      />
                      {formErrors.message && (
                        <p className="mt-1.5 text-sm text-red-600 font-medium">{formErrors.message}</p>
                      )}
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-blue-200 dark:shadow-blue-900/30"
                      whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">SS</span>
              </div>
              <span className="text-lg font-semibold">Sangam Singh</span>
            </div>

            <div className="flex items-center gap-6">
              {navItems.slice(0, -1).map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-slate-400 hover:text-white text-sm font-medium transition-colors duration-200"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {[
                { icon: Github, href: "https://github.com", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                { icon: Mail, href: "mailto:contact@example.com", label: "Email" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-800 text-center">
            <p className="text-slate-400 text-sm">
              © @sangam__singh_{" "}
              <span className="text-red-500"></span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
