# מדריך פריסה לענן (Deployment Guide) - Vitality Metric MVP

מדריך זה מפרט את הצעדים הנדרשים לפריסת המערכת בסביבת ייצור (Production) תוך שימוש בשירותי ענן חינמיים ומובילים.

---

## 1. הקמת מסד הנתונים: MongoDB Atlas

MongoDB Atlas הוא שירות ענן מנוהל למסד הנתונים שלנו.

### שלבי הקמה:
1.  **הרשמה:** היכנסו ל-[MongoDB Atlas](https://www.mongodb.com/cloud/atlas) וצרו חשבון חינמי.
2.  **יצירת קלאסטר (Cluster):**
    *   בחרו במסלול ה-**M0 (FREE)**.
    *   בחרו ספק ענן (כמו AWS או Google Cloud) ואזור קרוב (למשל Frankfurt - eu-central-1).
3.  **אבטחה (Database Access):**
    *   צרו משתמש למסד הנתונים (Database User) עם שם משתמש וסיסמה חזקה. שמרו אותם בצד.
4.  **גישה מהרשת (Network Access):**
    *   הוסיפו את הכתובת `0.0.0.0/0` כדי לאפשר גישה מכל מקום (נדרש עבור שירותי פריסה כמו Render), או הגבילו לכתובות ה-IP של שרת ה-Backend שלכם.
5.  **הפקת Connection String:**
    *   לחצו על כפתור ה-**Connect** בקלאסטר שיצרתם.
    *   בחרו ב-**Drivers** תחת "Connect to your application".
    *   העתיקו את מחרוזת החיבור. היא תיראה כך:
        `mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/?retryWrites=true&w=majority`
    *   החליפו את ה-`<password>` בסיסמה שיצרתם בסעיף 3.

---

## 2. פריסת ה-Backend: Render

Render היא פלטפורמה מצוינת להרצת שרתי Node.js בצורה פשוטה ומאובטחת.

### שלבי פריסה:
1.  **חיבור ל-GitHub:** העלו את קוד הפרויקט ל-GitHub וחברו את חשבון ה-GitHub שלכם ל-Render.
2.  **יצירת Web Service:**
    *   בחרו ב-**New +** > **Web Service**.
    *   בחרו את ה-Repository של הפרויקט.
    *   הגדירו את ה-Root Directory ל-`server`.
    *   **Build Command:** `npm install`
    *   **Start Command:** `npm start`
3.  **הגדרת משתני סביבה (Environment Variables):**
    *   עברו ללשונית **Environment** ב-Render והוסיפו את המשתנים הבאים:
        *   `PORT`: `5000` (או הערך שבו השרת משתמש).
        *   `MONGODB_URI`: מחרוזת החיבור שהעתקתם מ-Atlas.
        *   `GOOGLE_AI_STUDIO_KEY`: מפתח ה-API שלכם מ-Gemini.
        *   `NODE_ENV`: `production`

---

## 3. פריסת ה-Frontend: Vercel

Vercel היא הפלטפורמה הטבעית והאופטימלית ביותר עבור אפליקציות Next.js.

### שלבי פריסה:
1.  **יצירת פרויקט חדש:** היכנסו ל-Vercel וחברו את חשבון ה-GitHub.
2.  **ייבוא הפרויקט:**
    *   בחרו את ה-Repository שלכם.
    *   הגדירו את ה-Root Directory ל-`client`.
    *   Vercel תזהה אוטומטית שמדובר ב-Next.js ותגדיר את פקודות ה-Build וה-Output.
3.  **הגדרת משתני סביבה:**
    *   תחת **Environment Variables**, הגדירו את כתובת ה-API של השרת שפרסתם ב-Render:
        *   `NEXT_PUBLIC_API_URL`: הכתובת שקיבלתם מ-Render (למשל: `https://vitality-api.onrender.com`).
4.  **Deploy:** לחצו על פריסה. בסיום התהליך תקבלו כתובת URL ציבורית לממשק המשתמש.

---

## 🔐 דגשים חשובים לאבטחה
*   **לעולם אל תעלו קובץ `.env` ל-GitHub.** ודאו שהוא מופיע ב-`.gitignore`.
*   השתמשו תמיד ב-HTTPS (מסופק אוטומטית על ידי Render ו-Vercel).
*   הגבילו את הרשאות מפתח ה-AI ב-Google Cloud Console במידת האפשר.

---
**הפרויקט שלך מוכן כעת לשימוש בעולם האמיתי!**
