import { Component } from "react";
import axios from 'axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/agentes'
})

class UpdateAgente extends Component {
  constructor(props) {
    super(props);
    this.onChangeNome = this.onChangeNome.bind(this);
    this.onChangeMatricula = this.onChangeMatricula.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    const agente = this.props.agente

    this.state = {
        id: agente.id,
        nome: agente.nome,
        matricula: agente.matricula,
    }
}

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

getRepo = async () => {
    let data = axios.get('http://localhost:8000/api/agentes').then(({ data }) => data);
        this.setState({ repo: data.data})
}

onSubmit(e) {
    e.preventDefault();

    const obj = {
        nome: this.state.nome,
        matricula: this.state.matricula,
    };
    try {
      axios.defaults.headers.common = {'Authorization': `Bearer 13|ZJK0PYiy4fAz6u7qe70t70wwJFTjwxcQJ3Eu8f2Q`}
      api.put(`/${this.state.id}`, obj, {headers: {"Authorization": `Bearer 13|ZJK0PYiy4fAz6u7qe70t70wwJFTjwxcQJ3Eu8f2Q`}}).then(res => {
        NotificationManager.success("Agente atualizado", 'Sucesso')
        this.getRepo();
      })

      this.setState({
        id:"",
        nome: "",
        matricula: "",
      })
    }catch(error){
      console.log(error)
    }    
}

render() {
  
    return (
      <>
      <button type="button" className="btn btn-default" data-toggle="modal" data-target="#updateAgenteModal">
        Editar
      </button>

      <div className="modal fade" id="updateAgenteModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog" role="document">
        <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true" onClick={() => 
          this.setState({
            id:"",
            nome: "",
            matricula: "",
          })}>×</span></button>
          <h3 className="modal-title">Editar Agente</h3>
        </div>
        <div className="modal-body">
          <div style={{marginTop: 10}}>
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
            </form>
            <NotificationContainer/>
          </div> 
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" onClick={this.onSubmit}>Salvar</button>
        </div>
      </div>

        </div>
      </div>
      
      
      </>
      
    )
}
}
export default UpdateAgente
