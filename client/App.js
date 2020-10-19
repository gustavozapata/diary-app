import React from "react";
import Index from "./src/Index";
import { DiaryProvider } from "./src/context/DiaryContext";

const App = () => {
  return (
    <DiaryProvider>
      <Index />
    </DiaryProvider>
  );
};

export default App;
