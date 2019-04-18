import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import ReactTable from "react-table";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import Card from "../../../components/Card/Card";
import CardBody from "../../../components/Card/CardBody";

const styles = theme => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content',
    },
    formControl: {
        marginTop: theme.spacing.unit * 2,
        minWidth: 120,
    },
    formControlLabel: {
        marginTop: theme.spacing.unit,
    },
});

class MovimentacaoContaCorrenteLista extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fullWidth: true,
            maxWidth: 'sm',
            loading: false,
            contacorrentes: []
        };
       
    }

    componentWillReceiveProps(nextProps) {      

        if (this.props.contacorrente !== nextProps.contacorrente) {
            this.setState({ contacorrentes: nextProps.contacorrente.contacorrentes, loading: nextProps.contacorrente.loading });
        }
    }

    handleMaxWidthChange = event => {
        this.setState({ maxWidth: event.target.value });
    };

    handleFullWidthChange = event => {
        this.setState({ fullWidth: event.target.checked });
    };

    getData = () => {
         if (this.state.contacorrentes != undefined) {
        return this.state.contacorrentes.map((prop, key) => {
            return {
                id: prop.id,
                descricao: prop.descricao,
                saldo: (prop.saldo != null) ? prop.saldo.toLocaleString('pt-br', { minimumFractionDigits: 2 }) : '0,00',
                actions: (
                    <div className={this.props.classes.actions}>
                  
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
            <React.Fragment>
                <Dialog
                    fullWidth={this.state.fullWidth}
                    maxWidth={this.state.maxWidth}
                    open={this.props.open}
                    //onClose={this.props.close.bind(this)}
                    aria-labelledby="max-width-dialog-title"
                >
                    <DialogTitle id="max-width-dialog-title">Movimentações por Conta Corrente</DialogTitle>
                    <DialogContent>
                        <DialogContentText> </DialogContentText>
                        <GridContainer>
                            <GridItem xs={12}>
                                <Card>
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
                                                    Header: "SALDO",
                                                    accessor: "saldo",
                                                    sortable: false,
                                                    filterable: false,
                                                    getProps: (state, rowInfo, column, instance) => {
                                                        if (rowInfo != null  && rowInfo != undefined) {
                                                            return {
                                                                style: {
                                                                    color: parseInt(rowInfo.row.saldo) < 0 ? 'red' : null
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
                                            defaultPageSize={999999999999999999999999}
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
                        </GridContainer>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.close.bind(this)} color="primary">
                            Fechar
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    }
}

MovimentacaoContaCorrenteLista.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        contacorrente: state.contacorrente,
        alert: state.alert,
        authentication: state.authentication.user
    }
}

export default compose(
    connect(mapStateToProps),
    withStyles(styles)
)(MovimentacaoContaCorrenteLista);
