import React from "react";
import { connect } from 'react-redux';
import compose from 'recompose/compose';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import { contaCorrenteActions } from '../../../_actions/contacorrente.actions';
import { traderActions } from '../../../_actions/trader.actions';
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
import CustomTextField from '../../../components/CustomInput/CustomTextField';
import LoadingOverlay from 'react-loading-overlay';
import { diaSemana, toFixed } from '../../../_helpers/utils'
var moment = require('moment');

const styles = theme => ({
    card: {
        height: "306px",
        marginBottom: "5px"
    }
});

class Operacao extends React.Component {
    constructor(props) {
        super(props);

        this.initialState = {
            de: '',
            ate: '',
            open: false,
            isActive: false,
            id: 0,
            data: '',
            diasemana: '',
            saldo_operacao: 0,
            saldo: 0,
            seqcontacorrente: '',
            percmeta: '',
            vlrmeta: '',
            vlrmetaacumulada: '',
            vlrrealizado: '',
            percrealizado: '',
            vlracumuladobruto: '',
            percrealizadoacumuladobruto: '',
            vlrliquido: '',
            percrealizadoliquido: '',
            vlracumuladoliquido: '',
            perctaxas: '',
            vlrtaxas: '',
            vlrtotalacummeta: '',
            vlrtotalacumbruto: '',
            vlrtotalacumliquido: ''
        };

        this.state = this.initialState;

        this.props.dispatch(contaCorrenteActions.getAll(this.props.authentication.user.seqconta));

        this.validate = this.validate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleVoltar = this.handleVoltar.bind(this);
        this.getSaldoOperacao = this.getSaldoOperacao.bind(this);

    }

    loadData = (id) => {
        const { dispatch } = this.props;
        dispatch(traderActions.getByIdTraderOperacao(id));
        this.getSaldoOperacao();
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
            var id = this.props.history.location.state.param;
            var de = this.props.history.location.state.de;
            var ate = this.props.history.location.state.ate;
            //console.log(de, ate);
            this.setState({ id: (id !== '') ? id : 0, de: de, ate: ate });
            this.loadData(id);

        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.trader.traders !== this.props.trader.traders) {
            this.setState({
                id: (nextProps.trader.traders.seqtraderoperacao !== undefined) ? nextProps.trader.traders.seqtraderoperacao : 0,
                seqcontacorrente: nextProps.trader.traders.seqcontacorrente,
                data: moment(nextProps.trader.traders.data).format('YYYY-MM-DD'),
                diasemana: nextProps.trader.traders.diasemana,
                saldo_operacao: (nextProps.trader.traders.saldo_operacao !== 0) ? nextProps.trader.traders.saldo_operacao : 0,
                percmeta: (nextProps.trader.traders.percmeta !== 0) ? nextProps.trader.traders.percmeta : null,
                vlrmeta: (nextProps.trader.traders.vlrmeta !== 0) ? nextProps.trader.traders.vlrmeta : null,
                vlrmetaacumulada: (nextProps.trader.traders.vlrmetaacumulada !== 0) ? nextProps.trader.traders.vlrmetaacumulada : null,
                vlrrealizado: (nextProps.trader.traders.vlrrealizado !== 0) ? nextProps.trader.traders.vlrrealizado : null,
                percrealizado: (nextProps.trader.traders.percrealizado !== 0) ? nextProps.trader.traders.percrealizado : null,
                vlracumuladobruto: (nextProps.trader.traders.vlracumuladobruto !== 0) ? nextProps.trader.traders.vlracumuladobruto : null,
                vlrliquido: (nextProps.trader.traders.vlrliquido !== 0) ? nextProps.trader.traders.vlrliquido : null,
                percrealizadoliquido: (nextProps.trader.traders.percrealizadoliquido !== 0) ? nextProps.trader.traders.percrealizadoliquido : null,
                vlracumuladoliquido: (nextProps.trader.traders.vlracumuladoliquido !== 0) ? nextProps.trader.traders.vlracumuladoliquido : null,
                perctaxas: (nextProps.trader.traders.perctaxas !== 0) ? nextProps.trader.traders.perctaxas : null,
                vlrtaxas: (nextProps.trader.traders.vlrtaxas !== 0) ? nextProps.trader.traders.vlrtaxas : null,
                percrealizadoacumuladobruto: (nextProps.trader.traders.percrealizadoacumuladobruto != 0) ? nextProps.trader.traders.percrealizadoacumuladobruto : null,
            });
        }

