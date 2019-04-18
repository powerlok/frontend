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
import Card from "../../../components/Card/Card";
import CardHeader from "../../../components/Card/CardHeader";
import CardBody from "../../../components/Card/CardBody";
import CustomSelect from "../../../components/CustomInput/CustomSelect";
import CardIcon from "../../../components/Card/CardIcon";
import { contaCorrenteActions } from '../../../_actions/contacorrente.actions';
import FormHelperText from "@material-ui/core/FormHelperText";
import ReactTable from "react-table";
import { traderActions } from '../../../_actions/trader.actions';
import InputLabel from "@material-ui/core/InputLabel";
import CustomTextField from "../../../components/CustomInput/CustomTextField";
import withFixedColumns from 'react-table-hoc-fixed-columns';
import CustomButton from "../../../components/CustomButtons/Button";
import './Historico.css';
var moment = require('moment');

const ReactTableFixedColumns = withFixedColumns(ReactTable);

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    helperTextColor: {
        color: 'red'
    }
});

class Historico extends React.Component {
    constructor(props) {
        super(props);

        this.initialState = {
            id: 0,
            historico: [],
            de: (this.props.de) ? this.props.de : moment(new Date(new Date().getFullYear(), new Date().getMonth(), 1)).format('YYYY-MM-DD'),
            ate: (this.props.ate) ? this.props.ate : moment(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)).format('YYYY-MM-DD'),
            seqcontacorrente: (this.props.seqcontacorrente) ? this.props.seqcontacorrente : "",
            loading: false
        };

        this.state = this.initialState;

        this.handleFilesChosen = this.handleFilesChosen.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.filtro = this.filtro.bind(this);
        this.validate = this.validate.bind(this);

        this.props.dispatch(contaCorrenteActions.getAll(this.props.authentication.user.seqconta));

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

    componentWillReceiveProps(nextProps) {
        if (nextProps.trader !== this.props.trader) { 
            this.setState({ historico: nextProps.trader.historico, loading: nextProps.trader.loading });
        }

        if (nextProps.alert !== this.props.alert) {
            if (this.state.id == '0' && nextProps.alert.type == 'success') {
                this.filtro();
            }
        }
    }

    handleChange(e) {
        const { name, value } = e.target;

        this.setState({ [name]: value });

        this.validate(e);

    }

    getData = () => {
        if (this.state.historico != undefined && this.state.historico != null) {

            return this.state.historico.map((prop, key) => {
                return {
                    id: prop.seqhistorico,
                    ativo: prop.ativo,
                    abertura: moment(prop.abertura).format('DD/MM/YYYY HH:mm:ss'),
                    fechamento: moment(prop.fechamento).format('DD/MM/YYYY HH:mm:ss'),
                    tempooperacao: prop.tempooperacao,
                    qtd: (prop.qtd != null) ? prop.qtd.toLocaleString('pt-br', { minimumFractionDigits: 0 }) : '0',
                    precocompra: (prop.precocompra != null) ? prop.precocompra.toLocaleString('pt-br', { minimumFractionDigits: 2 }) : '0,00',
                    precovenda: (prop.precovenda != null) ? prop.precovenda.toLocaleString('pt-br', { minimumFractionDigits: 2 }) : '0,00',
                    medio: prop.medio,
                    lado: prop.lado,
                    resultado: (prop.resultado != null) ? prop.resultado.toLocaleString('pt-br', { minimumFractionDigits: 2 }) : '0,00',
                    percresultado: (prop.percresultado != null) ? prop.percresultado.toLocaleString('pt-br', { minimumFractionDigits: 2 }) : '0,00',
                    total: (prop.total != null) ? prop.total.toLocaleString('pt-br', { minimumFractionDigits: 2 }) : '0,00'
                }
            });
        }
    }

