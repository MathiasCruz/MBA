import { Investments } from '../Data/investments-1';
import { reports } from '../Data/investments-1';
import InvestimentsShow from '../Components/InvestimentsShow';
export default function InvestmentsPage() {
  return (
    <div>
      {Investments.map(invest => {
        return <InvestimentsShow key={invest.id}>{invest}</InvestimentsShow>;
      })}
    </div>
  );
}
