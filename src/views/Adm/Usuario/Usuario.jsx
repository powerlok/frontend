import React from "react";
import { connect } from 'react-redux';
import compose from 'recompose/compose';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import { userActions } from '../../../_actions/user.actions';

// core components
import GridContainer from "./../../../components/Grid/GridContainer.jsx";
import GridItem from "./../../../components/Grid/GridItem.jsx";
import CustomInput from "./../../../components/CustomInput/CustomInput.jsx";
import CustomButton from "./../../../components/CustomButtons/Button.jsx";
import Card from "./../../../components/Card/Card.jsx";
import CardHeader from "./../../../components/Card/CardHeader.jsx";
import CardBody from "./../../../components/Card/CardBody.jsx";
import CustomSelect from "./../../../components/CustomInput/CustomSelect.jsx";
import CardIcon from "./../../../components/Card/CardIcon.jsx";
//import UsuarioFormsStyle from "./../../../assets/jss/material-dashboard-pro-react/views/cadastros/centrocusto/centrocusto.jsx";
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import avatar from '../../../assets/img/faces/avatar.png';
import ImageUpload from "./../../../components/CustomUpload/ImageUpload.jsx";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    bigAvatar: {
        margin: 0,
        width: '80px !important',
        height: '80px !important',
    },
    checkboxLabel: {
        fontSize: '10px',
        fontWeight: 'bold'
      }
  //  ...UsuarioFormsStyle
});

class Usuario extends React.Component {
    constructor(props) {
        super(props);

        this.initialState = {
            open: false,
            users: [],
            id: 0,
            nome: '',
            email: '',
            basico: false,
            trader: false,
            fiscal: false,
            administrador: false,
            foto: '',
            status: 'A',
            senha: ''
        };

        this.state = this.initialState;

        this.validate = this.validate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleVoltar = this.handleVoltar.bind(this);
        this.optionsStatus = [{ label: "Ativo", value: "A" }, { label: "Inativo", value: "I" }];

        
    }

    componentWillMount() {
        if (this.props.history.location.state) {
            let id = this.props.history.location.state.param;

            this.loadData(id);
        }
    }

    loadData = (id) => {
        
        this.props.dispatch(userActions.getUserId(id));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user !== this.props.user) { 
            this.setState({
                id: nextProps.user.users.id,
                nome: nextProps.user.users.nome,
                email: nextProps.user.users.email,
                basico: nextProps.user.users.basico,
                trader: nextProps.user.users.trader,
                fiscal: nextProps.user.users.fiscal,
                administrador: nextProps.user.users.administrador,
                status: nextProps.user.users.status,
                foto: nextProps.user.users.foto
            });
        }

        if (nextProps.alert !== this.props.alert) {
            if (this.state.id === 0 && nextProps.alert.type === 'success') this.setState(() => this.initialState);
            if (this.state.id > 0 && nextProps.alert.type === 'success') this.loadData(this.state.id);
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const { id, nome, email, basico, trader, fiscal, administrador, foto, status, senha } = this.state;
        const { dispatch, authentication } = this.props;

        var seqconta = authentication.user.seqconta;

        if (this.isInvalid() === false) {
           
            dispatch(userActions.add(JSON.stringify({ id, nome, email, seqconta, basico, trader, fiscal, administrador, foto, status, senha })));            

        }
    }

    handleVoltar() {
        this.props.history.push("/admin/adm/usuario/usuariolista");
    }

    handleChange(e) {
        const { name, value, type, checked } = e.target;

        this.validate(e);

        if(type == "checkbox"){
           this.setState({ [name]: checked });
        }else{ 
           this.setState({ [name]: value });
        }
    }


    validate(e) {

        const { name, value } = e.target;

        if (name !== undefined) {

            if (!value || (name == 'nome' && value.length == 0)) {
                return this.setState({ [`${name}Error`]: true, [`${name}Message`]: "Campo obrigatório" });
            }

            if (!value || (name == 'email' && value.length == 0)) {
                return this.setState({ [`${name}Error`]: true, [`${name}Message`]: "Campo obrigatório" });
            }
        }

        this.setState({ [`${name}Error`]: false, [`${name}Message`]: null });

    }

    isInvalid = () => {

        const { nome, email, nomeError, emailError } = this.state;

        return !(
            nome &&
            email &&
            !nomeError &&
            !emailError
        );
    }

