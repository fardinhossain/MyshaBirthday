# 💖 Happy 18th Birthday Mysha! 🎂

A beautiful, interactive birthday website made with love for **Afrin Akter Mysha** on her 18th birthday (November 27, 2025).

## ✨ Features

- 💌 **Interactive Envelope** - Click to reveal the birthday surprise
- ⏰ **Live Countdown Timer** - Counts down to November 27, 2025
- 🎊 **Confetti Animation** - Celebrate with colorful confetti bursts
- 💕 **Floating Hearts** - Romantic heart animations in the background
- 📸 **Photo Gallery** - Showcase your beautiful memories together
- 🎁 **Surprise Button** - Click for random love messages
- 🎵 **Background Music** - Optional birthday song
- 📱 **Fully Responsive** - Works on all devices
- 🌈 **Easter Egg** - Try the Konami Code! (↑↑↓↓←→←→BA)

## 📁 Project Structure

```
fm_birthday_website/
├── fmday.html          # Main HTML file
├── styles.css          # All styling
├── script.js           # Interactive features
├── images/             # Your photos go here
│   ├── photo1.jpg
│   ├── photo2.jpg
│   ├── photo3.jpg
│   ├── photo4.jpg
│   ├── photo5.jpg
│   └── photo6.jpg
├── assets/             # Music files
│   └── birthday-song.mp3 (optional)
└── README.md           # This file
```

## 🖼️ Adding Your Photos

1. Navigate to the `images/` folder
2. Add your photos with these exact names:
   - `photo1.jpg`
   - `photo2.jpg`
   - `photo3.jpg`
   - `photo4.jpg`
   - `photo5.jpg`
   - `photo6.jpg`

**Tips:**
- Square images (1:1 ratio) look best
- Recommended size: 600x600 pixels or larger
- Supported formats: JPG, PNG, WEBP

**Want more photos?** Add more gallery items in `fmday.html`:
```html
<div class="gallery-item">
    <img src="images/photo7.jpg" alt="Our Memory 7">
    <div class="gallery-overlay">
        <span>💖</span>
    </div>
</div>
```

## 🎵 Adding Background Music (Optional)

1. Find a birthday song or romantic song (MP3 format)
2. Rename it to `birthday-song.mp3`
3. Place it in the `assets/` folder
4. Click the 🎵 button on the website to play!

## 🚀 How to Open

### Option 1: Direct Open
Simply double-click `fmday.html` to open in your browser!

### Option 2: Using VS Code Live Server
1. Install the "Live Server" extension in VS Code
2. Right-click on `fmday.html`
3. Select "Open with Live Server"

### Option 3: Command Line
```powershell
# In PowerShell, navigate to the folder and run:
start fmday.html
```

## 💝 Customization

### Change the Birthday Message
Edit the text inside the `<div class="message-card">` section in `fmday.html`

### Change Colors
The main colors are in `styles.css`:
- Primary Pink: `#ff69b4`
- Deep Pink: `#ff1493`
- Gold/Yellow: `#ffeb3b`

### Change the Birthday Date
In `script.js`, modify:
```javascript
const BIRTHDAY_DATE = new Date('November 27, 2025 00:00:00');
```

### Add More Wishes
Find the "18 Wishes" section in `fmday.html` and add/modify items

## 💕 Made With Love

This website was created with lots of love to celebrate the 18th birthday of the most special person - **Afrin Akter Mysha**.

---

*Happy Birthday, Mysha! 🎂💖✨*
