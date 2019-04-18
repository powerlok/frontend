import React from "react";
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import ReactTable from "react-table";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
/*import Dvr from "@material-ui/icons/Dvr";*/
import Edit from "@material-ui/icons/Edit";

import Close from "@material-ui/icons/Close";
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
// core components
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import CustomButton from "../../../components/CustomButtons/Button";
import Card from "../../../components/Card/Card";
import CardBody from "../../../components/Card/CardBody";
import CardHeader from "../../../components/Card/CardHeader";
import CardIcon from "../../../components/Card/CardIcon";
import { cardTitle } from "../../../assets/jss/material-dashboard-pro-react";
import { contaCorrenteActions } from '../../../_actions/contacorrente.actions';

const styles = theme => ({
    cardIconTitle: {
        ...cardTitle,
        marginTop: "15px",
        marginBottom: "0px"
    },
    cardAction: {
        float: "right",
        margin: "-4px",
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    }
});

class ContaCorrenteList extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            contacorrentes: [],
            loading: false,
            show: false
        };

        this.props.dispatch(contaCorrenteActions.getAll(this.props.authentication.user.seqconta));
    }

    componentWillReceiveProps(proxProps) {
        if (this.props.contacorrente !== proxProps.contacorrente) {
            this.setState({ contacorrentes: proxProps.contacorrente.contacorrentes, loading: proxProps.contacorrente.loading });
        }
    }

    delete(id) {
        if (window.confirm("Tem certeza que quer deletar o registro?")) {
            this.props.dispatch(contaCorrenteActions._delete(id));
        }
    }

    linkCadastro(id) {
        if (id != 0) {
            this.props.history.push("/admin/cadastros/contacorrente", { "param": id });
        } else {
            this.props.history.push("/admin/cadastros/contacorrente");
        }
    }

    getData = () => {
        if (this.state.contacorrentes.length > 0) {
        return this.state.contacorrentes.map((prop, key) => {
            return {
                id: prop.id,
                descricao: prop.descricao,
                tipo: (prop.tipo == 'B') ? "Banco" : "Caixa",
                agencia: prop.agencia,
                nroconta: prop.nroconta,
                considerafluxo: (prop.considerafluxo == 'N') ? "Não" : "Sim",
                status: (prop.status == 'A') ? "Ativo" : "Inativo",
                banco: prop.banco,
                actions: (
                    <div className="actions-right">
                        <CustomButton
                            justIcon
                            round
                            simple
                            onClick={() => { this.linkCadastro(prop.id); }}
                            color="info"
                            className="like"
                        >
                            <Edit />
                        </CustomButton>{" "}

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

    filterCaseInsensitive = (filter, row) => {
        const id = filter.pivotId || filter.id;
        return row[id] !== undefined
          ? String(row[id]).toLowerCase().startsWith(filter.value.toLowerCase())
          : true;
      };


    render() {
        const { classes } = this.props;
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12}>
                        <Card>
                            <CardHeader color="rose" icon>
                                <CardIcon color="rose">
                                    <Assignment />
                                </CardIcon>
                                <Button color="secondary" aria-label="Add" variant="fab" className={classes.cardAction} onClick={() => { this.linkCadastro(0); }}>
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
                                            Header: "DESCRIÇÃO",
                                            accessor: "descricao",
                                            sortable: true,
                                            filterable: true
                                        },
                                        {
                                            Header: "TIPO",
                                            accessor: "tipo",
                                            sortable: true,
                                            filterable: true
                                        },
                                        {
                                            Header: "BANCO",
                                            accessor: "banco",
                                            sortable: true,
                                            filterable: true
                                        },
                                        {
                                            Header: "AGENCIA",
                                            accessor: "agencia",
                                            sortable: false,
                                            filterable: false
                                        },
                                        {
                                            Header: "NRO CONTA",
                                            accessor: "nroconta",
                                            sortable: false,
                                            filterable: false
                                        },
                                        {
                                            Header: "CONSIDERA FLUXO",
                                            accessor: "considerafluxo",
                                            sortable: false,
                                            filterable: false
                                        },
                                        {
                                            Header: "STATUS",
                                            accessor: "status",
                                            sortable: true,
                                            filterable: true
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
                                    defaultPageSize={10}
                                    showPaginationTop={false}
                                    showPaginationBottom={true}
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
                </GridContainer>

            </div>
        );
    }
}

const mapStateToProps = (state) => { //console.log(state.contacorrente);
    return {
        contacorrente: state.contacorrente,
        authentication: state.authentication.user
    }
}


export default compose(
    connect(mapStateToProps),
    withStyles(styles)
)(ContaCorrenteList);




// WEBPACK FOOTER //
// ./src/views/Forms/RegularForms.jsx