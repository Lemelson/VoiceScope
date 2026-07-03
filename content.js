/* VoiceScope reading material: conversation topics + RU/EN passages.
   Each passage ~150-200 words = roughly 1-1.5 min read aloud. */
window.VS_CONTENT = {

TOPICS: [
  { ru:{title:"Кино", points:[
      "Какой фильм ты можешь пересматривать бесконечно?",
      "Книга или экранизация — что лучше?",
      "Какой фильм изменил твой взгляд на жизнь?",
      "Кино в зале или дома на диване?",
      "Какой жанр ты не любишь и почему?"]},
    en:{title:"Cinema", points:[
      "A film you could rewatch endlessly?",
      "Book or screen adaptation — which wins?",
      "A film that changed how you see life?",
      "Cinema hall or a cosy sofa at home?",
      "A genre you can't stand, and why?"]}},

  { ru:{title:"Путешествия", points:[
      "Место, куда ты мечтаешь поехать?",
      "Самостоятельно или с экскурсией?",
      "Что важнее: пляж или новые города?",
      "Самое необычное место, где ты был?",
      "Что ты всегда берёшь с собой в дорогу?"]},
    en:{title:"Travel", points:[
      "A place you dream of visiting?",
      "Solo trip or a guided tour?",
      "Beaches or exploring new cities?",
      "The most unusual place you've been?",
      "One thing you always pack?"]}},

  { ru:{title:"Еда и кухня", points:[
      "Любишь готовить или только есть?",
      "Блюдо из детства, которое до сих пор любишь?",
      "Кухня какой страны тебе ближе всего?",
      "Согласен ли ты попробовать что-то экзотическое?",
      "Ужин дома или в ресторане?"]},
    en:{title:"Food & cooking", points:[
      "Do you like cooking or only eating?",
      "A childhood dish you still love?",
      "Which country's cuisine is closest to you?",
      "Would you try something truly exotic?",
      "Dinner at home or in a restaurant?"]}},

  { ru:{title:"Музыка", points:[
      "Какая песня поднимает тебе настроение?",
      "Играешь ли ты на каком-нибудь инструменте?",
      "Музыка в наушниках или живой концерт?",
      "Есть ли песня, связанная с важным воспоминанием?",
      "Может ли музыка изменить характер человека?"]},
    en:{title:"Music", points:[
      "A song that lifts your mood?",
      "Do you play any instrument?",
      "Headphones or a live concert?",
      "A song tied to an important memory?",
      "Can music change a person's character?"]}},

  { ru:{title:"Детство", points:[
      "Самое яркое воспоминание из детства?",
      "Кем ты мечтал стать в детстве?",
      "Любимая игра во дворе?",
      "Чему тебя научили родители?",
      "Что бы ты сказал себе маленькому?"]},
    en:{title:"Childhood", points:[
      "Your brightest childhood memory?",
      "What did you dream of becoming as a kid?",
      "A favourite game from the yard?",
      "Something your parents taught you?",
      "What would you tell your younger self?"]}},

  { ru:{title:"Технологии и будущее", points:[
      "Какое изобретение изменило твою жизнь?",
      "Боишься ли ты искусственного интеллекта?",
      "Какой будет жизнь через пятьдесят лет?",
      "Технологии нас сближают или разобщают?",
      "Без какого гаджета ты не можешь жить?"]},
    en:{title:"Technology & the future", points:[
      "An invention that changed your life?",
      "Are you afraid of artificial intelligence?",
      "What will life look like in fifty years?",
      "Does tech bring us closer or apart?",
      "A gadget you can't live without?"]}},

  { ru:{title:"Книги", points:[
      "Книга, которую советуешь всем?",
      "Бумажная книга или электронная?",
      "Любишь перечитывать или только новое?",
      "Какой герой книги тебе ближе всего?",
      "Что ты читаешь сейчас?"]},
    en:{title:"Books", points:[
      "A book you recommend to everyone?",
      "Paper book or e-reader?",
      "Do you reread or only read new ones?",
      "A book character closest to you?",
      "What are you reading right now?"]}},

  { ru:{title:"Спорт", points:[
      "Каким спортом ты занимаешься или хотел бы?",
      "Смотреть спорт или играть самому?",
      "Командные игры или одиночные?",
      "Бывал ли ты на стадионе вживую?",
      "Спорт ради здоровья или ради побед?"]},
    en:{title:"Sport", points:[
      "A sport you do or would like to try?",
      "Watching sport or playing it?",
      "Team games or solo ones?",
      "Have you been to a live match?",
      "Sport for health or for winning?"]}},

  { ru:{title:"Природа", points:[
      "Горы, море или лес — что тебе ближе?",
      "Любишь ли ты походы и палатки?",
      "Есть ли у тебя домашние животные?",
      "Что тебя восхищает в природе больше всего?",
      "Город или жизнь на природе?"]},
    en:{title:"Nature", points:[
      "Mountains, sea or forest — your pick?",
      "Do you enjoy hiking and camping?",
      "Do you have any pets?",
      "What in nature amazes you most?",
      "City life or living in nature?"]}},

  { ru:{title:"Дружба", points:[
      "Что для тебя значит настоящий друг?",
      "Много друзей или несколько близких?",
      "Можно ли дружить на расстоянии?",
      "Как ты познакомился с лучшим другом?",
      "Можно ли простить предательство друга?"]},
    en:{title:"Friendship", points:[
      "What does a true friend mean to you?",
      "Many friends or a few close ones?",
      "Can friendship survive distance?",
      "How did you meet your best friend?",
      "Can you forgive a friend's betrayal?"]}},

  { ru:{title:"Мечты и цели", points:[
      "О чём ты мечтаешь прямо сейчас?",
      "Какая цель кажется тебе самой важной?",
      "Веришь ли ты, что мечты сбываются?",
      "Что мешает тебе двигаться к мечте?",
      "Кем ты видишь себя через десять лет?"]},
    en:{title:"Dreams & goals", points:[
      "What do you dream about right now?",
      "Which goal feels most important to you?",
      "Do you believe dreams come true?",
      "What holds you back from your dream?",
      "Where do you see yourself in ten years?"]}},

  { ru:{title:"Деньги", points:[
      "Деньги — цель или инструмент?",
      "Копить или жить сегодняшним днём?",
      "Может ли богатство сделать счастливым?",
      "На что ты никогда не пожалеешь денег?",
      "Что бы ты сделал, выиграв миллион?"]},
    en:{title:"Money", points:[
      "Money — a goal or a tool?",
      "Save up or live for today?",
      "Can wealth make you happy?",
      "What would you never regret spending on?",
      "What would you do with a sudden million?"]}},

  { ru:{title:"Работа и призвание", points:[
      "Работа ради денег или ради смысла?",
      "Кем ты хотел работать в детстве?",
      "Что тебе нравится в твоём деле?",
      "Удалёнка или офис?",
      "Можно ли превратить хобби в работу?"]},
    en:{title:"Work & vocation", points:[
      "Work for money or for meaning?",
      "What job did you want as a child?",
      "What do you enjoy in your work?",
      "Remote work or the office?",
      "Can a hobby become a real job?"]}},

  { ru:{title:"Привычки", points:[
      "Какая твоя самая полезная привычка?",
      "От какой привычки хотел бы избавиться?",
      "Жаворонок ты или сова?",
      "Как начинается твоё идеальное утро?",
      "Сколько дней нужно, чтобы привыкнуть к новому?"]},
    en:{title:"Habits", points:[
      "Your most useful habit?",
      "A habit you'd love to drop?",
      "Early bird or night owl?",
      "How does your perfect morning start?",
      "How long does it take to build a new habit?"]}},

  { ru:{title:"Страхи", points:[
      "Чего ты боялся в детстве?",
      "Какой страх ты сумел победить?",
      "Боишься ли ты перемен?",
      "Полезен ли страх или только мешает?",
      "Что помогает тебе справляться со страхом?"]},
    en:{title:"Fears", points:[
      "What scared you as a child?",
      "A fear you managed to overcome?",
      "Are you afraid of change?",
      "Is fear useful or only a burden?",
      "What helps you handle fear?"]}},

  { ru:{title:"Счастье", points:[
      "Что для тебя значит быть счастливым?",
      "Счастье — это миг или состояние?",
      "Какой день ты бы назвал счастливым?",
      "Можно ли научиться быть счастливее?",
      "Что важнее для счастья: деньги или отношения?"]},
    en:{title:"Happiness", points:[
      "What does being happy mean to you?",
      "Is happiness a moment or a state?",
      "A day you'd call truly happy?",
      "Can you learn to be happier?",
      "Money or relationships for happiness?"]}},

  { ru:{title:"Город и деревня", points:[
      "Где бы ты хотел жить — в городе или деревне?",
      "Что хорошего в большом городе?",
      "Скучаешь ли ты по тишине и природе?",
      "Возможна ли дружба между соседями в городе?",
      "Переехал бы ты в другую страну?"]},
    en:{title:"City vs countryside", points:[
      "City or countryside — where would you live?",
      "What's good about a big city?",
      "Do you miss quiet and nature?",
      "Can neighbours be friends in a city?",
      "Would you move to another country?"]}},

  { ru:{title:"Языки и культуры", points:[
      "Сколько языков ты знаешь или хочешь выучить?",
      "Какой язык кажется тебе самым красивым?",
      "Трудно ли учить иностранный язык?",
      "Что тебя удивляет в других культурах?",
      "Помогает ли язык понять народ?"]},
    en:{title:"Languages & cultures", points:[
      "How many languages do you know or want to learn?",
      "Which language sounds most beautiful?",
      "Is learning a foreign language hard?",
      "What surprises you in other cultures?",
      "Does a language reveal a people's soul?"]}},

  { ru:{title:"Искусство", points:[
      "Понимаешь ли ты современное искусство?",
      "Рисуешь, поёшь или творишь сам?",
      "Картина, музей или театр?",
      "Может ли искусство изменить мир?",
      "Что для тебя красиво?"]},
    en:{title:"Art", points:[
      "Do you understand modern art?",
      "Do you draw, sing or create yourself?",
      "A painting, a museum or theatre?",
      "Can art change the world?",
      "What does beauty mean to you?"]}},

  { ru:{title:"Время", points:[
      "Куда ты хотел бы попасть — в прошлое или будущее?",
      "Умеешь ли ты ценить своё время?",
      "На что ты тратишь время впустую?",
      "Почему время летит так быстро?",
      "Что бы ты сделал, будь у тебя лишний час в сутках?"]},
    en:{title:"Time", points:[
      "Past or future — where would you travel?",
      "Do you value your own time?",
      "What do you waste time on?",
      "Why does time fly so fast?",
      "What would you do with an extra hour a day?"]}}
],

TEXTS_EN: [
  "More than half of our planet lies under water so deep that sunlight never reaches it. Below a thousand metres the ocean turns completely black, and the pressure grows strong enough to crush a submarine like a paper cup. Yet life thrives there. Strange fish glow with their own cold light, drifting through the darkness like tiny lanterns. Giant squid, longer than a bus, hunt in waters no human eye has ever seen directly. We have mapped the surface of Mars in greater detail than the floor of our own seas. Every expedition into the deep brings back creatures that no one knew existed, reminding us how little we truly understand about the world beneath the waves. Scientists believe that millions of species are still waiting to be discovered down there. The deep ocean is not empty or dead, as people once imagined. It is a vast, living frontier, silent and patient, holding secrets that may take centuries to uncover. Perhaps the strangest truth is this: the least explored place on Earth is right here at home.",

  "Few drinks have shaped human history as quietly as coffee. According to legend, a goat herder in Ethiopia noticed that his animals became lively after eating the red berries of a certain bush. Curious, he tried them himself, and soon the secret spread. By the fifteenth century, coffee was being roasted and brewed across the Arab world, where the first coffee houses opened their doors. These places became known as schools of the wise, because people gathered there to talk, argue, write, and share the news of the day. When coffee reached Europe, it was met with suspicion at first, but it quickly conquered the continent. Some historians argue that the energy of the modern age was brewed in a cup, fuelling long nights of thought and conversation. Today billions of cups are poured every single day, in offices, kitchens, and crowded cafes. The simple ritual connects a sleepy morning in one city to a farmer on a distant hillside. A drink born from a goat's curiosity has become one of the most beloved habits in the world.",

  "There is a special hour in an old city, just before the world wakes up. The streets are empty, the shops still shuttered, and the air feels clean and new. A single street sweeper moves slowly along the pavement, and somewhere a bell begins to ring. The stones underfoot have been polished smooth by centuries of footsteps, and the buildings lean gently toward one another as if sharing secrets. In this quiet hour you can hear things that the day will soon drown out: the cooing of pigeons, the rattle of the first tram, the soft click of a baker unlocking his door. The light is gentle and golden, sliding across the rooftops and pouring into narrow lanes. For a few minutes the city belongs to no one and to everyone. Then a window opens, a child laughs, an engine starts, and the ordinary day rushes in. But those who rise early are rewarded with something rare. They see the city as it truly is, stripped of its crowds, breathing slowly, waiting patiently for another day to begin.",

  "Memory feels like a recording, but it is nothing of the sort. When you remember a moment from your childhood, your brain does not play back a stored video. Instead, it rebuilds the scene from scattered fragments, filling the gaps with guesses and expectations. This is why two people can witness the same event and remember it in completely different ways. Each time you recall a memory, you change it slightly, like a story retold around a fire. Surprisingly, forgetting is not a flaw but a feature. If we remembered every detail of every day, our minds would drown in useless information. The brain carefully decides what matters and lets the rest fade away. Strong emotions act like glue, fixing certain moments firmly in place, which is why we recall fear or joy far better than ordinary afternoons. Sleep plays a quiet but vital role, sorting the day's experiences and storing the important ones. Our memories shape who we believe we are, yet they are far more fragile and creative than we like to admit. We are, in a sense, the stories we keep telling ourselves.",

  "On clear winter nights in the far north, the sky sometimes catches fire with silent colour. Curtains of green and violet ripple overhead, twisting and folding as if stirred by an invisible wind. This is the aurora, one of the most beautiful sights in all of nature. For thousands of years people told stories to explain it. Some believed the lights were the spirits of ancestors dancing in the heavens; others saw them as a warning, or a bridge to another world. The truth is no less wonderful. The colours are born when tiny particles from the sun, travelling millions of kilometres through space, crash into the gases high in our atmosphere. The Earth's magnetic field guides them toward the poles, where they release their energy as light. Green comes from oxygen, while nitrogen can paint the sky in pink and deep red. Standing beneath the aurora, you feel very small and very lucky at the same time. It is a reminder that our planet is not alone, but constantly touched by the vast and restless power of the sun.",

  "Before the printing press, every book had to be copied by hand. A single Bible could take a scribe years to complete, and books were so rare and costly that only the wealthy and the church could own them. Knowledge moved slowly, locked behind walls and guarded by the few. Then, in the middle of the fifteenth century, a German craftsman named Johannes Gutenberg changed everything. By combining movable metal letters with a simple press, he found a way to print pages quickly and cheaply. Suddenly the same book could be made hundreds of times over. Ideas that once crawled now began to fly. Within decades, presses were running across Europe, pouring out books on science, religion, medicine, and law. Ordinary people learned to read, and dangerous new ideas spread faster than any ruler could control. Some historians say the modern world truly began with this invention. It did not just make books; it made revolutions, reformations, and discoveries possible. A clever arrangement of metal and ink quietly became one of the most powerful tools humanity has ever built.",

  "For their tiny size, bees carry an enormous responsibility. As they move from flower to flower in search of nectar, they spread pollen and allow plants to produce fruit and seeds. Roughly a third of everything we eat depends, directly or indirectly, on their patient work. Without bees, supermarkets would look very different, missing apples, almonds, berries, and countless other foods. Inside the hive, a bee colony behaves almost like a single living creature. Thousands of workers share the labour, building wax cells, guarding the entrance, feeding the young, and cooling the hive with their wings on hot days. They even communicate through dance, telling one another exactly where the best flowers can be found. A single bee may visit thousands of blossoms in a day, yet produce only a tiny drop of honey in its whole life. In recent years, bee populations have fallen in many places, threatened by disease, chemicals, and the loss of wild flowers. Protecting them is not only about saving honey. It is about protecting the quiet, tireless workers that help keep our entire world fed.",

  "Music is one of the great mysteries of being human. No one can eat a melody or build a house from a song, yet every culture on Earth makes music, and always has. A few notes in a certain order can bring tears to our eyes, lift a tired crowd to its feet, or carry us instantly back to a summer many years ago. Scientists have found that listening to music we love releases the same chemicals in the brain that we feel from food or friendship. Rhythm seems to be wired deep within us; even small babies move when they hear a beat. A song can give courage to soldiers, comfort to the grieving, and joy to a wedding. It can say what plain words cannot. Strangely, music made of nothing but vibrating air can shape our moods, our memories, and even our sense of who we are. Across borders and languages, a beautiful tune needs no translation. Perhaps that is why music has been called the universal language: it speaks straight to the heart, long before the mind has time to ask why.",

  "Mountains have always called to the bold and the dreamers. Rising far above the warm and crowded valleys, their peaks seem to belong to another world, cold, silent, and untouched. For centuries people believed the highest summits were the homes of gods, too sacred or too dangerous to climb. Yet some could not resist the pull. To stand where almost no one has ever stood, to see the curve of the world from above the clouds, is a temptation as old as humanity itself. Climbing a great mountain is rarely about the view alone. It is a slow battle against thin air, brutal cold, and one's own fear and exhaustion. Each step higher demands more from the body and the will. Many climbers describe a strange peace at the top, a moment of pure stillness after such struggle. But mountains do not forgive carelessness, and they have claimed many lives. Perhaps that danger is part of the attraction. In a world that often feels tame and predictable, the mountains remain wild and honest, asking everything of those who dare to meet them.",

  "Long before maps and compasses, sailors found their way across the open sea by reading the sky. The stars, unlike the shifting coastline, were steady and faithful, returning to the same places night after night. Ancient navigators learned to recognise patterns among them and used these to hold a course across endless dark water. In the northern world, one star above all became a trusted guide. The Pole Star sits almost exactly above the North Pole, so it barely seems to move while the whole sky wheels around it. Find that star, and you have found north. Far out in the Pacific, island peoples performed even greater feats, crossing thousands of kilometres of open ocean using the stars, the swell of the waves, and the flight of birds. They carried no instruments, only knowledge passed carefully from one generation to the next. It is humbling to think how much our ancestors achieved with little more than sharp eyes and patient memory. The same stars that guided those ancient travellers still shine above us, waiting quietly for anyone who looks up and wonders.",

  "A library is one of humanity's strangest and most generous inventions. Under a single roof sit the thoughts of people who lived thousands of years ago, beside the latest discoveries of today. You can walk in with empty hands and walk out carrying the wisdom of strangers, ancient kings, scientists, poets, and explorers, all freely offered. The famous library of Alexandria, built in the ancient world, tried to gather every book that existed. Scholars travelled great distances to read there, and its loss in fire was mourned as a wound to human knowledge itself. Even now, the idea behind it survives in every town library and quiet reading room. What makes libraries remarkable is not only the books, but the promise they hold. They say that knowledge should belong to everyone, not only the rich or the powerful. A curious child and a great professor can sit at the same table, reading the same page. In an age of noise and hurry, the library remains a rare place of calm, where time slows down and the long conversation of humanity goes quietly on.",

  "We spend about a third of our lives asleep, yet sleep remains one of science's deepest puzzles. Far from being wasted time, those dark hours are when the body repairs itself and the mind sorts through the day. While we rest, the brain replays and stores important memories and quietly clears away waste that builds up during waking life. Without enough sleep, we grow forgetful, irritable, and slow, and our health begins to suffer. Then there are dreams, the strange films that play behind our closed eyes. In dreams the ordinary rules of the world fall away. We fly, we meet the dead, we visit places that never existed, and somehow it all feels perfectly normal until we wake. For centuries people have searched for meaning in them, treating dreams as messages, warnings, or windows into hidden desires. Scientists still argue about why we dream at all. Some believe it helps us practise for danger or work through our emotions. Whatever the truth, each night we slip into a private world of our own making, only to forget most of it by morning.",

  "There is a particular magic to travelling by train. Unlike a plane, which tears you from one place and drops you in another, a train lets you watch the world slowly change outside the window. Cities give way to fields, fields to forests, forests to mountains, all sliding past to the steady rhythm of the wheels. In the great age of the railway, trains shrank the world. Journeys that once took weeks by horse were suddenly possible in a single day. Towns grew up around the stations, clocks were set to the same time across whole countries, and ordinary people could travel further than their grandparents ever dreamed. A train carriage is a small world of its own. Strangers sit together for a few hours, sharing the same view and the same gentle motion. Some read, some sleep, some stare out at the passing landscape and let their thoughts wander. There is time to think on a train, time that modern life rarely allows. Perhaps that is why, even in an age of fast flights, so many people still feel the quiet romance of the rails.",

  "A volcano is a window into the burning heart of our planet. Far beneath the solid ground we walk upon, the Earth is hot enough to melt rock into a glowing river called magma. Where this molten rock forces its way to the surface, it builds mountains that can sleep for centuries and then wake with terrifying power. An eruption is among the most awesome sights in nature, throwing ash high into the sky and sending rivers of fire down the slopes. Whole cities have vanished beneath them, frozen in time for later generations to uncover. Yet volcanoes are not only destroyers. The ash they spread makes the surrounding soil wonderfully rich, which is why people have always returned to farm on their dangerous slopes. Many islands, and even parts of the air we breathe, were born from ancient eruptions. Volcanoes remind us that the ground beneath our feet is not as solid or as still as it seems. Our planet is alive, restless, and forever reshaping itself, building and destroying on a scale that makes a human lifetime seem very short indeed.",

  "A forest may look like a crowd of silent, separate trees, but the truth is far stranger. Beneath the soil, the roots of the trees are joined by a vast web of tiny threads, a hidden network that scientists sometimes call the wood wide web. Through this living web, trees share water, food, and even warnings with one another. When one tree is attacked by insects, it can send chemical signals through the network, and its neighbours begin to prepare their own defences before the danger arrives. Old, tall trees act almost like parents, feeding sugar to young saplings struggling in the shade below. A dying tree may even pass its remaining nourishment to the trees around it, as if making a final gift. In return, the forest as a whole grows stronger and more resilient than any single tree could ever be. We are only beginning to understand this quiet cooperation happening beneath our feet. The next time you walk among the trees, remember that the peaceful wood is in fact a busy community, talking, sharing, and helping in a language we are just learning to hear."
],

TEXTS_RU: [
  "Зимний лес умеет молчать так, как не умеет ничто другое на свете. Снег ложится на ветви толстым мягким одеялом и поглощает все звуки, и кажется, будто мир вокруг затаил дыхание. Ты идёшь по тропинке, и единственное, что слышно, — это хруст снега под ногами да редкий стук дятла где-то вдалеке. Деревья стоят неподвижно, укрытые инеем, и каждая веточка превращается в тонкое кружево. Воздух такой чистый и холодный, что им хочется дышать как можно глубже. Иногда с верхушки ели бесшумно срывается ком снега и рассыпается белой пылью. След лисы тянется через поляну и исчезает в кустах, напоминая, что лес живёт своей скрытой жизнью даже в самые морозные дни. В такой тишине человек невольно успокаивается. Все тревоги, спешка и шум большого города кажутся далёкими и неважными. Зимний лес ничего не требует и ничего не обещает. Он просто стоит, огромный и спокойный, и щедро делится с тобой своим главным сокровищем — настоящей, глубокой тишиной.",

  "У каждого, наверное, есть место, куда хочется вернуться хотя бы в воспоминаниях. Для многих это бабушкин дом. Там пахло свежим хлебом, вареньем и немного дымом из печки. Половицы тихо скрипели под ногами, а старые часы на стене отбивали время неторопливо, будто никуда не спешили. Летом во дворе цвели мальвы, а на верёвке сушились простыни, которые пахли солнцем и ветром. Бабушка всегда находила, чем тебя угостить, и вечно подкладывала ещё одну ложку, как бы ты ни отказывался. По вечерам вся семья собиралась за большим столом, и разговоры тянулись долго, под жёлтым светом лампы. Дети играли на полу, взрослые вспоминали былое, и время будто замедляло свой ход. В таком доме чувствуешь себя в полной безопасности, словно ничего плохого здесь случиться не может. С годами понимаешь, что дело было не в стенах и не в вещах, а в тепле, которое наполняло этот дом. Именно за этим теплом мы и возвращаемся туда снова и снова, пусть даже только в памяти.",

  "Двенадцатого апреля тысяча девятьсот шестьдесят первого года человек впервые поднялся за пределы родной планеты. Юрий Гагарин на корабле «Восток» совершил один виток вокруг Земли и вернулся живым. Весь полёт длился чуть больше ста восьми минут, но эти минуты разделили историю на «до» и «после». Впервые люди увидели свой дом со стороны — маленький голубой шар, висящий в чёрной пустоте. Говорят, Гагарин был поражён тем, как красива и хрупка наша Земля. До этого космос казался чем-то недостижимым, областью сказок и мечтаний. И вдруг оказалось, что человек способен туда подняться. Эта новость облетела весь мир за считаные часы, и миллионы людей, независимо от страны и языка, радовались общей победе. Полёт Гагарина стал не только триумфом науки и техники, но и символом смелости. Он показал, что границы возможного гораздо шире, чем мы привыкли думать. С тех пор человечество отправляло в космос всё новые корабли, но тот первый виток вокруг Земли навсегда остался особенным мгновением в нашей общей памяти.",

  "Есть запах, который знаком каждому, хотя мало кто задумывался, откуда он берётся. Это запах земли перед грозой и сразу после первого дождя. Воздух становится густым и тяжёлым, небо темнеет, и вдруг по пыльной дороге шлёпают первые крупные капли. И тогда поднимается тот самый свежий, ни с чем не сравнимый аромат. Учёные даже придумали ему название и выяснили, что его создают особые вещества, которые выделяют растения и почва. Капли дождя выбивают их из земли, и мы чувствуем этот запах как обещание прохлады и обновления. Гроза летом — это целое представление. Сначала вдалеке ворчит гром, потом небо разрезает яркая вспышка, и через несколько секунд раздаётся раскат, от которого слегка дрожат стёкла. Дети прижимаются к окнам, считая секунды между молнией и громом. А когда буря проходит, мир будто умывается заново: листья блестят, лужи отражают светлеющее небо, и дышится особенно легко. Может быть, поэтому запах дождя так любят: он напоминает, что после любой бури обязательно наступает свежесть и покой.",

  "На краю земли, там, где суша встречается с бескрайним морем, стоят маяки. Долгие века они спасали моряков, указывая путь сквозь туман и ночную тьму. Один ровный, упрямый луч, вращаясь над водой, говорил кораблям: здесь опасные камни, держись в стороне, дом уже близко. Раньше у каждого маяка был свой смотритель. Это была одинокая и нелёгкая жизнь. Смотритель часто жил вдали от людей, наедине с ветром, волнами и криками чаек. Его главной обязанностью было следить, чтобы огонь не погас ни на одну ночь, в любую погоду. Он заводил механизмы, чистил стёкла, записывал в журнал всё, что видел вокруг. В шторм, когда волны бились о скалы, а ветер пытался сорвать крышу, смотритель оставался на посту, зная, что от его огня зависят чужие жизни. Сегодня почти все маяки работают сами, без людей, и профессия смотрителя почти исчезла. Но образ одинокой башни с тёплым огоньком в окне по-прежнему трогает сердце. Маяк остаётся красивым символом надежды — света, который горит для других даже в самую тёмную ночь.",

  "Рано утром, когда город ещё только просыпается, рынок уже бурлит жизнью. Продавцы раскладывают товар, и прилавки на глазах наполняются яркими красками. Горы румяных яблок, пучки зелени, ещё тёплый хлеб, золотистый мёд в банках — всё это блестит в первых лучах солнца. В воздухе смешиваются десятки запахов: пряности, свежая рыба, спелые фрукты и крепкий кофе из соседней палатки. Здесь всё живое и настоящее. Торговцы зазывают покупателей, шутят, нахваливают свой товар и охотно дают попробовать кусочек сыра или дольку груши. Покупатели не спешат: они выбирают, торгуются, перекидываются новостями со знакомыми. Старушка придирчиво щупает помидоры, мальчишка таращится на пирамиду конфет, где-то спорят о цене и тут же мирятся. Рынок — это не просто место, где покупают еду. Это маленький мир, в котором кипит общение, и часто сюда приходят не только за продуктами, но и за этим тёплым человеческим шумом. Уходишь с тяжёлыми сумками и лёгким сердцем, чувствуя, что прикоснулся к чему-то простому, древнему и очень настоящему.",

  "Северные реки текут неторопливо и величаво сквозь бескрайние леса. Вода в них тёмная и прозрачная, а по берегам стоят высокие ели, опрокинутые отражением в спокойной глади. В таких местах кажется, будто время остановилось, и ты остался один на один с огромной и древней природой. Сплав по реке — особенное приключение. Ты садишься в лодку, и течение само несёт тебя вперёд, мимо песчаных отмелей и тихих заводей. По утрам над водой стелется туман, и солнце пробивается сквозь него мягкими полосами. Иногда у берега мелькнёт лось, пришедший на водопой, или над рекой пронесётся скопа в поисках рыбы. Вечером путешественники разбивают лагерь на берегу, разводят костёр и слушают, как потрескивают дрова и плещется вода. Уха, сваренная на огне, кажется вкуснее любого ресторанного блюда. Ночью небо вспыхивает мириадами звёзд, каких никогда не увидишь в городе. В такие минуты понимаешь, как мало человеку нужно для счастья: чистая вода, тёплый огонь, надёжные спутники рядом и великая тишина северной реки вокруг.",

  "Город сверху совсем не такой, каким мы привыкли видеть его с тротуара. Поднимись на крышу старого дома — и перед тобой откроется целый забытый мир. Море черепицы и жести уходит к горизонту, печные трубы стоят, как маленькие башни, а между ними прячутся чердачные окошки. Здесь, наверху, царит особая тишина, и шум улиц доносится словно издалека. На крышах живут голуби. Они греются на солнце, важно расхаживают по карнизам и взлетают целой стаей, когда что-то их вспугнёт. Кошки тоже знают тайные тропы по крышам и переходят с дома на дом так уверенно, будто это обычные дорожки. На закате весь город заливается тёплым золотым светом, окна вспыхивают огнём, и кажется, что крыши плывут в этом сиянии. Многие мечтатели любят забираться повыше, чтобы посидеть в одиночестве, посмотреть вдаль и подумать о своём. Сверху мелкие заботы кажутся не такими важными, а сам город — большим живым существом, которое дышит, шумит и продолжает жить своей загадочной жизнью под бесконечным небом.",

  "Старый чердак — это настоящая машина времени. Стоит подняться по скрипучей лестнице и толкнуть тяжёлую дверь, как тебя встречает запах пыли, дерева и чего-то давно забытого. Сквозь маленькое окошко пробивается луч света, и в нём медленно кружатся пылинки. Вокруг громоздятся сундуки, коробки и вещи, которые когда-то были кому-то очень дороги. Здесь можно найти пожелтевшие фотографии людей, чьих имён уже никто не помнит. Старые письма, перевязанные лентой, хранят чужие тайны и признания. В углу стоят сломанные часы, рядом — детская лошадка-качалка и стопка книг с потрёпанными обложками. Каждая вещь словно хочет рассказать свою историю, если только её внимательно послушать. На чердаке прошлое не исчезает совсем, а будто дремлет, дожидаясь, когда кто-нибудь снова откроет коробку. Дети обожают такие места, потому что любой старый предмет превращается у них в сокровище. А взрослые, поднявшись сюда, нередко замирают с какой-нибудь находкой в руках, унесённые воспоминаниями. Чердак учит простой и важной мысли: вещи живут дольше нас и бережно хранят память о тех, кого мы любили.",

  "Долгие века чаепитие было в России не просто способом утолить жажду, а настоящим домашним ритуалом. В центре стола стоял начищенный до блеска самовар, тихо посапывал и собирал вокруг себя всю семью. Заварку держали в маленьком чайнике на самой верхушке, а кипяток брали из крана самовара, разбавляя чай по вкусу. Чай пили долго, не спеша, по несколько чашек. На столе обязательно появлялись варенье, мёд, баранки и пироги. Кто-то пил вприкуску, держа кусочек сахара во рту, кто-то грел руки о горячую чашку в зимний вечер. Но главным был не сам чай, а разговоры, которые он собирал вокруг себя. За самоваром обсуждали новости, мирились после ссор, принимали гостей и просто чувствовали себя одной семьёй. Гостя в доме всегда первым делом звали к столу: проходи, чаю попьём. Это означало гораздо больше, чем просто угощение, — это было приглашение к душевной беседе. И хотя сегодня электрический чайник давно вытеснил самовар, тёплая традиция собираться за чашкой чая и неторопливо говорить по душам жива до сих пор.",

  "Тот, кто всю жизнь прожил в большом городе, нередко даже не подозревает, как на самом деле выглядит ночное небо. Яркие фонари и светящиеся окна заглушают звёзды, и над головой видно лишь несколько самых ярких точек. Но стоит уехать подальше, в тихую деревню, и в безоблачную ночь небо открывается во всём своём величии. Над тобой раскидывается бесчисленная россыпь звёзд, а поперёк неба тянется туманная полоса Млечного Пути. Глаза постепенно привыкают к темноте, и звёзд становится всё больше, словно кто-то невидимый раздувает их огоньки. Иногда по небу чиркнёт падающая звезда, и ты едва успеваешь загадать желание. В такой тишине, под этим огромным куполом, человек особенно ясно чувствует, как велик мир и как мал он сам. Древние люди вглядывались в эти же звёзды, придумывали созвездиям имена и рассказывали о них легенды. Мы смотрим на тот же свет, что летел к нам долгие годы из глубин космоса. Звёздное небо над тихой деревней — простое и бесплатное чудо, ради которого иногда стоит просто поднять голову.",

  "В шуме современного города старый трамвай кажется гостем из прошлого. Он не спешит, мерно покачивается на рельсах и негромко позвякивает на поворотах. В его деревянных, отполированных временем сиденьях есть особое очарование, которого не найти в новых блестящих вагонах. Поездка на трамвае — это маленькое путешествие. За окнами медленно проплывают улицы, дома, скверы и спешащие куда-то прохожие. Можно сесть у окна, прислониться лбом к холодному стеклу и просто смотреть на город, отдавшись неторопливому ритму дороги. Рельсы тянутся через весь город, связывая далёкие районы в единое целое. Утром трамвай везёт людей на работу, днём — старушек с сумками и студентов с книжками, вечером — усталых горожан домой. Все они, такие разные, на несколько остановок становятся попутчиками. Звонок водителя, скрип тормозов, шипение дверей — эти простые звуки знакомы нескольким поколениям. Многие города давно убрали трамваи, но там, где они сохранились, к ним относятся с особой нежностью. Старый трамвай — это не просто транспорт, а живая ниточка, связывающая город сегодняшний с городом, которого уже почти нет.",

  "Летом море принадлежит шумной толпе, но осенью оно снова становится самим собой. Отдыхающие разъезжаются, пляжи пустеют, и побережье погружается в задумчивую тишину. Небо хмурится, вода темнеет и тяжелеет, а волны накатывают на берег с глухим, ровным гулом. Гулять по пустому осеннему пляжу — особое удовольствие. Ветер бросает в лицо солёные брызги, под ногами шуршит мокрый песок и галька. Чайки с криками кружат над водой, а вдалеке, у самого горизонта, медленно ползёт одинокий корабль. Можно идти долго-долго, не встретив ни единого человека, наедине со своими мыслями. Осеннее море не зовёт купаться и загорать, оно зовёт думать. В его бесконечном движении есть что-то успокаивающее и в то же время торжественное. Глядя на серые волны, понимаешь, что они катились так задолго до тебя и будут катиться ещё очень долго после. На душе становится одновременно немного грустно и удивительно спокойно. Может быть, именно осенью, когда стихает суета, море лучше всего открывает свою настоящую, суровую и величавую красоту.",

  "Запах свежего хлеба, наверное, один из самых уютных запахов на свете. Он будит в нас что-то очень древнее и тёплое, напоминая о доме и заботе. А рождается этот запах задолго до рассвета, когда весь город ещё спит. В маленькой пекарне в это время уже горит свет. Пекарь приходит затемно, чтобы успеть к утру. Он замешивает тесто, и под его сильными руками оно становится живым, послушным и упругим. Потом тесто отдыхает, поднимается, и его отправляют в жаркую печь. Совсем скоро по всей улице плывёт тот самый аромат, от которого невольно просыпается аппетит. Из печи выходят румяные, хрустящие буханки, ещё горячие, потрескивающие от жара. Первые покупатели приходят, когда на улице ещё темно, чтобы унести домой тёплый хлеб к завтраку. В этом простом ремесле есть особая, тихая красота. Пекарь редко слышит слова благодарности, но его труд каждый день делает чьё-то утро чуточку добрее. Хлеб кормит людей уже многие тысячи лет, и до сих пор нет ничего вкуснее ломтя свежего хлеба с маслом ранним утром.",

  "Когда-то единственным способом поговорить с тем, кто далеко, было письмо. Человек садился за стол, брал бумагу и перо и подолгу обдумывал каждое слово. Письмо нельзя было быстро стереть и переписать, поэтому к нему относились серьёзно и вкладывали в него душу. Письма шли неделями, а иногда и месяцами. Их ждали с нетерпением, выбегали навстречу почтальону, а получив, перечитывали по многу раз и бережно хранили. По почерку можно было узнать настроение человека: где он торопился, где волновался, где выводил буквы спокойно и аккуратно. Сам почерк был как голос, у каждого свой, неповторимый. Сегодня мы обмениваемся сообщениями за секунды, и это огромное удобство. Но что-то важное при этом потерялось. Быстрое сообщение легко написать и так же легко забыть. А вот настоящее письмо, написанное от руки, хранит тепло того, кто его писал. Возможно, поэтому, разбирая старые бумаги, мы иногда находим пожелтевший конверт и замираем над ним. В неровных строчках оживает голос человека, которого, быть может, уже давно нет рядом."
],

/* Illustrative speaking-F0 model used only for the on-screen percentile guide. */
NORMS: {
  men:   { mean:116, sd:16, label:"мужчин" },
  women: { mean:190, sd:25, label:"женщин" }
},
/* Descriptive speaking-F0 zones. These are not singing voice types. */
ZONES: [
  { max:80,       name:"Очень низкая разговорная F0", hint:"около 1-го процентиля условной мужской модели" },
  { max:100,      name:"Низкая мужская F0",           hint:"ниже примерно 84% мужчин по условной модели" },
  { max:132,      name:"Обычный мужской диапазон F0", hint:"100–132 Гц — центральные ~68% условной модели" },
  { max:155,      name:"Повышенная мужская F0",       hint:"выше среднего мужского значения" },
  { max:185,      name:"Зона перекрытия",             hint:"по одной F0 пол или тип голоса не определяется" },
  { max:255,      name:"Обычный женский диапазон F0", hint:"ориентир для разговорной речи" },
  { max:Infinity, name:"Высокая разговорная F0",      hint:"возможны возраст, манера речи и интонация" }
],

REFERENCE: `
<h4>Что такое высота тона (F0)</h4>
<p>Основной тон голоса (fundamental frequency, F0) — это частота колебаний голосовых
складок, измеряемая в герцах (Гц). Чем выше F0, тем выше обычно воспринимается голос.
В речи F0 постоянно меняется из-за интонации, поэтому приложение показывает медиану и
контур, а не пытается свести всю запись к одному «истинному» числу.</p>

<h4>Почему нет одной универсальной нормы</h4>
<p>Результат зависит от возраста, языка, задания и громкости. Чтение, спонтанная речь,
счёт и протяжная гласная дают разные F0. Даже в исследованиях здоровых взрослых средние
значения заметно различаются:</p>
<table class="reftab">
<tr><th>Выборка и задание</th><th>Мужчины</th><th>Женщины</th></tr>
<tr><td>2472 человека, 40–79 лет, разговорная громкость</td><td>111.9 Гц</td><td>168.5 Гц</td></tr>
<tr><td>200 молодых взрослых, чтение</td><td>110.2 Гц</td><td>193.1 Гц</td></tr>
<tr><td>154 взрослых, протяжная гласная /a/</td><td>129 Гц</td><td>201 Гц</td></tr>
</table>
<p>Поэтому модель приложения <b>116±16 Гц для мужчин</b> и <b>190±25 Гц для женщин</b> —
удобная приблизительная шкала, а не клиническая норма и не точное описание любого
населения.</p>

<h4>Разговорная F0 — не «бас / баритон / тенор»</h4>
<p>Бас, баритон и тенор — певческие категории. Их определяют не только по обычной речи,
но и по удобному певческому диапазону, тесситуре, переходным нотам и тембру. Поэтому
VoiceScope использует нейтральные формулировки «низкая», «обычная» и «повышенная F0».</p>

<h4>Насколько редок низкий голос</h4>
<p>Если <b>только для ориентира</b> принять нормальную мужскую модель со средним 116 Гц
и σ=16 Гц, получаются такие два взаимодополняющих числа:</p>
<ul>
<li><b>100 Гц:</b> ниже по F0, чем у ~84% мужчин; около 16% находятся на 100 Гц или ниже.</li>
<li><b>90 Гц:</b> ниже по F0, чем у ~95% мужчин; около 5% находятся на 90 Гц или ниже.</li>
<li><b>80 Гц:</b> ниже по F0, чем у ~99% мужчин; около 1.2% находятся на 80 Гц или ниже.</li>
<li><b>116 Гц:</b> 50-й процентиль этой условной модели.</li>
<li><b>132 Гц:</b> выше по F0, чем у ~84% мужчин; около 16% находятся выше.</li>
<li><b>135 Гц:</b> выше по F0, чем у ~88% мужчин; около 12% находятся выше.</li>
</ul>

<h4>Что меняют микрофон и комната</h4>
<p>Расстояние до микрофона обычно сильнее меняет громкость, шум и тембр, чем реальную F0.
Слишком близкая запись добавляет взрывные согласные, перегрузку и низкочастотный
«proximity effect»; слишком далёкая — шум и отражения комнаты. Всё это может запутать
автоматический детектор и вызвать краткий скачок на октаву, хотя голос физически не
изменился. Для сравнимых замеров держи один микрофон примерно на одном расстоянии,
чуть сбоку от струи воздуха.</p>

<p class="refnote">Это статистические ориентиры, а не диагноз и не оценка. Реальный голос
зависит от языка, задания, эмоций, усталости, здоровья и условий записи. Источники:
<a href="https://pubmed.ncbi.nlm.nih.gov/27370073/" target="_blank" rel="noreferrer">Awan et al., 2017</a>,
<a href="https://pubmed.ncbi.nlm.nih.gov/7265934/" target="_blank" rel="noreferrer">Hudson &amp; Holbrook, 1981</a>,
<a href="https://pubmed.ncbi.nlm.nih.gov/10217688/" target="_blank" rel="noreferrer">Fernández Liesa et al., 1999</a>,
<a href="https://pubmed.ncbi.nlm.nih.gov/23371051/" target="_blank" rel="noreferrer">Barsties, 2013</a>.</p>
`

};
