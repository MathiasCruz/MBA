export default function HeroCard({ children: candidate }) {
  return (
    <div className="shadow-lg p-4 w-80 h-80 flex flex-row items-center justify-center font-mono">
      <div className="flex flex-col items-end">
        <img src={candidate.imgPath} />
        <p className="text-xl">{candidate.percentage.toFixed(2)}%</p>
        <p>{candidate.votes}</p>
        <p>{candidate.name}</p>
      </div>
    </div>
  );
}
