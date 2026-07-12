const fs = require("node:fs");
const path = require("node:path");

const SITE = "https://lemelson.github.io/VoiceScope";
const APP = `${SITE}/`;

const languagePages = [
  {
    code: "ru", lang: "ru", slug: "ru", name: "Русский",
    title: "Анализатор высоты и частоты голоса онлайн — VoiceScope",
    description: "Бесплатно измерьте частоту голоса в герцах, узнайте музыкальные ноты и посмотрите график высоты голоса. Анализ выполняется локально в браузере.",
    eyebrow: "Бесплатный анализ голоса в браузере",
    h1: "Определите высоту и частоту своего голоса онлайн",
    intro: "VoiceScope записывает речь с микрофона, измеряет основную частоту голоса (F0) и показывает результат в герцах, музыкальных нотах и на временном графике.",
    cta: "Начать анализ голоса",
    sectionTitle: "Что показывает VoiceScope",
    sectionBody: "Один средний показатель не описывает всю речь. Поэтому VoiceScope показывает медианную и среднюю частоту, диапазон, долю распознанной речи и полный контур высоты. Умный режим удаляет короткие шумовые скачки, сохраняя устойчивые изменения тона.",
    tipsTitle: "Как получить точный результат",
    tips: ["Записывайтесь в тихой комнате.", "Говорите естественно не менее 15 секунд.", "Держите микрофон на расстоянии 10–20 см.", "Повторите тест и сравните медианные значения."],
  },
  {
    code: "es", lang: "es", slug: "es", name: "Español",
    title: "Analizador de tono y frecuencia de voz online — VoiceScope",
    description: "Mide gratis la frecuencia fundamental de tu voz en Hz, identifica notas y observa el contorno de tono. El audio se procesa en tu navegador.",
    eyebrow: "Análisis de voz privado y gratuito",
    h1: "Mide el tono de tu voz en hercios y notas",
    intro: "VoiceScope analiza la frecuencia fundamental (F0) de una grabación y conserva el contorno completo para mostrar cómo cambia tu tono con el tiempo.",
    cta: "Analizar mi voz",
    sectionTitle: "Más que un único promedio",
    sectionBody: "Consulta la mediana, la media, el rango, las notas y cada punto del contorno. El modo Smart busca errores breves y de baja confianza sin borrar cambios de tono sostenidos.",
    tipsTitle: "Consejos para una medición fiable",
    tips: ["Busca una habitación silenciosa.", "Habla de forma natural durante al menos 15 segundos.", "Mantén una distancia estable al micrófono.", "Repite la prueba y compara las medianas."],
  },
  {
    code: "de", lang: "de", slug: "de", name: "Deutsch",
    title: "Online-Stimmlagen- und Frequenzanalyse — VoiceScope",
    description: "Miss kostenlos die Grundfrequenz deiner Stimme in Hertz, erkenne Noten und sieh den Tonhöhenverlauf. Die Analyse bleibt im Browser.",
    eyebrow: "Kostenlose lokale Stimmanalyse",
    h1: "Miss die Tonhöhe deiner Stimme in Hertz und Noten",
    intro: "VoiceScope bestimmt die Grundfrequenz (F0) einer Aufnahme und zeigt nicht nur einen Mittelwert, sondern den gesamten Verlauf deiner Sprech- oder Singstimme.",
    cta: "Stimme analysieren",
    sectionTitle: "Ein vollständiger Tonhöhenverlauf",
    sectionBody: "Median, Mittelwert, Umfang, erkannte Noten und zeitlicher Verlauf bleiben gemeinsam sichtbar. Der Smart-Modus entfernt kurze unsichere Ausreißer und bewahrt klare Tonhöhenwechsel.",
    tipsTitle: "So wird die Messung zuverlässiger",
    tips: ["Nimm in einem ruhigen Raum auf.", "Sprich mindestens 15 Sekunden natürlich.", "Halte den Mikrofonabstand konstant.", "Wiederhole die Messung und vergleiche die Mediane."],
  },
  {
    code: "fr", lang: "fr", slug: "fr", name: "Français",
    title: "Analyseur de hauteur et fréquence vocale en ligne — VoiceScope",
    description: "Mesurez gratuitement la fréquence fondamentale de votre voix en Hz, les notes et la courbe de hauteur. Le traitement reste dans le navigateur.",
    eyebrow: "Analyse vocale gratuite et locale",
    h1: "Mesurez la hauteur de votre voix en hertz et en notes",
    intro: "VoiceScope estime la fréquence fondamentale (F0) de votre enregistrement et affiche toute la courbe pour montrer les variations de la voix dans le temps.",
    cta: "Analyser ma voix",
    sectionTitle: "Une courbe, pas seulement un chiffre",
    sectionBody: "La médiane, la moyenne, l’étendue, les notes détectées et le contour temporel restent visibles. Le mode Smart cible les anomalies brèves et peu fiables sans supprimer les changements nets.",
    tipsTitle: "Obtenir une mesure fiable",
    tips: ["Choisissez une pièce calme.", "Parlez naturellement au moins 15 secondes.", "Gardez une distance stable du microphone.", "Répétez le test et comparez les médianes."],
  },
  {
    code: "pt", lang: "pt-BR", slug: "pt", name: "Português",
    title: "Analisador online de tom e frequência da voz — VoiceScope",
    description: "Meça gratuitamente a frequência fundamental da voz em Hz, veja notas e o contorno de tom. Todo o processamento acontece no navegador.",
    eyebrow: "Análise de voz gratuita e privada",
    h1: "Meça o tom da sua voz em hertz e notas",
    intro: "O VoiceScope estima a frequência fundamental (F0) de uma gravação e mostra como a altura da voz muda ao longo do tempo, além de médias e notas.",
    cta: "Analisar minha voz",
    sectionTitle: "Um retrato completo da gravação",
    sectionBody: "Veja mediana, média, extensão, notas detectadas e todo o contorno. O modo Smart remove falhas curtas de baixa confiança sem apagar mudanças claras e sustentadas.",
    tipsTitle: "Como melhorar a medição",
    tips: ["Grave em um ambiente silencioso.", "Fale naturalmente por pelo menos 15 segundos.", "Mantenha a distância do microfone.", "Repita o teste e compare as medianas."],
  },
  {
    code: "zh", lang: "zh-CN", slug: "zh", name: "中文",
    title: "在线声音音高与频率分析器 — VoiceScope",
    description: "免费测量声音的基频、赫兹数值、音符和音高曲线。录音和分析都在浏览器本地完成。",
    eyebrow: "免费且本地运行的声音分析",
    h1: "测量你的声音音高、频率和音符",
    intro: "VoiceScope 从麦克风录音中估算基频（F0），并显示音高随时间的变化，而不仅仅给出一个平均值。",
    cta: "开始分析声音",
    sectionTitle: "查看完整的音高曲线",
    sectionBody: "结果包含中位数、平均值、范围、识别出的音符和时间曲线。智能模式会去除短暂且置信度低的异常点，同时保留清晰、持续的音高变化。",
    tipsTitle: "提高测量可靠性",
    tips: ["在安静的房间录音。", "自然说话至少 15 秒。", "与麦克风保持稳定距离。", "重复测试并比较中位数。"],
  },
  {
    code: "ja", lang: "ja", slug: "ja", name: "日本語",
    title: "声の高さ・周波数オンライン分析 — VoiceScope",
    description: "声の基本周波数をHzで測定し、音名とピッチ曲線を確認できます。録音と解析はブラウザ内で処理されます。",
    eyebrow: "無料のローカル音声分析",
    h1: "声の高さをHz・音名・時間軸で測定",
    intro: "VoiceScopeは録音から基本周波数（F0）を推定し、平均値だけでなく、話し声や歌声の変化を時間軸の曲線として表示します。",
    cta: "声を分析する",
    sectionTitle: "1つの数値ではなく全体を見る",
    sectionBody: "中央値、平均、範囲、検出音名、ピッチ曲線を同時に確認できます。Smartモードは信頼度の低い短い異常を除き、明確な音高変化を残します。",
    tipsTitle: "測定を安定させるコツ",
    tips: ["静かな部屋で録音する。", "15秒以上自然に話す。", "マイクとの距離を一定にする。", "複数回測り中央値を比較する。"],
  },
  {
    code: "ko", lang: "ko", slug: "ko", name: "한국어",
    title: "온라인 음성 높이·주파수 분석기 — VoiceScope",
    description: "목소리의 기본 주파수를 Hz로 측정하고 음표와 피치 곡선을 확인하세요. 녹음과 분석은 브라우저 안에서 처리됩니다.",
    eyebrow: "무료 로컬 음성 분석",
    h1: "목소리 높이를 헤르츠와 음표로 측정하세요",
    intro: "VoiceScope는 녹음의 기본 주파수(F0)를 추정하고 하나의 평균값뿐 아니라 시간에 따른 전체 피치 변화를 보여 줍니다.",
    cta: "내 목소리 분석하기",
    sectionTitle: "전체 피치 곡선 확인",
    sectionBody: "중앙값, 평균, 범위, 감지된 음표와 시간 곡선을 함께 확인할 수 있습니다. Smart 모드는 신뢰도가 낮은 짧은 이상점을 제거하면서 명확한 변화는 유지합니다.",
    tipsTitle: "더 안정적인 측정 방법",
    tips: ["조용한 방에서 녹음하세요.", "15초 이상 자연스럽게 말하세요.", "마이크와의 거리를 일정하게 유지하세요.", "여러 번 측정해 중앙값을 비교하세요."],
  },
  {
    code: "hi", lang: "hi", slug: "hi", name: "हिन्दी",
    title: "ऑनलाइन आवाज़ पिच और फ़्रीक्वेंसी विश्लेषक — VoiceScope",
    description: "अपनी आवाज़ की मूल आवृत्ति Hz में मापें, सुर और पिच ग्राफ देखें। रिकॉर्डिंग और विश्लेषण ब्राउज़र में स्थानीय रूप से होता है।",
    eyebrow: "मुफ़्त और निजी आवाज़ विश्लेषण",
    h1: "अपनी आवाज़ की पिच हर्ट्ज़ और सुरों में मापें",
    intro: "VoiceScope रिकॉर्डिंग की मूल आवृत्ति (F0) का अनुमान लगाता है और केवल औसत नहीं, बल्कि समय के साथ पूरी पिच रेखा दिखाता है।",
    cta: "मेरी आवाज़ का विश्लेषण करें",
    sectionTitle: "एक संख्या से अधिक जानकारी",
    sectionBody: "मध्यिका, औसत, सीमा, पहचाने गए सुर और पूरी समय-रेखा एक साथ देखें। Smart मोड कम भरोसे वाले छोटे विचलन हटाता है और स्पष्ट बदलाव सुरक्षित रखता है।",
    tipsTitle: "विश्वसनीय माप के लिए",
    tips: ["शांत कमरे में रिकॉर्ड करें।", "कम से कम 15 सेकंड स्वाभाविक रूप से बोलें।", "माइक्रोफ़ोन से दूरी स्थिर रखें।", "परीक्षण दोहराकर मध्यिका की तुलना करें।"],
  },
];

