import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Trash2, 
  Copy, 
  Check, 
  HelpCircle, 
  GraduationCap, 
  ShieldCheck, 
  MessageSquare
} from 'lucide-react';
import { ChatMessage, AssessmentResult } from '../types';
import { SCHOOL_INFO } from '../data/schoolInfo';

interface AiCounsellorSectionProps {
  currentResult: AssessmentResult | null;
  externalPrompt?: string;
  onClearExternalPrompt?: () => void;
}

const STARTER_PROMPTS = [
  'Which stream is best for me after 10th under NEP 2020?',
  'How do I prepare for the NDA written exam after Class 12?',
  'What is the cutoff and syllabus for NEET-UG medical admissions in Punjab?',
  'Tell me about PM YASASVI and Punjab Post-Matric scholarships.',
  'What are the best government engineering colleges in Punjab besides IIT & NIT?',
  'Difference between Computer Science Engineering and Artificial Intelligence degree?'
];

export const AiCounsellorSection: React.FC<AiCounsellorSectionProps> = ({ 
  currentResult, 
  externalPrompt, 
  onClearExternalPrompt 
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: `**Sat Sri Akal & Welcome!** 🎓\n\nI am **Margdarshak AI** (ਮਾਰਗਦਰਸ਼ਕ ਏ.ਆਈ.), the Senior AI Career & Academic Counsellor at **PM SHRI GSSS Randhawa Masandan, Jalandhar**.\n\nWhether you are deciding your 11th stream, strategizing for national entrance examinations (JEE, NEET, CUET, NDA, CLAT), finding top colleges in Punjab, or applying for government scholarships, I am here to guide you with official, verified information.\n\nHow can I assist you with your academic goals today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle external prompts sent from the Assessment Results cards
  useEffect(() => {
    if (externalPrompt && externalPrompt.trim()) {
      handleSendMessage(externalPrompt);
      if (onClearExternalPrompt) onClearExternalPrompt();
    }
  }, [externalPrompt]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    if (!textToSend) setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/counsellor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          studentProfile: currentResult ? {
            topCareer: currentResult.recommendedCareers?.[0]?.title,
            summary: currentResult.studentProfileSummary
          } : undefined
        })
      });

      const data = await response.json();
      if (data.success && data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            role: 'assistant',
            content: data.reply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      } else {
        throw new Error(data.error || 'Server error');
      }
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          role: 'assistant',
          content: `Thank you for your question. As your PM SHRI School Counsellor, I encourage you to discuss this target with our guidance cell in Room 14. For CBSE/PSEB board queries, CUET-UG registrations, and state scholarship approvals, please contact the principal's office or retry in a moment.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content: `Chat history cleared. How may I guide your career path at **PM SHRI GSSS Randhawa Masandan** today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <section id="counsellor-section" className="w-full py-12 px-4 sm:px-8 bg-white border-b border-slate-200">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Institutional Masthead */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-md text-xs font-bold mb-2 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Margdarshak AI • 24/7 Official Career Advisory</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
              AI Career & Academic Counsellor Desk
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Ask anything about stream selection, exams (JEE, NEET, NDA, CUET), colleges in Punjab & India, or scholarships.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 font-medium flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Mentorship Online
            </span>
            <button
              type="button"
              onClick={handleClearChat}
              className="text-xs font-semibold text-slate-600 hover:text-red-700 px-3 py-1.5 rounded border border-slate-200 hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Session</span>
            </button>
          </div>
        </div>

        {/* Quick Question Starters Carousel / Grid */}
        <div className="mb-4 bg-slate-50 border border-slate-200 rounded-lg p-3">
          <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-blue-700" />
            <span>Common Queries for PM SHRI Students:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {STARTER_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(prompt)}
                className="text-xs bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-900 border border-slate-200 hover:border-blue-300 px-3 py-1.5 rounded-md transition-all text-left cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Full-Width Website Chatbox Container */}
        <div className="bg-slate-50 border border-slate-300 rounded-xl overflow-hidden shadow-xs flex flex-col h-[560px]">
          
          {/* Internal Top Banner */}
          <div className="bg-[#0f2342] text-white px-5 py-3 flex items-center justify-between border-b border-blue-900">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-800 text-amber-300 flex items-center justify-center font-bold">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold tracking-wide">
                  Margdarshak AI — Senior Guidance Officer
                </h4>
                <p className="text-[10px] text-blue-200">
                  PM SHRI GSSS Randhawa Masandan • Aligned with NEP 2020
                </p>
              </div>
            </div>
            <div className="text-[11px] font-mono text-blue-200 hidden sm:block">
              School Code: {SCHOOL_INFO.udiseCode}
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-100/60">
            {messages.map((message) => {
              const isAssistant = message.role === 'assistant';
              return (
                <div
                  key={message.id}
                  className={`flex gap-3 max-w-4xl ${
                    isAssistant ? 'mr-auto' : 'ml-auto flex-row-reverse'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                      isAssistant
                        ? 'bg-blue-900 text-amber-300 shadow-2xs'
                        : 'bg-slate-800 text-white'
                    }`}
                  >
                    {isAssistant ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>

                  <div className={`space-y-1 ${isAssistant ? 'text-left' : 'text-right'}`}>
                    <div
                      className={`inline-block p-4 rounded-xl text-xs sm:text-sm leading-relaxed text-left shadow-2xs ${
                        isAssistant
                          ? 'bg-white text-slate-800 border border-slate-200/90 whitespace-pre-wrap'
                          : 'bg-blue-800 text-white font-medium'
                      }`}
                    >
                      {message.content}
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-slate-400 px-1">
                      <span>{message.timestamp}</span>
                      {isAssistant && (
                        <button
                          type="button"
                          onClick={() => handleCopy(message.id, message.content)}
                          className="hover:text-blue-700 transition-colors flex items-center gap-1 cursor-pointer"
                          title="Copy response"
                        >
                          {copiedId === message.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span className="text-emerald-600">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-3 text-slate-500 text-xs py-2">
                <div className="w-8 h-8 rounded-full bg-blue-900 text-amber-300 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 animate-spin" />
                </div>
                <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 flex items-center gap-2 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
                  <span className="font-medium text-slate-600">
                    Margdarshak AI is formulating career guidance...
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about streams, entrance exams, Punjab colleges, or scholarships..."
                className="flex-1 bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="px-5 py-3 bg-blue-700 hover:bg-blue-800 disabled:bg-slate-300 text-white font-bold text-xs sm:text-sm rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Send</span>
              </button>
            </form>
            <div className="mt-2 text-[10px] text-slate-400 flex items-center justify-between px-1">
              <span>Official AI advisory service for students of PM SHRI GSSS Randhawa Masandan.</span>
              <span className="font-mono">Privacy Protected</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
