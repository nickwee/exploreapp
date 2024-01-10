import "../styles/App.css";
import REPL from "./REPL";
import { ExploreApp } from "./ExploreApp";
import { useState } from "react";

/**
 * This is the highest level component!
 */
function App() {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);

  // BUG: Somehow App is rendering twice (Strict Mode?)
  /**
   * SOLUTION: ExploreApp needs to come from REPL and not be it's own separate thing.
   * App should just call REPL and handleSubmit should flow into ExploreApp
   */
  return (
    <div className="App">
      <p className="App-header">
        <h1>Explore.app</h1>
      </p>
      <div>
        {isUnlocked ? <ExploreApp /> : <REPL setIsUnlocked={setIsUnlocked} />}
      </div>
    </div>
  );
}

export default App;
