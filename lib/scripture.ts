// Psalm 23, World English Bible. Public domain. https://ebible.org/web/PSA023.htm
export const chapter = [
  "Yahweh is my shepherd; I shall lack nothing.",
  "He makes me lie down in green pastures. He leads me beside still waters.",
  "He restores my soul. He guides me in the paths of righteousness for his name’s sake.",
  "Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me. Your rod and your staff, they comfort me.",
  "You prepare a table before me in the presence of my enemies. You anoint my head with oil. My cup runs over.",
  "Surely goodness and loving kindness shall follow me all the days of my life, and I will dwell in Yahweh’s house forever.",
];
export const prompts = [
  {
    key: "draw_near",
    letter: "D",
    title: "Draw Near",
    question: "Take a breath. Make room to be with God.",
    hint: "There is nothing to rush. Pause for a moment before you write.",
  },
  {
    key: "write_it",
    letter: "W",
    title: "Write It",
    question: "Which verse or verses stood out?",
    hint: "Write the words you want to carry with you.",
  },
  {
    key: "examine_it",
    letter: "E",
    title: "Examine It",
    question: "What is happening in this passage?",
    hint: "What is my heart drawn to? What do I have questions about?",
  },
  {
    key: "look_at_him",
    letter: "L",
    title: "Look at Him",
    question: "What does this show me about God?",
    hint: "What does it show me about me?",
  },
  {
    key: "listen_live_it",
    letter: "L",
    title: "Listen + Live It",
    question: "What is He saying? How can I respond?",
    hint: "Name one response you can bring into your day.",
  },
] as const;
