import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "./store";

export const useAppSelector =useSelector.withTypes<RootState>();
export const useAppDispatch =useDispatch.withTypes<AppDispatch>();