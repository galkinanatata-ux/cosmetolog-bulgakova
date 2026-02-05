// Типы для системы рекомендаций квиза

export type Zone = 'face' | 'neck' | 'decollete' | 'hands';
export type Problem = 'wrinkles' | 'volume_loss' | 'pigment_couperose' | 'acne' | 'dryness';
export type Preference = 'hardware' | 'injection' | 'care';
export type Attitude = 'natural' | 'trusted' | 'all';
export type Experience = 'first' | 'long_ago' | 'regular';

type Category = 'injection' | 'hardware' | 'care';

// Этапы плана процедур
type Stage = 1 | 2 | 3 | 4;

const stageInfo: Record<Stage, { label: string; description: string }> = {
  1: { label: 'Подготовка кожи', description: 'Очищаем и готовим кожу к активным процедурам' },
  2: { label: 'Базовое восстановление', description: 'Насыщаем кожу питательными веществами и запускаем регенерацию' },
  3: { label: 'Активная коррекция', description: 'Работаем с конкретными проблемами: морщинами, объёмами, текстурой' },
  4: { label: 'Закрепление результата', description: 'Усиливаем и продлеваем эффект аппаратными методиками' },
};

export interface Procedure {
  id: string;
  name: string;
  category: Category;
  categoryLabel: string;
  problems: Problem[];
  isNatural: boolean;  // true = аутологичная методика (плазма, биофиллер)
  stage: Stage;  // этап в плане процедур
  description: string;  // продающий текст (по умолчанию / для лица)
  zoneDescriptions?: Partial<Record<Zone, string>>; // описания, адаптированные под конкретную зону
  excludeZones?: Zone[];  // зоны, для которых процедура НЕ подходит
  excludeAgeGroups?: string[];  // возрастные группы, для которых процедура НЕ подходит
  alternativeGroup?: string;  // группа альтернатив — процедуры с одинаковой группой показываются с "или"
}

export interface Recommendation {
  procedure: Procedure;
  reason: string;  // продающий тезис
  stageNumber: number;
  stageLabel: string;
  stageDescription: string;
  alternativeGroup?: string;  // группа альтернатив
}

export interface QuizAnswers {
  zones: Zone[];
  ageGroup: string;
  problems: Problem[];
  preferences: Preference[];
  attitude: Attitude;
  experience: Experience;
}

// Персонализированные тексты под все параметры квиза
export interface PersonalizedTextParams {
  ageGroup: string;
  experience: string;
  zone: Zone;
  preferences: Preference[];
  attitude: Attitude;
}

