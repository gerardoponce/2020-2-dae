import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

const URL = "http://localhost:8000/api/v1/series/";

class App extends Component {

	constructor(props) {

		super(props);
		this.state = ({
			series: [],
			count: null,
			form: {
				id: 0,
				name: '',
				release_date: '',
				rating: '0',
				category: ''
			}
		})
	}

	mostrarTodos = () => {
		axios.get(URL)
		.then(rs=>{
			this.setState({series: rs.data})
		})
		.catch(error=>{
			console.log(error.message);
		})
	}

	crearSerie = async e => {
		e.preventDefault();
		this.setState({
			count: null
		})
		await axios.post(URL+'crear/', this.state.form)
		.then(rs=>{
			console.log(rs)
			this.mostrarTodos();
		})
		.catch(error=>{
			console.log(error.message);
		})
		console.log(this.state.form);
	}

	seleccionarSerie = (serie) => {
		this.setState({
			count: serie.id,
			form: {
				id: serie.id,
				name: serie.name,
				release_date: serie.release_date,
				rating: serie.rating,
				category: serie.category

			}
		})
	}

	actualizarSerie = () => {
		this.setState({
			count:1
		})
		axios.put(URL+this.state.form.id+'/actualizar/', this.state.form)
		.then(rs => {
			console.log(rs)
			this.mostrarTodos();
		})
	}

	eliminarSerie = () => {
		this.setState({
			count: null
		})
		axios.delete(URL+this.state.form.id+'/eliminar/')
		.then(rs => {
			console.log(rs)
			this.mostrarTodos();
		})
	}

	componentDidMount(){
		this.mostrarTodos();
	}

	handleChange= async e=> {
		e.persist();
		await this.setState({
			form:{
				...this.state.form,
				[e.target.name]: e.target.value
			}
		});
		console.log(this.state.form);
	}	

  	render() {
		const {form}=this.state;
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
					{this.state.series.map( serie => {
						return (
							<tr key={serie.id}>
								<td>{serie.name}</td>
								<td>{serie.release_date}</td>
								<td>{serie.rating}</td>
								<td>{serie.category}</td>
								<td>
									<div className="d-flex justify-content-center">
										<button onClick={()=>this.seleccionarSerie(serie)} className="btn btn-sm btn-success mx-2">Editar</button>
										
										<button className="btn btn-sm btn-danger mx-2" onClick={this.eliminarSerie} type="button">Eliminar</button>
										
									</div>
									
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<hr/>	
			<form onSubmit={this.state.count!=null ? this.actualizarSerie : this.crearSerie}>
				<input type="hidden" value={form?form.id:0} name="id"/>
				<p>
					Ingrese nombre:
					<input type="text" value={form?form.name:''} onChange={this.handleChange} name="name"/>
				</p>
				<p>
					Ingrese rating:
					<input type="number" value={form?form.rating:''} onChange={this.handleChange} name="rating"/>
				</p>
				<p>
					Categoria:
					<input type="text" value={form?form.category:''} onChange={this.handleChange} name="category"/>
				</p>
				<p>
					Fecha:
					<input type="text" value={form?form.release_date:''} onChange={this.handleChange} name="release_date"/>
				</p>
				<button className="btn btn-primary" type="submit">Guardar</button>
			</form>
		</div>
		)
  	}
}
export default App;
