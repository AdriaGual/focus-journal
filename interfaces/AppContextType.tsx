import { AppState } from "./AppState";

export interface AppContextType {
  state: AppState | null;
  setState: (state: AppState | ((prevState: AppState) => AppState)) => void;
  clearState: () => void;
}