        if (nextProps.trader !== this.props.trader) {
            this.setState({ saldo_operacao: nextProps.trader.saldo });
            this.setState({ vlrmetaacumulada: nextProps.trader.vlracummeta });
            this.setState({ vlracumuladobruto: nextProps.trader.vlracumbruto });
            this.setState({ vlracumuladoliquido: nextProps.trader.vlracumliquido });

        }

        if (nextProps.alert !== this.props.alert) {
            if (this.state.id === '0' && nextProps.alert.type === 'success') {
                this.setState(() => this.initialState);

                window.location.reload();
            }
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        //const { id, seqcontacorrente, data, diasemana, saldo_operacao, percmeta, vlrmeta, vlrmetaacumulada, vlrrealizado, percrealizado, vlracumuladobruto, vlrliquido, percrealizadoliquido, vlracumuladoliquido, perctaxas, vlrtaxas } = this.state;
        const { id, data, seqcontacorrente, diasemana } = this.state;
        const { dispatch, authentication } = this.props;

        var seqconta = authentication.user.seqconta;
        var saldo_operacao = (this.state.saldo_operacao !== '' && this.state.saldo_operacao !== 0) ? this.state.saldo_operacao : 0;
        var percmeta = (this.state.percmeta !== '') ? this.state.percmeta : 0;
        var vlrmeta = (this.state.vlrmeta !== '' && this.state.vlrmeta !== 0) ? this.state.vlrmeta : 0;
        var vlrmetaacumulada = (this.state.vlrmetaacumulada !== '' && this.state.vlrmetaacumulada !== 0) ? this.state.vlrmetaacumulada : 0;
        var vlrrealizado = (this.state.vlrrealizado !== '') ? this.state.vlrrealizado : 0;
        var percrealizado = (this.state.percrealizado !== '' && this.state.percrealizado !== 0) ? this.state.percrealizado : 0;
        var vlracumuladobruto = (this.state.vlracumuladobruto !== '' && this.state.vlracumuladobruto !== 0) ? this.state.vlracumuladobruto : 0;
        var vlrliquido = (this.state.vlrliquido !== '') ? this.state.vlrliquido : 0;
        var percrealizadoliquido = (this.state.percrealizadoliquido !== '' && this.state.percrealizadoliquido !== 0) ? this.state.percrealizadoliquido : 0;
        var vlracumuladoliquido = (this.state.vlracumuladoliquido !== '' && this.state.vlracumuladoliquido !== 0) ? this.state.vlracumuladoliquido : 0;
        var perctaxas = (this.state.perctaxas !== '' && this.state.perctaxas !== 0) ? this.state.perctaxas : 0;
        var vlrtaxas = (this.state.vlrtaxas !== '' && this.state.vlrtaxas !== 0) ? this.state.vlrtaxas : 0;
        var percrealizadoacumuladobruto = (this.state.percrealizadoacumuladobruto !== '' && this.state.percrealizadoacumuladobruto !== 0) ? this.state.percrealizadoacumuladobruto : 0;

        if (this.isInvalid() == false) {
            dispatch(traderActions.addTraderOperacao(JSON.stringify({ id, seqcontacorrente, data, diasemana, saldo_operacao, percmeta, vlrmeta, vlrmetaacumulada, vlrrealizado, percrealizado, vlracumuladobruto, vlrliquido, percrealizadoliquido, vlracumuladoliquido, perctaxas, vlrtaxas, seqconta, percrealizadoacumuladobruto })));
        }
    }

