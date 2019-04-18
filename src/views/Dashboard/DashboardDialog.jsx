
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DashboardHistorico from "./DashboardHistorico";
const styles = theme => ({

});


class DashBoardDialog extends React.Component {
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


                        <DashboardHistorico filtro={true} tipo={this.props.tipo} id={this.props.id} />

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
        alert: state.alert,
        authentication: state.authentication.user
    }
}

export default compose(
    connect(mapStateToProps),
    withStyles(styles)
)(DashBoardDialog);