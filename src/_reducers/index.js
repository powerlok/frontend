import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { user } from './user.reducer';
import { alert } from './alert.reducer';
import { natureza } from './natureza.reducer';
import { centrocusto } from './centrocusto.reducer';
import { grupo } from './grupo.reducer';
import { movimentacao } from './movimentacao.reducer';
import { contacorrente } from './contacorrente.reducer';
import { banco } from './banco.reducer';
import { dashboard } from './dashboard.reducer';
import { trader } from './trader.reducer';
//Fiscal
import { clientes } from './Fiscal/clientes.reducer';
import { produto } from './Fiscal/produto.reducer';
import { integracao } from './Fiscal/integracao.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  user,
  alert,
  natureza,
  centrocusto,
  grupo,
  movimentacao,
  contacorrente,
  banco,
  dashboard,
  trader,
  clientes,
  produto,
  integracao
});

export default rootReducer;