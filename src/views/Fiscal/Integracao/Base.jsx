import React from "react";
import { connect } from "react-redux";
import compose from "recompose/compose";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";

// core components
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import LoadingOverlay from "react-loading-overlay";

import LibraryBooks from "@material-ui/icons/LibraryBooks";
import { Button } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import classNames from "classnames";
import Card from "../../../components/Card/Card.jsx";
import CardBody from "../../../components/Card/CardBody.jsx";
import CardHeader from "../../../components/Card/CardHeader.jsx";
import CardIcon from "../../../components/Card/CardIcon.jsx";
import GridContainer from "../../../components/Grid/GridContainer.jsx";
import GridItem from "../../../components/Grid/GridItem.jsx";
import CustomInput from "../../../components/CustomInput/CustomInput.jsx";
import CustomSelect from "../../../components/CustomInput/CustomSelect.jsx";
import CustomButton from "../../../components/CustomButtons/Button.jsx";
import green from "@material-ui/core/colors/green";
import Fab from "@material-ui/core/Fab";
import CheckIcon from "@material-ui/icons/Check";
import SaveIcon from "@material-ui/icons/Save";
import { clientesActions } from "../../../_actions/Fiscal/clientes.actions";
import { integracaoActions } from "../../../_actions/Fiscal/integracao.actions";
import CircularProgress from "@material-ui/core/CircularProgress";
import BaseValidacao from "../Integracao/BaseValidacao";
import "moment/locale/pt-br";
var moment = require("moment");
moment.locale("pt-br");

const styles = theme => ({
  root: {
    display: "flex",
    alignItems: "center"
  },
  cardAction: {
    float: "right",
    margin: theme.spacing.unit,
    position: "absolute",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: "relative"
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700]
    }
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    right: -6,
    zIndex: 1
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

class Base extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      seqclientes: "",
      clientes:[],
      integracoes: [],
      loading: false,
      loadingCadastro: false,
      success: false,
      produtos: [],
      filtro: false
    };

    this.props.dispatch(
      clientesActions.getAll(this.props.authentication.user.seqconta)
    );

    this.validate = this.validate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    //  this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;

    this.setState({ [name]: value });
    //this.validate(e);
  }

  validate(e) {
    const { name, value } = e.target;
  }

  execInportacao() {
    this.props.dispatch(integracaoActions.execIntegracaoClienteOracle(this.state.seqclientes));
  }  

  carregaComboClientes() {
    
      return this.state.clientes.map((prop, key) => {
        return {
          label: prop.nome,
          value: prop.id
        };
      });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.integracao !== this.props.integracao) { 
      this.setState({   
        //produtos: nextProps.integracao.produtos,    
        loading: nextProps.integracao.loading,
        success: !nextProps.integracao.loading,
        loadingCadastro: nextProps.integracao.loadingCadastro
      });  
    }

    if(nextProps.clientes.clientes !== this.props.clientes.clientes){
       this.setState({
         clientes: nextProps.clientes.clientes
       })
    }
  }

  filtroGrid()
  { 
     this.setState({
       filtro: true
     });
  }


  handleButtonClick = () => {
    if (this.state.seqclientes) this.execInportacao();
  };

  render() {
    const { classes } = this.props;
    const { seqclientes } = this.state;

    const buttonClassname = classNames({
      [classes.buttonSuccess]: this.state.success
    });

    return (
      <GridContainer container justify="flex-start" alignItems="center">
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <LibraryBooks />
              </CardIcon>
            </CardHeader>
            <CardBody>
              <form name="form" onSubmit={this.handleSubmit} ref="form">
                <GridContainer container justify="center" alignItems="center">
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomSelect
                      labelText="CLIENTES"
                      value={seqclientes}
                      onChange={(e) => { this.handleChange(e); this.filtroGrid(); }}
                      MenuProps={{ className: classes.selectMenu }}
                      className={classes.selectFormControl}
                      formControlProps={{
                        fullWidth: true
                      }}
                      name="seqclientes"
                      id="seqclientes"
                      error={this.state.seqclientesError}
                      classesList={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelectedMultiple
                      }}
                      options={this.carregaComboClientes()}
                      helpText={this.state.seqclientesMessage}
                    />
                  </GridItem>
                  <GridItem>
                    <div className={classes.root}>
                      {/* <div className={classes.wrapper}>
                        <Fab
                          color="primary"
                          className={buttonClassname}
                          title="Atualizar Base"
                          onClick={this.handleButtonClick}
                        >
                          {this.state.success ? <CheckIcon /> : <SaveIcon />}
                        </Fab>
                        {this.state.loading && (
                          <CircularProgress
                            size={68}
                            className={classes.fabProgress}
                          />
                        )}
                      </div> */}
                      <div className={classes.wrapper}>
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.buttonClassname}
                          disabled={this.state.loading}
                          onClick={this.handleButtonClick}
                        >
                          Atualizar Base
                        </Button>
                        {this.state.loading && (
                          <CircularProgress
                            size={24}
                            className={classes.buttonProgress}
                          />
                        )}
                      </div>
                    </div>
                  </GridItem>
                </GridContainer>
              </form>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={12} >
          {this.state.seqclientes &&
             <BaseValidacao seqclientes={this.state.seqclientes} filtro={this.state.filtro}/>
          }
        </GridItem>
      </GridContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    alert: state.alert,
    clientes: state.clientes,
    integracao: state.integracao,
    base: state.base,
    authentication: state.authentication.user
  };
};

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(Base);
