export default function Select({ children: cities, changeEvent = null }) {
  function HandleSelect(event) {
    if (changeEvent) {
      changeEvent(event.target.value);
    }
  }
  return (
    <select className="border p-1 m-4" onChange={HandleSelect}>
      {cities.map(city => {
        return (
          <option value={city.id} key={city.id}>
            {city.name}
          </option>
        );
      })}
    </select>
  );
}
