
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import 'react-native-reanimated';


// Define the shape of the context state
type DayEntry = {
    productivity: number;
    mood: number;
    day: number;  // 0 = Sunday, 1 = Monday, etc.
    agenda: Record<string, any>;  // assuming agenda is an object
    grateful: string[];           // array of strings for things you're grateful for
    learned: string;
    not_good: string;
  };
  
  type AppState = {
    [key: string]: DayEntry;  // keys are dates, values are DayEntry objects
  };
  // Define the context type (optional: include setState)
  type AppContextType = {
    state: AppState | null;
    setState: React.Dispatch<React.SetStateAction<AppState | null>>;
  };
  
  // Create a context with a default value of null, properly typed
  const AppContext = createContext<AppContextType | undefined>(undefined);
  
  // Create a provider component for managing the state
  export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState<AppState | null>(null);
  
    useEffect(() => {
      // Load persisted state on app start
      const loadState = async () => {
        try {
          const savedState = await AsyncStorage.getItem('appState');
          if (savedState) {
            setState(JSON.parse(savedState));
          }
        } catch (e) {
          console.log('Failed to load state:', e);
        }
      };
      loadState();
    }, []);
  
    useEffect(() => {
      // Persist state whenever it changes
      const saveState = async () => {
        try {
          await AsyncStorage.setItem('appState', JSON.stringify(state));
        } catch (e) {
          console.log('Failed to save state:', e);
        }
      };
      if (state !== null) saveState();
    }, [state]);
  
    return (
      <AppContext.Provider value={{ state, setState }}>
        {children}
      </AppContext.Provider>
    );
  };
  
  // Custom hook to use the AppContext with proper typing
  export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
      throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
  };