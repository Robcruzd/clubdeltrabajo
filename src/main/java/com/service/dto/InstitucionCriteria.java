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
 * Criteria class for the {@link com.domain.Institucion} entity. This class is used
 * in {@link com.web.rest.InstitucionResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /institucions?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class InstitucionCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter institucion;

    public InstitucionCriteria() {
    }

    public InstitucionCriteria(InstitucionCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.institucion = other.institucion == null ? null : other.institucion.copy();
    }

    @Override
    public InstitucionCriteria copy() {
        return new InstitucionCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getInstitucion() {
        return institucion;
    }

    public void setInstitucion(StringFilter institucion) {
        this.institucion = institucion;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final InstitucionCriteria that = (InstitucionCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(institucion, that.institucion);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        institucion
        );
    }

    @Override
    public String toString() {
        return "InstitucionCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (institucion != null ? "institucion=" + institucion + ", " : "") +
            "}";
    }

}