    handleVoltar() {
        this.props.history.push("/admin/trader/operacao/operacaoabas", { "de": this.state.de, "ate": this.state.ate });
    }

    calculaVlrMeta() {
        var vlrmeta = ((Number(this.state.percmeta) / 100) * Number(this.state.saldo_operacao));
        this.setState({ vlrmeta: toFixed(vlrmeta, 2) });
    }

    calculaVlrMetaAcum() {
        var vlrmetaacumulada = (Number(this.state.vlrtotalacummeta) > 0) ? Number(this.state.vlrtotalacummeta) : Number(this.state.vlrmeta);
        this.setState({ vlrmetaacumulada: toFixed(vlrmetaacumulada, 2) });
    }

    calculaPercRealizado() {
        var percrealizado = (Number(this.state.vlrrealizado) / Number(this.state.vlrmeta)) * 100;
        this.setState({ percrealizado: toFixed(percrealizado, 2) });
    }

    /*carregaVlrAcumuladoBruto(){
        this.setState({ vlracumuladobruto: toFixed(this.state.vlracumuladobruto,2) });
    }*/

    calculaPercRealizadoBruto() {
        var percrealizadoacumuladobruto = (Number(this.state.vlracumuladobruto) / Number(this.state.vlrmetaacumulada)) * 100;
        this.setState({ percrealizadoacumuladobruto: toFixed(percrealizadoacumuladobruto, 2) });
    }

    calculaPercRealizadoLiquido() {
        var percrealizadoliquido = (Number(this.state.vlrliquido) / Number(this.state.vlrmeta)) * 100;
        this.setState({ percrealizadoliquido: toFixed(percrealizadoliquido, 2) });
    }

    /*carregaVlrAcumuladoLiquido() {
        var vlracumuladoliquido = (Number(this.state.vlrtotalacumliquido));
        this.setState({ vlracumuladoliquido: toFixed(vlracumuladoliquido,2) });
    }*/

    calculaVlrTaxas() {
        var vlrtaxas = (Number(this.state.vlrrealizado) - Number(this.state.vlrliquido));
        this.setState({ vlrtaxas: toFixed(vlrtaxas, 2) });
    }

    calculaPercTaxas() {
        var perctaxas = ((Number(this.state.vlrtaxas) / Number(this.state.vlrrealizado)) * 100);
        this.setState({ perctaxas: toFixed(perctaxas, 2), isActive: false });
    }


