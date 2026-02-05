
import React, { useState, useEffect } from 'react';
import { X, ArrowUpRight, Info, AlertCircle, Quote } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: React.ReactNode;
  image: string;
  gridClass: string; // Controls width (col-span)
  readTime: string;
  imagePosition?: string; // Optional custom position class for cover image
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Беременность, ГВ\nи косметолог: Полный\nгид по безопасности',
    excerpt: 'Беременность и материнство — период, когда организм женщины живет по особым законам. Гормональная перестройка часто преподносит сюрпризы...',
    gridClass: 'lg:col-span-7', 
    image: 'https://i.ibb.co/sdYCLpNy/Frame-800.png',
    readTime: '4 мин',
    imagePosition: 'object-[70%_0] md:object-top', // Shifted 20% left on mobile, top on desktop
    content: (
        <div className="space-y-10 text-gray-800">
            {/* Lead Paragraph */}
            <p className="font-serif text-xl md:text-2xl text-sage-600 italic leading-relaxed border-b border-sage-100 pb-8">
                Гормональная перестройка часто преподносит сюрпризы: от неожиданной сухости до «подростковых» высыпаний. Забывать о себе нельзя, но осторожность выходит на первый план.
            </p>

            {/* Body Text with Drop Cap */}
            <div className="font-montserrat text-base leading-loose text-gray-700 text-justify md:columns-2 gap-10">
                <span className="float-left text-6xl md:text-7xl font-serif text-sage-500 mr-4 mt-[-12px] leading-none">Б</span>
                еременность и материнство — период, когда организм женщины живет по особым законам. В это время кожа может вести себя непредсказуемо. Многие женщины впадают в крайности: либо полностью отказываются от ухода, боясь навредить, либо продолжают привычную рутину, игнорируя изменившийся статус. Истина, как всегда, посередине. Важно понимать, что многие привычные процедуры сейчас могут быть не только бесполезны, но и нежелательны. Однако это не повод забывать о себе.
            </div>

            {/* Magazine Spread: Left Green, Right Red */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-y border-gray-100 overflow-hidden rounded-xl shadow-sm">
                
                {/* Allowed Column */}
                <div className="bg-sage-50/60 p-8 md:p-10">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="w-8 h-8 rounded-full bg-sage-500 text-white flex items-center justify-center font-serif italic shadow-md">1</span>
                        <h4 className="font-serif font-bold text-sage-800 text-xl tracking-wide uppercase">Что мы делаем</h4>
                    </div>
                    <ul className="space-y-6 font-montserrat text-base text-gray-800">
                        {[
                            { title: 'Уходовые программы', text: 'Глубокое увлажнение и альгинатные маски — база для сохранения ресурса кожи.' },
                            { title: 'Мягкие пилинги', text: 'Молочная или миндальная кислоты in низкой концентрации. Работают только на поверхности.' },
                            { title: 'Лимфодренаж', text: 'Спасение от отеков. Легкий ручной массаж лица творит чудеса.' },
                        ].map((item, i) => (
                            <li key={i} className="group">
                                <strong className="block text-sage-700 font-serif text-lg mb-1 group-hover:translate-x-1 transition-transform">{item.title}</strong>
                                <span className="leading-relaxed opacity-90">{item.text}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Warning Column */}
                <div className="bg-stone-100/60 p-8 md:p-10">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="w-8 h-8 rounded-full bg-stone-400 text-white flex items-center justify-center font-serif italic shadow-md">2</span>
                        <h4 className="font-serif font-bold text-stone-600 text-xl tracking-wide uppercase">Табу на время</h4>
                    </div>
                    <ul className="space-y-6 font-montserrat text-base text-gray-800">
                        <li className="group">
                            <strong className="block text-stone-600 font-serif text-lg mb-1 group-hover:translate-x-1 transition-transform">Инъекции</strong>
                            <span className="leading-relaxed opacity-90">Ботокс, филлеры, мезо. Обмен веществ изменен, результат может быть непредсказуемым.</span>
                        </li>
                        <li className="group">
                            <strong className="block text-stone-600 font-serif text-lg mb-1 group-hover:translate-x-1 transition-transform">Аппаратные методики</strong>
                            <span className="leading-relaxed opacity-90">Лазер и фототерапия под запретом. Риск получить стойкую пигментацию (мелазму) сейчас максимален.</span>
                        </li>
                        <li className="group">
                            <strong className="block text-stone-600 font-serif text-lg mb-1 group-hover:translate-x-1 transition-transform">Химические пилинги</strong>
                            <span className="leading-relaxed opacity-90">С кислотами высокой концентрации.</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Editorial Note Box */}
            <div className="relative p-8 md:p-12 bg-white border border-gray-200 mx-0 md:mx-8 shadow-[8px_8px_0px_0px_rgba(214,211,209,0.3)]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4">
                     <h4 className="font-montserrat font-bold uppercase tracking-[0.2em] text-xs text-gray-400">Ревизия косметички</h4>
                </div>
                <div className="space-y-8">
                    <div>
                        <p className="font-serif text-xl text-rose-800 italic mb-6 text-center">Обязательно исключаем:</p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 font-montserrat text-base text-gray-700">
                            <li className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2.5 shrink-0"></span>
                                <span>ретинол (витамин A)</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2.5 shrink-0"></span>
                                <span>кислоты в высоких дозах (AHA, BHA)</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2.5 shrink-0"></span>
                                <span>отбеливающие средства с гидрохиноном</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2.5 shrink-0"></span>
                                <span>эфирные масла с сильным ароматом (особенно в первом триместре)</span>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="relative border-t border-gray-100 pt-6">
                         <div className="absolute top-6 left-0 w-full h-full bg-sage-50/50 -z-10 rounded-xl transform translate-y-2"></div>
                         <p className="font-montserrat text-base text-gray-700 leading-loose text-center px-4 relative z-10">
                            Выбираем мягкие формулы без отдушек, спирта и агрессивных ПАВов. Хорошо работают средства с <span className="font-medium text-sage-700 border-b border-sage-300 pb-0.5">пантенолом</span>, <span className="font-medium text-sage-700 border-b border-sage-300 pb-0.5">алоэ</span>, <span className="font-medium text-sage-700 border-b border-sage-300 pb-0.5">церамидами</span>, <span className="font-medium text-sage-700 border-b border-sage-300 pb-0.5">гиалуроновой кислотой</span>.
                         </p>
                    </div>
                </div>
            </div>

            <p className="font-serif italic text-lg text-center text-gray-500 pt-8 max-w-3xl mx-auto leading-relaxed">
                «Зачем идти к косметологу сейчас? Чтобы поддерживать кожу в ресурсе, понимать, какие средства вам сейчас подходят, и какие могут навредить. А ещё — просто побыть в месте, где о вас позаботятся. Это не только про внешность, но и про состояние.»
            </p>
        </div>
    )
  },
  {
    id: 4,
    title: 'Тоник: Маркетинг\nили фундамент\nздоровой кожи?',
    excerpt: 'Многие до сих пор думают: «Тоник? Просто вода в красивой бутылке». Но именно этот шаг в уходе решает, будет ли кожа сиять...',
    gridClass: 'lg:col-span-5', 
    image: 'https://i.ibb.co/21N6YSmM/Frame-802.png',
    readTime: '3 мин',
    imagePosition: 'object-right',
    content: (
        <div className="space-y-12 text-gray-800">
             {/* Pull Quote */}
             <div className="relative py-10 px-6 text-center bg-stone-50 rounded-3xl mt-4">
                <Quote className="absolute top-4 left-6 text-sage-200 w-16 h-16 -scale-x-100 opacity-50" />
                <p className="font-serif text-2xl md:text-3xl text-sage-700 leading-tight italic relative z-10">
                    «Тоник? Просто вода в красивой бутылке».
                </p>
                <p className="font-montserrat text-base text-gray-700 mt-4 relative z-10 max-w-2xl mx-auto font-medium">
                    Многие думают именно так. Но именно этот шаг в уходе решает, будет ли кожа сиять или страдать от сухости и воспалений.
                </p>
                <Quote className="absolute bottom-4 right-6 text-sage-200 w-16 h-16 opacity-50" />
            </div>

            <div className="font-montserrat text-base leading-loose text-gray-700">
                <p className="mb-6">
                    <span className="font-serif font-bold text-charcoal text-lg uppercase tracking-wider mr-2 border-b-2 border-sage-200">Проблема:</span>
                    После умывания кожа остаётся в щелочной среде (pH выше 7). Чтобы восстановить баланс самостоятельно, ей требуется от 4 до 6 часов.
                </p>
                <p className="mb-8">
                    Всё это время барьер кожи ослаблен: она теряет влагу, становится уязвимой для бактерий и запускает “аварийный режим” — активнее выделяет себум. Отсюда сухость, микротрещины и новые воспаления.
                </p>
                
                <div className="flex items-center gap-4 p-6 bg-sage-100 rounded-lg border-l-4 border-sage-500">
                    <p className="font-medium text-sage-900 text-lg">Тоник возвращает pH в норму (4.5–5.5) за секунды.</p>
                </div>
            </div>

            {/* Feature Grid */}
            <div className="bg-white border border-gray-100 p-8 rounded-[20px] shadow-lg relative overflow-hidden">
                <h4 className="font-serif font-bold text-2xl mb-8 text-center text-stone-700 italic">Это не просто «водичка», а полноценная формула</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="group">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-2 h-2 rounded-full bg-sage-500"></div>
                            <strong className="font-montserrat font-bold text-gray-800 uppercase tracking-wide text-sm">Финальный клининг</strong>
                        </div>
                        <p className="font-montserrat text-base text-gray-600 leading-relaxed pl-5 border-l border-gray-100 group-hover:border-sage-200 transition-colors">
                            Убирает микрочастицы ПАВов, пыли и макияжа, которые пропустила пенка.
                        </p>
                    </div>
                    <div className="group">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-2 h-2 rounded-full bg-sage-500"></div>
                            <strong className="font-montserrat font-bold text-gray-800 uppercase tracking-wide text-sm">Увлажнение</strong>
                        </div>
                        <p className="font-montserrat text-base text-gray-600 leading-relaxed pl-5 border-l border-gray-100 group-hover:border-sage-200 transition-colors">
                            Увлажняют и успокаивают за счёт компонентов вроде гиалуроновой кислоты, алоэ, пантенола.
                        </p>
                    </div>
                    <div className="group">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-2 h-2 rounded-full bg-sage-500"></div>
                            <strong className="font-montserrat font-bold text-gray-800 uppercase tracking-wide text-sm">Терапия</strong>
                        </div>
                        <p className="font-montserrat text-base text-gray-600 leading-relaxed pl-5 border-l border-gray-100 group-hover:border-sage-200 transition-colors">
                            Могут улучшить состояние кожи за счет отбеливающих, вяжущих и противовоспалительных веществ.
                        </p>
                    </div>
                    <div className="group">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-2 h-2 rounded-full bg-sage-500"></div>
                            <strong className="font-montserrat font-bold text-gray-800 uppercase tracking-wide text-sm">Проводник</strong>
                        </div>
                        <p className="font-montserrat text-base text-gray-600 leading-relaxed pl-5 border-l border-gray-100 group-hover:border-sage-200 transition-colors">
                            Сыворотка и крем в подготовленную кожу впитываются глубже и работают эффективнее.
                        </p>
                    </div>
                </div>
            </div>

            {/* Interesting Fact */}
            <div className="bg-stone-50 p-8 rounded-xl flex flex-col md:flex-row gap-6 items-center">
                <div className="bg-white p-4 rounded-full shadow-sm shrink-0">
                    <Info className="text-sage-500 w-8 h-8" />
                </div>
                <div>
                    <h5 className="font-serif font-bold text-xl text-charcoal mb-2">Интересный факт</h5>
                    <p className="font-montserrat text-base text-gray-700 leading-relaxed">
                        Исследования показывают, что регулярное применение тоника повышает эффективность последующего ухода до 30%. Это как прогреть мышцы перед тренировкой — результат будет заметно лучше.
                    </p>
                </div>
            </div>

            {/* Warning */}
            <div className="border-l-4 border-rose-400 pl-6 py-4 bg-rose-50/30 rounded-r-lg">
                <h5 className="font-bold text-rose-700 uppercase tracking-wide mb-2 flex items-center gap-2 text-sm">
                    <AlertCircle size={20} /> Важно
                </h5>
                <p className="font-montserrat text-base text-gray-800 leading-relaxed">
                    Не каждый тоник полезен. Спиртовые составы пересушивают и раздражают. Лучше выбирать формулы без агрессивных добавок, под свой тип кожи.
                </p>
            </div>

            {/* Conclusion */}
            <p className="font-serif italic text-xl md:text-2xl text-center text-sage-600 pt-6 border-t border-gray-100">
                Вывод: тоник — не маркетинговая уловка, а ключевой этап, который экономит вашей коже годы здоровья и красоты.
            </p>
        </div>
    )
  },
  {
    id: 3,
    title: 'Руки — предатели:\nПочему они стареют\nраньше лица?',
    excerpt: 'Наряду с шеей именно руки чаще всего выдают возраст. Тонкая кожа, пигментные пятна, морщинки — всё это появляется раньше...',
    gridClass: 'lg:col-span-5', 
    image: 'https://i.ibb.co/273sB0hd/Frame-801.png',
    readTime: '2 мин',
    content: (
        <div className="space-y-12 text-gray-800">
             {/* Quote Block with Photo */}
             <div className="flex flex-col md:flex-row gap-8 items-center bg-stone-900 text-white p-8 md:p-10 rounded-2xl shadow-xl overflow-hidden">
                 <div className="flex-1 font-serif text-xl md:text-2xl italic leading-relaxed text-white/90 z-10">
                    "Лицо может лгать о возрасте, но руки всегда говорят правду." 
                    <span className="block text-sm font-sans not-italic text-stone-400 mt-4 uppercase tracking-widest">— Коко Шанель</span>
                 </div>
                 <div className="hidden md:block w-px h-24 bg-stone-700"></div>
                 <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 rounded-full overflow-hidden border-2 border-stone-600 grayscale opacity-80">
                     <img src="https://i.ibb.co/9Q6Wt6G/i-1.webp" alt="Coco Chanel" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                 </div>
             </div>

             {/* Intro */}
             <p className="font-montserrat text-base text-gray-700 leading-loose">
                Наряду с шеей именно руки чаще всего выдают возраст. Тонкая, сухая кожа, пигментные пятна, морщинки, выступающие вены — всё это появляется раньше, чем мы ожидаем.
             </p>

             {/* Why it happens */}
             <div>
                 <h4 className="font-serif font-bold text-2xl text-charcoal mb-6">Почему так происходит:</h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="bg-stone-50 p-6 rounded-xl border border-stone-100">
                         <strong className="block text-sage-600 font-serif text-lg mb-2">❶ Меньше жира и коллагена</strong>
                         <p className="text-gray-700 text-base">Кожа на руках тоньше и быстрее теряет упругость.</p>
                     </div>
                     <div className="bg-stone-50 p-6 rounded-xl border border-stone-100">
                         <strong className="block text-sage-600 font-serif text-lg mb-2">❷ Постоянное воздействие солнца</strong>
                         <p className="text-gray-700 text-base">Мы защищаем лицо SPF-кремом, а руки почти никогда.</p>
                     </div>
                     <div className="bg-stone-50 p-6 rounded-xl border border-stone-100">
                         <strong className="block text-sage-600 font-serif text-lg mb-2">❸ Бытовая химия</strong>
                         <p className="text-gray-700 text-base">Моющие средства для посуды и уборки разрушают защитный барьер кожи.</p>
                     </div>
                     <div className="bg-stone-50 p-6 rounded-xl border border-stone-100">
                         <strong className="block text-sage-600 font-serif text-lg mb-2">❹ Зимой добавляется холод</strong>
                         <p className="text-gray-700 text-base">Сухой воздух и мороз. Кожа теряет влагу, появляются трещинки, шелушение, тусклый цвет.</p>
                     </div>
                 </div>
             </div>

             {/* What helps */}
             <div>
                 <h4 className="font-serif font-bold text-2xl text-charcoal mb-6">Что помогает сохранить молодость рук:</h4>
                 <ul className="space-y-6">
                     <li className="flex gap-4 items-start">
                         <div className="w-2 h-2 mt-2.5 rounded-full bg-sage-500 shrink-0"></div>
                         <div>
                             <strong className="block text-gray-800 text-lg mb-1">Регулярный уход</strong>
                             <p className="text-gray-700 text-base leading-relaxed">Кремы с керамидами, маслами. Выбирайте питательные крема и наносите после каждого мытья.</p>
                         </div>
                     </li>
                     <li className="flex gap-4 items-start">
                         <div className="w-2 h-2 mt-2.5 rounded-full bg-sage-500 shrink-0"></div>
                         <div>
                             <strong className="block text-gray-800 text-lg mb-1">Тепло и защита</strong>
                             <p className="text-gray-700 text-base leading-relaxed">Осенью — перчатки, зимой — варежки. Даже если вам только до магазина добежать… Зимой перед выходом на улицу наносите на кожу крем для рук.</p>
                         </div>
                     </li>
                     <li className="flex gap-4 items-start">
                         <div className="w-2 h-2 mt-2.5 rounded-full bg-sage-500 shrink-0"></div>
                         <div>
                             <strong className="block text-gray-800 text-lg mb-1">Пилинги и уходовые процедуры</strong>
                             <p className="text-gray-700 text-base leading-relaxed">Осенью-зимой самое время: мягкие кислотные пилинги, биоревитализация, плазмотерапия — они возвращают плотность, увлажняют и выравнивают тон кожи.</p>
                         </div>
                     </li>
                     <li className="flex gap-4 items-start">
                         <div className="w-2 h-2 mt-2.5 rounded-full bg-sage-500 shrink-0"></div>
                         <div>
                             <strong className="block text-gray-800 text-lg mb-1">SPF — да, даже на руки!</strong>
                             <p className="text-gray-700 text-base leading-relaxed">Особенно если вы за рулем или работаете у окна.</p>
                         </div>
                     </li>
                     <li className="flex gap-4 items-start">
                         <div className="w-2 h-2 mt-2.5 rounded-full bg-sage-500 shrink-0"></div>
                         <div>
                             <strong className="block text-gray-800 text-lg mb-1">Перчатки для уборки</strong>
                             <p className="text-gray-700 text-base leading-relaxed">Простая привычка, которая защитит кожу.</p>
                         </div>
                     </li>
                 </ul>
             </div>

             {/* Conclusion */}
             <div className="bg-sage-50 p-8 rounded-2xl border border-sage-100 text-center">
                 <p className="font-serif italic text-xl md:text-2xl text-sage-700 leading-relaxed">
                    «Руки — это как лицо без макияжа: по ним видно всё. Берегите их, и они долго будут выглядеть молодо и ухоженно.»
                 </p>
             </div>
        </div>
    )
  },
  {
    id: 2,
    title: '«Гусиные лапки»\nв 25 лет:\nПлата за эмоции',
    excerpt: 'Морщинки-лучики в уголках глаз часто появляются уже в 20–25 лет. В отличие от глубоких заломов, эти «птичьи следы» — плата за искренность...',
    gridClass: 'lg:col-span-7',
    image: 'https://i.ibb.co/r2DP7kTF/Frame-799.png',
    readTime: '3 мин',
    content: (
        <div className="space-y-12 text-gray-800">
             {/* Editorial Header */}
             <div className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-6">
                 <span className="px-4 py-1.5 border border-sage-300 rounded-full text-[11px] uppercase tracking-widest text-sage-600 font-bold">Зона риска</span>
                 <p className="font-serif text-xl md:text-3xl text-gray-800 leading-relaxed italic">
                     Они появляются первыми. Не потому что вы постарели, а потому что вы много смеетесь, щуритесь на солнце и... забываете про очки.
                 </p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 border-t border-b border-gray-100 py-12">
                 <div className="md:col-span-1 flex flex-col justify-center border-r border-gray-100 pr-4">
                     <h4 className="font-montserrat font-bold text-8xl text-sage-200 mb-2 leading-none">x6</h4>
                     <p className="font-montserrat text-base text-gray-800 font-bold uppercase tracking-wide">
                         Во столько раз кожа век тоньше
                     </p>
                     <p className="font-montserrat text-base text-gray-500 mt-2 leading-relaxed">
                         Здесь практически нет сальных желез и подкожного жира. Это «сухая зона» по умолчанию.
                     </p>
                 </div>
                 <div className="md:col-span-2 space-y-8">
                     <h4 className="font-serif font-bold text-3xl text-charcoal italic decoration-sage-300 underline underline-offset-8 decoration-2">Враги ваших глаз</h4>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                         <div className="pl-6 border-l-2 border-sage-500">
                             <strong className="block font-montserrat text-sm uppercase text-gray-900 mb-2 tracking-wide">Гликация</strong>
                             <span className="text-base text-gray-700 leading-relaxed">Сахар «склеивает» волокна коллагена, делая кожу хрупкой, как стекло.</span>
                         </div>
                         <div className="pl-6 border-l-2 border-sage-500">
                             <strong className="block font-montserrat text-sm uppercase text-gray-900 mb-2 tracking-wide">Мимика</strong>
                             <span className="text-base text-gray-700 leading-relaxed">Круговая мышца глаза работает тысячи раз в день. Это колоссальная нагрузка.</span>
                         </div>
                         <div className="pl-6 border-l-2 border-sage-500 sm:col-span-2">
                             <strong className="block font-montserrat text-sm uppercase text-gray-900 mb-2 tracking-wide">Образ жизни</strong>
                             <span className="text-base text-gray-700 leading-relaxed">Курение, недосып и отсутствие привычки пить чистую воду.</span>
                         </div>
                     </div>
                 </div>
             </div>

             {/* Steps Solution */}
             <div className="bg-[#F5F5F4] p-8 md:p-12 relative overflow-hidden rounded-xl">
                 <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/50 rounded-full blur-3xl"></div>
                 <h4 className="font-serif text-center text-3xl text-stone-700 mb-12 italic relative z-10">Протокол спасения взгляда</h4>
                 <div className="space-y-10 relative z-10">
                     {/* Connecting Line */}
                     <div className="absolute left-[19px] top-6 bottom-6 w-px bg-stone-300 hidden md:block"></div>

                     {[
                         { step: '01', title: 'Очки & SPF', text: 'Банально, но факт. Солнцезащитные очки — лучший крем от морщин. Меньше щуритесь — меньше заломов.' },
                         { step: '02', title: 'Ботулинотерапия', text: 'Золотой стандарт. Мы не меняем мимику, мы просто снимаем гипертонус. Мышца расслабляется, кожа расправляется.' },
                         { step: '03', title: 'Уплотнение', text: 'Ботокс временно убирает движение, но не лечит кожу. Мезотерапия и биоревитализация нужны, чтобы глубоко увлажнить кожу и напитать ее полезными веществами.' },
                         { step: '04', title: 'Качественный уход', text: 'Эффективны для области вокруг глаз экстракты абрикоса, конского каштана, василька, масло макадамии, витамин, L-карнитин, коэнзим Q10, альфа-липоевая кислота.' }
                     ].map((item, i) => (
                         <div key={i} className="flex flex-col md:flex-row gap-6 md:gap-10 relative">
                             <div className="w-10 h-10 rounded-full bg-stone-800 text-white flex items-center justify-center font-serif italic text-lg shrink-0 shadow-lg border-4 border-[#F5F5F4] z-10">
                                 {item.step}
                             </div>
                             <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200/50 flex-1">
                                 <strong className="block font-serif text-xl text-stone-800 mb-2">{item.title}</strong>
                                 <p className="font-montserrat text-base text-stone-700 leading-relaxed">{item.text}</p>
                             </div>
                         </div>
                     ))}
                 </div>
             </div>

             <p className="font-serif italic text-xl md:text-2xl text-center text-sage-600 pt-6 border-t border-gray-100">
                Такой комплексный подход поможет надолго сохранить кожу вокруг глаз упругой, эластичной, красивой.
             </p>
        </div>
    )
  }
];

