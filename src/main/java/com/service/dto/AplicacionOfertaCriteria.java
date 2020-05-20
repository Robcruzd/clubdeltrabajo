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
 * Criteria class for the {@link com.domain.AplicacionOferta} entity. This class is used
 * in {@link com.web.rest.AplicacionOfertaResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /aplicacion-ofertas?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class AplicacionOfertaCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private LongFilter usuarioId;

    private LongFilter ofertaId;

    public AplicacionOfertaCriteria() {
    }

    public AplicacionOfertaCriteria(AplicacionOfertaCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.usuarioId = other.usuarioId == null ? null : other.usuarioId.copy();
        this.ofertaId = other.ofertaId == null ? null : other.ofertaId.copy();
    }

    @Override
    public AplicacionOfertaCriteria copy() {
        return new AplicacionOfertaCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public LongFilter getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(LongFilter usuarioId) {
        this.usuarioId = usuarioId;
    }

    public LongFilter getOfertaId() {
        return ofertaId;
    }

    public void setOfertaId(LongFilter ofertaId) {
        this.ofertaId = ofertaId;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final AplicacionOfertaCriteria that = (AplicacionOfertaCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(usuarioId, that.usuarioId) &&
            Objects.equals(ofertaId, that.ofertaId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        usuarioId,
        ofertaId
        );
    }

    @Override
    public String toString() {
        return "AplicacionOfertaCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (usuarioId != null ? "usuarioId=" + usuarioId + ", " : "") +
                (ofertaId != null ? "ofertaId=" + ofertaId + ", " : "") +
            "}";
    }

}
