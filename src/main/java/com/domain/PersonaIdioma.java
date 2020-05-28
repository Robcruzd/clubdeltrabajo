package com.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A PersonaIdioma.
 */
@Entity
@Table(name = "ct_persona_idioma_tb")
public class PersonaIdioma implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "nivel", nullable = false)
    private String nivel;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("personaIdiomas")
    private Persona idPersona;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("personaIdiomas")
    private Idioma idIdioma;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNivel() {
        return nivel;
    }

    public PersonaIdioma nivel(String nivel) {
        this.nivel = nivel;
        return this;
    }

    public void setNivel(String nivel) {
        this.nivel = nivel;
    }

    public Persona getIdPersona() {
        return idPersona;
    }

    public PersonaIdioma idPersona(Persona persona) {
        this.idPersona = persona;
        return this;
    }

    public void setIdPersona(Persona persona) {
        this.idPersona = persona;
    }

    public Idioma getIdIdioma() {
        return idIdioma;
    }

    public PersonaIdioma idIdioma(Idioma idioma) {
        this.idIdioma = idioma;
        return this;
    }

    public void setIdIdioma(Idioma idioma) {
        this.idIdioma = idioma;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PersonaIdioma)) {
            return false;
        }
        return id != null && id.equals(((PersonaIdioma) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "PersonaIdioma{" +
            "id=" + getId() +
            ", nivel='" + getNivel() + "'" +
            "}";
    }
}
