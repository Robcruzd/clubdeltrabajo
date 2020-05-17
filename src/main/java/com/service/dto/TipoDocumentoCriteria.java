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
 * Criteria class for the {@link com.domain.TipoDocumento} entity. This class is used
 * in {@link com.web.rest.TipoDocumentoResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /tipo-documentos?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class TipoDocumentoCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter nombreTipo;

    public TipoDocumentoCriteria() {
    }

    public TipoDocumentoCriteria(TipoDocumentoCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.nombreTipo = other.nombreTipo == null ? null : other.nombreTipo.copy();
    }

    @Override
    public TipoDocumentoCriteria copy() {
        return new TipoDocumentoCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getNombreTipo() {
        return nombreTipo;
    }

    public void setNombreTipo(StringFilter nombreTipo) {
        this.nombreTipo = nombreTipo;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final TipoDocumentoCriteria that = (TipoDocumentoCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(nombreTipo, that.nombreTipo);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        nombreTipo
        );
    }

    @Override
    public String toString() {
        return "TipoDocumentoCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (nombreTipo != null ? "nombreTipo=" + nombreTipo + ", " : "") +
            "}";
    }

}
