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
            historico: this.props.historico,
            seqmovimentacao: '',
            seqcontacorrente: '',
            valor: (this.props.vlraberto < 0) ? (this.props.vlraberto * -1).toFixed(2) : this.props.vlraberto.toFixed(2),
            processo: this.props.processo
        };

        this.state = this.initialState;

        this.props.dispatch(contaCorrenteActions.getAll(this.props.authentication.user.seqconta));

        this.validate = this.validate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    carregaComboContaCorrente() {
        return this.props.contacorrente.contacorrentes.map((prop, key) => {
            return {
                label: prop.descricao,
                value: prop.id
            };
        });
    }

    /*loadData = (id) => {
        const { dispatch } = this.props;
        dispatch(movimentacaoActions.getById(id));
    }*/

    componentWillReceiveProps(nextProps) {
        if (nextProps.movimentacaoOperador !== this.props.movimentacaoOperador) {
            this.setState({
                id: nextProps.movimentacaoOperador.id
            });
        }

        if (nextProps.alert !== this.props.alert) {
            if (this.state.id === '0' && nextProps.alert.type === 'success') {
                this.setState(() => this.initialState);

            }

            if (nextProps.alert.type === 'success') {
                this.props.onCloseOperacao();
            }
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const { id, historico, seqcontacorrente, valor, data, processo } = this.state;
        const { dispatch, authentication, seqmovimentacao } = this.props;

        var seqconta = authentication.user.seqconta;

        if (this.isInvalid() === false) {
           
            dispatch(movimentacaoActions.addMovOp(JSON.stringify({ id, historico, seqmovimentacao, seqcontacorrente, valor, data, seqconta, processo, alteratudo: 'N' })));
           
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

            if (name == 'seqcontacorrente' && value.length == 0) {
                return this.setState({ [`${name}Error`]: true, [`${name}Message`]: "Campo obrigatório" });
            }

            if (name == 'data' && value.length == 0) {
                return this.setState({ [`${name}Error`]: true, [`${name}Message`]: "Campo obrigatório" });
            }

            if (name == 'valor' && value.length == 0 || value.length > 20) {
                return this.setState({ [`${name}Error`]: true, [`${name}Message`]: "Campo obrigatório" });
            }

            if (name == 'valor' && parseFloat(value) > parseFloat(Math.abs(this.props.vlraberto))) {
                return this.setState({ [`${name}Error`]: true, [`${name}Message`]: "Valor maior do que o valor em aberto." });
            }
        }

        this.setState({ [`${name}Error`]: false, [`${name}Message`]: null });

    }

    isInvalid = () => {

        const { historico, seqcontacorrente, valor, data, historicoError, seqcontacorrenteError, valorError } = this.state;

        return !(
            historico &&
            seqcontacorrente &&
            valor &&
            data &&
            !historicoError &&
            !seqcontacorrenteError &&
            !valorError
        );
    }

    render() {
        const { classes } = this.props;
        const { historico, seqcontacorrente, valor, data } = this.state;

        return (
            <div>
                <form name="form" onSubmit={this.handleSubmit} ref="form">
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton color="inherit" onClick={this.props.onCloseOperacao} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography color="inherit" className={classes.flex}>
                                Operação
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
                                                helpText={this.state.historicolMessage}
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
                                                labelText="CONTA CORRENTE"
                                                value={seqcontacorrente}
                                                onChange={this.handleChange}
                                                MenuProps={{ className: classes.selectMenu }}
                                                className={classes.selectFormControl}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                name="seqcontacorrente"
                                                id="seqcontacorrente"
                                                error={this.state.contaCorrenteError}
                                                classesList={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelectedMultiple
                                                }}
                                                options={this.carregaComboContaCorrente()}
                                                helpText={this.state.seqcontacorrenteMessage}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={2}>
                                            <CustomInput
                                                labelText="VALOR"
                                                id="valor"
                                                required={false}
                                                value={valor}
                                                name="valor"
                                                onChange={this.handleChange}
                                                onBlur={this.validate}
                                                inputProps={{
                                                    maxLength: 10,
                                                }}
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
                        {/* <GridItem xs={12} sm={12} md={12}>
                            <MovimentacaoOperacaoLista seqmovimentacao={this.props.seqmovimentacao} />
                        </GridItem> */}
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