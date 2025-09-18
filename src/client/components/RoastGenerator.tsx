import { useState, useEffect } from "react";

const roastPrompts = [
  "Roast this cat pic 🐱",
  "Roast this random meme 📸",
  "Roast the person in this photo 🤔",
  "Roast this coding fail 💻",
  "Roast this viral tweet 🐦",
  "Roast this office moment 🏢",
  "Roast this family gathering pic 👪",
];

const baseRoasts = [
 "You're as bright as a black hole.",
  "You bring everyone so much joy… when you leave the room.",
  "You're proof that even evolution takes a break sometimes.",
  "You're like a software update… nobody asked for it.",
  "You're like a broken GPS.",
  "You're like decaf coffee—pointless and disappointing.",
  "You're like a pop-up ad—annoying and unavoidable.",
  "You're the human version of a typo.",
  "You're like a cloud without rain—pointless.",
  "You're as useless as the 'ueue' in 'queue'.",
  "You're the plot twist nobody wanted.",
  "You're like a slow loading page—frustrating for everyone.",
  "You're like a browser tab left open… slowly draining everyone.",
  "You're as confusing as IKEA instructions.",
  "You're like a vending machine that only takes exact change.",
  "You're proof that sarcasm exists for a reason.",
  "You're like decaf tea—barely anyone cares.",
  "You're like an expired coupon—useless at the worst time.",
  "You're like a spoiler alert nobody asked for.",
  "You're like a Monday morning—nobody likes you.",
  "You're like a participation trophy—nice but pointless.",
  "You're as reliable as a WiFi signal in a basement.",
  "You're like a group project—everyone regrets you.",
  "You're like a car with no fuel—going nowhere fast.",
  "You're like a cliffhanger with no sequel—frustrating.",
  "You're like a typo in a famous tweet—embarrassing.",
  "You're like decaf coffee—disappointing and bland.",
  "You're like a broken mirror—reflecting nothing good.",
  "You're like a puzzle missing half the pieces.",
  "You're like a pop-up ad on a Sunday morning.",
  "You're like a Netflix buffering screen—annoying.",
  "You're like decaf coffee—barely anyone cares.",
  "You're like an expired coupon—useless at the worst time.",
  "You're like a spoiler alert nobody asked for.",
  "You're like a Monday morning—nobody likes you.",
  "You're like a participation trophy—nice but pointless.",
  "You're as reliable as a WiFi signal in a basement.",
  "You're like a group project—everyone regrets you.",
  "You're like a car with no fuel—going nowhere fast.",
  "You're like a cliffhanger with no sequel—frustrating.",
  "You're like a typo in a famous tweet—embarrassing.",
  "You're like a broken mirror—reflecting nothing good.",
  "You're like a puzzle missing half the pieces.",
  "You're like a pop-up ad on a Sunday morning.",
  "You're like a Netflix buffering screen—annoying.",
  "You're like a loading screen that never ends.",
  "You're like a forgotten password—useless when needed.",
  "You're like socks with holes—supposed to protect but fail.",
  "You're like a GPS recalculating—always lost.",
  "You're like a muted video—silent and confusing.",
  "You're like a phone with 1% battery—always stressing.",
  "You're like a fridge with no food—pointless.",
  "You're like a clock with no hands—completely lost.",
  "You're like a password hint that makes no sense.",
  "You're like a forgotten umbrella in the rain.",
  "You're like a pencil with no lead—pointless.",
  "You're like a bookmark in the wrong page.",
  "You're like an offline app—useless when needed.",
  "You're like a sneeze that never comes—frustrating.",
  "You're like a pen that won’t write—always disappointing.",
  "You're like a broken escalator—going nowhere.",
  "You're like a traffic light stuck on red—annoying everyone.",
  "You're like a silent alarm—doesn’t work when it should.",
  "You're like decaf tea—bland and disappointing.",
  "You're like a website with 404 errors—unhelpful.",
  "You're like a balloon without air—deflated.",
  "You're like a broken record—repeating nonsense.",
  "You're like a drawer with missing socks.",
  "You're like a bookmark in a closed book—useless.",
  "You're like a raincoat in a drought—pointless.",
  "You're like a keyboard with sticky keys.",
  "You're like a slow elevator—annoying everyone waiting.",
  "You're like an empty coffee cup—sad and disappointing.",
  "You're like a screen protector with bubbles—unpleasant.",
  "You're like a cookie with no chocolate chips.",
  "You're like a pen with dried ink—unusable.",
  "You're like a calendar with wrong dates.",
  "You're like a playlist with no songs.",
  "You're like a flashlight with dead batteries.",
  "You're like a pillow with no fluff—uncomfortable.",
  "You're like a suitcase with no handle.",
  "You're like a car with a flat tire.",
  "You're like a movie with missing scenes.",
  "You're like a cake with no frosting—boring.",
  "You're like a sandwich with no filling.",
  "You're like a phone with no ringtone.",
  "You're like a cookie with no sugar—bland.",
  "You're like a candle with no wick.",
  "You're like a train with no tracks.",
  "You're like a tea kettle with no whistle.",
  "You're like a hat with no head.",
  "You're like a pen with no cap—dangerous.",
  "You're like a notebook with blank pages.",
  "You're like a watch with no hands.",
  "You're like a cup with no handle—awkward.",
  "You're like a mirror with cracks.",
  "You're like a camera with no lens.",
  "You're like a shoe with no sole.",
  "You're like a book with missing chapters.",
  "You're like a chair with no legs.",
  "You're like a bicycle with a missing chain.",
  "You're like a lamp with no bulb.",
  "You're like a fridge that never cools.",
  "You're like a phone that never rings.",
  "You're like a printer with no ink.",
  "You're like a TV with no signal.",
  "You're like a backpack with a broken zipper.",
  "You're like a door with no handle.",
  "You're like a car that won’t start.",
  "You're like a computer with no power button.",
  "You're like a clock that always runs late.",
  "You're like a bottle with a missing cap.",
  "You're like a pen that keeps breaking.",
  "You're like a window that won’t open.",
  "You're like a bag with no bottom—messy.",
  "You're like a cup with a hole—useless.",
  "You're like a bike with no brakes—dangerous.",
  "You're like a zipper that always sticks.",
  "You're like a puzzle missing pieces.",
  "You're like a sticky note that never sticks.",
  "You're like a blanket with holes.",
  "You're like a candle that won’t light.",
  "You're like a plate with a crack.",
  "You're like a keyboard with missing keys.",
  "You're like a cup with a chip.",
  "You're like a wall with paint peeling.",
  "You're like a sandwich with burnt bread.",
  "You're like a pen that leaks everywhere.",
  "You're like a chair that wobbles.",
  "You're like a door that squeaks constantly.",
  "You're like a phone that drops calls.",
  "You're like a sock with a hole in the toe."
  // ... you can keep all your existing baseRoasts
];

