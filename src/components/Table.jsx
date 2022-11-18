import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import { deletaExpense, editExpense } from '../redux/actions';
import '../css/table.css';

class Table extends Component {
  deletaItem = (id) => {
    const { expenses, deletaExpense: deleta } = this.props;
    const novoArray = expenses.filter((elemento) => elemento.id !== id);
    deleta(novoArray);
  };

  editaItem = (id) => {
    const { editExpense: edit } = this.props;
    edit({ id, edit: true });
  };

  render() {
    const { expenses } = this.props;
    console.log(expenses.length);
    return (
      <div className="divTable">
        <table>
          <thead>
            <tr className="table">
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses.length > 0
              && expenses
                .map((elemento) => {
                  const cambio = Number(elemento.exchangeRates[elemento.currency].ask);
                  const resultado = elemento.value * cambio;
                  return (
                    <tr className="table" key={ elemento.id }>
                      <td>{elemento.description}</td>
                      <td>{elemento.tag}</td>
                      <td>{elemento.method}</td>
                      <td>{Number(elemento.value).toFixed(2)}</td>
                      <td>{elemento.exchangeRates[elemento.currency].name}</td>
                      <td>{cambio.toFixed(2)}</td>
                      <td>{resultado.toFixed(2)}</td>
                      <td>Real</td>
                      <td>
                        <button
                          onClick={ () => this.deletaItem(elemento.id) }
                          data-testid="delete-btn"
                          type="button"
                        >
                          Deletar
                        </button>
                        <button
                          onClick={ () => this.editaItem(elemento.id) }
                          data-testid="edit-btn"
                          type="button"
                        >
                          Editar

                        </button>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropType.arrayOf.isRequired,
  deletaExpense: PropType.func.isRequired,
  editExpense: PropType.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deletaExpense: (e) => dispatch(deletaExpense(e)),
  editExpense: (e) => dispatch(editExpense(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
