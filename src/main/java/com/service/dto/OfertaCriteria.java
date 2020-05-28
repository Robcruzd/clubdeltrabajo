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
 * Criteria class for the {@link com.domain.Oferta} entity. This class is used
 * in {@link com.web.rest.OfertaResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /ofertas?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class OfertaCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter descripcion;

    private StringFilter titulo;

    private IntegerFilter salario;

    private IntegerFilter cargo;

    private StringFilter experiencia;

    private IntegerFilter ciudad;

    private IntegerFilter area;

    private LocalDateFilter fechaPublicacion;

    private StringFilter estado;

    private LongFilter usuarioId;

    public OfertaCriteria() {
    }

    public OfertaCriteria(OfertaCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.descripcion = other.descripcion == null ? null : other.descripcion.copy();
        this.titulo = other.titulo == null ? null : other.titulo.copy();
        this.salario = other.salario == null ? null : other.salario.copy();
        this.cargo = other.cargo == null ? null : other.cargo.copy();
        this.experiencia = other.experiencia == null ? null : other.experiencia.copy();
        this.ciudad = other.ciudad == null ? null : other.ciudad.copy();
        this.area = other.area == null ? null : other.area.copy();
        this.fechaPublicacion = other.fechaPublicacion == null ? null : other.fechaPublicacion.copy();
        this.estado = other.estado == null ? null : other.estado.copy();
        this.usuarioId = other.usuarioId == null ? null : other.usuarioId.copy();
    }

    @Override
    public OfertaCriteria copy() {
        return new OfertaCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(StringFilter descripcion) {
        this.descripcion = descripcion;
    }

    public StringFilter getTitulo() {
        return titulo;
    }

    public void setTitulo(StringFilter titulo) {
        this.titulo = titulo;
    }

    public IntegerFilter getSalario() {
        return salario;
    }

    public void setSalario(IntegerFilter salario) {
        this.salario = salario;
    }

    public IntegerFilter getCargo() {
        return cargo;
    }

    public void setCargo(IntegerFilter cargo) {
        this.cargo = cargo;
    }

    public StringFilter getExperiencia() {
        return experiencia;
    }

    public void setExperiencia(StringFilter experiencia) {
        this.experiencia = experiencia;
    }

    public IntegerFilter getCiudad() {
        return ciudad;
    }

    public void setCiudad(IntegerFilter ciudad) {
        this.ciudad = ciudad;
    }

    public IntegerFilter getArea() {
        return area;
    }

    public void setArea(IntegerFilter area) {
        this.area = area;
    }

    public LocalDateFilter getFechaPublicacion() {
        return fechaPublicacion;
    }

    public void setFechaPublicacion(LocalDateFilter fechaPublicacion) {
        this.fechaPublicacion = fechaPublicacion;
    }

    public StringFilter getEstado() {
        return estado;
    }

    public void setEstado(StringFilter estado) {
        this.estado = estado;
    }

    public LongFilter getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(LongFilter usuarioId) {
        this.usuarioId = usuarioId;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final OfertaCriteria that = (OfertaCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(descripcion, that.descripcion) &&
            Objects.equals(titulo, that.titulo) &&
            Objects.equals(salario, that.salario) &&
            Objects.equals(cargo, that.cargo) &&
            Objects.equals(experiencia, that.experiencia) &&
            Objects.equals(ciudad, that.ciudad) &&
            Objects.equals(area, that.area) &&
            Objects.equals(fechaPublicacion, that.fechaPublicacion) &&
            Objects.equals(estado, that.estado) &&
            Objects.equals(usuarioId, that.usuarioId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        descripcion,
        titulo,
        salario,
        cargo,
        experiencia,
        ciudad,
        area,
        fechaPublicacion,
        estado,
        usuarioId
        );
    }

    @Override
    public String toString() {
        return "OfertaCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (descripcion != null ? "descripcion=" + descripcion + ", " : "") +
                (titulo != null ? "titulo=" + titulo + ", " : "") +
                (salario != null ? "salario=" + salario + ", " : "") +
                (cargo != null ? "cargo=" + cargo + ", " : "") +
                (experiencia != null ? "experiencia=" + experiencia + ", " : "") +
                (ciudad != null ? "ciudad=" + ciudad + ", " : "") +
                (area != null ? "area=" + area + ", " : "") +
                (fechaPublicacion != null ? "fechaPublicacion=" + fechaPublicacion + ", " : "") +
                (estado != null ? "estado=" + estado + ", " : "") +
                (usuarioId != null ? "usuarioId=" + usuarioId + ", " : "") +
            "}";
    }

}
