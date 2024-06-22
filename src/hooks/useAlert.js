import { createContext, useContext } from "react";
export const AlertContext = createContext();
export default function useAlert() {
  return useContext(AlertContext);
}
