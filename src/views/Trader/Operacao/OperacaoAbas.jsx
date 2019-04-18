
import React from "react";
import { connect } from 'react-redux';
import compose from 'recompose/compose';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import { BarChart, Assignment } from '@material-ui/icons';
import OperacaoGraficos  from './OperacaoGraficos';
import OperacaoLista  from './OperacaoLista';


const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
       // backgroundColor: theme.palette.background.paper,
        
    },

});

class OperacaoAbas extends React.Component {
    constructor(props) {
        super(props);

        this.initialState = {
            value: 0,
            de: '',
            ate: '',
            seqcontacorrente: ''
        };

        this.state = this.initialState;
    }

    getGetFiltro(de, ate, seqcontacorrente) {
        this.setState({ de: de, ate : ate, seqcontacorrente: seqcontacorrente });
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;
        return (
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        variant="scrollable"
                        scrollButtons="on"
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        <Tab label="Lista" icon={<Assignment />} />
                        <Tab label="Gráficos" icon={<BarChart />} />
                    </Tabs>
                </AppBar>
                {value === 0 && <OperacaoLista history={this.props.history} de={this.state.de} ate={this.state.ate} seqcontacorrente={this.state.seqcontacorrente} getGetFiltro={(de, ate, seqcontacorrente) => { this.getGetFiltro(de, ate, seqcontacorrente)}} />}
                {value === 1 && <OperacaoGraficos history={this.props.history} de={this.state.de} ate={this.state.ate} seqcontacorrente={this.state.seqcontacorrente} getGetFiltro={(de, ate, seqcontacorrente) => { this.getGetFiltro(de, ate, seqcontacorrente)}}/>}
            </div>);
    }
}

const mapStateToProps = (state) => {
    return {
        alert: state.alert,
        trader: state.trader,
        loading: state.contacorrente.loading,
        authentication: state.authentication.user
    }
}

export default compose(
    connect(mapStateToProps),
    withStyles(styles)
)(OperacaoAbas);
