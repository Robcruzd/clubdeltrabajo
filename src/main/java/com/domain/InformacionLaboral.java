package com.domain;

import java.io.Serializable;
import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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

    @Column(name = "fecha_fin", nullable = true)
    private LocalDate fechaFin;

    @NotNull
    @Column(name = "direccion", nullable = false)
    private String direccion;

    @Column(name = "ciudad")
    private Integer ciudad;

    @Column(name = "departamento")
    private Integer departamento;

    @NotNull
    @Column(name = "pais", nullable = false)
    private String pais;

    @NotNull
    @Column(name = "telefono_empresa", nullable = false)
    private String telefonoEmpresa;

    @NotNull
    @Column(name = "dependencia", nullable = false)
    private String dependencia;

    @Column(name = "ciudad_extranjera")
    private String ciudadExtranjera;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("informacionLaborals")
    private Persona usuario;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("informacionLaborals")
    private Cargo cargo;
    
    @Column(name = "nivel_cargo")
    private Integer nivelCargo;
    
    @Column(name = "trabajo_actual")
    private Boolean trabajoActual;
    
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

    public Integer getCiudad() {
        return ciudad;
    }

    public InformacionLaboral ciudad(Integer ciudad) {
        this.ciudad = ciudad;
        return this;
    }

    public void setCiudad(Integer ciudad) {
        this.ciudad = ciudad;
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

    public void setPais(String pais) {
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

    public String getDependencia() {
        return dependencia;
    }

    public InformacionLaboral dependencia(String dependencia) {
        this.dependencia = dependencia;
        return this;
    }

    public void setDependencia(String dependencia) {
        this.dependencia = dependencia;
    }

    public String getCiudadExtranjera() {
        return ciudadExtranjera;
    }

    public InformacionLaboral ciudadExtranjera(String ciudadExtranjera) {
        this.ciudadExtranjera = ciudadExtranjera;
        return this;
    }

    public void setCiudadExtranjera(String ciudadExtranjera) {
        this.ciudadExtranjera = ciudadExtranjera;
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

    public Integer getNivelCargo() {
		return nivelCargo;
	}

	public void setNivelCargo(Integer nivelCargo) {
		this.nivelCargo = nivelCargo;
	}
	
	public Boolean getTrabajoActual() {
		return trabajoActual;
	}

	public void setTrabajoActual(Boolean trabajoActual) {
		this.trabajoActual = trabajoActual;
	}

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
            ", ciudad=" + getCiudad() +
            ", departamento=" + getDepartamento() +
            ", pais='" + getPais() + "'" +
            ", telefonoEmpresa='" + getTelefonoEmpresa() + "'" +
            ", dependencia='" + getDependencia() + "'" +
            ", ciudadExtranjera='" + getCiudadExtranjera() + "'" +
            "}";
    }
}
