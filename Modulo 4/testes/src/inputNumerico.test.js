import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputNumerico from './inputNumerico';

describe('Componente InputNumerico', () => {
  test('Renderiza o componente', () => {
    render(<InputNumerico />);
  });
  test('Erro numero fora da faixa', () => {
    render(<InputNumerico max={5} initialValue={10} />);
    const error = screen.queryByText(/erro/i);
    expect(error).toBeInTheDocument();
  });

  test('Digita um valor Invalido', () => {
    render(<InputNumerico max={9} />);
    const input = screen.getByLabelText(/numero/i);
    userEvent.type(input, '10');
    const error = screen.queryByText(/erro/i);
    expect(error).toBeInTheDocument();
  });
});
