import React, { useState, useEffect } from 'react';
import { Card, Button, Input, Chart } from './components'; // Mock components

const TraineeDashboard = () => {
  const [data, setData] = useState(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/api/trainee/T001`)
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <div className="p-8 text-center">טוען נתונים...</div>;

  return (
    <div className="min-h-screen bg-surface p-4" dir="rtl">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">לוח בקרה אישי</h1>
        <div className="w-10 h-10 rounded-full bg-slate-200" />
      </header>
      
      <Card className="p-6 mb-4 bg-black text-white rounded-2xl">
        <h2 className="text-xl mb-2">מוכן לאימון היום?</h2>
        <Button className="w-full bg-white text-black py-3 rounded-xl font-bold">התחל אימון</Button>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4">
          <p className="text-sm text-slate-500">משקל נוכחי</p>
          <p className="text-2xl font-bold">{data.weight} ק"ג</p>
          <p className="text-xs text-green-500">0.5- ק"ג מהשבוע שעבר</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-500">דופק ממוצע</p>
          <p className="text-2xl font-bold">{data.bpm} BPM</p>
          <p className="text-xs text-blue-500">יציב</p>
        </Card>
      </div>
      
      <section className="mt-8">
        <h3 className="text-lg font-bold mb-4">פעילות אחרונה</h3>
        {data.recentWorkouts.map(workout => (
          <div key={workout.id} className="flex items-center justify-between p-4 bg-white rounded-xl mb-2 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">🏋️</div>
              <div>
                <p className="font-bold">{workout.type}</p>
                <p className="text-xs text-slate-400">{workout.date}</p>
              </div>
            </div>
            <p className="font-bold">{workout.duration} דק'</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default TraineeDashboard;
