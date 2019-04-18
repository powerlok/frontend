import React from "react";
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import ReactTable from "react-table";
import NaturezaDespesa from './Natureza';

import SweetAlert from "react-bootstrap-sweetalert";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
/*import Dvr from "@material-ui/icons/Dvr";*/
import Edit from "@material-ui/icons/Edit";
import Search from "@material-ui/icons/Search";
import Close from "@material-ui/icons/Close";
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { renderToStaticMarkup } from 'react-dom/server';
// core components
import GridContainer from "./../../../components/Grid/GridContainer.jsx";
import GridItem from "./../../../components/Grid/GridItem.jsx";
import CustomButton from "./../../../components/CustomButtons/Button.jsx";
import Card from "./../../../components/Card/Card.jsx";
import CardBody from "./../../../components/Card/CardBody.jsx";
import CardText from "./../../../components/Card/CardText.jsx";
import CardHeader from "./../../../components/Card/CardHeader.jsx";
import CardIcon from "./../../../components/Card/CardIcon.jsx";
import { cardTitle } from "./../../../assets/jss/material-dashboard-pro-react.jsx";
import { naturezaActions } from '../../../_actions/natureza.actions';
import MovimentacaoNaturezaLista from './Movimentacao_NaturezaLista';
import Dialog from '@material-ui/core/Dialog';
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

class NaturezaDespesaList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            naturezas: [],
            seqnatureza: 0,
            natureza: '',
            loading: false,
            error: '',
            openMovNatLista: false,
            fullWidth: true,
            maxWidth: 'md'
        };

        this.props.dispatch(naturezaActions.getAll(this.props.authentication.user.seqconta));

        this.handleClickMovNatListaOpen = this.handleClickMovNatListaOpen.bind(this);
        this.handleClickMovNatListaClose = this.handleClickMovNatListaClose.bind(this);
    }

    componentWillReceiveProps(proxProps) {
        if (this.props.natureza !== proxProps.natureza) {
            this.setState({ naturezas: proxProps.natureza.naturezas, loading: proxProps.natureza.loading });
        }
    }

    delete(id) {
        if (window.confirm("Tem certeza que quer deletar o registro?")) {
            this.props.dispatch(naturezaActions._delete(id));
        }
    }

    linkCadastro(id) {
        if (id != 0) {
            this.props.history.push("/admin/cadastros/natureza", { "param": id });
        } else {
            this.props.history.push("/admin/cadastros/natureza");
        }
    }

    handleClickMovNatListaOpen = (id, natureza, cor) => {
        this.setState({ openMovNatLista: true, seqnatureza: id, natureza: natureza, cor: cor });
    };

    handleClickMovNatListaClose = () => {
        this.setState({ openMovNatLista: false, seqnatureza: 0, natureza: '', cor: '' });
    };

    getData = () => {
     if (this.state.naturezas.length > 0) {
        return this.state.naturezas.map((prop, key) => {
            return {
                id: prop.id,
                descricao: prop.descricao,
                tipo: (prop.tipo == "D") ? "Direito" : "Obrigação",
                status: (prop.status == 'A') ? "Ativo" : "Inativo",
                grupo: prop.grupo,
                cor: prop.cor,
                actions: (
                    <div className="actions-right">
                        <CustomButton
                            justIcon
                            round
                            simple
                            onClick={() => { this.handleClickMovNatListaOpen(prop.id, prop.descricao, prop.cor); }}
                            color="info"
                            className="like"
                        >
                            <Search />
                        </CustomButton>{" "}
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
                        <Dialog
                            fullWidth={this.state.fullWidth}
                            maxWidth={this.state.maxWidth}
                            open={this.state.openMovNatLista}
                            //onClose={this.state.handleClickMovNatListaClose}
                            aria-labelledby="max-width-dialog-title"
                            scroll="body"
                        >
                            <MovimentacaoNaturezaLista seqnatureza={this.state.seqnatureza} natureza={this.state.natureza} cor={this.state.cor} close={this.handleClickMovNatListaClose} />
                        </Dialog>
                        <Card>
                            <CardHeader color="rose" icon>
                                <CardIcon color="rose">
                                    <Assignment />
                                </CardIcon>
                                <Button color="secondary" aria-label="Add" variant="fab" className={classes.cardAction} onClick={() => { this.linkCadastro(0); }}>
                                    <AddIcon />
                                </Button>
                                { /* <IconButton className={classes.cardAction}>
                                <MoreVertIcon />
                                </IconButton>*/ }
                            </CardHeader>
                            <CardBody>

                                <ReactTable
                                    data={this.getData()}
                                    filterable
                                    defaultFilterMethod={this.filterCaseInsensitive}
                                    columns={[
                                        {
                                            Header: "NATUREZA",
                                            accessor: "descricao",
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
                                            Header: "TIPO",
                                            accessor: "tipo",
                                            sortable: true,
                                            filterable: true
                                        },
                                        {
                                            Header: "GRUPO",
                                            accessor: "grupo",
                                            sortable: true,
                                            filterable: true
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

const mapStateToProps = (state) => {
    return {
        natureza: state.natureza,
        authentication: state.authentication.user
    }
}


export default compose(
    connect(mapStateToProps),
    withStyles(styles)
)(NaturezaDespesaList);




// WEBPACK FOOTER //
// ./src/views/Forms/RegularForms.jsx