const CHROME = {
  en: { method: "Methodology", accuracy: "Accuracy", faq: "FAQ", open: "Open analyzer", read: "Read the guide", glance: "At a glance", explore: "Explore VoiceScope", analyzer: "Voice analyzer", privacy: "Privacy", about: "About", source: "Source", languages: "Language versions", footer: "VoiceScope — open-source browser voice analysis." },
  ru: { method: "Методика", accuracy: "Точность", faq: "Вопросы", open: "Открыть анализатор", read: "Читать руководство", glance: "Кратко", explore: "Разделы VoiceScope", analyzer: "Анализатор голоса", privacy: "Конфиденциальность", about: "О проекте", source: "Исходный код", languages: "Языковые версии", footer: "VoiceScope — анализ голоса с открытым исходным кодом." },
  es: { method: "Metodología", accuracy: "Precisión", faq: "Preguntas", open: "Abrir analizador", read: "Leer la guía", glance: "En resumen", explore: "Explorar VoiceScope", analyzer: "Analizador de voz", privacy: "Privacidad", about: "Acerca de", source: "Código fuente", languages: "Versiones de idioma", footer: "VoiceScope — análisis de voz de código abierto." },
  de: { method: "Methodik", accuracy: "Genauigkeit", faq: "Fragen", open: "Analyse öffnen", read: "Leitfaden lesen", glance: "Kurz erklärt", explore: "VoiceScope entdecken", analyzer: "Stimmanalyse", privacy: "Datenschutz", about: "Über das Projekt", source: "Quellcode", languages: "Sprachversionen", footer: "VoiceScope — quelloffene Stimmanalyse im Browser." },
  fr: { method: "Méthodologie", accuracy: "Précision", faq: "Questions", open: "Ouvrir l’analyseur", read: "Lire le guide", glance: "En bref", explore: "Explorer VoiceScope", analyzer: "Analyseur vocal", privacy: "Confidentialité", about: "À propos", source: "Code source", languages: "Versions linguistiques", footer: "VoiceScope — analyse vocale open source dans le navigateur." },
  pt: { method: "Metodologia", accuracy: "Precisão", faq: "Perguntas", open: "Abrir analisador", read: "Ler o guia", glance: "Em resumo", explore: "Explorar o VoiceScope", analyzer: "Analisador de voz", privacy: "Privacidade", about: "Sobre", source: "Código-fonte", languages: "Versões de idioma", footer: "VoiceScope — análise de voz de código aberto no navegador." },
  zh: { method: "方法", accuracy: "准确性", faq: "常见问题", open: "打开分析器", read: "阅读指南", glance: "概要", explore: "探索 VoiceScope", analyzer: "声音分析器", privacy: "隐私", about: "关于", source: "源代码", languages: "语言版本", footer: "VoiceScope — 浏览器中的开源声音分析工具。" },
  ja: { method: "解析方法", accuracy: "精度", faq: "よくある質問", open: "分析を開始", read: "ガイドを読む", glance: "概要", explore: "VoiceScope ガイド", analyzer: "音声分析", privacy: "プライバシー", about: "このプロジェクトについて", source: "ソースコード", languages: "言語版", footer: "VoiceScope — ブラウザで動くオープンソース音声分析。" },
  ko: { method: "분석 방법", accuracy: "정확도", faq: "자주 묻는 질문", open: "분석기 열기", read: "가이드 읽기", glance: "요약", explore: "VoiceScope 살펴보기", analyzer: "음성 분석기", privacy: "개인정보", about: "프로젝트 소개", source: "소스 코드", languages: "언어 버전", footer: "VoiceScope — 브라우저에서 실행되는 오픈 소스 음성 분석 도구." },
  hi: { method: "कार्यविधि", accuracy: "सटीकता", faq: "सामान्य प्रश्न", open: "विश्लेषक खोलें", read: "मार्गदर्शिका पढ़ें", glance: "संक्षेप में", explore: "VoiceScope देखें", analyzer: "आवाज़ विश्लेषक", privacy: "गोपनीयता", about: "परिचय", source: "स्रोत कोड", languages: "भाषा संस्करण", footer: "VoiceScope — ब्राउज़र में मुक्त-स्रोत आवाज़ विश्लेषण।" },
};

