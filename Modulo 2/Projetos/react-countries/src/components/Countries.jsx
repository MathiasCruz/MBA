import Country from './Country';
export default function Countries({ children: countries = [] }) {
  return (
    <div>
      {countries.map(country => {
        return <Country key={country.id}>{country}</Country>;
      })}
    </div>
  );
}
