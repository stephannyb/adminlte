import { Component } from 'react';
import axios from 'axios'

import  { Content, Row, Col, Box } from 'adminlte-2-react';
import CreateAgente from './CreateAgente';
import UpdateAgente from './UpdateAgente';


const api = axios.create({
  baseURL: 'http://localhost:8000/api/agentes'
  // withCredentials: true
})

class Agente extends Component {
  
  constructor(){
    super();
    this.getAgentes()
    
  }

  state ={
    agentes:[]
  }

  getAgentes = async () => {
    let data = await api.get('/').then(({ data })=> data);
    this.setState({ agentes: data.data })
  }


  deleteAgente = async (id) => {
    await api.delete(`/${id}`, {headers: {"Authorization": `Bearer 13|ZJK0PYiy4fAz6u7qe70t70wwJFTjwxcQJ3Eu8f2Q`}})
    this.getAgentes()
  }
  
  render(){
      return (
      <Content title="Agente" subTitle="Cadastro de Agentes" browserTitle="Agente">
        <Row>
          <CreateAgente/>
          <Col xs={12}>
            <Box title="Listar Agentes Cadastrados">
              <table className="table table-striped table-bordered">
                <tbody >
                  <tr >
                    <th>Nome</th>
                    <th>Matricula</th>
                  </tr>               
                  {this.state.agentes.map(agente => {
                    return (
                      <>
                        <tr key={agente.id}>
                          <td>{agente.nome}</td>
                          <td>{agente.matricula}</td>
                          <UpdateAgente agente={agente}/>
                          <button onClick={()=> this.deleteAgente(agente.id)}>Excluir</button>
                        </tr>
                      </>
                    )                                
                  })}       
                </tbody>
              </table>
            </Box>
          </Col>
        </Row>
      </Content>);
    }

}
export default Agente;

