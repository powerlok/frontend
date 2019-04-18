import React from "react";
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import ReactTable from "react-table";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Assignment from "@material-ui/icons/Assignment";
import Button from '@material-ui/core/Button';
import Close from "@material-ui/icons/Close";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import AddIcon from '@material-ui/icons/Add';
// core components
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import CustomTextField from "../../../components/CustomInput/CustomTextField";
import CustomButton from "../../../components/CustomButtons/Button";
import Card from "../../../components/Card/Card";
import CardHeader from "../../../components/Card/CardHeader";
import CardBody from "../../../components/Card/CardBody";
import CustomSelect from "../../../components/CustomInput/CustomSelect";
import CardIcon from "../../../components/Card/CardIcon";
import { movimentacaoActions } from '../../../_actions/movimentacao.actions';
import MovimentacaoFormsStyle from "../../../assets/jss/material-dashboard-pro-react/views/cadastros/movimentacao/movimentacao";
import { contaCorrenteActions } from '../../../_actions/contacorrente.actions';
import MovimentacaoOperacaoDialog from './Movimentacao_Operacao';
import MovConciliacaoLista from './MovConciliacaoListas';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import FormHelperText from "@material-ui/core/FormHelperText";

import "moment/locale/pt-br";
var moment = require('moment');
moment.locale('pt-br');

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}


const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    cardAction: {
        float: "right",
        margin: "-4px",
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
    total: {
        fontWeight: "400",
        fontSize: "20px",
        textAlign: "center"
    },
    actions: {
        width: "139px",
        textAlign: "right",
        margin: "0 0px 0px -36px"
    },
    input: {
        display: 'none',
    },
    helperTextColor: {
        color: 'red'
    },
    ...MovimentacaoFormsStyle
});


