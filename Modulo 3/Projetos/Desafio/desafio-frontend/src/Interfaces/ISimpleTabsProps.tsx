import { ICategoriaValor } from './ICategoriaValor';
import { IDespesa } from './IDespesas';

export interface ISimpleTabsProps {
  despesas: IDespesa[];
}

export interface IDespesasFiltrado {
  despesasMes: IDespesa[];
  categoriaEValor: ICategoriaValor[];
  valorTotal?: number;
}
