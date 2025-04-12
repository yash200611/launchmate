import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  addProject: (project: Omit<Project, 'id' | 'dateCreated' | 'lastEdited' | 'favorite' | 'collaborators'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  toggleFavorite: (id: string) => void;
  toggleVisibility: (id: string) => void;
}

export const useProjectStore = create<ProjectState>()(
  persist(
    (set) => ({
      projects: [],
      addProject: (projectData) => {
        const newProject = {
          ...projectData,
          id: Math.random().toString(36).substring(2),
          dateCreated: new Date().toISOString(),
          lastEdited: new Date().toISOString(),
          favorite: false,
          collaborators: [],
        };
        set((state) => ({
          projects: [newProject, ...state.projects],
        }));
      },
      updateProject: (id, projectData) => set((state) => ({
        projects: state.projects.map((project) =>
          project.id === id
            ? { ...project, ...projectData, lastEdited: new Date().toISOString() }
            : project
        ),
      })),
      deleteProject: (id) => set((state) => ({
        projects: state.projects.filter((project) => project.id !== id),
      })),
      toggleFavorite: (id) => set((state) => ({
        projects: state.projects.map((project) =>
          project.id === id
            ? { ...project, favorite: !project.favorite }
            : project
        ),
      })),
      toggleVisibility: (id) => set((state) => ({
        projects: state.projects.map((project) =>
          project.id === id
            ? { 
                ...project, 
                visibility: project.visibility === 'public' ? 'private' : 'public',
                lastEdited: new Date().toISOString()
              }
            : project
        ),
      })),
    }),
    {
      name: 'project-storage',
    }
  )
);