const STORAGE_KEY = 'portify_messages_v1';

function safeParse(json, fallback) {
  try {
    const parsed = JSON.parse(json);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

export function getAllThreads() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return safeParse(raw, []);
}

export function getThreadsForUser(userId) {
  const threads = getAllThreads();
  return threads.filter(t => t.participants.includes(userId));
}

export function createOrGetThread(user1, user2) {
  const threads = getAllThreads();
  const existing = threads.find(t => 
    t.participants.includes(user1.id) && t.participants.includes(user2.id)
  );

  if (existing) return existing;

  const newThread = {
    id: Date.now().toString(),
    participants: [user1.id, user2.id],
    participantDetails: {
      [user1.id]: { name: user1.name || user1.companyName, avatar: user1.profilePicture || user1.logo },
      [user2.id]: { name: user2.name || user2.companyName, avatar: user2.profilePicture || user2.logo }
    },
    messages: [],
    updatedAt: Date.now()
  };

  threads.push(newThread);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(threads));
  return newThread;
}

export function sendMessage(threadId, senderId, text) {
  const threads = getAllThreads();
  const threadIndex = threads.findIndex(t => t.id === threadId);
  
  if (threadIndex === -1) return null;

  const msg = {
    id: Date.now().toString(),
    senderId,
    text,
    createdAt: Date.now()
  };

  threads[threadIndex].messages.push(msg);
  threads[threadIndex].updatedAt = Date.now();
  
  // Bring to top
  const [thread] = threads.splice(threadIndex, 1);
  threads.unshift(thread);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(threads));
  return msg;
}
