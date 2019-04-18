import React from "react";
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import ChartistGraph from "react-chartist";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "./../../../components/Grid/GridContainer.jsx";
import GridItem from "./../../../components/Grid/GridItem.jsx";
import Card from "./../../../components/Card/Card.jsx";
import CardHeader from "./../../../components/Card/CardHeader.jsx";
import CardIcon from "./../../../components/Card/CardIcon.jsx";
import CardBody from "./../../../components/Card/CardBody.jsx";
import CustomTextField from "../../../components/CustomInput/CustomTextField";
import Button from '@material-ui/core/Button';
import CustomSelect from "../../../components/CustomInput/CustomSelect";
import InputLabel from "@material-ui/core/InputLabel";
import { traderActions } from '../../../_actions/trader.actions';
import { corrigeNumeric } from '../../../_helpers/utils';
// @material-ui/icons
import Timeline from "@material-ui/icons/Timeline";
import { contaCorrenteActions } from '../../../_actions/contacorrente.actions';
import Line from './../../../components/Highcharts/Lines/lines';
import Bar from './../../../components/Highcharts/Bar/bar';
import LoadingOverlay from 'react-loading-overlay';
var moment = require('moment');
moment.locale('pt-br');


const styles = theme => ({
    labelRoot: {
        top: "-2px !important",
    },
    button: {
        margin: "13px -14px"
    },
    textAlign: {
        float: "right"
    },
    formControl: {
        margin: "-2px",
        paddingTop: "5px"
    },
    ctLabel: {
        fontColor: "black"
    }
});


