import React from "react";
import { connect } from "react-redux";
import compose from "recompose/compose";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";

// core components
import GridContainer from "../../../../components/Grid/GridContainer.jsx";
import GridItem from "../../../../components/Grid/GridItem.jsx";
import LoadingOverlay from "react-loading-overlay";

import "moment/locale/pt-br";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Card from "../../../../components/Card/Card.jsx";
import CardBody from "../../../../components/Card/CardBody.jsx";
import CardHeader from "../../../../components/Card/CardHeader.jsx";
import CardIcon from "../../../../components/Card/CardIcon.jsx";
import CustomInput from "../../../../components/CustomInput/CustomInput.jsx";
import CustomSelect from "../../../../components/CustomInput/CustomSelect.jsx";
import CustomButton from "../../../../components/CustomButtons/Button.jsx";
import { Button } from "@material-ui/core";
import { produtoActions } from "../../../../_actions/Fiscal/produto.actions";
var moment = require("moment");
moment.locale("pt-br");

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  buttonTeste: {
    margin: theme.spacing.unit,
    marginLeft: "-20px"
  }
});

class Produto extends React.Component {
  constructor(props) {
    super(props);

    this.initialState = {
      id: "0",
      produtos:[],
      tipcodigos:[],
      descricao: "",
      seqcliente: "",
      loading: false,
      codacesso: '',
      tipcodigo: ''
    };

    this.state = this.initialState;

    this.validate = this.validate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleVoltar = this.handleVoltar.bind(this);
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

  loadData = id => {
    if(id) this.props.dispatch(produtoActions.getById(id));
  };

  componentWillMount() {
    if (this.props.history.location.state) {
      let param = this.props.history.location.state;

      this.loadData(param.id);
    }
  }

  componentWillReceiveProps(nextProps) { 
    if (nextProps.produto !== this.props.produto) {
      this.setState({
        loading: nextProps.produto.loading,
        tipcodigos: nextProps.produto.tipcodigos
      });
    }
    if (nextProps.produto.produtos !== this.props.produto.produtos) {      
      this.setState({
        id: nextProps.produto.produtos.id,
        seqcliente: nextProps.produto.produtos.seqcliente,
        descricao: nextProps.produto.produtos.descricao,
        codacesso: nextProps.produto.produtos.codacesso,
        tipcodigo: nextProps.produto.produtos.tipcodigo
      });
    }

    if (nextProps.alert !== this.props.alert) {
      if (this.state.id === "0" && nextProps.alert.type === "success")
        this.setState(() => this.initialState);
    }
  }

  handleVoltar() {
    if(this.state.id > 0) {
      this.props.history.push("/admin/fiscal/cadastros/produtos/produtolista", {
        id: this.props.history.location.state.id
      });
    }else{
      this.props.history.push("/admin/fiscal/cadastros/produtos/produtolista");
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { id,  descricao, codacesso, seqcliente, tipcodigo } = this.state;
    const { dispatch, authentication } = this.props;
    var seqconta = this.props.authentication.user.seqconta;
 
    if (this.isInvalid() == false) { 
      dispatch(
        produtoActions.add(
          JSON.stringify({
            id,
            descricao,
            seqconta,
            codacesso,
            seqcliente,
            tipcodigo
          })
        )
      );
    }
  }

  handleChange(e) {
    const { name, value } = e.target;

    this.setState({ [name]: value });

    this.validate(e);
  }

  validate(e) {
    const { name, value } = e.target;

    if (name != undefined) {
      if (!value || (name == "descricao" && value.length == 0)) {
        return this.setState({
          [`${name}Error`]: true,
          [`${name}Message`]: "Campo obrigatório"
        });
      }

      if (!value || (name == "descricao" && value.length > 80)) {
        return this.setState({
          [`${name}Error`]: true,
          [`${name}Message`]: "O Nome não pode ser maior do que 255 caracters"
        });
      }

      if (!value || (name == "codacesso" && value.length == 0)) {
        return this.setState({
          [`${name}Error`]: true,
          [`${name}Message`]: "Campo obrigatório"
        });
      }

      if (!value || (name == "codacesso" && value.length > 50)) {
        return this.setState({
          [`${name}Error`]: true,
          [`${name}Message`]: "O CodAcesso não pode ser maior do que 50 caracters"
        });
      }

      if (!value || (name == "tipcodigo" && value.length == 0)) {
        return this.setState({
          [`${name}Error`]: true,
          [`${name}Message`]: "Campo obrigatório"
        });
      }

      this.setState({ [`${name}Error`]: false, [`${name}Message`]: null });
    }
  }

  isInvalid = () => {
    const { descricao, tipcodigo, codacesso, descricaoError, tipcodigoError, codacessoError } = this.state;
    return !(descricao && tipcodigo && codacesso && !descricaoError && !tipcodigoError && !codacessoError);
  };

  render() {
    const { classes } = this.props;
    const { id, descricao, codacesso, tipcodigo } = this.state;

    return (
      <div>
        <GridContainer
          containe
          direction="column"
          justify="flex-start"
          alignItems="center"
        >
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="rose" icon>
                <CardIcon color="rose">
                  <LibraryBooks />
                </CardIcon>
              </CardHeader>
              <CardBody>
                <form name="form" onSubmit={this.handleSubmit} ref="form">
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="CÓD PRODUTO"
                        id="id"
                        required={true}
                        value={`${id}`}
                        name="id"
                        onChange={this.handleChange}
                        onBlur={this.validate}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          disabled: true
                        }}
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
                  <GridContainer
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                  >
                    <GridItem xs={12} sm={12} md={12}>
                      <Button
                        color="default"
                        type="button"
                        className={classes.button}
                        onClick={this.handleVoltar}
                      >
                        Lista
                      </Button>
                      <CustomButton
                        color="rose"
                        type="submit"
                        disabled={this.isInvalid()}
                      >
                        Salvar
                      </CustomButton>
                    </GridItem>
                  </GridContainer>
                </form>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

const mapStateToProps = state => { 
  return {
    alert: state.alert,
    clientes: state.clientes,
    produto: state.produto,
    authentication: state.authentication.user
  };
};

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(Produto);
