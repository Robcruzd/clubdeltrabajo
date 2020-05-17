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
 * Criteria class for the {@link com.domain.Usuario} entity. This class is used
 * in {@link com.web.rest.UsuarioResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /usuarios?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class UsuarioCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private IntegerFilter usuario;

    private StringFilter clave;

    private StringFilter estado;

    public UsuarioCriteria() {
    }

    public UsuarioCriteria(UsuarioCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.usuario = other.usuario == null ? null : other.usuario.copy();
        this.clave = other.clave == null ? null : other.clave.copy();
        this.estado = other.estado == null ? null : other.estado.copy();
    }

    @Override
    public UsuarioCriteria copy() {
        return new UsuarioCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public IntegerFilter getUsuario() {
        return usuario;
    }

    public void setUsuario(IntegerFilter usuario) {
        this.usuario = usuario;
    }

    public StringFilter getClave() {
        return clave;
    }

    public void setClave(StringFilter clave) {
        this.clave = clave;
    }

    public StringFilter getEstado() {
        return estado;
    }

    public void setEstado(StringFilter estado) {
        this.estado = estado;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final UsuarioCriteria that = (UsuarioCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(usuario, that.usuario) &&
            Objects.equals(clave, that.clave) &&
            Objects.equals(estado, that.estado);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        usuario,
        clave,
        estado
        );
    }

    @Override
    public String toString() {
        return "UsuarioCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (usuario != null ? "usuario=" + usuario + ", " : "") +
                (clave != null ? "clave=" + clave + ", " : "") +
                (estado != null ? "estado=" + estado + ", " : "") +
            "}";
    }

}