export function getPersonalizedText(params: PersonalizedTextParams): { intro: string; cta: string } {
  const { ageGroup, experience, zone, preferences, attitude } = params;

  // Названия зон
  const zoneNames: Record<Zone, string> = {
    face: 'лица',
    neck: 'шеи',
    decollete: 'декольте',
    hands: 'рук',
  };
  const zoneName = zoneNames[zone] || 'лица';

  // Описания зон
  const zoneDescriptions: Record<Zone, string> = {
    face: 'Лицо — визитная карточка, и я знаю, как сохранить его молодость и свежесть.',
    neck: 'Шея часто выдаёт возраст раньше лица, но современные методики творят чудеса с этой деликатной зоной.',
    decollete: 'Зона декольте требует особого внимания — тонкая кожа здесь нуждается в бережном, но эффективном уходе.',
    hands: 'Руки — одна из самых уязвимых зон, но правильно подобранные процедуры вернут им молодость и ухоженность.',
  };

  // Тексты про методы
  const getMethodText = () => {
    if (preferences.includes('all' as Preference)) {
      return 'Отлично, что вы открыты к разным методикам — это позволит составить максимально эффективную программу.';
    }
    const methods: string[] = [];
    if (preferences.includes('injection')) methods.push('инъекционные методики');
    if (preferences.includes('hardware')) methods.push('аппаратную косметологию');
    if (preferences.includes('care')) methods.push('уходовые процедуры');

    if (methods.length === 1) {
      return `Вы выбрали ${methods[0]} — отличное направление для достижения ваших целей.`;
    } else if (methods.length > 1) {
      return `Сочетание ${methods.join(' и ')} даст синергетический эффект.`;
    }
    return '';
  };

  // Тексты про отношение к препаратам
  const getAttitudeText = () => {
    if (attitude === 'natural') {
      return 'Полностью поддерживаю ваш выбор в пользу натуральных методик — они безопасны и дают прекрасные результаты.';
    } else if (attitude === 'trusted') {
      return 'Современные сертифицированные препараты абсолютно безопасны и дают предсказуемый результат.';
    }
    return '';
  };

  // Приветствие по опыту
  const getExperienceGreeting = () => {
    if (experience === 'first') {
      if (ageGroup === 'upto25') {
        return 'Как здорово, что вы решили позаботиться о себе уже сейчас!';
      } else if (ageGroup === '45plus') {
        return 'Начать заботиться о себе никогда не поздно!';
      }
      return 'Рада, что вы решили доверить мне свой первый визит к косметологу!';
    } else if (experience === 'long_ago') {
      return 'Отлично, что вы решили вернуться к уходу! Современные методики шагнули далеко вперёд.';
    } else {
      return 'Замечательно, что вы регулярно следите за собой — это лучшая стратегия!';
    }
  };

  // Текст про возраст
  const getAgeText = () => {
    if (ageGroup === 'upto25') {
      return `В вашем возрасте главное — профилактика. ${zoneDescriptions[zone]}`;
    } else if (ageGroup === '25-35') {
      return `Это идеальное время для активной профилактики зоны ${zoneName}. Кожа ещё упругая, но уже пора работать на опережение.`;
    } else if (ageGroup === '35-45') {
      return `Возрастные изменения зоны ${zoneName} становятся заметнее, но это отличный момент для эффективной коррекции.`;
    } else {
      return `Современная косметология творит чудеса с зоной ${zoneName} в любом возрасте. Главное — грамотный подход.`;
    }
  };

  // CTA тексты
  const getCta = () => {
    if (experience === 'first') {
      if (ageGroup === 'upto25') {
        return 'Начнём с базового ухода и заложим фундамент красивой кожи на годы вперёд.';
      }
      return 'На консультации я подробно расскажу о каждой процедуре и составим комфортный для вас план.';
    } else if (experience === 'long_ago') {
      return 'Составлю программу, которая быстро вернёт коже тонус и свежий вид.';
    } else {
      if (ageGroup === '45plus') {
        return 'Подберу процедуры, которые дополнят ваш уход и дадут видимый лифтинг-эффект.';
      }
      return 'Усилим ваш уход современными методиками для ещё лучшего результата.';
    }
  };

  // Собираем intro из частей
  const introParts = [getExperienceGreeting(), getAgeText()];

  // Добавляем текст про методы, если не все выбраны
  const methodText = getMethodText();
  if (methodText && !preferences.includes('all' as Preference)) {
    introParts.push(methodText);
  }

  // Добавляем текст про препараты для натуральных
  if (attitude === 'natural') {
    introParts.push(getAttitudeText());
  }

  return {
    intro: introParts.join(' '),
    cta: getCta(),
  };
}

// Для обратной совместимости
export const ageGroupTexts: Record<string, { intro: string; cta: string }> = {
  'upto25': {
    intro: 'В вашем возрасте главное — профилактика и правильный уход. Я помогу сохранить молодость кожи и предотвратить появление первых признаков старения.',
    cta: 'Начнём с базового ухода и подберём процедуры, которые заложат фундамент красивой кожи на годы вперёд.',
  },
  '25-35': {
    intro: 'Это идеальное время для активной профилактики. Кожа ещё упругая, но уже появляются первые мимические морщинки — самое время начать работать на опережение.',
    cta: 'Подберём процедуры, которые поддержат тонус кожи и предотвратят углубление морщин.',
  },
  '35-45': {
    intro: 'Возрастные изменения становятся заметнее, но это отличный момент для эффективной коррекции. Современные методики дают впечатляющие результаты.',
    cta: 'Я могу составить комплексную программу, которая вернёт коже свежесть и подтянутость.',
  },
  '45plus': {
    intro: 'Современная косметология творит чудеса в любом возрасте. Главное — грамотный подход и правильно подобранные процедуры.',
    cta: 'Разработаем индивидуальную anti-age программу с учётом особенностей зрелой кожи.',
  },
};

// Каталог процедур (12 штук) с продающими текстами

