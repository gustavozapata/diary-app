import React from "react";
import Index from "./src/Index";
import { DiaryProvider } from "./src/context/DiaryContext";

//This component is the top parent component of the application
//it uses the Provider to pass down the state and the functions used to update the state
const App = () => {
  return (
    <DiaryProvider>
      <Index />
    </DiaryProvider>
  );
};

export default App;
