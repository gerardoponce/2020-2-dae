import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
 
class App extends Component {

	constructor(props) {

		super(props);
		this.state = ({
			series: [],
			pos: null,
			titulo: 'Nuevo',
			id: 0,
			nombre: '',
			fecha: '',
			rating: '0',
			categoria: ''
		})
	
		this.cambioNombre = this.cambioNombre.bind(this);
		this.cambioFecha = this.cambioFecha.bind(this);
		this.cambioRating = this.cambioRating.bind(this);
		this.cambioCategoria = this.cambioCategoria.bind(this);
		this.mostrar = this.mostrar.bind(this);
		this.eliminar = this.eliminar.bind(this);
		this.guardar = this.guardar.bind(this);
	
	}

	componentDidMount(){
		axios.get('http://127.0.0.1:8000/api/v1/series/')
		.then(res => {
			this.setState({ series: res.data }); 
			// console.log(res.data)
		});
	}

  	cambioNombre(e){
    	this.setState({
        	nombre: e.target.value
    	})
	}

	cambioFecha(e){
		this.setState({
			fecha: e.target.value
		})
	}

	cambioCategoria(e){
		this.setState({
			categoria: e.target.value
		})
	}

	cambioRating(e){
		this.setState({
			rating: e.target.value
		})
	}

	mostrar(cod,index){
		axios.get('http://127.0.0.1:8000/api/v1/series/'+cod+'/')
		.then(res =>{
			this.setState({
				pos: index,
				titulo: 'Editar',
				id: res.data.id,
				nombre : res.data.name,
				fecha : res.data.release_date,
				rating : res.data.rating,
				categoria : res.data.category
			})
		});    
	}

	guardar(e){
		e.preventDefault();
		let cod = this.state.id;
		let datos = {
			name : this.state.nombre,
			release_date : this.state.fecha,
			rating : this.state.rating,
			category : this.state.categoria
		}
		if(cod>0){ //Editamos un registro
			axios.put('http://127.0.0.1:8000/api/v1/series/'+cod+'/', datos)
			.then(res => {
				let indx = this.state.pos;
				this.state.series[indx] = res.data;
				var temp = this.state.series;
				this.setState({
					pos: null,
					titulo: 'Nuevo',
					id: 0,
					nombre : '',
					fecha : '',
					rating : 0,
					categoria : '',
					series : temp
				});
			}).catch((error)=>{
				console.log(error.toString());
			});  
		}else{ 
			//Nuevo registro
			axios.post('http://127.0.0.1:8000/api/v1/series/crear', datos)
			.then(res => {
				this.state.series.push(res.data);
				var temp = this.state.series;
				this.setState({
					id: 0,
					nombre : '',
					fecha: '',
					rating : '',
					categoria : '',
					series : temp
				});
			}).catch((error)=>{
				console.log(error.toString());
			});
		}
	}

	eliminar(cod){
		let rpta = window.confirm("Desea eliminar?");
		if(rpta){
			axios.delete('http://127.0.0.1:8000/series/'+cod+'/')
			.then(res => {
				var temp = this.state.series.filter((serie)=>serie.id !== cod);
				this.setState({
					series: temp
				})
			});
		}
	}

	

  	render() {
    	return (
		<div className="container text-center">
			<h1>Lista de Series</h1>
			<table className="table table-sm">
				<thead className="thead-dark">
					<tr>
						<th scope="col">Nombre</th>
						<th scope="col">Fecha</th>
						<th scope="col">Rating</th>
						<th scope="col">Categoría</th>
						<th scope="col" colSpan="2">Acciones</th>
					</tr>
				</thead>
				<tbody>
					{this.state.series.map( (serie,index) => {
						return (
							<tr key={serie.id}>
								<td>{serie.name}</td>
								<td>{serie.release_date}</td>
								<td>{serie.rating}</td>
								<td>{serie.category}</td>
								<td>
									<button onClick={()=>this.mostrar(serie.id,index)} className="btn btn-sm btn-success mx-2">Editar</button>
									<button onClick={()=>this.eliminar(serie.id)} className="btn btn-sm btn-danger mx-2">Eliminar</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<hr/>
			<h2>{this.state.titulo}</h2>
			<form onsubmit={this.guardar}>
				<input type="hidden" value={this.state.id} name="id"/>
				<p>
					Ingrese nombre:
					<input type="text" value={this.state.nombre} onChange={this.cambioNombre} name="nombre"/>
				</p>
				<p>
					Ingrese rating:
					<input type="number" value={this.state.rating} onChange={this.cambioRating} name="rating"/>
				</p>
				<p>
					Categoria:
					<input type="text" value={this.state.categoria} onChange={this.cambioCategoria} name="categoria"/>
				</p>
				<p>
					Fecha:
					<input type="text" value={this.state.fecha} onChange={this.cambioFecha} name="fecha"/>
				</p>
				<p><input type="submit" /></p>
			</form>
		</div>
		)
  	}
}
export default App;
