import { useHistory } from 'react-router-dom';
import { Ano } from '../helper/helpers';

const Select = () => {
  const historic = useHistory();
  function SelecionarNovoANo(ano: string) {
    historic.push(`/partidas/${ano}`);
  }
  return (
    <div>
      <select onChange={evt => SelecionarNovoANo(evt.target.value as string)}>
        {Ano.map(ano => {
          return (
            <option value={ano} key={ano}>
              {ano}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
