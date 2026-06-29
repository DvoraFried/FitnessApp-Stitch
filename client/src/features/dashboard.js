import React, { useState, useEffect } from 'react';

const TraineeDashboard = () => {
  const [data, setData] = useState(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/api/trainee/T001`)
      .then(res => res.json())
      .then(setData);
  }, [API_URL]);

 if (!data) return <div className="p-8 text-center">טוען נתונים...</div>;

  if (data.error) {
    return (
      <div className="p-8 text-center text-red-500 font-bold" dir="rtl">
        ⚠️ שגיאה בטעינת הנתונים מהשרת: {data.error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4" dir="rtl">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">לוח בקרה אישי</h1>
        <div className="w-10 h-10 rounded-full bg-slate-200" />
      </header>
      
      {/* כרטיס ראשי - הומר ל-div סטנדרטי */}
      <div className="p-6 mb-4 bg-black text-white rounded-2xl shadow-md">
        <h2 className="text-xl mb-2">מוכן לאימון היום?</h2>
        <button className="w-full bg-white text-black py-3 rounded-xl font-bold hover:bg-slate-100 transition-colors">
          התחל אימון
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* כרטיסי מדדים - הומרו ל-div עם רקע לבן וצל */}
        <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
          <p className="text-sm text-slate-500">משקל נוכחי</p>
          <p className="text-2xl font-bold">{data.weight} ק"ג</p>
          <p className="text-xs text-green-500">0.5- ק"ג מהשבוע שעבר</p>
        </div>
        
        <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
          <p className="text-sm text-slate-500">דופק ממוצע</p>
          <p className="text-2xl font-bold">{data.bpm} BPM</p>
          <p className="text-xs text-blue-500">יציב</p>
        </div>
      </div>
      
      <section className="mt-8">
        <h3 className="text-lg font-bold mb-4">פעילות אחרונה</h3>
        {data.recentWorkouts?.map(workout => (
          <div key={workout.id} className="flex items-center justify-between p-4 bg-white rounded-xl mb-2 shadow-sm border border-slate-100">
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