import './App.css';
import React, { Component } from 'react';

class App extends Component {  
  constructor(props) {
    super(props);
    this.state = {
      gaseosas: [],
      recuperado: false
    }
  }

  componentWillMount() {
    fetch('http://localhost:8000/api/v1/gaseosas')
      .then((response) => {
        return response.json()
      })
      .then((prod) => {
        this.setState({ 
          gaseosas: prod ,
          recuperado: true
        })
      })    
  } 


  render() {
      if (this.state.recuperado)
        return this.mostrarTabla()
      else
        return (<div>recuperando datos...</div>)
    }
  
  mostrarTabla() {
    return (
      <div className="container text-center my-5">
        <h1 className="h3 my-2">Tabla de gaseosas</h1>
        <table className="table table-sm table-bordered">
        <thead className="thead-light">
          <tr>
            <th>Código</th>
            <th>Descripción</th>
            <th>Precio</th>                    
          </tr>
        </thead>
        <tbody>  
          {this.state.gaseosas.map(gaseosa => {
            return (
              <tr key={gaseosa.codigo}>
                <th scope="row">{gaseosa.codigo}</th>
                <td>{gaseosa.nombre}</td>
                <td>{gaseosa.precio}</td>
              </tr>
            );
          })}
        </tbody>
        </table>
      </div>
    );
  }


}




export default App;