type Submission = {
  id: number;
  username: string;
  text: string;
  votes: number;
  timestamp: string;
  reactions: Record<string, number>;
};

export default function RoastGenerator() {
  const todayIndex = new Date().getDate() % roastPrompts.length;
  const [dailyPromptIndex, setDailyPromptIndex] = useState(todayIndex);
  const dailyPrompt = roastPrompts[dailyPromptIndex];

  const [username, setUsername] = useState("");
  const [userRoast, setUserRoast] = useState("");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [confirmation, setConfirmation] = useState("");
  const [inspiration, setInspiration] = useState(baseRoasts[0]);
  const [hasSubmittedToday, setHasSubmittedToday] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const todayKey = `submitted-${new Date().toISOString().slice(0, 10)}`;

  useEffect(() => {
    const submitted = localStorage.getItem(todayKey);
    setHasSubmittedToday(submitted === "true");
  }, [todayKey]);

  const submitRoast = () => {
    if (!userRoast.trim()) return;
    if (hasSubmittedToday) return;

    const newSubmission: Submission = {
      id: Date.now(),
      username: username.trim() || "Anon",
      text: userRoast.trim(),
      votes: 0,
      timestamp: new Date().toLocaleString(),
      reactions: { "😂": 0, "🤣": 0, "😭": 0 },
    };
    setSubmissions([newSubmission, ...submissions]);
    setUserRoast("");
    setUsername("");
    setConfirmation("✅ Roast submitted successfully!");
    setHasSubmittedToday(true);
    localStorage.setItem(todayKey, "true");

    setTimeout(() => setConfirmation(""), 3000);
  };

  const voteRoast = (id: number, type: "up" | "down") => {
    setSubmissions(prev =>
      prev.map(r =>
        r.id === id ? { ...r, votes: type === "up" ? r.votes + 1 : r.votes - 1 } : r
      )
    );
  };

  const reactRoast = (id: number, emoji: string) => {
    setSubmissions(prev =>
      prev.map(r =>
        r.id === id
          ? { ...r, reactions: { ...r.reactions, [emoji]: (r.reactions[emoji] ?? 0) + 1 } }
          : r
      )
    );
  };

  const generateBaseRoast = () => {
    const randomIndex = Math.floor(Math.random() * baseRoasts.length);
    setInspiration(baseRoasts[randomIndex] ?? "Here's a roast for inspiration!");
  };

  const generateRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * roastPrompts.length);
    setDailyPromptIndex(randomIndex);
  };

  const sortedSubmissions = [...submissions].sort((a, b) => b.votes - a.votes);
  const topVotes = sortedSubmissions[0]?.votes ?? 0;

  return (
    <div className={`${darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"} 
      p-4 sm:p-6 rounded shadow-md max-w-xl sm:max-w-2xl mx-auto mt-6 sm:mt-10 text-center`}>
      
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Daily Roast 🔥</h1>

      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="mb-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
      >
        {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>

      {/* Daily Prompt */}
      <div className={`${darkMode ? "bg-yellow-700 text-yellow-100" : "bg-yellow-100 text-yellow-900"} mb-4 sm:mb-6 p-4 sm:p-6 rounded shadow-md`}>
        <h2 className="text-lg sm:text-xl font-semibold mb-2">Today's Prompt:</h2>
        <p className="text-sm sm:text-lg">{dailyPrompt}</p>
        <button
          onClick={generateRandomPrompt}
          className="mt-2 w-full sm:w-auto px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          🎲 Random Prompt
        </button>
      </div>

      {/* Base Roast */}
      <div className={`${darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-900"} mb-4 sm:mb-6 p-4 sm:p-6 rounded`}>
        <h2 className="text-lg sm:text-xl font-semibold mb-2">Need inspiration?</h2>
        <p className="mb-2 text-sm sm:text-base">{inspiration}</p>
        <button
          onClick={generateBaseRoast}
          className="w-full sm:w-auto px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Generate Base Roast
        </button>
      </div>

      {/* User Submission */}
      <div className="mb-4 sm:mb-6 text-left">
        <h2 className="text-lg sm:text-xl font-semibold mb-2">Submit Your Roast:</h2>
        {hasSubmittedToday ? (
          <p className="text-red-600 font-semibold text-sm sm:text-base">
            ⚠️ You have already submitted today! Come back tomorrow.
          </p>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row gap-2 mb-2">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your name (optional)"
                className="flex-1 p-2 sm:p-3 border rounded shadow-sm text-sm sm:text-base"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={userRoast}
                onChange={(e) => setUserRoast(e.target.value)}
                placeholder="Write your roast here... 🤬"
                className="flex-1 p-2 sm:p-3 border rounded shadow-sm text-sm sm:text-base"
                onKeyDown={(e) => e.key === "Enter" && submitRoast()}
              />
              <button
                onClick={submitRoast}
                className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm sm:text-base"
              >
                Submit Roast 🚀
              </button>
            </div>
          </>
        )}
        {confirmation && (
          <p className="mt-2 text-green-600 font-semibold text-sm sm:text-base">{confirmation}</p>
        )}
      </div>

      {/* Community Roasts */}
      <div className="mb-4 sm:mb-6 text-left">
        <h2 className="text-lg sm:text-xl font-semibold mb-2">Community Roasts:</h2>
        {sortedSubmissions.length === 0 ? (
          <p className="text-gray-500 text-sm sm:text-base">No submissions yet. Be the first! 🎯</p>
        ) : (
          sortedSubmissions.map((roast) => (
            <div
              key={roast.id}
              className={`p-2 sm:p-3 mb-2 rounded flex flex-col sm:flex-row justify-between items-start sm:items-center ${
                roast.votes === topVotes && topVotes > 0
                  ? "bg-yellow-200 border-2 border-yellow-400"
                  : darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-50"
              }`}
            >
              <div className="mb-2 sm:mb-0 text-sm sm:text-base">
                <span className="font-medium">{roast.text}</span>
                <div className="text-xs sm:text-sm text-gray-500">
                  🕒 {roast.timestamp} | 👤 {roast.username}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => voteRoast(roast.id, "up")}
                    className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs sm:text-sm"
                  >
                    👍
                  </button>
                  <span className="font-semibold text-sm sm:text-base">{roast.votes}</span>
                  <button
                    onClick={() => voteRoast(roast.id, "down")}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs sm:text-sm"
                  >
                    👎
                  </button>
                </div>
                <div className="flex items-center gap-1 text-xs sm:text-sm">
                  {["😂", "🤣", "😭"].map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => reactRoast(roast.id, emoji)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      {emoji} {roast.reactions[emoji] ?? 0}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Leaderboard */}
      {sortedSubmissions.length > 0 && (
        <div className="text-left mb-6 sm:mb-10">
          <h2 className="text-lg sm:text-xl font-semibold mb-2">🔥 Leaderboard:</h2>
          <ol className="list-decimal list-inside text-sm sm:text-base">
            {sortedSubmissions.slice(0, 5).map((roast) => (
              <li key={roast.id} className="mb-1">
                {roast.text}{" "}
                <span className="text-gray-600">
                  ({roast.votes} votes | {roast.username})
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
