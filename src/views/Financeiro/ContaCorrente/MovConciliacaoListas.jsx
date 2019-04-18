import React from "react";
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import PropTypes, { number } from 'prop-types';
import ReactTable from "react-table";
import Datetime from "react-datetime";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
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
import Assignment from "@material-ui/icons/Assignment";
import { movimentacaoActions } from '../../../_actions/movimentacao.actions';
import { naturezaActions } from './../../../_actions/natureza.actions';
import { CentroCustoActions } from '../../../_actions/centrocusto.actions';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import classNames from 'classnames';
import withFixedColumns from 'react-table-hoc-fixed-columns';
import MovimentacaoFormsStyle from "../../../assets/jss/material-dashboard-pro-react/views/cadastros/movimentacao/movimentacao";
import { alertActions } from './../../../_actions/alert.actions';

import './MovConciliacaoListas.css';

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
    /*actions: {
        margin: "0 !important"
    },*/
    helperTextColor: {
        color: 'red'
    },
    iconSmall: {
        fontSize: 20,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    ...MovimentacaoFormsStyle,
});


class MovConciliacaoLista extends React.Component {
    
    constructor(props) {
        super(props);

        this.initialState = {
            naoConciliadosBB: [],
            items: [],
            loading: false
        };


        this.state = this.initialState;
        //this.filtrar = this.filtrar.bind(this);
        this.props.dispatch(naturezaActions.getAll(this.props.authentication.user.seqconta));
        this.props.dispatch(CentroCustoActions.getAll(this.props.authentication.user.seqconta));
        this.setValueCombosGrid = this.setValueCombosGrid.bind(this);
        this.handleChange = this.handleChange.bind(this);

        //this.filtrar();  
        
        
    }

    handleChange(e) {

        const { name, value } = e.target;
        let new_state = Object.assign({}, this.state); 
        let a = new_state.items;

          a[name] = value;
          this.setState({items: a});
    }


    componentDidMount(){
        
        //console.log('Child component Mounted');
    }

    componentWillUnmount(){
        //console.log('Child Component Unmounted');
    }
    

    setValueCombosGrid(param, historico, valor, data) { 
       var seqnatureza =  document.getElementById('seqnatureza_' + param).value;
       var seqcentrocusto = document.getElementById('seqcentrocusto_' + param).value;
       var parcelado = 'N';
       var recorrente = 'N';
       var status = 'A';
       var id = 0;
       var idConciliacao = param;
       var dtaprog = data;// moment(new Date(data)).format('YYYY-MM-DD');
       var dtavenc = data;       
       var parca = 1;
       var vlrpago = 0; 
       var vlroriginal = Math.abs(valor.replace('.', '').replace(',', '.'));
       var codbarra = null;
       var alteratudo = 'N';
       var observacao = "Importado da conta corrente - Banco do Brasil";
       var seqcontacorrente = document.getElementById("seqcontacorrente").value;

       if(seqnatureza > 0 && seqcentrocusto > 0 && seqcontacorrente > 0) {
           var seqconta = this.props.authentication.user.seqconta;
           this.props.dispatch(movimentacaoActions.addConciliacao(JSON.stringify({ id, status, historico, dtaprog, dtavenc, seqnatureza, parca, vlroriginal, vlrpago, codbarra, seqconta, seqcentrocusto, parcelado, recorrente, alteratudo, observacao, seqcontacorrente, idConciliacao })));
      
       }else{
           if(seqnatureza == 0) this.props.dispatch(alertActions.error('Selecione a natureza.'));
           if(seqcentrocusto == 0) this.props.dispatch(alertActions.error('Selecione a centro de custo.'));
           if(seqcontacorrente == 0) this.props.dispatch(alertActions.error('Selecione a conta corrente.'));
       }
      
       //this.props.filtrar();
              
    }

    carregaComboNatureza() {
        return this.props.natureza.naturezas.map((prop, key) => {
            return {
                label: prop.descricao,
                value: prop.id
            };
        });
    }

    carregaComboCentroCusto() {
        return this.props.centrocusto.centrocustos.map((prop, key) => {
            return {
                label: prop.descricao,
                value: prop.id
            };
        });
    }


