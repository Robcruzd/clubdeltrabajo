package com.domain.vo;

import java.io.Serializable;

import com.domain.Persona;
import com.service.dto.UserDTO;

public class UsuarioVo implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -6677782249634997505L;
	
	private UserDTO usuario;
	private Persona persona;
	
	public UsuarioVo() {
		
	}

	public UserDTO getUsuario() {
		return usuario;
	}

	public void setUsuario(UserDTO usuario) {
		this.usuario = usuario;
	}

	public Persona getPersona() {
		return persona;
	}

	public void setPersona(Persona persona) {
		this.persona = persona;
	}
	
	
}
