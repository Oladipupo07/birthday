# For Honitee ❤️ | A Birthday Tribute Website

A beautiful, responsive, and highly interactive digital appreciation website dedicated to **Honitee** for her birthday. This premium single-page application is built using modern vanilla web technologies (HTML5, CSS3, and ES6 JavaScript) and is designed to act as an intimate, memorable digital gift.

---

## ✨ Features Implemented

1. **Elegant Visual Aesthetics**: Designed around a soft cream, white, blush pink, and gold accent theme. It uses premium serif and hand-scripted typography to create an emotional, premium look.
2. **Ambient Particle Effects & Click Interactions**: A performant background canvas renders floating firefly-like sparks, while clicking anywhere on the screen bursts out a stream of customized pastel hearts.
3. **Persisted Polaroid Memories Grid**: Displays four real studio photos of Honitee. Hover over any polaroid to reveal a hidden camera icon; click to replace the image with one of your own, which instantly persists across page reloads using browser caching.
4. **3D Flip Lesson Cards**: Five custom-designed cards representing what Honitee taught us (*Strength*, *Kindness*, *Hard Work*, *Faith*, and *Never Giving Up*). Hovering flips the cards smoothly in 3D to reveal detailed messages.
5. **Interactive Appreciation Timeline**: Chronicling memories from *Childhood*, *School Days*, *Life Lessons*, and *Today*. Click the "Edit" button on any milestone to write your own personalized story; it saves automatically.
6. **Physics Celebration Climax**: Click the pulsing heart or "Shoot Confetti" at the bottom to trigger a side-blasting burst of confetti and countless rising hearts.
7. **Responsive & Accessible**: Fully optimized for mobile screens, tablets, and large 4K displays. Uses semantic HTML structures and complete keyboard navigation guides.

---

## 🚀 How to Run the Project

You do not need to install complex build tools or compilers. You can run the website locally using any of the following three simple methods:

### Method 1: Direct File Launch (Easiest)
1. Open the folder `/home/oladipupoakobe/Desktop/mom/` on your computer.
2. Double-click the **`index.html`** file.
3. It will launch instantly in your default web browser (Chrome, Safari, Firefox, or Edge).

---

### Method 2: Python Local Server (Recommended)
Running the site through a local development server ensures that all browser security protocols, asset imports, and media integrations execute smoothly.

1. Open your terminal.
2. Navigate to the project directory:
   ```bash
   cd /home/oladipupoakobe/Desktop/mom/
   ```
3. Start Python's built-in lightweight HTTP server:
   ```bash
   python3 -m http.server 8080
   ```
4. Open your web browser and navigate to:
   **[http://localhost:8080](http://localhost:8080)**

---

### Method 3: Node.js (npx) Live Server
If you have Node.js installed on your computer, you can run a live reloading server in one simple command:

1. Open your terminal in the project directory.
2. Run the following command:
   ```bash
   npx -y serve .
   ```
3. Open the port listed in the console (usually `http://localhost:3000` or `http://localhost:5000`).

---

## 📁 File Structure

```
├── index.html          # Main semantic page layout, SEO tags & elements
├── README.md           # Instructions and documentation
├── css/
│   └── style.css       # Premium stylesheets (flip-cards, timelines, animations)
├── js/
│   └── main.js         # Particle engine, image caching, timeline state saving
└── assets/             # Real photo uploads and default gallery illustrations
    ├── mom_1.jpg       # Burgundy dress portrait (Childhood default)
    ├── mom_2.jpg       # Family portrait (School Days default)
    ├── mom_3.jpg       # Silver dress portrait (Life Lessons default)
    └── mom_4.jpg       # Blue dress portrait (Today default)
```
