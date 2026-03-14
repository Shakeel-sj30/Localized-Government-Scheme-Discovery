export interface SchemeReview {
  id: string;
  schemeId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface ForumPost {
  id: string;
  schemeId: string;
  userName: string;
  message: string;
  createdAt: string;
}

export interface ExpertQuestion {
  id: string;
  schemeId: string;
  userName: string;
  question: string;
  answer?: string;
  answeredBy?: string;
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  name: string;
  email: string;
  category: string;
  message: string;
  status: 'open' | 'in-progress' | 'resolved';
  createdAt: string;
}

export interface SupportChatMessage {
  id: string;
  role: 'user' | 'agent';
  content: string;
  createdAt: string;
}

function readArray<T>(key: string): T[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(key);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeArray<T>(key: string, value: T[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(value));
}

export function getReviewsByScheme(schemeId: string) {
  return readArray<SchemeReview>('community_reviews').filter((review) => review.schemeId === schemeId);
}

export function addReview(payload: Omit<SchemeReview, 'id' | 'createdAt'>) {
  const existing = readArray<SchemeReview>('community_reviews');
  const next: SchemeReview = {
    ...payload,
    id: `rev-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  writeArray('community_reviews', [next, ...existing]);
  return next;
}

export function getForumPostsByScheme(schemeId: string) {
  return readArray<ForumPost>('community_forum').filter((post) => post.schemeId === schemeId);
}

export function addForumPost(payload: Omit<ForumPost, 'id' | 'createdAt'>) {
  const existing = readArray<ForumPost>('community_forum');
  const next: ForumPost = {
    ...payload,
    id: `post-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  writeArray('community_forum', [next, ...existing]);
  return next;
}

export function getExpertQuestionsByScheme(schemeId: string) {
  return readArray<ExpertQuestion>('community_expert_qa').filter((item) => item.schemeId === schemeId);
}

export function addExpertQuestion(payload: Omit<ExpertQuestion, 'id' | 'createdAt' | 'answer' | 'answeredBy'>) {
  const existing = readArray<ExpertQuestion>('community_expert_qa');
  const next: ExpertQuestion = {
    ...payload,
    id: `qa-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  writeArray('community_expert_qa', [next, ...existing]);
  return next;
}

export function seedExpertAnswerForQuestion(questionId: string, schemeCategory: string) {
  const existing = readArray<ExpertQuestion>('community_expert_qa');
  const updated = existing.map((q) => {
    if (q.id !== questionId || q.answer) return q;

    return {
      ...q,
      answer:
        schemeCategory === 'farmer'
          ? 'Please keep land records, Aadhaar, and latest bank passbook ready. Farmer category applications are usually validated with land ownership data.'
          : schemeCategory === 'student'
            ? 'Keep your latest marksheet, income certificate, and Aadhaar ready. Scholarship eligibility is verified from academic records.'
            : 'Please verify profile details and required documents before applying. If eligibility is broad, state-level criteria may still apply.',
      answeredBy: 'Government Scheme Expert',
    };
  });
  writeArray('community_expert_qa', updated);
  return updated.find((q) => q.id === questionId);
}

export function getSupportTickets() {
  return readArray<SupportTicket>('community_support_tickets');
}

export function addSupportTicket(payload: Omit<SupportTicket, 'id' | 'status' | 'createdAt'>) {
  const existing = readArray<SupportTicket>('community_support_tickets');
  const next: SupportTicket = {
    ...payload,
    id: `tkt-${Date.now()}`,
    status: 'open',
    createdAt: new Date().toISOString(),
  };
  writeArray('community_support_tickets', [next, ...existing]);
  return next;
}

export function getSupportChatMessages() {
  return readArray<SupportChatMessage>('community_support_chat');
}

export function addSupportChatMessage(payload: Omit<SupportChatMessage, 'id' | 'createdAt'>) {
  const existing = readArray<SupportChatMessage>('community_support_chat');
  const next: SupportChatMessage = {
    ...payload,
    id: `chat-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    createdAt: new Date().toISOString(),
  };
  writeArray('community_support_chat', [...existing, next]);
  return next;
}