const pages = [
  {
    slug: "voice-pitch-analyzer",
    title: "Free Online Voice Pitch Analyzer — Hz, Notes and Pitch Contour",
    description: "Record your voice and measure pitch in hertz, musical notes and a complete time-based contour with private in-browser analysis.",
    eyebrow: "Voice pitch analysis",
    h1: "A voice pitch analyzer that keeps the whole contour",
    intro: "Measure speaking or singing pitch from your microphone and inspect the result as frequency, notes, statistics, and a replayable timeline.",
    aside: "Best for people who want more than a tuner-style current note or a single average frequency.",
    sections: [
      ["What the analyzer measures", `<p>VoiceScope estimates <strong>fundamental frequency (F0)</strong>, the repeating rate of voiced sound. Each reliable frame is expressed in hertz and mapped to the nearest equal-tempered musical note. The app then reports median, mean, range, spread, voiced percentage, and the contour over time.</p><p>Pitch is only one acoustic property. The result does not measure resonance, timbre, attractiveness, identity, or vocal health.</p>`],
      ["How to use the result", `<ol><li>Record at least 15 seconds of natural speech or a sustained singing exercise.</li><li>Check the contour for stable regions and sudden isolated jumps.</li><li>Replay the recording from any position on the chart.</li><li>Compare repeated recordings using the local history.</li></ol><div class="note">For speech, the median is usually more robust than the mean because brief high or low events can pull an average away from the centre.</div>`],
      ["Smart filtering", `<p>Pitch detectors sometimes return octave errors, breath noise, clicks, or short background sounds. Smart mode combines local pitch context with detector confidence. It removes only short suspicious runs and preserves sustained register changes and clear short phrases.</p><p>Points rejected by the final trimming stage remain visible as trimmed outliers. Earlier confidence, silence, and minimum-run filters are documented in the methodology but do not appear as chart points.</p>`],
      ["Related tools and documentation", `<p>For a single speaking-frequency result, see the <a href="${SITE}/voice-frequency-test/">voice frequency test guide</a>. To understand the signal processing, read the <a href="${SITE}/methodology/">methodology</a> and <a href="${SITE}/accuracy/">accuracy notes</a>.</p>`],
    ],
  },
  {
    slug: "voice-frequency-test",
    title: "Voice Frequency Test — Measure Your Speaking Voice in Hz",
    description: "Take a free voice frequency test, measure median speaking pitch in hertz and understand what the result can and cannot tell you.",
    eyebrow: "Speaking voice frequency",
    h1: "Measure your voice frequency in hertz",
    intro: "A speaking voice frequency test estimates the fundamental frequency of voiced speech. VoiceScope adds the full contour so you can verify where the final number came from.",
    aside: "Use natural continuous speech. Forcing a low note measures that performance, not your everyday speaking centre.",
    sections: [
      ["What does a voice frequency number mean?", `<p>A result such as 112 Hz means the detected vocal-fold pattern repeated about 112 times per second during the centre of the recording. Human speech is not a fixed tone, so the contour moves continuously and includes unvoiced consonants where no F0 should be reported.</p><p>VoiceScope uses the median of accepted frames as the primary value because it resists isolated extremes.</p>`],
      ["A repeatable test protocol", `<ol><li>Wait until your voice feels normal rather than measuring immediately after waking.</li><li>Use the same microphone, room, distance, and reading passage.</li><li>Record 15–30 seconds at a comfortable volume.</li><li>Run three attempts and compare the medians and spreads.</li></ol>`],
      ["Interpreting ranges carefully", `<p>Population ranges overlap. Age, anatomy, language, emotion, medication, fatigue, microphone conditions, and speaking task can all change F0. Descriptive bands are references, not quality scores or diagnoses.</p><p>Use the history for within-person comparison under similar conditions; that is usually more meaningful than comparing one attempt with a broad population label.</p>`],
    ],
  },
  {
    slug: "how-deep-is-my-voice",
    title: "How Deep Is My Voice? Measure Speaking Pitch Online",
    description: "Find the median pitch of your speaking voice in Hz, see its full range and learn why depth cannot be reduced to one number.",
    eyebrow: "Speaking pitch explained",
    h1: "How deep is my voice? Start with F0, not a label",
    intro: "VoiceScope can measure the fundamental frequency of your speech and show where it rises and falls. That is useful evidence, but perceived depth also depends on resonance and timbre.",
    aside: "A lower F0 often sounds lower, but two voices with the same F0 can still be perceived very differently.",
    sections: [
      ["Measure natural speech", `<p>Read the supplied passage at your everyday pace and volume. Do not press your larynx down or imitate a dramatic voice. A 15–30 second sample contains more representative phrases than a single sustained vowel.</p>`],
      ["Look beyond the median", `<p>Use the median as a centre, the range as context, and the contour to see phrase endings, emphasis, and short detector mistakes. A narrow stable contour and a wide expressive contour can share the same median.</p>`],
      ["What the test cannot judge", `<p>The tool cannot determine whether a voice is attractive, masculine, feminine, healthy, trained, or suitable for a profession. It does not measure formants or a complete resonance profile. Persistent pain, hoarseness, or sudden changes belong with a qualified clinician, not an online pitch test.</p>`],
    ],
  },
  {
    slug: "voicecel-test",
    title: "Voicecel Test Explained — A More Complete Voice Frequency Test",
    description: "Run a private voicecel-style frequency test while keeping the full pitch contour, notes, playback and local recording history.",
    eyebrow: "Voicecel-style frequency testing",
    h1: "A voicecel test without reducing your voice to one label",
    intro: "VoiceScope measures the same core acoustic quantity used by voicecel-style tests—speaking F0—but keeps the recording context and avoids treating pitch as a verdict about a person.",
    aside: "The term comes from online voice-rating culture. It is not a scientific or medical classification.",
    sections: [
      ["What these tests actually measure", `<p>A voicecel test records speech, estimates fundamental frequency, and usually places the median into a labelled band. The measurable part is F0 in hertz. The social label is an interpretation added by the site, not an acoustic fact.</p>`],
      ["What VoiceScope adds", `<ul><li>A pitch contour instead of only one number.</li><li>Musical notes, median, mean, range, spread, and voiced percentage.</li><li>Replay and chart seeking to audit suspicious sections.</li><li>Smart outlier filtering and visible trimmed points.</li><li>Local history and WAV download.</li></ul>`],
      ["Use the result constructively", `<p>Compare repeated natural recordings under similar conditions. Avoid forcing a low voice to chase a category. Pitch is one part of how a voice is perceived; resonance, articulation, intensity, rhythm, and context matter too.</p>`],
    ],
  },
  {
    slug: "voicecel-alternative",
    title: "Voicecel Alternative — Detailed Voice Pitch Analysis with History",
    description: "A private Voicecel alternative with full pitch visualization, notes, Smart filtering, playback, WAV download and local history.",
    eyebrow: "Feature comparison",
    h1: "A Voicecel alternative built for inspecting the measurement",
    intro: "VoiceScope is for people who want the Hz result and the evidence behind it: every accepted point, every trimmed outlier, the original audio, and repeatable settings.",
    aside: "This comparison describes visible product capabilities, not a laboratory accuracy ranking.",
    sections: [
      ["What VoiceScope includes", `<p>VoiceScope is not affiliated with voicecel.org or other voicecel-style services. This page describes VoiceScope’s own capabilities instead of assigning undocumented features to an undefined competitor.</p><table class="comparison"><thead><tr><th>Capability</th><th>VoiceScope implementation</th></tr></thead><tbody><tr><td>Speaking F0</td><td>Median and mean in hertz</td></tr><tr><td>Pitch contour</td><td>Time-based processed detections and notes</td></tr><tr><td>Filtering</td><td>Selectable profiles with final trimming outliers marked</td></tr><tr><td>Playback</td><td>Audio controls and chart seeking</td></tr><tr><td>History</td><td>Up to 30 recordings in local browser storage</td></tr><tr><td>Export</td><td>WAV for the open recording and JSON contours</td></tr></tbody></table>`],
      ["Accuracy claims", `<p>More features do not automatically prove lower measurement error. VoiceScope documents its YIN-based method, filtering, assumptions, and unit tests. It does not claim clinical validation or universal superiority. See the <a href="${SITE}/accuracy/">accuracy and limitations page</a> for the current evidence.</p>`],
      ["Privacy model", `<p>Recording, analysis, playback, and history stay in the browser. The site has no application backend. Anonymous page-view analytics are handled separately by GoatCounter and never receive microphone audio from VoiceScope.</p>`],
    ],
  },
  {
    slug: "about",
    title: "About VoiceScope — Open-Source Voice Pitch Analysis",
    description: "Learn why VoiceScope was built, what it measures and how the open-source browser-based voice analyzer is maintained.",
    eyebrow: "About the project",
    h1: "Voice analysis should be inspectable",
    intro: "VoiceScope is an independent open-source project by Lemelson. It was built to show the measurement behind a voice-frequency result instead of hiding it behind one category.",
    aside: "The source, processing steps, privacy model, and known limits are public and linked from the product.",
    sections: [
      ["Why VoiceScope exists", `<p>Many online voice tests return a single median frequency. That can be useful, but it makes octave errors, pauses, background noise, and expressive pitch changes difficult to inspect. VoiceScope keeps the full contour, recording, filter decisions, and settings together.</p>`],
      ["What the project values", `<dl class="fact-list"><div class="fact"><dt>Transparency</dt><dd>Processed detections and final trimming outliers remain visible.</dd></div><div class="fact"><dt>Privacy</dt><dd>Audio processing and history remain on the device.</dd></div><div class="fact"><dt>Neutrality</dt><dd>Pitch statistics are measurements, not judgments about a person.</dd></div><div class="fact"><dt>Reproducibility</dt><dd>Profiles and settings are stored with each local recording.</dd></div></dl>`],
      ["Open source", `<p>Review the implementation, tests, and issue history in the <a href="https://github.com/Lemelson/VoiceScope">VoiceScope GitHub repository</a>. Questions and reproducible bug reports are welcome there.</p>`],
    ],
  },
  {
    slug: "privacy",
    title: "VoiceScope Privacy — Local Audio Processing and Storage",
    description: "Understand what VoiceScope stores locally, what never leaves your device and what privacy-aware page analytics are processed.",
    eyebrow: "Privacy",
    h1: "Your microphone audio stays on your device",
    intro: "VoiceScope has no application backend for recordings. Capture, pitch analysis, playback, WAV creation, and recording history run inside your browser.",
    aside: "Last reviewed against the public source on 12 July 2026.",
    sections: [
      ["Audio and analysis data", `<p>VoiceScope does not upload microphone audio, WAV files, pitch contours, or history to a VoiceScope server. Recent recordings are stored in the browser’s IndexedDB database on the current browser profile. Clearing site data or using another browser removes or separates that history.</p>`],
      ["Privacy-aware page analytics", `<p>The site loads the third-party GoatCounter script from <code>gc.zgo.at</code>. Its default request can include the canonical page path, page title, referrer, browser and operating-system information, language, and screen width. GoatCounter derives a country from the network address. VoiceScope does not intentionally pass microphone audio, pitch results, WAV files, or recording history.</p><p>According to <a href="https://www.goatcounter.com/help/privacy">GoatCounter’s hosted-service privacy documentation</a>, these fields are normally stored as separate aggregates. The service uses site, IP address, and User-Agent transiently in memory for session counting, but says it does not store the IP address or full User-Agent in its database. GoatCounter offers an optional individual-pageview setting, documented as disabled by default. Hosted data is processed by GoatCounter.com and stored on Hetzner servers in Finland and Germany.</p><p>Because the analytics script is third-party executable code, privacy-sensitive users can block it with a content blocker without affecting recording or analysis.</p>`],
      ["Permissions", `<p>Microphone access starts only after the recording action and is controlled by the browser. The active media track is stopped when recording ends or the page closes. No account, name, email address, or cloud sync is required.</p>`],
      ["Export and deletion", `<p>WAV and JSON exports are created locally and downloaded by the browser. The Clear action deletes VoiceScope recording history from the current browser database. Browser-level site data can also be removed through browser settings.</p>`],
    ],
  },
  {
    slug: "methodology",
    title: "VoiceScope Methodology — YIN Pitch Detection and Smart Filtering",
    description: "Read the complete VoiceScope signal-processing method: audio capture, YIN F0 estimation, octave correction, Smart MAD filtering and statistics.",
    eyebrow: "Methodology",
    h1: "From microphone samples to an inspectable pitch contour",
    intro: "VoiceScope uses a deterministic browser signal-processing pipeline. This page documents each transformation and links it to the visible controls.",
    aside: "Methodology describes how the result is produced. Accuracy requires separate validation against known references.",
    sections: [
      ["1. Audio capture", `<p>The browser requests a microphone stream without echo cancellation, noise suppression, or automatic gain control so those processors do not reshape the pitch signal. PCM samples are captured locally and downsampled to approximately 16 kHz for analysis.</p>`],
      ["2. Fundamental-frequency estimation", `<p>Overlapping frames are analysed with the YIN algorithm, a time-domain estimator based on a difference function and cumulative mean normalization. Each frame produces an F0 candidate and a confidence value. The original method is described by de Cheveigné and Kawahara in <a href="https://doi.org/10.1121/1.1458024">YIN, a fundamental frequency estimator for speech and music</a>.</p>`],
      ["3. Acceptance and correction", `<p>Frames outside the configured frequency range or below detector confidence are rejected. An adaptive silence floor can remove signals close to the estimated background level. Local octave correction tests brief 2× or ½× errors against unchanged neighbours on both sides.</p>`],
      ["4. Smart filtering", `<p>Smart mode uses a hybrid median-absolute-deviation detector. The primary test compares a short run with stable context on both sides. A conservative fallback handles isolated extremes near pauses. Detector confidence protects clear pitch changes: low-confidence anomalies may be removed, while sustained runs survive.</p>`],
      ["5. Statistics and visualization", `<p>Accepted frequencies are converted to MIDI semitone positions and note names. The app calculates median, arithmetic mean, observed frequency range, full min–max semitone spread, and voiced proportion. Moving-average and exponential lines are visual aids; the processed detected points remain available.</p><p>The complete implementation is available in <a href="https://github.com/Lemelson/VoiceScope">the source repository</a>.</p>`],
    ],
  },
  {
    slug: "accuracy",
    title: "VoiceScope Accuracy and Limitations — What the Pitch Result Means",
    description: "Understand VoiceScope accuracy, tested behaviours, likely error sources and why online voice pitch measurements are not clinical assessments.",
    eyebrow: "Accuracy and limitations",
    h1: "Accurate enough to inspect; transparent about what is not proven",
    intro: "VoiceScope includes regression tests for octave correction and Smart filtering, but it is not a calibrated medical instrument and has not completed a formal multi-device laboratory benchmark.",
    aside: "A credible result distinguishes algorithm tests, real-world repeatability, and clinical validation instead of calling all three ‘accuracy’.",
    sections: [
      ["What is currently tested", `<ul><li>Short bracketed octave mistakes are corrected without dragging later speech into the wrong octave.</li><li>Brief low-confidence local spikes can be removed.</li><li>Clear short phrases and sustained register changes are preserved.</li><li>Mobile layout regressions and localization completeness have automated checks.</li></ul>`],
      ["Likely sources of error", `<dl class="fact-list"><div class="fact"><dt>Octave errors</dt><dd>A harmonic may be mistaken for the fundamental or vice versa.</dd></div><div class="fact"><dt>Noise</dt><dd>Fans, music, other voices, clicks, and reverberation can produce false candidates.</dd></div><div class="fact"><dt>Vocal quality</dt><dd>Breathy, creaky, rough, or rapidly changing phonation can reduce detector confidence.</dd></div><div class="fact"><dt>Hardware</dt><dd>Microphones and browser audio paths vary by device.</dd></div></dl>`],
      ["How to check repeatability", `<p>Use the same device, room, passage, distance, and speaking task. Record three samples and compare their medians and contours. A result that changes dramatically under matched conditions deserves inspection rather than averaging without explanation.</p>`],
      ["What VoiceScope does not claim", `<p>The tool does not diagnose vocal disorders, determine gender, score attractiveness, or estimate a complete singing range from ordinary speech. It also does not claim to be more accurate than another product without a shared reference dataset.</p>`],
      ["Planned benchmark", `<p>A useful next validation step is a public set of clean tones, synthetic speech-like signals, and labelled human-voice recordings with expected F0. Results should report gross pitch error, octave error rate, voiced/unvoiced mistakes, and device repeatability. Until that exists, the documented algorithm and inspectable contour are evidence of transparency—not clinical validation.</p>`],
    ],
  },
  {
    slug: "faq",
    title: "VoiceScope FAQ — Voice Pitch, Frequency, Privacy and Results",
    description: "Answers about measuring voice pitch in Hz, interpreting median frequency, microphone privacy, Smart filtering and recording history.",
    eyebrow: "Frequently asked questions",
    h1: "Questions about voice pitch measurement",
    intro: "Short answers to the practical and technical questions that come up when recording a speaking or singing voice.",
    aside: "For implementation detail, continue to Methodology. For evidence and limits, use Accuracy.",
    faq: [
      ["What does VoiceScope measure?", "It estimates fundamental frequency (F0) in hertz for voiced parts of a recording, converts accepted values to notes, and displays statistics and a time-based contour."],
      ["Is voice frequency the same as pitch?", "F0 is a physical repetition rate measured in hertz. Pitch is the perceptual experience associated with frequency. They are closely related but not identical in every listening situation."],
      ["What is a normal speaking voice frequency?", "There is no single normal number. Distributions vary with age, physiology, language, emotion, task, and recording conditions, and population ranges overlap."],
      ["Why is median pitch the main result?", "The median is resistant to isolated high or low frames. The mean is also shown, but a few errors or expressive peaks can move it more strongly."],
      ["Does VoiceScope upload my audio?", "No application server receives the microphone audio, WAV, pitch contour, or history. Those operations run in the browser. Anonymous GoatCounter page-view analytics are separate and do not intentionally include recording data."],
      ["What does Smart mode remove?", "It targets short points or runs that disagree with nearby speech and have weak detector confidence. Clear short phrases and sustained changes are protected."],
      ["Why does the result change between recordings?", "A voice changes naturally. Room noise, microphone distance, warm-up, hydration, emotion, passage, and speaking style also affect the sample."],
      ["Can I use VoiceScope for singing?", "Yes, especially for sustained notes and pitch contours. It is not a full vocal-range protocol and does not replace a tuner that reports cents deviation."],
      ["What is stored in History?", "Up to 30 recent recordings, their WAV data, pitch contour, statistics, and settings are stored in IndexedDB in the current browser profile, subject to a 1 GB app limit and browser storage policies."],
      ["Is this a medical test?", "No. VoiceScope is an acoustic reference tool. Persistent hoarseness, pain, breathing difficulty, or sudden unexplained vocal change should be discussed with a qualified clinician."],
    ],
  },
  {
    slug: "ru/izmerit-chastotu-golosa",
    lang: "ru",
    title: "Измерить частоту голоса онлайн в герцах — бесплатный тест",
    description: "Запишите естественную речь, измерьте медианную частоту голоса в герцах и посмотрите полный график высоты, ноты и диапазон.",
    eyebrow: "Тест частоты голоса",
    h1: "Измерьте частоту своего голоса в герцах",
    intro: "VoiceScope определяет основную частоту (F0) на озвученных участках речи и показывает не только итоговую медиану, но и каждое изменение во времени.",
    aside: "Для более устойчивого результата запишите 15–30 секунд естественной речи и повторите тест три раза.",
    cta: "Измерить мой голос",
    sections: [
      ["Что означает результат в герцах", `<p>Например, 110 Гц означает, что в центре записи распознанный голосовой цикл повторялся примерно 110 раз в секунду. Речь постоянно меняется, поэтому график и диапазон важны не меньше одного итогового числа.</p>`],
      ["Как правильно записать голос", `<ol><li>Выберите тихую комнату.</li><li>Держите микрофон на расстоянии 10–20 см.</li><li>Говорите обычным голосом не менее 15 секунд.</li><li>Сравните медиану и график нескольких попыток.</li></ol>`],
      ["Ограничения", `<p>Частота не описывает тембр, резонанс, привлекательность, пол или здоровье голоса. Диапазоны VoiceScope являются статистической справкой, а не диагнозом или оценкой человека.</p><p>Подробнее: <a href="${SITE}/ru/">анализатор высоты голоса</a>, <a href="${SITE}/methodology/">методика</a> и <a href="${SITE}/accuracy/">точность и ограничения</a>.</p>`],
    ],
  },
];

