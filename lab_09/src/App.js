import React, { Component } from 'react';
import './App.css';

class App extends Component {

	constructor(props) {
	super(props)
	this.state = {
		articulos: [
			{
				codigo: 1, 
				descripcion: 'coca-cola',
				precio: 2.50
			},
			{
				codigo: 2, 
				descripcion: 'inka-cola',
				precio: 2.20
			},
			{
				codigo: 3, 
				descripcion: 'fanta',
				precio: 1.70
			}
		]
	};
	this.borrar = this.borrar.bind(this);
	}

	borrar(cod) {
		var temp = this.state.articulos.filter((el)=>el.codigo !== cod);
		this.setState({
			articulos: temp
		})
	}

	render() {
		return (
		  <div className="container p-5">
			  <h1 className="text-center m-4">Mi primera página en React</h1>
			  <div className="text-center">
			  <table className="table table-bordered">
			<thead className="thead-light">
				<tr>
					<th>Código</th>
					<th>Descripción</th>
					<th>Precio</th>
					<th>Opciones</th>
				</tr>
			</thead>
			<tbody>
			{this.state.articulos.map(elemento => {
			  return (
				<tr key={elemento.codigo}>
				  <th scope="row">
					{elemento.codigo}  
				  </th>
				  <td>
					{elemento.descripcion}
				  </td>
				  <td>
					{elemento.precio}
				  </td>              
				  <td>
					<button className="btn btn-sm btn-danger" onClick={()=>this.borrar(elemento.codigo)}>Borrar</button>
				  </td>
				</tr>
			  )
			})}
			</tbody>    
			</table>
			  </div>
		  </div>
		);
	  }
	
}

export default App;
