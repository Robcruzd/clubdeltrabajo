package com.domain.vo;

import java.io.Serializable;

public class InformacionEmpresaVo implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -6677782249634997505L;
	
	private String nombre;
	private String apellidos;
	private String email;
	private String telefono;
	private String mensaje;
	
	public InformacionEmpresaVo() {
		
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getApellidos() {
		return apellidos;
	}

	public void setApellidos(String apellidos) {
		this.apellidos = apellidos;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getTelefono() {
		return telefono;
	}

	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}

	public String getMensaje() {
		return mensaje;
	}

	public void setMensaje(String mensaje) {
		this.mensaje = mensaje;
	}
}
