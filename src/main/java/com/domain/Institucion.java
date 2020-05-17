package com.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Institucion.
 */
@Entity
@Table(name = "ct_institucion_tb")
public class Institucion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "institucion", nullable = false)
    private String institucion;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getInstitucion() {
        return institucion;
    }

    public Institucion institucion(String institucion) {
        this.institucion = institucion;
        return this;
    }

    public void setInstitucion(String institucion) {
        this.institucion = institucion;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Institucion)) {
            return false;
        }
        return id != null && id.equals(((Institucion) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Institucion{" +
            "id=" + getId() +
            ", institucion='" + getInstitucion() + "'" +
            "}";
    }
}
