package com.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Idioma.
 */
@Entity
@Table(name = "ct_idioma_tb")
public class Idioma implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "idioma", nullable = false)
    private String idioma;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIdioma() {
        return idioma;
    }

    public Idioma idioma(String idioma) {
        this.idioma = idioma;
        return this;
    }

    public void setIdioma(String idioma) {
        this.idioma = idioma;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Idioma)) {
            return false;
        }
        return id != null && id.equals(((Idioma) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Idioma{" +
            "id=" + getId() +
            ", idioma='" + getIdioma() + "'" +
            "}";
    }
}
