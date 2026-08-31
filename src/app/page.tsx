"use client";

import { useMemo, useState } from "react";

type ClassLevel = 9 | 10;
type Subject = "Maths" | "Physics" | "Chemistry" | "Biology";
type Plan = "Free" | "Pro" | "Premium";

type TopicData = {
  chapter: string;
  topics: string[];
  examples: string[];
  words: { word: string; meaning: string }[];
  simulation?: string;
  resource: string;
};

const subjects: Record<Subject, { emoji: string; color: string; tagline: string }> = {
  Maths: { emoji: "📐", color: "from-blue-600 to-cyan-500", tagline: "Formula + steps + real-life use cases" },
  Physics: { emoji: "⚡", color: "from-violet-600 to-blue-500", tagline: "Concepts, diagrams, units and simulations" },
  Chemistry: { emoji: "🧪", color: "from-amber-500 to-orange-600", tagline: "Reactions, experiments and daily-life chemistry" },
  Biology: { emoji: "🧬", color: "from-emerald-500 to-teal-600", tagline: "Body, plants, processes and environment" }
};

const curriculum: Record<ClassLevel, Record<Subject, TopicData[]>> = {
  9: {
    Maths: [
      { chapter: "Number System", topics: ["Irrational Numbers", "Real Numbers", "Exponents"], examples: ["Measuring a diagonal tile uses irrational numbers.", "Shop bills use real numbers like ₹49.50.", "Mobile storage uses powers like GB and MB."], words: [{ word: "Irrational", meaning: "A number that cannot be written exactly as p/q." }], resource: "CBSE Class 9 Maths syllabus" },
      { chapter: "Linear Equations", topics: ["Two Variables", "Graph", "Solution"], examples: ["Notebook and pen price problems become equations.", "Cricket run-rate can be written as a linear relation.", "Taxi fare has fixed charge plus per-km charge."], words: [{ word: "Variable", meaning: "A value that can change, like x or y." }], resource: "NCERT algebra practice" }
    ],
    Physics: [
      { chapter: "Motion", topics: ["Speed", "Velocity", "Acceleration", "Graphs"], examples: ["A bus changing speed shows acceleration.", "A cyclist moving north has velocity because direction matters.", "A train timetable is a distance-time graph in real life."], words: [{ word: "Acceleration", meaning: "Rate at which velocity changes." }, { word: "Velocity", meaning: "Speed with direction." }], simulation: "oPhysics kinematics / motion graph simulations", resource: "CBSE Science: Motion, Force, Work and Sound" },
      { chapter: "Sound", topics: ["Frequency", "Amplitude", "Echo"], examples: ["A loudspeaker vibration produces sound.", "Echo in an empty hall shows reflection of sound.", "A mosquito sound is high frequency."], words: [{ word: "Frequency", meaning: "Number of vibrations per second." }], simulation: "oPhysics wave and sound simulations", resource: "NCERT Sound chapter" }
    ],
    Chemistry: [
      { chapter: "Matter in Our Surroundings", topics: ["States of Matter", "Evaporation", "Diffusion"], examples: ["Wet clothes dry because of evaporation.", "Perfume spreads in a room due to diffusion.", "Ice melts into water and then steam."], words: [{ word: "Diffusion", meaning: "Particles spreading from high concentration to low concentration." }], resource: "CBSE Matter unit" },
      { chapter: "Atoms and Molecules", topics: ["Atoms", "Molecules", "Chemical Formula"], examples: ["Salt formula NaCl tells which particles combine.", "Water H2O means two hydrogen and one oxygen.", "A recipe is like a chemical formula for ingredients."], words: [{ word: "Molecule", meaning: "Two or more atoms chemically joined." }], simulation: "ChemCollective virtual lab for solutions and reactions", resource: "NCERT Atoms and Molecules" }
    ],
    Biology: [
      { chapter: "Cell", topics: ["Cell Organelles", "Osmosis", "Plant vs Animal Cell"], examples: ["A cell is like a small factory.", "Raisins swell in water due to osmosis.", "The nucleus works like the control room."], words: [{ word: "Organelle", meaning: "A small working part inside a cell." }], resource: "NCERT Cell chapter" },
      { chapter: "Tissues", topics: ["Plant Tissue", "Animal Tissue", "Muscle"], examples: ["Skin tissue protects the body.", "Muscle tissue helps you run.", "Xylem transports water in plants."], words: [{ word: "Tissue", meaning: "A group of similar cells doing one job." }], resource: "CBSE World of Living" }
    ]
  },
  10: {
    Maths: [
      { chapter: "Quadratic Equations", topics: ["Factorisation", "Formula", "Word Problems"], examples: ["Finding dimensions of a rectangular garden.", "Projectile-like height questions can form quadratics.", "Area problems often create x² terms."], words: [{ word: "Quadratic", meaning: "An equation where the highest power of x is 2." }], resource: "CBSE Class 10 Maths syllabus" },
      { chapter: "Trigonometry", topics: ["Ratios", "Heights and Distances", "Identities"], examples: ["Finding height of a building using shadow.", "A ladder against a wall forms a right triangle.", "Surveyors use angles to measure distance."], words: [{ word: "Hypotenuse", meaning: "The longest side of a right triangle." }], resource: "NCERT Trigonometry" }
    ],
    Physics: [
      { chapter: "Electricity", topics: ["Current", "Ohm's Law", "Series and Parallel", "Power"], examples: ["A dim bulb may mean high resistance.", "Electricity bill uses power and time.", "Home wiring uses parallel circuits so devices work separately."], words: [{ word: "Current", meaning: "Flow of electric charge." }, { word: "Resistance", meaning: "Opposition to current flow." }], simulation: "oPhysics circuits / Ohm's Law simulations", resource: "CBSE Effects of Current" },
      { chapter: "Light", topics: ["Reflection", "Refraction", "Lenses", "Human Eye"], examples: ["A spoon looks bent in water due to refraction.", "Spectacles use lenses to correct vision.", "Rear-view mirrors help drivers see wider area."], words: [{ word: "Refraction", meaning: "Bending of light when it passes from one medium to another." }], simulation: "oPhysics mirror and lens simulations", resource: "CBSE Natural Phenomena" }
    ],
    Chemistry: [
      { chapter: "Acids, Bases and Salts", topics: ["pH", "Indicators", "Neutralisation"], examples: ["Lemon juice is acidic.", "Soap feels slippery because it is basic.", "Antacid neutralises extra acid in the stomach."], words: [{ word: "Neutralisation", meaning: "Reaction between acid and base to form salt and water." }], simulation: "ChemCollective strong acid and base virtual lab", resource: "CBSE Chemistry substances unit" },
      { chapter: "Carbon and its Compounds", topics: ["Covalent Bond", "Hydrocarbons", "Soaps"], examples: ["LPG contains hydrocarbons.", "Soap removes oily dirt by micelle formation.", "Graphite in pencil is a form of carbon."], words: [{ word: "Covalent", meaning: "Bond formed by sharing electrons." }], resource: "NCERT Carbon chapter" }
    ],
    Biology: [
      { chapter: "Life Processes", topics: ["Nutrition", "Respiration", "Transport", "Excretion"], examples: ["Breathing becomes faster while running.", "Plants make food using sunlight.", "Blood carries oxygen like delivery service."], words: [{ word: "Respiration", meaning: "Process of releasing energy from food." }], resource: "CBSE World of Living" },
      { chapter: "Heredity", topics: ["Traits", "Genes", "Mendel"], examples: ["Children may inherit eye colour from parents.", "Plant height can pass from one generation to next.", "A family tree helps track inherited traits."], words: [{ word: "Gene", meaning: "A unit of heredity that controls a trait." }], resource: "NCERT Heredity" }
    ]
  }
};

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`glass rounded-3xl p-5 shadow-soft ${className}`}>{children}</div>;
}

