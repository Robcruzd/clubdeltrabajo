package com.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Archivo.
 */
@Entity
@Table(name = "ct_archivo_tb")
public class Archivo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "tipo", nullable = false)
    private Integer tipo;

    @NotNull
    @Column(name = "archivo", nullable = false)
    private String archivo;

    @NotNull
    @Column(name = "nombre", nullable = false)
    private String nombre;

    @NotNull
    @Column(name = "extension", nullable = false)
    private String extension;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("archivos")
    private Persona usuario;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getTipo() {
        return tipo;
    }

    public Archivo tipo(Integer tipo) {
        this.tipo = tipo;
        return this;
    }

    public void setTipo(Integer tipo) {
        this.tipo = tipo;
    }

    public String getArchivo() {
        return archivo;
    }

    public Archivo archivo(String archivo) {
        this.archivo = archivo;
        return this;
    }

    public void setArchivo(String archivo) {
        this.archivo = archivo;
    }

    public String getNombre() {
        return nombre;
    }

    public Archivo nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getExtension() {
        return extension;
    }

    public Archivo extension(String extension) {
        this.extension = extension;
        return this;
    }

    public void setExtension(String extension) {
        this.extension = extension;
    }

    public Persona getUsuario() {
        return usuario;
    }

    public Archivo usuario(Persona persona) {
        this.usuario = persona;
        return this;
    }

    public void setUsuario(Persona persona) {
        this.usuario = persona;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Archivo)) {
            return false;
        }
        return id != null && id.equals(((Archivo) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Archivo{" +
            "id=" + getId() +
            ", tipo=" + getTipo() +
            ", archivo='" + getArchivo() + "'" +
            ", nombre='" + getNombre() + "'" +
            ", extension='" + getExtension() + "'" +
            "}";
    }
}
