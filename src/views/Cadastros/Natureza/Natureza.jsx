import React from "react";
import { connect } from 'react-redux';
import compose from 'recompose/compose';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';
// core components
import GridContainer from "./../../../components/Grid/GridContainer.jsx";
import GridItem from "./../../../components/Grid/GridItem.jsx";
import CustomInput from "./../../../components/CustomInput/CustomInput.jsx";
import CustomSelect from "./../../../components/CustomInput/CustomSelect.jsx";
import CustomButton from "./../../../components/CustomButtons/Button.jsx";
import Card from "./../../../components/Card/Card.jsx";
import CardHeader from "./../../../components/Card/CardHeader.jsx";
import CardBody from "./../../../components/Card/CardBody.jsx";
import naturezaFormsStyle from "./../../../assets/jss/material-dashboard-pro-react/views/cadastros/natureza/natureza.jsx";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import CardIcon from "./../../../components/Card/CardIcon.jsx";
import { naturezaActions } from './../../../_actions/natureza.actions';
import { GrupoActions } from './../../../_actions/grupo.actions';
import InputLabel from "@material-ui/core/InputLabel";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    ...naturezaFormsStyle
});

class NaturezaDespesa extends React.Component {


    constructor(props) {
        super(props);
        this.initialState = {
            open: false,
            id: 0,
            descricao: '',
            tipo: '',
            status: 'A',
            grupo: '',
            cor: ''
        };

        this.state = this.initialState;

        this.props.dispatch(GrupoActions.getAll(this.props.authentication.user.seqconta));

        this.validate = this.validate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleVoltar = this.handleVoltar.bind(this);
        this.options = [{ label: "Direito", value: "D" }, { label: "Obrigação", value: "O" }];
        this.optionsStatus = [{ label: "Ativo", value: "A", selected:true }, { label: "Inativo", value: "I", selected:false }];

    }

    carregaComboGrupo()  { 
        return this.props.grupo.grupos.map((prop, key) => {                         
            return {
                label: prop.descricao,
                value: prop.id
            };
        });        
    }

    loadData = (id) => {
        const { dispatch } = this.props;
        dispatch(naturezaActions.getById(id));
        
    }

    componentWillMount() {
        if (this.props.history.location.state) {
            let id = this.props.history.location.state.param;

            this.loadData(id);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.naturezas !== this.props.naturezas) {
            this.setState({
                id: nextProps.naturezas.id,
                descricao: nextProps.naturezas.descricao,
                tipo: nextProps.naturezas.tipo,
                status: nextProps.naturezas.status,
                grupo: nextProps.naturezas.seqgrupo,
                cor: nextProps.naturezas.cor
            });
        }

        if(nextProps.alert !== this.props.alert){ 
            if(this.state.id == '0' && nextProps.alert.type == 'success') this.setState(() => this.initialState);
        }

    }

    handleVoltar() {
        this.props.history.push("/admin/cadastros/naturezalista");
    }

    handleChange(e) {
        const { name, value } = e.target;

        this.validate(e);

        this.setState({ [name]: value });

    }

    handleSubmit(e) {
        e.preventDefault();
        const { id, descricao, tipo, status, grupo,  cor } = this.state;
        const { dispatch, authentication } = this.props;

        var seqconta = authentication.user.seqconta;

        if (this.isInvalid() == false) {
            dispatch(naturezaActions.add(JSON.stringify({ id, descricao, tipo, status, grupo, seqconta, cor })));
        }

    }

    validate(e) {

        const { name, value } = e.target;

        if (name != undefined) {

            if (!value || (name == 'descricao' && value.length == 0)) {
                return this.setState({ [`${name}Error`]: true, [`${name}Message`]: "Campo obrigatório" });
            }

            if (!value || (name == 'tipo' && value.length == 0)) {
                return this.setState({ [`${name}Error`]: true, [`${name}Message`]: "Campo obrigatório" });
            }

            if (!value || (name == 'status' && value.length == 0)) {
                return this.setState({ [`${name}Error`]: true, [`${name}Message`]: "Campo obrigatório" });
            }

            if (!value || (name == 'grupo' && value.length == 0)) {
                return this.setState({ [`${name}Error`]: true, [`${name}Message`]: "Campo obrigatório" });
            }
        }

        this.setState({ [`${name}Error`]: false, [`${name}Message`]: null });

    }

    isInvalid = () => {

        const { descricao, tipo, status, grupo, tipoError, descricaoError, statusError, grupoError } = this.state;

        return !(
            descricao &&
            tipo &&
            status &&
            grupo &&
            !tipoError &&
            !descricaoError &&
            !statusError &&
            !grupoError
        );
    }

    render() {
        const { classes } = this.props;
        const { descricao, tipo, status, grupo, cor } = this.state;

        return (
            <div>
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
                                <form name="form" onSubmit={this.handleSubmit} ref="form" >
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <CustomInput
                                                labelText="NATUREZA"
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
                                                labelText="TIPO"
                                                value={tipo}
                                                onChange={this.handleChange}
                                                MenuProps={{ className: classes.selectMenu }}
                                                className={classes.selectFormControl}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                name="tipo"
                                                id="tipo"
                                                error={this.state.tipoError}
                                                classesList={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelectedMultiple
                                                }}
                                                options={this.options}
                                                helpText={this.state.tipoMessage}
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
                                        <GridItem xs={12} sm={12} md={12}>
                                            <CustomSelect
                                                labelText="GRUPO"
                                                value={grupo}
                                                onChange={this.handleChange}
                                                MenuProps={{ className: classes.selectMenu }}
                                                className={classes.selectFormControl}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                name="grupo"
                                                id="grupo"
                                                error={this.state.grupoError}
                                                classesList={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelectedMultiple
                                                }}
                                                options={ this.carregaComboGrupo()}
                                                helpText={this.state.grupoMessage}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12}>
                                        <InputLabel htmlFor="color">COR </InputLabel>
                                            <input
                                                labelText="COR"
                                                id="cor"
                                                required={false}
                                                value={cor}
                                                name="cor"
                                                onChange={this.handleChange}
                                                type= "color"
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

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        grupo: state.grupo,
        alert: state.alert,
        naturezas: state.natureza.naturezas,
        error: state.natureza.error,
        loading: state.natureza.loading,
        authentication: state.authentication.user
    }
}

export default compose(
    connect(mapStateToProps),
    withStyles(styles))
    (NaturezaDespesa);




// WEBPACK FOOTER //
// ./src/views/Forms/RegularForms.jsx