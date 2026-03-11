import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';
import ChatBubble from '../components/ChatBubble';
import { chatExamples, fallbackResponse } from '../data/chatScripts';
import Toast from '../components/Toast';

export default function AIChat() {
  const [messages, setMessages] = useState(chatExamples[0].messages.map(m => ({ ...m, typed: true })));
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [typingIdx, setTypingIdx] = useState(null);
  const [toast, setToast] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isThinking]);

  const loadExample = (example) => {
    setMessages([]);
    setTypingIdx(null);
    setTimeout(() => {
      const msgs = example.messages.map((m, i) => ({ ...m, typed: false, key: Date.now() + i }));
      setMessages(msgs);
      setTypingIdx(0);
    }, 100);
  };

  const handleTypingDone = (idx) => {
    if (idx < messages.length - 1) {
      setTypingIdx(idx + 1);
    } else {
      setTypingIdx(null);
    }
  };

  const handleSend = () => {
    if (!input.trim() || isThinking) return;
    const userMsg = { role: 'user', text: input.trim(), typed: true, key: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsThinking(true);
    setTimeout(() => {
      setIsThinking(false);
      const aiMsg = { role: 'ai', text: fallbackResponse, typed: false, key: Date.now() + 1 };
      setMessages(prev => [...prev, aiMsg]);
      setTypingIdx(null);
      // Let last message type
      setTimeout(() => setTypingIdx(prev => null), 50);
    }, 2000);
  };

  const handleAction = (msg) => {
    setToast(msg.actionResponse);
  };

  return (
    <div className="animate-fade-in flex flex-col h-[calc(100vh-7rem)]">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900">AI Facility Assistant</h1>
        <p className="text-sm text-gray-500">Ask about buildings, equipment, energy, or get recommendations</p>
      </div>

      {/* Example chips */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {chatExamples.map(ex => (
          <button key={ex.id} onClick={() => loadExample(ex)} className="flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 text-accent text-xs font-medium rounded-full hover:bg-accent/20 transition-colors">
            <Sparkles size={12} /> {ex.label}
          </button>
        ))}
      </div>

      {/* Chat area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto bg-gray-50 rounded-xl border border-gray-200 p-4 space-y-4 mb-4">
        {messages.map((msg, i) => (
          <div key={msg.key || i}>
            <ChatBubble
              message={msg}
              isTyping={typingIdx === i && !msg.typed}
              onTypingDone={() => handleTypingDone(i)}
            />
            {msg.showAction && msg.typed && (
              <div className="ml-11 mt-2">
                <button onClick={() => handleAction(msg)} className="px-4 py-2 bg-ok text-white text-xs font-medium rounded-lg hover:bg-emerald-700 transition-colors">
                  {msg.actionLabel}
                </button>
              </div>
            )}
          </div>
        ))}
        {isThinking && (
          <div className="flex gap-3 animate-fade-in">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0">AI</div>
            <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3">
              <p className="text-[10px] font-semibold text-accent mb-1">FacilityAI Agent</p>
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Ask about your buildings, equipment, or energy..."
          className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
        />
        <button onClick={handleSend} disabled={!input.trim() || isThinking} className="px-4 py-3 bg-accent text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
          <Send size={18} />
        </button>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
