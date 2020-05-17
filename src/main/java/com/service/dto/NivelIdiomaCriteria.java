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
 * Criteria class for the {@link com.domain.NivelIdioma} entity. This class is used
 * in {@link com.web.rest.NivelIdiomaResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /nivel-idiomas?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class NivelIdiomaCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter nivel;

    public NivelIdiomaCriteria() {
    }

    public NivelIdiomaCriteria(NivelIdiomaCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.nivel = other.nivel == null ? null : other.nivel.copy();
    }

    @Override
    public NivelIdiomaCriteria copy() {
        return new NivelIdiomaCriteria(this);
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


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final NivelIdiomaCriteria that = (NivelIdiomaCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(nivel, that.nivel);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        nivel
        );
    }

    @Override
    public String toString() {
        return "NivelIdiomaCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (nivel != null ? "nivel=" + nivel + ", " : "") +
            "}";
    }

}