const Blog: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    if (selectedPost) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedPost]);

  return (
    <section id="blog" className="max-w-[1200px] mx-auto px-4 py-12 md:py-20 lg:py-24 scroll-mt-28 md:scroll-mt-32">
      
      {/* Title Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[30px] mb-12 items-center">
        {/* Line */}
        <div className="hidden lg:block lg:col-start-1 lg:col-span-3">
             <div className="h-px bg-sage-500 w-full opacity-50"></div>
        </div>
        {/* Title */}
        <div className="lg:col-start-4 lg:col-span-9">
            <h2 className="font-serif font-bold italic text-sage-500 text-3xl md:text-4xl leading-none tracking-tight">
                Блог косметолога
            </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {blogPosts.map((post) => (
              <div 
                key={post.id} 
                onClick={() => setSelectedPost(post)}
                className={`group relative overflow-hidden rounded-[4px] md:rounded-[30px] bg-white shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer hover:-translate-y-1 ${post.gridClass} md:col-span-12 min-h-[400px] flex flex-col`}
              >
                  {/* Background Image Container */}
                  <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-105">
                      <img 
                        src={post.image} 
                        alt="" 
                        className={`w-full h-full object-cover ${post.imagePosition || 'object-center'}`}
                        loading="lazy"
                        decoding="async"
                      />
                      {/* Light Gradient Overlay for Magazine Style */}
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 via-35% to-transparent opacity-100 transition-opacity duration-500"></div>
                  </div>

                  {/* Content Container (Overlay) */}
                  <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-end items-start text-charcoal max-w-2xl">
                      
                      <div className="mb-4 flex items-center gap-3">
                          <span className="px-3 py-1 border border-sage-200 bg-white/60 backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest text-sage-600 font-bold shadow-sm">
                              Статья
                          </span>
                          <span className="text-xs font-montserrat text-gray-500 font-medium">{post.readTime} чтения</span>
                      </div>

                      <h3 className="font-serif italic text-3xl md:text-4xl mb-4 leading-tight group-hover:text-sage-500 transition-colors text-charcoal drop-shadow-sm whitespace-pre-wrap">
                          {post.title}
                      </h3>
                      
                      <p className="font-montserrat text-base text-gray-700 mb-6 leading-relaxed line-clamp-2 md:line-clamp-3 max-w-lg font-light">
                          {post.excerpt}
                      </p>
                      
                      <div className="flex items-center text-xs font-bold uppercase tracking-widest text-sage-600 group-hover:translate-x-2 transition-transform duration-300 border-b border-sage-200 pb-1">
                          Читать материал <ArrowUpRight size={14} className="ml-2" />
                      </div>
                  </div>
              </div>
          ))}
      </div>

      {/* Magazine Style Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center px-0 md:px-4 py-0 md:py-8">
            <div 
                className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-500" 
                onClick={() => setSelectedPost(null)}
            ></div>

            <div className="bg-white w-full max-w-[900px] h-full md:max-h-[95vh] flex flex-col relative z-10 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-500 overflow-hidden md:rounded-[4px]">
                
                {/* Close Button - Absolutely positioned in the top-right corner of the modal container */}
                <button 
                    onClick={() => setSelectedPost(null)}
                    className="absolute top-4 right-4 z-50 bg-black/10 hover:bg-white text-white hover:text-charcoal backdrop-blur-md p-2 rounded-full transition-all duration-300 border border-white/20 group"
                >
                    <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                </button>

                {/* Scrollable Container */}
                <div className="overflow-y-auto custom-scrollbar h-full relative">
                    
                    {/* HERO / COVER SECTION */}
                    <div className="relative h-[60vh] md:h-[500px] w-full shrink-0">
                         <img 
                            src={selectedPost.image} 
                            alt={selectedPost.title} 
                            className={`w-full h-full object-cover ${selectedPost.imagePosition || 'object-center'}`}
                            loading="eager"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                        
                        {/* Title on Cover */}
                        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 lg:p-16">
                             <div className="max-w-3xl">
                                <span className="inline-block px-3 py-1 mb-6 border border-white/40 rounded-full text-[10px] uppercase tracking-[0.2em] text-white/80 backdrop-blur-md">
                                    Beauty Insight
                                </span>
                                <h2 className="font-serif italic text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] mb-6 shadow-black drop-shadow-lg whitespace-pre-wrap">
                                    {selectedPost.title}
                                </h2>
                                <div className="flex items-center gap-4 text-white/80 font-montserrat text-xs tracking-widest uppercase">
                                    <span>Светлана Булгакова</span>
                                    <span className="w-1 h-1 bg-white rounded-full"></span>
                                    <span>Автор</span>
                                </div>
                             </div>
                        </div>
                    </div>

                    {/* ARTICLE BODY */}
                    <div className="bg-white relative">
                        {/* Decorative top border line */}
                        <div className="w-px h-16 bg-sage-500 absolute -top-8 left-8 md:left-16 z-20"></div>

                        <div className="px-6 py-12 md:px-16 md:py-16 lg:px-24 lg:py-20 max-w-4xl mx-auto">
                            {selectedPost.content}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}

    </section>
  );
};

export default Blog;
