import React, { createContext, useReducer, ReactNode } from "react";
import { Project } from "../types/Project.types";

type ProjectState = {
  projects: Project[]
};

type ProjectAction =
  | { type: "SET_PROJECTS"; payload: Project[] }
  | { type: "UPDATE_PROJECT"; payload: { id: string; data: {
    description: string;
    startDate: Date | string;
    endDate: Date | string;
    projectManager: string;
    name: string;
  } } };

// Define the context type
export type ProjectContextType = {
  state: ProjectState;
  dispatch: React.Dispatch<ProjectAction>;
};

// Initial state
const initialState: ProjectState = {
    projects:[]
};

// Reducer function
const projectReducer = (state: ProjectState, action: ProjectAction): ProjectState => {
  switch (action.type) {
    case "SET_PROJECTS":
      return { ...state, projects: action.payload };
    case "UPDATE_PROJECT":
      return {
        ...state,
        projects: state?.projects.map((project) =>
          project.id == action.payload.id
            ? { ...project, ...action.payload.data }
            : project
        ),
      };
    default:
      throw new Error(`Unhandled action type: ${(action as ProjectAction).type}`);
  }
};

// Create context
export const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

// Provider component
export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(projectReducer, initialState);

  
    const contextValue = React.useMemo(() => ({ state, dispatch }), [state]);
  

  return (
    <ProjectContext.Provider value={contextValue}>
      {children}
    </ProjectContext.Provider>
  );
};

// Custom hook for easier usage of the context
export const useProjectContext = (): ProjectContextType => {
  const context = React.useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjectContext must be used within a ProjectProvider");
  }
  return context;
};
