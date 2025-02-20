import { useLocation } from "react-router-dom";

export const useSearchQuery = () => {
  return new URLSearchParams(useLocation().search);
};