    handleFilesChosen = (e) => {

        const { dispatch, authentication } = this.props;
        var file = e.target.files[0];
        var reader = new FileReader();

        reader.onload = (e) => {
            var csv = reader.result.replace(/["]/g, '');
            var lines = csv.split("\n");
            var result = [];
            var headers = lines[5].split(";");

            if (headers[0] == "Ativo" && headers[1] == "Abertura" && headers[2] == "Fechamento" && headers[3] == "Tempo Operação" && headers[4] == "Qtd" && headers[5] == "Lado" && headers[6] == "Preço Compra" && headers[7] == "Preço Venda" && headers[8] == "Médio" && headers[9] == "Resultado" && headers[10] == "Resultado(%)" && headers[11].trim() == "Total") {
                for (var i = 6; i < lines.length - 1; i++) {
                    var obj = {};

                    var currentline = lines[i].split(";");

                    for (var j = 0; j < headers.length; j++) {
                        var h = null;
                        switch (headers[j]) {
                            case "Resultado(%)":
                                h = "PercResultado";
                                break;
                            case "Tempo Operação":
                                h = "TempoOperacao";
                                break;
                            case "Preço Compra":
                                h = "PrecoCompra";
                                break;
                            case "Preço Venda":
                                h = "PrecoVenda";
                                break;
                            case "Médio":
                                h = "Medio";
                                break;
                            default:
                                h = headers[j].replace(/\s/g, '');
                                break;
                        }

                        obj[h] = currentline[j];
                    }

                    result.push(obj);
                }
                //return result; //JavaScript object
                result = JSON.stringify(result); //JSON

                if (result != null) {
                    dispatch(traderActions.addHistorico(window.btoa(unescape(encodeURIComponent(result))), authentication.user.seqconta, this.state.seqcontacorrente));
                }

                this.setState({ fileImportacaoError: false, fileImportacaoMessage: null });
            } else {

                this.setState({ fileImportacaoError: true, fileImportacaoMessage: "Csv não está no formato valído para realizar a importação. Verifique o formato do arquivo e as colunas do mesmo." });
            }

            document.getElementsByName('fileImportacao')[0].value = null;
        }

        reader.readAsText(file, 'ISO-8859-1');

    }

    filtro() {
        const { dispatch, authentication } = this.props;
        if(this.state.seqcontacorrente && this.state.de && this.state.ate)
        dispatch(traderActions.getHistorico(authentication.user.seqconta, this.state.seqcontacorrente, this.state.de, this.state.ate));
    }

    filterCaseInsensitive = (filter, row) => {
        const id = filter.pivotId || filter.id;
        return (
            row[id] !== undefined ?
                String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
                :
                true
        );
    }

    validate = (e) => {
        const { name, value } = e.target;
    }

    render() {
        const { classes } = this.props;
        const { seqcontacorrente, de, ate } = this.state;
        return (
            <div className="HistoricoCss">
                <form name="form" onSubmit={this.handleSubmit} ref="form">

                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <Card>
                                <CardHeader color="rose" icon>
                                    <CardIcon color="rose">
                                        <LibraryBooks />
                                    </CardIcon>
                                </CardHeader>
                                <CardBody>
                                    {this.props.filtro == undefined &&
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={2}>
                                            <InputLabel className={classes.label}>De</InputLabel>
                                            <CustomTextField
                                                labelText=""
                                                id="de"
                                                required={true}
                                                value={de}
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
                                                value={ate}
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
                                        <GridItem xs={12} sm={12} md={4}>
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
                                        <GridItem>
                                        <Button color="default" type="button" className={classes.button} onClick={this.filtro}>Filtrar</Button>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12} style={seqcontacorrente == 0 ? { display: "none" } : { display: "inline" }}>
                                            <input
                                                accept=".csv"
                                                className={classes.input}
                                                id="contained-button-file"
                                                name="fileImportacao"
                                                onChange={this.handleFilesChosen}
                                                multiple={false}
                                                type="file"
                                            />

                                            <label htmlFor="contained-button-file">
                                                <Button variant="contained" component="span" className={classes.button}>
                                                    Importar CSV
                                        </Button>
                                            </label>
                                            {this.state.fileImportacaoMessage !== undefined ? (
                                                <FormHelperText className={classes.helperTextColor}>
                                                    {this.state.fileImportacaoMessage}
                                                </FormHelperText>
                                            ) : null}
                                        </GridItem>
                                    </GridContainer>
                                    }
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <ReactTableFixedColumns
                                                data={this.getData()}
                                                filterable
                                                defaultFilterMethod={this.filterCaseInsensitive}
                                                columns={[
                                                    {
                                                        Header: "ATIVO",
                                                        accessor: "ativo",
                                                        sortable: true,
                                                        filterable: true,
                                                    },
                                                    {
                                                        Header: "ABERTURA",
                                                        accessor: "abertura",
                                                        sortable: true,
                                                        filterable: true,
                                                    },
                                                    {
                                                        Header: "FECHAMENTO",
                                                        accessor: "fechamento",
                                                        sortable: true,
                                                        filterable: true,
                                                    },
                                                    {
                                                        Header: "TEMPO",
                                                        accessor: "tempooperacao",
                                                        sortable: true,
                                                        filterable: true,
                                                    },
                                                    {
                                                        Header: "QTD",
                                                        accessor: "qtd",
                                                        sortable: false,
                                                        filterable: false,
                                                        getProps: (state, rowInfo, column, instance) => {
                                                            if (rowInfo != null && rowInfo != undefined) {
                                                                return {
                                                                    style: {
                                                                        color: parseInt(rowInfo.row.valor) < 0 ? 'red' : null
                                                                    }
                                                                }
                                                            }
                                                            return {};
                                                        }
                                                    },
                                                    {
                                                        Header: "LADO",
                                                        accessor: "lado",
                                                        sortable: false,
                                                        filterable: false,
                                                        getProps: (state, rowInfo, column, instance) => {
                                                            if (rowInfo != null && rowInfo != undefined) {
                                                                return {
                                                                    style: {
                                                                        color: parseInt(rowInfo.row.valor) < 0 ? 'red' : null
                                                                    }
                                                                }
                                                            }
                                                            return {};
                                                        }
                                                    },
                                                    {
                                                        Header: "PREÇO COMPRA",
                                                        accessor: "precocompra",
                                                        sortable: false,
                                                        filterable: false,
                                                        getProps: (state, rowInfo, column, instance) => {
                                                            if (rowInfo != null && rowInfo != undefined) {
                                                                return {
                                                                    style: {
                                                                        color: parseInt(rowInfo.row.valor) < 0 ? 'red' : null
                                                                    }
                                                                }
                                                            }
                                                            return {};
                                                        }
                                                    },
                                                    {
                                                        Header: "PREÇO VENDA",
                                                        accessor: "precovenda",
                                                        sortable: false,
                                                        filterable: false,
                                                        getProps: (state, rowInfo, column, instance) => {
                                                            if (rowInfo != null && rowInfo != undefined) {
                                                                return {
                                                                    style: {
                                                                        color: parseInt(rowInfo.row.valor) < 0 ? 'red' : null
                                                                    }
                                                                }
                                                            }
                                                            return {};
                                                        }
                                                    },
                                                    {
                                                        Header: "RESULTADO",
                                                        accessor: "resultado",
                                                        sortable: false,
                                                        filterable: false,
                                                        getProps: (state, rowInfo, column, instance) => {
                                                            if (rowInfo != null && rowInfo != undefined) {
                                                                return {
                                                                    style: {
                                                                        color: parseInt(rowInfo.row.valor) < 0 ? 'red' : null
                                                                    }
                                                                }
                                                            }
                                                            return {};
                                                        }
                                                    },
                                                    {
                                                        Header: "RESULTADO(%)",
                                                        accessor: "percresultado",
                                                        sortable: false,
                                                        filterable: false,
                                                        getProps: (state, rowInfo, column, instance) => {
                                                            if (rowInfo != null && rowInfo != undefined) {
                                                                return {
                                                                    style: {
                                                                        color: parseInt(rowInfo.row.valor) < 0 ? 'red' : null
                                                                    }
                                                                }
                                                            }
                                                            return {};
                                                        }
                                                    },
                                                    {
                                                        Header: "TOTAL",
                                                        accessor: "total",
                                                        sortable: false,
                                                        filterable: false,
                                                        getProps: (state, rowInfo, column, instance) => {
                                                            if (rowInfo != null && rowInfo != undefined) {
                                                                return {
                                                                    style: {
                                                                        color: parseInt(rowInfo.row.valor) < 0 ? 'red' : null
                                                                    }
                                                                }
                                                            }
                                                            return {};
                                                        }
                                                    }
                                                ]}
                                                // onFetchData={this.fetchData}
                                                /*style={{
                                                    maxHeight: "400px"
                                                }}*/
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
                                        </GridItem>
                                    </GridContainer>
                                </CardBody>
                            </Card>
                        </GridItem>
                    </GridContainer>
                </form>



            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        alert: state.alert,
        trader: state.trader,
        contacorrentes: state.contacorrente.contacorrentes,
        authentication: state.authentication.user

    }
}

export default compose(
    connect(mapStateToProps),
    withStyles(styles)
)(Historico);




// WEBPACK FOOTER //
// ./src/views/Forms/RegularForms.jsx