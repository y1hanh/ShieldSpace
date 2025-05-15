import { createContext, useContext, useEffect, useState } from 'react';
import { getActionPlan } from '../api';

type AssessmentContextType = {
  userInput: string;
  analysisResult: AnalysisResultType;
  setUserInput: (input: string) => void;
  setAnalysisResult: (result: any) => void;
  actionPlan: ActionPlanType;
  setActionPlan: (plan: ActionPlanType) => void;
};

export type AnalysisResultType = {
  toxic_level: number;
  toxicity: Record<string, number>;
  emotions: Record<string, number>;
  trigger_emotion: string;
  bias?: Record<string, number>;
};

type ActionPlanType =
  | {
      'immediate-action': string[];
      'long-term-skills': string[];
    }
  | 'error';
const assessmentContext = createContext<AssessmentContextType>(undefined);
export function assessmentSlice({ children }: { children: React.ReactNode }) {
  const [userInput, setUserInput] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResultType>();
  const [actionPlan, setActionPlan] = useState<ActionPlanType>();

  useEffect(() => {
    const fetchActionPlan = async () => {
      setActionPlan(null);
      if (userInput) {
        try {
          const response = await getActionPlan({ user_input: userInput });
          setActionPlan(response);
        } catch (error) {
          setActionPlan('error');
          console.error('Error fetching action plan:', error);
        }
      }
    };
    fetchActionPlan();
  }, [userInput]);

  return (
    <assessmentContext.Provider
      value={{
        userInput,
        setUserInput,
        analysisResult,
        setAnalysisResult,
        actionPlan,
        setActionPlan,
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