    getData() {
        if (this.state.naoConciliadosBB != undefined && this.state.naoConciliadosBB != null) {
            return this.state.naoConciliadosBB.map((prop, key) => {
                return {
                    id: prop.id,
                    data: moment(prop.data).format('DD/MM/YYYY'),
                    dataOriginal: prop.data,
                    historico: prop.historico,
                    valor: (prop.valor != null) ? prop.valor.toLocaleString('pt-br', { minimumFractionDigits: 2 }) : '0,00'       
                }
            });
        }
    }

    componentWillReceiveProps(nextProps) { 
        if (this.props.movimentacao.naoConciliadosBB !== nextProps.movimentacao.naoConciliadosBB) {
            this.setState({ naoConciliadosBB: nextProps.movimentacao.naoConciliadosBB, loading: nextProps.movimentacao.loading });
        }
        
    }

    filterCaseInsensitive = (filter, row) => {
        const id = filter.pivotId || filter.id;
        return row[id] !== undefined
          ? String(row[id]).toLowerCase().startsWith(filter.value.toLowerCase())
          : true;
      };

    render() {
        const { classes } = this.props;
        const { items } = this.state;
        
        return (
        <div className="MovConc">
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <form name="form" ref="form">
                        <Card>
                            <CardHeader color="rose" icon>
                                <CardIcon color="rose">
                                    <Assignment />
                                </CardIcon>
                            </CardHeader>
                            <CardBody>
                                <ReactTableFixedColumns
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
                                            Header: "VALOR",
                                            accessor: "valor",
                                            sortable: false,
                                            filterable: false,
                                            getProps: (state, rowInfo, column, instance) => {
                                                if (rowInfo != null  && rowInfo != undefined) {
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
                                            Header: "CENTROCUSTO",
                                            accessor: "centrocusto",
                                            Cell: row => (<CustomSelect
                                                labelText=""
                                                value={(items["seqcentrocusto_" + row.original.id] != undefined) ? items["seqcentrocusto_" + row.original.id] : 0}
                                                required={false}
                                                onChange={this.handleChange}
                                                MenuProps={{ className: classes.selectMenu }}
                                                className={classes.selectFormControl}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                name={"seqcentrocusto_" + row.original.id}
                                                id={"seqcentrocusto_" + row.original.id}
                                                classesList={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelectedMultiple
                                                }}
                                                options={this.carregaComboCentroCusto()}
                                            />),
                                            sortable: false,
                                            filterable: false
                                        },
                                        {
                                            Header: "NATUREZA",
                                            accessor: "seqnatureza",
                                            Cell: row => (<CustomSelect
                                                labelText=""
                                                value={(items["seqnatureza_" + row.original.id] != undefined) ? items["seqnatureza_" + row.original.id] : 0}
                                                required={false}
                                                onChange={this.handleChange}
                                                MenuProps={{ className: classes.selectMenu }}
                                                className={classes.selectFormControl}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                name={"seqnatureza_" + row.original.id}
                                                id={"seqnatureza_" + row.original.id}
                                                classesList={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelectedMultiple
                                                }}
                                                options={this.carregaComboNatureza()}
                                            />),
                                            sortable: false,
                                            filterable: false
                                        },
                                        {
                                            Header: "",
                                            accessor: "actions",
                                            fixed: 'right',
                                            sortable: false,
                                            filterable: false,                                            
                                            Cell: row => (
                                                <Button variant="contained" color="default" size="small" className={classes.button}  onClick={() => { this.setValueCombosGrid(row.original.id, row.original.historico, row.original.valor, row.original.dataOriginal)}}>
                                                Lançar <Icon className={classNames(classes.rightIcon, classes.iconSmall)}>done</Icon>
                                            </Button>
                                            )
                                        }
                                    ]}
                                    // onFetchData={this.fetchData}
                                    minRows={1}
                                    style={{
                                        maxHeight: "400px" // This will force the table body to overflow and scroll, since there is not enough room
                                    }}
                                    loading={this.props.movimentacao.loading}
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
                    </form>
                </GridItem>
            </GridContainer>
        </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        movimentacao: state.movimentacao,
        alert: state.alert,
        authentication: state.authentication.user,
        natureza: state.natureza,
        centrocusto: state.centrocusto
    }
}

export default compose(
    connect(mapStateToProps),
    withStyles(styles)
)(MovConciliacaoLista);