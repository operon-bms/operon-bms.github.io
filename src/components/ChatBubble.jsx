import { useState, useEffect, useRef } from 'react';

export default function ChatBubble({ message, isTyping = false, onTypingDone }) {
  const [displayText, setDisplayText] = useState(isTyping ? '' : message.text);
  const [isDone, setIsDone] = useState(!isTyping);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!isTyping) return;
    setDisplayText('');
    indexRef.current = 0;
    setIsDone(false);

    const interval = setInterval(() => {
      indexRef.current += 1;
      if (indexRef.current >= message.text.length) {
        setDisplayText(message.text);
        setIsDone(true);
        clearInterval(interval);
        onTypingDone?.();
        return;
      }
      setDisplayText(message.text.slice(0, indexRef.current));
    }, message.role === 'user' ? 25 : 12);

    return () => clearInterval(interval);
  }, [message.text, isTyping]);

  const isAI = message.role === 'ai';

  return (
    <div className={`flex gap-3 ${isAI ? '' : 'flex-row-reverse'} animate-fade-in`}>
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
        isAI ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
      }`}>
        {isAI ? 'AI' : 'FM'}
      </div>
      {/* Bubble */}
      <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
        isAI 
          ? 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm' 
          : 'bg-accent text-white rounded-tr-sm'
      }`}>
        {isAI && (
          <p className="text-[10px] font-semibold text-accent mb-1">Operon Agent</p>
        )}
        <div className={`text-sm leading-relaxed whitespace-pre-wrap ${!isDone ? 'typewriter-cursor' : ''}`}>
          {renderFormattedText(displayText)}
        </div>
      </div>
    </div>
  );
}

function renderFormattedText(text) {
  // Simple bold rendering: **text** -> <strong>text</strong>
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}
