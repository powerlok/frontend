
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
import Historico from "./Historico";
const styles = theme => ({

});


class HistoricoDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fullWidth: true,
            maxWidth: false,
        };
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Dialog
                    fullWidth={this.state.fullWidth}
                    maxWidth={this.state.maxWidth}
                    open={this.props.open ? this.props.open : false}
                    // onClose={this.props.close.bind(this)}
                    aria-labelledby="max-width-dialog-title"
                >

                    <DialogTitle id="max-width-dialog-title">Histórico</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                        </DialogContentText>


                        <Historico filtro={true} de={this.props.de} ate={this.props.ate} seqcontacorrente={this.props.seqcontacorrente} />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.close.bind(this)} color="primary">
                            Fechar
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        trader: state.trader,
        alert: state.alert,
        contacorrentes: state.contacorrente.contacorrentes,
        authentication: state.authentication.user
    }
}

export default compose(
    connect(mapStateToProps),
    withStyles(styles)
)(HistoricoDialog);