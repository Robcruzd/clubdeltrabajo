package com.service.dto;

import java.io.Serializable;
import java.util.Objects;
import io.github.jhipster.service.Criteria;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.DoubleFilter;
import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.FloatFilter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;

/**
 * Criteria class for the {@link com.domain.PersonaIdioma} entity. This class is used
 * in {@link com.web.rest.PersonaIdiomaResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /persona-idiomas?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class PersonaIdiomaCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter nivel;

    private LongFilter idPersonaId;

    private LongFilter idIdiomaId;

    public PersonaIdiomaCriteria() {
    }

    public PersonaIdiomaCriteria(PersonaIdiomaCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.nivel = other.nivel == null ? null : other.nivel.copy();
        this.idPersonaId = other.idPersonaId == null ? null : other.idPersonaId.copy();
        this.idIdiomaId = other.idIdiomaId == null ? null : other.idIdiomaId.copy();
    }

    @Override
    public PersonaIdiomaCriteria copy() {
        return new PersonaIdiomaCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getNivel() {
        return nivel;
    }

    public void setNivel(StringFilter nivel) {
        this.nivel = nivel;
    }

    public LongFilter getIdPersonaId() {
        return idPersonaId;
    }

    public void setIdPersonaId(LongFilter idPersonaId) {
        this.idPersonaId = idPersonaId;
    }

    public LongFilter getIdIdiomaId() {
        return idIdiomaId;
    }

    public void setIdIdiomaId(LongFilter idIdiomaId) {
        this.idIdiomaId = idIdiomaId;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final PersonaIdiomaCriteria that = (PersonaIdiomaCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(nivel, that.nivel) &&
            Objects.equals(idPersonaId, that.idPersonaId) &&
            Objects.equals(idIdiomaId, that.idIdiomaId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        nivel,
        idPersonaId,
        idIdiomaId
        );
    }

    @Override
    public String toString() {
        return "PersonaIdiomaCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (nivel != null ? "nivel=" + nivel + ", " : "") +
                (idPersonaId != null ? "idPersonaId=" + idPersonaId + ", " : "") +
                (idIdiomaId != null ? "idIdiomaId=" + idIdiomaId + ", " : "") +
            "}";
    }

}
