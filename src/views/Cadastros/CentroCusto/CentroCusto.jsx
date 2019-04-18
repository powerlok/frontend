import React from "react";
import { connect } from 'react-redux';
import compose from 'recompose/compose';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import { CentroCustoActions } from '../../../_actions/centrocusto.actions';

// core components
import GridContainer from "./../../../components/Grid/GridContainer.jsx";
import GridItem from "./../../../components/Grid/GridItem.jsx";
import CustomInput from "./../../../components/CustomInput/CustomInput.jsx";
import CustomButton from "./../../../components/CustomButtons/Button.jsx";
import Card from "./../../../components/Card/Card.jsx";
import CardHeader from "./../../../components/Card/CardHeader.jsx";
import CardBody from "./../../../components/Card/CardBody.jsx";
import CustomSelect from "./../../../components/CustomInput/CustomSelect.jsx";
import CardIcon from "./../../../components/Card/CardIcon.jsx";
import CentroCustoFormsStyle from "./../../../assets/jss/material-dashboard-pro-react/views/cadastros/centrocusto/centrocusto.jsx";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    ...CentroCustoFormsStyle
});

class CentroCusto extends React.Component {
    constructor(props) {
        super(props);

        this.initialState = {
            open: false,
            id: 0,
            descricao: '',
            status: 'A'
        };;

        this.state = this.initialState;

        this.optionsStatus = [{ label: "Ativo", value: "A" }, { label: "Inativo", value: "I" }];

        this.validate = this.validate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleVoltar = this.handleVoltar.bind(this);
    }

    loadData = (id) => {
        const { dispatch } = this.props;
        dispatch(CentroCustoActions.getById(id));
    }

    componentWillMount() {
        if (this.props.history.location.state) {
            let id = this.props.history.location.state.param;

            this.loadData(id);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.centrocustos !== this.props.centrocustos) {
            this.setState({
                id: nextProps.centrocustos.id,
                descricao: nextProps.centrocustos.descricao,
                status: nextProps.centrocustos.status
            });
        }

        if (nextProps.alert !== this.props.alert) {
            if (this.state.id === '0' && nextProps.alert.type === 'success') this.setState(() => this.initialState);
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const { id, descricao, status } = this.state;
        const { dispatch, authentication } = this.props;

        var seqconta = authentication.user.seqconta;

        if (this.isInvalid() === false) {
           
            dispatch(CentroCustoActions.add(JSON.stringify({ id, descricao, status, seqconta })));            

        }
    }

    handleVoltar() {
        this.props.history.push("/admin/cadastros/centrocustolista");
    }

    handleChange(e) {
        const { name, value } = e.target;

        this.validate(e);

        this.setState({ [name]: value });
    }

    validate(e) {

        const { name, value } = e.target;

        if (name !== undefined) {

            if (!value || (name == 'descricao' && value.length == 0)) {
                return this.setState({ [`${name}Error`]: true, [`${name}Message`]: "Campo obrigatório" });
            }

            if (!value || (name == 'status' && value.length == 0)) {
                return this.setState({ [`${name}Error`]: true, [`${name}Message`]: "Campo obrigatório" });
            }
        }

        this.setState({ [`${name}Error`]: false, [`${name}Message`]: null });

    }

    isInvalid = () => {

        const { descricao, status, descricaoError, statusError } = this.state;

        return !(
            descricao &&
            status &&
            !descricaoError &&
            !statusError
        );
    }

    render() {
        const { classes } = this.props;
        const { descricao, status } = this.state;

        return (
            <GridContainer container
                direction="column"
                justify="flex-start"
                alignItems="center">
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="rose" icon>
                            <CardIcon color="rose">
                                <LibraryBooks />
                            </CardIcon>
                        </CardHeader>
                        <CardBody>
                            <form name="form" onSubmit={this.handleSubmit} ref="form">
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <CustomInput
                                            labelText="CENTRO CUSTO"
                                            id="descricao"
                                            required={true}
                                            value={descricao}
                                            name="descricao"
                                            onChange={this.handleChange}
                                            onBlur={this.validate}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: "text"
                                            }}
                                            error={this.state.descricaoError}
                                            helpText={this.state.descricaoMessage}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <CustomSelect
                                            labelText="STATUS"
                                            value={status}
                                            onChange={this.handleChange}
                                            MenuProps={{ className: classes.selectMenu }}
                                            className={classes.selectFormControl}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            name="status"
                                            id="status"
                                            error={this.state.statusError}
                                            classesList={{
                                                root: classes.selectMenuItem,
                                                selected: classes.selectMenuItemSelectedMultiple
                                            }}
                                            options={this.optionsStatus}
                                            helpText={this.state.statusMessage}
                                        />
                                    </GridItem>
                                </GridContainer>
                                <GridContainer container
                                    direction="column"
                                    justify="flex-start"
                                    alignItems="center">
                                    <GridItem xs={12} sm={12} md={12}>
                                        <Button color="default" type="button" className={classes.button} onClick={this.handleVoltar}>Lista</Button>
                                        <CustomButton color="rose" type="submit" disabled={this.isInvalid()}>Salvar</CustomButton>
                                    </GridItem>
                                </GridContainer>
                            </form>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        alert: state.alert,
        centrocustos: state.centrocusto.centrocustos,
        authentication: state.authentication.user
    }
}

export default compose(
    connect(mapStateToProps),
    withStyles(styles)
)(CentroCusto);




// WEBPACK FOOTER //
// ./src/views/Forms/RegularForms.jsx