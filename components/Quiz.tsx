import React, { useState, useMemo } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle2, Sparkles, ChevronDown, Check } from 'lucide-react';
import { QuizData, QuizQuestion } from '../types';
import { getRecommendations, QuizAnswers, Recommendation, getPersonalizedText, Zone, Preference, Attitude } from '../data/quizRecommendations';

interface QuizProps {
  onOpenContactModal?: () => void;
  data?: QuizData;
}

// Default data (fallback) - 5 шагов
const defaultQuestions: QuizQuestion[] = [
  {
    id: 1,
    title: 'Какая зона вас беспокоит?',
    subtitle: 'Выберите одну зону для персонального плана',
    layout: 'grid',
    options: [
      { id: 'face', label: 'Лицо', image: 'https://i.ibb.co/DgKQWgmJ/1.png' },
      { id: 'neck', label: 'Шея', image: 'https://i.ibb.co/CK8WRCnn/2.png' },
      { id: 'decollete', label: 'Декольте', image: 'https://i.ibb.co/xSFLqsw2/3.png' },
      { id: 'hands', label: 'Руки', image: 'https://i.ibb.co/7J1SPyML/4.jpg' },
    ],
  },
  {
    id: 2,
    title: 'Ваша возрастная группа?',
    subtitle: 'Возраст влияет на выбор протоколов',
    layout: 'list',
    options: [
      { id: 'upto25', label: 'До 25 лет' },
      { id: '25-35', label: '25 – 35 лет' },
      { id: '35-45', label: '35 – 45 лет' },
      { id: '45plus', label: '45 лет и старше' },
    ],
  },
  {
    id: 3,
    title: 'Что вас беспокоит?',
    subtitle: 'Можно выбрать несколько',
    layout: 'list',
    multiSelect: true,
    options: [
      { id: 'wrinkles', label: 'Морщины' },
      { id: 'volume_loss', label: 'Потеря объёмов и чёткости овала' },
      { id: 'pigment_couperose', label: 'Пигментация / Сосудистая сетка (купероз)' },
      { id: 'acne', label: 'Высыпания, акне, расширенные поры' },
      { id: 'dryness', label: 'Сухость, тусклый цвет лица, потеря упругости' },
    ],
  },
  {
    id: 4,
    title: 'Какой тип процедур вам ближе?',
    subtitle: 'Можно выбрать несколько',
    layout: 'list',
    multiSelect: true,
    options: [
      { id: 'hardware', label: 'Аппаратная косметология' },
      { id: 'injection', label: 'Инъекционные методики' },
      { id: 'care', label: 'Уходовые процедуры (массаж, чистка, пилинг)' },
      { id: 'all', label: 'Готова на всё для максимального результата' },
    ],
  },
  {
    id: 5,
    title: 'Ваше отношение к препаратам?',
    subtitle: 'Выберите один вариант',
    layout: 'list',
    options: [
      { id: 'natural', label: 'За полную натуральность — только методики на ресурсах моего организма (плазма, биофиллер)' },
      { id: 'trusted', label: 'Доверяю проверенным брендам — спокойно отношусь к сертифицированным филлерам и биоревитализантам' },
      { id: 'all', label: 'Хочу всё и сразу — готова сочетать любые методики для лучшего эффекта' },
    ],
  },
  {
    id: 6,
    title: 'Был ли у вас опыт косметологических процедур?',
    subtitle: 'Это поможет подобрать оптимальный подход',
    layout: 'list',
    options: [
      { id: 'first', label: 'Нет, это будет мой первый визит к косметологу' },
      { id: 'long_ago', label: 'Да, но давно — хочу вернуться к уходу' },
      { id: 'regular', label: 'Да, регулярно слежу за собой' },
    ],
  },
];

