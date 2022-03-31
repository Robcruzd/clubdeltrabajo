package com.domain;

import java.io.Serializable;
import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * A AplicacionOferta.
 */
@Entity
@Table(name = "ct_aplicacion_oferta_tb")
public class AplicacionOferta implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("aplicacionOfertas")
    private Persona usuario;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("aplicacionOfertas")
    private Oferta oferta;
    
    @NotNull
    @Column(name = "estado", nullable = false)
    private String estado;
    
    @NotNull
    @Column(name = "fecha_postulacion", nullable = false)
    private LocalDate fechaPostulacion;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Persona getUsuario() {
        return usuario;
    }

    public AplicacionOferta usuario(Persona persona) {
        this.usuario = persona;
        return this;
    }

    public void setUsuario(Persona persona) {
        this.usuario = persona;
    }

    public Oferta getOferta() {
        return oferta;
    }

    public AplicacionOferta oferta(Oferta oferta) {
        this.oferta = oferta;
        return this;
    }

    public void setOferta(Oferta oferta) {
        this.oferta = oferta;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove
    public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public LocalDate getFechaPostulacion() {
		return fechaPostulacion;
	}

	public void setFechaPostulacion(LocalDate fechaPostulacion) {
		this.fechaPostulacion = fechaPostulacion;
	}
    
    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AplicacionOferta)) {
            return false;
        }
        return id != null && id.equals(((AplicacionOferta) o).id);
    }

	@Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "AplicacionOferta{" +
            "id=" + getId() +
            "}";
    }
}