function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class MovContaCorrenteLista extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = {
            open: false,
            movcontacorrente: [],
            contacorrentes: [],
            loading: false,
            seqcontacorrente: "",
            totalOpCC: 0,
            de: moment(new Date()).format('YYYY-MM-DD'),
            ate: moment(new Date()).format('YYYY-MM-DD'),
            filtro: false,
            tabs: 0,
            showChild : true,
        };

        this.state = this.initialState;

        this.handleChange = this.handleChange.bind(this);
        this.validate = this.validate.bind(this);
        this.handleTabsChange = this.handleTabsChange.bind(this);
        this.handleFilesChosen = this.handleFilesChosen.bind(this);
        this.filtrarConciliacao = this.filtrarConciliacao.bind(this);
        this.handleOpenContaCorrente = this.handleOpenContaCorrente.bind(this);
        this.filtrar = this.filtrar.bind(this);
        this.props.dispatch(contaCorrenteActions.getAll(this.props.authentication.user.seqconta));
        
    }


    handleChange(e) {

        const { name, value } = e.target;

        this.setState({ [name]: value });

        this.validate(e);

        setTimeout(() => {
            this.filtrar();
        },500)

       
        if(name == "seqcontacorrente") {
         this.filtrarConciliacao(value);
        }
    }

    validate(e) {
        //const { name, value } = e.target;
        //if (name !== undefined) {   
        if (!moment(document.getElementById('de').value, 'YYYY-MM-DD').isValid()) {
             this.setState({ deError: true, deMessage: "Campo obrigatório" });
        }else{
            if (document.getElementById('de').value > document.getElementById('ate').value) {
                this.setState({ deError: true, deMessage: "Campo De não pode ser maior do que o até" });
            }else{
                this.setState({ deError: false, deMessage: null });
            }
        }

        if (!moment(document.getElementById('ate').value, 'YYYY-MM-DD').isValid()) {
             this.setState({ ateError: true, ateMessage: "Campo obrigatório" });
        }else{
            this.setState({ ateError: false, ateMessage: null });
        }

        if (document.getElementById('seqcontacorrente').value.length === 0) {
             this.setState({ seqcontacorrenteError: true, seqcontacorrenteMessage: "Campo obrigatório" });
        }else{
            this.setState({ seqcontacorrenteError: false, seqcontacorrenteMessage: null });
            this.setState({ filtro: false });
        }
        //}
        
    }

    isInvalid = () => {

        const { de, ate, seqcontacorrente, seqcontacorrenteError, deError, ateError } = this.state;

        return !(
            de &&
            ate &&
            seqcontacorrente &&
            !deError &&
            !ateError &&
            !seqcontacorrenteError
        );
    }

    carregaComboContaCorrente() { 
        return this.state.contacorrentes.map((prop, key) => {
            return {
                label: prop.descricao,
                value: prop.id
            };
        });
    }

    componentWillReceiveProps(nextProps) { 
        if (this.props.movimentacao.movcontacorrente !== nextProps.movimentacao.movcontacorrente) {
            this.setState({ movcontacorrente: nextProps.movimentacao.movcontacorrente, loading: nextProps.movimentacao.loading, totalOpCC: nextProps.movimentacao.totalOp });
        }

        if(this.props.contacorrente.contacorrentes != nextProps.contacorrente.contacorrentes){
            this.setState({ contacorrentes: nextProps.contacorrente.contacorrentes });
        }
    }

    filtrar() {  
          if(!this.isInvalid()) {           
           this.props.dispatch(movimentacaoActions.getAllMovOpCC(this.props.authentication.user.seqconta, this.state.de, this.state.ate, this.state.seqcontacorrente));
          }else{
              this.setState({ movcontacorrente: []});
          }
           //this.setState({ filtro: true});
        
    }

    filtrarConciliacao(seqcontacorrente) { 
        var contacorrente = (seqcontacorrente) ? seqcontacorrente : 0;
        this.props.dispatch(movimentacaoActions.getNaoConciliadasBB(this.props.authentication.user.seqconta, contacorrente));
        
    }

    delete(id) {
        if (window.confirm("Tem certeza que quer deletar esta movimentação?")) {
            this.props.dispatch(movimentacaoActions._deleteMovCC(id));
        }
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
        this.filtrar();
    };

    getData = () => { 
        if (this.state.movcontacorrente !== undefined && this.state.movcontacorrente !== null) {
            
            return this.state.movcontacorrente.map((prop, key) => {
                return {
                    id: prop.id,
                    seqcontacorrente: prop.seqcontacorrente,
                    contacorrente: prop.contacorrente,
                    data: moment(prop.data).format('DD/MM/YYYY'),
                    valor: (prop.valor !== null) ? prop.valor.toLocaleString('pt-br', { minimumFractionDigits: 2 }) : '0,00',
                    dc: (prop.dc == 'C') ? "Crédito" : "Débito",
                    historico: prop.historico,
                    actions: (
                        <div className={this.props.classes.actions}>
                            <CustomButton
                                justIcon
                                round
                                simple
                                onClick={() => { this.delete(prop.id); }}
                                color="danger"
                                className="remove"
                                title="Excluír"
                            >
                                <Close />
                            </CustomButton>
                        </div>
                    )
                }
            });
        }
    }

    filterCaseInsensitive = (filter, row) => {
        const id = filter.pivotId || filter.id;
        return row[id] !== undefined
          ? String(row[id]).toLowerCase().startsWith(filter.value.toLowerCase())
          : true;
      };

    handleTabsChange = (event, tabs) => {
        this.setState({ tabs });
    };

    handleFilesChosen = (e) => { 
        var seqcontacorrente = document.getElementById("seqcontacorrente").value;

        const { dispatch, authentication } = this.props;
        var file = e.target.files[0];
        var reader = new FileReader();

        reader.onload = (e) => {
            var csv = reader.result.replace(/["]/g, '');
            var lines = csv.split("\n");
            var result = [];
            var headers = lines[0].split(",");

            if (headers[0] == "Data" && headers[1] == "Dependencia Origem" && headers[2] == "Histórico" && headers[3] == "Data do Balancete" && headers[4] == "Número do documento" && headers[5] == "Valor") {
                for (var i = 1; i < lines.length - 1; i++) {
                    var obj = {};

                    var currentline = lines[i].split(",");

                    for (var j = 0; j < headers.length - 1; j++) {
                        obj[headers[j].replace(/\s/g, '')] = currentline[j];
                    }
                    result.push(obj);
                }
                //return result; //JavaScript object
                result = JSON.stringify(result); //JSON

                if (result !== null) {
                    dispatch(movimentacaoActions.getImportaContaCorrente(window.btoa(unescape(encodeURIComponent(result))), authentication.user.seqconta, seqcontacorrente));
                }
                this.setState({ fileImportacaoError: false, fileImportacaoMessage: null });
            } else {
                
                this.setState({ fileImportacaoError: true, fileImportacaoMessage: "Csv não está no formato valído para realizar a importação. Acesse sua conta e gere um novo csv com as informações de sua conta corrente do Banco do Brasil." });
            }

            document.getElementsByName('fileImportacao')[0].value = null;
        }

        reader.readAsText(file, 'ISO-8859-1');

    }

    handleOpenConciliacao = () => {
        this.filtrarConciliacao(this.state.seqcontacorrente);
    }

    handleOpenContaCorrente = () => {
        this.filtrar();        
    }

    render() {
        const { classes } = this.props;
        const { tabs } = this.state;
        return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={8}>
                    <form name="form" ref="form">
                        <Card>
                            <CardBody>
                                <Dialog
                                    fullScreen
                                    open={this.state.open}
                                    TransitionComponent={Transition}
                                    aria-labelledby="form-dialog-title"
                                    PaperProps={{
                                        style: {
                                            background: '#EEEEEE',
                                        }
                                    }}
                                ><MovimentacaoOperacaoDialog onClose={this.handleClose} seqcontacorrente={this.state.seqcontacorrente} /></Dialog>

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
                                                helpText={this.state.deMessage}
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
                                                helpText={this.state.ateMessage}
                                            />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
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
                                            helpText={this.state.seqcontacorrenteMessage}
                                        />
                                    </GridItem>
                                    {/* <GridItem>
                                        <Button color="default" type="button" className={classes.button} onClick={() => { this.filtrar(2)}} disabled={this.isInvalid()}>Filtrar</Button>
                                    </GridItem> */}
                                </GridContainer>
                            </CardBody></Card>
                    </form>
                </GridItem>

                <GridItem xs={12} sm={12} md={1}>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                    <Card>
                        <CardBody>
                            <InputLabel className={classes.label}>R$</InputLabel>
                            <FormControl fullWidth className={classes.total} >
                                <span style={(this.state.totalOpCC < 0) ? { color: 'red' } : null}>{(this.state.totalOpCC !== null) ? this.state.totalOpCC.toLocaleString('pt-br', { minimumFractionDigits: 2 }) : 0}</span>
                            </FormControl>
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={2}></GridItem>
                <GridItem xs={12}>
                    <AppBar position="static" color="default">
                        <Tabs
                            value={tabs}
                            onChange={this.handleTabsChange}
                            indicatorColor="primary"
                            textColor="primary"
                            scrollable
                            scrollButtons="auto"
                        >
                            <Tab label="Conta Corrente" onClick={() => { this.handleOpenContaCorrente()}} />
                            <Tab label="Conciliação Banco Brasil" onClick={() => { this.handleOpenConciliacao()}} />
                        </Tabs>
                    </AppBar>

                    {tabs === 0 &&
                        <TabContainer>
                            <Card>
                                <CardHeader color="rose" icon>
                                    <CardIcon color="rose">
                                        <Assignment />
                                    </CardIcon>

                                    <Button color="secondary" aria-label="Add" variant="fab" className={this.props.classes.cardAction} style={(this.state.filtro == false) ? { display: 'none' } : { display: 'block' }} onClick={() => { this.handleClickOpen() }}>
                                        <AddIcon />
                                    </Button>
                                </CardHeader>
                                <CardBody>
                                    <ReactTable
                                        data={this.getData()}
                                        filterable
                                        defaultFilterMethod={this.filterCaseInsensitive}
                                        columns={[
                                            {
                                                Header: "DATA",
                                                accessor: "data",
                                                sortable: true,
                                                filterable: true,
                                                width: Math.round(window.innerWidth * 0.1)
                                            },
                                            {
                                                Header: "HISTORICO",
                                                accessor: "historico",
                                                sortable: true,
                                                filterable: true,
                                                width: Math.round(window.innerWidth * 0.3)
                                            },
                                            {
                                                Header: "DC",
                                                accessor: "dc",
                                                sortable: true,
                                                filterable: true
                                            },
                                            {
                                                Header: "VALOR",
                                                accessor: "valor",
                                                sortable: false,
                                                filterable: false,
                                                getProps: (state, rowInfo, column, instance) => {
                                                    if (rowInfo !== null && rowInfo != undefined) {
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
                                                Header: "",
                                                accessor: "actions",
                                                sortable: false,
                                                filterable: false
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

                                </CardBody>
                            </Card>
                        </TabContainer>
                    }
                    {tabs === 1 &&
                        <TabContainer>
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
                                    Importar CSV - Conta Corrente
                                    </Button>
                            </label>
                            {this.state.fileImportacaoMessage !== undefined ? (
                                <FormHelperText className={classes.helperTextColor}>
                                    {this.state.fileImportacaoMessage}
                                </FormHelperText>
                            ) : null}

                          
                            <MovConciliacaoLista  />
                                            
                        </TabContainer>
                    }
                </GridItem>
            </GridContainer >
        )

    };
}

const mapStateToProps = (state) => {
    return {
        movimentacao: state.movimentacao,
        contacorrente: state.contacorrente,
        alert: state.alert,
        authentication: state.authentication.user
    }
}

export default compose(
    connect(mapStateToProps),
    withStyles(styles)
)(MovContaCorrenteLista);
