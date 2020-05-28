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
 * Criteria class for the {@link com.domain.InformacionAcademica} entity. This class is used
 * in {@link com.web.rest.InformacionAcademicaResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /informacion-academicas?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class InformacionAcademicaCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private IntegerFilter nivelEstudio;

    private IntegerFilter estado;

    private LocalDateFilter fechaInicio;

    private LocalDateFilter fechaFin;

    private StringFilter tituloOtorgado;

    private LongFilter usuarioId;

    private LongFilter institucionId;

    public InformacionAcademicaCriteria() {
    }

    public InformacionAcademicaCriteria(InformacionAcademicaCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.nivelEstudio = other.nivelEstudio == null ? null : other.nivelEstudio.copy();
        this.estado = other.estado == null ? null : other.estado.copy();
        this.fechaInicio = other.fechaInicio == null ? null : other.fechaInicio.copy();
        this.fechaFin = other.fechaFin == null ? null : other.fechaFin.copy();
        this.tituloOtorgado = other.tituloOtorgado == null ? null : other.tituloOtorgado.copy();
        this.usuarioId = other.usuarioId == null ? null : other.usuarioId.copy();
        this.institucionId = other.institucionId == null ? null : other.institucionId.copy();
    }

    @Override
    public InformacionAcademicaCriteria copy() {
        return new InformacionAcademicaCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public IntegerFilter getNivelEstudio() {
        return nivelEstudio;
    }

    public void setNivelEstudio(IntegerFilter nivelEstudio) {
        this.nivelEstudio = nivelEstudio;
    }

    public IntegerFilter getEstado() {
        return estado;
    }

    public void setEstado(IntegerFilter estado) {
        this.estado = estado;
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

    public StringFilter getTituloOtorgado() {
        return tituloOtorgado;
    }

    public void setTituloOtorgado(StringFilter tituloOtorgado) {
        this.tituloOtorgado = tituloOtorgado;
    }

    public LongFilter getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(LongFilter usuarioId) {
        this.usuarioId = usuarioId;
    }

    public LongFilter getInstitucionId() {
        return institucionId;
    }

    public void setInstitucionId(LongFilter institucionId) {
        this.institucionId = institucionId;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final InformacionAcademicaCriteria that = (InformacionAcademicaCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(nivelEstudio, that.nivelEstudio) &&
            Objects.equals(estado, that.estado) &&
            Objects.equals(fechaInicio, that.fechaInicio) &&
            Objects.equals(fechaFin, that.fechaFin) &&
            Objects.equals(tituloOtorgado, that.tituloOtorgado) &&
            Objects.equals(usuarioId, that.usuarioId) &&
            Objects.equals(institucionId, that.institucionId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        nivelEstudio,
        estado,
        fechaInicio,
        fechaFin,
        tituloOtorgado,
        usuarioId,
        institucionId
        );
    }

    @Override
    public String toString() {
        return "InformacionAcademicaCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (nivelEstudio != null ? "nivelEstudio=" + nivelEstudio + ", " : "") +
                (estado != null ? "estado=" + estado + ", " : "") +
                (fechaInicio != null ? "fechaInicio=" + fechaInicio + ", " : "") +
                (fechaFin != null ? "fechaFin=" + fechaFin + ", " : "") +
                (tituloOtorgado != null ? "tituloOtorgado=" + tituloOtorgado + ", " : "") +
                (usuarioId != null ? "usuarioId=" + usuarioId + ", " : "") +
                (institucionId != null ? "institucionId=" + institucionId + ", " : "") +
            "}";
    }

}
