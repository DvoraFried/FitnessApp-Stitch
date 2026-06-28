import React, { useState } from 'react';

const AIChat = () => {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'שלום ישראל! אני כאן כדי לעזור לך להגיע ליעדי הכושר שלך היום.' }
  ]);
  const [input, setInput] = useState('');
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    try {
      const response = await fetch(`${API_URL}/api/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, traineeId: 'T001' })
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'ai', text: data.text }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: 'מצטער, חלה שגיאה בחיבור לשרת.' }]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50" dir="rtl">
      <header className="p-4 bg-white border-b flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-slate-200" />
        <div>
          <h1 className="font-bold">עוזר כושר AI</h1>
          <p className="text-xs text-green-500">מחובר • מוכן לעזור</p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl ${
              m.role === 'user' ? 'bg-teal-700 text-white' : 'bg-white shadow-sm'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-white border-t">
        <div className="flex gap-2">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-3 bg-slate-100 rounded-full outline-none"
            placeholder="כתוב הודעה כאן..."
          />
          <button onClick={sendMessage} className="p-3 bg-black text-white rounded-full">
            ➔
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
