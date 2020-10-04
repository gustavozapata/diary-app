import React from "react";
import { toDateString } from "../utils/utils";

const entrada = {
  title: "",
  description: "",
  date: toDateString(),
};

export const EntryContext = React.createContext({
  entrada,
  setEntrada: () => {},
});
// export const EntryContext = React.createContext();
