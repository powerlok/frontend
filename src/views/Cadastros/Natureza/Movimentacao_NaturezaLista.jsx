import React from "react";
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import ReactTable from "react-table";
import Datetime from "react-datetime";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Assignment from "@material-ui/icons/Assignment";
import Button from '@material-ui/core/Button';
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import AvTimer from "@material-ui/icons/AvTimer";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import AddIcon from '@material-ui/icons/Add';
// core components
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import CustomInput from "../../../components/CustomInput/CustomInput";
import CustomButton from "../../../components/CustomButtons/Button";
import Card from "../../../components/Card/Card";
import CardHeader from "../../../components/Card/CardHeader";
import CardText from "../../../components/Card/CardText";
import CardBody from "../../../components/Card/CardBody";
import CustomSelect from "../../../components/CustomInput/CustomSelect";
import CardIcon from "../../../components/Card/CardIcon";
import CustomTextField from "../../../components/CustomInput/CustomTextField";
import { movimentacaoActions } from '../../../_actions/movimentacao.actions';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MovimentacaoFormsStyle from "../../../assets/jss/material-dashboard-pro-react/views/cadastros/movimentacao/movimentacao";
import "moment/locale/pt-br";
var moment = require('moment');

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    formControl: {
        margin: "-2px",
        paddingTop: "5px"
    },
    formControlSelect: {
        margin: "-2px",
        paddingTop: "3px",
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


class MovimentacaoNaturezaLista extends React.Component {
    constructor(props) {
        super(props);

        this.initialState = {
            movimentacoesNat: [],
            de: moment(new Date(new Date().getFullYear(), new Date().getMonth() -3, 1)).format('YYYY-MM-DD'),
            ate: moment(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)).format('YYYY-MM-DD'),
            status: 'T',
            loading: false
          
        };

        this.state = this.initialState;

        this.optionsStatus = [{ label: "Aberto", value: 'A' }, { label: "Quitado", value: 'Q' }, { label: "Todos", value: 'T' }];

        this.filtro = this.filtro.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validate = this.validate.bind(this);

        this.filtro();
    }

    filtro() {
        const { de, ate, status } = this.state;

        this.props.dispatch(movimentacaoActions.getAllMovOpNat(de, ate, status, this.props.authentication.user.seqconta, this.props.seqnatureza));
    }

    componentWillReceiveProps(nextProps) { //console.log(this.props.movimentacao);
        if (this.props.movimentacao.movimentacaoNat !== nextProps.movimentacao.movimentacaoNat) {
            this.setState({ movimentacoesNat: nextProps.movimentacao.movimentacaoNat, loading: nextProps.movimentacao.loading });
        }
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    getData = () => {
        if (this.state.movimentacoesNat != undefined) {
            return this.state.movimentacoesNat.map((prop, key) => {
                return {
                    datavenc: moment(prop.datavenc).format('DD-MM-YYYY'),
                    datapagto: moment(prop.datapagto).format('DD-MM-YYYY'),
                    historico: prop.historico,
                    vlroriginal: (prop.vlroriginal != null) ? (prop.vlroriginal * -1).toLocaleString('pt-br', { minimumFractionDigits: 2 }) : '0,00',
                    vlrpago: (prop.vlrpago != null) ? (prop.vlrpago * -1).toLocaleString('pt-br', { minimumFractionDigits: 2 }) : '0,00',
                    actions: (
                        <div className="actions-right">
                        </div>
                    )
                }
            });
        }
    }

    validate(e) {
        const { name, value } = e.target;
        if (name != undefined) {
            if (!value || (name == 'de' && value.length == 0)) {
                return this.setState({ [`${name}Error`]: true, [`${name}Message`]: "Campo obrigatório" });
            }

            if (!value || (name == 'ate' && value.length == 0)) {
                return this.setState({ [`${name}Error`]: true, [`${name}Message`]: "Campo obrigatório" });
            }

            if (document.getElementById("de").value > document.getElementById("ate").value) {
                return this.setState({ "deError": true, "ateError": true, "ateMessage": "Campo De não pode ser maior do que o até" });
            }

            if (!value || (name == 'status' && value.length == 0)) {
                return this.setState({ [`${name}Error`]: true, [`${name}Message`]: "Campo obrigatório" });
            }
        }

        this.setState({ [`${name}Error`]: false, [`${name}Message`]: null });
        this.setState({ "deError": false, "ateError": false, "ateMessage": null });

        /*  if (this.isInvalid() == false) {
              this.props.dispatch(movimentacaoActions.getAllFiltro(this.props.authentication.user.seqconta, this.state.de, this.state.ate, this.state.status));
          }*/
    }

    isInvalid = () => {

        const { de, ate, status, statusError, deError, ateError } = this.state;

        return !(
            de &&
            ate &&
            status &&
            !deError &&
            !ateError &&
            !statusError
        );
    }

    render() {
        const { classes } = this.props;
        //console.log(this.state);
        return (
            <React.Fragment>
                <DialogTitle id="max-width-dialog-title">Movimentação - <span style={ this.props.cor != null ? { color: this.props.cor } : null }>{this.props.natureza.toUpperCase()}</span></DialogTitle>
                <DialogContent>
                    <GridContainer container
                        direction="column"
                        justify="flex-start">
                        <GridItem xs={12} sm={12} md={12}>
                            <form name="form" ref="form">
                                <Card>
                                    <CardBody>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <InputLabel className={classes.label}>De</InputLabel>
                                                <FormControl fullWidth>
                                                    <CustomTextField
                                                        labelText=""
                                                        id="de"
                                                        required={true}
                                                        value={this.state.de}
                                                        name="de"
                                                        type="date"
                                                        onChange={this.handleChange}
                                                        onBlur={this.validate}
                                                        formControlProps={{
                                                            fullWidth: true,
                                                            className: classes.formControl
                                                        }}
                                                        error={this.state.deError}
                                                    />
                                                </FormControl>
                                            </GridItem>

                                            <GridItem xs={12} sm={12} md={3}>
                                                <InputLabel className={classes.label}>Até</InputLabel>
                                                <FormControl fullWidth>
                                                    <CustomTextField
                                                        labelText=""
                                                        id="ate"
                                                        required={true}
                                                        value={this.state.ate}
                                                        name="ate"
                                                        type="date"
                                                        onChange={this.handleChange}
                                                        onBlur={this.validate}
                                                        formControlProps={{
                                                            fullWidth: true,
                                                            className: classes.formControl
                                                        }}
                                                        error={this.state.ateError}
                                                    />
                                                </FormControl>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <InputLabel className={classes.label}>Situação</InputLabel>
                                                <CustomSelect
                                                    value={this.state.status}
                                                    onChange={this.handleChange}
                                                    onBlur={this.validate}
                                                    MenuProps={{ className: classes.selectMenu }}
                                                    className={classes.selectFormControl}
                                                    formControlProps={{
                                                        fullWidth: true,
                                                        className: classes.formControlSelect
                                                    }}
                                                    name="status"
                                                    id="status"
                                                    classesList={{
                                                        root: classes.selectMenuItem,
                                                        selected: classes.selectMenuItemSelectedMultiple
                                                    }}
                                                    options={this.optionsStatus}
                                                    error={this.state.statusError}
                                                />
                                            </GridItem>
                                            <GridItem>
                                                <Button color="default" type="button" className={classes.button} disabled={this.isInvalid()} onClick={this.filtro}>Filtrar</Button>
                                            </GridItem>
                                        </GridContainer>
                                    </CardBody></Card>
                            </form>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                            <Card>
                                <CardHeader>
                                </CardHeader>
                                <CardBody>
                                    <ReactTable
                                        data={this.getData()}
                                        filterable
                                        columns={[
                                            {
                                                Header: "DATA VENC",
                                                accessor: "datavenc",
                                                sortable: false,
                                                filterable: false
                                            },
                                            {
                                                Header: "DATA PAGTO",
                                                accessor: "datapagto",
                                                sortable: false,
                                                filterable: false
                                            },
                                            {
                                                Header: "HISTORICO",
                                                accessor: "historico",
                                                sortable: false,
                                                filterable: false
                                            },
                                            {
                                                Header: "VLR ORIGINAL",
                                                accessor: "vlroriginal",
                                                sortable: false,
                                                filterable: false,
                                                getProps: (state, rowInfo, column, instance) => {
                                                    if (rowInfo != null  && rowInfo != undefined) {
                                                        return {
                                                            style: {
                                                                color: parseInt(rowInfo.row.vlroriginal) < 0 ? 'red' : null
                                                            }
                                                        }
                                                    }
                                                    return {};
                                                }
                                            },
                                            {
                                                Header: "VLR PAGO",
                                                accessor: "vlrpago",
                                                sortable: false,
                                                filterable: false,
                                                getProps: (state, rowInfo, column, instance) => {
                                                    if (rowInfo != null  && rowInfo != undefined) {
                                                        return {
                                                            style: {
                                                                color: parseInt(rowInfo.row.vlrpago) < 0 ? 'red' : null
                                                            }
                                                        }
                                                    }
                                                    return {};
                                                }
                                            }
                                        ]}
                                        // onFetchData={this.fetchData}
                                        minRows={1}
                                        loading={this.state.loading}
                                        defaultPageSize={9999999999999999999999}
                                        showPaginationTop={false}
                                        showPaginationBottom={false}
                                        className="-striped -highlight"
                                        previousText='Anterior'
                                        nextText='Próximo'
                                        loadingText='Carregando...'
                                        noDataText='Nenhuma informação encontrada no momento'
                                        pageText='Página'
                                        ofText='de'
                                        rowsText='linhas'
                                        pageJumpText='pular para página'
                                        rowsSelectorText='linhas por páginas'
                                    />
                                </CardBody></Card>
                        </GridItem>
                    </GridContainer>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.close} color="primary">
                        Fechar
                        </Button>
                </DialogActions>
            </React.Fragment >
        )

    };
}

const mapStateToProps = (state) => {
    return {
        movimentacao: state.movimentacao,
        alert: state.alert,
        authentication: state.authentication.user
    }
}

export default compose(
    connect(mapStateToProps),
    withStyles(styles)
)(MovimentacaoNaturezaLista);
