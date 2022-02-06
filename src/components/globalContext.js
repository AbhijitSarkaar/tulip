import { createContext } from "react";

export const initialState = {
    list: [],
    data: {},
    address: "",
};

export const globalState = createContext(null);
