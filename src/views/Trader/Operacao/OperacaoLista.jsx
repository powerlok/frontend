import React from "react";
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import CustomTextField from "../../../components/CustomInput/CustomTextField";
import CustomButton from "../../../components/CustomButtons/Button";
import Card from "../../../components/Card/Card";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import Edit from "@material-ui/icons/Edit";
import CardBody from "./../../../components/Card/CardBody.jsx";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CustomSelect from "../../../components/CustomInput/CustomSelect";
import RemoveCircleOutline from "@material-ui/icons/RemoveCircleOutline";
import { traderActions } from '../../../_actions/trader.actions';
import { contaCorrenteActions } from '../../../_actions/contacorrente.actions';
import "moment/locale/pt-br";
import HistoricoDialog from "./../Historico/HistoricoDialog";
import Search from "@material-ui/icons/Search";
import InputLabel from "@material-ui/core/InputLabel";
import { TableFooter } from "@material-ui/core";
import { dateToEN } from "./../../../_helpers/utils";
var moment = require('moment');
moment.locale('pt-br');


const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflow: 'auto',
        margin: '-5px',
        overflowScrolling: "touch",
        WebkitOverflowScrolling: "touch",
    },
    table: {
        minWidth: 800,
        fontSize: '12px',
    },
    tableCell: {
        padding: '0 !important',
        textAlign: "center",
        border: '2px solid #FFFF',
        fontSize: "12px",
        margin: '5px',
        [theme.breakpoints.down("sm")]: {
            minWidth: '163px !important',
        }
    },
    buttonAdd: {
        margin: "13px -14px"
    },
    actions: {
        display: 'flex',
        margin: "auto",
    },
    card: {
        marginBottom: "-14px !important",
    },
    cardAction: {
        float: "right",
        margin: "-45px 24px",
        [theme.breakpoints.down("sm")]: {
            margin: "-14px 24px",
            position: "absolute",
            right: 0,
            zIndex: 2
        }
    },
    saldo: {
        fontWeight: "bold",
        color: "green",
        float: "right"
    },
    saldoNegativo: {
        color: "red",
        float: "right"
    },
    labelGrid: {
        fontWeight: "bold",
    },
    buttonHistorico: {
        margin: theme.spacing.unit,
        float: "right"
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
    input: {
        display: 'none'
    }
});


