import { createContext } from "react";

export const initialState = {
    list: [],
    data: {},
};

export const globalState = createContext(null);
