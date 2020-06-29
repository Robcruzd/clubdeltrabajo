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
 * A InformacionAcademica.	
 */
@Entity
@Table(name = "ct_informacion_academica_tb")
public class InformacionAcademica implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nivel_estudio")
    private Integer nivelEstudio;

    @NotNull
    @Column(name = "estado", nullable = false)
    private Integer estado;

    @Column(name = "fecha_fin")
    private LocalDate fechaFin;

    @Column(name = "titulo_otorgado")
    private String tituloOtorgado;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("informacionAcademicas")
    private Persona usuario;
    
    @NotNull
    @Column(name = "institucion", nullable = false)
    private String institucion;
    
    @NotNull
    @Column(name = "ciudad_academica", nullable = false)
    private Integer ciudadAcademica;


    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNivelEstudio() {
        return nivelEstudio;
    }

    public InformacionAcademica nivelEstudio(Integer nivelEstudio) {
        this.nivelEstudio = nivelEstudio;
        return this;
    }

    public void setNivelEstudio(Integer nivelEstudio) {
        this.nivelEstudio = nivelEstudio;
    }

    public Integer getEstado() {
        return estado;
    }

    public InformacionAcademica estado(Integer estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(Integer estado) {
        this.estado = estado;
    }

    public LocalDate getFechaFin() {
        return fechaFin;
    }

    public InformacionAcademica fechaFin(LocalDate fechaFin) {
        this.fechaFin = fechaFin;
        return this;
    }

    public void setFechaFin(LocalDate fechaFin) {
        this.fechaFin = fechaFin;
    }

    public String getTituloOtorgado() {
        return tituloOtorgado;
    }

    public InformacionAcademica tituloOtorgado(String tituloOtorgado) {
        this.tituloOtorgado = tituloOtorgado;
        return this;
    }

    public void setTituloOtorgado(String tituloOtorgado) {
        this.tituloOtorgado = tituloOtorgado;
    }

    public Persona getUsuario() {
        return usuario;
    }

    public InformacionAcademica usuario(Persona persona) {
        this.usuario = persona;
        return this;
    }

    public void setUsuario(Persona persona) {
        this.usuario = persona;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    public String getInstitucion() {
		return institucion;
	}

	public void setInstitucion(String institucion) {
		this.institucion = institucion;
	}

	public Integer getCiudadAcademica() {
		return ciudadAcademica;
	}

	public void setCiudadAcademica(Integer ciudadAcademica) {
		this.ciudadAcademica = ciudadAcademica;
	}

	@Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof InformacionAcademica)) {
            return false;
        }
        return id != null && id.equals(((InformacionAcademica) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "InformacionAcademica{" +
            "id=" + getId() +
            ", nivelEstudio=" + getNivelEstudio() +
            ", estado=" + getEstado() +
            ", fechaFin='" + getFechaFin() + "'" +
            ", tituloOtorgado='" + getTituloOtorgado() + "'" +
            "}";
    }
}
