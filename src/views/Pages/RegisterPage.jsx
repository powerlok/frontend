import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Timeline from "@material-ui/icons/Timeline";
import Code from "@material-ui/icons/Code";
import Group from "@material-ui/icons/Group";
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
import Avatar from '@material-ui/core/Avatar';
import Check from "@material-ui/icons/Check";
import { connect } from 'react-redux';
import compose from 'recompose/compose';

// core components
import GridContainer from "./../../components/Grid/GridContainer.jsx";
import GridItem from "./../../components/Grid/GridItem.jsx";
import Button from "./../../components/CustomButtons/Button.jsx";
import CustomInput from "./../../components/CustomInput/CustomInput.jsx";
import InfoArea from "./../../components/InfoArea/InfoArea.jsx";
import Card from "./../../components/Card/Card.jsx";
import CardBody from "./../../components/Card/CardBody.jsx";
import { userActions } from '../../_actions/user.actions';
import registerPageStyle from "./../../assets/jss/material-dashboard-pro-react/views/registerPageStyle";
import OthersAuth from '../../components/Auth/others-auth.jsx';
import avatar from '../../assets/img/faces/avatar.png';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      cardAnimaton: "cardHidden",
      confirmaTermo: false,
      nome: '',
      email: '',
      senha: '',
      confirmaSenha: '',
      foto: '',
      disabled: false
    };

    this.state = this.initialState;

    //this.handleToggle = this.handleToggle.bind(this);
    this.validate = this.validate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    this.timeOutFunction = setTimeout(
      function () {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }
  /*
    handleToggle(value) {
      const { checked } = this.state;
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
  
      this.setState({
        checked: newChecked
      });
    }*/

  componentWillReceiveProps(nextProps) {
    if (nextProps.alert !== this.props.alert) {
      if (nextProps.alert.type == 'success') this.setState(() => this.initialState);
    }
  }


  handleSubmit(e) {
    e.preventDefault();
    const { nome, email, senha, confirmaSenha } = this.state;
    const { dispatch } = this.props;

    //var seqconta = authentication.user.seqconta;

    if (this.isInvalid() == false) {
      dispatch(userActions.register(JSON.stringify({ nome, email, senha, confirmaSenha })));
    }
  }

  handleChange(e) {
    const { name, value, checked, id } = e.target;
    if (id === 'confirmaTermo') {
      this.setState({ [id]: checked });
    } else {
      this.setState({ [name]: value });
    }

    this.validate();

  }

  validate() {

    if (document.getElementById('nome').value.length == 0) {
      return this.setState({ nomeError: true, nomeMessage: "Campo obrigatório" });
    }

    if (document.getElementById('email').value.length == 0) {
      return this.setState({ emailError: true, emailMessage: "Campo obrigatório" });
    }

    if (document.getElementById('senha').value.length == 0) {
      return this.setState({ senhaError: true, senhaMessage: "Campo obrigatório" });
    }

    if (document.getElementById('confirmaSenha').value.length == 0) {
      return this.setState({ confirmaSenhaError: true, confirmaSenhaMessage: "Campo obrigatório" });
    }

    if (document.getElementById("senha").value !== document.getElementById("confirmaSenha").value) {
      return this.setState({ confirmaSenhaError: true, confirmaSenhaMessage: "Campo confirmação de senha diferente do campo senha" });
    } else {
      this.setState({ senhaError: false, senhaMessage: null, confirmaSenhaError: false, confirmaSenhaMessage: null });
    }

    if (!document.getElementById('confirmaTermo').checked) {
      return this.setState({ confirmaTermoError: true, confirmaTermoMessage: "Campo obrigatório" });
    }


    this.setState({ nomeError: false, nomeMessage: null});
    this.setState({ emailError: false, emailMessage: null });
    this.setState({ senhaError: false, senhaMessage: null});
    this.setState({ confirmaSenhaError: false, confirmaSenhaMessage: null });
    this.setState({ confirmaTermoError: false, confirmaTermoMessage: null });

  }

  isInvalid = () => {

    const { nome, email, senha, confirmaSenha, confirmaTermo, nomeError, emailError, senhaError, confirmaSenhaError, confirmaTermoError } = this.state;

    return !(
      nome &&
      email &&
      senha &&
      confirmaSenha &&
      confirmaTermo &&
      !nomeError &&
      !emailError &&
      !senhaError &&
      !confirmaSenhaError &&
      !confirmaTermoError
    );
  }

  getUserSocialInfo(nome, email, foto, social) {

    this.setState({ disabled: true });
    
    if (social == "FACEBOOK") {
      this.setState({ nome: nome, email: email, foto: foto, senha: '', confirmaSenha: '' });
    } else {
      this.setState({ nome: nome, email: email, foto: foto, senha: '', confirmaSenha: '' });
    }

  }

  voltar() {
    this.props.history.push("/pages/login-page");
  }

  render() {
    const { classes } = this.props;
    const { nome, email, senha, confirmaTermo, confirmaSenha, disabled, confirmaTermoMessage } = this.state;

    return (
      <div className={classes.container} id={'section1'}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10}>
            <Card login className={classes.cardSignup + " " + classes[this.state.cardAnimaton]}>
              <h2 className={classes.cardTitle}>Registro</h2>
              <CardBody>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={5}>
                    <InfoArea
                      title="Movimentações"
                      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus aliquet mattis consequat."
                      icon={Timeline}
                      iconColor="rose"
                    />
                    <InfoArea
                      title="Conta Corrente"
                      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus aliquet mattis consequat."
                      icon={Code}
                      iconColor="primary"
                    />
                    <InfoArea
                      title="Gerenciamento"
                      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus aliquet mattis consequat."
                      icon={Group}
                      iconColor="info"
                    />
                  </GridItem>
                  <GridItem xs={12} sm={8} md={5}>
                    <div className={classes.center}>

                      {/* <OthersAuth tipo="REGISTER" round getUserSocialInfo={(nome, email, foto, social) => this.getUserSocialInfo(nome, email, foto, social)} /> */}

                      {/* <h4 className={classes.socialTitle}>ou </h4> */}
                      {this.state.foto &&
                        <Avatar className={classes.cardFoto}><img className={classes.cardImage} src={(this.state.foto) ? this.state.foto : avatar} alt="..." /></Avatar>
                      }
                    </div>
                    <form className={classes.form} name="form" onSubmit={this.handleSubmit} ref="form">
                      <CustomInput
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customFormControlClasses
                        }}
                        onChange={this.handleChange}
                        onBlur={this.validate}
                        id="nome"
                        value={nome}
                        required={true}
                        name="nome"
                        error={this.state.nomeError}
                        inputProps={{
                          disabled: disabled,
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              className={classes.inputAdornment}
                            >
                              <Face className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                          ),
                          placeholder: "Nome"
                        }}
                        helpText={this.state.nomeMessage}
                      />
                      <CustomInput
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customFormControlClasses
                        }}
                        id="email"
                        required={true}
                        value={email}
                        name="email"
                        onChange={this.handleChange}
                        onBlur={this.validate}
                        error={this.state.emailError}
                        helpText={this.state.emailMessage}
                        inputProps={{
                          disabled: disabled,
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              className={classes.inputAdornment}
                            >
                              <Email className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                          ),
                          placeholder: "Email"
                        }}
                      />
                      <CustomInput
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customFormControlClasses
                        }}
                        id="senha"
                        required={true}
                        value={senha}
                        name="senha"
                        type="password"
                        error={this.state.senhaError}
                        onChange={this.handleChange}
                        onBlur={this.validate}
                        inputProps={{
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              className={classes.inputAdornment}
                            >
                              <Icon className={classes.inputAdornmentIcon}>
                                lock_outline
                              </Icon>
                            </InputAdornment>
                          ),
                          placeholder: "Senha"
                        }}
                        helpText={this.state.senhaMessage}
                      />
                      <CustomInput
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customFormControlClasses
                        }}
                        id="confirmaSenha"
                        required={true}
                        value={confirmaSenha}
                        name="confirmaSenha"
                        type="password"
                        onChange={this.handleChange}
                        onBlur={this.validate}
                        error={this.state.confirmaSenhaError}
                        inputProps={{
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              className={classes.inputAdornment}
                            >
                              <Icon className={classes.inputAdornmentIcon}>
                                lock_outline
                              </Icon>
                            </InputAdornment>
                          ),
                          placeholder: "Confirmação Senha"
                        }}
                        helpText={this.state.confirmaSenhaMessage}
                      />
                      <FormControlLabel
                        classes={{
                          root: classes.checkboxLabelControl,
                          label: classes.checkboxLabel
                        }}
                        control={
                          <Checkbox
                            id="confirmaTermo"
                            required={true}
                            checked={confirmaTermo}
                            error={this.state.confirmaTermoError}
                            onChange={this.handleChange}
                            onBlur={this.validate}
                            tabIndex={-1}
                            // onClick={() => this.handleToggle(1)}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{
                              checked: classes.checked
                            }}
                           // helpText={this.state.confirmaTermoMessage}
                          />
                        }
                        label={
                          <span>
                            Eu aceito {" "}
                            <a href="#pablo">os termos e condições</a>.
                          </span>
                        }
                      />
                      <div className={classes.center}>
                        <Button round color="info" onClick={() => { this.voltar(); }}>
                          Voltar
                        </Button>
                        <Button type="submit" round color="primary" disabled={this.isInvalid()}>
                          Cadastrar
                        </Button>
                      </div>
                    </form>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired
};


const mapStateToProps = (state) => {
  return {
    alert: state.alert,
  }
}

export default compose(
  connect(mapStateToProps),
  withStyles(registerPageStyle)
)(RegisterPage);

// WEBPACK FOOTER //
// ./src/views/Pages/RegisterPage.jsx