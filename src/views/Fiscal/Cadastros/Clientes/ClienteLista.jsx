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
import GridContainer from "../../../../components/Grid/GridContainer";
import GridItem from "../../../../components/Grid/GridItem";
import CustomButton from "../../../../components/CustomButtons/Button";
import Card from "../../../../components/Card/Card";
import CardBody from "../../../../components/Card/CardBody";
import CardHeader from "../../../../components/Card/CardHeader";
import CardIcon from "../../../../components/Card/CardIcon";
import { cardTitle } from "../../../../assets/jss/material-dashboard-pro-react";
import { clientesActions } from '../../../../_actions/Fiscal/clientes.actions';

const styles = theme => ({
    cardIconTitle: {
        ...cardTitle,
        marginBottom: "0px"
    },
    cardAction: {
        float: "right",
        margin: "-6px",
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    }
});

class ClienteList extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            clientes: [],
            loading: false,
            show: false
        };

        this.props.dispatch(clientesActions.getAll(this.props.authentication.user.seqconta));
    }

    componentDidUpdate(prevProps) {
        if (this.props.clientes !== prevProps.clientes) {
            this.setState({ clientes: this.props.clientes.clientes, loading: this.props.clientes.loading });
        }
    }

    delete(id) {
        if (window.confirm("Tem certeza que quer deletar o registro?")) {
            this.props.dispatch(clientesActions._delete(id));
        }
    }

    linkCadastro(id) {
        if (id != 0) {
            this.props.history.push("/admin/fiscal/cadastros/clientes/cliente", { "param": id });
        } else {
            this.props.history.push("/admin/fiscal/cadastros/clientes/cliente");
        }
    }

    getData = () => {
     if (this.state.clientes.length > 0) {
        return this.state.clientes.map((prop, key) => {
            return {
                id: prop.id,
                nome: prop.nome,
                data: prop.data,
              //  status: (prop.status == 'A') ? "Ativo" : "Inativo",
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
                                            Header: "NOME",
                                            accessor: "nome",
                                            sortable: true,
                                            filterable: true
                                        },
                                        {
                                            Header: "DATA",
                                            accessor: "data",
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

const mapStateToProps = (state) => { //console.log(state.grupo);
    return {
        clientes: state.clientes,
        authentication: state.authentication.user
    }
}


export default compose(
    connect(mapStateToProps),
    withStyles(styles)
)(ClienteList);




// WEBPACK FOOTER //
// ./src/views/Forms/RegularForms.jsx