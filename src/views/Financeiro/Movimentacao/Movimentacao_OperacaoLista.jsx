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
import { movimentacaoActions } from '../../../_actions/movimentacao.actions';

import "moment/locale/pt-br";
var moment = require('moment');

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
    }
});


class MovimentacaoOperadorLista extends React.Component {
    constructor(props) {
        super(props);

        this.initialState = {
            movimentacoesOp: [],
            loading: false,
        };

        this.state = this.initialState;

        this.props.dispatch(movimentacaoActions.getAllMovOp(this.props.authentication.user.seqconta, this.props.seqmovimentacao));

    }

    componentWillReceiveProps(nextProps) { //console.log(this.props.movimentacao);
        if (this.props.movimentacao !== nextProps.movimentacao) {
            this.setState({ movimentacoesOp: nextProps.movimentacao.movimentacoesOp, loading: nextProps.movimentacao.loading });
        }

    }

    /* delete(id) {
         this.props.dispatch(movimentacaoActions._deleteMovOp(id));
     }*/

    getData = () => {
         if (this.state.movimentacoesOp != undefined) {
        return this.state.movimentacoesOp.map((prop, key) => {
            return {
                id: prop.id,
                contacorrente: prop.contacorrente,
                movimentacao: prop.movimentacao,
                valor: prop.valor.toFixed(2),
                data: moment(prop.data).format('DD-MM-YYYY HH:mm:ss'),
                actions: (
                    <div className="actions-right">
                        <CustomButton
                            justIcon
                            round
                            simple
                            onClick={() => { this.delete(prop.id); }}
                            color="danger"
                            className="remove"
                        >
                            <Close />
                        </CustomButton>{" "}

                    </div>
                )
            }
        });
        }
    }

    render() {
        const { classes } = this.props;
      //  console.log(this.state);
        return (
            <GridContainer container
                direction="column"
                justify="flex-start"
                style={{
                    padding: '0 15px 0 15px'
                }}>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="rose" icon>
                            <CardIcon color="rose">
                                <LibraryBooks />
                            </CardIcon>
                        </CardHeader>
                        <CardBody>
                            <ReactTable
                                data={this.getData()}
                                filterable
                                columns={[
                                    {
                                        Header: "Data",
                                        accessor: "data",
                                        sortable: false,
                                        filterable: false
                                    },
                                    {
                                        Header: "CONTA CORRENTE",
                                        accessor: "contacorrente",
                                        sortable: false,
                                        filterable: false
                                    },
                                    {
                                        Header: "MOVIMENTAÇÃO",
                                        accessor: "movimentacao",
                                        sortable: false,
                                        filterable: false
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
)(MovimentacaoOperadorLista);
