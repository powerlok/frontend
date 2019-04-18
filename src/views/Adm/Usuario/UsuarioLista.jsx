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
import { userActions } from '../../../_actions/user.actions';
import Avatar from '@material-ui/core/Avatar';
import avatar from '../../../assets/img/faces/avatar.png';

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
    },
    bigAvatar: {
        margin: 0,
        width: 40,
        height: 40,
    },
});

class UsuarioLista extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            users: [],
            loading: false,
            token: '',
            error: null
        };

        this.props.dispatch(userActions.getAll());
    }

    componentWillReceiveProps(proxProps) { console.log(proxProps);
        if (this.props.user !== proxProps.user) {
            this.setState({ 
                users: proxProps.user.users, 
                loading: proxProps.user.loading 
            });
        }
    }

    delete(id) {
        if (window.confirm("Tem certeza que quer deletar o registro?")) {
            this.props.dispatch(userActions.delete(id));
        }
    }

    linkCadastro(id) {
        if (id != 0) {
            this.props.history.push("/admin/adm/usuario/usuario", { "param": id });
        } else {
            this.props.history.push("/admin/adm/usuario/usuario");
        }
    }

    getData = () => {
    if (this.state.users.length > 0) {
        return this.state.users.map((prop, key) => {
            return {
                id: prop.id,
                nome: prop.nome,
                email: prop.email,
                foto: (prop.foto) ? new Buffer(prop.foto, 'binary').toString('utf8') : avatar,
                actions: (
                    <div className="actions-right">
                        <CustomButton
                            justIcon
                            round
                            simple
                            onClick={() => { this.linkCadastro(prop.id);  }}
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
                                            Header: "Foto",
                                            accessor: "foto",
                                            sortable: false,
                                            filterable: false,
                                            Cell: props => <Avatar alt="Foto" src={props.original.foto}  title={props.original.nome} className={classes.bigAvatar} />
                                        },
                                        {
                                            Header: "ID",
                                            accessor: "id",
                                            sortable: true,
                                            filterable: true
                                        },
                                        {
                                            Header: "NOME",
                                            accessor: "nome",
                                            sortable: true,
                                            filterable: true
                                        },
                                        {
                                            Header: "EMAIL",
                                            accessor: "email",
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
        user: state.user,
        authentication: state.authentication.user
    }
}


export default compose(
    connect(mapStateToProps),
    withStyles(styles)
)(UsuarioLista);




// WEBPACK FOOTER //
// ./src/views/Forms/RegularForms.jsx