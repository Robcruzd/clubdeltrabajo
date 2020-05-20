package com.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Dependencia.
 */
@Entity
@Table(name = "ct_dependencia_tb")
public class Dependencia implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "dependencia", nullable = false)
    private String dependencia;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDependencia() {
        return dependencia;
    }

    public Dependencia dependencia(String dependencia) {
        this.dependencia = dependencia;
        return this;
    }

    public void setDependencia(String dependencia) {
        this.dependencia = dependencia;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Dependencia)) {
            return false;
        }
        return id != null && id.equals(((Dependencia) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Dependencia{" +
            "id=" + getId() +
            ", dependencia='" + getDependencia() + "'" +
            "}";
    }
}
