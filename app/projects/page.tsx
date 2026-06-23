"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card3D } from "@/components/ui/Card3D";
import { CardData } from "@/types";
import {
  LineChart,
  BarChart,
  Calculator,
  Database,
  Coffee,
  Gamepad2,
  X
} from "lucide-react";

export default function PortfolioPage() {
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | "math-data" | "pedagogy" | "marketing-gaming">("all");

  const cards: CardData[] = [
    {
      id: "sir-model",
      category: "math-data",
      title: "نمذجة انتشار الأوبئة (SIR Model)",
      description: "دراسة كمية متكاملة لنمذجة انتشار الأوبئة رياضياً وتحليل رقم التكاثر الأساسي (R0). المحاكاة تمت برمجياً بـ Python بناءً على عينات مدروسة.",
      icon: <LineChart />,
      theme: "danger",
      detailedContent: (
        <div className="space-y-4 text-right text-slate-300" dir="rtl">
          <p>بحث كمي متكامل يتناول صياغة وتحليل المعادلات التفاضلية المحددة لانتشار العدوى وحساب العتبة الإحصائية الحرجية:</p>
          <div className="bg-slate-950 p-4 rounded-xl text-center font-mono my-2 text-emerald-400 text-sm overflow-x-auto">
            dS/dt = -β · I · S / N <br />
            dI/dt = (β · S / N - γ) · I <br />
            dR/dt = γ · I
          </div>
          <p>تم استخراج رقم التكاثر الأساسي (R0 = β / γ) لتقييم حدة الوباء. وتطوير خوارزميات محاكاة متكاملة بلغة Python لتمثيل ديناميكية الانتشار الزمني على عينة حقيقية شملت 40 مشاركاً.</p>
        </div>
      )
    },
    {
      id: "statistical-research",
      category: "math-data",
      title: "منهجية البحث الإحصائي واستبانات كلية العلوم",
      description: "تحليل استكشافي لمدى تطبيق مهارات البحث العلمي لدى طلبة الكلية عبر تصميم أدوات قياس موزونة وتحليلها إحصائياً وتوثيقها أكاديمياً.",
      icon: <BarChart />,
      theme: "primary",
      detailedContent: (
        <div className="space-y-4 text-right text-slate-300" dir="rtl">
          <p>دراسة ميدانية تضمنت تصميم استبانة علمية محكمة مكونة من 20 سؤالاً وفق مقياس ليكرت الخماسي (5-point Likert Scale) الموجه لطلبة كلية العلوم بمختلف تخصصاتهم.</p>
          <p>شمل المشروع حساب الحجم العادل والممثل للمجتمع الإحصائي المستهدف، مع مراجعة نقدية وتلخيص لـ 7 أدبيات ودراسات أكاديمية سابقة (مثل دراسات الباحثين الأكاديميين Jarab و Al-Qerem) وتوثيق المراجع بأساليب التوثيق القياسية.</p>
        </div>
      )
    },
    {
      id: "data-analysis",
      category: "math-data",
      title: "التحليل الإحصائي المتقدم واختبارات SPSS",
      description: "معالجة البيانات واختبار الفرضيات اللامعلمية، والتحقق من استقلالية البواقي وتوزيعات العينات الإحصائية الرأسية والأفقية.",
      icon: <Database />,
      theme: "info",
      detailedContent: (
        <div className="space-y-4 text-right text-slate-300" dir="rtl">
          <p>تطبيق حزمة SPSS الإحصائية لتشغيل اختبارات فرضية متقدمة مثل اختبار مان-ويتني (Mann-Whitney U Test) للمقارنة بين المجموعات المستقلة في الحالات التي لا تتبع التوزيع الطبيعي للفروقات.</p>
          <p>تضمن العمل تحليلاً دقيقاً للبواقي (Residuals Analysis) في المخططات المبعثرة (Scatter Plots) للتحقق من العشوائية، الاستقلالية، وتماثل الارتباط الخطي لتفادي معضلات التغاير غير المتجانس وتأكيد ثبات النموذج الرياضي.</p>
        </div>
      )
    },

  ];

  const filteredCards = useMemo(() => {
    if (activeFilter === "all") return cards;
    return cards.filter(card => card.category === activeFilter);
  }, [activeFilter]);

  return (
    <div className="min-h-screen relative bg-slate-50 dark:bg-slate-950">

      {/* الخطوط الهندسية وشبكة الخلفية الرياضية */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
          <svg width="100%" height="100%" className="text-slate-900 dark:text-slate-100">
            <defs>
              <pattern id="mainGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mainGrid)" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 p-6 md:p-12 max-w-7xl mx-auto flex flex-col items-center min-h-screen">

        {/* هيدر المحفظة */}
        <header className="text-center mb-12 space-y-4 pt-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50"
          >
            المحفظة الأكاديمية والمهنية
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-md md:text-lg text-slate-500 dark:text-slate-400 max-w-2xl font-medium"
          >
            جسر يربط بين صرامة الرياضيات التطبيقية، عمق التحليل الإحصائي البيداغوجي، وديناميكية التسويق الاستراتيجي الرقمي.
          </motion.p>
        </header>

        {/* أزرار التصفية (Tabs الفلترة) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-2 mb-12 bg-white/80 dark:bg-slate-900/80 p-2 rounded-2xl"
        >
          {[
            { id: "all", label: "جميع المشاريع" },
            { id: "math-data", label: "الرياضيات والبيانات (Python/SPSS)" },
            { id: "pedagogy", label: "البيداغوجيا والتعليم المعياري" },
            { id: "marketing-gaming", label: "الهوية الإستراتيجية والألعاب" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-semibold relative",
                activeFilter === tab.id
                  ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                  : "text-slate-600 dark:text-slate-400"
              )}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* شبكة عرض كروت الـ Anti-Gravity ثلاثية الأبعاد */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mb-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredCards.map((card) => (
              <motion.div
                key={card.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Card3D
                  title={card.title}
                  description={card.description}
                  icon={card.icon}
                  theme={card.theme}
                  onClick={() => setSelectedCard(card)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* النافذة التفاعلية التفصيلية المنبثقة (Modal) */}
      <AnimatePresence>
        {selectedCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
              className="relative w-full max-w-2xl bg-slate-900 rounded-3xl overflow-hidden z-10 flex flex-col max-h-[85vh]"
            >
              <div className="flex justify-between items-center px-6 py-4">
                <button
                  onClick={() => setSelectedCard(null)}
                  className="p-2 rounded-xl bg-slate-800 text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-3 flex-row-reverse">
                  <span className="text-xl font-bold text-white text-right">{selectedCard.title}</span>
                </div>
              </div>

              <div className="p-6 overflow-y-auto">
                {selectedCard.detailedContent}
              </div>

              <div className="p-4 bg-slate-950/40 flex justify-start">
                <button
                  onClick={() => setSelectedCard(null)}
                  className="px-5 py-2 rounded-xl text-sm font-semibold bg-slate-800 text-slate-200"
                >
                  إغلاق
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}