package com.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.LocalDate;

/**
 * A Oferta.
 */
@Entity
@Table(name = "ct_oferta_tb")
public class Oferta implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "descripcion", nullable = false)
    private String descripcion;

    @NotNull
    @Column(name = "titulo", nullable = false)
    private String titulo;

    @NotNull
    @Column(name = "salario", nullable = false)
    private Integer salario;

    @NotNull
    @Column(name = "cargo", nullable = false)
    private Integer cargo;

    @Column(name = "experiencia")
    private String experiencia;

    @NotNull
    @Column(name = "ciudad", nullable = false)
    private Integer ciudad;

    @NotNull
    @Column(name = "area", nullable = false)
    private Integer area;

    @NotNull
    @Column(name = "fecha_publicacion", nullable = false)
    private LocalDate fechaPublicacion;

    @NotNull
    @Size(max = 1)
    @Column(name = "estado", length = 1, nullable = false)
    private String estado;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("ofertas")
    private Empresa usuario;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public Oferta descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getTitulo() {
        return titulo;
    }

    public Oferta titulo(String titulo) {
        this.titulo = titulo;
        return this;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public Integer getSalario() {
        return salario;
    }

    public Oferta salario(Integer salario) {
        this.salario = salario;
        return this;
    }

    public void setSalario(Integer salario) {
        this.salario = salario;
    }

    public Integer getCargo() {
        return cargo;
    }

    public Oferta cargo(Integer cargo) {
        this.cargo = cargo;
        return this;
    }

    public void setCargo(Integer cargo) {
        this.cargo = cargo;
    }

    public String getExperiencia() {
        return experiencia;
    }

    public Oferta experiencia(String experiencia) {
        this.experiencia = experiencia;
        return this;
    }

    public void setExperiencia(String experiencia) {
        this.experiencia = experiencia;
    }

    public Integer getCiudad() {
        return ciudad;
    }

    public Oferta ciudad(Integer ciudad) {
        this.ciudad = ciudad;
        return this;
    }

    public void setCiudad(Integer ciudad) {
        this.ciudad = ciudad;
    }

    public Integer getArea() {
        return area;
    }

    public Oferta area(Integer area) {
        this.area = area;
        return this;
    }

    public void setArea(Integer area) {
        this.area = area;
    }

    public LocalDate getFechaPublicacion() {
        return fechaPublicacion;
    }

    public Oferta fechaPublicacion(LocalDate fechaPublicacion) {
        this.fechaPublicacion = fechaPublicacion;
        return this;
    }

    public void setFechaPublicacion(LocalDate fechaPublicacion) {
        this.fechaPublicacion = fechaPublicacion;
    }

    public String getEstado() {
        return estado;
    }

    public Oferta estado(String estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Empresa getUsuario() {
        return usuario;
    }

    public Oferta usuario(Empresa empresa) {
        this.usuario = empresa;
        return this;
    }

    public void setUsuario(Empresa empresa) {
        this.usuario = empresa;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Oferta)) {
            return false;
        }
        return id != null && id.equals(((Oferta) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Oferta{" +
            "id=" + getId() +
            ", descripcion='" + getDescripcion() + "'" +
            ", titulo='" + getTitulo() + "'" +
            ", salario=" + getSalario() +
            ", cargo=" + getCargo() +
            ", experiencia='" + getExperiencia() + "'" +
            ", ciudad=" + getCiudad() +
            ", area=" + getArea() +
            ", fechaPublicacion='" + getFechaPublicacion() + "'" +
            ", estado='" + getEstado() + "'" +
            "}";
    }
}