// Проблемы, специфичные для каждой зоны
const zoneProblemOptions: Record<string, { id: string; label: string }[]> = {
  face: [
    { id: 'wrinkles', label: 'Морщины' },
    { id: 'volume_loss', label: 'Потеря объёмов и чёткости овала' },
    { id: 'pigment_couperose', label: 'Пигментация / Сосудистая сетка (купероз)' },
    { id: 'acne', label: 'Высыпания, акне, расширенные поры' },
    { id: 'dryness', label: 'Сухость, тусклый цвет лица, потеря упругости' },
  ],
  neck: [
    { id: 'dryness', label: 'Потеря упругости' },
    { id: 'pigment_couperose', label: 'Пигментные пятна' },
    { id: 'wrinkles', label: 'Глубокие морщины (кольца Венеры)' },
  ],
  decollete: [
    { id: 'pigment_couperose', label: 'Пигментные пятна' },
    { id: 'dryness', label: 'Потеря упругости и сухость' },
    { id: 'wrinkles', label: 'Морщины и дряблость кожи' },
  ],
  hands: [
    { id: 'pigment_couperose', label: 'Пигментные пятна' },
    { id: 'dryness', label: 'Сухость и потеря упругости' },
    { id: 'wrinkles', label: 'Морщины и истончение кожи' },
  ],
};

