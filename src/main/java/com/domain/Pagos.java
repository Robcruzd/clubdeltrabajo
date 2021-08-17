package com.domain;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.time.LocalDateTime;

/**
 * A Pagos.
 */
@Entity
@Table(name = "ct_pagos_tb")
public class Pagos implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    // @NotNull
    // @Column(name = "pg_empresa_id", nullable = false)
    // private Long pgEmpresaId;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("pagos")
    private Membresia membresia;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("pagos")
    private Empresa empresa;

    @NotNull
    @Column(name = "pg_preferenciamerc", nullable = false)
    private String preferenciaMerc;

    @NotNull
    @Column(name = "estado", nullable = false)
    private String estado;

    @NotNull
    @Column(name = "fecha_creacion", nullable = false)
    private LocalDateTime fechaCreacion;

    @NotNull
    @Column(name = "fecha_ultima_actuali", nullable = false)
    private LocalDateTime fechaUltimaActuali;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPreferenciaMerc() {
        return preferenciaMerc;
    }

    public Pagos preferenciaMerc(String preferenciaMerc) {
        this.preferenciaMerc = preferenciaMerc;
        return this;
    }

    public void setPreferenciaMerc(String preferenciaMerc) {
        this.preferenciaMerc = preferenciaMerc;
    }

    public Membresia getMembresia() {
        return membresia;
    }

    public Pagos membresia(Membresia membresia) {
        this.membresia = membresia;
        return this;
    }

    public void setMembresia(Membresia membresia) {
        this.membresia = membresia;
    }

    public Empresa getEmpresa() {
        return empresa;
    }

    public Pagos empresa(Empresa empresa) {
        this.empresa = empresa;
        return this;
    }

    public void setEmpresa(Empresa empresa) {
        this.empresa = empresa;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(LocalDateTime fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public LocalDateTime getFechaUltimaActuali() {
        return fechaUltimaActuali;
    }

    public void setFechaUltimaActuali(LocalDateTime fechaUltimaActuali) {
        this.fechaUltimaActuali = fechaUltimaActuali;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Pagos)) {
            return false;
        }
        return id != null && id.equals(((Pagos) o).id);
    }

    @Override
    public int hashCode() {
        return 51;
    }

    @Override
    public String toString() {
        return "Pagos{" +
            "id=" + getId() +
            ", preference='" + getPreferenciaMerc() + "'" +
            "}";
    }
}
