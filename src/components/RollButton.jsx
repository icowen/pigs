export default function RollButton({onRoll}) {
  return (
    <div
      className={"roll-pigs button"}
      onClick={onRoll}
    >
      {"Roll"}
    </div>
  );
}
