package com.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.LocalDate;

/**
 * A InformacionLaboral.
 */
@Entity
@Table(name = "ct_informacon_laboral_tb")
public class InformacionLaboral implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "nombre_empresa", nullable = false)
    private String nombreEmpresa;

    @NotNull
    @Column(name = "fecha_inicio", nullable = false)
    private LocalDate fechaInicio;

    @NotNull
    @Column(name = "fecha_fin", nullable = false)
    private LocalDate fechaFin;

    @NotNull
    @Column(name = "direccion", nullable = false)
    private String direccion;

    @NotNull
    @Column(name = "cuidad", nullable = false)
    private Integer cuidad;

    @NotNull
    @Column(name = "departamento", nullable = false)
    private Integer departamento;

    @NotNull
    @Column(name = "pais", nullable = false)
    private String pais;

    @NotNull
    @Column(name = "telefono_empresa", nullable = false)
    private String telefonoEmpresa;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("informacionLaborals")
    private Persona usuario;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("informacionLaborals")
    private Dependencia dependencia;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("informacionLaborals")
    private Cargo cargo;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreEmpresa() {
        return nombreEmpresa;
    }

    public InformacionLaboral nombreEmpresa(String nombreEmpresa) {
        this.nombreEmpresa = nombreEmpresa;
        return this;
    }

    public void setNombreEmpresa(String nombreEmpresa) {
        this.nombreEmpresa = nombreEmpresa;
    }

    public LocalDate getFechaInicio() {
        return fechaInicio;
    }

    public InformacionLaboral fechaInicio(LocalDate fechaInicio) {
        this.fechaInicio = fechaInicio;
        return this;
    }

    public void setFechaInicio(LocalDate fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public LocalDate getFechaFin() {
        return fechaFin;
    }

    public InformacionLaboral fechaFin(LocalDate fechaFin) {
        this.fechaFin = fechaFin;
        return this;
    }

    public void setFechaFin(LocalDate fechaFin) {
        this.fechaFin = fechaFin;
    }

    public String getDireccion() {
        return direccion;
    }

    public InformacionLaboral direccion(String direccion) {
        this.direccion = direccion;
        return this;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public Integer getCuidad() {
        return cuidad;
    }

    public InformacionLaboral cuidad(Integer cuidad) {
        this.cuidad = cuidad;
        return this;
    }

    public void setCuidad(Integer cuidad) {
        this.cuidad = cuidad;
    }

    public Integer getDepartamento() {
        return departamento;
    }

    public InformacionLaboral departamento(Integer departamento) {
        this.departamento = departamento;
        return this;
    }

    public void setDepartamento(Integer departamento) {
        this.departamento = departamento;
    }

    public String getPais() {
        return pais;
    }

    public InformacionLaboral pais(String pais) {
        this.pais = pais;
        return this;
    }

    public void setPais(Integer pais) {
        this.pais = pais;
    }

    public String getTelefonoEmpresa() {
        return telefonoEmpresa;
    }

    public InformacionLaboral telefonoEmpresa(String telefonoEmpresa) {
        this.telefonoEmpresa = telefonoEmpresa;
        return this;
    }

    public void setTelefonoEmpresa(String telefonoEmpresa) {
        this.telefonoEmpresa = telefonoEmpresa;
    }

    public Persona getUsuario() {
        return usuario;
    }

    public InformacionLaboral usuario(Persona persona) {
        this.usuario = persona;
        return this;
    }

    public void setUsuario(Persona persona) {
        this.usuario = persona;
    }

    public Dependencia getDependencia() {
        return dependencia;
    }

    public InformacionLaboral dependencia(Dependencia dependencia) {
        this.dependencia = dependencia;
        return this;
    }

    public void setDependencia(Dependencia dependencia) {
        this.dependencia = dependencia;
    }

    public Cargo getCargo() {
        return cargo;
    }

    public InformacionLaboral cargo(Cargo cargo) {
        this.cargo = cargo;
        return this;
    }

    public void setCargo(Cargo cargo) {
        this.cargo = cargo;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof InformacionLaboral)) {
            return false;
        }
        return id != null && id.equals(((InformacionLaboral) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "InformacionLaboral{" +
            "id=" + getId() +
            ", nombreEmpresa='" + getNombreEmpresa() + "'" +
            ", fechaInicio='" + getFechaInicio() + "'" +
            ", fechaFin='" + getFechaFin() + "'" +
            ", direccion='" + getDireccion() + "'" +
            ", cuidad=" + getCuidad() +
            ", departamento=" + getDepartamento() +
            ", pais=" + getPais() +
            ", telefonoEmpresa='" + getTelefonoEmpresa() + "'" +
            "}";
    }
}
