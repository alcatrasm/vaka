import React from 'react';
import { DUPLICATE_PAIRS_REPORT } from '../data/questions';
import { ArrowRight, CheckCircle2, FileText, Layers } from 'lucide-react';

interface DeduplicationViewProps {
  onJumpToQuestion: (questionId: number) => void;
  onStartDuplicatesQuiz: () => void;
}

export const DeduplicationView: React.FC<DeduplicationViewProps> = ({
  onJumpToQuestion,
  onStartDuplicatesQuiz,
}) => {
  return (
    <div className="space-y-6">
      {/* Forensic PDF Summary Card */}
      <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
              <span className="font-semibold text-sky-700">PDF Soru İnceleme & İndirgeme Raporu</span>
              <span aria-hidden="true">·</span>
              <span>16 Sayfa Tam Tarama</span>
              <span aria-hidden="true">·</span>
              <a
                href="/assets/aistudio/Vaka_Dersi_Soru__rnekleridocx_261109_122341_471a5f54.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 text-slate-800 hover:text-sky-700 font-medium inline-flex items-center gap-1"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Orijinal PDF Dosyasını Görüntüle</span>
              </a>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Mükerrer Soruların Tek Soruya İndirgenmesi (79 Ham Soru → 71 Özgün Soru)
            </h1>
            <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
              Yüklediğiniz 16 sayfalık PDF dosyasındaki tüm sorular satır satır incelendi. Belgedeki
              numaralandırma kaymaları düzeltildi ve birebir aynı olan 8 soru çifti tek soruya
              indirgenerek zaman kaybınız önlendi.
            </p>
          </div>

          <button
            type="button"
            onClick={onStartDuplicatesQuiz}
            className="min-h-[44px] px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 self-start lg:self-center"
          >
            <Layers className="w-4 h-4 text-amber-400" />
            <span>Sadece 8 Mükerrer (Banko) Soruyu Çöz</span>
          </button>
        </div>

        {/* 3-Column Numeric Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="text-xs text-slate-600 mb-1">PDF&apos;deki Toplam Soru Maddesi</div>
            <div className="text-2xl sm:text-3xl font-bold font-mono-num text-slate-900">
              79 Soru
            </div>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              Son soru &ldquo;70&rdquo; görünse de Sayfa 11&apos;de 49. sorudan sonra numaralar tekrar
              40&apos;a dönmüş (10 ek soru) ve Sayfa 8&apos;de 35. numara atlanmıştır.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80">
            <div className="text-xs text-amber-900 font-medium mb-1">
              Tespit Edilip Elenen Mükerrer Soru
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono-num text-amber-900">
              8 Çift (-8 Soru)
            </div>
            <p className="text-xs text-amber-900/90 mt-1.5 leading-relaxed">
              16 soru maddesi (8 çift) harfi harfine aynı olduğu için birleştirildi. Hocanın soru
              havuzunda 2 kez yer aldığı için sınavda çıkma olasılığı en yüksek sorulardır!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80">
            <div className="text-xs text-emerald-900 font-medium mb-1">
              Teste Dahil Edilen Net Özgün Soru
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono-num text-emerald-900">
              71 Özgün Soru
            </div>
            <p className="text-xs text-emerald-900/90 mt-1.5 leading-relaxed">
              Hiçbir özgün soru atlanmadan tamamına anlaşılır çözüm ve sınav anında hatırlatıcı
              pratik şifre eklendi.
            </p>
          </div>
        </div>
      </section>

      {/* Detailed List of 8 Duplicate Pairs */}
      <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            Tek Soruya İndirgenen 8 Mükerrer Soru Çifti (Banko Liste)
          </h2>
          <span className="text-xs text-slate-500">
            İstediğiniz soruya tıklayarak doğrudan çözüm ekranına gidebilirsiniz
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DUPLICATE_PAIRS_REPORT.map((pair, idx) => (
            <div
              key={pair.mergedQuestionId}
              className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between gap-3"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                  <span className="font-mono-num font-bold text-slate-900">
                    Çift #{idx + 1}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>1. Geçiş: {pair.firstOccurrence}</span>
                  <span aria-hidden="true">·</span>
                  <span>2. Geçiş: {pair.secondOccurrence}</span>
                </div>

                <p className="text-sm font-semibold text-slate-900 leading-snug">
                  &ldquo;{pair.questionSummary}&rdquo;
                </p>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 pt-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Doğru Cevap: {pair.correctAnswerText}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200/70 flex items-center justify-between">
                <span className="text-xs font-mono-num text-slate-500">
                  Testteki Özgün No: #{pair.mergedQuestionId}
                </span>
                <button
                  type="button"
                  onClick={() => onJumpToQuestion(pair.mergedQuestionId)}
                  className="min-h-[38px] px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-900 flex items-center gap-1 transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Soruyu ve Şifresini Aç</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
