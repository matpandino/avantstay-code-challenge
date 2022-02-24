import { useContext } from "react";
import { HomesContext } from "./index";

const useHomes = () => {
  const context = useContext(HomesContext);
  if (!context) throw new Error("useHomes must be used within a HomesProvider");
  return context;
};

export default useHomes;
