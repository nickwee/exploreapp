import { Dispatch, SetStateAction, useState } from "react";
import "../styles/main.css";
import { REPLInput } from "./REPLInput";

/* 
  You'll want to expand this component (and others) for the sprints! Remember 
  that you can pass "props" as function arguments. If you need to handle state 
  at a higher level, just move up the hooks and pass the state/setter as a prop.
  
  This is a great top level component for the REPL. It's a good idea to have organize all components in a component folder.
  You don't need to do that for this gearup.
*/

interface REPLProps {
  setIsUnlocked: Dispatch<SetStateAction<boolean>>;
}

export default function REPL(props: REPLProps) {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);

  // const [password, setPassword] = useState<string>("");

  return (
    <div className="repl">
      <p className="App-header">
        <h1>Adventure is at your fingertips...</h1>
      </p>
      <REPLInput setIsUnlocked={props.setIsUnlocked} />
    </div>
  );
}