const procedures: Procedure[] = [
  // --- Инъекционные (injection) ---
  {
    id: 'plasma',
    name: 'Плазмотерапия',
    category: 'injection',
    categoryLabel: 'Инъекционная косметология',
    problems: ['acne', 'dryness'],
    isNatural: true,
    stage: 2,
    description: 'Естественное обновление кожи силой собственной плазмы — запускает регенерацию, выравнивает тон и возвращает здоровое сияние без синтетических препаратов.',
    zoneDescriptions: {
      neck: 'Регенерация кожи шеи собственной плазмой — восстанавливает упругость, уплотняет истончённую кожу и улучшает её текстуру без синтетических препаратов.',
      decollete: 'Восстановление кожи декольте силой собственной плазмы — уплотняет тонкую кожу, выравнивает тон и возвращает упругость.',
      hands: 'Омоложение кожи рук собственной плазмой — восстанавливает плотность, разглаживает и улучшает цвет кожи без синтетических препаратов.',
    },
    alternativeGroup: 'hydration',  // альтернатива биоревитализации
  },
  {
    id: 'botox',
    name: 'Ботулинотерапия',
    category: 'injection',
    categoryLabel: 'Инъекционная косметология',
    problems: ['wrinkles'],
    isNatural: false,
    stage: 3,
    description: 'Золотой стандарт коррекции мимических морщин — результат заметен уже через 3–5 дней, а эффект гладкой и отдохнувшей кожи сохраняется до 6 месяцев.',
    zoneDescriptions: {
      neck: 'Расслабление тяжей платизмы для устранения колец Венеры и визуального удлинения шеи — результат заметен через 5–7 дней и сохраняется до 4–6 месяцев.',
      decollete: 'Разглаживание заломов и морщин в зоне декольте за счёт расслабления мышечных волокон — кожа выглядит ровной и ухоженной.',
    },
    excludeZones: ['hands'],
  },
  {
    id: 'meso',
    name: 'Мезотерапия',
    category: 'injection',
    categoryLabel: 'Инъекционная косметология',
    problems: ['acne', 'pigment_couperose', 'dryness'],
    isNatural: false,
    stage: 2,
    description: 'Адресная доставка витаминных коктейлей в глубокие слои кожи — устраняет тусклость, сужает поры и восстанавливает здоровый цвет лица.',
    zoneDescriptions: {
      neck: 'Витаминные коктейли для кожи шеи — питают, уплотняют и выравнивают тон, возвращая шее ухоженный и подтянутый вид.',
      decollete: 'Питательные микроинъекции для зоны декольте — насыщают кожу витаминами, выравнивают пигментацию и улучшают текстуру.',
    },
    excludeZones: ['hands'],
    excludeAgeGroups: ['45plus'],  // для 45+ нужны более эффективные методики
    alternativeGroup: 'hydration',
  },
  {
    id: 'biorevit',
    name: 'Биоревитализация',
    category: 'injection',
    categoryLabel: 'Инъекционная косметология',
    problems: ['wrinkles', 'dryness'],
    isNatural: false,
    stage: 2,
    description: 'Глубокое насыщение кожи гиалуроновой кислотой — мгновенное увлажнение, разглаживание мелких морщин и естественное сияние изнутри на несколько недель.',
    zoneDescriptions: {
      neck: 'Глубокое увлажнение кожи шеи гиалуроновой кислотой — разглаживает кольца Венеры, уплотняет кожу и возвращает ей тонус.',
      decollete: 'Насыщение кожи декольте гиалуроновой кислотой — увлажняет, разглаживает морщины и восстанавливает упругость этой деликатной зоны.',
      hands: 'Увлажнение кожи рук гиалуроновой кислотой — разглаживает морщины, восстанавливает плотность и придаёт коже ухоженный вид.',
    },
    alternativeGroup: 'hydration',  // альтернатива плазмотерапии
  },
  {
    id: 'collagen',
    name: 'Коллагенотерапия',
    category: 'injection',
    categoryLabel: 'Инъекционная косметология',
    problems: ['dryness'],
    isNatural: false,
    stage: 2,
    description: 'Стимуляция выработки собственного коллагена — кожа становится плотнее, эластичнее и увлажнённее изнутри с накопительным эффектом от курса.',
    zoneDescriptions: {
      neck: 'Стимуляция коллагена в коже шеи — восстанавливает плотность и эластичность, подтягивает и разглаживает с накопительным эффектом от курса.',
      decollete: 'Уплотнение кожи декольте за счёт стимуляции собственного коллагена — восстанавливает упругость и гладкость этой деликатной зоны.',
    },
    excludeZones: ['hands'],
  },
  {
    id: 'contour',
    name: 'Контурная пластика',
    category: 'injection',
    categoryLabel: 'Инъекционная косметология',
    problems: ['volume_loss'],
    isNatural: false,
    stage: 3,
    description: 'Мгновенное восполнение утраченных объёмов и чёткая скульптура овала лица — результат виден сразу после процедуры и держится до 12 месяцев.',
    excludeZones: ['hands'],
  },
  {
    id: 'biofiller',
    name: 'Биофиллер MeaPlasma',
    category: 'injection',
    categoryLabel: 'Инъекционная косметология',
    problems: ['volume_loss'],
    isNatural: true,
    stage: 3,
    description: 'Инновационный биофиллер на основе собственной плазмы — натуральное восполнение объёмов без риска аллергии и с эффектом естественного омоложения.',
    excludeZones: ['hands'],
  },
  {
    id: 'blanching',
    name: 'Бланширование',
    category: 'injection',
    categoryLabel: 'Инъекционная косметология',
    problems: ['wrinkles'],
    isNatural: false,
    stage: 3,
    description: 'Ювелирная техника поверхностного введения гиалуроновой кислоты — разглаживает тонкие морщинки и придаёт коже бархатистую гладкость.',
    zoneDescriptions: {
      neck: 'Поверхностное введение гиалуроновой кислоты в кожу шеи — заполняет тонкие морщины и кольца Венеры, делая кожу гладкой и увлажнённой.',
      decollete: 'Ювелирное разглаживание тонких морщин в зоне декольте гиалуроновой кислотой — кожа приобретает бархатистую гладкость.',
    },
    excludeZones: ['hands'],
  },

  // --- Аппаратные (hardware) ---
  {
    id: 'ipl',
    name: 'IPL-терапия на аппарате Capello',
    category: 'hardware',
    categoryLabel: 'Аппаратная косметология',
    problems: ['pigment_couperose'],
    isNatural: true,
    stage: 4,
    description: 'Точечное устранение пигментации и сосудистых звёздочек импульсным светом — без повреждения кожи, с минимальным периодом восстановления.',
    zoneDescriptions: {
      neck: 'Устранение пигментных пятен и сосудистой сетки на шее импульсным светом — выравнивает тон без повреждения кожи.',
      decollete: 'Коррекция пигментации и сосудистых изменений в зоне декольте световыми импульсами — ровный тон и чистая кожа.',
      hands: 'Удаление пигментных пятен на руках импульсным светом — кожа рук выглядит моложе и ухоженнее.',
    },
  },
  {
    id: 'photorejuv',
    name: 'Фотоомоложение',
    category: 'hardware',
    categoryLabel: 'Аппаратная косметология',
    problems: ['dryness'],
    isNatural: true,
    stage: 4,
    description: 'Комплексное обновление кожи световыми импульсами — улучшает текстуру, выравнивает тон и стимулирует выработку коллагена для упругости.',
    zoneDescriptions: {
      neck: 'Фотоомоложение кожи шеи — стимулирует выработку коллагена, уплотняет кожу и возвращает ей тонус и упругость.',
      decollete: 'Обновление кожи декольте световыми импульсами — улучшает текстуру, подтягивает и стимулирует естественное омоложение.',
    },
    excludeZones: ['hands'],
  },

  // --- Уходовые (care) ---
  {
    id: 'cleaning_peeling',
    name: 'Чистка + Пилинг',
    category: 'care',
    categoryLabel: 'Уходовые процедуры',
    problems: ['acne', 'dryness'],
    isNatural: true,
    stage: 1,
    description: 'Глубокое очищение и обновление кожи — устраняет воспаления, сужает поры и запускает естественное обновление для ровного и сияющего тона.',
    excludeZones: ['hands', 'decollete'],
    excludeAgeGroups: ['45plus'],  // для 45+ нужны более серьёзные процедуры
  },
  {
    id: 'carboxy',
    name: 'Карбокситерапия',
    category: 'care',
    categoryLabel: 'Уходовые процедуры',
    problems: ['dryness'],
    isNatural: true,
    stage: 1,
    description: 'Насыщение кожи кислородом через CO₂-маски — мгновенный лифтинг-эффект, улучшение микроциркуляции и сияние кожи после первой процедуры.',
    zoneDescriptions: {
      neck: 'CO₂-маски для кожи шеи — мгновенный лифтинг-эффект, улучшение микроциркуляции и восстановление тонуса без инъекций.',
      decollete: 'Карбокситерапия зоны декольте — насыщает кожу кислородом, подтягивает и улучшает текстуру этой деликатной зоны.',
    },
    excludeZones: ['hands'],
    excludeAgeGroups: ['25-35', '35-45', '45plus'],  // карбокситерапия только для до 25 лет
  },
];

