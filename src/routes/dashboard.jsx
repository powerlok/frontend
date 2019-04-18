import Dashboard from "../views/Dashboard/Dashboard.jsx";
import CentroCusto from "../views/Cadastros/CentroCusto/CentroCusto.jsx";
import CentroCustoLista from "../views/Cadastros/CentroCusto/CentroCustoLista.jsx";
import Grupo from "../views/Cadastros/Grupo/Grupo.jsx";
import GrupoLista from "../views/Cadastros/Grupo/GrupoLista.jsx";
import Natureza from "../views/Cadastros/Natureza/Natureza.jsx";
import NaturezaLista from "../views/Cadastros/Natureza/NaturezaLista.jsx";
import Movimentacao from "../views/Financeiro/Movimentacao/Movimentacao.jsx";
import MovimentacaoLista from "../views/Financeiro/Movimentacao/MovimentacaoLista.jsx";
import MovContaCorrenteLista from "../views/Financeiro/ContaCorrente/MovContaCorrenteLista.jsx";
import ContaCorrenteLista from "../views/Cadastros/ContaCorrente/ContaCorrenteLista.jsx";
import ContaCorrente from "../views/Cadastros/ContaCorrente/ContaCorrente.jsx";

import ClienteLista from "../views/Fiscal/Cadastros/Clientes/ClienteLista.jsx";
import Cliente from "../views/Fiscal/Cadastros/Clientes/Cliente.jsx";

import UsuarioLista from "../views/Adm/Usuario/UsuarioLista.jsx";
import Usuario from "../views/Adm/Usuario/Usuario.jsx";

import ProdutoBaseLista from "../views/Fiscal/Cadastros/Produtos/ProdutoLista.jsx";
import ProdutoBase from "../views/Fiscal/Cadastros/Produtos/Produto.jsx";

import Base from "../views/Fiscal/Integracao/Base.jsx";

import TOperacaoAbas from "../views/Trader/Operacao/OperacaoAbas.jsx";
import TOperacao from "../views/Trader/Operacao/Operacao.jsx";
import THistorico from "../views/Trader/Historico/Historico.jsx";
// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import TrendingUp from "@material-ui/icons/TrendingUp";
import MonetizationOn from "@material-ui/icons/MonetizationOn";
import AccountCircle from "@material-ui/icons/AccountCircle";

var Router = [
  {
    path: "/admin/dashboard",
    name: "Dashboard",
    icon: DashboardIcon,
    component: Dashboard,
    show: true
  },
  {
    collapse: true,
    path: "/admin/cadastros",
    name: "Cadastros",
    state: "openCadastros",
    icon: AssignmentIcon,
    views: [
      {
        path: "/admin/cadastros/contacorrentelista",
        name: "Conta Corrente",
        //  mini: 'C',
        component: ContaCorrenteLista,
        show: true
      },
      {
        path: "/admin/cadastros/contacorrente",
        name: "Conta Corrente",
        //  mini: 'C',
        component: ContaCorrente,
        show: false
      },
      {
        path: "/admin/cadastros/grupolista",
        name: "Grupo",
        // mini: 'G',
        component: GrupoLista,
        show: true
      },
      {
        path: "/admin/cadastros/grupo",
        name: "Grupo",
        //   mini: 'G',
        component: Grupo,
        show: false
      },
      {
        path: "/admin/cadastros/centrocustolista",
        name: "Centro de Custo",
        // mini: 'CC',
        component: CentroCustoLista,
        show: true
      },
      {
        path: "/admin/cadastros/centrocusto",
        name: "Centro de Custo",
        //  mini: 'CC',
        component: CentroCusto,
        show: false
      },
      {
        path: "/admin/cadastros/naturezalista",
        name: "Natureza",
        //  mini: 'N',
        component: NaturezaLista,
        show: true
      },
      {
        path: "/admin/cadastros/natureza",
        name: "Natureza",
        component: Natureza,
        show: false
      }
    ]
  },
  {
    collapse: true,
    path: "/admin/financeiro",
    name: "Financeiro",
    state: "openFinanceiro",
    icon: AttachMoneyIcon,
    views: [
      {
        path: "/admin/financeiro/movimentacaolista",
        name: "Movimentação",
        //  mini: 'M',
        component: MovimentacaoLista,
        show: true
      },
      {
        path: "/admin/financeiro/movimentacao",
        name: "Movimentação",
        // mini: 'M',
        component: Movimentacao,
        show: false
      },
      {
        path: "/admin/financeiro/contacorrente/movcontacorrentelista",
        name: "Mov Conta Corrente",
        //   mini: 'MCC',
        component: MovContaCorrenteLista,
        show: true
      }
    ]
  },
  {
    collapse: true,
    path: "/admin/trader",
    name: "Trader",
    state: "openTrader",
    icon: TrendingUp,
    views: [
      {
        path: "/admin/trader/operacao/operacaoabas",
        name: "Operação",
        //   mini: 'O',
        component: TOperacaoAbas,
        show: true
      },
      {
        path: "/admin/trader/operacao/operacao",
        name: "Operação",
        // mini: 'O',
        component: TOperacao,
        show: false
      },
      {
        path: "/admin/trader/historico/historico",
        name: "Historico",
        // mini: 'H',
        component: THistorico,
        show: true
      }
    ]
  },
  {
    collapse: true,
    path: "/admin/fiscal",
    name: "Fiscal",
    state: "openFiscal",
    icon: MonetizationOn,
    views: [
      {
        path: "/admin/fiscal/cadastros/clientes/clientelista",
        name: "Cadastro Clientes",
        //   mini: 'O',
        component: ClienteLista,
        show: true
      },
      {
        path: "/admin/fiscal/cadastros/clientes/cliente",
        name: "Clientes",
        //   mini: 'O',
        component: Cliente,
        show: false
      },
      {
        path: "/admin/fiscal/cadastros/produtos/produtolista",
        name: "Cadastro Produto",
        //   mini: 'O',
        component: ProdutoBaseLista,
        show: true
      },
      {
        path: "/admin/fiscal/cadastros/produtos/produto",
        name: "Cadastro Produtos",
        //   mini: 'O',
        component: ProdutoBase,
        show: false
      },
      {
        path: "/admin/fiscal/integracao/base",
        name: "Integração Base",
        //   mini: 'O',
        component: Base,
        show: true
      }      
    ]
  },
  {
    collapse: true,
    path: "/admin/adm",
    name: "Administrador",
    state: "openAdm",
    icon: AccountCircle,
    views: [
      {
        path: "/admin/adm/usuario/usuariolista",
        name: "Usuário",
        //   mini: 'O',
        component: UsuarioLista,
        show: true
      },
      {
        path: "/admin/adm/usuario/usuario",
        name: "Usuario",
        //   mini: 'O',
        component: Usuario,
        show: false
      },
       
    ]
  },
  {
    redirect: true,
    path: "/admin",
    pathTo: "/admin/dashboard",
    name: "Redirecionamento",
    navbarName: "Redirect"
  }
];

export default Router;

// WEBPACK FOOTER //
// ./src/routes/dashboard.jsx
