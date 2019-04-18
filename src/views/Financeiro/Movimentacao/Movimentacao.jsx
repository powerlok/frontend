import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import Button from '@material-ui/core/Button';
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import CustomInput from "../../../components/CustomInput/CustomInput";
import CustomSelect from "../../../components/CustomInput/CustomSelect";
import MovimentacaoFormsStyle from "../../../assets/jss/material-dashboard-pro-react/views/cadastros/movimentacao/movimentacao";
import { movimentacaoActions } from '../../../_actions/movimentacao.actions';
import CardIcon from "../../../components/Card/CardIcon";
import Card from "../../../components/Card/Card";
import CardHeader from "../../../components/Card/CardHeader";
import CardBody from "../../../components/Card/CardBody";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import { naturezaActions } from './../../../_actions/natureza.actions';
import { CentroCustoActions } from '../../../_actions/centrocusto.actions';
import CustomTextField from '../../../components/CustomInput/CustomTextField';
import Switch from '@material-ui/core/Switch';
import InputLabel from "@material-ui/core/InputLabel";
import MovimentacaoOperadorLista from "./Movimentacao_OperacaoLista";

var moment = require('moment');

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1
    },
    cardAction: {
        float: "right",
        margin: "-4px",
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
    ...MovimentacaoFormsStyle
});



export class MovimentacaoDialog extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = {
            id: 0,
            historico: '',
            status: 'A',
            dtaprog: moment(new Date()).format('YYYY-MM-DD'),
            dtavenc: moment(new Date()).format('YYYY-MM-DD'),
            seqnatureza: '',
            // parcd: '',
            parca: '0',
            vlroriginal: '',
            vlrpago: '0',
            dtapagto: '',
            codbarra: '',
            seqcentrocusto: '',
            parcelado: false,
            recorrente: false,
            observacao: ''
        };

        this.state = this.initialState;

        this.optionsStatus = [{ label: "Aberto", value: 'A' }, { label: "Quitado", value: 'Q' }];
        this.props.dispatch(naturezaActions.getAll(this.props.authentication.user.seqconta));
        this.props.dispatch(CentroCustoActions.getAll(this.props.authentication.user.seqconta));
        this.validate = this.validate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    loadData = (id) => {
        const { dispatch } = this.props;
        if (this.props.seqmovimentacao > 0) {
            dispatch(movimentacaoActions.getByIdMovOp(id));
        }
    }

    componentWillMount() {
        this.loadData(this.props.seqmovimentacao);

    }


    carregaComboNatureza() {
        return this.props.natureza.naturezas.map((prop, key) => {
            return {
                label: prop.descricao,
                value: prop.id
            };
        });
    }

    carregaComboCentroCusto() {
        return this.props.centrocusto.centrocustos.map((prop, key) => {
            return {
                label: prop.descricao,
                value: prop.id
            };
        });
    }

    parcelado(event) {
        if (event.target.checked) {
            this.setState({
                parcelado: true,
                recorrente: false,
                required: true,
                parca: '',
            });
        } else {
            this.setState({
                parcelado: false,
                parca: '0',
                required: false
            });

        }
        this.validate(event);
    }

    recorrente(event) {
        if (event.target.checked) {
            this.setState({
                recorrente: true,
                parcelado: false,
                required: true,
                parca: '',
            });
        } else {
            this.setState({
                recorrente: false,
                parca: '0',
                required: false
            });
        }
        this.validate(event);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.movimentacao.movimentacoesOpId !== this.props.movimentacao.movimentacoesOpId) {
            this.setState({
                id: nextProps.movimentacao.movimentacoesOpId.id,
                historico: nextProps.movimentacao.movimentacoesOpId.historico,
                status: nextProps.movimentacao.movimentacoesOpId.status,
                dtaprog: moment(nextProps.movimentacao.movimentacoesOpId.dtaprog).format('YYYY-MM-DD'),
                dtavenc: moment(nextProps.movimentacao.movimentacoesOpId.dtavenc).format('YYYY-MM-DD'),
                seqnatureza: nextProps.movimentacao.movimentacoesOpId.seqnatureza,
                //parcd: nextProps.movimentacoesOpId.parcd,
                //parca: nextProps.movimentacoesOpId.parca,
                vlroriginal: Math.abs(nextProps.movimentacao.movimentacoesOpId.vlroriginal).toFixed(2),
                vlrpago: nextProps.movimentacao.movimentacoesOpId.vlrpago.toFixed(2),
                dtapagto: (nextProps.movimentacao.movimentacoesOpId.dtapagto !== null) ? moment(nextProps.movimentacao.movimentacoesOpId.dtapagto).format('DD/MM/YYYY') : '',
                codbarra: nextProps.movimentacao.movimentacoesOpId.codbarra,
                seqcentrocusto: nextProps.movimentacao.movimentacoesOpId.seqcentrocusto,
                parcela: nextProps.movimentacao.movimentacoesOpId.parcela,
                recorre: nextProps.movimentacao.movimentacoesOpId.recorre,
                observacao: (nextProps.movimentacao.movimentacoesOpId.observacao != null) ? nextProps.movimentacao.movimentacoesOpId.observacao : ''
            });

        }

        if (nextProps.alert !== this.props.alert) {
            if (this.state.id === '0' && nextProps.alert.type === 'success') {
                this.setState(() => this.initialState);
            }
            if (nextProps.alert.type === 'success') {
                this.props.onClose();
            }
        }

    }

    handleSubmit(e) {
        e.preventDefault();
        const { id, historico, status, dtaprog, dtavenc, seqnatureza, parca, vlroriginal, vlrpago, codbarra, seqcentrocusto, parcelado, recorrente, recorre, parcela, observacao } = this.state;
        const { dispatch, authentication } = this.props;

        var seqconta = authentication.user.seqconta;
        console.log(this.state);
        if (this.isInvalid() == false) {
            var alteratudo = 'N';
            if (recorre === 'S' || parcela === 'S') {
                if (window.confirm("Gostaria de alterar todas as movimentações associadas a esta?")) {
                    alteratudo = 'S';
                }
            }

            dispatch(movimentacaoActions.add(JSON.stringify({ id, status, historico, dtaprog, dtavenc, seqnatureza, parca, vlroriginal, vlrpago, codbarra, seqconta, seqcentrocusto, parcelado, recorrente, alteratudo, observacao })));
        }
    }

    handleChange(e) {
        const { name, value } = e.target;

        this.setState({ [name]: value });

        setTimeout(() => { this.validate(e)}, 500);

    }