class OperacaoGraficos extends React.Component {
    constructor(props) {
        super(props);

        this.initialState = {
            graficos: [],
            tipo: 'D',
            de: this.props.de,
            ate: this.props.ate,
            lineChart: {},
            barChart: {},
            seqcontacorrente: this.props.seqcontacorrente,
            loading: false
        };

        this.filtro = this.filtro.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validate = this.validate.bind(this);
        this.state = this.initialState;
        this.tipo = [{ label: "Semana", value: "D" }, { label: "Mês", value: "M" }, { label: "Dia", value: "T" }];

        this.filtro();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.trader.graficos !== nextProps.trader.graficos) {
            this.setState({
                graficos: nextProps.trader.graficos,
                loading: nextProps.trader.loading
            });
          
            if(this.state.de != '' && this.state.ate != '' && this.state.seqcontacorrente != '')
            this.props.getGetFiltro(this.state.de, this.state.ate, this.state.seqcontacorrente);
        }
    }

    carregaComboContaCorrente() {
        return this.props.contacorrentes.map((prop, key) => {
            return {
                label: prop.descricao,
                value: prop.id
            };
        });
    }

    handleChange(e) {

        const { name, value } = e.target;

        this.setState({ [name]: value });

        this.validate(e);

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
                return this.setState({ "deError": true, "deMessage": "Campo De não pode ser maior do que o até" });
            }

            if (!value || (name == 'tipo' && value.length == 0)) {
                return this.setState({ [`${name}Error`]: true, [`${name}Message`]: "Campo obrigatório" });
            }
        }

        this.setState({ [`${name}Error`]: false, [`${name}Message`]: null });
        if (this.state.tipo == '') this.setState({ filtro: false });


    }

    isInvalidFiltro() {
        const { de, ate, tipo, tipoError, deError, ateError } = this.state;

        return !(
            de &&
            ate &&
            tipo &&
            !deError &&
            !ateError &&
            !tipoError
        );

    }



    getGraficoValores() {
        var data = {
            labels: [],
            series: []
        };

        if (this.state.graficos.diames != undefined && this.state.tipo != '' && this.state.de != '' && this.state.ate != '') {

            if (this.state.graficos.diames.length > 0) {

                this.state.graficos.diames.forEach(e => {
                    var _v = [];
                    e.labels.split('|').forEach(e => {
                        e.split(',').forEach(d => {
                            _v.push(d);
                        });
                    });
                    // var _s_ = [];
                    var series = [];
                    var legend = ["Meta", "Liquido", "Bruto"];
                    var i = 0;
                    e.series.split('|').forEach(j => {
                        var _s = [];
                        j.split(',').forEach(d => {
                            _s.push(parseFloat(d));
                        });
                        // _s_.push(_s);

                        series.push({ name: legend[i], data: _s });

                        i++;
                    });

                    data = {
                        labels: _v,
                        series: series
                    }
                });
            }
        }

        return data;

    }

    getGraficoValoresDia() {
        var data = {
            labels: [],
            series: []
        };

        if (this.state.graficos.diames != undefined && this.state.tipo != '' && this.state.de != '' && this.state.ate != '') {

            if (this.state.graficos.diames.length > 0) {

                this.state.graficos.diames.forEach(e => {
                    var _v = [];
                    e.labels.split('|').forEach(e => {
                        e.split(',').forEach(d => {
                            _v.push(d);
                        });
                    });
                    // var _s_ = [];
                    var series = [];
                    var legend = ["Meta", "Liquido", "Bruto"];
                    var i = 0;
                    e.series.split('|').forEach(j => {
                        var _s = [];
                        j.split(',').forEach(d => {
                            _s.push(parseFloat(d));
                        });
                        // _s_.push(_s);

                        series.push({ name: legend[i], data: _s });

                        i++;
                    });

                    data = {
                        labels: _v,
                        series: series
                    }
                });
            }
        }

        return data;

    }

    filtro() {
        if(this.state.de != '' && this.state.ate != '' && this.state.seqcontacorrente != '')
        this.props.dispatch(traderActions.getTraderOperacaoDiaMes(this.state.tipo, this.state.de, this.state.ate, this.props.authentication.user.seqconta, this.state.seqcontacorrente));
    }

    render() {
        const { classes } = this.props;
        const { } = this.state;
        return (<div>
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
                                        <InputLabel className={classes.label}>Conta Corrente</InputLabel>
                                        <CustomSelect
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
                                        <CustomSelect
                                            labelText="Tipo"
                                            value={this.state.tipo}
                                            onChange={this.handleChange}
                                            onBlur={this.handleChange}
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
                                            color={true}
                                            options={this.tipo}
                                            helpText={this.state.tipoMessage}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={1}>
                                        <Button color="default" type="button" className={classes.button} disabled={this.isInvalidFiltro()} onClick={this.filtro}>Filtrar</Button>
                                    </GridItem>
                                </GridContainer>
                            </CardBody></Card>
                    </form>
                </GridItem>
            </GridContainer>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <LoadingOverlay
                        active={this.state.loading}
                        spinner
                    //text='Carregando...'
                    >
                        <Card>
                            <CardHeader color="rose" icon>
                                <CardIcon color="rose">
                                    <Timeline />
                                </CardIcon>
                                <h4 className={classes.cardIconTitle}>
                                    <small>Barra</small>
                                </h4>
                            </CardHeader>
                            <CardBody>

                                <Bar title="Bar" titleX="" data={this.getGraficoValores()} vAlign="middle" />
                                {/* <ChartistGraph
                                data={this.getGraficoBarra().data}
                                type="Bar"
                                options={this.getGraficoBarra().options}
                                listener={this.getGraficoBarra().animation}
                            /> */}
                            </CardBody>
                        </Card>

                    </LoadingOverlay>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                    <LoadingOverlay
                        active={this.state.loading}
                        spinner
                    //text='Carregando...'
                    >
                        <Card>
                            <CardHeader color="warning" icon>
                                <CardIcon color="warning">
                                    <Timeline />
                                </CardIcon>
                                <h4 className={classes.cardIconTitle}>
                                    <small>Linhas</small>
                                </h4>
                            </CardHeader>
                            <CardBody>

                                <Line title="Line" titleX="" data={this.getGraficoValores()} vAlign="middle" />
                                {/* <div id="lineLegend"></div>
                            <ChartistGraph
                                data={this.getGraficoLinha().data}
                                type="Line"
                                options={this.getGraficoLinha().options}
                                listener={this.getGraficoLinha().animation}
                            /> */}
                            </CardBody>
                        </Card>

                    </LoadingOverlay>
                </GridItem>
            </GridContainer>
            {/* <GridContainer>
                
                <GridItem xs={12} sm={12} md={6}>
                    <Card>
                        <CardHeader color="danger" icon>
                            <CardIcon color="danger">
                                <Timeline />
                            </CardIcon>
                            <h4 className={classes.cardIconTitle}>Pie Chart</h4>
                        </CardHeader>
                        <CardBody>
                            <ChartistGraph
                                data={pieChart.data}
                                type="Pie"
                                options={pieChart.options}
                            />
                        </CardBody>
                        <CardFooter stats className={classes.cardFooter}>
                            <h6 className={classes.legendTitle}>Legend</h6>
                            <i className={"fas fa-circle " + classes.info} /> Apple{` `}
                            <i
                                className={"fas fa-circle " + classes.warning}
                            /> Samsung{` `}
                            <i className={"fas fa-circle " + classes.danger} /> Windows
                       Phone{` `}
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer> */}
        </div>);
    }

}


const mapStateToProps = (state) => {
    return {
        alert: state.alert,
        contacorrentes: state.contacorrente.contacorrentes,
        trader: state.trader,
        loading: state.contacorrente.loading,
        authentication: state.authentication.user

    }
}

export default compose(
    connect(mapStateToProps),
    withStyles(styles)
)(OperacaoGraficos);
