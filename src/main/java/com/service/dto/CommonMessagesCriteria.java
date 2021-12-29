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
 * Criteria class for the {@link com.domain.CommonMessages} entity. This class is used
 * in {@link com.web.rest.CommonMessagesResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /commonMessagess?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class CommonMessagesCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter tipoMensaje;

    private StringFilter mensajes;

    public CommonMessagesCriteria() {
    }

    public CommonMessagesCriteria(CommonMessagesCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.tipoMensaje = other.tipoMensaje == null ? null : other.tipoMensaje.copy();
        this.mensajes = other.mensajes == null ? null : other.mensajes.copy();
    }

    @Override
    public CommonMessagesCriteria copy() {
        return new CommonMessagesCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getTipoMensaje() {
        return tipoMensaje;
    }

    public void setTipoMensaje(StringFilter tipoMensaje) {
        this.tipoMensaje = tipoMensaje;
    }

    public StringFilter getMensajes() {
        return mensajes;
    }

    public void setMensajes(StringFilter mensajes) {
        this.mensajes = mensajes;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final CommonMessagesCriteria that = (CommonMessagesCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(tipoMensaje, that.tipoMensaje);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        tipoMensaje
        );
    }

    @Override
    public String toString() {
        return "CommonMessagesCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (tipoMensaje != null ? "tipoMensaje=" + tipoMensaje + ", " : "") +
            "}";
    }

}
