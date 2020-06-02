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
import io.github.jhipster.service.filter.LocalDateFilter;

/**
 * Criteria class for the {@link com.domain.InformacionLaboral} entity. This class is used
 * in {@link com.web.rest.InformacionLaboralResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /informacion-laborals?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class InformacionLaboralCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter nombreEmpresa;

    private LocalDateFilter fechaInicio;

    private LocalDateFilter fechaFin;

    private StringFilter direccion;

    private IntegerFilter ciudad;

    private IntegerFilter departamento;

    private StringFilter pais;

    private StringFilter telefonoEmpresa;

    private StringFilter dependencia;

    private StringFilter ciudadExtranjera;

    private LongFilter usuarioId;

    private LongFilter cargoId;

    public InformacionLaboralCriteria() {
    }

    public InformacionLaboralCriteria(InformacionLaboralCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.nombreEmpresa = other.nombreEmpresa == null ? null : other.nombreEmpresa.copy();
        this.fechaInicio = other.fechaInicio == null ? null : other.fechaInicio.copy();
        this.fechaFin = other.fechaFin == null ? null : other.fechaFin.copy();
        this.direccion = other.direccion == null ? null : other.direccion.copy();
        this.ciudad = other.ciudad == null ? null : other.ciudad.copy();
        this.departamento = other.departamento == null ? null : other.departamento.copy();
        this.pais = other.pais == null ? null : other.pais.copy();
        this.telefonoEmpresa = other.telefonoEmpresa == null ? null : other.telefonoEmpresa.copy();
        this.dependencia = other.dependencia == null ? null : other.dependencia.copy();
        this.ciudadExtranjera = other.ciudadExtranjera == null ? null : other.ciudadExtranjera.copy();
        this.usuarioId = other.usuarioId == null ? null : other.usuarioId.copy();
        this.cargoId = other.cargoId == null ? null : other.cargoId.copy();
    }

    @Override
    public InformacionLaboralCriteria copy() {
        return new InformacionLaboralCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getNombreEmpresa() {
        return nombreEmpresa;
    }

    public void setNombreEmpresa(StringFilter nombreEmpresa) {
        this.nombreEmpresa = nombreEmpresa;
    }

    public LocalDateFilter getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(LocalDateFilter fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public LocalDateFilter getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(LocalDateFilter fechaFin) {
        this.fechaFin = fechaFin;
    }

    public StringFilter getDireccion() {
        return direccion;
    }

    public void setDireccion(StringFilter direccion) {
        this.direccion = direccion;
    }

    public IntegerFilter getCiudad() {
        return ciudad;
    }

    public void setCiudad(IntegerFilter ciudad) {
        this.ciudad = ciudad;
    }

    public IntegerFilter getDepartamento() {
        return departamento;
    }

    public void setDepartamento(IntegerFilter departamento) {
        this.departamento = departamento;
    }

    public StringFilter getPais() {
        return pais;
    }

    public void setPais(StringFilter pais) {
        this.pais = pais;
    }

    public StringFilter getTelefonoEmpresa() {
        return telefonoEmpresa;
    }

    public void setTelefonoEmpresa(StringFilter telefonoEmpresa) {
        this.telefonoEmpresa = telefonoEmpresa;
    }

    public StringFilter getDependencia() {
        return dependencia;
    }

    public void setDependencia(StringFilter dependencia) {
        this.dependencia = dependencia;
    }

    public StringFilter getCiudadExtranjera() {
        return ciudadExtranjera;
    }

    public void setCiudadExtranjera(StringFilter ciudadExtranjera) {
        this.ciudadExtranjera = ciudadExtranjera;
    }

    public LongFilter getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(LongFilter usuarioId) {
        this.usuarioId = usuarioId;
    }

    public LongFilter getCargoId() {
        return cargoId;
    }

    public void setCargoId(LongFilter cargoId) {
        this.cargoId = cargoId;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final InformacionLaboralCriteria that = (InformacionLaboralCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(nombreEmpresa, that.nombreEmpresa) &&
            Objects.equals(fechaInicio, that.fechaInicio) &&
            Objects.equals(fechaFin, that.fechaFin) &&
            Objects.equals(direccion, that.direccion) &&
            Objects.equals(ciudad, that.ciudad) &&
            Objects.equals(departamento, that.departamento) &&
            Objects.equals(pais, that.pais) &&
            Objects.equals(telefonoEmpresa, that.telefonoEmpresa) &&
            Objects.equals(dependencia, that.dependencia) &&
            Objects.equals(ciudadExtranjera, that.ciudadExtranjera) &&
            Objects.equals(usuarioId, that.usuarioId) &&
            Objects.equals(cargoId, that.cargoId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        nombreEmpresa,
        fechaInicio,
        fechaFin,
        direccion,
        ciudad,
        departamento,
        pais,
        telefonoEmpresa,
        dependencia,
        ciudadExtranjera,
        usuarioId,
        cargoId
        );
    }

    @Override
    public String toString() {
        return "InformacionLaboralCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (nombreEmpresa != null ? "nombreEmpresa=" + nombreEmpresa + ", " : "") +
                (fechaInicio != null ? "fechaInicio=" + fechaInicio + ", " : "") +
                (fechaFin != null ? "fechaFin=" + fechaFin + ", " : "") +
                (direccion != null ? "direccion=" + direccion + ", " : "") +
                (ciudad != null ? "ciudad=" + ciudad + ", " : "") +
                (departamento != null ? "departamento=" + departamento + ", " : "") +
                (pais != null ? "pais=" + pais + ", " : "") +
                (telefonoEmpresa != null ? "telefonoEmpresa=" + telefonoEmpresa + ", " : "") +
                (dependencia != null ? "dependencia=" + dependencia + ", " : "") +
                (ciudadExtranjera != null ? "ciudadExtranjera=" + ciudadExtranjera + ", " : "") +
                (usuarioId != null ? "usuarioId=" + usuarioId + ", " : "") +
                (cargoId != null ? "cargoId=" + cargoId + ", " : "") +
            "}";
    }

}
