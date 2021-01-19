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
 * Criteria class for the {@link com.domain.Regiones} entity. This class is used
 * in {@link com.web.rest.RegionesResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /cargos?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class RegionesCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter region;

    private IntegerFilter codigoDaneDelDepartamento;

    private StringFilter departamento;

    private IntegerFilter codigoDaneDelMunicipio;

    private StringFilter municipio;

    public RegionesCriteria() {
    }

    public RegionesCriteria(RegionesCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.region = other.region == null ? null : other.region.copy();
        this.codigoDaneDelDepartamento = other.codigoDaneDelDepartamento == null ? null : other.codigoDaneDelDepartamento.copy();
        this.departamento = other.departamento == null ? null : other.departamento.copy();
        this.codigoDaneDelMunicipio = other.codigoDaneDelMunicipio == null ? null : other.codigoDaneDelMunicipio.copy();
        this.municipio = other.municipio == null ? null : other.municipio.copy();
    }

    @Override
    public RegionesCriteria copy() {
        return new RegionesCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getRegion() {
        return region;
    }

    public void setRegion(StringFilter region) {
        this.region = region;
    }

    public IntegerFilter getCodigoDaneDelDepartamento() {
        return codigoDaneDelDepartamento;
    }

    public void setCodigoDaneDelDepartamento(IntegerFilter codigoDaneDelDepartamento) {
        this.codigoDaneDelDepartamento = codigoDaneDelDepartamento;
    }

    public StringFilter getDepartamento() {
        return departamento;
    }

    public void setDepartamento(StringFilter departamento) {
        this.departamento = departamento;
    }

    public IntegerFilter getCodigoDaneDelMunicipio() {
        return codigoDaneDelMunicipio;
    }

    public void setCodigoDaneDelMunicipio(IntegerFilter codigoDaneDelMunicipio) {
        this.codigoDaneDelMunicipio = codigoDaneDelMunicipio;
    }

    public StringFilter getMunicipio() {
        return municipio;
    }

    public void setMunicipio(StringFilter municipio) {
        this.municipio = municipio;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final RegionesCriteria that = (RegionesCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(region, that.region) &&
            Objects.equals(codigoDaneDelDepartamento, that.codigoDaneDelDepartamento) &&
            Objects.equals(departamento, that.departamento) &&
            Objects.equals(codigoDaneDelMunicipio, that.codigoDaneDelMunicipio) &&
            Objects.equals(municipio, that.municipio);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        region,
        codigoDaneDelDepartamento,
        departamento,
        codigoDaneDelMunicipio,
        municipio
        );
    }

    @Override
    public String toString() {
        return "RegionesCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (region != null ? "region=" + region + ", " : "") +
                (codigoDaneDelDepartamento != null ? "codigoDaneDelDepartamento=" + codigoDaneDelDepartamento + ", " : "") +
                (departamento != null ? "departamento=" + departamento + ", " : "") +
                (codigoDaneDelMunicipio != null ? "codigoDaneDelMunicipio=" + codigoDaneDelMunicipio + ", " : "") +
                (municipio != null ? "municipio=" + municipio + ", " : "") +
            "}";
    }

}
