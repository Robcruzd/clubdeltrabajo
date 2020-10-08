package com.domain.vo;

import java.io.Serializable;

import com.domain.Empresa;
import com.service.dto.UserDTO;

public class EmpresaVo implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -1017059090782812688L;
	private UserDTO usuario;
	private Empresa empresa;
	
	public EmpresaVo() {
		
	}

	public UserDTO getUsuario() {
		return usuario;
	}

	public void setUsuario(UserDTO usuario) {
		this.usuario = usuario;
	}

	public Empresa getEmpresa() {
		return empresa;
	}

	public void setEmpresa(Empresa empresa) {
		this.empresa = empresa;
	}

}
