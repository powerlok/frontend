import React from "react";
import { connect } from 'react-redux';
import compose from 'recompose/compose';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import { contaCorrenteActions } from '../../../_actions/contacorrente.actions';
import { bancoActions } from '../../../_actions/banco.actions';
// core components
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import CustomInput from "../../../components/CustomInput/CustomInput";
import CustomButton from "../../../components/CustomButtons/Button";
import Card from "../../../components/Card/Card";
import CardHeader from "../../../components/Card/CardHeader";
import CardBody from "../../../components/Card/CardBody";
import CustomSelect from "../../../components/CustomInput/CustomSelect";
import CardIcon from "../../../components/Card/CardIcon";

import ContaCorrenteFormsStyle from "./../../../assets/jss/material-dashboard-pro-react/views/cadastros/contacorrente/contacorrente.jsx";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    ...ContaCorrenteFormsStyle
});

class ContaCorrente extends React.Component {
    constructor(props) {
        super(props);

        this.initialState  = {
            open: false,
            id: 0,
            descricao: '',
            status: 'A',
            tipo: '',
            agencia: '',
            nroconta: '',
            considerafluxo: 'N',
            banco: ''
        };

        this.state = this.initialState;

        this.props.dispatch(bancoActions.getAll());

        this.optionsStatus = [{ label: "Ativo", value: "A" }, { label: "Inativo", value: "I" }];
        this.optionsTipo = [{ label: "Banco", value: "B" }, { label: "Caixa", value: "C" }];
        this.optionsConsideraFluxo = [{label: "Sim", value: "S"}, {label: "Não", value: "N"}];

        this.validate = this.validate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleVoltar = this.handleVoltar.bind(this);
    }

    loadData = (id) => {
        const { dispatch } = this.props;
        dispatch(contaCorrenteActions.getById(id));
    }

    carregaComboBanco()  { 
        return this.props.banco.bancos.map((prop, key) => {                         
            return {
                label: prop.descricao,
                value: prop.id
            };
        });        
    }

    componentWillMount() {
        if (this.props.history.location.state) {
            let id = this.props.history.location.state.param;

            this.loadData(id);
        }
    }

