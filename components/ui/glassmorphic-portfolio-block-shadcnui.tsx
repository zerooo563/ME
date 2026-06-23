'use client'

import { motion, Variants } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import { ElementType } from "react";

type Highlight = {
    title: string;
    description: string;
};

type SocialLink = {
    label: string;
    handle: string;
    href: string;
    icon: ElementType;
};

// تخصيص المهارات والإنجازات الخاصة بك
const highlights: Highlight[] = [
    {
        title: "الخلفية الأكاديمية والعلوم",
        description: "خريج بكالوريوس رياضيات، مهتم بالربط بين المنطق الرياضي، الوسائل التعليمية المبتكرة، وعلوم الحاسوب."
    },
    {
        title: "المشاريع التقنية والتطوير",
        description: "بناء واجهات ثلاثية الأبعاد تفاعلية ومحاكاة البرمجية للمواضيع العلمية والبيانات باستخدام (Next.js & Three.js)."
    }
];

// روابط الحسابات مع الأيقونات الجديدة
const socialLinks: SocialLink[] = [
    {
        label: "Facebook",
        handle: "/bdalrhmnayad.586615/",
        href: "https://www.facebook.com/bdalrhmnayad.586615/",
        icon: FaFacebook
    },
    {
        label: "GitHub",
        handle: "zerooo563",
        href: "https://github.com/zerooo563",
        icon: FaGithub
    },
    {
        label: "LinkedIn",
        handle: "abedalrahman-abedablabke-6a3212409",
        href: "https://www.linkedin.com/in/abedalrahman-abedablabke-6a3212409",
        icon: FaLinkedin
    },
    {
        label: "Gmail",
        handle: "abed0597299537@gmail.com",
        href: "mailto:abed0597299537@gmail.com",
        icon: Mail
    }
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.7 }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" }
    }
};

export function GlassmorphismPortfolioBlock() {
    return (
        <section className="relative w-full rounded-3xl overflow-hidden bg-white/[0.02] p-8 md:p-12 lg:p-16">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 relative z-10"
            >
                {/* العمود الأيمن: الصورة الشخصية والتعريف السريع */}
                <motion.div variants={itemVariants} className="lg:col-span-4 flex flex-col items-center justify-center text-center p-4 md:p-6">
                    <div className="relative w-44 h-44 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-2xl overflow-hidden mb-6 md:mb-8">
                        <img
                            src="/download.jpg"
                            alt="عبد الرحمن عبد الباقي"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                    </div>

                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-200 to-neutral-400">
                        عبد الرحمن عبد الباقي
                    </h2>
                    <p className="text-primary font-medium text-sm md:text-base mt-2 tracking-wide uppercase">
                        Mathematics & Frontend Developer
                    </p>
                    <p className="text-neutral-400 text-xs md:text-sm mt-4 max-w-[280px] leading-relaxed">
                        مطور واجهات ومختص رياضيات يسعى لتبسيط العلوم من خلال البرمجة والتفاعلية البصرية.
                    </p>
                </motion.div>

                {/* العمود الأيسر: الإنجازات وروابط التواصل الاجتماعي */}
                <div className="lg:col-span-8 flex flex-col justify-between gap-10 text-right" dir="rtl">

                    {/* قسم التركيز والعلوم */}
                    <div className="space-y-6 md:space-y-8">
                        <motion.h3 variants={itemVariants} className="text-xl md:text-2xl font-semibold text-neutral-200">
                            التركيز الحالي والشغف
                        </motion.h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            {highlights.map((item, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="p-6 md:p-8 rounded-2xl bg-white/[0.01]"
                                >
                                    <h4 className="font-bold text-white text-base md:text-lg mb-2 md:mb-3">{item.title}</h4>
                                    <p className="text-neutral-400 text-xs md:text-sm leading-relaxed">{item.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* قسم شبكات التواصل الاجتماعي */}
                    <div className="space-y-4 md:space-y-5">
                        <motion.h3 variants={itemVariants} className="text-xl md:text-2xl font-semibold text-neutral-200">
                            قنوات التواصل الرسمية
                        </motion.h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4" dir="ltr">
                            {socialLinks.map((link, index) => {
                                const Icon = link.icon;
                                return (
                                    <motion.a
                                        key={index}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        variants={itemVariants}
                                        className="flex items-center justify-between p-4 md:p-5 rounded-xl bg-white/[0.01] text-neutral-400"
                                    >
                                        <div className="flex items-center gap-3 md:gap-4">
                                            <div className="p-2 md:p-3 rounded-lg bg-white/[0.03] text-neutral-300">
                                                <Icon className="w-4 h-4 md:w-5 md:h-5" />
                                            </div>
                                            <div className="text-left">
                                                <div className="text-xs md:text-sm font-semibold text-neutral-300">{link.label}</div>
                                                <div className="text-[10px] md:text-xs text-neutral-500">{link.handle}</div>
                                            </div>
                                        </div>
                                        <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4 opacity-40" />
                                    </motion.a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}