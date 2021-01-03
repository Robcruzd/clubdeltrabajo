package com.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Regiones.
 */
@Entity
@Table(name = "ct_regiones_tb")
public class Regiones implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "region", nullable = false)
    private String region;

    @NotNull
    @Column(name = "codigo_dane_del_departamento", nullable = false)
    private Integer codigoDaneDelDepartamento;

    @NotNull
    @Column(name = "departamento", nullable = false)
    private String departamento;

    @NotNull
    @Column(name = "codigo_dane_del_municipio", nullable = false)
    private Integer codigoDaneDelMunicipio;

    @NotNull
    @Column(name = "municipio", nullable = false)
    private String municipio;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRegion() {
        return region;
    }

    public Regiones region(String region) {
        this.region = region;
        return this;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public Integer getCodigoDaneDelDepartamento() {
        return codigoDaneDelDepartamento;
    }

    public Regiones codigoDaneDelDepartamento(Integer codigoDaneDelDepartamento) {
        this.codigoDaneDelDepartamento = codigoDaneDelDepartamento;
        return this;
    }

    public void setCodigoDaneDelDepartamento(Integer codigoDaneDelDepartamento) {
        this.codigoDaneDelDepartamento = codigoDaneDelDepartamento;
    }

    public String getDepartamento() {
        return departamento;
    }

    public Regiones departamento(String departamento) {
        this.departamento = departamento;
        return this;
    }

    public void setDepartamento(String departamento) {
        this.departamento = departamento;
    }

    public Integer getCodigoDaneDelMunicipio() {
        return codigoDaneDelMunicipio;
    }

    public Regiones codigoDaneDelMunicipio(Integer codigoDaneDelMunicipio) {
        this.codigoDaneDelMunicipio = codigoDaneDelMunicipio;
        return this;
    }

    public void setCodigoDaneDelMunicipio(Integer codigoDaneDelMunicipio) {
        this.codigoDaneDelMunicipio = codigoDaneDelMunicipio;
    }

    public String getMunicipio() {
        return municipio;
    }

    public Regiones municipio(String municipio) {
        this.municipio = municipio;
        return this;
    }

    public void setMunicipio(String municipio) {
        this.municipio = municipio;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Regiones)) {
            return false;
        }
        return id != null && id.equals(((Regiones) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Regiones{" +
            "id=" + getId() +
            ", region='" + getRegion() + "'" +
            ", codigoDaneDelDepartamento='" + getCodigoDaneDelDepartamento() + "'" +
            ", departamento='" + getDepartamento() + "'" +
            ", codigoDaneDelMunicipio='" + getCodigoDaneDelMunicipio() + "'" +
            ", municipio='" + getMunicipio() + "'" +
            "}";
    }
}
