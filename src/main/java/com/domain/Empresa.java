package com.domain;

import java.io.Serializable;

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
 * A Empresa.
 */
@Entity
@Table(name = "ct_empresa_tb")
public class Empresa implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "razon_social", nullable = false)
    private String razonSocial;

    @NotNull
    @Column(name = "razon_comercial", nullable = false)
    private String razonComercial;

    @NotNull
    @Column(name = "email_representante", nullable = false)
    private String email;

    @NotNull
    @Column(name = "numero_documento", nullable = false)
    private String numeroDocumento;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("empresas")
    private TipoUsuario tipoUsuario;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("empresas")
    private TipoDocumento tipoDocumento;
    
    @Column(name = "direccion", nullable = true)
    private String direccion;
    
    @Column(name = "telefono_empresa", nullable = true)
    private Long telefonoEmpresa;
    
    @Column(name = "ciudad", nullable = true)
    private String ciudad;
    
    @Column(name = "sector", nullable = true)
    private String sector;

    @Column(name = "subsector", nullable = true)
    private String subsector;

    @Column(name = "pagina_web", nullable = true)
    private String paginaWeb;
    
    @Column(name = "cantidad_empleados", nullable = true)
    private String cantidadEmpleados;

    @Column(name = "descripcion_empresa", nullable = true)
    private String descripcionEmpresa;

    @Column(name = "nombre_representante_legal", nullable = true)
    private String nombreRepresentanteLegal;

    @Column(name = "apellidos_representante_legal", nullable = true)
    private String apellidosRepresentanteLegal;

    @Column(name = "telefono", nullable = true)
    private Long telefono;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRazonSocial() {
        return razonSocial;
    }

    public Empresa razonSocial(String razonSocial) {
        this.razonSocial = razonSocial;
        return this;
    }

    public void setRazonSocial(String razonSocial) {
        this.razonSocial = razonSocial;
    }

    public String getRazonComercial() {
        return razonComercial;
    }

    public Empresa razonComercial(String razonComercial) {
        this.razonComercial = razonComercial;
        return this;
    }

    public void setRazonComercial(String razonComercial) {
        this.razonComercial = razonComercial;
    }

    public String getEmail() {
        return email;
    }

    public Empresa email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNumeroDocumento() {
        return numeroDocumento;
    }

    public Empresa numeroDocumento(String numeroDocumento) {
        this.numeroDocumento = numeroDocumento;
        return this;
    }

    public void setNumeroDocumento(String numeroDocumento) {
        this.numeroDocumento = numeroDocumento;
    }

    public TipoUsuario getTipoUsuario() {
        return tipoUsuario;
    }

    public Empresa tipoUsuario(TipoUsuario tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
        return this;
    }

    public void setTipoUsuario(TipoUsuario tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }

    public TipoDocumento getTipoDocumento() {
        return tipoDocumento;
    }

    public Empresa tipoDocumento(TipoDocumento tipoDocumento) {
        this.tipoDocumento = tipoDocumento;
        return this;
    }

    public void setTipoDocumento(TipoDocumento tipoDocumento) {
        this.tipoDocumento = tipoDocumento;
    }
    
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    public String getDireccion() {
		return direccion;
	}

	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}

	public Long getTelefonoEmpresa() {
		return telefonoEmpresa;
	}

	public void setTelefonoEmpresa(Long telefonoEmpresa) {
		this.telefonoEmpresa = telefonoEmpresa;
	}

	public String getCiudad() {
		return ciudad;
	}

	public void setCiudad(String ciudad) {
		this.ciudad = ciudad;
	}

    public String getSector() {
		return sector;
	}

	public void setSector(String sector) {
		this.sector = sector;
	}

    public String getSubsector() {
		return subsector;
	}

	public void setSubsector(String subsector) {
		this.subsector = subsector;
	}

    public String getPaginaWeb() {
		return paginaWeb;
	}

	public void setPaginaWeb(String paginaWeb) {
		this.paginaWeb = paginaWeb;
	}

    public String getCantidadEmpleados() {
		return cantidadEmpleados;
	}

	public void setCantidadEmpleados(String cantidadEmpleados) {
		this.cantidadEmpleados = cantidadEmpleados;
	}

    public String getDescripcionEmpresa() {
		return descripcionEmpresa;
	}

	public void setDescripcionEmpresa(String descripcionEmpresa) {
		this.descripcionEmpresa = descripcionEmpresa;
	}

    public String getNombreRepresentanteLegal() {
		return nombreRepresentanteLegal;
	}

	public void setNombreRepresentanteLegal(String nombreRepresentanteLegal) {
		this.nombreRepresentanteLegal = nombreRepresentanteLegal;
	}

    public String getApellidosRepresentanteLegal() {
		return apellidosRepresentanteLegal;
	}

	public void setApellidosRepresentanteLegal(String apellidosRepresentanteLegal) {
		this.apellidosRepresentanteLegal = apellidosRepresentanteLegal;
	}

    public Long getTelefono() {
		return telefono;
	}

    public void setTelefono(Long telefono) {
		this.telefono = telefono;
	}

	@Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Empresa)) {
            return false;
        }
        return id != null && id.equals(((Empresa) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Empresa{" +
            "id=" + getId() +
            ", razonSocial='" + getRazonSocial() + "'" +
            ", razonComercial='" + getRazonComercial() + "'" +
            ", email='" + getEmail() + "'" +
            ", numeroDocumento='" + getNumeroDocumento() + "'" +
            "}";
    }
}
