import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

const URL = 'http://127.0.0.1:8000/api/v1/prestamos/';

class App extends Component {

	constructor(props) {

		super(props);
		this.state = ({
			prestamos: [],
			modalInsertar: false,
			modalEliminar: false,
			tipoModal: "",
			form: {
				'id': 0,
				'libro': 0,
				'usuario': 0,
				'fechaPrestamo': "",
				'fechaDevolucion': ""
			}
		})
	}

	peticionGet=()=> {
		axios.get(URL+"listar")
			.then(rs => {
				this.setState({prestamos: rs.data});
			})
			.catch(error=> {
					console.log(error.message);				
			})
	}

	peticionPost=()=> {
		axios.post(URL+"crear", this.state.form)
			.then(rs=>{
				this.modalInsertar();
				this.peticionGet();
			})
			.catch(error=> {
				console.log(error.message);				
			})
	}

	peticionPut=()=> {
		axios.put(URL+this.state.form.id+"/actualizar", this.state.form)
			.then(rs=>{
				this.modalInsertar();
				this.peticionGet();	
			})
			.catch(error=> {
				console.log(error.message);				
			})
	}

	peticionDelete=()=> {
		axios.delete(URL+this.state.form.id+"/eliminar")
			.then(rs=>{
				this.setState({modalEliminar: false});
				this.peticionGet();
			})
	}

	componentDidMount() {
		this.peticionGet();
	}

	modalInsertar=()=>{
		this.setState({modalInsertar: !this.state.modalInsertar});
	}

	handleChange=async e=>{
		e.persist();
		await this.setState({
			form: {
				...this.state.form,
				[e.target.name]: e.target.value
			},
		});
		console.log(this.state.form);	
	}

	seleccionarPrestamo=(prestamo)=> {
		this.setState({
			tipoModal: 'actualizar',
			form: {
				id: prestamo.id,
				fechaPrestamo: prestamo.fechaPrestamo,
				fechaDevolucion: prestamo.fechaDevolucion,
				libro: prestamo.libro,
				usuario: prestamo.usuario
			}
		})
	}

	render() {
		const {form} = this.state;
		return (
			<div className="App">
				<div className="container">
					
					<button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar préstamo</button>
  
					<table className="table table-bordered">
						<thead className="thead-light">
							<tr>
								<th scope="col">ID</th>
								<th scope="col">Usuario</th>
								<th scope="col">Libro</th>
								<th scope="col">Fecha de préstamo</th>
								<th scope="col">Fecha de devolución</th>
								<th scope="col" colSpan="2">Opciones</th>
							</tr>
						</thead>
						<tbody>
							{this.state.prestamos.map(prestamo=>{
								return(
									<tr key={prestamo.id}>
										<th scope="row">{prestamo.id}</th>
										<td>{prestamo.usuario}</td>
										<td>{prestamo.libro}</td>
										<td>{prestamo.fechaPrestamo}</td>
										<td>{prestamo.fechaDevolucion}</td>
										<td>
											<button className="btn btn-primary" onClick={()=>{this.seleccionarPrestamo(prestamo); this.modalInsertar()}}>Editar</button>
											<button className="btn btn-danger" onClick={()=>{this.seleccionarPrestamo(prestamo); this.setState({modalEliminar: true})}}>Eliminar</button>
										</td>
									</tr>
								)
							})}
						</tbody>
					</table>

					<Modal isOpen={this.state.modalInsertar}>
						<ModalHeader style={{display: 'block'}}>
							<span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
						</ModalHeader>

						<ModalBody>
							<div className="form-group">
								<input type="hidden" name="id" value={form?form.id:0}/>
								<label htmlFor="usuario">Usuario</label>
								<input className="form-control" type="text" name="usuario" id="usuario" onChange={this.handleChange} value={form?form.usuario: 0}/>
								<br />
								<label htmlFor="libro">Libro</label>
								<input className="form-control" type="text" name="libro" id="libro" onChange={this.handleChange} value={form?form.libro: 0}/>
								<br />
								<label htmlFor="fechaPrestamo">Fecha del préstamo</label>
								<input className="form-control" type="text" name="fechaPrestamo" id="fechaPrestamo" onChange={this.handleChange} value={form?form.fechaPrestamo: ''}/>
								<br />
								<label htmlFor="fechaDevolucion">Fecha del devolución</label>
								<input className="form-control" type="text" name="fechaDevolucion" id="fechaDevolucion" onChange={this.handleChange} value={form?form.fechaDevolucion: ''}/>
							</div>
						</ModalBody>

						<ModalFooter>
							{
							this.state.tipoModal ==='insertar'?
							<button className="btn btn-success" onClick={()=>this.peticionPost()}>
							Insertar
							</button>: <button className="btn btn-primary" onClick={()=>this.peticionPut()}>
							Actualizar
							</button>
							}
							<button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
						</ModalFooter>
					</Modal>

					<Modal isOpen={this.state.modalEliminar}>
						<ModalBody>
						Estás seguro que deseas eliminar el prestamo
						</ModalBody>
							<ModalFooter>
							<button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Sí</button>
							<button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
						</ModalFooter>
					</Modal>

				</div>
			</div>
		)
	}

}

export default App;
