package com.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.LocalDate;

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

    @Column(name = "fecha_inicio")
    private LocalDate fechaInicio;

    @Column(name = "fecha_fin")
    private LocalDate fechaFin;

    @Column(name = "titulo_otorgado")
    private String tituloOtorgado;

    @Column(name = "perfil_profesional")
    private String perfilProfesional;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("informacionAcademicas")
    private Persona usuario;

    @ManyToOne
    @JsonIgnoreProperties("informacionAcademicas")
    private Idioma idioma;

    @ManyToOne
    @JsonIgnoreProperties("informacionAcademicas")
    private NivelIdioma nivelIdioma;

    @ManyToOne
    @JsonIgnoreProperties("informacionAcademicas")
    private Institucion institucion;

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

    public LocalDate getFechaInicio() {
        return fechaInicio;
    }

    public InformacionAcademica fechaInicio(LocalDate fechaInicio) {
        this.fechaInicio = fechaInicio;
        return this;
    }

    public void setFechaInicio(LocalDate fechaInicio) {
        this.fechaInicio = fechaInicio;
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

    public String getPerfilProfesional() {
        return perfilProfesional;
    }

    public InformacionAcademica perfilProfesional(String perfilProfesional) {
        this.perfilProfesional = perfilProfesional;
        return this;
    }

    public void setPerfilProfesional(String perfilProfesional) {
        this.perfilProfesional = perfilProfesional;
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

    public Idioma getIdioma() {
        return idioma;
    }

    public InformacionAcademica idioma(Idioma idioma) {
        this.idioma = idioma;
        return this;
    }

    public void setIdioma(Idioma idioma) {
        this.idioma = idioma;
    }

    public NivelIdioma getNivelIdioma() {
        return nivelIdioma;
    }

    public InformacionAcademica nivelIdioma(NivelIdioma nivelIdioma) {
        this.nivelIdioma = nivelIdioma;
        return this;
    }

    public void setNivelIdioma(NivelIdioma nivelIdioma) {
        this.nivelIdioma = nivelIdioma;
    }

    public Institucion getInstitucion() {
        return institucion;
    }

    public InformacionAcademica institucion(Institucion institucion) {
        this.institucion = institucion;
        return this;
    }

    public void setInstitucion(Institucion institucion) {
        this.institucion = institucion;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

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
            ", fechaInicio='" + getFechaInicio() + "'" +
            ", fechaFin='" + getFechaFin() + "'" +
            ", tituloOtorgado='" + getTituloOtorgado() + "'" +
            ", perfilProfesional='" + getPerfilProfesional() + "'" +
            "}";
    }
}
