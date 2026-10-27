// ===== Portfolio FAQ chatbot =====
// Static site, so no AI API: answers come from the knowledge base below.
// Naya sawal/jawab add karna ho to KB mein ek naya object add kar dein.

const WHATSAPP_URL = "https://wa.me/923152731351?text=Hi%20Fahad%2C%20I%20visited%20your%20portfolio";

const KB = [
  {
    id: "greet",
    keys: ["hi", "hello", "hey", "salam", "assalam", "aoa", "salaam"],
    answer: `Hello! 👋 I'm Fahad's assistant. Ask me about his <b>skills</b>, <b>experience</b>, <b>projects</b>, <b>courses</b> or how to <b>contact</b> him.`,
  },
  {
    id: "about",
    label: "👋 Who is Fahad?",
    keys: ["who", "about", "fahad", "introduce", "yourself", "summary", "kon", "kaun"],
    answer: `<b>Fahad Ahmed</b> is a Software Engineer from Karachi, Pakistan, specializing in <b>Python backend development and AI integration</b>. He currently builds AI chatbots and assistants for the logistics industry, and is a co-author of a research paper published by Springer Nature.`,
  },
  {
    id: "skills",
    label: "🛠️ Skills",
    keys: ["skill", "tech", "stack", "language", "python", "fastapi", "flask", "docker", "mongodb", "sql", "tools", "know"],
    answer: `Fahad's main skills:<br>
      • <b>Languages:</b> Python, JavaScript (Node.js), SQL<br>
      • <b>Backend:</b> FastAPI, Flask, REST APIs, Microservices<br>
      • <b>AI:</b> AI Chatbots, LLM API Integration, Prompt Engineering<br>
      • <b>Data:</b> ETL Pipelines, Pandas, Streamlit<br>
      • <b>DevOps:</b> Docker, Linux, Git, Postman<br>
      <a href="#skills">See all skills →</a>`,
  },
  {
    id: "experience",
    label: "💼 Experience",
    keys: ["experience", "work", "job", "company", "career", "employ", "kaam", "naukri"],
    answer: `• <b>Software Engineer (AI & Backend)</b>, Office Automation Service · 02/2026 – Present<br>
      • <b>Associate Data Engineer</b>, Queless (Pvt.) Ltd. · 01/2025 – 01/2026<br>
      • <b>IT Instructor</b>, BanoQabil · 12/2023 – Present<br>
      • <b>Research Assistant</b>, SMIU · 03/2024 – 07/2025<br>
      <a href="#experience">See details →</a>`,
  },
  {
    id: "projects",
    label: "🚀 Projects",
    keys: ["project", "portfolio", "built", "chatbot", "assistant", "whatsapp bot", "meta scan", "fyp"],
    answer: `Featured projects:<br>
      • <b>AI Assistant</b> for logistics operations<br>
      • <b>AI Chatbot</b> for 24/7 customer support<br>
      • <b>WhatsApp Chatbot</b> with Node.js & Baileys<br>
      • <b>META Scan</b>, a file security scanner (Final Year Project)<br>
      <a href="#projects">View projects →</a>`,
  },
  {
    id: "courses",
    label: "🎓 Free Courses",
    keys: ["course", "youtube", "playlist", "learn", "tutorial", "teach", "java", "flutter", "cyber", "scraping", "seekh"],
    answer: `Fahad teaches free courses on YouTube:<br>
      • Python Programming · Complete Java · OOP with Java<br>
      • Programming Practice Questions · Web Scraping & Automation<br>
      • Flutter · Cyber Security<br>
      <a href="#content">See all courses & repos →</a>`,
  },
  {
    id: "podcast",
    keys: ["podcast", "episode", "interview", "video"],
    answer: `Watch Fahad's latest podcast episode on YouTube: <a href="https://youtu.be/l9LP7UnPDsk" target="_blank" rel="noopener">Watch now →</a>`,
  },
  {
    id: "research",
    keys: ["research", "paper", "publication", "springer", "journal"],
    answer: `Fahad co-authored <b>"Generative AI Revolution in Cybersecurity"</b>, published in <i>Artificial Intelligence Review</i> (Springer Nature, 2025). <a href="https://link.springer.com/article/10.1007/s10462-025-11219-5" target="_blank" rel="noopener">Read the paper →</a>`,
  },
  {
    id: "education",
    keys: ["education", "degree", "university", "study", "cgpa", "bs", "certification", "cs50"],
    answer: `🎓 <b>BS Software Engineering</b>, Sindh Madressatul Islam University (2021 – 2025), CGPA 3.2.<br>
      Certifications: CS50 (Harvard), DevOps Fundamentals, Python for Data Science.`,
  },
  {
    id: "cv",
    label: "📄 Download CV",
    keys: ["cv", "resume", "download"],
    answer: `Here's Fahad's CV: <a href="assets/Fahad_Ahmed_CV.pdf" download>Download CV (PDF) →</a>`,
  },
  {
    id: "hire",
    label: "🤝 Hire Fahad",
    keys: ["hire", "freelance", "available", "opportunit", "collaborat", "work with", "rate", "price"],
    answer: `Fahad is open to new opportunities and collaborations in Python backend and AI development. The quickest way to reach him is <a href="${WHATSAPP_URL}" target="_blank" rel="noopener">WhatsApp</a> or <a href="mailto:fbinashfaq@gmail.com">email</a>.`,
  },
  {
    id: "contact",
    label: "📞 Contact",
    keys: ["contact", "email", "phone", "number", "reach", "linkedin", "github", "whatsapp", "rabta"],
    answer: `You can reach Fahad at:<br>
      • 📧 <a href="mailto:fbinashfaq@gmail.com">fbinashfaq@gmail.com</a><br>
      • 💬 <a href="${WHATSAPP_URL}" target="_blank" rel="noopener">WhatsApp: +92 315 2731351</a><br>
      • 💼 <a href="https://www.linkedin.com/in/fahad-bin-ashfaq07/" target="_blank" rel="noopener">LinkedIn</a> · <a href="https://github.com/Fahd-Bin-Ashfaq" target="_blank" rel="noopener">GitHub</a>`,
  },
  {
    id: "thanks",
    keys: ["thank", "thanks", "shukriya", "great", "nice", "ok"],
    answer: `You're welcome! 😊 Anything else you'd like to know?`,
  },
];

