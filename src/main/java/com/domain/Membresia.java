package com.domain;

// import javax.persistence.*;
// import javax.validation.constraints.*;
import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

/**
 * A Membresía.
 */
@Entity
@Table(name = "ct_membresias_tb")
public class Membresia implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
	@SequenceGenerator(name = "sequenceGenerator")
	private Long id;

	@NotNull
	@Column(name = "nombre", nullable = false)
	private String nombreMembresia;

	@NotNull
	@Column(name = "precio", nullable = false)
	private Integer precioMembresia;

	@NotNull
	@Column(name = "descargas", nullable = false)
	private Integer descargas;

	@NotNull
	@Column(name = "ofertas", nullable = false)
	private Integer ofertas;

	@NotNull
	@Column(name = "visualizaciones", nullable = false)
	private Integer visualizaciones;

	@NotNull
	@Column(name = "membresiaclub", nullable = false)
	private boolean membresiaClub;

	@NotNull
	@Column(name = "juridica", nullable = false)
	private boolean juridica;

	@NotNull
	@Column(name = "replicasoferta", nullable = false)
	private Integer replicasOferta;

	// jhipster-needle-entity-add-field - JHipster will add fields here, do not
	// remove
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNombreMembresia() {
		return nombreMembresia;
	}

	public Membresia nombreMembresia(String nombreMembresia) {
		this.nombreMembresia = nombreMembresia;
		return this;
	}

	public void setNombreMembresia(String nombreMembresia) {
		this.nombreMembresia = nombreMembresia;
	}

	public Integer getPrecioMembresia() {
		return precioMembresia;
	}

	public Membresia precioMembresia(Integer precioMembresia) {
		this.precioMembresia = precioMembresia;
		return this;
	}

	public void setPrecioMembresia(Integer precioMembresia) {
		this.precioMembresia = precioMembresia;
	}

	public Integer getDescargas() {
		return descargas;
	}

	public Membresia descargas(Integer descargas) {
		this.descargas = descargas;
		return this;
	}

	public void setDescargas(Integer descargas) {
		this.descargas = descargas;
	}

	public Integer getOfertas() {
		return ofertas;
	}

	public Membresia ofertas(Integer ofertas) {
		this.ofertas = ofertas;
		return this;
	}

	public void setOfertas(Integer ofertas) {
		this.ofertas = ofertas;
	}

	public Integer getVisualizaciones() {
		return visualizaciones;
	}

	public void setVisualizaciones(Integer visualizaciones) {
		this.visualizaciones = visualizaciones;
	}

	public boolean getMembresiaClub() {
		return membresiaClub;
	}

	public void setMembresiaClub(boolean membresiaClub) {
		this.membresiaClub = membresiaClub;
	}

	public boolean getJuridica() {
		return juridica;
	}

	public void setJuridica(boolean juridica) {
		this.juridica = juridica;
	}

	public Integer getReplicasOferta() {
		return replicasOferta;
	}

	public void setReplicasOferta(Integer replicasOferta) {
		this.replicasOferta = replicasOferta;
	}
	// jhipster-needle-entity-add-getters-setters - JHipster will add getters and
	// setters here, do not remove

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (!(o instanceof Membresia)) {
			return false;
		}
		return id != null && id.equals(((Membresia) o).id);
	}

	@Override
	public int hashCode() {
		return 31;
	}

	@Override
	public String toString() {
		return "Membresia{" + "id=" + getId() + ", nombre='" + getNombreMembresia() + "'" + "}";
	}
}
