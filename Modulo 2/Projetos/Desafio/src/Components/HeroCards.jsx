export default function HeroCards({ children }) {
  return (
    <div className="flex flex-row justify-items-center  flex-wrap">
      {children}
    </div>
  );
}
