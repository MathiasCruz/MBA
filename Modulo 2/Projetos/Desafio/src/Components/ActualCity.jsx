export default function ActualCity({ children: city = null }) {
  return (
    <div className="flex flex-row justify-center m-5 space-x-4">
      <p>
        <strong>Total de Eleitores :</strong> {city.votingPopulation}
      </p>
      <p>
        <strong>Abstenção :</strong> {city.absence}
      </p>
      <p>
        <strong>Comparecimento :</strong> {city.presence}
      </p>
    </div>
  );
}
