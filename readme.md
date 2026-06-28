# Vitality Metric MVP - מדריך התקנה והרצה

ברוכים הבאים ל-Vitality Metric, מערכת מתקדמת לניהול כושר הכוללת לוח בקרה למתאמן, לוח בקרה למאמן ועוזר כושר מבוסס AI.

## 🚀 דרישות קדם
- **Node.js** (גרסה 18 ומעלה)
- **MongoDB** (חשבון ב-Atlas או התקנה מקומית)
- **Google AI Studio API Key** (עבור עוזר הכושר)

## 📁 מבנה הפרויקט
- `/client`: ממשק המשתמש (Next.js + Tailwind CSS)
- `/server`: שרת ה-Backend (Node.js + Express + Mongoose)

## 🛠️ הוראות התקנה

### 1. שכפול הפרויקט והתקנת תלויות
יש להריץ את הפקודות הבאות בטרמינל:

```bash
# התקנת תלויות עבור השרת
cd server
npm install

# התקנת תלויות עבור הלקוח
cd ../client
npm install
```

### 2. הגדרת משתני סביבה
יש ליצור קובץ `.env` בתיקיית ה-`server` ולהזין את הפרטים הבאים:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
GOOGLE_AI_STUDIO_KEY=your_gemini_api_key
NODE_ENV=development
```

## 🏃 פקודות הרצה

### הרצת השרת (Backend)
בתיקיית `server`:
```bash
npm run dev
```
השרת ירוץ בכתובת: `http://localhost:5000`

### הרצת הממשק (Frontend)
בתיקיית `client`:
```bash
npm run dev
```
הממשק יהיה זמין בכתובת: `http://localhost:3000`

## 🧠 תכונות מרכזיות
- **Trainee Dashboard:** מעקב אחר מדדי בריאות, משקל ודופק מנוחה.
- **Coach Dashboard:** ניתוח אחוזי התמדה ומגמות התקדמות של מתאמנים.
- **AI Fitness Assistant:** עוזר חכם המבוסס על Gemini, המספק תובנות ומוטיבציה (תוך שמירה על כללי בטיחות).
- **RTL Support:** תמיכה מלאה בעברית ובממשק מימין לשמאל.

---
פותח כחלק מ-Vitality Metric MVP.