export default function InvestmentsList({ children }) {
  return (
    <ul className="flex flex-row items-center border p-2 m-2 space-x-5">
      <li>
        {children.year}/{children.month}
      </li>
      <li>
        {children.value.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </li>
      <li>{children.lucro.toLocaleString('pt-BR')}%</li>
    </ul>
  );
}
