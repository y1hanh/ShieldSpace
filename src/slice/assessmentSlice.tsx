import { createContext, useContext, useState } from 'react';

type AssessmentContextType = {
  userInput: string;
  analysisResult: any; // todo
  setUserInput: (input: string) => void;
  setAnalysisResult: (result: any) => void; // todo
};

type AnalysisResultType = {
  toxic_level: number;
  toxicity: Record<string, number>;
  emotions: Record<string, number>;
  trigger_emotion: string;
};
const assessmentContext = createContext<AssessmentContextType>(undefined);
export function assessmentSlice({ children }: { children: React.ReactNode }) {
  const [userInput, setUserInput] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResultType>();

  return (
    <assessmentContext.Provider
      value={{
        userInput,
        setUserInput,
        analysisResult,
        setAnalysisResult,
      }}
    >
      {children}
    </assessmentContext.Provider>
  );
}

export function useAssessment() {
  const context = useContext<AssessmentContextType>(assessmentContext);
  if (context === undefined) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
}
