export default function Country({ children: country = null }) {
  if (!country) {
    return <div>Pais Inexistente</div>;
  }
  const { name, capital, flag, population, area } = country;
  return (
    <div className="border p-2 m-2 flex flex-row items-center space-x-2">
      <img className="w-48" src={flag} alt={name}></img>
      <ul>
        <li>{name}</li>
        <li>{capital}</li>
        <li>{population}</li>
        <li>{area}</li>
      </ul>
    </div>
  );
}
