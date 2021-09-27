export function OrdemCrescente(dataA, dataB) {
  if (dataA.month > dataB.month) return 1;
  if (dataA.month < dataB.month) return -1;
  return 0;
}

export function FiltroIdOrdemCrescente(report, idInvest) {
  return report
    .filter(report => {
      return report.investmentId.includes(idInvest);
    })
    .sort(OrdemCrescente);
}
export function updateGains(report) {
  for (let i = 0; i < report.length; i++) {
    if (i + 1 < report.length) {
      let gainOrLoss = 0;
      gainOrLoss = report[i + 1].value - report[i].value;
      gainOrLoss = (gainOrLoss / report[i].value) * 100;
      report[i + 1].lucro = gainOrLoss;
    }
  }
}

export function calcTotal(report) {
  let total = 0;
  let totalPerc = 0;
  for (let i = 0; i < report.length; i++) {
    totalPerc += report[i].lucro;
  }

  total = (totalPerc / 100) * report[0].value;

  return total;
}
