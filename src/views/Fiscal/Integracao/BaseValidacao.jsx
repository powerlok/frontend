import React from "react";
import { connect } from "react-redux";
import compose from "recompose/compose";
import ReactTable from "react-table";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
/*import Dvr from "@material-ui/icons/Dvr";*/
import Edit from "@material-ui/icons/Edit";
import classNames from "classnames";
import Close from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import NavigationIcon from "@material-ui/icons/Navigation";
import Fab from "@material-ui/core/Fab";
import Icon from "@material-ui/core/Icon";
import CircularProgress from "@material-ui/core/CircularProgress";
import green from "@material-ui/core/colors/green";
// core components
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import CustomButton from "../../../components/CustomButtons/Button";
import Card from "../../../components/Card/Card";
import CardBody from "../../../components/Card/CardBody";
import CardHeader from "../../../components/Card/CardHeader";
import CardIcon from "../../../components/Card/CardIcon";
import { cardTitle } from "../../../assets/jss/material-dashboard-pro-react";
import { integracaoActions } from "../../../_actions/Fiscal/integracao.actions";
import BaseCadastro from '../Integracao/BaseCadastro';

import Slide from "@material-ui/core/Slide";

import Dialog from "@material-ui/core/Dialog";
import { Search } from "@material-ui/icons";

const styles = theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    float: "right"
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: "relative"
  },
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  },
  cardAction: {
    float: "right",
    margin: theme.spacing.unit,
    position: "absolute",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  },
  cardGrid: {
    marginTop: "0"
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
});


function Transition(props) {
  return <Slide direction="up" {...props} />;
}


class BaseValidacao extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      produtos: [],
      loadingGrid: false,
      loadingValid: false,
      loadingExecValidProd: false,
      open: false,
      codprod: '',
      desc: '',
      codcliente: '',
      codacess: '',
      tipcod: ''
    };

    this.validarProduto = this.validarProduto.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.filtroGrid = this.filtroGrid.bind(this);

    if(this.props.filtro){
      this.filtroGrid(this.props.seqclientes);
    }
    
  }

  validarProduto() {
    this.props.dispatch(
      integracaoActions.execIntegracaoValidacaoProduto(this.props.seqclientes)
    );
  }

  componentWillReceiveProps(nextProps) { 
    if (this.props.integracao.produtos !== nextProps.integracao.produtos) { 
      this.setState({           
        produtos:  nextProps.integracao.produtos
      });
    }

    if (this.props.integracao !== nextProps.integracao) { 
      this.setState({           
        loadingGrid:  nextProps.integracao.loadingGrid,     
        loadingValid:  nextProps.integracao.loadingValid,       
        loadingExecValidProd: nextProps.integracao.loadingExecValidProd
      });
    }

    if(nextProps.alert != this.props.alert) {
      if (nextProps.alert.type == 'success') {
        this.filtroGrid(this.props.seqclientes);
      }
    }
  }

  delete(id) {
        if (window.confirm("Tem certeza que quer deletar o registro?")) {
            //this.props.dispatch(clientesActions._delete(id));
        }
  }

  filtroGrid(seqcliente) { 
    if(seqcliente) {
     this.props.dispatch(integracaoActions.getIntegracaoValidacaoProduto(seqcliente));
    }
  }
  
  handleOpen = (seqproduto, descricao, tipcodigo, codacesso) => {
    this.setState({ open: true, codprod: seqproduto, desc: descricao, seqcliente: this.props.seqclientes, tipcod: tipcodigo, codacess: codacesso });
  };

  handleClose = () => {
    this.setState({ open: false });
  };    
  
  getData = () => {
    if (this.state.produtos.length > 0) {
      return this.state.produtos.map((prop, key) => {
        return {
          id: prop.seqproduto,
          descricao: prop.desccompleta,
          actions: (
                    <div className="actions-right">
                        <CustomButton
                            justIcon
                            round
                            simple
                            onClick={() => { this.handleOpen(prop.seqproduto, prop.desccompleta, prop.tipcodigo, prop.codacesso); }}
                            color="info"
                            className="like"
                        >
                            <Search />
                        </CustomButton>{" "}

                        {/* <CustomButton
                            justIcon
                            round
                            simple
                            onClick={() => { this.delete(prop.id); }}
                            color="danger"
                            className="remove"
                        >
                            <Close />
                        </CustomButton>{" "} */}
                    </div>
                )
        };
      });
    }
  };

  filterCaseInsensitive = (filter, row) => {
    const id = filter.pivotId || filter.id;
    return row[id] !== undefined
      ? String(row[id]).toLowerCase().startsWith(filter.value.toLowerCase())
      : true;
  };

  render() {
    const { classes } = this.props;
    const {loadingExecValidProd, loadingGrid } = this.state;
    
    return (
      <Card className={classes.cardGrid}>
        <CardHeader>
          <div className={classes.root}>
                      <div className={classes.wrapper}>
                        <Button
                          variant="contained"
                          color="secondary"
                          className={classes.buttonClassname}
                          disabled={loadingExecValidProd}
                          onClick={this.validarProduto}                          
                        >
                          Validar
                          <Icon className={classes.rightIcon}> compare_arrows</Icon>
                        </Button>
                        {loadingExecValidProd &&
                          (<CircularProgress
                            size={24}
                            className={classes.buttonProgress}
                          />)
                        }
                      </div>
          </div>
        </CardHeader>
        <CardBody>
          <ReactTable
            data={this.getData()}
            filterable
            defaultFilterMethod={this.filterCaseInsensitive}
            columns={[
              {
                Header: "Cód Produto",
                accessor: "id",
                sortable: true,
                filterable: true
              },
              {
                Header: "DESCRIÇÃO",
                accessor: "descricao",
                sortable: true,
                filterable: true
              },
              {
                Header: "",
                accessor: "actions",
                sortable: false,
                filterable: false
              }
            ]}
            // onFetchData={this.fetchData}
            minRows={1}
            loading={loadingGrid}
            defaultPageSize={10}
            showPaginationTop={false}
            showPaginationBottom={true}
            className="-striped -highlight"
            previousText="Anterior"
            nextText="Próximo"
            loadingText="Carregando..."
            noDataText="Nenhuma informação encontrada no momento"
            pageText="Página"
            ofText="de"
            rowsText="linhas"
            pageJumpText="pular para página"
            rowsSelectorText="linhas por páginas"
          />

          
          <Dialog
            fullScreen
            open={this.state.open}
            TransitionComponent={Transition}
            aria-labelledby="form-dialog-title"
            PaperProps={{
              style: {
                background: "#EEEEEE"
              }
          }}
          ><BaseCadastro open={this.state.open} close={this.handleClose} seqproduto={this.state.codprod} descricao={this.state.desc} codacesso={this.state.codacess} tipcodigo={this.state.tipcod}  seqcliente={this.state.seqcliente} ></BaseCadastro>
          </Dialog>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  //console.log(state.grupo);
  return {
    alert: state.alert,
    integracao: state.integracao,
    authentication: state.authentication.user
  };
};

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(BaseValidacao);

// WEBPACK FOOTER //
// ./src/views/Forms/RegularForms.jsx