    getSaldoOperacao() {
        var data = this.state.data;
        var seqcontacorrente = this.state.seqcontacorrente;
        // var percmeta = this.state.percmeta;

        if (data !== '' && data !== undefined) {
            this.setState({ diasemana: diaSemana(data) });
        }


        if ((data !== '' && data !== undefined) && (seqcontacorrente !== '' && seqcontacorrente !== undefined)) {
            this.setState({ isActive: true });
            this.props.dispatch(traderActions.getSaldoDisponivelPorAteAData(this.props.authentication.user.seqconta, data, seqcontacorrente));
            this.props.dispatch(traderActions.getVlrAcumulada(this.props.authentication.user.seqconta, data));


            // setTimeout(() => { this.calculaGeral(); },500);

            //this.setState({ isActive: false });

            //#region Old       
            setTimeout(() => {
                var saldo = Number(this.state.saldo_operacao);

                //if(this.id === 0)  this.setState({saldo_operacao: toFixed(saldo,2) });

                var vlrmeta = ((Number(this.state.percmeta) / 100) * saldo);

                this.setState({ vlrmeta: toFixed(vlrmeta, 2) });

                setTimeout(() => {

                    var vlrmetaacumulada = (Number(this.state.vlrtotalacummeta) > 0) ? Number(this.state.vlrtotalacummeta) : Number(vlrmeta);

                    this.setState({ vlrmetaacumulada: toFixed(vlrmetaacumulada, 2) });

                    setTimeout(() => {

                        if (this.state.vlrrealizado !== '') {
                            var vlrrealizado = Number(this.state.vlrrealizado);
                            var percrealizado = (Number(vlrrealizado) / Number(vlrmeta)) * 100;

                            this.setState({ percrealizado: toFixed(percrealizado, 2) });

                            setTimeout(() => {
                                var vlracumuladobruto = Number(this.state.vlrtotalacumbruto);

                                this.setState({ vlracumuladobruto: toFixed(vlracumuladobruto, 2) });

                                setTimeout(() => {

                                    var percrealizadoacumuladobruto = (Number(vlracumuladobruto) / Number(vlrmetaacumulada)) * 100;

                                    this.setState({ percrealizadoacumuladobruto: toFixed(percrealizadoacumuladobruto, 2) });


                                    setTimeout(() => {
                                        var vlrliquido = Number(this.state.vlrliquido);

                                        if (this.state.vlrliquido !== '') {

                                            setTimeout(() => {
                                                var percrealizadoliquido = (Number(vlrliquido) / Number(vlrmeta)) * 100;

                                                this.setState({ percrealizadoliquido: toFixed(percrealizadoliquido, 2) });

                                                setTimeout(() => {
                                                    var vlracumuladoliquido = (Number(this.state.vlrtotalacumliquido));

                                                    this.setState({ vlracumuladoliquido: toFixed(vlracumuladoliquido, 2) });

                                                    setTimeout(() => {
                                                        var vlrtaxas = (Number(vlrrealizado) - Number(vlrliquido));

                                                        this.setState({ vlrtaxas: toFixed(vlrtaxas, 2) });

                                                        setTimeout(() => {
                                                            var perctaxas = ((Number(vlrtaxas) / Number(vlrrealizado)) * 100);

                                                            this.setState({ perctaxas: toFixed(perctaxas, 2) });
                                                            this.setState({ isActive: false });

                                                        }, 200);

                                                    }, 200);

                                                }, 200);

                                            }, 200);

                                        } else {
                                            this.setState({ isActive: false });
                                        }

                                    }, 200);


                                }, 200);

                            }, 200);
                        } else {
                            this.setState({ isActive: false });
                        }

                    }, 200);

                }, 200);
            }, 200);
            //#endregion
        } else {
            this.setState({ isActive: false });
        }

    }

    //#region Calculo Novo
    /*calculaGeral(){

        if (this.state.percmeta == null || this.state.percmeta == 0) {
           // this.setState({ percmeta: '' });
            this.setState({ vlrmeta: 0 });
            this.setState({ vlrliquido: '' });
            this.setState({ vlrrealizado: '' });
            this.setState({ vlrmetaacumulada: 0 });
        }

        if (this.state.vlrrealizado == null || this.state.vlrrealizado == 0 || this.state.percmeta == null || this.state.percmeta == 0) {
           // this.setState({ vlrrealizado: '' });
            this.setState({ percrealizado: 0 });
            //this.setState({ vlracumuladobruto: 0 });
            this.setState({ percrealizadoacumuladobruto: 0 });
        }
//#endregion

        if (this.state.vlrliquido == null || this.state.vlrliquido == 0 || this.state.vlrrealizado == null || this.state.vlrrealizado == 0 || this.state.percmeta == null || this.state.percmeta == 0) {
          //  this.setState({ vlrliquido: '' });
            this.setState({ percrealizadoliquido: 0 });
            //this.setState({ vlracumuladoliquido: 0 });
            this.setState({ perctaxas: 0 });
            this.setState({ vlrtaxas: 0 });
        }

        Promise.all([   
            this.setState({ isActive: true }),     
            this.calculaVlrMeta(),
            this.calculaVlrMetaAcum()
        ]).then(m => {
           
            if(this.state.vlrrealizado !== ''){
                Promise.all([
                    this.calculaPercRealizado(),
                  //  this.carregaVlrAcumuladoBruto(),
                    this.calculaPercRealizadoBruto()
                ]).then(a => {
                    if (this.state.vlrliquido !== '') {
                        Promise.all([
                            this.calculaPercRealizadoLiquido(),
                          //  this.carregaVlrAcumuladoLiquido(),
                            this.calculaVlrTaxas(),
                            this.calculaPercTaxas()
                        ])
                    } else {
                        this.setState({ isActive: false });
                    }
                });

            } else {
                this.setState({ isActive: false });
            }
        });  

    }*/

