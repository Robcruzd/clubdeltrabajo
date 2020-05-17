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
 * Criteria class for the {@link com.domain.Persona} entity. This class is used
 * in {@link com.web.rest.PersonaResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /personas?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class PersonaCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter nombre;

    private StringFilter apellido;

    private StringFilter email;

    private LongFilter tipoUsuarioId;

    private LongFilter numeroDocumentoId;

    private LongFilter tipoDocumentoId;

    public PersonaCriteria() {
    }

    public PersonaCriteria(PersonaCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.nombre = other.nombre == null ? null : other.nombre.copy();
        this.apellido = other.apellido == null ? null : other.apellido.copy();
        this.email = other.email == null ? null : other.email.copy();
        this.tipoUsuarioId = other.tipoUsuarioId == null ? null : other.tipoUsuarioId.copy();
        this.numeroDocumentoId = other.numeroDocumentoId == null ? null : other.numeroDocumentoId.copy();
        this.tipoDocumentoId = other.tipoDocumentoId == null ? null : other.tipoDocumentoId.copy();
    }

    @Override
    public PersonaCriteria copy() {
        return new PersonaCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getNombre() {
        return nombre;
    }

    public void setNombre(StringFilter nombre) {
        this.nombre = nombre;
    }

    public StringFilter getApellido() {
        return apellido;
    }

    public void setApellido(StringFilter apellido) {
        this.apellido = apellido;
    }

    public StringFilter getEmail() {
        return email;
    }

    public void setEmail(StringFilter email) {
        this.email = email;
    }

    public LongFilter getTipoUsuarioId() {
        return tipoUsuarioId;
    }

    public void setTipoUsuarioId(LongFilter tipoUsuarioId) {
        this.tipoUsuarioId = tipoUsuarioId;
    }

    public LongFilter getNumeroDocumentoId() {
        return numeroDocumentoId;
    }

    public void setNumeroDocumentoId(LongFilter numeroDocumentoId) {
        this.numeroDocumentoId = numeroDocumentoId;
    }

    public LongFilter getTipoDocumentoId() {
        return tipoDocumentoId;
    }

    public void setTipoDocumentoId(LongFilter tipoDocumentoId) {
        this.tipoDocumentoId = tipoDocumentoId;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final PersonaCriteria that = (PersonaCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(nombre, that.nombre) &&
            Objects.equals(apellido, that.apellido) &&
            Objects.equals(email, that.email) &&
            Objects.equals(tipoUsuarioId, that.tipoUsuarioId) &&
            Objects.equals(numeroDocumentoId, that.numeroDocumentoId) &&
            Objects.equals(tipoDocumentoId, that.tipoDocumentoId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        nombre,
        apellido,
        email,
        tipoUsuarioId,
        numeroDocumentoId,
        tipoDocumentoId
        );
    }

    @Override
    public String toString() {
        return "PersonaCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (nombre != null ? "nombre=" + nombre + ", " : "") +
                (apellido != null ? "apellido=" + apellido + ", " : "") +
                (email != null ? "email=" + email + ", " : "") +
                (tipoUsuarioId != null ? "tipoUsuarioId=" + tipoUsuarioId + ", " : "") +
                (numeroDocumentoId != null ? "numeroDocumentoId=" + numeroDocumentoId + ", " : "") +
                (tipoDocumentoId != null ? "tipoDocumentoId=" + tipoDocumentoId + ", " : "") +
            "}";
    }

}
