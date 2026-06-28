import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Schemas
const traineeSchema = new mongoose.Schema({
  trainee_id: String,
  name: String,
  fitness_goals: [String],
  account_status: String,
  registration_date: Date,
  metrics: {
    target_weight: Number,
    current_height: Number
  }
});

const workoutSchema = new mongoose.Schema({
  trainee_id: String,
  timestamp: { type: Date, default: Date.now },
  workout_type: { type: String, enum: ['כוח', 'אירובי', 'גמישות', 'יוגה', 'HIIT'] },
  sets_reps: [{
    exercise: String,
    sets: Number,
    reps: Number,
    weight: Number
  }],
  intensity_rating: Number,
  duration: Number,
  notes: String
});

const progressLogSchema = new mongoose.Schema({
  trainee_id: String,
  date: { type: Date, default: Date.now },
  metric_type: { type: String, enum: ['משקל', 'אחוז שומן', 'דופק מנוחה', 'BMI'] },
  value: Number,
  unit: String
});

const Trainee = mongoose.model('Trainee', traineeSchema);
const Workout = mongoose.model('Workout', workoutSchema);
const ProgressLog = mongoose.model('ProgressLog', progressLogSchema);

// AI Integration
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_STUDIO_KEY);

app.post('/api/ai/chat', async (req, res) => {
  const { message, traineeId, context } = req.body;
  
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const systemPrompt = `
      אתה עוזר כושר AI. המטרה שלך היא לתמוך במתאמנים בתהליך הכושר שלהם.
      דיסקליימר חובה: "אינך תזונאי מוסמך או איש מקצוע רפואי. תמיד יש להתייעץ עם איש מקצוע מורשה לייעוץ תזונתי או רפואי מיוחד."
      שמור על טון מעודד, מקצועי ומבוסס נתונים.
      אל תספק תוכניות תזונה אישיות או אבחנות רפואיות.
      כל התגובות חייבות להיות בעברית ובתמיכת RTL.
      השתמש בהקשר הבא על המתאמן: ${JSON.stringify(context)}
    `;

    const result = await model.generateContent([systemPrompt, message]);
    const response = await result.response;
    res.json({ text: response.text() });
  } catch (error) {
    res.status(500).json({ error: "שגיאה בתקשורת עם ה-AI" });
  }
});

// Coach Aggregation Logic
app.get('/api/coach/stats/:traineeId', async (req, res) => {
  const { traineeId } = req.params;
  
  try {
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);

    const workouts = await Workout.countDocuments({
      trainee_id: traineeId,
      timestamp: { $gte: last30Days }
    });

    const attendanceRate = Math.min(100, (workouts / 12) * 100); // Base on 12 planned workouts
    
    const weightTrend = await ProgressLog.aggregate([
      { $match: { trainee_id: traineeId, metric_type: "משקל" } },
      { $sort: { date: 1 } },
      { $group: { _id: "$trainee_id", initial: { $first: "$value" }, latest: { $last: "$value" } } }
    ]);

    res.json({ attendanceRate, weightTrend: weightTrend[0] });
  } catch (error) {
    res.status(500).json({ error: "שגיאה בעיבוד הנתונים" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
