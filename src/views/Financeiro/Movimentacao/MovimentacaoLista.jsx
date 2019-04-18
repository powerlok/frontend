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
import Done from "@material-ui/icons/Done";
import Close from "@material-ui/icons/Close";
import RemoveCircleOutline from "@material-ui/icons/RemoveCircleOutline";
import AvTimer from "@material-ui/icons/AvTimer";
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
import CardText from "../../../components/Card/CardText";
import CardBody from "../../../components/Card/CardBody";
import CustomSelect from "../../../components/CustomInput/CustomSelect";
import CardIcon from "../../../components/Card/CardIcon";
import { movimentacaoActions } from '../../../_actions/movimentacao.actions';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import MovimentacaoDialog from './Movimentacao';
import MovimentacaoOperacaoDialog from './Movimentacao_Operacao';
import MovimentacaoFormsStyle from "../../../assets/jss/material-dashboard-pro-react/views/cadastros/movimentacao/movimentacao";
import MovimentacaoContaCorrenteLista from './Movimentacao_ContaCorrenteLista';
import { contaCorrenteActions } from '../../../_actions/contacorrente.actions';
import withFixedColumns from 'react-table-hoc-fixed-columns';
import './MovimentacaoLista.css';
import "moment/locale/pt-br";
var moment = require('moment');
moment.locale('pt-br');

const ReactTableFixedColumns = withFixedColumns(ReactTable);



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
        textAlign: "center",
        cursor: "pointer"
    },
    actions: {
        textAlign: "right",        
        width: "135px"
       // margin: "-16px 0px 0px -36px"
    },
    /*formControl: {
        //margin: "-2px",
        //paddingTop: "5px"
    },
    formControlSelect: {
        margin: "-2px",
        paddingTop: "3px",
    },  */  
    ...MovimentacaoFormsStyle
});


function Transition(props) {
    return <Slide direction="up" {...props} />;
}