    handleChange(e) {
        const { name, value } = e.target;

        this.setState({ [name]: value });
        this.validate(e);
        this.getSaldoOperacao();
    }

    validate(e) {

        const { name, value } = e.target;

        if (name != undefined) {
            if (!value || (name == 'data' && value.length == 0)) {
                return this.setState({ [`${name}Error`]: true, [`${name}Message`]: "Campo obrigatório" });
            }

            if ((name == 'data' && (diaSemana(value) == 'Domingo' || diaSemana(value) == 'Sábado'))) {
                return this.setState({ [`${name}Error`]: true, [`${name}Message`]: "Data não pode ser Sábado ou Domingo" });
            }

            if (!value || (name == 'saldo_operacao' && (value.length == 0 || value == 0))) {
                return this.setState({ [`${name}Error`]: true, [`${name}Message`]: "Campo obrigatório" });
            }

            if (!value || (name == 'percmeta' && (value.length == 0 || value == 0))) {
                return this.setState({ [`${name}Error`]: true, [`${name}Message`]: "Campo obrigatório" });
            }
        }

        this.setState({ [`${name}Error`]: false, [`${name}Message`]: null });


    }

    isInvalid = () => {

        const { data, seqcontacorrente, percmeta, saldo_operacao, percmetaError, saldo_operacaoError, dataError, seqcontacorrenteError } = this.state;

        return !(
            data &&
            percmeta &&
            saldo_operacao &&
            seqcontacorrente &&
            !dataError &&
            !percmetaError &&
            !saldo_operacaoError &&
            !seqcontacorrenteError
        );
    }