const PAGE_VISUALS = {
  "voice-pitch-analyzer": [
    { asset: "pitch-contour.svg", alt: "A VoiceScope pitch contour plotting detected notes across twenty seconds", caption: "The contour preserves timing, note position, and the recording’s central pitch." },
    { asset: "smart-filter.svg", alt: "Before and after diagram showing a short pitch spike removed by Smart filtering", caption: "Smart mode targets a brief low-confidence glitch while retaining the surrounding phrase." },
  ],
  "voice-frequency-test": [
    { asset: "frequency-summary.svg", alt: "Voice frequency summary showing a median of 96 hertz, note G2, mean, range, and voiced percentage", caption: "A median frequency becomes more useful when range, mean, and voiced proportion remain visible." },
    { asset: "recording-guide.svg", alt: "Diagram showing consistent microphone, distance, and recording duration", caption: "Keep the room, microphone distance, speaking task, and duration consistent between takes." },
  ],
  "how-deep-is-my-voice": [
    { asset: "voice-components.svg", alt: "Diagram separating pitch, resonance, timbre, and rhythm as components of perceived voice", caption: "Fundamental frequency contributes to perceived depth, but it is not the whole voice." },
    { asset: "frequency-summary.svg", alt: "Voice frequency result with median, range, mean, and voiced percentage", caption: "Use the median as a centre and the contour as evidence—not as a score of the person." },
  ],
  "voicecel-test": [
    { asset: "frequency-summary.svg", alt: "Neutral voice frequency result presented in hertz and musical note", caption: "The acoustic measurement is F0 in hertz; any social category is an interpretation added afterward." },
    { asset: "voice-components.svg", alt: "Voice perception diagram with pitch alongside resonance, timbre, and rhythm", caption: "A voicecel-style number cannot describe resonance, timbre, rhythm, or the full perception of a voice." },
  ],
  "voicecel-alternative": [
    { asset: "session-history.svg", alt: "Three local VoiceScope recording sessions with pitch contours and median frequencies", caption: "Local history makes repeated, matched recordings easier to compare." },
    { asset: "smart-filter.svg", alt: "Smart filtering diagram preserving a phrase while removing a brief glitch", caption: "Filtering decisions are easier to evaluate when the contour and final outliers remain visible." },
  ],
  about: [
    { asset: "open-source.svg", alt: "Open source analysis pipeline shown beside its resulting pitch contour", caption: "Source, tests, visible detections, and documented limits keep the method connected to the result." },
  ],
  privacy: [
    { asset: "privacy-flow.svg", alt: "Data flow from microphone to browser analysis and local storage without an audio cloud upload", caption: "Audio, WAV data, contours, and recording history stay inside the current browser profile." },
  ],
  methodology: [
    { asset: "signal-pipeline.svg", alt: "Signal pipeline from PCM audio through YIN frames and filters to a pitch contour", caption: "VoiceScope turns local PCM samples into F0 candidates, filters, notes, and a time-based contour." },
    { asset: "smart-filter.svg", alt: "Detected pitch before and after Smart filtering of a short anomaly", caption: "Smart filtering combines local context, confidence, and run length instead of cutting every extreme." },
  ],
  accuracy: [
    { asset: "accuracy-layers.svg", alt: "Three evidence levels separating regression tests, real-world repeatability, and unclaimed clinical validation", caption: "Algorithm behaviour, repeatability, and clinical validation are different evidence levels." },
    { asset: "recording-guide.svg", alt: "Repeatable voice recording setup with stable microphone, distance, and duration", caption: "Matched recording conditions reduce variation that does not come from the detector itself." },
  ],
  faq: [
    { asset: "voice-components.svg", alt: "Voice perception diagram showing pitch, resonance, timbre, and rhythm", caption: "Many common questions become clearer once pitch is separated from the rest of voice perception." },
  ],
  "ru/izmerit-chastotu-golosa": [
    { asset: "frequency-summary.svg", alt: "Результат измерения частоты голоса с медианой, диапазоном и долей распознанной речи", caption: "Медианная частота понятнее вместе с диапазоном, средним значением и графиком записи." },
    { asset: "recording-guide.svg", alt: "Схема повторяемой записи с постоянным микрофоном, расстоянием и длительностью", caption: "Для сравнения попыток сохраняйте одинаковую комнату, расстояние до микрофона и длительность." },
  ],
};

