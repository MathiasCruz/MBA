import { Children } from 'react';
import InvestmentsList from '../Components/InvestmentsList';
import { reports } from '../Data/investments-1';
import { FiltroIdOrdemCrescente } from '../Helper/CalHelpers';
import { updateGains } from '../Helper/CalHelpers';
import { calcTotal } from '../Helper/CalHelpers';

export default function InvestimentsShow({ children }) {
  let filterReports = FiltroIdOrdemCrescente(reports, children.id);
  updateGains(filterReports);
  children.total = calcTotal(filterReports);
  return (
    <div className="text-center border-b p-2">
      <div className="text-2xl">
        <strong>{children.description}</strong>
      </div>
      <div>
        {children.total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}{' '}
      </div>
      {filterReports.map(filters => {
        return <InvestmentsList key={filters.id}>{filters}</InvestmentsList>;
      })}
    </div>
  );
}
