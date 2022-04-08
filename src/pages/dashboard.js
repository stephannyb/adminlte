import { Component } from "react";

import AdminLTE, { Sidebar } from 'adminlte-2-react';
import Agente from '../components/Agente/Agente';
import axios from 'axios'
const { Item, Searchbar} = Sidebar;


axios.post('http://localhost:8000/api/logout')
        .then(res =>  
            console.log(res));

class Dashboard extends Component {

  sidebar = [
    <div key='sidebar'>
      <Searchbar key='busca' defaultValue={"pesquisar"}></Searchbar>
      <Item icon={"fa-user"} key="agenteMenu" text="Agente" to="/agente" />
      <Item key="logout" text="Sair" to="/login"/>
    </div>
  ]

  render(){
    return (
      <div>
        <AdminLTE key='principal' title={["Treinamento", "AdminLte"]} titleShort={["He", "we"]} theme="purple-light" sidebar={this.sidebar}>
          <Agente path ="/agente"/>
        </AdminLTE>
      </div>
    )
  }


}
export default Dashboard