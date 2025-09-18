# 🚀 Daily Roast 🔥

**Daily Roast** is a community-driven Reddit app where users receive a new roasting challenge every day, submit their funniest insults, vote on community submissions, and compete for leaderboard glory.  
Built specifically for the [Reddit Devvit Hackathon 2025](https://www.reddit.com/r/GameOnReddit), this app emphasizes fresh, recurring content and engaging User-Generated Content (UGC).

---

## 🎯 Problem Solved

Reddit thrives on humor, creativity, and community interaction, but lacks a structured way to collect and rank roast-style content interactively.  
Daily Roast provides a lightweight experience to encourage daily user participation, boost engagement, and allow fun, lighthearted competition among redditors.

---

## 🌟 Key Features

- ✅ **Daily Prompt:** A unique roast challenge every day to inspire creativity.  
- ✅ **User Submissions:** Users submit original roasts (no login required).  
- ✅ **Voting System:** Upvote 👍 or downvote 👎 submissions.  
- ✅ **Emoji Reactions:** Add reactions (😂 🤣 😭) to submissions.  
- ✅ **Leaderboard:** Top 5 submissions shown by votes.  
- ✅ **Base Roast Generator:** Inspiration generator for roasts.  
- ✅ **Responsive UI:** Mobile-friendly with Tailwind CSS.  
- ✅ **Dark Mode Toggle:** User-friendly night mode.  
- ✅ **Simple UX:** No authentication, in-memory storage (for demo).

---

## 🎮 How to Play

1. View the daily roast challenge prompt, e.g.:  
   _"Roast this cat pic 🐱"_

2. Enter your funniest roast in the input box and submit.

3. Browse other redditor submissions and vote 👍 or 👎, and react with emojis.

4. Check the leaderboard to see the top-rated roasts.

5. Generate a random base roast for inspiration when needed.

---

## 🚧 Tech Stack

| Technology      | Purpose |
|---------------|---------|
| **Devvit Web** | Platform for Reddit app development |
| **React**      | Component-based frontend UI |
| **TypeScript** | Static typing and safety |
| **Tailwind CSS** | Fast and responsive styling |
| **Express**    | Backend API support |
| **Vite**      | Fast build & development tooling |

---

## 🧱 Architecture Overview

- Frontend (React) served as WebView in the Reddit environment.  
- Submission state stored locally in memory (no DB).  
- Interactive Post manages display & user interactions.  
- Votes & reactions update in real-time.  
- Daily prompt and inspiration generator use in-memory logic.  

---

## ⚡ Hackathon Submission Info

- ✅ **Category:** Daily Challenge  
- ✅ **Playtest Link:**  
  [https://www.reddit.com/r/dailyroast_dev/?playtest=daily-roast](https://www.reddit.com/r/dailyroast_dev/?playtest=daily-roast)  
- ✅ **App Link:**  
  [https://developers.reddit.com/apps/daily-roast](https://developers.reddit.com/apps/daily-roast)  
- ✅ **Demo Video:** (Insert link here)  
- ✅ **Authors:**  
  - Manisankar ([Reddit Username])  

---

## 🚀 Getting Started (For Developers)

# Install dependencies
npm install

# Run development server
npm run dev

# Build production assets
npm run build

# Deploy new version
npm run deploy

# Publish app for review
npm run launch
⚠️ Important Notes
📝 This app is designed for demonstration purposes only (no persistent backend).

✅ Simple, no-auth system ensures low barrier to entry.

🛠️ Playtest mode available during development phase.

⚡ Votes and submissions are reset periodically (non-persistent).

🎉 Thank You
Thank you to Reddit for hosting this hackathon and providing tools for community-driven innovation.
Made with ❤️ by [Manisankar].

📞 Contact
For questions, feedback, or collaboration:

Reddit: u/Manixsankar

---

👉 Do you want me to save this as `README.md` ready to place in your project root folder?