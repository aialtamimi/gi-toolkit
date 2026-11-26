// Interface language (SPEC.md B1.9 Phase 4). Only interface text is translated. Clinical content
// (calculator names, inputs, results, interpretations, actions, doses, drug names, scores, formulas,
// emergency page text and references) always stays in English.
import { store } from "./storage.js";

export const LANGUAGES = ["en", "ar"];

// English interface strings → Arabic. Keys are the English text; {name} marks a placeholder.
// U+2066/U+2069 isolate English unit lists inside Arabic text so they keep their left-to-right order.
export const AR = {
  // header, navigation, footer
  "‹ Back": "رجوع ›",
  "Back": "رجوع",
  "Home": "الرئيسية",
  "About": "حول التطبيق",
  "Settings": "الإعدادات",
  "Not found": "غير موجود",
  "This page does not exist.": "هذه الصفحة غير موجودة.",
  "Go home": "العودة إلى الرئيسية",
  "GI Toolkit v{version} · Last clinical review: {review}": "GI Toolkit الإصدار {version} · آخر مراجعة سريرية: {review}",
  "Not yet clinically reviewed": "لم تتم المراجعة السريرية بعد",
  "Pending": "قيد الانتظار",
  "Update available, tap to refresh": "يتوفر تحديث، اضغط للتحديث",
  // home and lists
  "Search calculators, aliases…": "ابحث عن حاسبة أو اسم بديل…",
  "Search": "بحث",
  "No match.": "لا توجد نتائج.",
  "Categories": "الأقسام",
  "Favorites": "المفضلة",
  "Recent": "المستخدمة مؤخرًا",
  "Items: {n}": "العناصر: {n}",
  "Coming in a later update": "قريبًا في تحديث لاحق",
  "Emergency": "طوارئ",
  "Favorite": "المفضلة",
  "★ Favorite": "★ في المفضلة",
  "☆ Favorite": "☆ أضف إلى المفضلة",
  // category names (interface headings; clinical abbreviations such as IBD stay in English)
  "GI bleeding": "نزيف الجهاز الهضمي",
  "Liver": "الكبد",
  "Pancreas and biliary": "البنكرياس والقنوات الصفراوية",
  "IBD": "IBD",
  "Endoscopy classifications": "تصنيفات التنظير",
  "Emergencies": "الطوارئ",
  // disclaimer and About
  "Before you start": "قبل البدء",
  "I understand and accept": "فهمت وأوافق",
  "GI Toolkit is a decision-support reference for clinicians, not a substitute for clinical judgment or local protocols. Verify every result before clinical use.":
    "GI Toolkit مرجع لدعم القرار مخصص للأطباء، ولا يغني عن الحكم السريري أو البروتوكولات المحلية. تحقق من كل نتيجة قبل استخدامها سريريًا.",
  "Disclaimer": "إخلاء المسؤولية",
  "Version and review": "الإصدار والمراجعة",
  "Version": "الإصدار",
  "Last clinical review": "آخر مراجعة سريرية",
  "Reviewer": "المراجع",
  "Reference policy": "سياسة المراجع",
  "Every formula, point value, cutoff and interpretation comes only from the project specification (SPEC.md), which was written from guidelines and original papers. Each calculator shows its sources. Where the specification gives no link for a source, the app links to a PubMed search for that citation.":
    "كل معادلة وقيمة نقاط وحد فاصل وتفسير مأخوذ فقط من مواصفات المشروع (SPEC.md)، المكتوبة استنادًا إلى الإرشادات والأبحاث الأصلية. تعرض كل حاسبة مصادرها. وعندما لا تذكر المواصفات رابطًا لمصدر ما، يربط التطبيق ببحث في PubMed عن ذلك المرجع.",
  "Rounding is never silent: each result states the rounding rule used.": "لا يتم التقريب دون إشعار: تذكر كل نتيجة قاعدة التقريب المستخدمة.",
  "Privacy": "الخصوصية",
  "No patient data is stored or sent anywhere. The app makes no network calls while you use it and has no analytics or trackers. Only favorites, recent items, unit choices, theme, language and your disclaimer acceptance are kept on this device.":
    "لا يتم تخزين أي بيانات للمرضى أو إرسالها إلى أي مكان. لا يتصل التطبيق بالشبكة أثناء الاستخدام، ولا يحتوي على أدوات تحليل أو تتبع. يُحفظ على هذا الجهاز فقط: المفضلة، والعناصر الأخيرة، واختيارات الوحدات، والمظهر، واللغة، وموافقتك على إخلاء المسؤولية.",
  "Clinical content (calculator names, results, interpretations, drug names, doses, scores and formulas) stays in English.":
    "يبقى المحتوى السريري (أسماء الحاسبات والنتائج والتفسيرات وأسماء الأدوية والجرعات والمقاييس والمعادلات) باللغة الإنجليزية.",
  // settings
  "Default units": "الوحدات الافتراضية",
  "Saudi laboratories report SI units, so SI is the default. Each lab field also has its own toggle, which is remembered.":
    "تستخدم المختبرات في السعودية وحدات النظام الدولي (SI)، لذا فهي الافتراضية. لكل حقل مخبري أيضًا مفتاح خاص به يتم حفظه.",
  "SI (µmol/L, g/L, mmol/L)": "النظام الدولي ⁦SI (µmol/L, g/L, mmol/L)⁩",
  "Conventional (mg/dL, g/dL)": "الوحدات التقليدية ⁦(mg/dL, g/dL)⁩",
  "Saved. Per-field unit choices were reset to this default.": "تم الحفظ. أُعيد ضبط وحدات الحقول إلى هذا الخيار الافتراضي.",
  "Theme": "المظهر",
  "Light": "فاتح",
  "Dark": "داكن",
  "Same as device": "حسب إعداد الجهاز",
  "Language": "اللغة",
  // calculator engine
  "Clear inputs": "مسح المدخلات",
  "Full table": "الجدول الكامل",
  "References": "المراجع",
  " (PubMed search)": " (بحث في PubMed)",
  "Check highlighted inputs.": "تحقق من المدخلات المظللة.",
  "To calculate, enter: {list}.": "للحساب، أدخل: {list}.",
  "Check inputs": "تحقق من المدخلات",
  "Inputs to go: {n}": "المدخلات المتبقية: {n}",
  "Unable to calculate with these values.": "تعذر الحساب بهذه القيم.",
  "Band": "الفئة",
  "Suggested action": "الإجراء المقترح",
  "Points breakdown": "تفصيل النقاط",
  "Breakdown": "التفصيل",
  "Rounding: ": "التقريب: ",
  "Copy result": "نسخ النتيجة",
  "Copy": "نسخ",
  "Copied": "تم النسخ",
  "Copy failed": "تعذر النسخ",
  " (optional)": " (اختياري)",
  "Enter a number": "أدخل رقمًا",
  "Enter a whole number": "أدخل رقمًا صحيحًا",
  "Outside accepted input range {lo} to {hi} {unit}": "خارج النطاق المقبول {lo} إلى {hi} {unit}",
  "{label} unit": "وحدة {label}",
  "(coming in a later update)": "(قريبًا في تحديث لاحق)",
  "(not available)": "(غير متاح)",
  " (greyed out: exam unreliable)": " (باهت: الفحص غير موثوق)",
  // cards and emergency pages
  "Tap a row to select it.": "اضغط على صف لاختياره.",
  "Source": "المصدر",
  "Sources": "المصادر",
  "Source: ": "المصدر: ",
  "Related calculators": "حاسبات ذات صلة",
  "Doses (adult doses)": "الجرعات (للبالغين)",
  "open {name}": "فتح {name}",
  "No source is listed in SPEC.md for this page yet.": "لا يوجد مصدر مذكور في SPEC.md لهذه الصفحة بعد.",
  // Arabic translations shown under the two mandatory English footers
  "Decision support only. Verify with clinical judgment and local protocols.": "لدعم القرار فقط. تحقق بالحكم السريري والبروتوكولات المحلية.",
  "Check local protocol, renal function and allergies before prescribing.": "راجع البروتوكول المحلي ووظائف الكلى والحساسية قبل وصف الدواء."
};

let current = null;

export function lang() {
  if (current) return current;
  const l = store.language();
  return LANGUAGES.includes(l) ? l : "en";
}

// For tests: force a language without touching storage.
export function setLangForTest(l) { current = l; }

export function isArabic() { return lang() === "ar"; }

// Translate an interface string. Unknown keys fall back to English.
export function t(key, vars = {}) {
  const s = (isArabic() && AR[key] !== undefined) ? AR[key] : key;
  return s.replace(/\{(\w+)\}/g, (_, k) => (vars[k] !== undefined ? String(vars[k]) : `{${k}}`));
}
