import ResetButton from "./ResetButton";
import RollButton from "./RollButton";

export default function Button({ roll, onRoll, onReset }) {
  return (
    <div className={"button-container"}>
      {roll ? (
        <ResetButton onReset={onReset} />
      ) : (
        <RollButton onRoll={onRoll} />
      )}
    </div>
  );
}