/**
 * Алгоритм рекомендаций:
 *
 * 1. Сначала фильтруем по выбранным методам (предпочтениям) — это приоритет
 * 2. Потом фильтруем по проблемам
 * 3. Фильтр по зонам и возрасту
 * 4. Фильтр по натуральности (если выбрано)
 * 5. Если после всех фильтров пусто — показываем все процедуры выбранных методов
 */
export function getRecommendations(answers: QuizAnswers): Recommendation[] {
  const { zones, ageGroup, problems, preferences, attitude } = answers;
  const isNaturalAttitude = attitude === 'natural';
  const wantsAll = preferences.includes('all' as Preference);

  // Хелперы для исключений
  const isOnlyExcludedZones = (excludeZones: Zone[] | undefined) => {
    if (!excludeZones || excludeZones.length === 0) return false;
    return zones.every(z => excludeZones.includes(z));
  };

  const isExcludedByAge = (excludeAgeGroups: string[] | undefined) => {
    if (!excludeAgeGroups || excludeAgeGroups.length === 0) return false;
    return excludeAgeGroups.includes(ageGroup);
  };

  // 1. Сначала фильтруем по методам (это главный приоритет пользователя)
  const byPreference = wantsAll
    ? procedures
    : procedures.filter(p => preferences.includes(p.category as Preference));

  // 2. Фильтр по зонам и возрасту
  const byZoneAndAge = byPreference.filter(p =>
    !isOnlyExcludedZones(p.excludeZones) &&
    !isExcludedByAge(p.excludeAgeGroups)
  );

  // 3. Фильтр по проблемам
  const byProblem = byZoneAndAge.filter(p =>
    p.problems.some(prob => problems.includes(prob))
  );

  // 4. Фильтр по натуральности
  let pool = isNaturalAttitude
    ? byProblem.filter(p => p.isNatural)
    : byProblem;

  // 5. Fallback: если после фильтра натуральности пусто — убираем его
  if (pool.length === 0 && isNaturalAttitude) {
    pool = byProblem;
  }

  // 6. Fallback: если после фильтра по проблемам пусто — показываем все процедуры выбранных методов
  if (pool.length === 0) {
    pool = byZoneAndAge;
  }

  // 7. Финальный fallback: если вообще ничего — все процедуры выбранных методов без фильтров
  if (pool.length === 0) {
    pool = byPreference;
  }

  // 5. Дедупликация
  const seen = new Set<string>();
  const unique = pool.filter(p => {
    if (seen.has(p.id)) return false;
    seen.add(p.id);
    return true;
  });

  // 6. Сортировка: сначала по этапу (stage), затем по количеству покрытых проблем
  const sorted = [...unique].sort((a, b) => {
    // Сначала по этапу
    if (a.stage !== b.stage) return a.stage - b.stage;
    // Затем по количеству покрытых проблем (больше — выше)
    const aMatches = a.problems.filter(prob => problems.includes(prob)).length;
    const bMatches = b.problems.filter(prob => problems.includes(prob)).length;
    return bMatches - aMatches;
  });

  // 7. Диверсификация: не больше 3 процедур из одной категории
  const categoryCount: Record<string, number> = {};
  const diversified = sorted.filter(p => {
    const cat = p.category;
    categoryCount[cat] = (categoryCount[cat] || 0) + 1;
    return categoryCount[cat] <= 3;
  });

  // 8. Лимит: до 6 процедур для полноты плана
  const limited = diversified.slice(0, 6);

  // Определяем «приоритетную зону» для выбора описания:
  // если выбрана не только face — берём первую не-face зону
  const primaryZone = zones.find(z => z !== 'face') || zones[0] || 'face';

  // 9. Нумеруем этапы последовательно (1, 2, 3...) для отображения
  let stepNumber = 0;
  let lastStage = 0;

  // 10. Формируем результат — с информацией об этапе
  return limited.map(procedure => {
    let reason = procedure.description;

    // Для конкретной зоны (не лицо) используем описание под зону, если есть
    if (primaryZone !== 'face' && procedure.zoneDescriptions?.[primaryZone]) {
      reason = procedure.zoneDescriptions[primaryZone]!;
    }

    // Увеличиваем номер этапа только при смене stage
    if (procedure.stage !== lastStage) {
      stepNumber++;
      lastStage = procedure.stage;
    }

    const info = stageInfo[procedure.stage];

    return {
      procedure,
      reason,
      stageNumber: stepNumber,
      stageLabel: info.label,
      stageDescription: info.description,
      alternativeGroup: procedure.alternativeGroup,
    };
  });
}
