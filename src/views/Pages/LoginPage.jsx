import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import LockIcon from "@material-ui/icons/Lock";
import Avatar from '@material-ui/core/Avatar';
import Email from "@material-ui/icons/Email";
// core components
import GridContainer from "./../../components/Grid/GridContainer.jsx";
import GridItem from "./../../components/Grid/GridItem.jsx";
import CustomInput from "./../../components/CustomInput/CustomInput.jsx";
import Button from "./../../components/CustomButtons/Button.jsx";
import Card from "./../../components/Card/Card.jsx";
import CardBody from "./../../components/Card/CardBody.jsx";
import CardHeader from "./../../components/Card/CardHeader.jsx";
import CardFooter from "./../../components/Card/CardFooter.jsx";
import loginPageStyle from "./../../assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";

import { userActions } from '../../_actions/user.actions';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import OthersAuth from '../../components/Auth/others-auth.jsx';


class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;

    dispatch(userActions.logout());

    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      email: '',
      senha: '',
      loading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
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

  handleChange(e) {
    const { name, value } = e.target;

    this.validate(e);

    this.setState({ [name]: value });
  }

  validate(e) {

    const { name, value } = e.target;

    if (!value || (name === 'email' && value.length == 0)) {
      return this.setState({ [`${name}Error`]: true, [`${name}Message`]: "Campo obrigatório" });
    }

    if (!value || (name === 'senha' && value.length == 0)) {
      return this.setState({ [`${name}Error`]: true, [`${name}Message`]: "Campo obrigatório" });
    }

    this.setState({ [`${name}Error`]: false, [`${name}Message`]: null });

  }

  isInvalid = () => {

    const { email, senha, emailError, senhaError } = this.state;

    return !(
      email &&
      senha &&
      !emailError &&
      !senhaError
    );
  }

  componentWillReceiveProps(nextProps) { 
   if(nextProps.authentication !== this.props.authentication) {
        this.setState({ loading: nextProps.loading });
    }

    if (nextProps.alert !== this.props.alert) {
      if (nextProps.alert.type == 'success') this.setState(() => this.initialState);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, senha } = this.state;
    const { dispatch } = this.props;
    if (email && senha) {
      dispatch(userActions.login(email, senha));
    }
  }

  linkCadastro() {
    this.props.history.push("/pages/register-page");
  }

  render() {
    const { classes } = this.props;
    const { email, senha } = this.state;
    return (
      <div className={classes.container}>

        <form name="form" onSubmit={this.handleSubmit}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>           

              <Card login className={classes[this.state.cardAnimaton]}>
                {<CardHeader
                  className={`${classes.cardHeader} ${classes.textCenter}`}
                >
                  {/* <Avatar className={classes.cardTitle}><LockIcon /></Avatar> */}
                  <div className={classes.socialLine}>
                    <OthersAuth /*color="transparent"*/ round tipo="REGISTER" />
                    <h4 className={classes.socialTitle}>ou </h4>
                  </div>
                </CardHeader>}
                <CardBody>
                  <CustomInput
                   // labelText="E-mail"
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Email"
                    formControlProps={{
                      fullWidth: true
                    }}
                    error={this.state.emailError}
                    value={email}
                    onChange={this.handleChange}
                    onBlur={this.validate}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Email className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      )
                    }}
                    helpText={this.state.emailMessage}
                  />
                  <CustomInput
                   // labelText="Senha"
                    id="senha"
                    type="password"
                    name="senha"
                    formControlProps={{
                      fullWidth: true
                    }}   
                    value={senha}
                    error={this.state.senhaError}
                    onChange={this.handleChange}
                    onBlur={this.validate}
                    inputProps={
                      {
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon className={classes.inputAdornmentIcon}>
                            lock_outline
                          </Icon>
                        </InputAdornment>
                      )
                    }}
                    placeholder="Senha"
                    helpText={this.state.senhaMessage}
                  />
                </CardBody>
                <CardFooter className={classes.justifyContentCenter}>
                  <Button
                    type="submit"
                    fullWidth
                    //variant="raised"
                    color="primary"
                    className={classes.submit}
                  >
                    Entrar
                   </Button>
                  <Button color="rose" simple size="lg" onClick={() => { this.linkCadastro(); }} block>
                    Cadastre-se
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </form>
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return { 
    alert: state.alert, 
    authentication: state.authentication 
  }
}

export default compose(
  connect(mapStateToProps),
  withStyles(loginPageStyle)
)(LoginPage);


// WEBPACK FOOTER //
// ./src/views/Pages/LoginPage.jsx