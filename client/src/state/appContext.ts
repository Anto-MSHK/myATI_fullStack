import { createContext, useContext } from "react";
export type AppContextT = {
  curDay: number;
  setCurDay: (c: number) => void;
};
export const AppContext = createContext<AppContextT>({
  curDay: 3,
  setCurDay: () => {},
});
export const useAppContext = () => useContext(AppContext);
