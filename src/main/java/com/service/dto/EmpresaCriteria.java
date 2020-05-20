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
 * Criteria class for the {@link com.domain.Empresa} entity. This class is used
 * in {@link com.web.rest.EmpresaResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /empresas?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class EmpresaCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter razonSocial;

    private StringFilter razonComercial;

    private StringFilter email;

    private LongFilter numeroDocumentoId;

    private LongFilter tipoUsuarioId;

    private LongFilter tipoDocumentoId;

    public EmpresaCriteria() {
    }

    public EmpresaCriteria(EmpresaCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.razonSocial = other.razonSocial == null ? null : other.razonSocial.copy();
        this.razonComercial = other.razonComercial == null ? null : other.razonComercial.copy();
        this.email = other.email == null ? null : other.email.copy();
        this.numeroDocumentoId = other.numeroDocumentoId == null ? null : other.numeroDocumentoId.copy();
        this.tipoUsuarioId = other.tipoUsuarioId == null ? null : other.tipoUsuarioId.copy();
        this.tipoDocumentoId = other.tipoDocumentoId == null ? null : other.tipoDocumentoId.copy();
    }

    @Override
    public EmpresaCriteria copy() {
        return new EmpresaCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getRazonSocial() {
        return razonSocial;
    }

    public void setRazonSocial(StringFilter razonSocial) {
        this.razonSocial = razonSocial;
    }

    public StringFilter getRazonComercial() {
        return razonComercial;
    }

    public void setRazonComercial(StringFilter razonComercial) {
        this.razonComercial = razonComercial;
    }

    public StringFilter getEmail() {
        return email;
    }

    public void setEmail(StringFilter email) {
        this.email = email;
    }

    public LongFilter getNumeroDocumentoId() {
        return numeroDocumentoId;
    }

    public void setNumeroDocumentoId(LongFilter numeroDocumentoId) {
        this.numeroDocumentoId = numeroDocumentoId;
    }

    public LongFilter getTipoUsuarioId() {
        return tipoUsuarioId;
    }

    public void setTipoUsuarioId(LongFilter tipoUsuarioId) {
        this.tipoUsuarioId = tipoUsuarioId;
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
        final EmpresaCriteria that = (EmpresaCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(razonSocial, that.razonSocial) &&
            Objects.equals(razonComercial, that.razonComercial) &&
            Objects.equals(email, that.email) &&
            Objects.equals(numeroDocumentoId, that.numeroDocumentoId) &&
            Objects.equals(tipoUsuarioId, that.tipoUsuarioId) &&
            Objects.equals(tipoDocumentoId, that.tipoDocumentoId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        razonSocial,
        razonComercial,
        email,
        numeroDocumentoId,
        tipoUsuarioId,
        tipoDocumentoId
        );
    }

    @Override
    public String toString() {
        return "EmpresaCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (razonSocial != null ? "razonSocial=" + razonSocial + ", " : "") +
                (razonComercial != null ? "razonComercial=" + razonComercial + ", " : "") +
                (email != null ? "email=" + email + ", " : "") +
                (numeroDocumentoId != null ? "numeroDocumentoId=" + numeroDocumentoId + ", " : "") +
                (tipoUsuarioId != null ? "tipoUsuarioId=" + tipoUsuarioId + ", " : "") +
                (tipoDocumentoId != null ? "tipoDocumentoId=" + tipoDocumentoId + ", " : "") +
            "}";
    }

}
