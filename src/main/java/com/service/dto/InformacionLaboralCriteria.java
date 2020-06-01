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

    private IntegerFilter cuidad;

    private IntegerFilter departamento;

    private StringFilter pais;

    private StringFilter telefonoEmpresa;

    private LongFilter usuarioId;

    private LongFilter dependenciaId;

    private LongFilter cargoId;

    public InformacionLaboralCriteria() {
    }

    public InformacionLaboralCriteria(InformacionLaboralCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.nombreEmpresa = other.nombreEmpresa == null ? null : other.nombreEmpresa.copy();
        this.fechaInicio = other.fechaInicio == null ? null : other.fechaInicio.copy();
        this.fechaFin = other.fechaFin == null ? null : other.fechaFin.copy();
        this.direccion = other.direccion == null ? null : other.direccion.copy();
        this.cuidad = other.cuidad == null ? null : other.cuidad.copy();
        this.departamento = other.departamento == null ? null : other.departamento.copy();
        this.pais = other.pais == null ? null : other.pais.copy();
        this.telefonoEmpresa = other.telefonoEmpresa == null ? null : other.telefonoEmpresa.copy();
        this.usuarioId = other.usuarioId == null ? null : other.usuarioId.copy();
        this.dependenciaId = other.dependenciaId == null ? null : other.dependenciaId.copy();
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

    public IntegerFilter getCuidad() {
        return cuidad;
    }

    public void setCuidad(IntegerFilter cuidad) {
        this.cuidad = cuidad;
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

    public LongFilter getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(LongFilter usuarioId) {
        this.usuarioId = usuarioId;
    }

    public LongFilter getDependenciaId() {
        return dependenciaId;
    }

    public void setDependenciaId(LongFilter dependenciaId) {
        this.dependenciaId = dependenciaId;
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
            Objects.equals(cuidad, that.cuidad) &&
            Objects.equals(departamento, that.departamento) &&
            Objects.equals(pais, that.pais) &&
            Objects.equals(telefonoEmpresa, that.telefonoEmpresa) &&
            Objects.equals(usuarioId, that.usuarioId) &&
            Objects.equals(dependenciaId, that.dependenciaId) &&
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
        cuidad,
        departamento,
        pais,
        telefonoEmpresa,
        usuarioId,
        dependenciaId,
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
                (cuidad != null ? "cuidad=" + cuidad + ", " : "") +
                (departamento != null ? "departamento=" + departamento + ", " : "") +
                (pais != null ? "pais=" + pais + ", " : "") +
                (telefonoEmpresa != null ? "telefonoEmpresa=" + telefonoEmpresa + ", " : "") +
                (usuarioId != null ? "usuarioId=" + usuarioId + ", " : "") +
                (dependenciaId != null ? "dependenciaId=" + dependenciaId + ", " : "") +
                (cargoId != null ? "cargoId=" + cargoId + ", " : "") +
            "}";
    }

}
