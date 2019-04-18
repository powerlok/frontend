import React from "react";
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";

// core components
import GridContainer from "./../../components/Grid/GridContainer.jsx";
import GridItem from "./../../components/Grid/GridItem.jsx";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Card from "./../../components/Card/Card.jsx";
import CardHeader from "./../../components/Card/CardHeader.jsx";
import CardIcon from "./../../components/Card/CardIcon.jsx";
import CardBody from "./../../components/Card/CardBody.jsx";
import { dashboardActions } from '../../_actions/dashboard.actions';
import DashboardDialog from './DashboardDialog';
import dashboardStyle from "./../../assets/jss/material-dashboard-pro-react/views/dashboardStyle";
import LoadingOverlay from 'react-loading-overlay';

import "moment/locale/pt-br";
var moment = require('moment');
moment.locale('pt-br');

const styles = theme => ({
  tableCell: {
    padding: "0px"
  },
  tableCellDesc: {
    width: "200px"
  },
  table: {
    width: '100%',
  },
  ...dashboardStyle
});

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingfluxoAteHoje: false,
      loadingSaldo: false,
      loadingConciliacaoPendente: false,
      loadingFluxo: false,
      loadingDispPorConta: false,
      loadingNatureza: false,
      loadingCentroCusto: false,
      loadingGrupo: false,
      fluxoAteHoje: 0,
      saldo: 0,
      conciliacaoPendente: 0,
      fluxo: 0,
      DispPorConta: [],
      natureza: [],
      centrocusto: [],
      grupo: [],
      error: null,
      tipo: "",
      openHistorico: false,
      id: 0
    };

    this.openHistorico = this.openHistorico.bind(this);
    this.closeHistorico = this.closeHistorico.bind(this);
    this.carregaDash();
  }

  carregaDash() {

    const { dispatch, authentication } = this.props;

    var seqconta = authentication.user.seqconta;

    dispatch(dashboardActions.getFluxoAteHoje(seqconta));
    dispatch(dashboardActions.getSaldo(seqconta));
    dispatch(dashboardActions.getConciliacaoPendente(seqconta));
    dispatch(dashboardActions.getFluxo(seqconta));
    dispatch(dashboardActions.getDisponibilidadePorConta(seqconta));
    dispatch(dashboardActions.getNatureza(seqconta));
    dispatch(dashboardActions.getCentroCusto(seqconta));
    dispatch(dashboardActions.getGrupo(seqconta));

  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.dashboard !== this.props.dashboard) {
      //console.log(nextProps);
      this.setState({
        loadingfluxoAteHoje: nextProps.dashboard.loadingfluxoAteHoje,
        loadingSaldo: nextProps.dashboard.loadingSaldo,
        loadingConciliacaoPendente: nextProps.dashboard.loadingConciliacaoPendente,
        loadingFluxo: nextProps.dashboard.loadingFluxo,
        loadingNatureza: nextProps.dashboard.loadingDispPorConta,
        loadingCentroCusto: nextProps.dashboard.loadingCentroCusto,
        loadingGrupo: nextProps.dashboard.loadingGrupo,
        fluxoAteHoje: (nextProps.dashboard.fluxoAteHoje) ? nextProps.dashboard.fluxoAteHoje.fluxoatehoje.toLocaleString('pt-br', { minimumFractionDigits: 2 }) : '0,00',
        saldo: (nextProps.dashboard.saldo) ? nextProps.dashboard.saldo.saldo.toLocaleString('pt-br', { minimumFractionDigits: 2 }) : '0,00',
        conciliacaoPendente: (nextProps.dashboard.conciliacaoPendente) ? nextProps.dashboard.conciliacaoPendente.qtde.toLocaleString('pt-br', { minimumFractionDigits: 0 }) : "0",
        fluxo: (nextProps.dashboard.fluxo) ? nextProps.dashboard.fluxo.fluxo.toLocaleString('pt-br', { minimumFractionDigits: 2 }) : "0,00",
        DispPorConta: nextProps.dashboard.DispPorConta,
        natureza: nextProps.dashboard.natureza,
        centrocusto: nextProps.dashboard.centrocusto,
        grupo: nextProps.dashboard.grupo
      });
    }
  }

  carregaDispPorConta() {
    const { classes } = this.props;
    if (this.state.DispPorConta !== undefined) {
      if (this.state.DispPorConta.length > 0) {
        var total = 0;
        return (
          <Table className={classes.table}>
            <TableBody>
              {this.state.DispPorConta.map((prop, key) => {
                total += prop.saldo;
                return (
                  <TableRow key={key}>
                    <TableCell className={classes.tableCell + ' ' + classes.tableCellDesc}>{prop.descricao}</TableCell>
                    <TableCell className={classes.tableCell} rowSpan={1} />
                    <TableCell className={classes.tableCell} numeric><span style={(prop.saldo < 0) ? { color: "red" } : { color: "" }}>{prop.saldo.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</span> </TableCell>
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell className={classes.tableCell} rowSpan={1} />
                <TableCell className={classes.tableCell}>Total</TableCell>
                <TableCell className={classes.tableCell} numeric><span style={(total < 0) ? { color: "red" } : { color: "" }} >{total.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</span></TableCell>
              </TableRow>
            </TableBody>
          </Table>);
      }
    }
    return (
      <Table className={classes.table} >
        <TableBody>
          <TableRow>
            <TableCell colSpan={3}>Nenhuma Informação encontrada</TableCell>
          </TableRow>
        </TableBody>
      </Table>);
  }

  carregaTodos(state, tipo) {
    const { classes } = this.props;
    if (state !== undefined) {
      if (state.length > 0) {
        var total = 0;
        return (
          <Table className={classes.table}>
            <TableBody>
              {state.map((prop, key) => {
                total += prop.vlroriginal;
                return (
                  <TableRow key={key}>
                    <TableCell className={classes.tableCell + ' ' + classes.tableCellDesc} onClick={() => { this.openHistorico(tipo, prop.id) }}  style={(prop.vlroriginal < 0) ? { cursor: "pointer" } : { color: "", cursor: "pointer" }}>{prop.descricao}</TableCell>
                    <TableCell className={classes.tableCell} />
                    <TableCell className={classes.tableCell} numeric onClick={() => { this.openHistorico(tipo, prop.id) }}><span style={(prop.vlroriginal < 0) ? { color: "red", cursor: "pointer" } : { color: "", cursor: "pointer" }}>{prop.vlroriginal.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</span> </TableCell>
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell className={classes.tableCell} />
                <TableCell className={classes.tableCell}>Total</TableCell>
                <TableCell className={classes.tableCell} numeric><span style={(total < 0) ? { color: "red" } : { color: "" }} >{total.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</span></TableCell>
              </TableRow>
            </TableBody>
          </Table>);
      }
    }
    return (
      <Table className={classes.table} >
        <TableBody>
          <TableRow>
            <TableCell colSpan={3}>Nenhuma Informação encontrada</TableCell>
          </TableRow>
        </TableBody>
      </Table>);
  }

  openHistorico(tipo, id) {
    this.setState({ openHistorico: true, tipo: tipo, id: id });
  }

  closeHistorico() {
    this.setState({ openHistorico: false, tipo: "", id: 0 });
  }

  render() {
    const { classes } = this.props;
    const { fluxoAteHoje, saldo, conciliacaoPendente, fluxo, DispPorConta, natureza, centrocusto, grupo, tipo } = this.state;

    return (
      <div>
        <DashboardDialog open={this.state.openHistorico} close={this.closeHistorico} tipo={this.state.tipo} id={this.state.id} />
        <GridContainer>
          <GridItem xs={12} sm={12} md={3}>
            <LoadingOverlay
              active={this.state.loadingFluxo}
              spinner
            //text='Carregando...'
            >
              <Card>
                <CardHeader color="warning" icon>
                  <CardIcon color="warning">
                    <Icon>trending_up</Icon>
                  </CardIcon>

                  <p className={classes.cardCategory}>Fluxo até hoje</p>
                  <h3 className={classes.cardTitle}>
                    <small>R$</small>  {fluxoAteHoje}
                  </h3>
                </CardHeader>
              </Card>
            </LoadingOverlay>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <LoadingOverlay
              active={this.state.loadingFluxo}
              spinner
            //text='Carregando...'
            >
              <Card>
                <CardHeader color="success" icon>
                  <CardIcon color="success">
                    <Icon>attach_money</Icon>
                  </CardIcon>
                  <p className={classes.cardCategory}>Saldo</p>
                  <h3 className={classes.cardTitle}>
                    <small>R$</small> {saldo}</h3>
                </CardHeader>
              </Card>
            </LoadingOverlay>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <LoadingOverlay
              active={this.state.loadingFluxo}
              spinner
            //text='Carregando...'
            >
              <Card>
                <CardHeader color="danger" icon>
                  <CardIcon color="danger">
                    <Icon>info_outline</Icon>
                  </CardIcon>
                  <p className={classes.cardCategory}>Conciliação Pendente</p>
                  <h3 className={classes.cardTitle}>
                    <small>Qtde: </small> {conciliacaoPendente}</h3>
                </CardHeader>
              </Card>
            </LoadingOverlay>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <LoadingOverlay
              active={this.state.loadingFluxo}
              spinner
            //text='Carregando...'
            >
              <Card>
                <CardHeader color="info" icon>
                  <CardIcon color="info">
                    <Icon>show_chart</Icon>
                  </CardIcon>
                  <p className={classes.cardCategory}>Fluxo</p>
                  <h3 className={classes.cardTitle}><small>R$</small> {fluxo}</h3>
                </CardHeader>
              </Card>
            </LoadingOverlay>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <LoadingOverlay
              active={this.state.loadingFluxo}
              spinner
            //text='Carregando...'
            >
              <Card>
                <CardHeader color="rose">
                  <h4 className={classes.cardIconTitle}>
                    DISPONIBILIDADE POR CONTA
                </h4>
                </CardHeader>
                <CardBody>
                  <GridContainer justify="space-between">
                    <GridItem xs={12} sm={12} md={12}>
                      {this.carregaDispPorConta()}
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </LoadingOverlay>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <LoadingOverlay
              active={this.state.loadingFluxo}
              spinner
            //text='Carregando...'
            >
              <Card>
                <CardHeader color="rose">
                  <h4 className={classes.cardIconTitle}>
                    GRUPO
                </h4>
                </CardHeader>
                <CardBody>
                  <GridContainer justify="space-between">
                    <GridItem xs={12} sm={12} md={12}>
                      {this.carregaTodos(grupo, 'GRUPO')}
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </LoadingOverlay>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <LoadingOverlay
              active={this.state.loadingFluxo}
              spinner
            //text='Carregando...'
            >
              <Card>
                <CardHeader color="rose">
                  <h4 className={classes.cardIconTitle}>
                    CENTRO CUSTO
                </h4>
                </CardHeader>
                <CardBody>
                  <GridContainer justify="space-between">
                    <GridItem xs={12} sm={12} md={12}>
                      {this.carregaTodos(centrocusto, 'CENTROCUSTO')}
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </LoadingOverlay>
          </GridItem>

          <GridItem xs={12} sm={12} md={6}>
            <LoadingOverlay
              active={this.state.loadingFluxo}
              spinner
            //text='Carregando...'
            >
              <Card>
                <CardHeader color="rose">
                  <h4 className={classes.cardIconTitle}>
                    NATUREZA
                </h4>
                </CardHeader>
                <CardBody>
                  <GridContainer justify="space-between">
                    <GridItem xs={12} sm={12} md={12}>
                      {this.carregaTodos(natureza, 'NATUREZA')}
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </LoadingOverlay>
          </GridItem>

        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};


const mapStateToProps = (state) => {
  return {
    dashboard: state.dashboard,
    alert: state.alert,
    authentication: state.authentication.user
  }
}

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(Dashboard);


        // WEBPACK FOOTER //
// ./src/views/Dashboard/Dashboard.jsx