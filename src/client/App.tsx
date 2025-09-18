import { useState, useEffect } from 'react';

type Roast = {
  text: string;
  upvotes: number;
  downvotes: number;
  reactions: Record<string, number>;
};

const emojiLaugh = "😂";
const emojiROFL = "🤣";
const emojiCry = "😭";

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
];

const roastPrompts = [
  "Roast this cat 🐱",
  "Roast this random meme 📸",
  "Roast the person in this photo 🤔",
  "Roast this coding fail 💻",
  "Roast this viral tweet 🐦",
  "Roast this office moment 🏢",
  "Roast this family gathering pic 👪",
  "Roast this friend's selfie 🤳",
  "Roast this food pic 🍕",
  "Roast this fashion disaster 👗",
  "Roast this workout fail 🏋️",
  "Roast this pet video 🐶",
  "Roast this Zoom meeting screenshot 💻",
  "Roast this holiday photo 🎄",
  "Roast this meme you saved 😂",
  "Roast this childhood photo 🧸",
  "Roast this gaming fail 🎮",
  "Roast this group chat screenshot 💬",
  "Roast this morning selfie 🌅",
  "Roast this online shopping haul 🛒",
  "Roast this TikTok video 🎵",
  "Roast this Snapchat story 👻",
  "Roast this Instagram reel 📹",
  "Roast this reaction video 😱",
  "Roast this coffee pic ☕",
  "Roast this car parking fail 🚗",
  "Roast this text message screenshot 📱",
  "Roast this school photo 📚",
  "Roast this pet costume 🐾",
  "Roast this gym selfie 💪",
  "Roast this birthday cake 🎂",
  "Roast this vacation photo 🏖️",
  "Roast this haircut ✂️",
  "Roast this messy room 🏠",
  "Roast this DIY project 🛠️",
  "Roast this drawing 🎨",
  "Roast this dance video 💃",
  "Roast this snow picture ❄️",
  "Roast this beach selfie 🌊",
  "Roast this group selfie 🤳",
  "Roast this food disaster 🍔",
  "Roast this Zoom outfit 👔",
  "Roast this failed prank 😈",
  "Roast this pet sleeping 😴",
  "Roast this cosplay costume 🦸‍♂️",
  "Roast this rainy day photo 🌧️",
  "Roast this car selfie 🚙",
  "Roast this mountain hike 🏔️",
  "Roast this puddle photo 💧",
  "Roast this baked food 🍪",
  "Roast this messy hair 🤯",
  "Roast this cooking fail 🍳",
  "Roast this painting 🎨",
  "Roast this fashion look 👚",
  "Roast this winter outfit 🧣",
  "Roast this gym fail 🏋️",
  "Roast this reaction screenshot 😳",
  "Roast this pet trick 🐕",
  "Roast this childhood drawing ✏️",
  "Roast this smoothie 🍹",
  "Roast this backpack setup 🎒",
  "Roast this school project 📐",
  "Roast this messy desk 🖥️",
  "Roast this cosplay wig 🎭",
  "Roast this lazy day 🛌",
  "Roast this fast food pic 🍟",
  "Roast this pool selfie 🏊‍♂️",
  "Roast this book cover 📖",
  "Roast this board game fail 🎲",
  "Roast this coffee art ☕",
  "Roast this dinner selfie 🍽️",
  "Roast this DIY costume 🪡",
  "Roast this dance move 💃",
  "Roast this snowman ⛄",
  "Roast this selfie with pets 🐾",
  "Roast this group Zoom call 💻",
  "Roast this cosplay prop 🛡️",
  "Roast this pancake stack 🥞",
  "Roast this gym outfit 🏋️‍♂️",
  "Roast this homemade cake 🎂",
  "Roast this cat video 🐈",
  "Roast this dog video 🐕",
  "Roast this viral meme 😂",
  "Roast this awkward pose 😬",
  "Roast this messy lunch 🍱",
  "Roast this weekend selfie 🌞",
  "Roast this rainy selfie 🌧️",
  "Roast this snowball fight ❄️",
  "Roast this dessert 🍰",
  "Roast this cake decoration 🎂",
  "Roast this garden photo 🌱",
  "Roast this lazy pet 🐾",
  "Roast this food spill 🍴",
  "Roast this dog costume 🐶",
  "Roast this cat nap 🐱",
  "Roast this group selfie gone wrong 🤳",
  "Roast this prank fail 😂",
  "Roast this messy desk 🖥️",
  "Roast this workout photo 💪",
  "Roast this fashion choice 👗",
  "Roast this vacation selfie 🏖️",
  "Roast this mountain selfie 🏔️",
  "Roast this office desk 🗄️",
  "Roast this online class fail 💻",
  "Roast this pet trick 🐕",
  "Roast this smoothie spill 🍹",
  "Roast this messy room 🏠",
  "Roast this zoom outfit 👔"
];