class OperacaoLista extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = {
            de: (this.props.de) ? this.props.de : (this.props.history.location.state) ? this.props.history.location.state.de : moment(new Date(new Date().getFullYear(), new Date().getMonth(), 1)).format('YYYY-MM-DD'),
            ate: (this.props.ate) ? this.props.ate : (this.props.history.location.state) ? this.props.history.location.state.ate : moment(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)).format('YYYY-MM-DD'),
            seqcontacorrente: (this.props.seqcontacorrente) ? this.props.seqcontacorrente : (this.props.history.location.state) ? this.props.history.location.state.seqcontacorrentef : "",
            loading: false,
            traders: [],
            totais: {
                totalLiquido: 0,
                totalMeta: 0,
                totalRealizado: 0,
                totalTaxas: 0,
                percTaxas: 0,
                percLiquido: 0,
                percBruto: 0,
                openHistorico: false,
                p_data: '',
                p_seqcontacorrente: ""
            },
            filtrar: false
        };

        this.props.dispatch(contaCorrenteActions.getAll(this.props.authentication.user.seqconta));

        this.state = this.initialState;
        this.getData = this.getData.bind(this);
        this.filtro = this.filtro.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.openHistorico = this.openHistorico.bind(this);
        this.closeHistorico = this.closeHistorico.bind(this);
        this.validate = this.validate.bind(this);
        this.props.getGetFiltro(this.state.de, this.state.ate, this.state.seqcontacorrente);

        this.filtro();
    }

    carregaComboContaCorrente() {
        return this.props.contacorrentes.map((prop, key) => {
            return {
                label: prop.descricao,
                value: prop.id
            };
        });
    }

    componentWillMount() {
        if (this.props.history.location.state) {
            this.setState({ de: this.props.history.location.state.de, ate: this.props.history.location.state.ate, seqcontacorrente: this.props.history.location.state.seqcontacorrentef });
        }
    }

    handleChange(e) {

        const { name, value } = e.target;

        this.setState({ [name]: value });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.trader.traders !== nextProps.trader.traders || this.props.trader.totais !== nextProps.trader.totais) {
            this.setState({
                traders: nextProps.trader.traders,
                totais: nextProps.trader.totais,
                loading: nextProps.trader.loading
            });
            this.props.getGetFiltro(this.state.de, this.state.ate, this.state.seqcontacorrente);
        }

        if (this.props.trader.filtrar !== nextProps.trader.filtrar) {
            if (this.props.trader.filtrar) this.filtro();
        }

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.trader.filtrar !== this.props.trader.filtrar) {
            if (this.props.trader.filtrar) this.filtro();
        }
    }

    getData = () => {
        if (this.state.traders !== undefined && this.state.traders !== null && this.state.traders !== []) {
            return this.state.traders.map((prop, key) => {
                return {
                    id: (prop.seqtraderoperacao !== undefined) ? prop.seqtraderoperacao : 0,
                    descricao: prop.descricao,
                    diasemana: prop.diasemana,
                    saldo: prop.saldo_operacao,
                    data: moment(prop.data).format('DD/MM/YYYY'),
                    saldo_operacao: (prop.saldo_operacao != null) ? prop.saldo_operacao.toLocaleString('pt-br', { minimumFractionDigits: 2 }) : '0,00',
                    seqcontacorrente: prop.seqcontacorrente,
                    percmeta: (prop.percmeta !== null) ? prop.percmeta.toLocaleString('pt-br', { minimumFractionDigits: 2 }) : '0,00',
                    vlrmeta: (prop.vlrmeta !== null) ? prop.vlrmeta.toLocaleString('pt-br', { minimumFractionDigits: 2 }) : '0,00',
                    vlrmetaacumulada: (prop.vlrmetaacumulada != null) ? prop.vlrmetaacumulada.toLocaleString('pt-br', { minimumFractionDigits: 2 }) : '0,00',
                    vlrrealizado: (prop.vlrrealizado !== null) ? prop.vlrrealizado.toLocaleString('pt-br', { minimumFractionDigits: 2 }) : '0,00',
                    percrealizado: (prop.percrealizado !== null) ? prop.percrealizado.toLocaleString('pt-br', { minimumFractionDigits: 2 }) : '0,00',
                    vlracumuladobruto: (prop.vlracumuladobruto !== null) ? prop.vlracumuladobruto.toLocaleString('pt-br', { minimumFractionDigits: 2 }) : '0,00',
                    percrealizadoacumuladobruto: (prop.percrealizadoacumuladobruto != null) ? prop.percrealizadoacumuladobruto.toLocaleString('pt-br', { minimumFractionDigits: 2 }) : '0,00',
                    vlrliquido: (prop.vlrliquido !== null) ? prop.vlrliquido.toLocaleString('pt-br', { minimumFractionDigits: 2 }) : '0,00',
                    percrealizadoliquido: (prop.percrealizadoliquido !== null) ? prop.percrealizadoliquido.toLocaleString('pt-br', { minimumFractionDigits: 2 }) : '0,00',
                    vlracumuladoliquido: (prop.vlracumuladoliquido !== null) ? prop.vlracumuladoliquido.toLocaleString('pt-br', { minimumFractionDigits: 2 }) : '0,00',
                    perctaxas: (prop.perctaxas !== null) ? prop.perctaxas.toLocaleString('pt-br', { minimumFractionDigits: 2 }) : '0,00',
                    vlrtaxas: (prop.vlrtaxas !== null) ? prop.vlrtaxas.toLocaleString('pt-br', { minimumFractionDigits: 2 }) : '0,00',
                }
            });
        }
    }

    linkCadastro(id) {
        if (id !== 0) {
            this.props.history.push("/admin/trader/operacao/operacao", { "param": id, "de": this.state.de, "ate": this.state.ate, "seqcontacorrentef": this.state.seqcontacorrente });
        } else {
            this.props.history.push("/admin/trader/operacao/operacao", { "de": this.state.de, "ate": this.state.ate, "seqcontacorrentef": this.state.seqcontacorrente });
        }
    }

    delete(id) {
        // const { id } = this.state;

        if (window.confirm("Tem certeza que quer deletar esta Operação?")) {

            this.props.dispatch(traderActions._deleteTraderOperacao(id));
        }

    }

    colorirVlrRealizado(vlrrealizado, vlrmeta) {
        if (parseFloat(vlrrealizado.replace('.', '').replace(',', '.')) >= parseFloat(vlrmeta.replace('.', '').replace(',', '.'))) return { color: "green", fontWeight: "bold", textAlign: 'center', backgroundColor: '#BFEFFF' };
        else if (vlrrealizado.replace('.', '').replace(',', '.') > 0) return { color: "#FFD700", fontWeight: "bold", textAlign: 'center', backgroundColor: '#BFEFFF' };
        else if (vlrrealizado.replace('.', '').replace(',', '.') < 0) return { color: "red", fontWeight: "bold", textAlign: 'center', backgroundColor: '#BFEFFF' };
        else return { fontWeight: "bold", textAlign: 'center', backgroundColor: '#BFEFFF' };
    }

    colorirValores(valor) {
        if (valor < 0) return { color: "red", fontWeight: "bold", textAlign: 'center' };
        else return { fontWeight: "bold", textAlign: 'center' };
    }

    validate() {

    }

    filtro() {
        if(this.state.de != '' && this.state.ate != '' && this.state.seqcontacorrente != '')
        this.props.dispatch(traderActions.getTraderAllOperacao(this.props.authentication.user.seqconta, this.state.de, this.state.ate, this.state.seqcontacorrente));
        //this.setState({ filtrar: true });
    }

    corrigeNumero(num, chave) {
        if (chave != undefined && num != null) {
            if (num != 0) {
                return num;
            }
        }
        return 0;
    }

    openHistorico(data, seqcontacorrente) {
        this.setState({ openHistorico: true, p_data: dateToEN(data, false), p_seqcontacorrente: seqcontacorrente });
    }

    closeHistorico() {
        this.setState({ openHistorico: false });
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <form name="form" ref="form">
                            <Card className={classes.card}>
                                <CardBody>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={2}>
                                            <InputLabel className={classes.label}>De</InputLabel>
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
                                        </GridItem>

                                        <GridItem xs={12} sm={12} md={2}>
                                            <InputLabel className={classes.label}>Até</InputLabel>
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
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}>
                                            <CustomSelect
                                                labelText="Conta Corrente"
                                                value={this.state.seqcontacorrente}
                                                onChange={this.handleChange}
                                                onBlur={this.validate}
                                                MenuProps={{ className: classes.selectMenu }}
                                                className={classes.selectFormControl}
                                                formControlProps={{
                                                    fullWidth: true,
                                                    className: classes.formControlSelect
                                                }}
                                                name="seqcontacorrente"
                                                id="seqcontacorrente"
                                                classesList={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelectedMultiple
                                                }}
                                                options={this.carregaComboContaCorrente()}
                                                error={this.state.seqcontacorrenteError}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={2}>
                                            <Button color="default" type="button" className={classes.buttonAdd} disabled={this.validate()} onClick={this.filtro}>Filtrar</Button>

                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}><Button color="secondary" aria-label="Add" variant="fab" title="Novo" className={classes.cardAction} onClick={() => { this.linkCadastro(0); }}>
                                            <AddIcon />
                                        </Button></GridItem>
                                    </GridContainer>
                                </CardBody></Card>
                        </form>
                    </GridItem>
                </GridContainer>

                <Card className={classes.card}>
                    <CardBody className={classes.root}>
                        <HistoricoDialog open={this.state.openHistorico} close={this.closeHistorico} de={this.state.p_data} ate={this.state.p_data} seqcontacorrente={this.state.p_seqcontacorrente} />

                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.tableCell} align="center" colSpan={3}></TableCell>
                                    <TableCell className={classes.tableCell} align="center" colSpan={3} style={{ textAlign: 'center', fontWeight: "bold", backgroundColor: '#F0FFF0' }}>META</TableCell>
                                    <TableCell className={classes.tableCell} align="center" colSpan={4} style={{ textAlign: 'center', fontWeight: "bold", backgroundColor: '#BFEFFF' }}>REALIZADO</TableCell>
                                    <TableCell className={classes.tableCell} align="center" colSpan={5} style={{ textAlign: 'center', fontWeight: "bold", backgroundColor: '#EEAEEE' }}>LIQUIDO</TableCell>
                                    <TableCell className={classes.tableCell}></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={classes.tableCell} align="center" style={{ textAlign: 'center', backgroundColor: '#00008B', color: "#FFFFFF" }}>Data</TableCell>
                                    <TableCell className={classes.tableCell} align="center" style={{ textAlign: 'center', backgroundColor: '#00008B', color: "#FFFFFF" }}>Dia</TableCell>
                                    <TableCell className={classes.tableCell} align="center" style={{ textAlign: 'center', backgroundColor: '#00008B', color: "#FFFFFF" }}>Saldo</TableCell>

                                    <TableCell className={classes.tableCell} align="center" style={{ textAlign: 'center', backgroundColor: '#00008B', color: "#FFFFFF" }}>Vlr Meta</TableCell>
                                    <TableCell className={classes.tableCell} align="center" style={{ textAlign: 'center', backgroundColor: '#00008B', color: "#FFFFFF" }}>Vlr Meta Acum.</TableCell>
                                    <TableCell className={classes.tableCell} align="center" style={{ textAlign: 'center', backgroundColor: '#00008B', color: "#FFFFFF" }}>% Meta</TableCell>

                                    <TableCell className={classes.tableCell} align="center" style={{ textAlign: 'center', backgroundColor: '#00008B', color: "#FFFFFF" }}>Vlr Real</TableCell>
                                    <TableCell className={classes.tableCell} align="center" style={{ textAlign: 'center', backgroundColor: '#00008B', color: "#FFFFFF" }}>Vlr Acum Bruto</TableCell>
                                    <TableCell className={classes.tableCell} align="center" style={{ textAlign: 'center', backgroundColor: '#00008B', color: "#FFFFFF" }}>% Real Bruto</TableCell>
                                    <TableCell className={classes.tableCell} align="center" style={{ textAlign: 'center', backgroundColor: '#00008B', color: "#FFFFFF" }}>% Real Acum Bruto</TableCell>

                                    <TableCell className={classes.tableCell} align="center" style={{ textAlign: 'center', backgroundColor: '#00008B', color: "#FFFFFF" }}>Vlr Liq</TableCell>
                                    <TableCell className={classes.tableCell} align="center" style={{ textAlign: 'center', backgroundColor: '#00008B', color: "#FFFFFF" }}>% Real Liq</TableCell>
                                    <TableCell className={classes.tableCell} align="center" style={{ textAlign: 'center', backgroundColor: '#00008B', color: "#FFFFFF" }}>Vlr Acum Liq.</TableCell>
                                    <TableCell className={classes.tableCell} align="center" style={{ textAlign: 'center', backgroundColor: '#00008B', color: "#FFFFFF" }}>Vlr Taxas</TableCell>
                                    <TableCell className={classes.tableCell} align="center" style={{ textAlign: 'center', backgroundColor: '#00008B', color: "#FFFFFF" }}>% Taxas</TableCell>
                                    <TableCell className={classes.tableCell}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {this.getData().length == 0 &&
                                    <TableRow key={0}>
                                        <TableCell colSpan={15} className={classes.tableCell} align="center" style={{ textAlign: 'center', backgroundColor: '#F0FFF0' }}>
                                            Nenhuma informação no momento.
                                        </TableCell>
                                    </TableRow>
                                }
                                {this.getData().map(row => (
                                    <TableRow key={row.id}>
                                        <TableCell className={classes.tableCell} align="center" style={{ textAlign: 'center' }}>{row.data}</TableCell>
                                        <TableCell className={classes.tableCell} align="center" style={{ fontWeight: '500', textAlign: 'center' }}>{row.diasemana.toUpperCase()}</TableCell>
                                        <TableCell className={classes.tableCell} align="center" style={{ textAlign: 'center' }}> {row.saldo_operacao}</TableCell>

                                        <TableCell className={classes.tableCell} align="center" style={{ textAlign: 'center', backgroundColor: '#F0FFF0' }}> {row.vlrmeta}</TableCell>
                                        <TableCell className={classes.tableCell} align="center" style={{ textAlign: 'center', backgroundColor: '#F0FFF0' }}> {row.vlrmetaacumulada}</TableCell>
                                        <TableCell className={classes.tableCell} align="center" style={{ textAlign: 'center', backgroundColor: '#F0FFF0' }}>{row.percmeta}%</TableCell>

                                        <TableCell className={classes.tableCell} align="center" style={this.colorirVlrRealizado(row.vlrrealizado, row.vlrmeta)}>{row.vlrrealizado}</TableCell>
                                        <TableCell className={classes.tableCell} align="center" style={{ textAlign: 'center', backgroundColor: '#BFEFFF' }}> {row.vlracumuladobruto}</TableCell>
                                        <TableCell className={classes.tableCell} align="center" style={{ textAlign: 'center', backgroundColor: '#BFEFFF' }}>{row.percrealizado}%</TableCell>
                                        <TableCell className={classes.tableCell} align="center" style={{ textAlign: 'center', backgroundColor: '#BFEFFF' }}>{row.percrealizadoacumuladobruto}%</TableCell>

                                        <TableCell className={classes.tableCell} align="center" style={{ textAlign: 'center', backgroundColor: '#EEAEEE' }}> {row.vlrliquido}</TableCell>
                                        <TableCell className={classes.tableCell} align="center" style={{ textAlign: 'center', backgroundColor: '#EEAEEE' }}> {row.percrealizadoliquido}%</TableCell>
                                        <TableCell className={classes.tableCell} align="center" style={{ textAlign: 'center', backgroundColor: '#EEAEEE' }}> {row.vlracumuladoliquido}</TableCell>
                                        <TableCell className={classes.tableCell} align="center" style={{ textAlign: 'center', backgroundColor: '#EEAEEE' }}> {row.vlrtaxas}</TableCell>
                                        <TableCell className={classes.tableCell} align="center" style={{ textAlign: 'center', backgroundColor: '#EEAEEE' }}> {row.perctaxas}%</TableCell>
                                        <TableCell className={classes.tableCell} align="center" style={{ textAlign: 'center', }}>{<div className={classes.buttomAction}>
                                            <CustomButton
                                                justIcon
                                                round
                                                simple
                                                onClick={() => { this.openHistorico(row.data, row.seqcontacorrente) }}
                                                color="info"
                                                className="like"
                                            ><Search />
                                            </CustomButton>{' '}
                                            <CustomButton
                                                justIcon
                                                round
                                                simple
                                                onClick={() => { this.linkCadastro(row.id) }}
                                                color="info"
                                                className="like"
                                            >
                                                <Edit />
                                            </CustomButton>{' '}
                                            <CustomButton
                                                justIcon
                                                round
                                                simple
                                                onClick={() => { this.delete(row.id); }}
                                                color="danger"
                                                className="remove"
                                                title="Remover Quitado"
                                            >
                                                <RemoveCircleOutline />
                                            </CustomButton>
                                        </div>}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                <TableRow >
                                    <TableCell className={classes.tableCell} align="center" colSpan={3}></TableCell>
                                    <TableCell className={classes.tableCell} align="center" colSpan={1} style={this.colorirValores(this.corrigeNumero(this.state.totais.totalMeta, this.state.totais))}>{this.corrigeNumero(this.state.totais.totalMeta, this.state.totais).toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                    <TableCell className={classes.tableCell} align="center" colSpan={1}></TableCell>
                                    <TableCell className={classes.tableCell} align="center" colSpan={1}></TableCell>
                                    <TableCell className={classes.tableCell} align="center" colSpan={1} style={this.colorirValores(this.corrigeNumero(this.state.totais.totalRealizado, this.state.totais))}>{this.corrigeNumero(this.state.totais.totalRealizado, this.state.totais).toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                    <TableCell className={classes.tableCell} align="center" colSpan={1}></TableCell>
                                    <TableCell className={classes.tableCell} align="center" colSpan={1} style={this.colorirValores(this.corrigeNumero(this.state.totais.percBruto, this.state.totais))}>{this.corrigeNumero(this.state.totais.percBruto, this.state.totais).toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%</TableCell>
                                    <TableCell className={classes.tableCell} align="center" colSpan={1}></TableCell>
                                    <TableCell className={classes.tableCell} align="center" colSpan={1} style={this.colorirValores(this.corrigeNumero(this.state.totais.totalLiquido, this.state.totais))}>{this.corrigeNumero(this.state.totais.totalLiquido, this.state.totais).toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                    <TableCell className={classes.tableCell} align="center" colSpan={1} style={this.colorirValores(this.corrigeNumero(this.state.totais.percLiquido, this.state.totais))}>{this.corrigeNumero(this.state.totais.percLiquido, this.state.totais).toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%</TableCell>
                                    <TableCell className={classes.tableCell} align="center" colSpan={1}></TableCell>
                                    <TableCell className={classes.tableCell} align="center" colSpan={1} style={this.colorirValores(this.corrigeNumero(this.state.totais.totalTaxas, this.state.totais))}>{this.corrigeNumero(this.state.totais.totalTaxas, this.state.totais).toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                    <TableCell className={classes.tableCell} align="center" colSpan={1} style={this.colorirValores(this.corrigeNumero(this.state.totais.percTaxas, this.state.totais))}>{this.corrigeNumero(this.state.totais.percTaxas, this.state.totais).toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        trader: state.trader,
        alert: state.alert,
        contacorrentes: state.contacorrente.contacorrentes,
        authentication: state.authentication.user
    }
}

export default compose(
    connect(mapStateToProps),
    withStyles(styles)
)(OperacaoLista);