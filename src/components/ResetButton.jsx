export default function ResetButton({onReset}) {
  return (
    <div
      className={"reset-pigs button"}
      onClick={onReset}
    >
      {"Reset"}
    </div>
  );
}
