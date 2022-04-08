import { Component } from "react";
import axios from 'axios';
import { Button, Box } from 'adminlte-2-react';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Agente from "./Agente";


class CreateAgente extends Component {
  constructor(props) {
    super(props);
    this.onChangeNome = this.onChangeNome.bind(this);
    this.onChangeMatricula = this.onChangeMatricula.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        nome: '',
        matricula: '',
    }}


    onChangeNome(e) {
        this.setState({
            nome: e.target.value
        });
    }

    onChangeMatricula(e) {
        this.setState({
            matricula: e.target.value
        });
    }

    getAgentes = async () => {
        let data = await axios.get('http://localhost:8000/api/agentes').then(({ data }) => data);
        console.log(data.data)
        Agente.setState({ agentes: data.data })      
    }

    onSubmit(e) {
        e.preventDefault();

        const obj = {
            nome: this.state.nome,
            matricula: this.state.matricula,
        };
        
        axios.defaults.headers.common = {'Authorization': `Bearer 13|ZJK0PYiy4fAz6u7qe70t70wwJFTjwxcQJ3Eu8f2Q`} 

        axios.post('http://localhost:8000/api/agentes', obj)
            .then(res =>  
                NotificationManager.success("Agente adicionado", 'Sucesso'));

        this.setState({
            nome: "",
            matricula: "",
        })

        
    }

    render() {
        return (
        <Box>
            <div style={{marginTop: 10}}>
                <h3>Adicionar agente:</h3>
                <form>
                    <div className="form-group">
                        <label>Nome: </label>
                        <input type="text" className="form-control"
                            value={this.state.nome}
                            onChange={this.onChangeNome}
                        />
                    </div>
                    <div className="form-group">
                        <label>Matricula: </label>
                        <input type="text" className="form-control" value={this.state.matricula}
                            onChange={this.onChangeMatricula}/>
                    </div>
                    <div className="form-group">
                        <Button text={"criar"} onClick={this.onSubmit} className="btn btn-primary"/>
                    </div>
                </form>
                <NotificationContainer/>
            </div> 
        </Box>
            
        )
}
}

export default CreateAgente