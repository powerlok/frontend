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
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import LoadingOverlay from "react-loading-overlay";

import "moment/locale/pt-br";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Card from "../../../../components/Card/Card.jsx";
import CardBody from "../../../../components/Card/CardBody.jsx";
import CardHeader from "../../../../components/Card/CardHeader.jsx";
import CardIcon from "../../../../components/Card/CardIcon.jsx";
import CustomInput from "../../../../components/CustomInput/CustomInput.jsx";
import CustomButton from "../../../../components/CustomButtons/Button.jsx";
import { Button } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { clientesActions } from "../../../../_actions/Fiscal/clientes.actions";

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

class Cliente extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      nome: "",
      matriz: "",
      sistema: "",
      ip: "",
      porta: "",
      servico: "",
      usuario: "",
      senha: "",
      showPassword: false,
      conexaoOracle: "",
      loading: false
    };

    this.handleTestarConexao = this.handleTestarConexao.bind(this);
    this.validate = this.validate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleVoltar = this.handleVoltar.bind(this);
  }

  loadData = id => {
    this.props.dispatch(clientesActions.getById(id));
  };

  componentWillMount() {
    if (this.props.history.location.state) {
      let id = this.props.history.location.state.param;

      this.loadData(id);
    }
  }

  componentWillReceiveProps(nextProps) { 
    if (nextProps.clientes !== this.props.clientes) { console.log(nextProps.clientes.loading);
      this.setState({
        conexaoOracle: nextProps.clientes.conexaoOracle,
        loading: nextProps.clientes.loading
      });
    }

    if (nextProps.clientes.clientes !== this.props.clientes.clientes) {
      this.setState({
        id: nextProps.clientes.clientes.id,
        nome: nextProps.clientes.clientes.nome,
        matriz: nextProps.clientes.clientes.matriz,
        sistema: nextProps.clientes.clientes.sistema,
        ip: nextProps.clientes.clientes.ip,
        porta: nextProps.clientes.clientes.porta,
        servico: nextProps.clientes.clientes.servico,
        usuario: nextProps.clientes.clientes.usuario,
        senha: nextProps.clientes.clientes.senha
      });
    }

    if (nextProps.alert !== this.props.alert) {
      if (this.state.id === "0" && nextProps.alert.type === "success")
        this.setState(() => this.initialState);
    }
  }

  handleTestarConexao() {
    const { usuario, senha, porta, ip, servico } = this.state;

    this.props.dispatch(
      clientesActions.getConexaoOracle(
        JSON.stringify({ usuario, senha, porta, ip, servico })
      )
    );
  }

  handleVoltar() {
    this.props.history.push("/admin/fiscal/cadastros/clientes/clientelista");
  }

  handleSubmit(e) {
    e.preventDefault();
    const {
      id,
      nome,
      matriz,
      sistema,
      ip,
      porta,
      servico,
      usuario,
      senha
    } = this.state;
    const { dispatch, authentication } = this.props;

    var seqconta = authentication.user.seqconta;

    if (this.isInvalid() == false) {
      dispatch(
        clientesActions.add(
          JSON.stringify({
            id,
            nome,
            matriz,
            sistema,
            ip,
            porta,
            servico,
            usuario,
            senha,
            seqconta
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
      if (!value || (name == "nome" && value.length == 0)) {
        return this.setState({
          [`${name}Error`]: true,
          [`${name}Message`]: "Campo obrigatório"
        });
      }

      if (!value || (name == "nome" && value.length > 80)) {
        return this.setState({
          [`${name}Error`]: true,
          [`${name}Message`]: "O Nome não pode ser maior do que 80 caracters"
        });
      }

      if (!value || (name == "matriz" && value.length == 0)) {
        return this.setState({
          [`${name}Error`]: true,
          [`${name}Message`]: "A Matriz deve ter no máximo 14 caracters"
        });
      }

      if (!value || (name == "matriz" && value.length > 14)) {
        return this.setState({
          [`${name}Error`]: true,
          [`${name}Message`]: "A Matriz deve ter no máximo 14 caracters"
        });
      }

      if (!value || (name == "sistema" && value.length == 0)) {
        return this.setState({
          [`${name}Error`]: true,
          [`${name}Message`]: "Campo obrigatório"
        });
      }

      if (!value || (name == "sistema" && value.length > 80)) {
        return this.setState({
          [`${name}Error`]: true,
          [`${name}Message`]: "O campo Sistema deve ter no máximo 80 caracters"
        });
      }

      if (!value || (name == "ip" && value.length == 0)) {
        return this.setState({
          [`${name}Error`]: true,
          [`${name}Message`]: "Campo obrigatório"
        });
      }

      if (!value || (name == "ip" && value.length > 100)) {
        return this.setState({
          [`${name}Error`]: true,
          [`${name}Message`]: "O campo IP deve ter no máximo 20 caracters"
        });
      }

      if (!value || (name == "servico" && value.length == 0)) {
        return this.setState({
          [`${name}Error`]: true,
          [`${name}Message`]: "Campo obrigatório"
        });
      }

      if (!value || (name == "servico" && value.length > 50)) {
        return this.setState({
          [`${name}Error`]: true,
          [`${name}Message`]: "O campo Serviço deve ter no máximo 50 caracters"
        });
      }

      if (!value || (name == "usuario" && value.length == 0)) {
        return this.setState({
          [`${name}Error`]: true,
          [`${name}Message`]: "Campo obrigatório"
        });
      }

      if (!value || (name == "usuario" && value.length > 30)) {
        return this.setState({
          [`${name}Error`]: true,
          [`${name}Message`]: "O campo Usuário deve ter no máximo 30 caracters"
        });
      }

      if (!value || (name == "senha" && value.length == 0)) {
        return this.setState({
          [`${name}Error`]: true,
          [`${name}Message`]: "Campo obrigatório"
        });
      }

      if (!value || (name == "senha" && value.length > 20)) {
        return this.setState({
          [`${name}Error`]: true,
          [`${name}Message`]: "O campo Senha deve ter no máximo 20 caracters"
        });
      }
    }

    this.setState({ [`${name}Error`]: false, [`${name}Message`]: null });
  }

  isInvalid = () => {
    const {
      nome,
      matriz,
      sistema,
      ip,
      porta,
      servico,
      usuario,
      senha,
      nomeError,
      matrizError,
      sistemaError,
      ipError,
      portaError,
      servicoError,
      usuarioError,
      senhaError
    } = this.state;

    return !(
      nome &&
      matriz &&
      sistema &&
      ip &&
      porta &&
      servico &&
      usuario &&
      senha &&
      !nomeError &&
      !matrizError &&
      !sistemaError &&
      !ipError &&
      !portaError &&
      !servicoError &&
      !usuarioError &&
      !senhaError
    );
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    const { classes } = this.props;
    const {
      nome,
      matriz,
      sistema,
      ip,
      porta,
      servico,
      usuario,
      senha
    } = this.state;

    return (
      <div>
        <GridContainer
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
        >
          <GridItem xs={12} sm={12} md={6}>
            <LoadingOverlay
              active={this.state.loading}
              spinner
              text="Carregando..."
            >
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
                          labelText="NOME"
                          id="nome"
                          required={true}
                          value={nome}
                          name="nome"
                          onChange={this.handleChange}
                          onBlur={this.validate}
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            type: "text"
                          }}
                          error={this.state.nomeError}
                          helpText={this.state.nomeMessage}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                        <CustomInput
                          labelText="MATRIZ"
                          id="matriz"
                          required={true}
                          value={matriz}
                          name="matriz"
                          onChange={this.handleChange}
                          onBlur={this.validate}
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            type: "text"
                          }}
                          error={this.state.matrizeError}
                          helpText={this.state.matrizMessage}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <CustomInput
                          labelText="SISTEMA"
                          id="sistema"
                          required={true}
                          value={sistema}
                          name="sistema"
                          onChange={this.handleChange}
                          onBlur={this.validate}
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            type: "text"
                          }}
                          error={this.state.sistemaError}
                          helpText={this.state.sistemaMessage}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={5}>
                        <CustomInput
                          labelText="IP"
                          id="ip"
                          required={true}
                          value={ip}
                          name="ip"
                          onChange={this.handleChange}
                          onBlur={this.validate}
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            type: "text"
                          }}
                          error={this.state.ipError}
                          helpText={this.state.ipMessage}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={2}>
                        <CustomInput
                          labelText="PORTA"
                          id="porta"
                          required={true}
                          value={porta}
                          name="porta"
                          onChange={this.handleChange}
                          onBlur={this.validate}
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            type: "text"
                          }}
                          error={this.state.portaError}
                          helpText={this.state.portaMessage}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={3}>
                        <CustomInput
                          labelText="Nome Serviço"
                          id="servico"
                          required={true}
                          value={servico}
                          name="servico"
                          onChange={this.handleChange}
                          onBlur={this.validate}
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            type: "text"
                          }}
                          error={this.state.servicoError}
                          helpText={this.state.servicoMessage}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <CustomInput
                          labelText="USUÁRIO"
                          id="usuario"
                          required={true}
                          value={usuario}
                          name="usuario"
                          onChange={this.handleChange}
                          onBlur={this.validate}
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            type: "text"
                          }}
                          error={this.state.usuarioError}
                          helpText={this.state.usuarioMessage}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                          labelText="SENHA"
                          id="senha"
                          required={true}
                          value={senha}
                          name="senha"
                          type={this.state.showPassword ? "text" : "password"}
                          onChange={this.handleChange}
                          onBlur={this.validate}
                          formControlProps={{
                            fullWidth: true
                          }}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="Toggle password visibility"
                                onClick={this.handleClickShowPassword}
                              >
                                {this.state.showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          error={this.state.senhaError}
                          helpText={this.state.senhaMessage}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={2}>
                        <Button
                          color="default"
                          type="button"
                          className={classes.buttonTeste}
                          onClick={this.handleTestarConexao}
                        >
                          Testar
                        </Button>
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
            </LoadingOverlay>
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
    authentication: state.authentication.user
  };
};

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(Cliente);
