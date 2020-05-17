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
 * Criteria class for the {@link com.domain.Idioma} entity. This class is used
 * in {@link com.web.rest.IdiomaResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /idiomas?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class IdiomaCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter idioma;

    public IdiomaCriteria() {
    }

    public IdiomaCriteria(IdiomaCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.idioma = other.idioma == null ? null : other.idioma.copy();
    }

    @Override
    public IdiomaCriteria copy() {
        return new IdiomaCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getIdioma() {
        return idioma;
    }

    public void setIdioma(StringFilter idioma) {
        this.idioma = idioma;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final IdiomaCriteria that = (IdiomaCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(idioma, that.idioma);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        idioma
        );
    }

    @Override
    public String toString() {
        return "IdiomaCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (idioma != null ? "idioma=" + idioma + ", " : "") +
            "}";
    }

}