for (const page of pages) page.visuals = PAGE_VISUALS[page.slug] || [];

const LANGUAGE_VISUALS = {
  ru: { alt: "График высоты голоса по времени с частотой и музыкальными нотами", caption: "Полный график показывает, как высота голоса меняется во времени, а не только одно итоговое число." },
  es: { alt: "Curva de tono de voz con frecuencia y notas musicales a lo largo del tiempo", caption: "La curva completa muestra cómo cambia el tono, no solo un único resultado final." },
  de: { alt: "Tonhöhenverlauf der Stimme mit Frequenz und Noten über die Zeit", caption: "Der vollständige Verlauf zeigt Veränderungen der Stimme statt nur eines Endwerts." },
  fr: { alt: "Courbe de hauteur vocale avec fréquence et notes au fil du temps", caption: "La courbe complète montre les variations de la voix au lieu d’un seul résultat." },
  pt: { alt: "Contorno de tom da voz com frequência e notas ao longo do tempo", caption: "O contorno completo mostra como a voz muda, em vez de apresentar apenas um número final." },
  zh: { alt: "随时间显示声音频率和音符的音高曲线", caption: "完整曲线展示声音音高如何变化，而不只是一个最终数值。" },
  ja: { alt: "時間に沿って声の周波数と音名を示すピッチ曲線", caption: "1つの結果だけでなく、声の高さが時間とともにどう変化したかを確認できます。" },
  ko: { alt: "시간에 따른 목소리 주파수와 음표를 보여 주는 피치 곡선", caption: "하나의 최종 숫자뿐 아니라 목소리 높이가 시간에 따라 어떻게 변했는지 보여 줍니다." },
  hi: { alt: "समय के साथ आवाज़ की आवृत्ति और सुर दिखाने वाला पिच ग्राफ", caption: "पूरा ग्राफ केवल एक अंतिम संख्या नहीं, बल्कि समय के साथ पिच का बदलाव दिखाता है।" },
};

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]);
}