const Quiz: React.FC<QuizProps> = ({ data }) => {
  const sectionTitle = data?.sectionTitle?.content || 'Не знаете, какая именно \nпроцедура вам нужна?';
  const sectionSubtitle = data?.sectionSubtitle || 'Ответьте на\u00A06 вопросов, и\u00A0я подберу для\u00A0вас персональный план процедур.';
  const completedTitle = data?.completedTitle || 'Спасибо за ваши ответы!';
  const completedSubtitle = data?.completedSubtitle || 'Я проанализирую ваши ответы и\u00A0подготовлю персональный план преображения.';
  const baseQuestions = data?.questions || defaultQuestions;

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);

  // Проверяем, выбраны ли только аппаратные методы
  const selectedPreferences = answers[4] || [];
  const isOnlyHardware = selectedPreferences.length === 1 && selectedPreferences[0] === 'hardware';

  // Динамические проблемы на основе выбранных зон + скрытие шага про препараты для аппаратных методов
  const questions: QuizQuestion[] = useMemo(() => {
    const selectedZones = answers[1] || [];
    // Собираем проблемы из всех выбранных зон, дедупликация по id
    const seen = new Set<string>();
    const dynamicProblems: { id: string; label: string }[] = [];
    for (const zone of selectedZones) {
      const zoneProblems = zoneProblemOptions[zone] || [];
      for (const prob of zoneProblems) {
        if (!seen.has(prob.id)) {
          seen.add(prob.id);
          dynamicProblems.push(prob);
        }
      }
    }
    // Fallback — если зоны ещё не выбраны, показываем проблемы для лица
    const problemOptions = dynamicProblems.length > 0 ? dynamicProblems : zoneProblemOptions.face;

    let filteredQuestions = baseQuestions.map(q => {
      if (q.id === 3) {
        return { ...q, options: problemOptions };
      }
      return q;
    });

    // Если выбраны только аппаратные методы — убираем шаг про препараты (id: 5)
    if (isOnlyHardware) {
      filteredQuestions = filteredQuestions.filter(q => q.id !== 5);
    }

    return filteredQuestions;
  }, [baseQuestions, answers[1], isOnlyHardware]);

  // Кешированные рекомендации на основе ответов
  const recommendations: Recommendation[] = useMemo(() => {
    if (!isCompleted) return [];
    const quizAnswers: QuizAnswers = {
      zones: (answers[1] || ['face']) as QuizAnswers['zones'],
      ageGroup: (answers[2]?.[0] || '25-35'),
      problems: (answers[3] || ['dryness']) as QuizAnswers['problems'],
      preferences: (answers[4] || ['injection']) as QuizAnswers['preferences'],
      // Если только аппаратные методы — шаг 5 пропущен, ставим 'all'
      attitude: (isOnlyHardware ? 'all' : (answers[5]?.[0] || 'all')) as QuizAnswers['attitude'],
      experience: (answers[6]?.[0] || 'first') as QuizAnswers['experience'],
    };
    return getRecommendations(quizAnswers);
  }, [isCompleted, answers, isOnlyHardware]);

  // Персонализированный текст под все параметры квиза
  const ageGroup = answers[2]?.[0] || '25-35';
  const experience = answers[6]?.[0] || 'first';
  const selectedZone = (answers[1]?.[0] || 'face') as Zone;
  const selectedPrefs = (answers[4] || ['injection']) as Preference[];
  const selectedAttitude = (isOnlyHardware ? 'all' : (answers[5]?.[0] || 'all')) as Attitude;

  const ageText = useMemo(() => getPersonalizedText({
    ageGroup,
    experience,
    zone: selectedZone,
    preferences: selectedPrefs,
    attitude: selectedAttitude,
  }), [ageGroup, experience, selectedZone, selectedPrefs, selectedAttitude]);

  // Формируем предзаполненное сообщение для мессенджеров в зависимости от опыта
  const prefilledMessage = useMemo(() => {
    if (!isCompleted || recommendations.length === 0) return '';
    const procedureNames = recommendations.map(r => r.procedure.name).join(', ');

    // Разные приветствия в зависимости от опыта
    let greeting = '';
    if (experience === 'first') {
      greeting = 'Здравствуйте, Светлана! Это мой первый визит к косметологу.';
    } else if (experience === 'long_ago') {
      greeting = 'Здравствуйте, Светлана! Давно не была у косметолога, решила вернуться к уходу.';
    } else {
      greeting = 'Здравствуйте, Светлана! Регулярно слежу за собой и хочу усилить результат.';
    }

    return `${greeting} Прошла квиз, мой предварительный результат: ${procedureNames}. Хочу прийти на осмотр и составить точную программу`;
  }, [isCompleted, recommendations, experience]);

  const telegramUrl = prefilledMessage
    ? `https://t.me/cosmetologbulgakova?text=${encodeURIComponent(prefilledMessage)}`
    : 'https://t.me/cosmetologbulgakova';

  const maxUrl = prefilledMessage
    ? `https://max.ru/u/f9LHodD0cOKYto_MCKQG2Qnif9VenEoHTGR88WAesB6ZNkwQs5ehc4-MGAs?text=${encodeURIComponent(prefilledMessage)}`
    : 'https://max.ru/u/f9LHodD0cOKYto_MCKQG2Qnif9VenEoHTGR88WAesB6ZNkwQs5ehc4-MGAs';

  // Radio: заменяет массив на [optionId]
  const handleSelect = (optionId: string) => {
    setAnswers(prev => ({ ...prev, [questions[currentStep].id]: [optionId] }));
  };

  // Checkbox: добавляет/убирает элемент из массива
  const handleToggle = (optionId: string) => {
    setAnswers(prev => {
      const questionId = questions[currentStep].id;
      const current = prev[questionId] || [];
      const updated = current.includes(optionId)
        ? current.filter(id => id !== optionId)
        : [...current, optionId];
      return { ...prev, [questionId]: updated };
    });
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const currentQuestion = questions[currentStep];
  const isMulti = !!currentQuestion?.multiSelect;
  const isAnswered = (answers[currentQuestion?.id]?.length || 0) > 0;

  const buttonClass = "w-full sm:w-auto bg-[#D9D9D9] border-2 border-dotted border-sage-400 text-sage-600 hover:bg-white hover:border-sage-500 hover:text-sage-700 px-8 py-3 rounded-[10px] text-sm font-medium transition-all duration-300 cursor-pointer text-center font-montserrat hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none";

  const isSelected = (optionId: string) =>
    (answers[currentQuestion?.id] || []).includes(optionId);

  const onOptionClick = (optionId: string) => {
    if (isMulti) {
      handleToggle(optionId);
    } else {
      handleSelect(optionId);
    }
  };

  return (
    <section className="max-w-[1200px] mx-auto px-4 my-12 md:mt-20 md:mb-24">

      <div className="bg-[#D9D9D9] rounded-[30px] p-8 md:p-12 lg:p-16 text-charcoal shadow-sm relative overflow-hidden">

        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-12 relative z-10">
            <div>
                 <div className="flex items-center space-x-4 mb-8">
                    <span className="text-gray-600 text-xs tracking-widest uppercase">Подбор услуги</span>
                    <div className="h-px bg-sage-500 w-24"></div>
                </div>
                <h2 className="font-serif font-bold italic text-3xl md:text-4xl leading-tight mb-4 text-sage-500">
                    {isCompleted ? completedTitle : sectionTitle}
                </h2>
            </div>
            <div className="pt-4 md:pt-12">
                <p className="text-gray-600 text-base max-w-sm font-montserrat leading-relaxed">
                    {isCompleted
                      ? completedSubtitle
                      : sectionSubtitle}
                </p>
            </div>
        </div>

        {/* Quiz Content Box */}
        <div className="bg-white rounded-3xl p-6 md:p-10 text-charcoal shadow-lg min-h-[400px] flex flex-col justify-between relative z-10">

            {!isCompleted ? (
              <>
                {/* Header: Title & Steps */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h3 className="text-xl md:text-2xl font-montserrat font-medium text-gray-800">{currentQuestion.title}</h3>
                        <p className="text-gray-400 text-xs mt-1 font-montserrat">{currentQuestion.subtitle}</p>
                    </div>

                    <div className="flex space-x-2 shrink-0">
                        {questions.map((q, idx) => {
                           let stateClass = "border border-gray-200 text-gray-300"; // default
                           if (idx === currentStep) stateClass = "bg-sage-500 text-white ring-2 ring-sage-200"; // active
                           else if (idx < currentStep) stateClass = "bg-sage-100 text-sage-600 border-sage-200"; // completed

                           return (
                             <span key={q.id} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${stateClass}`}>
                                {idx < currentStep ? <CheckCircle2 size={14} /> : idx + 1}
                             </span>
                           );
                        })}
                    </div>
                </div>

                {/* Options Area */}
                <div className="flex-grow">
                   {currentQuestion.layout === 'grid' ? (
                       /* Grid layout (Шаг 1 — зоны) */
                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
                           {currentQuestion.options.map((opt) => (
                               <button
                                   key={opt.id}
                                   type="button"
                                   onClick={() => onOptionClick(opt.id)}
                                   className="cursor-pointer group block h-full text-left"
                               >
                                   <div className={`relative aspect-square rounded-xl overflow-hidden mb-3 transition-all duration-300 ${isSelected(opt.id) ? 'ring-2 ring-sage-400 ring-offset-2' : 'hover:ring-2 hover:ring-gray-100 hover:ring-offset-1'}`}>
                                       {opt.image && (
                                           <img src={opt.image} alt={opt.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                       )}
                                       {isSelected(opt.id) && (
                                           <div className="absolute inset-0 bg-sage-500/20 flex items-center justify-center backdrop-blur-[1px]">
                                               <div className="bg-white text-sage-500 rounded-full p-1 shadow-sm">
                                                   <CheckCircle2 size={20} />
                                               </div>
                                           </div>
                                       )}
                                   </div>
                                   <div className="text-center">
                                       <span className={`text-sm font-medium transition-colors ${isSelected(opt.id) ? 'text-sage-600' : 'text-gray-600'}`}>
                                           {opt.label}
                                       </span>
                                   </div>
                               </button>
                           ))}
                       </div>
                   ) : (
                       /* List layout (шаги 2, 3, 4) */
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
                           {currentQuestion.options.map((opt) => (
                               <button
                                   key={opt.id}
                                   type="button"
                                   onClick={() => onOptionClick(opt.id)}
                                   className={`cursor-pointer group flex items-center p-4 rounded-xl border-2 transition-all duration-200 text-left ${isSelected(opt.id) ? 'border-sage-400 bg-sage-50' : 'border-gray-100 hover:border-sage-200 hover:bg-gray-50'}`}
                               >
                                   {isMulti ? (
                                       /* Checkbox indicator */
                                       <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mr-4 shrink-0 transition-colors ${isSelected(opt.id) ? 'border-sage-500 bg-sage-500' : 'border-gray-300 group-hover:border-sage-400'}`}>
                                           {isSelected(opt.id) && <Check size={12} className="text-white" strokeWidth={3} />}
                                       </div>
                                   ) : (
                                       /* Radio indicator */
                                       <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-4 shrink-0 transition-colors ${isSelected(opt.id) ? 'border-sage-500' : 'border-gray-300 group-hover:border-sage-400'}`}>
                                           {isSelected(opt.id) && <div className="w-2.5 h-2.5 rounded-full bg-sage-500"></div>}
                                       </div>
                                   )}
                                   <span className={`text-sm md:text-base font-medium ${isSelected(opt.id) ? 'text-sage-700' : 'text-gray-700'}`}>
                                       {opt.label}
                                   </span>
                               </button>
                           ))}
                       </div>
                   )}
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-between items-center border-t border-gray-100 pt-6 mt-8">
                    <button
                        onClick={handlePrev}
                        disabled={currentStep === 0}
                        className={`flex items-center text-gray-500 hover:text-sage-500 transition-colors text-sm font-medium ${currentStep === 0 ? 'opacity-0 pointer-events-none' : ''}`}
                    >
                        <ArrowLeft size={16} className="mr-2" />
                        Назад
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={!isAnswered}
                        className={buttonClass}
                    >
                        {currentStep === questions.length - 1 ? 'Получить результат' : 'Далее'}
                        {currentStep !== questions.length - 1 && <ArrowRight size={16} className="ml-2 inline-block" />}
                    </button>
                </div>
              </>
            ) : (
              // Recommendations Screen
              <div className="flex flex-col items-center py-8 animate-in zoom-in-95 duration-500">
                  <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mb-5 text-sage-500 mx-auto">
                      <Sparkles size={32} />
                  </div>

                  {/* Персонализированный текст под возраст */}
                  <p className="font-montserrat text-gray-600 text-[15px] md:text-base leading-relaxed mb-6 text-center max-w-xl">
                      {ageText.intro}
                  </p>

                  <h3 className="font-serif font-bold italic text-sage-600 text-xl md:text-2xl mb-6 text-center">
                      Ваш персональный план процедур:
                  </h3>

                  {/* Recommendations List с этапами */}
                  <div className="w-full max-w-2xl space-y-4 mb-8 text-left">
                      {recommendations.map((rec, index) => {
                          // Показываем заголовок этапа только для первой процедуры в этапе
                          const showStageHeader = index === 0 || recommendations[index - 1].stageNumber !== rec.stageNumber;

                          // Проверяем, является ли следующая процедура альтернативой (тот же alternativeGroup)
                          const nextRec = recommendations[index + 1];
                          const showOrDivider = rec.alternativeGroup && nextRec?.alternativeGroup === rec.alternativeGroup;

                          // Для аппаратных процедур меняем название этапа "Закрепление результата"
                          let displayStageLabel = rec.stageLabel;
                          let displayStageDescription = rec.stageDescription;
                          if (isOnlyHardware && rec.stageLabel === 'Закрепление результата') {
                              displayStageLabel = 'Аппаратное омоложение';
                              displayStageDescription = 'Безинъекционное воздействие световыми импульсами для обновления кожи';
                          }

                          return (
                              <div key={rec.procedure.id}>
                                  {showStageHeader && (
                                      <div className="flex items-center gap-3 mb-3 mt-4 first:mt-0">
                                          <div className="w-8 h-8 rounded-full bg-sage-500 text-white flex items-center justify-center text-sm font-bold shrink-0">
                                              {rec.stageNumber}
                                          </div>
                                          <div>
                                              <h4 className="font-montserrat font-semibold text-gray-800 text-sm">
                                                  {displayStageLabel}
                                              </h4>
                                              <p className="text-gray-400 text-xs">
                                                  {displayStageDescription}
                                              </p>
                                          </div>
                                      </div>
                                  )}
                                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 ml-11">
                                      <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 mb-1.5">
                                          <h4 className="font-montserrat font-semibold text-gray-800 text-base leading-snug">
                                              {rec.procedure.name}
                                          </h4>
                                          <span className="text-sage-500 text-xs font-medium">
                                              {rec.procedure.categoryLabel}
                                          </span>
                                      </div>
                                      <p className="text-gray-500 text-[15px] md:text-base leading-relaxed">
                                          {rec.reason}
                                      </p>
                                  </div>
                                  {/* Разделитель "или" между альтернативами */}
                                  {showOrDivider && (
                                      <div className="flex items-center justify-center ml-11 my-2">
                                          <div className="h-px bg-gray-200 flex-1"></div>
                                          <span className="px-4 text-sage-500 font-medium text-sm italic">или</span>
                                          <div className="h-px bg-gray-200 flex-1"></div>
                                      </div>
                                  )}
                              </div>
                          );
                      })}
                  </div>

                  {/* Consultation CTA block */}
                  <div className="w-full max-w-2xl bg-sage-50 border border-sage-200 rounded-xl p-6 md:p-8 mb-8 text-left">
                      <div className="flex flex-col md:flex-row gap-5 md:gap-6 mb-5">
                          <img
                              src="https://i.ibb.co/wh684Skw/image.jpg"
                              alt="Косметолог Светлана Булгакова"
                              className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 border-sage-200 shrink-0 mx-auto md:mx-0"
                          />
                          <div>
                              <p className="font-montserrat text-gray-700 text-[15px] md:text-base leading-relaxed mb-3">
                                  {ageText.cta}
                              </p>
                              <p className="font-montserrat text-gray-600 text-[15px] md:text-base leading-relaxed">
                                  Но для точного плана мне нужно:
                              </p>
                          </div>
                      </div>
                      <ul className="space-y-2.5 mb-5">
                          <li className="flex items-start gap-2.5 text-[15px] md:text-base text-gray-600 leading-relaxed">
                              <span className="w-1.5 h-1.5 rounded-full bg-sage-400 shrink-0 mt-2"></span>
                              Провести визуальный осмотр и оценить тонус тканей
                          </li>
                          <li className="flex items-start gap-2.5 text-[15px] md:text-base text-gray-600 leading-relaxed">
                              <span className="w-1.5 h-1.5 rounded-full bg-sage-400 shrink-0 mt-2"></span>
                              Определить ваш морфотип старения и текущее состояние кожи
                          </li>
                          <li className="flex items-start gap-2.5 text-[15px] md:text-base text-gray-600 leading-relaxed">
                              <span className="w-1.5 h-1.5 rounded-full bg-sage-400 shrink-0 mt-2"></span>
                              Исключить скрытые противопоказания и подобрать нужный препарат
                          </li>
                      </ul>
                      <p className="font-montserrat font-medium text-sage-700 text-[15px] md:text-base leading-relaxed">
                          Запишитесь на консультацию — составим ваш точный «план красоты»!
                      </p>
                  </div>

                  {/* Collapsible Answers */}
                  <div className="w-full max-w-2xl mb-8">
                      <button
                          onClick={() => setShowAnswers(prev => !prev)}
                          className="flex items-center justify-center gap-1.5 mx-auto text-gray-400 text-xs hover:text-sage-500 transition-colors"
                      >
                          <span>{showAnswers ? 'Скрыть ваши ответы' : 'Показать ваши ответы'}</span>
                          <ChevronDown size={14} className={`transition-transform duration-200 ${showAnswers ? 'rotate-180' : ''}`} />
                      </button>
                      {showAnswers && (
                          <div className="mt-4 bg-gray-50 rounded-xl p-5 border border-gray-100 animate-in fade-in slide-in-from-top-2 duration-300">
                              <div className="space-y-2 text-left">
                                  {questions.map(q => {
                                      const answerIds = answers[q.id] || [];
                                      const answerLabels = answerIds
                                          .map(id => q.options.find(o => o.id === id)?.label)
                                          .filter(Boolean)
                                          .join(', ');
                                      return (
                                          <div key={q.id} className="flex justify-between text-sm border-b border-gray-200 border-dotted pb-1 last:border-0">
                                              <span className="text-gray-500 shrink-0 mr-4">{q.title}</span>
                                              <span className="font-medium text-sage-600 text-right">{answerLabels}</span>
                                          </div>
                                      );
                                  })}
                              </div>
                          </div>
                      )}
                  </div>

                  {/* Messenger buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl mb-6">
                      <a
                          href={maxUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 text-center bg-sage-600 text-white px-6 py-4 rounded-[10px] text-[15px] md:text-base font-medium hover:bg-sage-700 transition-all duration-300 shadow-lg hover:-translate-y-1"
                      >
                          Записаться через MAX
                      </a>
                      <a
                          href={telegramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 text-center bg-sage-400 text-white px-6 py-4 rounded-[10px] text-[15px] md:text-base font-medium hover:bg-sage-500 transition-all duration-300 shadow-lg hover:-translate-y-1"
                      >
                          Записаться через Телеграм
                      </a>
                  </div>

                  {/* Bonus block */}
                  <div className="w-full max-w-2xl bg-white border-2 border-dashed border-sage-300 rounded-xl p-5 md:p-6 mb-8 text-center">
                      <p className="font-serif font-bold italic text-sage-600 text-lg md:text-xl mb-2">
                          Ваш бонус за прохождение квиза:
                      </p>
                      <p className="font-montserrat text-gray-600 text-[15px] md:text-base leading-relaxed">
                          При записи на консультацию в течение 3-х дней вы получаете <span className="font-bold text-sage-700">профессиональный подбор домашнего ухода в&nbsp;подарок!</span>
                      </p>
                  </div>

                  <button
                      onClick={() => {
                          setIsCompleted(false);
                          setCurrentStep(0);
                          setAnswers({});
                          setShowAnswers(false);
                      }}
                      className="text-gray-400 text-xs hover:text-sage-500 transition-colors"
                  >
                      Пройти заново
                  </button>
              </div>
            )}

        </div>

      </div>
    </section>
  );
};

export default Quiz;
