"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { addSupportChatMessage, addSupportTicket, getSupportChatMessages, getSupportTickets, SupportChatMessage, SupportTicket } from '@/lib/community';
import { Headset, LifeBuoy, Send } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

export default function SupportPage() {
  const t = useTranslations();
  const language = useLocale();
  const isHi = language === 'hi';
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [chatMessages, setChatMessages] = useState<SupportChatMessage[]>([]);
  const [ticketForm, setTicketForm] = useState({
    name: '',
    email: '',
    category: 'Application',
    message: '',
  });
  const [chatInput, setChatInput] = useState('');

  useEffect(() => {
    setTickets(getSupportTickets());
    setChatMessages(getSupportChatMessages());
  }, []);

  const openCount = useMemo(() => tickets.filter((ticket) => ticket.status !== 'resolved').length, [tickets]);

  const submitTicket = () => {
    if (!ticketForm.name.trim() || !ticketForm.email.trim() || !ticketForm.message.trim()) return;
    addSupportTicket({
      name: ticketForm.name.trim(),
      email: ticketForm.email.trim(),
      category: ticketForm.category,
      message: ticketForm.message.trim(),
    });
    setTickets(getSupportTickets());
    setTicketForm({ name: '', email: '', category: 'Application', message: '' });
  };

  const sendChat = () => {
    if (!chatInput.trim()) return;
    addSupportChatMessage({ role: 'user', content: chatInput.trim() });
    const userText = chatInput.trim();
    setChatInput('');

    setTimeout(() => {
      const reply = userText.toLowerCase().includes('status')
        ? (isHi ? 'कृपया टिकट फॉर्म में अपना आवेदन आईडी साझा करें, हमारी टीम शीघ्र अपडेट देगी।' : 'Please share your application ID in the ticket form and our team will update you shortly.')
        : userText.toLowerCase().includes('document')
          ? (isHi ? 'दस्तावेज समस्या के लिए प्रोफाइल से डिजीलॉकर सत्यापन करें और पुनः प्रयास करें।' : 'For document issues, please use DigiLocker verification from profile and then retry application.')
          : (isHi ? 'सहायता केंद्र से संपर्क करने के लिए धन्यवाद। सहायता एजेंट जल्द संपर्क करेगा।' : 'Thanks for contacting help desk. A support agent will follow up soon.');
      addSupportChatMessage({ role: 'agent', content: reply });
      setChatMessages(getSupportChatMessages());
    }, 700);

    setChatMessages(getSupportChatMessages());
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2"><Headset className="h-7 w-7 text-emerald-600" /> {isHi ? 'हेल्प डेस्क एवं सपोर्ट चैट' : 'Help Desk & Support Chat'}</h1>
        <p className="text-gray-600 mt-1">{isHi ? 'सपोर्ट टिकट बनाएं, हेल्प डेस्क से चैट करें और खुले मुद्दे ट्रैक करें।' : 'Raise support tickets, chat with help desk, and track open issues.'}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2"><LifeBuoy className="h-5 w-5 text-indigo-600" /> {isHi ? 'हेल्प डेस्क टिकट' : 'Help Desk Ticket'}</h2>
          <Input placeholder={isHi ? 'आपका नाम' : 'Your name'} value={ticketForm.name} onChange={(e) => setTicketForm((prev) => ({ ...prev, name: e.target.value }))} />
          <Input placeholder="Email" type="email" value={ticketForm.email} onChange={(e) => setTicketForm((prev) => ({ ...prev, email: e.target.value }))} />
          <select value={ticketForm.category} onChange={(e) => setTicketForm((prev) => ({ ...prev, category: e.target.value }))} className="w-full rounded-lg border border-gray-300 px-4 py-2 bg-white">
            <option>{isHi ? 'आवेदन' : 'Application'}</option>
            <option>{isHi ? 'पात्रता' : 'Eligibility'}</option>
            <option>DigiLocker</option>
            <option>{isHi ? 'तकनीकी' : 'Technical'}</option>
          </select>
          <textarea placeholder={isHi ? 'अपनी समस्या लिखें' : 'Describe your issue'} value={ticketForm.message} onChange={(e) => setTicketForm((prev) => ({ ...prev, message: e.target.value }))} className="w-full rounded-lg border border-gray-300 px-4 py-2 min-h-28" />
          <Button variant="primary" onClick={submitTicket}>{isHi ? 'टिकट सबमिट करें' : 'Submit Ticket'}</Button>

          <div className="pt-2 border-t border-gray-100">
            <p className="text-sm text-gray-600">{isHi ? 'खुले टिकट' : 'Open Tickets'}: <span className="font-semibold text-gray-900">{openCount}</span></p>
            <div className="space-y-2 mt-2 max-h-52 overflow-y-auto">
              {tickets.length === 0 ? (
                <p className="text-sm text-gray-500">{isHi ? 'अभी तक कोई टिकट नहीं बनाया गया।' : 'No tickets raised yet.'}</p>
              ) : tickets.slice(0, 8).map((ticket) => (
                <div key={ticket.id} className="border border-gray-200 rounded-lg p-3">
                  <p className="text-sm font-semibold text-gray-900">{ticket.category} • {ticket.status}</p>
                  <p className="text-sm text-gray-700 mt-1 line-clamp-2">{ticket.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col">
          <h2 className="text-xl font-bold text-gray-900 mb-4">{isHi ? 'सपोर्ट चैट' : 'Support Chat'}</h2>
          <div className="flex-1 min-h-72 max-h-96 overflow-y-auto space-y-3 bg-gray-50 border border-gray-100 rounded-lg p-3">
            {chatMessages.length === 0 ? (
              <p className="text-sm text-gray-500">{isHi ? 'सपोर्ट चैट शुरू करें। आवेदन स्थिति, दस्तावेज़ या तकनीकी समस्या पूछें।' : 'Start a chat with support. Ask about application status, documents, or technical issues.'}</p>
            ) : chatMessages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`${msg.role === 'user' ? 'bg-emerald-600 text-white' : 'bg-white border border-gray-200 text-gray-800'} rounded-xl px-3 py-2 text-sm max-w-[85%]`}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <Input value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder={isHi ? 'अपना संदेश लिखें' : 'Type your message'} onKeyDown={(e) => e.key === 'Enter' && sendChat()} />
            <Button variant="primary" onClick={sendChat}><Send className="h-4 w-4" /></Button>
          </div>
        </div>
      </div>
    </div>
  );
}