function languageAlternates() {
  return [
    `<link rel="alternate" hreflang="x-default" href="${APP}">`,
    `<link rel="alternate" hreflang="en" href="${APP}">`,
    ...languagePages.map((language) => `<link rel="alternate" hreflang="${language.code}" href="${SITE}/${language.slug}/">`),
  ].join("\n");
}

function labelsFor(page) {
  return CHROME[(page.lang || "en").split("-")[0]] || CHROME.en;
}

function header(page) {
  const labels = labelsFor(page);
  const lang = page.lang || "en";
  return `<header class="site-header">
    <a class="brand" href="${APP}" aria-label="VoiceScope home">Voice<i>Scope</i></a>
    <nav class="site-nav" aria-label="${escapeHtml(labels.explore)}">
      <a href="${SITE}/methodology/">${labels.method}</a>
      <a href="${SITE}/accuracy/">${labels.accuracy}</a>
      <a href="${SITE}/faq/">${labels.faq}</a>
    </nav>
    <a class="header-cta" href="${APP}?lang=${lang.split("-")[0]}">${labels.open}</a>
  </header>`;
}

function sideNavigation(page) {
  const labels = labelsFor(page);
  if ((page.lang || "en") !== "en") {
    return `<aside class="side-nav" aria-label="${escapeHtml(labels.explore)}">
      <h2>${escapeHtml(labels.explore)}</h2>
      <a href="${APP}?lang=${escapeHtml((page.lang || "en").split("-")[0])}">${escapeHtml(labels.analyzer)}</a>
      <a href="${SITE}/methodology/">${escapeHtml(labels.method)}</a>
      <a href="${SITE}/accuracy/">${escapeHtml(labels.accuracy)}</a>
      <a href="${SITE}/privacy/">${escapeHtml(labels.privacy)}</a>
      <a href="${SITE}/faq/">${escapeHtml(labels.faq)}</a>
    </aside>`;
  }
  return `<aside class="side-nav" aria-label="Related VoiceScope guides">
    <h2>Explore VoiceScope</h2>
    <a href="${SITE}/voice-pitch-analyzer/">Voice pitch analyzer</a>
    <a href="${SITE}/voice-frequency-test/">Voice frequency test</a>
    <a href="${SITE}/how-deep-is-my-voice/">How deep is my voice?</a>
    <a href="${SITE}/voicecel-test/">Voicecel test</a>
    <a href="${SITE}/voicecel-alternative/">Voicecel alternative</a>
    <a href="${SITE}/methodology/">Methodology</a>
    <a href="${SITE}/accuracy/">Accuracy</a>
    <a href="${SITE}/faq/">FAQ</a>
  </aside>`;
}