class MovimentacaoLista extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = {
            seqmovimentacao: 0,
            openOperacao: false,
            open: false,
            movimentacoes: [],
            loading: false,
            de: moment(new Date(new Date().getFullYear(), new Date().getMonth(), 1)).format('YYYY-MM-DD') ,
            ate: moment(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)).format('YYYY-MM-DD'),
            totalOp: 0,
            totalOpAnterior: 0,
            vlraberto: 0,
            historico: '',
            status: 'A',
            processo: 0,            
            openMovCCLista: false,
            filtrar: false
        };

        this.state = this.initialState;
        this.optionsStatus = [{ label: "Aberto", value: 'A' }, { label: "Quitado", value: 'Q' }, { label: "Todos", value: 'T' }];


        //this.props.dispatch(movimentacaoActions.getSumTotMovOp(this.props.authentication.user.seqconta));

        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleClickOpenOperacao = this.handleClickOpenOperacao.bind(this);
        this.handleCloseOperacao = this.handleCloseOperacao.bind(this);
        this.validate = this.validate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.filtro = this.filtro.bind(this);
        this.handleClickMovCCListaOpen = this.handleClickMovCCListaOpen.bind(this);
        this.handleClickMovCCListaClose = this.handleClickMovCCListaClose.bind(this);

        this.filtro();
    }

    componentWillReceiveProps(nextProps) {// console.log(nextProps);
        if (this.props.movimentacao !== nextProps.movimentacao) {

            if (this.state.de == '0000-00-00') {
                this.setState({ de: moment(nextProps.movimentacao.de).format('YYYY-MM-DD') });
            }

            this.setState({
                movimentacoes: nextProps.movimentacao.movimentacoes,
                loading: nextProps.movimentacao.loading
            });

            if (nextProps.movimentacao.totalOp != undefined) {
                this.setState({ totalOp: nextProps.movimentacao.totalOp });
            }

            if (nextProps.movimentacao.totalOpAnterior != undefined) {
                this.setState({ totalOpAnterior: nextProps.movimentacao.totalOpAnterior });
            }
        }

        if (this.props.movimentacao.filtrar != nextProps.movimentacao.filtrar) {

            if (this.props.movimentacao.filtrar) this.filtro();
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.movimentacao.filtrar != this.props.movimentacao.filtrar){
            if(this.props.movimentacao.filtrar) this.filtro();
        }
    }

    calculaValorPago(valor, total, flag, fluxo) {
        if (flag == 0) {
            return total + valor;
        } else {
            return valor + fluxo;
        }
    }

    delete(id, processo, situacao, parcelado) {
        const { de, ate, status } = this.state;
        if (status != 'Q') {
            if (window.confirm("Tem certeza que quer deletar esta movimentação?")) {
                if (processo > 0 && parcelado == 'S') {
                    if (window.confirm("Gostaria de deletar todas as movimentações futuras associadas?")) {
                        this.props.dispatch(movimentacaoActions._delete(id, processo, situacao, de, ate, status));
                    } else {
                        this.props.dispatch(movimentacaoActions._delete(id, 0, situacao, de, ate, status));
                    }
                } else {

                    this.props.dispatch(movimentacaoActions._delete(id, 0, situacao, de, ate, status));
                }
            }
        } else {
            if (window.confirm("Tem certeza que quer retornar para aberto esta movimentacao?")) {
                this.props.dispatch(movimentacaoActions._delete(id, 0, situacao, de, ate, status));
            }
        }
    }

    filtro() {
        
        this.props.dispatch(movimentacaoActions.getAllFiltro(this.props.authentication.user.seqconta, this.state.de, this.state.ate, this.state.status));
        //this.setState({ filtro: true });
    }

    
    filtroCC(){
        this.props.dispatch(contaCorrenteActions.getBySeqConta(this.props.authentication.user.seqconta));
    }

    handleChange(e) {

        const { name, value } = e.target;

        this.setState({ [name]: value });

        //setTimeout(() => { this.validate(e)}, 500);
        //setTimeout(() => {this.validate(e);},100);
    }

    validate(e) { 
     
        //const { name, value } = e.target;       
       // console.log(name, value);
        //console.log(e);
        //if (name != undefined) {
        /*    if ((document.getElementById("de").value.length == 0)) {
                this.setState({ deError: true, deMessage: "Campo obrigatório" });                
            }else{
                
                if (document.getElementById("de").value > document.getElementById("ate").value) {
                    this.setState({ deError: true, deError: "Campo De não pode ser maior do que o Até" });
                }else{
                    this.setState({ deError: false, deMessage: null });
                }
            }

            if (document.getElementById("ate").value.length == 0) {
                this.setState({ ateError: true, ateMessage: "Campo obrigatório" });
            }else{
                this.setState({ ateError: false, ateMessage: null });
            }

            if (document.getElementById("status").value.length == 0) {
                this.setState({ situacaoError: true, situacaoError: "Campo obrigatório" });
            }else{
                this.setState({ situacaoError: false, situacaoError: null });
            }*/
       // }        

        /*  if (this.isInvalid() == false) {
              this.props.dispatch(movimentacaoActions.getAllFiltro(this.props.authentication.user.seqconta, this.state.de, this.state.ate, this.state.status));
          }*/
    }

    isInvalid = () => {

       /* const { de, ate, status, statusError, deError, ateError } = this.state;

        return !(
            de &&
            ate &&
            status &&
            !deError &&
            !ateError &&
            !statusError
        );*/
    }

    getData = () => {
        var flag = 0;
        var fluxo = 0;
        if (this.state.movimentacoes != undefined) {
            return this.state.movimentacoes.map((prop, key) => {

                var vlraberto = prop.vlroriginal - prop.vlrpago;
                fluxo = this.calculaValorPago(vlraberto, (this.state.totalOpAnterior + this.state.totalOp), flag, fluxo);

                flag++;
                
                return {
                    id: prop.id,
                    dataprog: moment(prop.dataprog).format('DD/MM/YYYY'),
                    datavenc: moment(prop.datavenc).format('DD/MM/YYYY'),
                    mes: prop.mes,
                    ano: prop.ano,
                    historico: prop.historico,
                    seqcontacorrente: prop.seqcontacorrente,
                    contacorrente: prop.contacorrente,
                    centrocusto: prop.centrocusto,
                    seqnatureza: prop.seqnatureza,
                    natureza: prop.natureza,
                    parcd: prop.parcd,
                    parca: prop.parca,
                    vlroriginal: (prop.vlroriginal != null) ? prop.vlroriginal.toLocaleString('pt-br', { minimumFractionDigits: 2 }) : '0,00',
                    vlrpago: (prop.vlrpago != null) ? Math.abs(prop.vlrpago).toLocaleString('pt-br', { minimumFractionDigits: 2 }) : '0,00',
                    situacao: (prop.status == 'A') ? "Aberto" : "Quitado",
                    codbarra: prop.codbarra,
                    vlraberto: (vlraberto) ? (vlraberto).toLocaleString('pt-br', { minimumFractionDigits: 2 }) : '0,00',
                    vlrfluxo: (fluxo != null) ? fluxo.toLocaleString('pt-br', { minimumFractionDigits: 2 }) : '0,00',
                    parcela: (prop.parcd > 0 && prop.parcelado == 'S') ? prop.parcd + '/' + prop.parca : "1",
                    cor: prop.cor,
                    actions: (
                        <div className={this.props.classes.actions}>
                            {(vlraberto != 0) &&
                                <CustomButton
                                    justIcon
                                    round
                                    simple
                                    onClick={() => { this.handleClickOpenOperacao(prop.id, vlraberto, prop.historico, prop.processo) }}
                                    color="primary"
                                    className="like"
                                ><Done /></CustomButton>
                            }
                            {" "}
                            <CustomButton
                                justIcon
                                round
                                simple
                                onClick={() => { this.handleClickOpen(prop.id) }}
                                color="info"
                                className="like"
                            ><Edit /></CustomButton>{" "}
                            {(prop.situacao != "Q") &&
                                <CustomButton
                                    justIcon
                                    round
                                    simple
                                    onClick={() => { this.delete(prop.id, prop.processo, 'A', prop.parcelado); }}
                                    color="danger"
                                    className="remove"
                                    title="Excluír"
                                >
                                    <Close />
                                </CustomButton>}
                            {(prop.situacao == "Q") &&
                                <CustomButton
                                    justIcon
                                    round
                                    simple
                                    onClick={() => { this.delete(prop.id, prop.processo, prop.situacao, prop.parcelado);}}
                                    color="danger"
                                    className="remove"
                                    title="Remover Quitado"
                                >
                                    <RemoveCircleOutline />
                                </CustomButton>}

                        </div>
                    )

                }
            });
        }
    }

    handleClickOpenOperacao = (id, vlraberto, historico, processo) => {
        this.setState({ openOperacao: true, seqmovimentacao: id, vlraberto: vlraberto, historico: historico, processo: processo });
    };

    handleCloseOperacao = () => {
        this.setState({ openOperacao: false });
        this.filtro();
    };

    handleClickOpen = (id) => {
        this.setState({ open: true, seqmovimentacao: id });
    };

    handleClose = () => {
        this.setState({ open: false });
        this.filtro();
    };

    handleClickMovCCListaOpen = () => {
        this.filtroCC();
        this.setState({ openMovCCLista: true });
    };

    handleClickMovCCListaClose = () => {
        this.setState({ openMovCCLista: false });
    };

    filterCaseInsensitive = (filter, row) => {
        const id = filter.pivotId || filter.id;
        return row[id] !== undefined
          ? String(row[id]).toLowerCase().startsWith(filter.value.toLowerCase())
          : true;
      };

    render() {
        const { classes } = this.props;

        return (
            <div className="MovCss">
            <GridContainer>
                <GridItem xs={12} sm={12} md={8}>
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
                                    <GridItem xs={12} sm={12} md={3}>
                                        
                                        <CustomSelect
                                            labelText="Situação"
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

                <GridItem xs={12} sm={12} md={1}>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                    <Card>
                        <CardBody>
                            <InputLabel className={classes.label}>R$</InputLabel>
                            <FormControl fullWidth className={classes.total} onClick={this.handleClickMovCCListaOpen}>
                                <span style={(this.state.totalOp < 0) ? { color: 'red' } : null}>{(this.state.totalOp != null) ? this.state.totalOp.toLocaleString('pt-br', { minimumFractionDigits: 2 }) : 0}</span>
                            </FormControl>
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="rose" icon>
                            <CardIcon color="rose">
                                <Assignment />
                            </CardIcon>
                            <Button color="secondary" aria-label="Add" variant="fab" className={this.props.classes.cardAction} onClick={() => { this.handleClickOpen(0) }}>
                                <AddIcon />
                            </Button>
                        </CardHeader>
                        <CardBody>
                            <MovimentacaoContaCorrenteLista open={this.state.openMovCCLista} close={this.handleClickMovCCListaClose}></MovimentacaoContaCorrenteLista>
                            <Dialog
                                fullScreen
                                open={this.state.openOperacao}
                                TransitionComponent={Transition}
                                aria-labelledby="form-dialog-title"
                                PaperProps={{
                                    style: {
                                        background: '#EEEEEE',
                                    }
                                }}
                            ><MovimentacaoOperacaoDialog onCloseOperacao={this.handleCloseOperacao} seqmovimentacao={this.state.seqmovimentacao} vlraberto={this.state.vlraberto} historico={this.state.historico} processo={this.state.processo} /></Dialog>
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
                            ><MovimentacaoDialog onClose={this.handleClose} seqmovimentacao={this.state.seqmovimentacao} /></Dialog>
                            <ReactTableFixedColumns
                                data={this.getData()}
                                filterable
                                defaultFilterMethod={this.filterCaseInsensitive}
                                columns={[
                                    {
                                        Header: "DATAPROG",
                                        accessor: "dataprog",
                                        sortable: true,
                                        filterable: false
                                    },
                                    {
                                        Header: "DATAVENC",
                                        accessor: "datavenc",
                                        sortable: true,
                                        filterable: false
                                    },
                                    {
                                        Header: "NATUREZA",
                                        accessor: "natureza",
                                        sortable: true,
                                        filterable: true,
                                        getProps: (state, rowInfo, column, instance) => {
                                            if (rowInfo != null  && rowInfo != undefined) {
                                                return {
                                                    style: {
                                                        fontWeight:"500",
                                                        color: rowInfo.original.cor != null ? rowInfo.original.cor : null
                                                    }
                                                }
                                            }
                                            return {};
                                        }
                                    },
                                    {
                                        Header: "HISTORICO",
                                        accessor: "historico",
                                        sortable: true,
                                        filterable: true
                                    },
                                    {
                                        Header: "CENTRO CUSTO",
                                        accessor: "centrocusto",
                                        sortable: false,
                                        filterable: false
                                    },
                                    {
                                        Header: "PARCELA",
                                        accessor: "parcela",
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
                                        Header: "VLR PAGTO",
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
                                    },
                                    {
                                        Header: "VLR ABERTO",
                                        accessor: "vlraberto",
                                        sortable: false,
                                        filterable: false,
                                        getProps: (state, rowInfo, column, instance) => {
                                            if (rowInfo != null && rowInfo != undefined) {
                                                return {
                                                    style: {
                                                        color: parseInt(rowInfo.row.vlraberto) < 0 ? 'red' : null
                                                    }
                                                }
                                            }
                                            return {};
                                        }
                                    },
                                    {
                                        Header: "FLUXO",
                                        accessor: "vlrfluxo",
                                        sortable: false,
                                        filterable: false,
                                        getProps: (state, rowInfo, column, instance) => {
                                            if (rowInfo != null  && rowInfo != undefined) {
                                                return {
                                                    style: {
                                                        color: parseInt(rowInfo.row.vlrfluxo) < 0 ? 'red' : null
                                                    }
                                                }
                                            }
                                            return {};
                                        }
                                    },
                                    {
                                        Header: "",
                                        accessor: "actions",
                                        fixed: 'right',
                                        sortable: false,
                                        filterable: false
                                    }
                                ]}
                                // onFetchData={this.fetchData}
                                minRows={1}
                              /*  style={{
                                    maxHeight: "800px" // This will force the table body to overflow and scroll, since there is not enough room
                                }}*/
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
                </GridItem>
            </GridContainer >
            </div>
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
)(MovimentacaoLista);
