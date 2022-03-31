package com.domain;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "ct_bd_empresa_tb")
public class BdEmpresa implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 8936274607002590895L;
	
	@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

	@ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("bdEmpresas")
    private Persona usuario;
	
    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("bdEmpresas")
    private Empresa empresa;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Persona getUsuario() {
		return usuario;
	}

	public void setUsuario(Persona usuario) {
		this.usuario = usuario;
	}

	public Empresa getEmpresa() {
		return empresa;
	}

	public void setEmpresa(Empresa empresa) {
		this.empresa = empresa;
	}	

}
