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
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CustomInput from "../../../components/CustomInput/CustomInput";
import CustomSelect from "./../../../components/CustomInput/CustomSelect.jsx";
import { produtoActions } from "../../../_actions/Fiscal/produto.actions";

const styles = theme => ({
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  },
  cardAction: {
    float: "right",
    margin: "-4px",
    position: "absolute",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  }
});

class BaseCadastro extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      id: 0,
      tipcodigos: [],
      seqproduto: "",
      descricao: "",
      seqcliente: "",
      codacesso: "",
      tipcodigo: ""
    };

    this.state = this.initialState;

    this.validate = this.validate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.carregaComboTipCodigo = this.carregaComboTipCodigo.bind(this);
    
    this.props.dispatch(produtoActions.get_tipcodigo(this.props.seqcliente));
        
  }

  
  carregaComboTipCodigo() { 
     
    return this.state.tipcodigos.map((prop, key) => {
        return {
            label: prop.descricao,
            value: prop.tipcodigo
        };
    });
  }

  componentWillMount() {
    this.setState({
      seqproduto: this.props.seqproduto,
      descricao: this.props.descricao,
      seqcliente: this.props.seqcliente,
      codacesso: this.props.codacesso ? this.props.codacesso : "",
      tipcodigo: this.props.tipcodigo ? this.props.tipcodigo : ""
    });
  }

  handleChange(e) {
    const { name, value } = e.target;

    this.setState({ [name]: value });
    this.validate(e);
  }

  /*validarProduto() {
    this.props.dispatch(
      integracaoActions.execIntegracaoValidacaoProduto(this.props.seqcliente)
    );
  }*/


  componentWillReceiveProps(nextProps) {
    if (this.props.integracao !== nextProps.integracao) {
      this.setState({
        // produtos: this.props.integracao.produtos,
        //loadingGrid: nextProps.integracao.loadingGrid,
       // loadingValid: nextProps.integracao.loadingValid,
       // loadingExecValidProd: nextProps.integracao.loadingExecValidProd        
      });
    }

    if(this.props.produto.tipcodigos != nextProps.produto.tipcodigos)
    { 
        this.setState({
           tipcodigos: nextProps.produto.tipcodigos
        });
    }

    if (nextProps.alert != this.props.alert) {
      if (nextProps.alert.type == "success") {
        this.props.close();
      }
    }
  }

  validate(e) {
    const { name, value } = e.target;

    if (name !== undefined) {
      if (name == "seqproduto" && value.length == 0) {
        return this.setState({
          [`${name}Error`]: true,
          [`${name}Message`]: "Campo obrigatório"
        });
      }

      if ((name == "descricao" && value.length == 0) || value.length > 255) {
        return this.setState({
          [`${name}Error`]: true,
          [`${name}Message`]: "Campo deve ter pelo menos 1 e no máximo 100 caracteres."
        });
      }
      this.setState({ [`${name}Error`]: false, [`${name}Message`]: null });
    }
  }

  isInvalid = () => {
    const {
      seqproduto,
      descricao,
      seqprodutoError,
      descricaoError
    } = this.state;

    return !(seqproduto && descricao && !seqprodutoError && !descricaoError);
  };

  handleSubmit(e) {
    e.preventDefault();
    const { id, seqproduto, descricao, seqcliente, codacesso, tipcodigo } = this.state;
    const { dispatch, authentication } = this.props;

    if (this.isInvalid() == false) {
      var seqconta = this.props.authentication.user.seqconta;

      dispatch(
        integracaoActions.add(
          JSON.stringify({ id, seqproduto, descricao, seqcliente, seqconta, codacesso, tipcodigo })
        )
      );
    }
  }

  render() {
    const { classes } = this.props;
    const { id, seqproduto, descricao, codacesso, tipcodigo, tipcodigos } = this.state;
    
    return (
      <form name="form" onSubmit={this.handleSubmit} ref="form">
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={this.props.close}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
            <Typography color="inherit" className={classes.flex}>
              {this.props.seqproduto} - {this.props.descricao}
            </Typography>
            <Button color="inherit" type="submit" disabled={this.isInvalid()}>
              salvar
            </Button>
          </Toolbar>
        </AppBar>
        <GridContainer
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
          style={{
            padding: "0 15px 0 15px"
          }}
        >
          <GridItem xs={12} sm={12} md={12}>
            <Card className={classes.cardGrid}>
              <CardHeader />
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="CÓD PRODUTO"
                      id="seqproduto"
                      required={false}
                      value={`${seqproduto}`}
                      name="seqproduto"
                      onChange={this.handleChange}
                      onBlur={this.validate}
                      formControlProps={{
                        fullWidth: true,
                        disabled: true
                      }}
                      inputProps={{
                        type: "text"
                      }}
                      error={this.state.seqprodutoError}
                      helpText={this.state.seqprodutoMessage}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="DESCRIÇÃO"
                      id="descricao"
                      required={true}
                      value={`${descricao}`}
                      name="descricao"
                      onChange={this.handleChange}
                      onBlur={this.validate}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text"
                      }}
                      error={this.state.descricaoError}
                      helpText={this.state.descricaoMessage}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="COD ACESSO"
                      id="codacesso"
                      required={true}
                      value={`${codacesso}`}
                      name="codacesso"
                      onChange={this.handleChange}
                      onBlur={this.validate}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text"
                      }}
                      error={this.state.codacessoError}
                      helpText={this.state.codacessoMessage}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomSelect
                      labelText="TIPO CÓDIGO"
                      value={tipcodigo}
                      onChange={this.handleChange}
                      MenuProps={{ className: classes.selectMenu }}
                      className={classes.selectFormControl}
                      formControlProps={{
                        fullWidth: true
                      }}
                      name="tipcodigo"
                      id="tipcodigo"
                      error={this.state.tipcodigoError}
                      classesList={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelectedMultiple
                      }}
                      options={this.carregaComboTipCodigo()}
                      helpText={this.state.tipcodigoMessage}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </form>
    );
  }
}

const mapStateToProps = state => {
  //console.log(state.grupo);
  return {
    alert: state.alert,
    integracao: state.integracao,
    produto: state.produto,
    authentication: state.authentication.user
  };
};

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(BaseCadastro);

// WEBPACK FOOTER //
// ./src/views/Forms/RegularForms.jsx
