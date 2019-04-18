import React from "react";
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import ReactTable from "react-table";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
// core components
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import CardIcon from "../../components/Card/CardIcon";

import { dashboardActions } from '../../_actions/dashboard.actions';

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


class DashboardHistorico extends React.Component {
    constructor(props) {
        super(props);

        this.initialState = {
            historico: [],
            loadingHistorico: false,
        };

        this.state = this.initialState;

        this.props.dispatch(dashboardActions.popupDashHistorico(this.props.authentication.user.seqconta, this.props.id));

    }

    componentWillReceiveProps(nextProps) {
        if (this.props.dashboard.historico !== nextProps.dashboard.historico) {
            this.setState({ historico: nextProps.dashboard.historico, loading: nextProps.dashboard.loadingHistorico });
        }

    }

    setTipoPopup(tipo) { 
        switch (tipo) {
            case "GRUPO":
                return this.state.historico.grupo;
            case "NATUREZA":
                return this.state.historico.natureza;
            case "CENTROCUSTO":
                return this.state.historico.centrocusto;
            default:
                return [];
        }
    }

    getData = () => {
        if (this.setTipoPopup(this.props.tipo) != undefined) { 
            return this.setTipoPopup(this.props.tipo).map((prop, key) => {
                return {
                    historico: prop.historico,
                    vlraberto: prop.vlroriginal.toLocaleString('pt-br', { minimumFractionDigits: 2 }),
                    data: moment(prop.dataprog).format('DD-MM-YYYY')
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
                                        Header: "HISTORICO",
                                        accessor: "historico",
                                        sortable: false,
                                        filterable: false
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
                                    }
                                ]}
                                // onFetchData={this.fetchData}
                                minRows={1}
                                loading={this.state.loadingHistorico}
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
        dashboard: state.dashboard,
        alert: state.alert,
        authentication: state.authentication.user
    }
}

export default compose(
    connect(mapStateToProps),
    withStyles(styles)
)(DashboardHistorico);
