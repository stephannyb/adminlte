import { Component } from "react";
import {Box} from 'adminlte-2-react';
import axios from 'axios'
  
  axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
    console.log('csrf-cookie', response)
  });

class Login extends Component {
  constructor(props) {
    super(props);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        email: '',
        password: '',
    }
  }

onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
}

onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
}


onSubmit(e) {
    e.preventDefault();

    const obj = {
      email: this.state.email,
      password: this.state.password,
    };

    const token = axios.post('http://localhost:8000/api/login', obj)
        .then(res =>  {
          
          console.log(res)
          const token = res.data.token
          console.log('token', token)
          return token
        });

    axios.defaults.headers.common = {'Authorization': `Bearer ${token}`} 
    
    this.setState({
      email: "",
      password: "",
    })    
}


  render(){
    
    return(

        <div className="hold-transaction login-page">
          <Box className="login-box">
            <div className="login-box-body">
              <p className="login-box-msg">
                Iniciar Sessão
              </p>
              <form method="POST">
                <div className="form-group has-feedbak">
                  <input className="form-control" 
                         type="email" placeholder="Email"
                         value={this.state.email}
                         onChange={this.onChangeEmail}
                  />
                </div>
                <div className="form-group has-feedbak">
                  <input className="form-control" 
                         type="password" 
                         placeholder="Password"
                         value={this.state.password}
                         onChange={this.onChangePassword}
                  />
                </div>
                <div className="row">
                  <div className="col-xs-4">
                    <button className="btn btn-primary btn-bloc btn-flat" type="submit" onClick={this.onSubmit}>Entrar</button>
                  </div>
                </div>
              </form>
            </div>
          </Box>
        </div>
      
      
    )
  }

}

export default Login;

