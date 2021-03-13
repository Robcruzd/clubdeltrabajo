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

    private StringFilter numeroDocumento;

    private LongFilter tipoUsuarioId;

    private LongFilter tipoDocumentoId;

    private StringFilter direccion;

    private LongFilter telefonoEmpresa;

    private LongFilter ciudad;

    private StringFilter sector;

    private StringFilter subsector;

    private StringFilter paginaWeb;

    private StringFilter cantidadEmpleados;

    private StringFilter descripcionEmpresa;

    private StringFilter nombreRepresentanteLegal;

    private StringFilter apellidosRepresentanteLegal;

    private LongFilter telefono;

    public EmpresaCriteria() {
    }

    public EmpresaCriteria(EmpresaCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.razonSocial = other.razonSocial == null ? null : other.razonSocial.copy();
        this.razonComercial = other.razonComercial == null ? null : other.razonComercial.copy();
        this.email = other.email == null ? null : other.email.copy();
        this.numeroDocumento = other.numeroDocumento == null ? null : other.numeroDocumento.copy();
        this.tipoUsuarioId = other.tipoUsuarioId == null ? null : other.tipoUsuarioId.copy();
        this.tipoDocumentoId = other.tipoDocumentoId == null ? null : other.tipoDocumentoId.copy();
        this.direccion = other.direccion == null ? null : other.direccion.copy();
        this.telefonoEmpresa = other.telefonoEmpresa == null ? null : other.telefonoEmpresa.copy();
        this.ciudad = other.ciudad == null ? null : other.ciudad.copy();
        this.sector = other.sector == null ? null : other.sector.copy();
        this.subsector = other.subsector == null ? null : other.subsector.copy();
        this.paginaWeb = other.paginaWeb == null ? null : other.paginaWeb.copy();
        this.cantidadEmpleados = other.cantidadEmpleados == null ? null : other.cantidadEmpleados.copy();
        this.descripcionEmpresa = other.descripcionEmpresa == null ? null : other.descripcionEmpresa.copy();
        this.nombreRepresentanteLegal = other.nombreRepresentanteLegal == null ? null : other.nombreRepresentanteLegal.copy();
        this.apellidosRepresentanteLegal = other.apellidosRepresentanteLegal == null ? null : other.apellidosRepresentanteLegal.copy();
        this.telefono = other.telefono == null ? null : other.telefono.copy();
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

    public StringFilter getNumeroDocumento() {
        return numeroDocumento;
    }

    public void setNumeroDocumento(StringFilter numeroDocumento) {
        this.numeroDocumento = numeroDocumento;
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

    public StringFilter getDireccion() {
        return direccion;
    }

    public void setDireccion(StringFilter direccion) {
        this.direccion = direccion;
    }

    public LongFilter getTelefonoEmpresa() {
        return telefonoEmpresa;
    }

    public void setTelefonoEmpresa(LongFilter telefonoEmpresa) {
        this.telefonoEmpresa = telefonoEmpresa;
    }

    public LongFilter getCiudad() {
        return ciudad;
    }

    public void setCiudad(LongFilter ciudad) {
        this.ciudad = ciudad;
    }

    public StringFilter getSector() {
        return sector;
    }

    public void setSector(StringFilter sector) {
        this.sector = sector;
    }

    public StringFilter getSubsector() {
        return subsector;
    }

    public void setSubsector(StringFilter subsector) {
        this.subsector = subsector;
    }

    public StringFilter getPaginaWeb() {
        return paginaWeb;
    }

    public void setPaginaWeb(StringFilter paginaWeb) {
        this.paginaWeb = paginaWeb;
    }

    public StringFilter cantidadEmpleados() {
        return cantidadEmpleados;
    }

    public void setCantidadEmpleados(StringFilter cantidadEmpleados) {
        this.cantidadEmpleados = cantidadEmpleados;
    }

    public StringFilter getDescripcionEmpresa() {
        return descripcionEmpresa;
    }

    public void setDescripcionEmpresa(StringFilter descripcionEmpresa) {
        this.descripcionEmpresa = descripcionEmpresa;
    }

    public StringFilter getNombreRepresentanteLegal() {
        return nombreRepresentanteLegal;
    }

    public void setNombreRepresentanteLegal(StringFilter nombreRepresentanteLegal) {
        this.nombreRepresentanteLegal = nombreRepresentanteLegal;
    }

    public StringFilter getApellidosRepresentanteLegal() {
        return apellidosRepresentanteLegal;
    }

    public void setApellidosRepresentanteLegal(StringFilter apellidosRepresentanteLegal) {
        this.apellidosRepresentanteLegal = apellidosRepresentanteLegal;
    }

    public LongFilter getTelefono() {
        return telefono;
    }

    public void setTelefono(LongFilter telefono) {
        this.telefono = telefono;
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
            Objects.equals(numeroDocumento, that.numeroDocumento) &&
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
        numeroDocumento,
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
                (numeroDocumento != null ? "numeroDocumento=" + numeroDocumento + ", " : "") +
                (tipoUsuarioId != null ? "tipoUsuarioId=" + tipoUsuarioId + ", " : "") +
                (tipoDocumentoId != null ? "tipoDocumentoId=" + tipoDocumentoId + ", " : "") +
            "}";
    }

}