    componentWillReceiveProps(nextProps) { 
        if(nextProps.contacorrentes !== this.props.contacorrentes){
         this.setState({
             id            : nextProps.contacorrentes.id,
             descricao     : nextProps.contacorrentes.descricao,
             status        : nextProps.contacorrentes.status,
             tipo          : nextProps.contacorrentes.tipo,
             agencia       : nextProps.contacorrentes.agencia,
             nroconta      : nextProps.contacorrentes.nroconta,
             considerafluxo: nextProps.contacorrentes.considerafluxo,
             banco         : parseInt(nextProps.contacorrentes.banco)
         });
        }

        if(nextProps.alert !== this.props.alert){ 
            if(this.state.id == '0' && nextProps.alert.type == 'success') this.setState(() => this.initialState);
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const { id, descricao, status, tipo, agencia, nroconta, considerafluxo, banco } = this.state;
        const { dispatch, authentication } = this.props;
        
        var seqconta = authentication.user.seqconta;

        if (this.isInvalid() == false) {
            dispatch(contaCorrenteActions.add(JSON.stringify({ id, descricao, status, tipo, agencia, nroconta, seqconta, considerafluxo, banco })));           
        }
    }

    handleVoltar() {
        this.props.history.push("/admin/cadastros/contacorrentelista");
    }

    handleChange(e) {
        const { name, value } = e.target;

        this.validate(e);

        this.setState({ [name]: value });
    }

    validate(e) {

        const { name, value } = e.target;

        if (name != undefined) {

            if (!value || (name == 'descricao' && value.length == 0)) {
                return this.setState({ [`${name}Error`]: true, [`${name}Message`]: "Campo obrigatório" });
            } 

            if (!value || (name == 'status' && value.length == 0)) {
                return this.setState({ [`${name}Error`]: true, [`${name}Message`]: "Campo obrigatório" });
            }

            
            if (!value || (name == 'tipo' && value.length == 0)) {
                return this.setState({ [`${name}Error`]: true, [`${name}Message`]: "Campo obrigatório" });
            }

            if (!value || (name == 'banco' && value.length == 0)) {
                return this.setState({ [`${name}Error`]: true, [`${name}Message`]: "Campo obrigatório" });
            }

            
            if (!value || (name == 'agencia' && value.length == 0)) {
                return this.setState({ [`${name}Error`]: true, [`${name}Message`]: "Campo obrigatório" });
            }

            if (!value || (name === 'nroconta' && value.length == 0)) {
                return this.setState({ [`${name}Error`]: true, [`${name}Message`]: "Campo obrigatório" });
            }
        }

        this.setState({ [`${name}Error`]: false, [`${name}Message`]: null });

    }

    isInvalid = () => {

        const { descricao, status, tipo, banco, agencia, nroconta, descricaoError, statusError, tipoError, agenciaError, nrocontaError, bancoError } = this.state;

        return !(
            descricao &&
            status &&
            tipo &&
            agencia &&
            nroconta &&
            banco &&
            !descricaoError &&
            !statusError &&
            !tipoError &&
            !agenciaError &&
            !nrocontaError &&
            !bancoError
        );
    }

    render() {
        const { classes } = this.props;
        const { id, descricao, status, tipo, agencia, nroconta, considerafluxo, banco } = this.state;

        return (
            <GridContainer container
                direction="column"
                justify="flex-start"
                alignItems="center">
                <GridItem xs={12} sm={12} md={4}>
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
                                            labelText="DESCRIÇÃO"
                                            id="descricao"
                                            required={true}
                                            value={descricao}
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
                                        <CustomSelect
                                            labelText="TIPO"
                                            value={tipo}
                                            onChange={this.handleChange}
                                            MenuProps={{ className: classes.selectMenu }}
                                            className={classes.selectFormControl}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            name="tipo"
                                            id="tipo"
                                            error={this.state.tipoError}
                                            classesList={{
                                                root: classes.selectMenuItem,
                                                selected: classes.selectMenuItemSelectedMultiple
                                            }}
                                            options={this.optionsTipo}
                                            helpText={this.state.tipoMessage}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={12}>
                                    <CustomSelect
                                            labelText="BANCO"
                                            value={banco}
                                            onChange={this.handleChange}
                                            MenuProps={{ className: classes.selectMenu }}
                                            className={classes.selectFormControl}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            name="banco"
                                            id="banco"
                                            error={this.state.bancoError}
                                            classesList={{
                                                root: classes.selectMenuItem,
                                                selected: classes.selectMenuItemSelectedMultiple
                                            }}
                                            options={this.carregaComboBanco()}
                                            helpText={this.state.bancoMessage}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <CustomInput
                                            labelText="AGENCIA"
                                            id="agencia"
                                            required={true}
                                            value={agencia}
                                            name="agencia"
                                            onChange={this.handleChange}
                                            onBlur={this.validate}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: "text"
                                            }}
                                            error={this.state.agenciaError}
                                            helpText={this.state.agenciaMessage}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <CustomInput
                                            labelText="CONTA"
                                            id="nroconta"
                                            required={true}
                                            value={nroconta}
                                            name="nroconta"
                                            onChange={this.handleChange}
                                            onBlur={this.validate}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: "text"
                                            }}
                                            error={this.state.nrocontaError}
                                            helpText={this.state.nrocontaMessage}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <CustomSelect
                                            labelText="FLUXO"
                                            value={considerafluxo}
                                            onChange={this.handleChange}
                                            MenuProps={{ className: classes.selectMenu }}
                                            className={classes.selectFormControl}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            name="considerafluxo"
                                            id="considerafluxo"
                                            error={this.state.statusError}
                                            classesList={{
                                                root: classes.selectMenuItem,
                                                selected: classes.selectMenuItemSelectedMultiple
                                            }}
                                            options={this.optionsConsideraFluxo}
                                            helpText={this.state.considerafluxoMessage}
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
        contacorrentes: state.contacorrente.contacorrentes,
        banco: state.banco,
        error: state.contacorrente.error,
        loading: state.contacorrente.loading,
        authentication: state.authentication.user

    }
}

export default compose(
    connect(mapStateToProps),
    withStyles(styles)
)(ContaCorrente);




// WEBPACK FOOTER //
// ./src/views/Forms/RegularForms.jsx