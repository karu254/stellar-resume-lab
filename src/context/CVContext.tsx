import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { CVData, defaultCVData, CVSection, CVStyles } from '@/types/cv';

type CVAction =
  | { type: 'SET_CV_DATA'; payload: CVData }
  | { type: 'UPDATE_PERSONAL_INFO'; payload: Partial<CVData['personalInfo']> }
  | { type: 'UPDATE_SUMMARY'; payload: string }
  | { type: 'UPDATE_SKILLS'; payload: CVData['skills'] }
  | { type: 'UPDATE_EXPERIENCE'; payload: CVData['experience'] }
  | { type: 'UPDATE_EDUCATION'; payload: CVData['education'] }
  | { type: 'UPDATE_PROJECTS'; payload: CVData['projects'] }
  | { type: 'UPDATE_CERTIFICATIONS'; payload: CVData['certifications'] }
  | { type: 'UPDATE_LANGUAGES'; payload: CVData['languages'] }
  | { type: 'UPDATE_ACHIEVEMENTS'; payload: CVData['achievements'] }
  | { type: 'UPDATE_VOLUNTEERING'; payload: CVData['volunteering'] }
  | { type: 'UPDATE_PUBLICATIONS'; payload: CVData['publications'] }
  | { type: 'UPDATE_REFERENCES'; payload: CVData['references'] }
  | { type: 'UPDATE_CUSTOM_SECTIONS'; payload: CVData['customSections'] }
  | { type: 'UPDATE_SECTIONS'; payload: CVSection[] }
  | { type: 'UPDATE_STYLES'; payload: Partial<CVStyles> }
  | { type: 'TOGGLE_SECTION'; payload: string }
  | { type: 'REORDER_SECTIONS'; payload: CVSection[] };

function cvReducer(state: CVData, action: CVAction): CVData {
  switch (action.type) {
    case 'SET_CV_DATA':
      return action.payload;
    case 'UPDATE_PERSONAL_INFO':
      return { ...state, personalInfo: { ...state.personalInfo, ...action.payload } };
    case 'UPDATE_SUMMARY':
      return { ...state, summary: { content: action.payload } };
    case 'UPDATE_SKILLS':
      return { ...state, skills: action.payload };
    case 'UPDATE_EXPERIENCE':
      return { ...state, experience: action.payload };
    case 'UPDATE_EDUCATION':
      return { ...state, education: action.payload };
    case 'UPDATE_PROJECTS':
      return { ...state, projects: action.payload };
    case 'UPDATE_CERTIFICATIONS':
      return { ...state, certifications: action.payload };
    case 'UPDATE_LANGUAGES':
      return { ...state, languages: action.payload };
    case 'UPDATE_ACHIEVEMENTS':
      return { ...state, achievements: action.payload };
    case 'UPDATE_VOLUNTEERING':
      return { ...state, volunteering: action.payload };
    case 'UPDATE_PUBLICATIONS':
      return { ...state, publications: action.payload };
    case 'UPDATE_REFERENCES':
      return { ...state, references: action.payload };
    case 'UPDATE_CUSTOM_SECTIONS':
      return { ...state, customSections: action.payload };
    case 'UPDATE_SECTIONS':
      return { ...state, sections: action.payload };
    case 'UPDATE_STYLES':
      return { ...state, styles: { ...state.styles, ...action.payload } };
    case 'TOGGLE_SECTION':
      return {
        ...state,
        sections: state.sections.map((section) =>
          section.id === action.payload ? { ...section, enabled: !section.enabled } : section
        ),
      };
    case 'REORDER_SECTIONS':
      return { ...state, sections: action.payload };
    default:
      return state;
  }
}

interface CVContextType {
  cvData: CVData;
  dispatch: React.Dispatch<CVAction>;
}

const CVContext = createContext<CVContextType | undefined>(undefined);

const STORAGE_KEY = 'cv-builder-data';

export function CVProvider({ children }: { children: ReactNode }) {
  const [cvData, dispatch] = useReducer(cvReducer, defaultCVData, (initial) => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return initial;
        }
      }
    }
    return initial;
  });

  // Autosave to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cvData));
  }, [cvData]);

  return <CVContext.Provider value={{ cvData, dispatch }}>{children}</CVContext.Provider>;
}

export function useCV() {
  const context = useContext(CVContext);
  if (!context) {
    throw new Error('useCV must be used within a CVProvider');
  }
  return context;
}
