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
 * Criteria class for the {@link com.domain.InformacionPersonal} entity. This class is used
 * in {@link com.web.rest.InformacionPersonalResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /informacion-personals?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class InformacionPersonalCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private LocalDateFilter fechaNacimiento;

    private StringFilter lugarNacimiento;

    private StringFilter direccionResidencia;

    private StringFilter genero;

    private IntegerFilter ciudad;

    private StringFilter telefono;

    private IntegerFilter discapacidad;

    private StringFilter redesSociales;

    private BooleanFilter licencenciaConduccion;

    private StringFilter perfilProfesional;

    private LongFilter usuarioId;

    public InformacionPersonalCriteria() {
    }

    public InformacionPersonalCriteria(InformacionPersonalCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.fechaNacimiento = other.fechaNacimiento == null ? null : other.fechaNacimiento.copy();
        this.lugarNacimiento = other.lugarNacimiento == null ? null : other.lugarNacimiento.copy();
        this.direccionResidencia = other.direccionResidencia == null ? null : other.direccionResidencia.copy();
        this.genero = other.genero == null ? null : other.genero.copy();
        this.ciudad = other.ciudad == null ? null : other.ciudad.copy();
        this.telefono = other.telefono == null ? null : other.telefono.copy();
        this.discapacidad = other.discapacidad == null ? null : other.discapacidad.copy();
        this.redesSociales = other.redesSociales == null ? null : other.redesSociales.copy();
        this.licencenciaConduccion = other.licencenciaConduccion == null ? null : other.licencenciaConduccion.copy();
        this.perfilProfesional = other.perfilProfesional == null ? null : other.perfilProfesional.copy();
        this.usuarioId = other.usuarioId == null ? null : other.usuarioId.copy();
    }

    @Override
    public InformacionPersonalCriteria copy() {
        return new InformacionPersonalCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public LocalDateFilter getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(LocalDateFilter fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public StringFilter getLugarNacimiento() {
        return lugarNacimiento;
    }

    public void setLugarNacimiento(StringFilter lugarNacimiento) {
        this.lugarNacimiento = lugarNacimiento;
    }

    public StringFilter getDireccionResidencia() {
        return direccionResidencia;
    }

    public void setDireccionResidencia(StringFilter direccionResidencia) {
        this.direccionResidencia = direccionResidencia;
    }

    public StringFilter getGenero() {
        return genero;
    }

    public void setGenero(StringFilter genero) {
        this.genero = genero;
    }

    public IntegerFilter getCiudad() {
        return ciudad;
    }

    public void setCiudad(IntegerFilter ciudad) {
        this.ciudad = ciudad;
    }

    public StringFilter getTelefono() {
        return telefono;
    }

    public void setTelefono(StringFilter telefono) {
        this.telefono = telefono;
    }

    public IntegerFilter getDiscapacidad() {
        return discapacidad;
    }

    public void setDiscapacidad(IntegerFilter discapacidad) {
        this.discapacidad = discapacidad;
    }

    public StringFilter getRedesSociales() {
        return redesSociales;
    }

    public void setRedesSociales(StringFilter redesSociales) {
        this.redesSociales = redesSociales;
    }

    public BooleanFilter getLicencenciaConduccion() {
        return licencenciaConduccion;
    }

    public void setLicencenciaConduccion(BooleanFilter licencenciaConduccion) {
        this.licencenciaConduccion = licencenciaConduccion;
    }

    public StringFilter getPerfilProfesional() {
        return perfilProfesional;
    }

    public void setPerfilProfesional(StringFilter perfilProfesional) {
        this.perfilProfesional = perfilProfesional;
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
        final InformacionPersonalCriteria that = (InformacionPersonalCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(fechaNacimiento, that.fechaNacimiento) &&
            Objects.equals(lugarNacimiento, that.lugarNacimiento) &&
            Objects.equals(direccionResidencia, that.direccionResidencia) &&
            Objects.equals(genero, that.genero) &&
            Objects.equals(ciudad, that.ciudad) &&
            Objects.equals(telefono, that.telefono) &&
            Objects.equals(discapacidad, that.discapacidad) &&
            Objects.equals(redesSociales, that.redesSociales) &&
            Objects.equals(licencenciaConduccion, that.licencenciaConduccion) &&
            Objects.equals(perfilProfesional, that.perfilProfesional) &&
            Objects.equals(usuarioId, that.usuarioId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        fechaNacimiento,
        lugarNacimiento,
        direccionResidencia,
        genero,
        ciudad,
        telefono,
        discapacidad,
        redesSociales,
        licencenciaConduccion,
        perfilProfesional,
        usuarioId
        );
    }

    @Override
    public String toString() {
        return "InformacionPersonalCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (fechaNacimiento != null ? "fechaNacimiento=" + fechaNacimiento + ", " : "") +
                (lugarNacimiento != null ? "lugarNacimiento=" + lugarNacimiento + ", " : "") +
                (direccionResidencia != null ? "direccionResidencia=" + direccionResidencia + ", " : "") +
                (genero != null ? "genero=" + genero + ", " : "") +
                (ciudad != null ? "ciudad=" + ciudad + ", " : "") +
                (telefono != null ? "telefono=" + telefono + ", " : "") +
                (discapacidad != null ? "discapacidad=" + discapacidad + ", " : "") +
                (redesSociales != null ? "redesSociales=" + redesSociales + ", " : "") +
                (licencenciaConduccion != null ? "licencenciaConduccion=" + licencenciaConduccion + ", " : "") +
                (perfilProfesional != null ? "perfilProfesional=" + perfilProfesional + ", " : "") +
                (usuarioId != null ? "usuarioId=" + usuarioId + ", " : "") +
            "}";
    }

}
