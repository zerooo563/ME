"use client";

import React, { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SplineScene } from "@/components/ui/SplineScene";
import { Spotlight } from "@/components/ui/spotlight";
import { Header } from "@/components/ui/header";
import { TidalCursor } from "@/components/ui/tidal-cursor";
import { GlassmorphismPortfolioBlock } from "@/components/ui/glassmorphic-portfolio-block-shadcnui";
import Globe from "@/components/ui/globe";
import { Card3DList, CardDataAnimated } from "@/components/ui/animated-3d-card";
import { cn } from "@/lib/utils";
import {
  LineChart,
  BarChart,
  Database,
  X,
  Upload,
  Award,
  CheckCircle,
  Brain,
} from "lucide-react";

// ── Section wrapper (plain, no glow) ──────────────────────────────────────────
function SectionWrapper({ children }: { children: React.ReactNode }) {
  return <div className="relative w-full h-full">{children}</div>
}

// ── Certificate Upload Types ───────────────────────────────────────────────────
type CertImage = {
  url: string;
  name: string;
};

// ── Project modal types ────────────────────────────────────────────────────────
type ProjectCardData = {
  id: string;
  category: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  theme: string;
  detailedContent: React.ReactNode;
};

// ── Certificate Upload Card ────────────────────────────────────────────────────
function CertificateUploadCard({
  index,
  cert,
  onUpload,
}: {
  index: number;
  cert: CertImage | null;
  onUpload: (index: number, file: File) => void;
}) {
  const fileRef = React.useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (file: File) => {
    onUpload(index, file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleFile(e.target.files[0]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.8, duration: 0.8, ease: "easeOut" }}
      className={cn(
        "relative w-full max-w-sm rounded-3xl overflow-hidden group cursor-pointer",
        dragging
          ? "ring-2 ring-primary bg-primary/20 scale-[1.02]"
          : "bg-white/[0.03]"
      )}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => fileRef.current?.click()}
    >

      <input
        ref={fileRef}
        type="file"
        accept="image/*,application/pdf"
        className="hidden"
        onChange={handleChange}
        onClick={(e) => e.stopPropagation()}
      />

      {cert ? (
        /* ── Uploaded state ── */
        <div className="relative p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wide">
                تم الرفع
              </span>
            </div>
            <Award className="w-5 h-5 text-amber-400/70" />
          </div>

          {/* Preview if image */}
          {cert.url && (
            <div className="w-full h-40 rounded-2xl overflow-hidden">
              <img
                src={cert.url}
                alt={cert.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <p className="text-xs text-neutral-300 truncate">{cert.name}</p>
        </div>
      ) : (
        /* ── Empty/Upload state ── */
        <div className="p-8 flex flex-col items-center justify-center gap-4 min-h-[240px]">
          <motion.div
            animate={{ y: dragging ? -6 : [0, -4, 0] }}
            transition={dragging ? { duration: 0.2 } : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className={cn(
              "w-16 h-16 rounded-2xl flex items-center justify-center",
              dragging ? "bg-primary/20" : "bg-white/[0.04]"
            )}
          >
            <Upload className={cn("w-7 h-7", dragging ? "text-primary" : "text-neutral-400")} />
          </motion.div>

          <div className="text-center space-y-1">
            <p className="text-sm font-semibold text-neutral-200">
              الشهادة {index === 0 ? "الأولى" : "الثانية"}
            </p>
            <p className="text-xs text-neutral-500 leading-relaxed">
              {dragging ? "أفلت الملف هنا..." : "اسحب وأفلت أو اضغط للرفع"}
            </p>
            <p className="text-[10px] text-neutral-600">PNG, JPG, PDF</p>
          </div>
        </div>
      )}
    </motion.div>
  );
}

// ── Main Page Component ────────────────────────────────────────────────────────
export default function Page() {
  const [selectedCard, setSelectedCard] = useState<ProjectCardData | null>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | "spss" | "web-dev" | "ai" | "math-models">("all");
  const [certificates, setCertificates] = useState<(CertImage | null)[]>([
    { url: "/certificates/university-certificate.jpeg", name: "شهادة الجامعة" },
    { url: "/certificates/course-certificate.jpg", name: "شهادة الدورة" },
  ]);

  const handleCertUpload = useCallback((index: number, file: File) => {
    const url = file.type.startsWith("image/") ? URL.createObjectURL(file) : "";
    setCertificates((prev) => {
      const next = [...prev];
      next[index] = { url, name: file.name };
      return next;
    });
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // ── Project cards (modal popup) ──────────────────────────────────────────────
  const projectCards: ProjectCardData[] = [
    {
      id: "spss-smartphone",
      category: "spss",
      title: "The Impact of Smartphone Addiction on Students at Palestine Technical University – Kadoorie",
      description: "مشاريع إحصاءيه باستخدام spss",
      icon: <BarChart />,
      theme: "info",
      detailedContent: (
        <div className="space-y-4 text-right text-neutral-300" dir="rtl">
          <p>بحث إحصائي يستخدم SPSS لتحليل تأثير إدمان الهواتف الذكية على الطلاب في جامعة فلسطين التقنية – خضوري.</p>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-5 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            📥 تحميل المشروع
          </a>
        </div>
      ),
    },
    {
      id: "spss-research-skills",
      category: "spss",
      title: "ما مدى تطبيق مهارات البحث العلمي في مشاريع تخرج طلبة كلية العلوم من وجهة نظرهم",
      description: "مشاريع إحصاءيه باستخدام spss",
      icon: <Database />,
      theme: "primary",
      detailedContent: (
        <div className="space-y-4 text-right text-neutral-300" dir="rtl">
          <p>دراسة تحليلية تقيس مدى تطبيق مهارات البحث العلمي في مشاريع التخرج لدى طلبة كلية العلوم.</p>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-5 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            📥 تحميل المشروع
          </a>
        </div>
      ),
    },
    {
      id: "portfolio-3d",
      category: "web-dev",
      title: "تطوير موقع يعرض ملف إنجازي بتقنيات 3D",
      description: "React, JavaScript, Three.js, Next.js",
      icon: <LineChart />,
      theme: "info",
      detailedContent: (
        <div className="space-y-4 text-right text-neutral-300" dir="rtl">
          <p>موقع ويب تفاعلي ثلاثي الأبعاد يعرض ملف الإنجاز الشخصي باستخدام أحدث تقنيات الويب:</p>
          <ul className="list-disc list-inside space-y-1 text-neutral-400 text-sm">
            <li>React + Next.js</li>
            <li>Three.js / Spline للرسوم ثلاثية الأبعاد</li>
            <li>Framer Motion للحركات التفاعلية</li>
            <li>Tailwind CSS للتصميم المتجاوب</li>
          </ul>
        </div>
      ),
    },
    {
      id: "sir-epidemic",
      category: "math-models",
      title: "SIR Epidemic Simulator",
      description: "محاكاة رياضية لانتشار الأوبئة باستخدام المعادلات التفاضلية",
      icon: <LineChart />,
      theme: "info",
      detailedContent: (
        <div className="space-y-4 text-right text-neutral-300" dir="rtl">
          <p>مشروع SIR Epidemic Simulator هو تطبيق ويب تفاعلي يحاكي انتشار الأوبئة باستخدام المعادلات التفاضلية الرياضية. يوفر التطبيق لوحة تحكم متطورة تتيح للمستخدمين التحكم في معايير العدوى والتعافي وتصور منحنيات الوباء بيانياً بدقة.</p>
          <div className="flex flex-wrap gap-3 mt-4">
            <a
              href="https://abedalrahman-project.streamlit.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-5 py-2 rounded-xl bg-white text-black font-semibold text-sm"
            >
              🌐 زيارة التطبيق
            </a>
            <a
              href="/certificates/SIR-model.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-5 py-2 rounded-xl bg-neutral-800 text-neutral-200 font-semibold text-sm"
            >
              📥 تحميل المشروع
            </a>
          </div>
        </div>
      ),
    },
    {
      id: "math-ai-agents",
      category: "ai",
      title: "ذكاء إصطناعي لحل أعقد المساءل الرياضيه",
      description: "React, Vite, Tailwind, Gemini API",
      icon: <Brain />,
      theme: "primary",
      detailedContent: (
        <div className="space-y-4 text-right text-neutral-300" dir="rtl">
          <p>نظام ويب يحل المعادلات عبر 5 وكلاء ذكاء اصطناعي (Solver → Critic → Judge → Visualizer → Explainer) باستخدام Gemini API. مبني بـ React + Vite + Tailwind.</p>
          <div className="flex flex-wrap gap-3 mt-4">
            <a
              href="/certificates/math-ai-project.zip"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-5 py-2 rounded-xl bg-white text-black font-semibold text-sm"
            >
              📥 تحميل المشروع
            </a>
          </div>
        </div>
      ),
    },
  ];

  // ── Animated 3D cards for the grid ──────────────────────────────────────────
  const animatedCards: CardDataAnimated[] = useMemo(
    () =>
      projectCards
        .filter((c) => activeFilter === "all" || c.category === activeFilter)
        .map((c) => ({
          id: c.id,
          title: c.title,
          description: c.description,
          icon: c.icon,
          theme: (c.theme as any) ?? "primary",
          onClick: () => setSelectedCard(c),
        })),
    [activeFilter]
  );

  return (
    <main className="bg-background text-foreground relative font-sans">

      <TidalCursor />

        <Header />

        {/* ── Glowing stars background ── */}
        <div className="fixed inset-0 pointer-events-none z-0">
          {[
            { left: "5%", top: "8%" }, { left: "92%", top: "15%" },
            { left: "12%", top: "72%" }, { left: "85%", top: "65%" },
            { left: "45%", top: "5%" }, { left: "70%", top: "88%" },
            { left: "22%", top: "35%" }, { left: "60%", top: "12%" },
            { left: "8%", top: "50%" }, { left: "95%", top: "45%" },
            { left: "35%", top: "22%" }, { left: "78%", top: "35%" },
            { left: "50%", top: "78%" }, { left: "30%", top: "92%" },
            { left: "65%", top: "55%" }, { left: "40%", top: "60%" },
            { left: "3%", top: "25%" }, { left: "97%", top: "80%" },
            { left: "55%", top: "42%" }, { left: "20%", top: "15%" },
          ].map((pos, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 bg-white rounded-full"
              style={{
                left: pos.left,
                top: pos.top,
                opacity: 0.15 + (i % 5) * 0.08,
                animation: `twinkle ${3 + (i % 4)}s ${i * 0.5}s infinite`,
                boxShadow: `0 0 ${2 + (i % 3)}px rgba(255,255,255,0.3)`,
              }}
            />
          ))}
        </div>

      {/* ═══════════════════ SECTION 1: Hero ═══════════════════ */}
      <section id="hero" className="w-full h-screen flex items-center justify-center p-4 md:p-24 snap-start relative z-10">
        <SectionWrapper>
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

        <div className="flex flex-col md:flex-row h-full w-full items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="flex-1 p-8 md:p-12 relative z-20 flex flex-col justify-center text-right"
              dir="rtl"
            >
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 leading-tight"
              >
                Abed Alrahman Abd Albake
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                className="mt-4 text-neutral-400 max-w-lg text-sm md:text-base font-semibold tracking-wider uppercase"
                dir="ltr"
              >
                Abdulrahman Iyad
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                className="mt-6 text-neutral-300 max-w-lg leading-relaxed text-sm md:text-base"
              >
                مطور واجهات ومختص رياضيات يسعى لتبسيط العلوم من خلال البرمجة والتفاعلية البصرية.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.1, ease: "easeOut" }}
                className="mt-8 flex flex-col sm:flex-row gap-4 justify-end"
              >
                <button
                  onClick={() => scrollToSection("about-me-section")}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-black font-semibold text-sm cursor-pointer"
                >
                  من أنا والروابط ↓
                </button>
                <button
                  onClick={() => scrollToSection("projects-section")}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-neutral-700 bg-neutral-900 text-white font-semibold text-sm cursor-pointer"
                >
                  المحفظة والمشاريع ↓
                </button>
              </motion.div>
            </motion.div>

            <div className="flex-1 relative w-full z-10 overflow-visible pointer-events-none md:pointer-events-auto">
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center h-[70vh]"
                style={{ filter: 'hue-rotate(200deg) brightness(2.0) saturate(1.0)' }}>
                <div className="w-full h-full scale-[0.85] md:scale-[1.0] origin-bottom">
                  <SplineScene
                    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </SectionWrapper>
      </section>

      {/* ═══════════════════ SECTION 2: About Me ═══════════════════ */}
      <section id="about-me-section" className="w-full h-screen flex flex-col items-center justify-center p-4 md:p-8 snap-start relative z-10">
        <SectionWrapper>
        <Spotlight className="-top-40 left-0 md:left-40 md:-top-20" fill="#0ea5e9" />

        <div className="w-full max-w-7xl mx-auto relative z-20 px-6 lg:px-8">
          <GlassmorphismPortfolioBlock />
        </div>

        <div className="absolute bottom-6 z-20 flex gap-4">
          <button
            onClick={() => scrollToSection("certificates-section")}
            className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-neutral-900/80 text-neutral-400 text-xs font-medium cursor-pointer"
          >
            الشهادات ↓
          </button>
        </div>
        </SectionWrapper>
      </section>   

      {/* ═══════════════════ SECTION 3: Certificates ═══════════════════ */}
      <section
        id="certificates-section"
        className="w-full min-h-screen flex flex-col items-center justify-center p-4 md:p-12 snap-start relative overflow-hidden z-10"
      >
        <SectionWrapper>

        {/* ── Content: Globe on Right, Certs on Left ── */}
        <div className="relative z-20 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: Certificates */}
          <div className="flex-1 flex flex-col items-center lg:items-start gap-8">
            <div className="text-center lg:text-right space-y-3">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 mb-2">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-xs text-amber-300 font-semibold tracking-widest uppercase">الشهادات والإنجازات</span>
                </div>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
                className="text-3xl md:text-4xl font-extrabold tracking-tight text-white"
              >
                شهاداتي الأكاديمية
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
                className="text-sm text-neutral-400 max-w-md leading-relaxed"
              >
                ارفع شهاداتك الأكاديمية والمهنية للعرض — اسحب وأفلت أو اضغط على البطاقة.
              </motion.p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start w-full">
              {certificates.map((cert, i) => (
                <CertificateUploadCard
                  key={i}
                  index={i}
                  cert={cert}
                  onUpload={handleCertUpload}
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 2.2 }}
            >
              <span className="text-xs text-neutral-600">
                {certificates.filter(Boolean).length} / 2 شهادة مرفوعة
              </span>
            </motion.div>
          </div>

          {/* Right: Globe */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 2.9, ease: "easeOut" }}
            className="flex-1 flex items-center justify-center"
          >
            <div className="scale-110 md:scale-125">
              <Globe />
            </div>
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="absolute bottom-6 z-20 flex gap-4">
          <button
            onClick={() => scrollToSection("projects-section")}
            className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-neutral-900/80 text-neutral-400 text-xs font-medium cursor-pointer"
          >
            استعراض المشاريع ↓
          </button>
        </div>
        </SectionWrapper>
      </section>

      {/* ═══════════════════ SECTION 4: Projects ═══════════════════ */}
      <section
        id="projects-section"
        className="w-full min-h-screen flex flex-col items-center p-4 md:p-12 snap-start relative z-10 pt-20"
      >
        <SectionWrapper>
        {/* Header */}
        <header className="text-center mb-10 space-y-4 w-full">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-neutral-50"
          >
            المحفظة الأكاديمية والمهنية
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, delay: 0.2, ease: "easeOut" }}
            className="text-sm md:text-base text-neutral-400 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            جسر يربط بين صرامة الرياضيات التطبيقية وعمق التحليل الإحصائي البيداغوجي.
          </motion.p>
        </header>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
           transition={{ duration: 0.2, delay: 0.4, ease: "easeOut" }}
           className="flex flex-wrap justify-center gap-2 mb-10 bg-neutral-900/50 p-2 rounded-2xl"
        >
          {[
            { id: "all", label: "جميع المشاريع" },
            { id: "spss", label: "SPSS مشاريع إحصاءيه" },
            { id: "web-dev", label: "تطوير المواقع" },
            { id: "ai", label: "بناء ذكاء إصطناعي" },
            { id: "math-models", label: "النماذج الرياضيه" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs md:text-sm font-semibold",
                activeFilter === tab.id
                  ? "bg-white text-black shadow"
                  : "text-neutral-400"
              )}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* ── Animated 3D cards grid ── */}
        <div className="w-full max-w-7xl mx-auto mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, delay: 0.6, ease: "easeOut" }}
            >
              {animatedCards.length > 0 ? (
                <Card3DList
                  cards={animatedCards}
                  columns={3}
                  gap="lg"
                  size="md"
                  variant="premium"
                  animated={true}
                />
              ) : (
                <div className="text-center text-neutral-500 py-20">
                  لا توجد مشاريع في هذه الفئة بعد.
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Back to top */}
        <div className="mt-auto pb-10">
          <button
            onClick={() => scrollToSection("hero")}
            className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-neutral-900/80 text-neutral-400 text-xs font-medium cursor-pointer"
          >
            ↑ العودة للرئيسية
          </button>
        </div>
        </SectionWrapper>
      </section>

      {/* ── Project detail modal ── */}
      <AnimatePresence>
        {selectedCard && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCard(null)}
              className="absolute inset-0 bg-black/60"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-neutral-900 rounded-3xl overflow-hidden z-10 flex flex-col max-h-[85vh]"
            >
              <div className="flex justify-between items-center px-6 py-4">
                <button
                  onClick={() => setSelectedCard(null)}
                  className="p-2 rounded-xl bg-neutral-800 text-neutral-400"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-3 flex-row-reverse">
                  <span className="text-xl font-bold text-white text-right">{selectedCard.title}</span>
                </div>
              </div>

              <div className="p-6 overflow-y-auto">{selectedCard.detailedContent}</div>

              <div className="p-4 bg-neutral-950 flex justify-start">
                <button
                  onClick={() => setSelectedCard(null)}
                  className="px-5 py-2 rounded-xl text-sm font-semibold bg-neutral-800 text-neutral-200"
                >
                  إغلاق
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}