/*
    passaDtaVencParaDtaProg(e) {
        const { value } = e.target;
        this.setState({ dtaprog: value});
    }*/

    validate(e) {

        const { name, value } = e.target;

        if (name !== undefined) {
            
            if (name == 'historico' && value.length == 0 || value.length > 100) { 
                return this.setState({ [`${name}Error`]: true, [`${name}Message`]: "Campo deve ter pelo menos 1 e no maximo 100 caracteres." });
            }

            if ((name == 'status' && value.length == 0)) {
                return this.setState({ [`${name}Error`]: true, [`${name}Message`]: "Campo obrigatório" });
            }

            if ((name == 'dtaprog' && value.length == 0)) {
                return this.setState({ [`${name}Error`]: true, [`${name}Message`]: "Campo obrigatório" });
            }

            if ((name == 'dtavenc' && value.length == 0)) {
                return this.setState({ [`${name}Error`]: true, [`${name}Message`]: "Campo obrigatório" });
            }

            if ((name == 'dtavenc' && value.length > 0)) {
                 this.setState({ dtaprog: value});
            }

            if (document.getElementById("dtaprog").value < document.getElementById("dtavenc").value) {
                return this.setState({ "dtaprogError": true, "dtaprogMessage": "Não é permitida à data programada ser menor do que a data de vencimento" });
            }

            if ((name === 'seqnatureza' && value.length == 0)) {
                return this.setState({ [`${name}Error`]: true, [`${name}Message`]: "Campo obrigatório" });
            }

            if ((name == 'vlroriginal' && (value == 0 || value.length == 0 || value.length > 20))) {
                return this.setState({ [`${name}Error`]: true, [`${name}Message`]: "Campo deve ter no maximo 20 caracters." });
            }

            if ((name == 'codbarra' && value.length > 80)) {
                return this.setState({ [`${name}Error`]: true, [`${name}Message`]: "Campo deve ter no maximo 80 caracteres." });
            }

            if ((name == 'parca' && (document.getElementById("parcelado").value || document.getElementById("recorrente").value) && this.state.id == 0) && value.length == 0) {
                return this.setState({ [`${name}Error`]: true, [`${name}Message`]: "Campo obrigatório" });
            }

            if ((name == 'seqcentrocusto' && value.length == 0)) {
                return this.setState({ [`${name}Error`]: true, [`${name}Message`]: "Campo obrigatório" });
            }

           /* if ((name === 'observacao' && value.length == 0 || value.length > 100)) {
                return this.setState({ [`${name}Error`]: true, [`${name}Message`]: "Campo deve ter pelo menos 1 e no maximo 100 caracteres." });
            }*/
        }

        this.setState({ [`${name}Error`]: false, [`${name}Message`]: null });
        this.setState({ [`dtaprogError`]: false, [`dtaprogMessage`]: null });

    }

    isInvalid = () => {

        const { id, historico, status, dtaprog, dtavenc, seqnatureza, parca, vlroriginal, parcelado, recorrente,/*, vlrpago,*/ dtapagto, codbarra, seqcentrocusto/*, observacao*/, statusError, historicoError, dtaprogError, dtavencError, seqnaturezaError, parcdError, parcaError, dtaVencParcelaError, vlroriginalError/*, vlrpagoError, dtapagtoError*/, codbarraError, seqcentrocustoError/*, observacaoError*/ } = this.state;

        return !(
            historico &&
            status &&
            dtaprog &&
            dtavenc &&
            seqnatureza &&
            vlroriginal &&
            seqcentrocusto &&
            //dtaprog &&
           // observacao &&
            !historicoError &&
            !statusError &&
            !dtaprogError &&
            !dtavencError &&
            !seqnaturezaError &&
            !vlroriginalError &&
            !seqcentrocustoError
           // !observacaoError
        ) || status == "Q" || ((parcelado && id == 0) ? (parca == 0) : false) || ((recorrente && id == 0) ? (parca == 0) : false);
    }

    render() {
        const { classes } = this.props;
        const { id, historico, status, dtaprog, dtavenc, seqnatureza, parca, vlroriginal, vlrpago, dtapagto, codbarra, seqcentrocusto, parcelado, recorrente, required, observacao } = this.state;

        return (
            <div>

                <form name="form" onSubmit={this.handleSubmit} ref="form">
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton color="inherit" onClick={this.props.onClose} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography color="inherit" className={classes.flex}>
                                Movimentação
                                </Typography>
                            <Button color="inherit" type="submit" disabled={this.isInvalid()}>
                                salvar
                                </Button>
                        </Toolbar>
                    </AppBar>

                    <GridContainer container
                        direction="column"
                        justify="flex-start"
                        alignItems="center"
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
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <CustomInput
                                                labelText="HISTORICO"
                                                id="historico"
                                                required={false}
                                                value={historico}
                                                name="historico"
                                                onChange={this.handleChange}
                                                onBlur={this.validate}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    type: "text"
                                                }}
                                                error={this.state.historicoError}
                                                helpText={this.state.historicoMessage}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={2}>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={2}>
                                            <CustomTextField
                                                labelText="DATA VENCIMENTO"
                                                id="dtavenc"
                                                required={true}
                                                value={dtavenc}
                                                name="dtavenc"
                                                type="date"
                                                onChange={this.handleChange}
                                                onBlur={this.handleChange}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                error={this.state.dtavencError}
                                                helpText={this.state.dtavencMessage}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={2}>
                                            <CustomTextField
                                                labelText="DATA PROGRAMADA"
                                                id="dtaprog"
                                                required={true}
                                                value={dtaprog}
                                                name="dtaprog"
                                                type="date"
                                                onChange={this.handleChange}
                                                onBlur={this.validate}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                error={this.state.dtaprogError}
                                                helpText={this.state.dtaprogMessage}
                                            />
                                        </GridItem>

                                        <GridItem xs={12} sm={12} md={3}>
                                            <CustomSelect
                                                labelText="NATUREZA"
                                                value={seqnatureza}
                                                onChange={this.handleChange}
                                                MenuProps={{ className: classes.selectMenu }}
                                                className={classes.selectFormControl}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                name="seqnatureza"
                                                id="seqnatureza"
                                                error={this.state.seqnaturezaError}
                                                helpText={this.state.seqnaturezaMessage}
                                                classesList={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelectedMultiple
                                                }}
                                                options={this.carregaComboNatureza()}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}>
                                            <CustomSelect
                                                labelText="CENTRO DE CUSTO"
                                                value={seqcentrocusto}
                                                onChange={this.handleChange}
                                                MenuProps={{ className: classes.selectMenu }}
                                                className={classes.selectFormControl}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                name="seqcentrocusto"
                                                id="seqcentrocusto"
                                                error={this.state.seqcentrocustoError}
                                                helpText={this.state.seqcentrocustoMessage}
                                                classesList={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelectedMultiple
                                                }}
                                                options={this.carregaComboCentroCusto()}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={2}>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={4}>
                                            <CustomInput
                                                labelText="COD BARRA"
                                                id="codbarra"
                                                value={codbarra}
                                                name="codbarra"
                                                onChange={this.handleChange}
                                                onBlur={this.validate}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    type: "text"
                                                }}
                                            error={this.state.codbarraError}
                                            helpText={this.state.codbarraMessage}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={2}>
                                            <CustomInput
                                                labelText="DTA PAGTO"
                                                id="dtapagto"
                                                value={`${dtapagto}`}
                                                name="dtapagto"
                                                onChange={this.handleChange}
                                                onBlur={this.validate}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    type: "text",
                                                    disabled: true
                                                }}
                                            //error={this.state.dtapagtoError}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={2}>
                                            <CustomSelect
                                                labelText="STATUS"
                                                value={status}
                                                onChange={this.handleChange}
                                                MenuProps={{ className: classes.selectMenu }}
                                                className={classes.selectFormControl}
                                                formControlProps={{
                                                    fullWidth: true,
                                                    disabled:true
                                                }}
                                                name="status"
                                                id="status"
                                                error={this.state.statusError}
                                                classesList={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelectedMultiple
                                                }}
                                                options={this.optionsStatus}
                                            />
                                        </GridItem>
                                        <GridItem md ></GridItem>
                                        <GridItem xs={12} sm={12} md={2} >
                                            <CustomInput
                                                labelText="VLR ORIGINAL"
                                                id="vlroriginal"
                                                required={false}
                                                value={`${vlroriginal}`}
                                                name="vlroriginal"
                                                onChange={this.handleChange}
                                                onBlur={this.validate}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                type="number"
                                                error={this.state.vlroriginalError}
                                                helpText={this.state.vlroriginalMessage}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={2}>
                                            <CustomInput
                                                labelText="VLR PAGO"
                                                id="vlrpago"
                                                value={`${vlrpago}`}
                                                name="vlrpago"
                                                onChange={this.handleChange}
                                                onBlur={this.validate}
                                                formControlProps={{
                                                    fullWidth: true,
                                                    disabled: true,
                                                    type: "text"
                                                }}
                                                error={this.state.vlrpagoError}
                                            />
                                        </GridItem>
                                        <GridItem md={12}></GridItem>
                                        <GridItem xs={12} sm={12} md={4} >
                                            <CustomTextField
                                                labelText="OBSERVAÇÃO"
                                                id="observacao"
                                                required={false}
                                                value={`${observacao}`}
                                                name="observacao"
                                                type="text"                                      
                                                onChange={this.handleChange}
                                                onBlur={this.validate}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                error={this.state.observacaoError}
                                                helpText={this.state.observacaoMessage}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12} ></GridItem>
                                        <GridItem xs={12} sm={12} md={1} style={this.state.id == 0 ? {} : { opacity: "0" }}>
                                            <InputLabel htmlFor="parcelado">
                                                Parcelar
                                            </InputLabel>
                                            <Switch
                                                checked={parcelado}
                                                name="parcelado"
                                                id="parcelado"
                                                onChange={(e) => { this.parcelado(e) }}
                                                value={`${parcelado}`}
                                                color="secondary"
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={1} style={this.state.id == 0 ? {} : { opacity: "0" }}>
                                            <InputLabel htmlFor="recorrente">
                                                Recorrente
                                            </InputLabel>
                                            <Switch
                                                checked={recorrente}
                                                name="recorrente"
                                                id="recorrente"
                                                onChange={(e) => { this.recorrente(e) }}
                                                value={`${recorrente}`}
                                                color="secondary"
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={1} style={this.state.parcelado || this.state.recorrente && this.state.id == 0 ? {} : { opacity: "0" }} >
                                            <CustomInput
                                                labelText="Qtde"
                                                id="parca"
                                                required={required}
                                                value={`${parca}`}
                                                name="parca"
                                                onChange={this.handleChange}
                                                onBlur={this.validate}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                type="number"
                                                error={this.state.parcaError}
                                                helpText={this.state.parcaMessage}
                                            />
                                        </GridItem>

                                    </GridContainer>
                                </CardBody>
                            </Card>
                        </GridItem>
                    </GridContainer>


                </form>

                {this.state.id > 0 &&

                    <MovimentacaoOperadorLista seqmovimentacao={this.state.id}></MovimentacaoOperadorLista>
                }
            </div>
        );
    }
}

MovimentacaoDialog.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        alert: state.alert,
        movimentacao: state.movimentacao,
        natureza: state.natureza,
        centrocusto: state.centrocusto,
        authentication: state.authentication.user
    }
}



export default compose(
    connect(mapStateToProps),
    withStyles(styles)
)(MovimentacaoDialog);