    render() {
        const { classes } = this.props;
        const { id, seqcontacorrente, data, diasemana, saldo_operacao, percmeta, vlrmeta, vlrmetaacumulada, vlrrealizado, percrealizado, vlracumuladobruto, vlrliquido, percrealizadoliquido, vlracumuladoliquido, perctaxas, vlrtaxas, percrealizadoacumuladobruto } = this.state;

        return (
            <form name="form" onSubmit={this.handleSubmit} ref="form">

                <LoadingOverlay
                    active={this.state.isActive}
                    spinner
                    text='Calculando...'
                >

                    <GridContainer container
                        direction="row"
                        justify="center"
                        alignItems="stretch">
                        <GridItem xs={12} sm={12} md={6}>
                            <Card className={classes.card}>
                                <CardHeader color="rose" icon>
                                    <CardIcon color="rose">
                                        <LibraryBooks />
                                    </CardIcon>
                                </CardHeader>
                                <CardBody>

                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <CustomTextField
                                                labelText="DATA"
                                                id="data"
                                                required={true}
                                                value={data}
                                                name="data"
                                                type="date"
                                                onChange={this.handleChange}
                                                onBlur={this.handleChange}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                color={true}
                                                error={this.state.dataError}
                                                helpText={this.state.dataMessage}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <CustomSelect
                                                labelText="CONTA CORRENTE"
                                                value={seqcontacorrente}
                                                onChange={this.handleChange}
                                                onBlur={this.handleChange}
                                                MenuProps={{ className: classes.selectMenu }}
                                                className={classes.selectFormControl}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                name="seqcontacorrente"
                                                id="seqcontacorrente"
                                                error={this.state.seqcontacorrenteError}
                                                classesList={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelectedMultiple
                                                }}
                                                color={true}
                                                options={this.carregaComboContaCorrente()}
                                                helpText={this.state.seqcontacorrenteMessage}
                                            />
                                        </GridItem>

                                        <GridItem xs={12} sm={12} md={12}>
                                            <CustomInput
                                                labelText="DIA SEMANA"
                                                id="diasemana"
                                                required={false}
                                                value={diasemana}
                                                name="diasemana"
                                                onChange={this.handleChange}
                                                onBlur={this.validate}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    type: "text",
                                                    disabled: true
                                                }}
                                                error={this.state.diasemanaError}
                                                helpText={this.state.diasemanaMessage}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <CustomInput
                                                labelText="SALDO OPERAÇÃO"
                                                id="saldo_operacao"
                                                required={false}
                                                value={saldo_operacao}
                                                name="saldo_operacao"
                                                onChange={this.handleChange}
                                                onBlur={this.validate}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    disabled: true
                                                }}
                                                type="number"
                                                error={this.state.saldo_operacaoError}
                                                helpText={this.state.saldo_operacaoMessage}
                                            />
                                        </GridItem>


                                    </GridContainer>
                                </CardBody>
                            </Card>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <Card className={classes.card}>
                                <CardHeader color="rose" icon>
                                    <CardIcon color="rose">
                                        META
                                </CardIcon>
                                </CardHeader>
                                <CardBody>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <CustomInput
                                                labelText="% META"
                                                id="percmeta"
                                                required={false}
                                                value={percmeta}
                                                name="percmeta"
                                                onChange={this.handleChange}
                                                onBlur={this.validate}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                }}
                                                type="number"
                                                color={true}
                                                error={this.state.percmetaError}
                                                helpText={this.state.percmetaMessage}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <CustomInput
                                                labelText="VLR META"
                                                id="vlrmeta"
                                                required={false}
                                                value={vlrmeta}
                                                name="vlrmeta"
                                                onChange={this.handleChange}
                                                onBlur={this.validate}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    disabled: true
                                                }}
                                                type="number"
                                                error={this.state.vlrmetaError}
                                                helpText={this.state.vlrmetaMessage}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <CustomInput
                                                labelText="VLR META ACUMULADA"
                                                id="vlrmetaacumulada"
                                                required={false}
                                                value={vlrmetaacumulada}
                                                name="vlrmetaacumulada"
                                                onChange={this.handleChange}
                                                onBlur={this.validate}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    disabled: true
                                                }}
                                                type="number"
                                                error={this.state.vlrmetaacumuladaError}
                                                helpText={this.state.vlrmetaacumuladaMessage}
                                            />
                                        </GridItem>
                                    </GridContainer>
                                </CardBody>
                            </Card>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <Card className={classes.card} style={(this.state.percmeta > 0) ? { display: 'block' } : { display: 'none' }}>
                                <CardHeader color="rose" icon>
                                    <CardIcon color="rose">
                                        REALIZADO
                                </CardIcon>
                                </CardHeader>
                                <CardBody>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={12} >
                                            <CustomInput
                                                labelText="VLR REALIZADO"
                                                id="vlrrealizado"
                                                required={false}
                                                value={vlrrealizado}
                                                name="vlrrealizado"
                                                onChange={this.handleChange}
                                                onBlur={this.validate}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                }}
                                                type="number"
                                                color={true}
                                                error={this.state.vlrrealizadoError}
                                                helpText={this.state.vlrrealizadoMessage}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12} >
                                            <CustomInput
                                                labelText="% REALIZADO"
                                                id="percrealizado"
                                                required={false}
                                                value={percrealizado}
                                                name="percrealizado"
                                                onChange={this.handleChange}
                                                onBlur={this.validate}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    disabled: true
                                                }}
                                                type="number"
                                                error={this.state.percrealizadoError}
                                                helpText={this.state.percrealizadoMessage}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12} >
                                            <CustomInput
                                                labelText="ACUMULADO BRUTO"
                                                id="vlracumuladobruto"
                                                required={false}
                                                value={vlracumuladobruto}
                                                name="vlracumuladobruto"
                                                onChange={this.handleChange}
                                                onBlur={this.validate}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    disabled: true
                                                }}
                                                type="number"
                                                error={this.state.vlracumuladobrutoError}
                                                helpText={this.state.vlracumuladobrutoMessage}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12} >
                                            <CustomInput
                                                labelText="% REALIZADO ACUMULADO BRUTO"
                                                id="percrealizadoacumuladobruto"
                                                required={false}
                                                value={percrealizadoacumuladobruto}
                                                name="percrealizadoacumuladobruto"
                                                onChange={this.handleChange}
                                                onBlur={this.validate}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    disabled: true
                                                }}
                                                type="number"
                                                error={this.state.percrealizadoacumuladobrutoError}
                                                helpText={this.state.percrealizadoacumuladobrutoMessage}
                                            />
                                        </GridItem>

                                    </GridContainer>
                                </CardBody>
                            </Card>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <Card className={classes.card} style={(this.state.vlrrealizado > 0 || this.state.percmeta > 0) ? { display: 'block' } : { display: 'none' }}>
                                <CardHeader color="rose" icon>
                                    <CardIcon color="rose">
                                        LIQUIDO
                                </CardIcon>
                                </CardHeader>
                                <CardBody>
                                    <GridContainer>

                                        <GridItem xs={12} sm={12} md={12}>
                                            <CustomInput
                                                labelText="VLR LIQUIDO"
                                                id="vlrliquido"
                                                required={false}
                                                value={vlrliquido}
                                                name="vlrliquido"
                                                onChange={this.handleChange}
                                                onBlur={this.validate}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                }}
                                                type="number"
                                                color={true}
                                                error={this.state.vlrliquidoError}
                                                helpText={this.state.vlrliquidoMessage}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12} >
                                            <CustomInput
                                                labelText="% REALIZADO LIQUIDO"
                                                id="percrealizadoliquido"
                                                required={false}
                                                value={percrealizadoliquido}
                                                name="percrealizadoliquido"
                                                onChange={this.handleChange}
                                                onBlur={this.validate}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    disabled: true
                                                }}
                                                type="number"
                                                error={this.state.percrealizadoliquidoError}
                                                helpText={this.state.percrealizadoliquidoMessage}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12} >
                                            <CustomInput
                                                labelText="ACUMULADO LIQUIDO"
                                                id="vlracumuladoliquido"
                                                required={false}
                                                value={vlracumuladoliquido}
                                                name="vlracumuladoliquido"
                                                onChange={this.handleChange}
                                                onBlur={this.validate}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    disabled: true
                                                }}
                                                type="number"
                                                error={this.state.vlracumuladoliquidoError}
                                                helpText={this.state.vlracumuladoliquidoMessage}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <CustomInput
                                                labelText="% TAXAS"
                                                id="perctaxas"
                                                required={false}
                                                value={perctaxas}
                                                name="perctaxas"
                                                onChange={this.handleChange}
                                                onBlur={this.validate}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    disabled: true
                                                }}
                                                type="number"
                                                error={this.state.perctaxasError}
                                                helpText={this.state.perctaxasMessage}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12} >
                                            <CustomInput
                                                labelText="VLR TAXAS"
                                                id="vlrtaxas"
                                                required={false}
                                                value={vlrtaxas}
                                                name="vlrtaxas"
                                                onChange={this.handleChange}
                                                onBlur={this.validate}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    disabled: true
                                                }}
                                                type="number"
                                                error={this.state.vlrtaxasError}
                                                helpText={this.state.vlrtaxasMessage}
                                            />
                                        </GridItem>
                                    </GridContainer>

                                </CardBody>
                            </Card>
                        </GridItem>
                        <GridItem>
                            <Button color="default" type="button" className={classes.button} onClick={this.handleVoltar}>Lista</Button>
                            <CustomButton color="rose" type="submit" disabled={this.isInvalid()}>Salvar</CustomButton>
                        </GridItem>
                    </GridContainer>
                </LoadingOverlay>
            </form >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        alert: state.alert,
        contacorrentes: state.contacorrente.contacorrentes,
        trader: state.trader,
        authentication: state.authentication.user

    }
}

export default compose(
    connect(mapStateToProps),
    withStyles(styles)
)(Operacao);




// WEBPACK FOOTER //
// ./src/views/Forms/RegularForms.jsx