function footer(page) {
  const labels = labelsFor(page);
  return `<div class="language-nav" aria-label="${escapeHtml(labels.languages)}">
    <a href="${APP}" hreflang="en">English</a>
    ${languagePages.map((language) => `<a href="${SITE}/${language.slug}/" hreflang="${language.code}">${escapeHtml(language.name)}</a>`).join("\n    ")}
  </div>
  <footer class="site-footer">
    <div class="footer-row"><span>${escapeHtml(labels.footer)}</span>
      <nav class="footer-links" aria-label="${escapeHtml(labels.explore)}">
        <a href="${SITE}/about/">${escapeHtml(labels.about)}</a><a href="${SITE}/privacy/">${escapeHtml(labels.privacy)}</a>
        <a href="${SITE}/methodology/">${escapeHtml(labels.method)}</a><a href="${SITE}/accuracy/">${escapeHtml(labels.accuracy)}</a>
        <a href="https://github.com/Lemelson/VoiceScope">${escapeHtml(labels.source)}</a>
      </nav>
    </div>
  </footer>`;
}

function structuredData(page, canonical) {
  const webPage = {
    "@type": "WebPage",
    "@id": canonical,
    url: canonical,
    name: page.title,
    description: page.description,
    inLanguage: page.lang || "en",
    isPartOf: { "@type": "WebSite", name: "VoiceScope", url: APP },
  };
  if (page.visuals?.[0]) {
    webPage.primaryImageOfPage = {
      "@type": "ImageObject",
      contentUrl: `${SITE}/assets/${page.visuals[0].asset}`,
      caption: page.visuals[0].caption,
    };
  }
  const graph = [webPage];
  if (page.faq) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: page.faq.map(([question, answer]) => ({
        "@type": "Question", name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    });
  }
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
}