    render() {
        const { classes } = this.props;
        const { id, nome, email, basico, trader, fiscal, administrador, foto, status, senha } = this.state;

        return (
            <GridContainer container
                direction="column"
                justify="flex-start"
                alignItems="center">
                <GridItem xs={12} sm={12} md={5}>
                    <Card>
                        <CardHeader color="rose" icon>
                            <CardIcon color="rose">
                                <LibraryBooks />
                            </CardIcon>
                        </CardHeader>
                        <CardBody>
                            <form name="form" onSubmit={this.handleSubmit} ref="form">
                                <GridContainer>
                                <GridItem container justify="center" alignItems="center">
                                <ImageUpload
                                    basic
                                    css={ classes.bigAvatar}
                                    change={(e) => { this.setState({ foto: e })}}
                                    foto={(foto != undefined) ? foto : avatar }
                                    addButtonProps={{
                                        color: "rose",
                                        round: true
                                    }}
                                    changeButtonProps={{
                                        color: "rose",
                                        round: true
                                    }}
                                    removeButtonProps={{
                                        color: "danger",
                                        round: true
                                    }}
                                    />
                                {/* <Avatar alt="Foto" src={(foto != undefined) ? foto : avatar } className={classes.bigAvatar} /> */}
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12}>
                                        <CustomInput
                                            labelText="ID"
                                            id="id"
                                            required={true}
                                            value={`${id}`}
                                            name="id"
                                            onChange={this.handleChange}
                                            onBlur={this.validate}
                                            formControlProps={{
                                                fullWidth: true,
                                                disabled: true
                                            }}
                                            inputProps={{
                                                type: "text"
                                            }}
                                            error={this.state.idError}
                                            helpText={this.state.idMessage}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <CustomInput
                                            labelText="NOME"
                                            id="nome"
                                            required={true}
                                            value={`${nome}`}
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
                                            labelText="EMAIL"
                                            id="email"
                                            required={true}
                                            value={`${email}`}
                                            name="email"
                                            onChange={this.handleChange}
                                            onBlur={this.validate}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: "text"
                                            }}
                                            error={this.state.emailError}
                                            helpText={this.state.emailMessage}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <CustomSelect
                                            labelText="STATUS"
                                            value={status}
                                            onChange={this.handleChange}
                                            MenuProps={{ className: classes.selectMenu }}
                                            className={classes.selectFormControl}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            name="status"
                                            id="status"
                                            error={this.state.statusError}
                                            classesList={{
                                                root: classes.selectMenuItem,
                                                selected: classes.selectMenuItemSelectedMultiple
                                            }}
                                            options={this.optionsStatus}
                                            helpText={this.state.statusMessage}
                                        />
                                    </GridItem>
                                    <GridItem>
                                    <CustomInput
                                            labelText="SENHA"
                                            id="senha"
                                            value={senha}
                                            required={false}
                                            name="senha"
                                            onChange={this.handleChange}
                                            onBlur={this.validate}
                                            formControlProps={{
                                                fullWidth: true
                                            }}       
                                            inputProps={{
                                                autoComplete: 'new-password'
                                            }}                                                                             
                                            type="password"
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={12} className={classes.checkboxLabel}>
                                    BASICO
                                    <Checkbox
                                    checked={basico}
                                    name="basico"
                                    onChange={this.handleChange}
                                    />
                                    TRADER
                                     <Checkbox
                                      name="trader"
                                      checked={trader}
                                      onChange={this.handleChange}
                                    />                                   
                                    FISCAL
                                    <Checkbox
                                     name="fiscal"
                                     checked={fiscal}
                                     onChange={this.handleChange}
                                    />
                                    ADMINISTRADOR
                                     <Checkbox
                                      name="administrador"
                                      checked={administrador}
                                      onChange={this.handleChange}
                                    />
                                    </GridItem>
                                </GridContainer>
                                <GridContainer container
                                    direction="column"
                                    justify="flex-start"
                                    alignItems="center">
                                    <GridItem xs={12} sm={12} md={12}>
                                        <Button color="default" type="button" className={classes.button} onClick={this.handleVoltar}>Lista</Button>
                                        <CustomButton color="rose" type="submit" disabled={this.isInvalid()}>Salvar</CustomButton>
                                    </GridItem>
                                </GridContainer>
                            </form>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        alert: state.alert,
        user: state.user,
        authentication: state.authentication.user
    }
}

export default compose(
    connect(mapStateToProps),
    withStyles(styles)
)(Usuario);




// WEBPACK FOOTER //
// ./src/views/Forms/RegularForms.jsx