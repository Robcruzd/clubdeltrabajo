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
 * Criteria class for the {@link com.domain.Dependencia} entity. This class is used
 * in {@link com.web.rest.DependenciaResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /dependencias?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class DependenciaCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter dependencia;

    public DependenciaCriteria() {
    }

    public DependenciaCriteria(DependenciaCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.dependencia = other.dependencia == null ? null : other.dependencia.copy();
    }

    @Override
    public DependenciaCriteria copy() {
        return new DependenciaCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getDependencia() {
        return dependencia;
    }

    public void setDependencia(StringFilter dependencia) {
        this.dependencia = dependencia;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final DependenciaCriteria that = (DependenciaCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(dependencia, that.dependencia);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        dependencia
        );
    }

    @Override
    public String toString() {
        return "DependenciaCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (dependencia != null ? "dependencia=" + dependencia + ", " : "") +
            "}";
    }

}
