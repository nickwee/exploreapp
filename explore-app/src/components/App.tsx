import "../styles/App.css";
import REPL from "./REPL";
import { ExploreApp } from "./ExploreApp";
import { useState } from "react";

/**
 * This is the highest level component!
 */
function App() {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);

  return (
    <div className="App">
      <p className="App-header">
        <h1>Adventure is at your fingertips...</h1>
      </p>
      <div>
        {isUnlocked ? <ExploreApp /> : <REPL setIsUnlocked={setIsUnlocked} />}
      </div>
      {/* <REPL /> */}
    </div>
  );
}

export default App;