function renderFigure(visual, assetPrefix, placement) {
  if (!visual) return "";
  const eager = placement === "lead";
  return `<figure class="feature-visual ${placement === "lead" ? "lead-visual" : "article-visual"}">
    <img src="${assetPrefix}assets/${escapeHtml(visual.asset)}" width="1200" height="675" alt="${escapeHtml(visual.alt)}" loading="${eager ? "eager" : "lazy"}" decoding="async"${eager ? ' fetchpriority="high"' : ""}>
    <figcaption>${escapeHtml(visual.caption)}</figcaption>
  </figure>`;
}

function renderPage(page) {
  const canonical = `${SITE}/${page.slug}/`;
  const assetPrefix = "../".repeat(page.slug.split("/").length);
  const labels = labelsFor(page);
  const sectionBlocks = page.faq
    ? [`<section><h2>VoiceScope FAQ</h2><div class="faq-list">${page.faq.map(([question, answer]) => `<details><summary>${escapeHtml(question)}</summary><p>${escapeHtml(answer)}</p></details>`).join("")}</div></section>`]
    : page.sections.map(([title, body]) => `<section><h2>${escapeHtml(title)}</h2>${body}</section>`);
  const sections = sectionBlocks.map((section, index) =>
    section + (index === 0 ? renderFigure(page.visuals?.[1], assetPrefix, "article") : "")
  ).join("\n");
  const alternates = languagePages.some((language) => language.slug === page.slug) ? languageAlternates() : "";
  const cta = page.cta || "Start voice analysis";
  return `<!doctype html>
<html lang="${escapeHtml(page.lang || "en")}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(page.title)}</title>
  <meta name="description" content="${escapeHtml(page.description)}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <link rel="canonical" href="${canonical}">
  ${alternates}
  <link rel="icon" href="${assetPrefix}favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&amp;display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${assetPrefix}seo.css">
  <meta property="og:type" content="website"><meta property="og:site_name" content="VoiceScope">
  <meta property="og:title" content="${escapeHtml(page.title)}"><meta property="og:description" content="${escapeHtml(page.description)}">
  <meta property="og:url" content="${canonical}"><meta property="og:image" content="${SITE}/og-image.png">
  <meta name="twitter:card" content="summary_large_image">
  <script type="application/ld+json">${structuredData(page, canonical)}</script>
</head>
<body>
  <div class="site-shell">
    ${header(page)}
    <main>
      <div class="hero">
        <div><p class="eyebrow">${escapeHtml(page.eyebrow)}</p><h1>${escapeHtml(page.h1)}</h1>
          <p class="hero-copy">${escapeHtml(page.intro)}</p>
          <div class="hero-actions"><a class="button" href="${APP}?lang=${escapeHtml((page.lang || "en").split("-")[0])}">${escapeHtml(cta)}</a><a class="button secondary" href="#guide">${escapeHtml(labels.read)}</a></div>
        </div>
        <aside class="hero-aside"><strong>${escapeHtml(labels.glance)}</strong><p>${escapeHtml(page.aside)}</p></aside>
      </div>
      ${renderFigure(page.visuals?.[0], assetPrefix, "lead")}
      <div class="content-grid" id="guide"><article class="article">${sections}</article>${sideNavigation(page)}</div>
    </main>
    ${footer(page)}
  </div>
  <script data-goatcounter="https://voicescope.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>
</body>
</html>`;
}

function createLanguagePage(language) {
  const labels = labelsFor(language);
  const visualText = LANGUAGE_VISUALS[language.code];
  return {
    ...language,
    aside: language.tips.join(" "),
    visuals: [{ asset: "pitch-contour.svg", ...visualText }],
    sections: [
      [language.sectionTitle, `<p>${escapeHtml(language.sectionBody)}</p>`],
      [language.tipsTitle, `<ul>${language.tips.map((tip) => `<li>${escapeHtml(tip)}</li>`).join("")}</ul>`],
      ["VoiceScope", `<p><a href="${APP}?lang=${language.code}">${escapeHtml(language.cta)}</a>. <a href="${SITE}/methodology/">${escapeHtml(labels.method)}</a> · <a href="${SITE}/accuracy/">${escapeHtml(labels.accuracy)}</a> · <a href="${SITE}/privacy/">${escapeHtml(labels.privacy)}</a></p>`],
    ],
  };
}

function renderLanguagePage(language) {
  return renderPage(createLanguagePage(language));
}

function renderSitemap(allPages) {
  const lastModified = process.env.SITE_LASTMOD || new Date().toISOString().slice(0, 10);
  const homeLastModified = process.env.HOME_LASTMOD || lastModified;
  const localizedSlugs = new Set(languagePages.map((language) => language.slug));
  const alternates = [
    `<xhtml:link rel="alternate" hreflang="x-default" href="${APP}"/>`,
    `<xhtml:link rel="alternate" hreflang="en" href="${APP}"/>`,
    ...languagePages.map((language) => `<xhtml:link rel="alternate" hreflang="${language.code}" href="${SITE}/${language.slug}/"/>`),
  ].join("");
  const imageTag = (asset) => asset ? `<image:image><image:loc>${SITE}/assets/${asset}</image:loc></image:image>` : "";
  const entries = [
    `<url><loc>${APP}</loc><lastmod>${homeLastModified}</lastmod>${alternates}${imageTag("pitch-contour.svg")}</url>`,
    ...allPages.map((page) => {
      const localized = localizedSlugs.has(page.slug) ? alternates : "";
      return `<url><loc>${SITE}/${page.slug}/</loc><lastmod>${lastModified}</lastmod>${localized}${imageTag(page.visuals?.[0]?.asset)}</url>`;
    }),
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n  ${entries.join("\n  ")}\n</urlset>\n`;
}

function build(outputDirectory) {
  const allPages = [...pages, ...languagePages.map(createLanguagePage)];
  for (const page of allPages) {
    const directory = path.join(outputDirectory, page.slug);
    fs.mkdirSync(directory, { recursive: true });
    fs.writeFileSync(path.join(directory, "index.html"), renderPage(page));
  }
  fs.writeFileSync(path.join(outputDirectory, "sitemap.xml"), renderSitemap(allPages));
  return allPages.map((page) => page.slug);
}

if (require.main === module) {
  const outputDirectory = path.resolve(process.argv[2] || "public");
  build(outputDirectory);
}

module.exports = { build, languagePages, pages, renderLanguagePage, renderPage, renderSitemap };
