import React from "react";
import { connect } from 'react-redux';
import compose from 'recompose/compose';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';
import LibraryBooks from "@material-ui/icons/LibraryBooks";
// core components
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import CustomInput from "../../../components/CustomInput/CustomInput";
import Card from "../../../components/Card/Card";
import CardHeader from "../../../components/Card/CardHeader";
import CardBody from "../../../components/Card/CardBody";
import CustomSelect from "../../../components/CustomInput/CustomSelect";
import CardIcon from "../../../components/Card/CardIcon";
import MovimentacaoFormsStyle from "../../../assets/jss/material-dashboard-pro-react/views/cadastros/movimentacao/movimentacao";
import { contaCorrenteActions } from '../../../_actions/contacorrente.actions';
import { movimentacaoActions } from '../../../_actions/movimentacao.actions';
import CustomTextField from '../../../components/CustomInput/CustomTextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

var moment = require('moment');

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1
    },
    cardAction: {
        float: "right",
        margin: "-4px",
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
    ...MovimentacaoFormsStyle
});

class MovimentacaoOperador extends React.Component {
    constructor(props) {
        super(props);

        this.initialState = {
            id: 0,
            data: moment(new Date()).format('YYYY-MM-DD'),
            historico: '',
            valor: 0,
            dc: ''
        };

        this.state = this.initialState;

        this.props.dispatch(contaCorrenteActions.getAll(this.props.authentication.user.seqconta));

        this.dc = [{ label: "Débito", value: "O"}, { label: "Crédito", value: "D"}];

        this.validate = this.validate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentWillReceiveProps(nextProps) {
       /* if (nextProps.movimentacaoOperador !== this.props.movimentacaoOperador) {
            this.setState({
                id: nextProps.movimentacaoOperador.id
            });
        }*/

        if (nextProps.alert !== this.props.alert) {
            if (this.state.id == '0' && nextProps.alert.type === 'success') {
                this.setState(() => this.initialState);
            }

            if (nextProps.alert.type == 'success') {
                this.props.onClose();
            }
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const { id, historico, valor, data, dc } = this.state;
        const { dispatch, authentication, seqcontacorrente } = this.props;

        var seqconta = authentication.user.seqconta;

        if (this.isInvalid() === false) {

            dispatch(movimentacaoActions.addMovCC(JSON.stringify({ id, historico, seqcontacorrente, valor, data, seqconta, dc })));

        }
    }

    handleChange(e) {
        const { name, value } = e.target;

        this.validate(e);

        this.setState({ [name]: value });
    }

    validate(e) {

        const { name, value } = e.target;

        if (name !== undefined) {

            if (name == 'historico' && value.length == 0 || value.length > 100) {
                return this.setState({ [`${name}Error`]: true, [`${name}Message`]: "Campo obrigatório" });
            }

            if (name == 'dc' && value.length == 0) {
                return this.setState({ [`${name}Error`]: true, [`${name}Message`]: "Campo obrigatório" });
            }

            if (name == 'data' && value.length == 0) {
                return this.setState({ [`${name}Error`]: true, [`${name}Message`]: "Campo obrigatório" });
            }

            if (name == 'valor' && value == 0 || value.length == 0 || value.length > 20) {
                return this.setState({ [`${name}Error`]: true, [`${name}Message`]: "Campo obrigatório" });
            }
        }

        this.setState({ [`${name}Error`]: false, [`${name}Message`]: null });

    }

    isInvalid = () => {

        const { historico, valor, data, dc, historicoError, valorError, dcError } = this.state;

        return !(
            historico &&
            valor &&
            data &&
            dc &&
            !historicoError &&
            !valorError &&
            !dcError
        );
    }

    render() {
        const { classes, error, loading } = this.props;
        const { id, historico, valor, data, dc } = this.state;

        return (
            <div>
                <form name="form" onSubmit={this.handleSubmit} ref="form">
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton color="inherit" onClick={this.props.onClose} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography color="inherit" className={classes.flex}>
                                Conta Corrente
                                        </Typography>
                            <Button color="inherit" type="submit" disabled={this.isInvalid()}>
                                salvar
                                        </Button>
                        </Toolbar>
                    </AppBar>
                    <GridContainer container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        style={{
                            padding: '0 15px 0 15px'
                        }}>
                        <GridItem xs={12} sm={12} md={9}>
                            <Card>
                                <CardHeader color="rose" icon>
                                    <CardIcon color="rose">
                                        <LibraryBooks />
                                    </CardIcon>
                                </CardHeader>
                                <CardBody>

                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={5}>
                                            <CustomInput
                                                labelText="HISTORICO"
                                                id="historico"
                                                required={true}
                                                value={historico}
                                                name="historico"
                                                onChange={this.handleChange}
                                                onBlur={this.validate}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    type: "text",
                                                    maxLength: 100
                                                }}
                                                error={this.state.historicoError}
                                                helpText={this.state.historicoMessage}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={2}>
                                            <CustomTextField
                                                labelText="DATA"
                                                id="data"
                                                required={true}
                                                value={data}
                                                name="data"
                                                type="date"
                                                onChange={this.handleChange}
                                                onBlur={this.validate}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                error={this.state.dataError}
                                                helpText={this.state.dataMessage}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}>
                                            <CustomSelect
                                                labelText="Débito/Crédito"
                                                value={dc}
                                                onChange={this.handleChange}
                                                MenuProps={{ className: classes.selectMenu }}
                                                className={classes.selectFormControl}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                name="dc"
                                                id="dc"
                                                error={this.state.dcError}
                                                classesList={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelectedMultiple
                                                }}
                                                options={this.dc}
                                                helpText={this.state.dcMessage}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={2}>
                                            <CustomInput
                                                labelText="VALOR"
                                                id="valor"
                                                required={true}
                                                value={valor}
                                                name="valor"
                                                onChange={this.handleChange}
                                                onBlur={this.validate}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                type="number"
                                                error={this.state.valorError}
                                                helpText={this.state.valorMessage}
                                            >
                                            </CustomInput>
                                        </GridItem>
                                    </GridContainer>

                                </CardBody>
                            </Card>

                        </GridItem>
                    </GridContainer >
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        alert: state.alert,
        contacorrente: state.contacorrente,
        authentication: state.authentication.user

    }
}

export default compose(
    connect(mapStateToProps),
    withStyles(styles)
)(MovimentacaoOperador);




// WEBPACK FOOTER //
// ./src/views/Forms/RegularForms.jsx