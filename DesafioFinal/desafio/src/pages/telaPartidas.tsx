import { useEffect, useState } from 'react';
import { BuscaPartidasPorAno } from '../api/backend';
import { IPartida } from '../interfaces/IPartidas';

function TelaPartidas() {
  const [partidas, setPartidas] = useState<IPartida[]>([]);

  useEffect(() => {
    BuscaPartidasPorAno('2013').then(setPartidas);
  }, []);

  return <>${console.log(partidas)}</>;
}

export default TelaPartidas;
