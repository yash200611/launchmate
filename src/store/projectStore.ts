import { create } from 'zustand';
import { useAuthStore } from './authStore';

export interface Project {
  id: string;
  title: string;
  description: string;
  visibility: 'public' | 'private';
  lastEdited: string;
  dateCreated: string;
  collaborators: string[];
  stage: 'idea' | 'mvp' | 'fundraising' | 'launched';
  favorite: boolean;
  tags: string[];
  problem: string;
  targetAudience: string;
}

interface ProjectState {
  projects: Project[];
  loading: boolean;
  loadProjects: () => Promise<void>;
  addProject: (project: Project) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  toggleFavorite: (id: string) => void;
  toggleVisibility: (id: string) => void;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  loading: false,

  loadProjects: async () => {
    const { user } = useAuthStore.getState();
    if (!user?.email) return;
  
    set({ loading: true }); // ✅ Start loading
  
    try {
      const res = await fetch(`/api/projects?ownerEmail=${user.email}`);
      if (!res.ok) {
        const text = await res.text();
        console.error("Failed to load projects:", text);
        return;
      }
      const data = await res.json();
      set({ projects: data });
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      set({ loading: false }); // ✅ End loading
    }
  },
  

  addProject: (project: Project) => {
    set((state) => ({
      projects: [project, ...state.projects],
    }));
  },

  updateProject: (id, projectData) =>
    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === id
          ? { ...project, ...projectData, lastEdited: new Date().toISOString() }
          : project
      ),
    })),

  deleteProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((project) => project.id !== id),
    })),

  toggleFavorite: (id) =>
    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === id
          ? { ...project, favorite: !project.favorite }
          : project
      ),
    })),

  toggleVisibility: (id) =>
    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === id
          ? {
              ...project,
              visibility: project.visibility === 'public' ? 'private' : 'public',
              lastEdited: new Date().toISOString(),
            }
          : project
      ),
    })),
}));
