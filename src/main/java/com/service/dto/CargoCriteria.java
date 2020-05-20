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
 * Criteria class for the {@link com.domain.Cargo} entity. This class is used
 * in {@link com.web.rest.CargoResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /cargos?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class CargoCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter cargo;

    public CargoCriteria() {
    }

    public CargoCriteria(CargoCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.cargo = other.cargo == null ? null : other.cargo.copy();
    }

    @Override
    public CargoCriteria copy() {
        return new CargoCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getCargo() {
        return cargo;
    }

    public void setCargo(StringFilter cargo) {
        this.cargo = cargo;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final CargoCriteria that = (CargoCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(cargo, that.cargo);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        cargo
        );
    }

    @Override
    public String toString() {
        return "CargoCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (cargo != null ? "cargo=" + cargo + ", " : "") +
            "}";
    }

}