function Pill({ active, children, onClick }: { active?: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`rounded-2xl px-4 py-2 text-sm font-black transition hover:scale-105 ${active ? "bg-ink text-white" : "bg-white text-slate-700 border border-slate-200"}`}>
      {children}
    </button>
  );
}

export default function HomePage() {
  const [classLevel, setClassLevel] = useState<ClassLevel>(10);
  const [subject, setSubject] = useState<Subject>("Physics");
  const [chapterIndex, setChapterIndex] = useState(0);
  const [topicIndex, setTopicIndex] = useState(0);
  const [plan, setPlan] = useState<Plan>("Free");
  const [mode, setMode] = useState("Real-life examples");
  const [videoReady, setVideoReady] = useState(false);

  const chapters = curriculum[classLevel][subject];
  const chapter = chapters[chapterIndex] ?? chapters[0];
  const topic = chapter.topics[topicIndex] ?? chapter.topics[0];
  const meta = subjects[subject];

  const answer = useMemo(() => {
    const example = chapter.examples[topicIndex % chapter.examples.length];
    return {
      concept: `${topic} in ${chapter.chapter}`,
      simple: `${topic} becomes easy when we connect it to daily life instead of only memorising textbook lines.`,
      example,
      exam: `In exam, write the definition first, then formula/process if needed, then one clear example related to ${topic}.`,
      quick: `Quick check: Give one real-life example of ${topic}.`
    };
  }, [chapter, topic, topicIndex]);

  const progress = {
    Concept: 74 + chapterIndex * 4,
    Examples: 88 + topicIndex * 2,
    Notes: 61 + topicIndex * 5,
    Quiz: 55 + chapterIndex * 7
  };

  const setSubjectSafe = (next: Subject) => {
    setSubject(next);
    setChapterIndex(0);
    setTopicIndex(0);
    setVideoReady(false);
  };

  const setClassSafe = (next: ClassLevel) => {
    setClassLevel(next);
    setChapterIndex(0);
    setTopicIndex(0);
    setVideoReady(false);
  };

  return (
    <main className="min-h-screen px-4 py-6 md:px-8">
      <section className="mx-auto max-w-7xl">
        <nav className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-ink text-2xl text-white">AI</div>
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-blue-700">Cloud MVP</p>
              <h1 className="text-xl font-black text-ink">CBSE Real-Life AI Tutor</h1>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <a className="rounded-2xl bg-white px-4 py-2 text-sm font-black text-slate-700 shadow" href="#demo">Live Demo</a>
            <a className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-black text-white shadow" href="#cloud">Cloud Setup</a>
          </div>
        </nav>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="pt-8">
            <div className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-blue-700">Class 9 & 10 • Maths + Physics + Chemistry + Biology</div>
            <h2 className="mt-5 text-5xl font-black tracking-tight text-ink md:text-7xl">Textbook concepts turned into real-life examples.</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">A dynamic, interactive AI tutor that explains every topic with innumerable daily-life examples, difficult-word meanings, smart notes, quizzes, simulations, video storyboards, PYQs and premium private tutor support.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#demo" className="rounded-2xl bg-ink px-6 py-4 text-sm font-black text-white shadow-soft transition hover:scale-105">Try interactive demo</a>
              <a href="https://github.com/d12akadeepak/cbse-real-life-ai-tutor" className="rounded-2xl bg-white px-6 py-4 text-sm font-black text-ink shadow-soft transition hover:scale-105">Open GitHub repo</a>
            </div>
          </div>

          <Card className="floaty overflow-hidden">
            <div className={`h-3 rounded-full bg-gradient-to-r ${meta.color}`} />
            <div className="mt-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">Live changing tutor</p>
                <h3 className="mt-2 text-3xl font-black text-ink">{meta.emoji} {subject} Tutor</h3>
                <p className="mt-2 text-slate-600">{meta.tagline}</p>
              </div>
              <select value={plan} onChange={(e) => setPlan(e.target.value as Plan)} className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-black">
                <option>Free</option>
                <option>Pro</option>
                <option>Premium</option>
              </select>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {Object.entries(progress).map(([key, value]) => (
                <div key={key} className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-500">{key}</p>
                  <div className="mt-2 flex items-end justify-between"><strong className="text-2xl">{value}%</strong><span className="text-xs font-bold text-green-600">live</span></div>
                  <div className="mt-3 h-2 rounded-full bg-white"><div className={`h-full rounded-full bg-gradient-to-r ${meta.color}`} style={{ width: `${Math.min(value, 98)}%` }} /></div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <section id="demo" className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <Card>
            <h3 className="text-2xl font-black text-ink">Control the app</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">Change class, tutor, chapter, topic, plan and mode. The AI answer, examples, notes, quiz, resources and premium status update instantly.</p>

            <div className="mt-5 space-y-5">
              <div>
                <p className="mb-2 text-xs font-black uppercase tracking-widest text-slate-500">Class</p>
                <div className="flex gap-2"><Pill active={classLevel === 9} onClick={() => setClassSafe(9)}>Class 9</Pill><Pill active={classLevel === 10} onClick={() => setClassSafe(10)}>Class 10</Pill></div>
              </div>
              <div>
                <p className="mb-2 text-xs font-black uppercase tracking-widest text-slate-500">AI Tutor</p>
                <div className="flex flex-wrap gap-2">{(Object.keys(subjects) as Subject[]).map((s) => <Pill key={s} active={subject === s} onClick={() => setSubjectSafe(s)}>{subjects[s].emoji} {s}</Pill>)}</div>
              </div>
              <div>
                <p className="mb-2 text-xs font-black uppercase tracking-widest text-slate-500">Chapter</p>
                <select value={chapterIndex} onChange={(e) => { setChapterIndex(Number(e.target.value)); setTopicIndex(0); setVideoReady(false); }} className="w-full rounded-2xl border border-slate-200 bg-white p-3 font-bold">
                  {chapters.map((c, i) => <option key={c.chapter} value={i}>{c.chapter}</option>)}
                </select>
              </div>
              <div>
                <p className="mb-2 text-xs font-black uppercase tracking-widest text-slate-500">Topic</p>
                <select value={topicIndex} onChange={(e) => { setTopicIndex(Number(e.target.value)); setVideoReady(false); }} className="w-full rounded-2xl border border-slate-200 bg-white p-3 font-bold">
                  {chapter.topics.map((t, i) => <option key={t} value={i}>{t}</option>)}
                </select>
              </div>
              <div>
                <p className="mb-2 text-xs font-black uppercase tracking-widest text-slate-500">Learning mode</p>
                <div className="flex flex-wrap gap-2">{["Real-life examples", "Difficult words", "Exam answer", "Quiz", "Video storyboard"].map((m) => <Pill key={m} active={mode === m} onClick={() => setMode(m)}>{m}</Pill>)}</div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.25em] text-blue-700">Dynamic AI response</p>
                <h3 className="mt-2 text-3xl font-black text-ink">{answer.concept}</h3>
              </div>
              <div className={`rounded-2xl bg-gradient-to-r ${meta.color} px-4 py-2 text-sm font-black text-white`}>{mode}</div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-xs font-black uppercase tracking-widest text-slate-500">Simple meaning</p>
                <p className="mt-2 font-semibold leading-7 text-slate-700">{answer.simple}</p>
              </div>
              <div className="rounded-3xl bg-blue-50 p-5">
                <p className="text-xs font-black uppercase tracking-widest text-blue-600">Real-life example</p>
                <p className="mt-2 font-semibold leading-7 text-slate-700">{answer.example}</p>
              </div>
            </div>

            <div className="mt-4 rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-sm font-black text-ink">Difficult words explained</p>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                {chapter.words.map((w) => <div key={w.word} className="rounded-2xl border border-slate-100 p-4"><strong>{w.word}</strong><p className="mt-1 text-sm text-slate-600">{w.meaning}</p></div>)}
              </div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl bg-emerald-50 p-5"><strong>Smart note</strong><p className="mt-2 text-sm leading-6 text-slate-600">Saved under Class {classLevel} → {subject} → {chapter.chapter} → {topic}</p></div>
              <div className="rounded-3xl bg-amber-50 p-5"><strong>Practice quiz</strong><p className="mt-2 text-sm leading-6 text-slate-600">5 adaptive questions based on {topic} and weak-topic score.</p></div>
              <div className="rounded-3xl bg-rose-50 p-5"><strong>Private tutor</strong><p className="mt-2 text-sm leading-6 text-slate-600">{plan === "Premium" ? "Unlocked: book a 1:1 session." : "Locked: upgrade to Premium."}</p></div>
            </div>

            <div className="mt-4 rounded-3xl bg-ink p-5 text-white">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div><strong>AI video example</strong><p className="mt-1 text-sm text-slate-300">ChatGPT creates script + storyboard, then stores it under this topic. Provider can be Veo/Runway/Luma later.</p></div>
                <button onClick={() => setVideoReady(true)} className="rounded-2xl bg-white px-4 py-3 text-sm font-black text-ink">Generate storyboard</button>
              </div>
              {videoReady && <div className="mt-4 rounded-2xl bg-white/10 p-4 text-sm leading-6">Scene: Indian student sees {answer.example.toLowerCase()} Caption: “This is {topic}.” End quiz: {answer.quick}</div>}
            </div>
          </Card>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-3">
          <Card>
            <h3 className="text-xl font-black">Simulations / virtual labs</h3>
            <p className="mt-2 text-slate-600">{chapter.simulation ?? "Interactive diagram or topic resource can be mapped here."}</p>
            <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm font-bold">External resources remain links for licensing safety.</p>
          </Card>
          <Card>
            <h3 className="text-xl font-black">Syllabus + PYQs</h3>
            <p className="mt-2 text-slate-600">{chapter.resource}</p>
            <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm font-bold">AI maps paper questions to weak topics and revision notes.</p>
          </Card>
          <Card>
            <h3 className="text-xl font-black">Agent classroom</h3>
            <p className="mt-2 text-slate-600">OpenMAIC-style agents: AI Teacher, Curious Student, Exam Coach, Difficult Words Coach, Lab/Simulation Guide.</p>
            <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm font-bold">Scientific agent skills improve reasoning and process tracing.</p>
          </Card>
        </section>

        <section id="cloud" className="mt-6 rounded-[2rem] bg-ink p-6 text-white md:p-8">
          <h3 className="text-3xl font-black">Cloud architecture</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-4">
            {["Vercel: app hosting", "Supabase: Postgres + pgvector + storage", "Clerk/Supabase: auth", "OpenAI/Claude/Gemini: AI tutor", "Veo/Runway/Luma: videos later", "Razorpay: premium payments", "GitHub: source code", "NCERT/CBSE RAG: trusted answers"].map((item) => <div key={item} className="rounded-2xl bg-white/10 p-4 text-sm font-bold">{item}</div>)}
          </div>
        </section>
      </section>
    </main>
  );
}
