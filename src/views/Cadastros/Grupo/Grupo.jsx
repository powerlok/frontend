import React from "react";
import { connect } from 'react-redux';
import compose from 'recompose/compose';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import { GrupoActions } from '../../../_actions/grupo.actions';

// core components
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import CustomInput from "../../../components/CustomInput/CustomInput";
import CustomButton from "../../../components/CustomButtons/Button";
import Card from "../../../components/Card/Card";
import CardHeader from "../../../components/Card/CardHeader";
import CardBody from "../../../components/Card/CardBody";
import CustomSelect from "../../../components/CustomInput/CustomSelect";
import CardIcon from "../../../components/Card/CardIcon";
import GrupoFormsStyle from "../../../assets/jss/material-dashboard-pro-react/views/cadastros/grupo/grupo";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    ...GrupoFormsStyle
});

class Grupo extends React.Component {
    constructor(props) {
        super(props);

        this.initialState  = {
            open: false,
            id: 0,
            descricao: '',
            status: 'A'
        };

        this.state = this.initialState;

        this.optionsStatus = [{ label: "Ativo", value: 'A' }, { label: "Inativo", value: 'I'  }];

        this.validate = this.validate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleVoltar = this.handleVoltar.bind(this);
    }

    loadData = (id) => {
        const { dispatch } = this.props;
        dispatch(GrupoActions.getById(id));
    }

    componentWillMount() {
        if (this.props.history.location.state) {
            let id = this.props.history.location.state.param;

            this.loadData(id);
        }
    }

    componentWillReceiveProps(nextProps) { 
        if(nextProps.grupos !== this.props.grupos){
         this.setState({
             id        : nextProps.grupos.id,
             descricao : nextProps.grupos.descricao,
             status    : nextProps.grupos.status
         });
        }

        if(nextProps.alert !== this.props.alert){ 
            if(this.state.id === '0' && nextProps.alert.type === 'success') this.setState(() => this.initialState);
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const { id, descricao, status } = this.state;
        const { dispatch, authentication } = this.props;
        
        var seqconta = authentication.user.seqconta;

        if (this.isInvalid() == false) {
            dispatch(GrupoActions.add(JSON.stringify({ id, descricao, status, seqconta })));           
        }
    }

    handleVoltar() {
        this.props.history.push("/admin/cadastros/grupolista");
    }

    handleChange(e) {
        const { name, value } = e.target;

        this.validate(e);

        this.setState({ [name]: value });
    }

    validate(e) {

        const { name, value } = e.target;

        if (name != undefined) {

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
                                            labelText="GRUPO"
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
        grupos: state.grupo.grupos,
        error: state.grupo.error,
        loading: state.grupo.loading,
        authentication: state.authentication.user

    }
}

export default compose(
    connect(mapStateToProps),
    withStyles(styles)
)(Grupo);




// WEBPACK FOOTER //
// ./src/views/Forms/RegularForms.jsx