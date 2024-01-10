import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";

interface REPLInputProps {
  // uponUnlock: (unlocked: boolean) => void;
  setIsUnlocked: Dispatch<SetStateAction<boolean>>;
}
// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
export function REPLInput(props: REPLInputProps) {
  // Remember: let React manage state in your webapp.

  // Manages the user inputted password of the input box
  const [password, setPassword] = useState<string>("");

  // Manages the current amount of times the button is clicked
  const [count, setCount] = useState<number>(0);

  // Manages the password checking mechanism
  // const [isUnlocked, setIsUnlocked] = useState<boolean>(false);

  // This function is triggered when the button is clicked.
  function handleSubmit(password: string) {
    setCount(count + 1);

    checkPassword(password);

    // clear password variable after submission
    setPassword("");
  }

  function checkPassword(password: string) {
    const correctPassword = "I solemnly swear that I am up to no good";
    if (password === correctPassword) {
      props.setIsUnlocked(true);
    } else {
      alert("Nice try!");
    }
  }

  /**
   * We suggest breaking down this component into smaller components, think about the individual pieces
   * of the REPL and how they connect to each other...
   */
  return (
    <div className="repl-input">
      {/* This is a comment within the JSX. Notice that it's a TypeScript comment wrapped in
            braces, so that React knows it should be interpreted as TypeScript */}
      {/* I opted to use this HTML tag; you don't need to. It structures multiple input fields
            into a single unit, which makes it easier for screenreaders to navigate. */}
      <fieldset>
        <legend>Enter the secret password:</legend>
        <ControlledInput
          value={password}
          setValue={setPassword}
          ariaLabel={"Password input"}
        />
      </fieldset>
      <button onClick={() => handleSubmit(password)}>
        Attempted {count} times
      </button>
    </div>
  );
}
