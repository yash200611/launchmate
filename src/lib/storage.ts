interface Profile {
  id: string;
  fullName: string;
  role: string;
  experienceYears: number;
  linkedinUrl: string;
}

interface Idea {
  id: string;
  title: string;
  industry: string;
  problem: string;
  progress: number;
  userId: string;
  lastEdited: string;
  isPublic: boolean;
}

interface Startup {
  id: string;
  name: string;
  description: string;
  stage: string;
  ideaId: string;
  userId: string;
}

// Generate a random ID for new records
const generateId = () => Math.random().toString(36).substr(2, 9);

// Helper to get data from localStorage with type safety
const getStorageItem = <T>(key: string, defaultValue: T): T => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : defaultValue;
};

// Storage keys
const KEYS = {
  PROFILE: 'launchmate_profile',
  IDEAS: 'launchmate_ideas',
  STARTUPS: 'launchmate_startups',
  USER_ID: 'launchmate_user_id'
};

// Initialize or get existing user ID
const getUserId = (): string => {
  let userId = localStorage.getItem(KEYS.USER_ID);
  if (!userId) {
    userId = generateId();
    localStorage.setItem(KEYS.USER_ID, userId);
  }
  return userId;
};

export const storage = {
  // Profile methods
  getProfile: (): Profile | null => {
    return getStorageItem<Profile | null>(KEYS.PROFILE, null);
  },

  saveProfile: (profile: Omit<Profile, 'id'>): Profile => {
    const newProfile = { ...profile, id: getUserId() };
    localStorage.setItem(KEYS.PROFILE, JSON.stringify(newProfile));
    return newProfile;
  },

  // Ideas methods
  getIdeas: (): Idea[] => {
    return getStorageItem<Idea[]>(KEYS.IDEAS, []);
  },

  saveIdea: (idea: Omit<Idea, 'id' | 'userId' | 'lastEdited' | 'isPublic'>): Idea => {
    const ideas = storage.getIdeas();
    const newIdea = {
      ...idea,
      id: generateId(),
      userId: getUserId(),
      lastEdited: new Date().toISOString().split('T')[0],
      isPublic: false
    };
    
    localStorage.setItem(KEYS.IDEAS, JSON.stringify([...ideas, newIdea]));
    return newIdea;
  },

  updateIdea: (id: string, updates: Partial<Idea>): Idea | null => {
    const ideas = storage.getIdeas();
    const index = ideas.findIndex(idea => idea.id === id);
    
    if (index === -1) return null;
    
    const updatedIdea = {
      ...ideas[index],
      ...updates,
      lastEdited: new Date().toISOString().split('T')[0]
    };
    
    ideas[index] = updatedIdea;
    localStorage.setItem(KEYS.IDEAS, JSON.stringify(ideas));
    return updatedIdea;
  },

  deleteIdea: (id: string): boolean => {
    const ideas = storage.getIdeas();
    const filteredIdeas = ideas.filter(idea => idea.id !== id);
    
    if (filteredIdeas.length === ideas.length) {
      return false;
    }
    
    localStorage.setItem(KEYS.IDEAS, JSON.stringify(filteredIdeas));
    return true;
  },

  toggleIdeaVisibility: (id: string): Idea | null => {
    const ideas = storage.getIdeas();
    const index = ideas.findIndex(idea => idea.id === id);
    
    if (index === -1) return null;
    
    const updatedIdea = {
      ...ideas[index],
      isPublic: !ideas[index].isPublic,
      lastEdited: new Date().toISOString().split('T')[0]
    };
    
    ideas[index] = updatedIdea;
    localStorage.setItem(KEYS.IDEAS, JSON.stringify(ideas));
    return updatedIdea;
  },

  // Startups methods
  getStartups: (): Startup[] => {
    return getStorageItem<Startup[]>(KEYS.STARTUPS, []);
  },

  saveStartup: (startup: Omit<Startup, 'id' | 'userId'>): Startup => {
    const startups = storage.getStartups();
    const newStartup = {
      ...startup,
      id: generateId(),
      userId: getUserId()
    };
    
    localStorage.setItem(KEYS.STARTUPS, JSON.stringify([...startups, newStartup]));
    return newStartup;
  },

  // Auth simulation
  isAuthenticated: (): boolean => {
    return !!storage.getProfile();
  },

  logout: () => {
    localStorage.removeItem(KEYS.PROFILE);
  }
};