# 🌍 Climate Action Pledge - Microsite

A modern, interactive web application that empowers individuals to take meaningful climate action pledges. Users can commit to sustainable practices, receive a digital certificate, and join a community of climate champions displayed on the Pledge Wall.

![Climate Action Pledge](https://img.shields.io/badge/React-19.2.0-blue) ![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4.0-blue) ![License](https://img.shields.io/badge/License-MIT-green)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Google Apps Script Setup](#google-apps-script-setup)
- [Configuration](#configuration)
- [Components](#components)
- [How It Works](#how-it-works)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## 🎯 Overview

The Climate Action Pledge microsite is designed to inspire and mobilize individuals to take concrete climate action. Built with React and integrated with Google Sheets for data persistence, this platform provides:

- **Easy Pledge Taking**: A user-friendly single-page form to commit to climate actions
- **Digital Certificates**: Personalized certificates with heart ratings (3-5 hearts) based on commitment level
- **Live Statistics**: Real-time display of pledge counts and profile breakdowns
- **Pledge Wall**: A searchable, filterable wall of champions showcasing all pledges
- **Social Sharing**: Share your commitment on WhatsApp and Twitter

---

## ✨ Features

### 🎨 Modern UI/UX
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Smooth Animations**: AOS (Animate On Scroll) library for engaging transitions
- **Gradient Themes**: Beautiful green-to-blue gradients representing nature and sustainability
- **Interactive Icons**: Lucide React icons for a modern, clean look

### 📊 Live Statistics Dashboard
- Total pledges counter with animated counting
- Profile breakdown (Students, Professionals, Others)
- Target pledge goal tracker
- "Why Take Climate Action?" motivational section

### 📝 Comprehensive Pledge Form
- **Personal Information**: Name, Email, Mobile, State
- **Profile Selection**: Student, Working Professional, or Other
- **9 Climate Commitments** across 3 themes:
  - **Energy & Transport**: Public transport, LED bulbs, reduced AC usage
  - **Waste & Consumption**: No single-use plastics, composting, local produce
  - **Water & Nature**: Water conservation, tree planting, eco-friendly brands
- **Form Validation**: Email format, 10-digit mobile number validation
- **Real-time Error Display**: Inline error messages for better UX

### 🏆 Digital Certificate
- Personalized with user's name and commitments
- Heart rating system (3-5 hearts based on number of commitments)
- Downloadable as PNG image (using html2canvas)
- Social media sharing buttons (WhatsApp, Twitter)
- Confetti celebration effect on display
- Direct navigation to Pledge Wall

### 🧱 Pledge Wall
- Table display of all pledges with:
  - Name, Date, State, Profile, and Heart rating
- Search functionality (by name or state)
- Filter by profile type
- Empty state message when no pledges match

### 🔐 Data Persistence
- Google Apps Script backend integration
- Google Sheets database with columns:
  - ID, Name, Email, Mobile, State, Profile, Stars, Date
- Automatic data fetching on page load
- No-CORS mode for seamless submission

---

## 🛠 Tech Stack

### Frontend
- **React** (v19.2.0) - UI framework
- **Tailwind CSS** (v3.4.0) - Utility-first CSS framework
- **Lucide React** (v0.548.0) - Icon library
- **AOS** (v2.3.4) - Animate On Scroll library

### Additional Libraries
- **html2canvas** (v1.4.1) - Certificate image generation
- **react-share** (v5.2.2) - Social media sharing
- **canvas-confetti** (v1.9.4) - Celebration effects

### Backend
- **Google Apps Script** - Server-side data handling
- **Google Sheets** - Database for storing pledges

### Build Tools
- **Create React App** (v5.0.1)
- **PostCSS** (v8.5.6)
- **Autoprefixer** (v10.4.21)

---

## 📁 Project Structure

```
pledge/
├── public/
│   ├── icon.png              # Favicon
│   ├── index.html            # HTML template
│   ├── manifest.json         # PWA manifest
│   └── robots.txt            # SEO robots file
├── src/
│   ├── components/
│   │   ├── Hero.js           # Landing hero section
│   │   ├── LiveStats.js      # Statistics dashboard
│   │   ├── PledgeWall.js     # Table of all pledges
│   │   ├── PrivacyNote.js    # Privacy disclaimer
│   │   └── StepperForm/
│   │       ├── index.js      # Main pledge form
│   │       └── Certificate.js # Certificate display & download
│   ├── App.js                # Main app component
│   ├── App.css               # App styles
│   ├── index.js              # Entry point
│   ├── index.css             # Global styles + Tailwind imports
│   └── setupTests.js         # Test configuration
├── package.json              # Dependencies
├── tailwind.config.js        # Tailwind configuration
├── postcss.config.js         # PostCSS configuration
└── README.md                 # Documentation
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Google Account (for Google Sheets integration)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd pledge
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

4. **Open in browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

---

## 📊 Google Apps Script Setup

### Step 1: Create Google Sheet

1. Create a new Google Sheet
2. Add the following headers in Row 1:
   ```
   | A  | B    | C     | D      | E     | F       | G     | H    |
   | ID | Name | Email | Mobile | State | Profile | Stars | Date |
   ```

### Step 2: Set Up Apps Script

1. In your Google Sheet, click **Extensions → Apps Script**
2. Delete any existing code
3. Paste the following code:

```javascript
function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  
  // Skip header row, start from index 1
  const pledges = data.slice(1).map(row => ({
    id: row[0],
    name: row[1],
    email: row[2],
    mobile: row[3],
    state: row[4],
    profile: row[5],
    stars: row[6],
    date: row[7] || ""
  }));
  
  return ContentService.createTextOutput(JSON.stringify(pledges))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Get the next ID
    const lastRow = sheet.getLastRow();
    const nextId = lastRow > 0 ? lastRow : 1;
    
    // Append new row with all fields
    sheet.appendRow([
      nextId,
      data.name,
      data.email,
      data.mobile,
      data.state,
      data.profile,
      data.stars,
      data.date
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      success: false, 
      error: error.toString() 
    }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### Step 3: Deploy as Web App

1. Click **Deploy → New deployment**
2. Click the gear icon ⚙️ and select **Web app**
3. Configure:
   - **Description**: "Climate Pledge API"
   - **Execute as**: Me
   - **Who has access**: Anyone
4. Click **Deploy**
5. Copy the **Web app URL** (it will look like: `https://script.google.com/macros/s/AKfycb.../exec`)

### Step 4: Update React App

Replace the Google Apps Script URL in two files:

**File 1: `src/App.js`** (Line ~14)
```javascript
fetch(
  "YOUR_GOOGLE_SCRIPT_URL_HERE"
)
```

**File 2: `src/components/StepperForm/index.js`** (Line ~92)
```javascript
await fetch(
  "YOUR_GOOGLE_SCRIPT_URL_HERE",
  {
    method: "POST",
    // ...
  }
);
```

---

## ⚙️ Configuration

### Tailwind CSS Configuration

The project uses a custom Tailwind configuration (`tailwind.config.js`):

```javascript
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### AOS Animation Settings

Animations are initialized in `App.js`:

```javascript
useEffect(() => {
  AOS.init({ duration: 800 });
}, []);
```

You can customize animation duration, delay, and easing in each component's `data-aos` attribute.

---

## 🧩 Components

### 1. Hero Component (`Hero.js`)
**Purpose**: Landing section with call-to-action
- Animated background with Globe and Leaf icons
- Gradient background (green to blue)
- "Take the Pledge Now" button with smooth scroll

### 2. LiveStats Component (`LiveStats.js`)
**Purpose**: Display real-time pledge statistics
- 4 KPI cards: Target, Total, Students, Professionals
- Animated counting effect
- "Why Take Climate Action?" motivational section with 4 key points

### 3. StepperForm Component (`StepperForm/index.js`)
**Purpose**: Main pledge form
- Single-page form design (not multi-step)
- Personal info fields with validation
- 9 commitment checkboxes organized by theme
- Submit button disabled until form is valid
- Integrates with Google Apps Script backend

### 4. Certificate Component (`Certificate.js`)
**Purpose**: Display and download pledge certificate
- Shows user's name and selected commitments
- Heart rating (3-5 hearts based on commitment count)
- Download as PNG button
- Social sharing buttons (WhatsApp, Twitter)
- "View Pledge Wall" button with sessionStorage scroll

### 5. PledgeWall Component (`PledgeWall.js`)
**Purpose**: Display all pledges in a table
- Search by name or state
- Filter by profile type
- Shows: Name, Date, State, Profile, Hearts
- Empty state when no results
- Responsive table design

### 6. PrivacyNote Component (`PrivacyNote.js`)
**Purpose**: Privacy disclaimer
- Informs users about data collection
- Positioned between form and pledge wall

---

## 🔄 How It Works

### User Flow

1. **Landing Page**
   - User arrives at Hero section
   - Views animated call-to-action
   - Clicks "Take the Pledge Now" → scrolls to form

2. **View Statistics**
   - LiveStats shows current pledge counts
   - Animated counters engage the user
   - Motivational content explains climate importance

3. **Fill Pledge Form**
   - User enters personal information
   - Selects commitments (checkboxes)
   - Form validates input in real-time
   - Clicks "Submit My Pledge"

4. **Data Submission**
   - Form data sent to Google Apps Script
   - Data stored in Google Sheet with:
     - Auto-generated ID
     - User info (name, email, mobile, state)
     - Profile type
     - Heart rating (3-5 based on commitments)
     - Current date (YYYY-MM-DD format)

5. **Certificate Display**
   - Certificate component shows with confetti effect
   - Displays user's name and commitments
   - Shows heart rating
   - User can:
     - Download certificate as PNG
     - Share on social media
     - View Pledge Wall

6. **Pledge Wall Navigation**
   - Clicking "View Pledge Wall" reloads page
   - sessionStorage flag triggers auto-scroll to Pledge Wall
   - User sees their pledge and all others

### Heart Rating Calculation

```javascript
const calculateHearts = (commitmentCount) => {
  if (commitmentCount <= 3) return 3;  // Bronze level
  if (commitmentCount <= 6) return 4;  // Silver level
  return 5;                            // Gold level (7-9 commitments)
};
```

### Scroll Persistence

After certificate submission:
```javascript
// Certificate.js sets flag
sessionStorage.setItem('scrollToPledgeWall', 'true');
window.location.reload();

// App.js detects flag and scrolls
useEffect(() => {
  const shouldScrollToPledgeWall = sessionStorage.getItem('scrollToPledgeWall');
  if (shouldScrollToPledgeWall === 'true') {
    sessionStorage.removeItem('scrollToPledgeWall');
    setTimeout(() => {
      document.getElementById('pledge-wall').scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 1000);
  }
}, [pledgeData]);
```

---

## 🚢 Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

### Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Drag and drop the `build/` folder to [Netlify Drop](https://app.netlify.com/drop)

### Deploy to GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/pledge",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

3. Deploy:
```bash
npm run deploy
```

---

## 🎨 Customization

### Change Color Theme

Edit `tailwind.config.js` or modify gradient classes in components:

```javascript
// Current: Green to Blue gradient
className="bg-gradient-to-r from-green-600 to-blue-600"

// Example: Purple to Pink gradient
className="bg-gradient-to-r from-purple-600 to-pink-600"
```

### Modify Commitment Options

Edit the `commitmentThemes` object in `StepperForm/index.js`:

```javascript
const commitmentThemes = {
  "Your Theme Name": [
    "Commitment 1",
    "Commitment 2",
    "Commitment 3",
  ],
  // Add more themes...
};
```

### Change Target Pledge Goal

Edit `LiveStats.js`:

```javascript
const TARGET_PLEDGES = 1000000; // Change this number
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- **Lucide React** for beautiful icons
- **Tailwind CSS** for rapid UI development
- **AOS Library** for smooth animations
- **Google Apps Script** for simple backend integration

---

## 📧 Contact

For questions or support, please open an issue in the repository.

---

**Made with 💚 for a sustainable future**

🌱 Every pledge matters. Together, we can make a difference! 🌍
