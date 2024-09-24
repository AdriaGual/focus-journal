import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import "react-native-reanimated";

type Quote = {
  text: string;
  author: string;
};

type DayEntry = {
  productivity: number;
  mood: number;
  day: number;
  agenda: Record<string, any>;
  grateful: string[];
  learned: string;
  not_good: string;
  quote: Quote;
};

type AppState = {
  [key: string]: DayEntry;
};
type AppContextType = {
  state: AppState | null;
  setState: React.Dispatch<React.SetStateAction<AppState | null>>;
  clearState: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppState | null>(null);

  const clearState = () => {
    setState({});
  };

  useEffect(() => {
    const loadState = async () => {
      try {
        const savedState = await AsyncStorage.getItem("appState");
        if (savedState) {
          setState(JSON.parse(savedState));
        }
      } catch (e) {
        console.log("Failed to load state:", e);
      }
    };
    loadState();
  }, []);

  useEffect(() => {
    const saveState = async () => {
      try {
        await AsyncStorage.setItem("appState", JSON.stringify(state));
      } catch (e) {
        console.log("Failed to save state:", e);
      }
    };
    if (state !== null) saveState();
  }, [state]);

  return (
    <AppContext.Provider value={{ state, setState, clearState }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
