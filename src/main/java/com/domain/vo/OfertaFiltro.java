package com.domain.vo;

import java.io.Serializable;
import java.time.LocalDate;

public class OfertaFiltro implements Serializable{
    
    /**
	 * 
	 */
	private static final long serialVersionUID = -6273348631656340485L;
	
	private Long salario;
    private Long cargo;
    private String experiencia;
    private Long ciudad;
    private Long area;
    private LocalDate fechaPublicacion;
    private String estado;
    private Long profesion;
    private Long modalidad;
    
    public OfertaFiltro() {
    	
    }

	public Long getSalario() {
		return salario;
	}

	public void setSalario(Long salario) {
		this.salario = salario;
	}

	public Long getCargo() {
		return cargo;
	}

	public void setCargo(Long cargo) {
		this.cargo = cargo;
	}

	public String getExperiencia() {
		return experiencia;
	}

	public void setExperiencia(String experiencia) {
		this.experiencia = experiencia;
	}

	public Long getCiudad() {
		return ciudad;
	}

	public void setCiudad(Long ciudad) {
		this.ciudad = ciudad;
	}

	public Long getArea() {
		return area;
	}

	public void setArea(Long area) {
		this.area = area;
	}

	public LocalDate getFechaPublicacion() {
		return fechaPublicacion;
	}

	public void setFechaPublicacion(LocalDate fechaPublicacion) {
		this.fechaPublicacion = fechaPublicacion;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public Long getProfesion() {
		return profesion;
	}

	public void setProfesion(Long profesion) {
		this.profesion = profesion;
	}

	public Long getModalidad() {
		return modalidad;
	}

	public void setModalidad(Long modalidad) {
		this.modalidad = modalidad;
	}

}
