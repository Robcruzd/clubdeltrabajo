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
    private String redesSociales;

    @Column(name = "perfil_profesional")
    private String perfilProfesional;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("informacionPersonals")
    private Persona usuario;
    
    @Column(name = "departamento")
    private Integer departamento;
    
    @Column(name = "tipo_licencia_conduccion")
    private String tipoLicenciaConduccion;
    
    @Column(name = "anio_experiencia")
    private Integer anioExperiencia;
    
    @Column(name = "mes_experiencia")
    private Integer mesExperiencia;
    
    @Column(name = "aspiracion_salarial")
    private Integer aspiracionSalarial;
    
    @Column(name = "mudarme")
    private Boolean mudarme;
    
    @Column(name = "viajar")
    private Boolean viajar;
    
    @Column(name = "pais_permiso_trabajo")
    private String paisPermisoTrabajo;
    
    @Column(name = "estado_civil")
    private Integer estadoCivil;
    
    @Column(name = "nivel_educativo_profesion")
    private Integer nivelEducativoProfesion;
    
    @Column(name = "profesion")
    private String profesion;
    
    @Column(name = "activo_notificaciones")
    private Boolean activoNotificaciones;

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

    public String getRedesSociales() {
        return redesSociales;
    }

    public InformacionPersonal redesSociales(String redesSociales) {
        this.redesSociales = redesSociales;
        return this;
    }

    public void setRedesSociales(String redesSociales) {
        this.redesSociales = redesSociales;
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

    public Integer getDepartamento() {
        return departamento;
    }

    public void setDepartamento(Integer departamento) {
        this.departamento = departamento;
    }
    
    public String getTipoLicenciaConduccion() {
        return tipoLicenciaConduccion;
    }

    public void setTipoLicenciaConduccion(String tipoLicenciaConduccion) {
        this.tipoLicenciaConduccion = tipoLicenciaConduccion;
    }
    
    public Integer getAnioExperiencia() {
		return anioExperiencia;
	}

	public void setAnioExperiencia(Integer anioExperiencia) {
		this.anioExperiencia = anioExperiencia;
	}

	public Integer getMesExperiencia() {
		return mesExperiencia;
	}

	public void setMesExperiencia(Integer mesExperiencia) {
		this.mesExperiencia = mesExperiencia;
	}

	public Integer getAspiracionSalarial() {
		return aspiracionSalarial;
	}

	public void setAspiracionSalarial(Integer aspiracionSalarial) {
		this.aspiracionSalarial = aspiracionSalarial;
	}
	
	public Boolean getMudarme() {
		return mudarme;
	}

	public void setMudarme(Boolean mudarme) {
		this.mudarme = mudarme;
	}

	public Boolean getViajar() {
		return viajar;
	}

	public void setViajar(Boolean viajar) {
		this.viajar = viajar;
	}

	public String getPaisPermisoTrabajo() {
		return paisPermisoTrabajo;
	}

	public void setPaisPermisoTrabajo(String paisPermisoTrabajo) {
		this.paisPermisoTrabajo = paisPermisoTrabajo;
	}

    public Integer getEstadoCivil() {
        return estadoCivil;
    }

    public void setEstadoCivil(Integer estadoCivil) {
        this.estadoCivil = estadoCivil;
    }

    public Integer getNivelEducativoProfesion() {
        return nivelEducativoProfesion;
    }

    public void setNivelEducativoProfesion(Integer nivelEducativoProfesion) {
        this.nivelEducativoProfesion = nivelEducativoProfesion;
    }

    public String getProfesion() {
		return profesion;
	}

	public void setProfesion(String profesion) {
		this.profesion = profesion;
	}

	public Boolean getActivoNotificaciones() {
        return activoNotificaciones;
    }

    public void setActivoNotificaciones(Boolean activoNotificaciones) {
        this.activoNotificaciones = activoNotificaciones;
    }

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
            ", redesSociales='" + getRedesSociales() + "'" +
            ", perfilProfesional='" + getPerfilProfesional() + "'" +
            "}";
    }
}
