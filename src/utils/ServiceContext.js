import { createContext, useContext } from "react";
export const ServiceContext = createContext();
export default function useService() {
  return useContext(ServiceContext);
}
