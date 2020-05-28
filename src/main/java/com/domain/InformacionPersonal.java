package com.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.LocalDate;

/**
 * A InformacionPersonal.
 */
@Entity
@Table(name = "ct_informacion_personal_tb")
public class InformacionPersonal implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "fecha_nacimiento", nullable = false)
    private LocalDate fechaNacimiento;

    @NotNull
    @Column(name = "lugar_nacimiento", nullable = false)
    private String lugarNacimiento;

    @NotNull
    @Column(name = "direccion_residencia", nullable = false)
    private String direccionResidencia;

    @NotNull
    @Column(name = "genero", nullable = false)
    private String genero;

    @NotNull
    @Column(name = "ciudad", nullable = false)
    private Integer ciudad;

    @NotNull
    @Column(name = "telefono", nullable = false)
    private String telefono;

    @Column(name = "discapacidad")
    private Integer discapacidad;

    @Column(name = "redes_sociales")
    private Integer redesSociales;

    @Column(name = "licencencia_conduccion")
    private Boolean licencenciaConduccion;

    @Column(name = "perfil_profesional")
    private String perfilProfesional;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("informacionPersonals")
    private Persona usuario;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    public InformacionPersonal fechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
        return this;
    }

    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public String getLugarNacimiento() {
        return lugarNacimiento;
    }

    public InformacionPersonal lugarNacimiento(String lugarNacimiento) {
        this.lugarNacimiento = lugarNacimiento;
        return this;
    }

    public void setLugarNacimiento(String lugarNacimiento) {
        this.lugarNacimiento = lugarNacimiento;
    }

    public String getDireccionResidencia() {
        return direccionResidencia;
    }

    public InformacionPersonal direccionResidencia(String direccionResidencia) {
        this.direccionResidencia = direccionResidencia;
        return this;
    }

    public void setDireccionResidencia(String direccionResidencia) {
        this.direccionResidencia = direccionResidencia;
    }

    public String getGenero() {
        return genero;
    }

    public InformacionPersonal genero(String genero) {
        this.genero = genero;
        return this;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public Integer getCiudad() {
        return ciudad;
    }

    public InformacionPersonal ciudad(Integer ciudad) {
        this.ciudad = ciudad;
        return this;
    }

    public void setCiudad(Integer ciudad) {
        this.ciudad = ciudad;
    }

    public String getTelefono() {
        return telefono;
    }

    public InformacionPersonal telefono(String telefono) {
        this.telefono = telefono;
        return this;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public Integer getDiscapacidad() {
        return discapacidad;
    }

    public InformacionPersonal discapacidad(Integer discapacidad) {
        this.discapacidad = discapacidad;
        return this;
    }

    public void setDiscapacidad(Integer discapacidad) {
        this.discapacidad = discapacidad;
    }

    public Integer getRedesSociales() {
        return redesSociales;
    }

    public InformacionPersonal redesSociales(Integer redesSociales) {
        this.redesSociales = redesSociales;
        return this;
    }

    public void setRedesSociales(Integer redesSociales) {
        this.redesSociales = redesSociales;
    }

    public Boolean isLicencenciaConduccion() {
        return licencenciaConduccion;
    }

    public InformacionPersonal licencenciaConduccion(Boolean licencenciaConduccion) {
        this.licencenciaConduccion = licencenciaConduccion;
        return this;
    }

    public void setLicencenciaConduccion(Boolean licencenciaConduccion) {
        this.licencenciaConduccion = licencenciaConduccion;
    }

    public String getPerfilProfesional() {
        return perfilProfesional;
    }

    public InformacionPersonal perfilProfesional(String perfilProfesional) {
        this.perfilProfesional = perfilProfesional;
        return this;
    }

    public void setPerfilProfesional(String perfilProfesional) {
        this.perfilProfesional = perfilProfesional;
    }

    public Persona getUsuario() {
        return usuario;
    }

    public InformacionPersonal usuario(Persona persona) {
        this.usuario = persona;
        return this;
    }

    public void setUsuario(Persona persona) {
        this.usuario = persona;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof InformacionPersonal)) {
            return false;
        }
        return id != null && id.equals(((InformacionPersonal) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "InformacionPersonal{" +
            "id=" + getId() +
            ", fechaNacimiento='" + getFechaNacimiento() + "'" +
            ", lugarNacimiento='" + getLugarNacimiento() + "'" +
            ", direccionResidencia='" + getDireccionResidencia() + "'" +
            ", genero='" + getGenero() + "'" +
            ", ciudad=" + getCiudad() +
            ", telefono='" + getTelefono() + "'" +
            ", discapacidad=" + getDiscapacidad() +
            ", redesSociales=" + getRedesSociales() +
            ", licencenciaConduccion='" + isLicencenciaConduccion() + "'" +
            ", perfilProfesional='" + getPerfilProfesional() + "'" +
            "}";
    }
}
