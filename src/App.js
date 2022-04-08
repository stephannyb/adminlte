import React, { Component } from 'react';
import AdminLTE, { Sidebar } from 'adminlte-2-react';
import Agente from './components/Agente/Agente';

// import HelloWord from './components/HelloWord';
// import axios from 'axios'
// import Login from './pages/login';
// import Dashboard from './pages/dashboard';

const { Item, Searchbar} = Sidebar;

class App extends Component {

  sidebar = [
    <div key='sidebar'>
      <Searchbar key='busca' defaultValue={"pesquisar"}></Searchbar>
      <Item icon={"fa-user"} key="agenteMenu" text="Agente" to="/agente" />
    </div>
  ]


  render() {
    return (
      // <Login />
      <AdminLTE key='principal' title={["Treinamento", "AdminLte"]} titleShort={["He", "we"]} theme="purple-light" sidebar={this.sidebar}>
        <Agente key='agente' path ="/agente"/>
      </AdminLTE>
      // <Dashboard />
    );
  }
}

export default App;