export default function App() {
  const [promptOfTheDay, setPromptOfTheDay] = useState(roastPrompts[0]);
  const [communityRoasts, setCommunityRoasts] = useState<Roast[]>([]);
  const [userRoast, setUserRoast] = useState('');
  const [baseRoast, setBaseRoast] = useState(baseRoasts[0]);
  const [taggedPost, setTaggedPost] = useState('');

  // Load saved roasts from localStorage
  useEffect(() => {
    const savedRoasts = localStorage.getItem('communityRoasts');
    if (savedRoasts) setCommunityRoasts(JSON.parse(savedRoasts));
  }, []);

  // Persist community roasts
  useEffect(() => {
    localStorage.setItem('communityRoasts', JSON.stringify(communityRoasts));
  }, [communityRoasts]);

  // Generate a random prompt
  const generatePromptOfTheDay = () => {
    const randomIndex = Math.floor(Math.random() * roastPrompts.length);
    setPromptOfTheDay(roastPrompts[randomIndex]);
  };

  // Submit a roast
  const submitRoast = () => {
    if (!userRoast.trim()) return alert("Please enter your roast!");
    const newRoast: Roast = {
      text: userRoast.trim(),
      upvotes: 0,
      downvotes: 0,
      reactions: { [emojiLaugh]: 0, [emojiROFL]: 0, [emojiCry]: 0 }
    };
    setCommunityRoasts([newRoast, ...communityRoasts]);
    setUserRoast('');
  };

  // Vote roast
  const voteRoast = (index: number, isUpvote: boolean) => {
    const updated = [...communityRoasts];
    if (updated[index]) {
      isUpvote ? updated[index].upvotes++ : updated[index].downvotes++;
      setCommunityRoasts(updated);
    }
  };

  // React with emoji
  const reactToRoast = (index: number, emoji: string) => {
    const updated = [...communityRoasts];
    if (updated[index]) {
      updated[index].reactions[emoji] = (updated[index].reactions[emoji] || 0) + 1;
      setCommunityRoasts(updated);
    }
  };

  // Generate random base roast
  const generateBaseRoast = () => {
    const randomIndex = Math.floor(Math.random() * baseRoasts.length);
    setBaseRoast(baseRoasts[randomIndex]);
  };

  // Submit user-tagged post
  const submitTaggedPost = () => {
    if (!taggedPost.trim()) return alert("Please enter a post to tag!");
    setPromptOfTheDay(taggedPost.trim());
    setTaggedPost('');
  };

  // Top roasts by upvotes
  const topRoasts = [...communityRoasts].sort((a,b)=>b.upvotes-a.upvotes).slice(0,3);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center font-sans max-w-xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-red-600">🔥 Dynamic Roast Challenge</h1>

      {/* Roast Prompt */}
      <section className="bg-white p-6 rounded-lg shadow-md w-full mb-6">
        <h2 className="text-xl font-semibold mb-2">🔥 Roast Prompt of the Day:</h2>
        <p className="italic mb-3">"{promptOfTheDay}"</p>
        <button
          onClick={generatePromptOfTheDay}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Load Another Prompt
        </button>
      </section>

      {/* Tagged Post */}
      <section className="bg-white p-6 rounded-lg shadow-md w-full mb-6">
        <h2 className="text-xl font-semibold mb-2">Tag Your Own Post:</h2>
        <input
          type="text"
          value={taggedPost}
          onChange={(e) => setTaggedPost(e.target.value)}
          placeholder="Enter post title here..."
          className="w-full p-3 border border-gray-300 rounded-md mb-3"
        />
        <button
          onClick={submitTaggedPost}
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
        >
          Submit Tagged Post
        </button>
      </section>

      {/* Submit Roast */}
      <section className="bg-white p-6 rounded-lg shadow-md w-full mb-6">
        <h2 className="text-xl font-semibold mb-2">Submit Your Roast:</h2>
        <textarea
          value={userRoast}
          onChange={(e) => setUserRoast(e.target.value)}
          placeholder="Your savage roast here..."
          rows={3}
          className="w-full p-3 border border-gray-300 rounded-md mb-3 resize-none"
        />
        <button
          onClick={submitRoast}
          className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition"
        >
          Submit Roast
        </button>
      </section>

      {/* Community Roasts */}
      <section className="bg-white p-6 rounded-lg shadow-md w-full mb-6">
        <h2 className="text-xl font-semibold mb-4">🔥 Community Roasts</h2>
        {communityRoasts.length === 0 ? <p>No roasts yet. Be the first!</p> :
          communityRoasts.map((roast, idx) => (
            <div key={idx} className="border-b border-gray-200 py-3 last:border-none">
              <p className="mb-2">“{roast.text}”</p>
              <div className="flex items-center gap-4 text-gray-700 text-sm">
                <button onClick={()=>voteRoast(idx,true)} className="hover:text-green-600">👍 {roast.upvotes}</button>
                <button onClick={()=>voteRoast(idx,false)} className="hover:text-red-600">👎 {roast.downvotes}</button>
                <button onClick={()=>reactToRoast(idx,emojiLaugh)}>{emojiLaugh} {roast.reactions[emojiLaugh]}</button>
                <button onClick={()=>reactToRoast(idx,emojiROFL)}>{emojiROFL} {roast.reactions[emojiROFL]}</button>
                <button onClick={()=>reactToRoast(idx,emojiCry)}>{emojiCry} {roast.reactions[emojiCry]}</button>
              </div>
            </div>
          ))
        }
      </section>

      {/* Top Roasts */}
      <section className="bg-white p-6 rounded-lg shadow-md w-full mb-6">
        <h2 className="text-xl font-semibold mb-4">🏆 Top Roasts</h2>
        {topRoasts.length === 0 ? <p>No roasts to show.</p> :
          topRoasts.map((roast, idx)=>(
            <p key={idx} className="mb-2">“{roast.text}” (👍 {roast.upvotes})</p>
          ))
        }
      </section>

      {/* Base Roast Generator */}
      <section className="bg-white p-6 rounded-lg shadow-md w-full mb-6 text-center">
        <h2 className="text-xl font-semibold mb-2">🎲 Random Roast Generator</h2>
        <p className="mb-3 italic">"{baseRoast}"</p>
        <button
          onClick={generateBaseRoast}
          className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition"
        >
          Generate Random Roast
        </button>
      </section>
    </div>
  );
}