const FALLBACK = `Sorry, I don't have an answer for that yet. 🙏 Try one of the options below, or message Fahad directly on <a href="${WHATSAPP_URL}" target="_blank" rel="noopener">WhatsApp</a>.`;

const chatToggle = document.getElementById("chatToggle");
const chatPanel = document.getElementById("chatPanel");
const chatMessages = document.getElementById("chatMessages");
const chatQuick = document.getElementById("chatQuick");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
let chatStarted = false;

function addMessage(html, from) {
  const msg = document.createElement("div");
  msg.className = `chat-msg ${from}`;
  // User text is inserted as plain text; bot answers are our own trusted HTML.
  if (from === "user") msg.textContent = html;
  else msg.innerHTML = html;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return msg;
}

function botReply(html) {
  const typing = addMessage('<span class="typing"><i></i><i></i><i></i></span>', "bot");
  setTimeout(() => {
    typing.innerHTML = html;
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 600);
}

// Short keys ("hi", "cv", "ok") must be a whole word so "hire" doesn't match "hi";
// longer keys only need to start a word, so "project" also matches "projects".
function matches(q, key) {
  const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = key.length <= 2 ? `\\b${escaped}\\b` : `\\b${escaped}`;
  return new RegExp(pattern).test(q);
}

function findAnswer(text) {
  const q = text.toLowerCase();
  let best = null;
  let bestScore = 0;
  KB.forEach((entry) => {
    const score = entry.keys.filter((k) => matches(q, k)).length;
    if (score > bestScore) {
      best = entry;
      bestScore = score;
    }
  });
  return best ? best.answer : FALLBACK;
}

function renderQuickReplies() {
  KB.filter((e) => e.label).forEach((entry) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = entry.label;
    btn.addEventListener("click", () => {
      addMessage(entry.label, "user");
      botReply(entry.answer);
    });
    chatQuick.appendChild(btn);
  });
}

function toggleChat(open) {
  chatPanel.classList.toggle("open", open);
  chatToggle.classList.toggle("open", open);
  chatToggle.setAttribute("aria-expanded", String(open));
  if (open && !chatStarted) {
    chatStarted = true;
    renderQuickReplies();
    botReply(`Hi! 👋 I'm Fahad's assistant. What would you like to know about him?`);
  }
  if (open) setTimeout(() => chatInput.focus(), 250);
}

chatToggle.addEventListener("click", () => toggleChat(!chatPanel.classList.contains("open")));

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && chatPanel.classList.contains("open")) toggleChat(false);
});

// Close the chat after clicking a link that jumps to a section of the page
chatMessages.addEventListener("click", (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (link) toggleChat(false);
});

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;
  addMessage(text, "user");
  chatInput.value = "";
  botReply(findAnswer(text));
});
