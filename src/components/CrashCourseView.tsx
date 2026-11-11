import React, { useState } from 'react';
import { CRASH_COURSE_MODULES, QuestionCategory } from '../data/questions';
import { BookOpen, CheckCircle2, ArrowRight, Eye, EyeOff } from 'lucide-react';

interface CrashCourseViewProps {
  onStartCategoryPractice: (category: QuestionCategory) => void;
  onStartDuplicatesPractice: () => void;
}

export const CrashCourseView: React.FC<CrashCourseViewProps> = ({
  onStartCategoryPractice,
  onStartDuplicatesPractice,
}) => {
  const [completedModules, setCompletedModules] = useState<Record<string, boolean>>({});
  const [selfTestHideRules, setSelfTestHideRules] = useState(false);

  const toggleModuleComplete = (id: string) => {
    setCompletedModules((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(completedModules).filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
              <span className="font-semibold text-sky-700">Hızlandırılmış Sınav Kampı</span>
              <span aria-hidden="true">·</span>
              <span>Toplam Okuma Süresi: ~15 Dakika</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono-num">
                Tamamlanan Modül: {completedCount} / {CRASH_COURSE_MODULES.length}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Sınava Saatler Kala: 71 Sorunun Tüm Şifreleri ve Çeldirici Tuzakları
            </h1>
            <p className="text-sm text-slate-600 max-w-3xl">
              Dosyadaki tüm sorular incelenerek sınavda sorulan her bir kavram, çeldirici şık ve
              kodlama 6 hızlı modülde özetlendi. Önce buradaki anahtar kelimeleri tarayın, ardından
              konu testine geçin.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setSelfTestHideRules(!selfTestHideRules)}
              className="min-h-[44px] px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
            >
              {selfTestHideRules ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              <span>
                {selfTestHideRules
                  ? 'Açıklamaları Göster'
                  : 'Kendini Sına (Açıklamaları Gizle)'}
              </span>
            </button>

            <button
              type="button"
              onClick={onStartDuplicatesPractice}
              className="min-h-[44px] px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
            >
              <span>★ Önce 8 Banko Soruyu Çöz</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Golden Quick-Reference Matrix (1-Minute Cheat Sheet) */}
        <div className="mt-5">
          <h2 className="text-sm font-bold text-slate-900 mb-3">
            1 Dakikada Sınavda En Çok Karıştırılan Kavram Eşleştirmeleri
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              {
                cue: 'Başvuran + Ailesi / Okul / İş Yeri ile bilgi toplama',
                ans: 'Sosyal İnceleme (Görüşmesi / Raporu)',
              },
              {
                cue: 'Psikolojik ilke ve prosedürlerle tutum/davranış değiştirme',
                ans: 'Tedavi Görüşmesi',
              },
              {
                cue: 'Gerçekleşen değişimin seyrinin izlenmesi',
                ans: 'Kontrol Görüşmesi',
              },
              {
                cue: 'Sorular, sırası ve cevap kodları önceden belli',
                ans: 'Yapılandırılmış Görüşme',
              },
              {
                cue: 'Bireysel hikâyeden ziyade topluluk davranış nedenleri',
                ans: 'Odak Grup Görüşmesi',
              },
              {
                cue: 'Olayların sırasını veya bağlantılarını hatırlayamama',
                ans: 'Yerini Değiştirme Hatası',
              },
              {
                cue: 'Etik Hiyerarşi: İlk Sırada vs. Şıklarda En Sonda',
                ans: 'İlk: İnsan Yaşamı · Son: Gizlilik-Mahremiyet',
              },
              {
                cue: 'İlişki kurma aşamasında ASLA kullanılmayan beceri',
                ans: 'Yüzleştirme (Güçlü ilişki sonrası yapılır)',
              },
              {
                cue: 'Sistemde bireyin paylaşmaması vs. Parça etkileşimi',
                ans: 'Birey = Güçlük · Etkileşim = İlişki İlkesi',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between gap-1"
              >
                <span className="text-xs text-slate-600">{item.cue}</span>
                <span className="text-xs sm:text-sm font-bold text-slate-900">
                  → {selfTestHideRules ? '•••••••• (Görmek için tıkla)' : item.ans}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 Crash Course Modules */}
      <div className="grid grid-cols-1 gap-5">
        {CRASH_COURSE_MODULES.map((mod) => {
          const isDone = !!completedModules[mod.id];
          return (
            <section
              key={mod.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                    <BookOpen className="w-3.5 h-3.5 text-sky-700" />
                    <span>{mod.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>Okuma: {mod.readingTime}</span>
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">{mod.title}</h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleModuleComplete(mod.id)}
                    className={`min-h-[40px] px-3.5 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
                      isDone
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <CheckCircle2
                      className={`w-4 h-4 ${isDone ? 'text-emerald-600' : 'text-slate-400'}`}
                    />
                    <span>{isDone ? 'Tekrar Edildi' : 'Okudum İşaretle'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onStartCategoryPractice(mod.category)}
                    className="min-h-[40px] px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold flex items-center gap-1 transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Bu Konunun Sorularını Çöz</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {mod.keyTakeaways.map((kt, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-2"
                  >
                    <h3 className="text-sm font-bold text-slate-900">{kt.term}</h3>
                    {!selfTestHideRules ? (
                      <>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          {kt.rule}
                        </p>
                        <div className="pt-2 border-t border-slate-200/70 text-xs text-amber-900 font-medium">
                          <strong>Sınav Tuzağı:</strong> {kt.examTrap}
                        </div>
                      </>
                    ) : (
                      <p className="text-xs text-slate-500 italic">
                        Kendini sınama modu aktif. Kavramı aklınızdan tekrar edin veya yukarıdan
                        &ldquo;Açıklamaları Göster&rdquo;e tıklayın.
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Mnemonic Box */}
              <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs sm:text-sm font-semibold text-emerald-950">
                {mod.mnemonic}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};
