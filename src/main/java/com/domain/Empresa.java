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
    private Long ciudad;
    
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

    @Column(name = "mision", nullable = true)
    private String misionEmpresa;

    @Column(name = "vision", nullable = true)
    private String visionEmpresa;

    @Column(name = "catalogo", nullable = true)
    private String catalogo;

    @Column(name = "nombre_representante_legal", nullable = true)
    private String nombreRepresentanteLegal;

    @Column(name = "apellidos_representante_legal", nullable = true)
    private String apellidosRepresentanteLegal;

    @Column(name = "telefono", nullable = true)
    private Long telefono;
    
    @Column(name = "descargas_hv", nullable = true)
    private Long descargasHv;
    
    @Column(name = "publicaciones_oferta", nullable = true)
    private Long publicacionesOferta;
    
    //@Transient
    @Column(name = "numero", nullable = true)
    private Long numero;
    
    @Column(name = "pais", nullable = true)
    private String pais;
    
    @Column(name = "codigoPostal", nullable = true)
    private String codigoPostal;
    
    @Column(name = "link", nullable = true)
    private String link;
    
    @Column(name = "visualizaciones_hv", nullable = true)
    private Long visualizacionesHv;
    
    @Column(name = "membresia", nullable = true)
    private Boolean membresia;
    
    @Column(name = "replicas_oferta", nullable = true)
    private Long replicasOferta;

    @Column(name = "juridica", nullable = true)
    private Boolean juridica;
     
    @Column(name = "club_empresa", nullable = true)
    private Boolean clubEmpresa;
    
    @Column(name = "url_facebook", nullable = true)
    private String urlFacebook;
    
    @Column(name = "url_instagram", nullable = true)
    private String urlInstagram;
    
    @Column(name = "url_linkedin", nullable = true)
    private String urlLinkedIn;
    
    @Column(name = "bd_empresa", nullable = true)
    private Boolean bdEmpresa;
    
    @Column(name = "oferta_vip", nullable = true)
    private Long ofertaVip;
    

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

	public Long getCiudad() {
		return ciudad;
	}

	public void setCiudad(Long ciudad) {
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

    public String getMisionEmpresa() {
		return misionEmpresa;
	}

	public void setMisionEmpresa(String misionEmpresa) {
		this.misionEmpresa = misionEmpresa;
	}

    public String getVisionEmpresa() {
		return visionEmpresa;
	}

	public void setVisionEmpresa(String visionEmpresa) {
		this.visionEmpresa = visionEmpresa;
	}

    public String getCatalogo() {
		return catalogo;
	}

	public void setCatalogo(String catalogo) {
		this.catalogo = catalogo;
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

	public Long getDescargasHv() {
		return descargasHv;
	}

	public void setDescargasHv(Long descargasHv) {
		this.descargasHv = descargasHv;
	}

	public Long getPublicacionesOferta() {
		return publicacionesOferta;
	}

	public void setPublicacionesOferta(Long publicacionesOferta) {
		this.publicacionesOferta = publicacionesOferta;
	}

	public Long getNumero() {
		return numero;
	}

	public void setNumero(Long numero) {
		this.numero = numero;
	}

	public String getPais() {
		return pais;
	}

	public void setPais(String pais) {
		this.pais = pais;
	}

	public String getCodigoPostal() {
		return codigoPostal;
	}

	public void setCodigoPostal(String codigoPostal) {
		this.codigoPostal = codigoPostal;
	}

	public String getLink() {
		return link;
	}

	public void setLink(String link) {
		this.link = link;
	}

	public Long getVisualizacionesHv() {
		return visualizacionesHv;
	}

	public void setVisualizacionesHv(Long visualizacionesHv) {
		this.visualizacionesHv = visualizacionesHv;
	}

	public Boolean getMembresia() {
		return membresia;
	}

	public void setMembresia(Boolean membresia) {
		this.membresia = membresia;
	}

	public Long getReplicasOferta() {
		return replicasOferta;
	}

	public void setReplicasOferta(Long replicasOferta) {
		this.replicasOferta = replicasOferta;
	}

    public Boolean getJuridica() {
		return juridica;
	}

	public void setJuridica(Boolean juridica) {
		this.juridica = juridica;
	}
	
	public Boolean getClubEmpresa() {
		return clubEmpresa;
	}

	public void setClubEmpresa(Boolean clubEmpresa) {
		this.clubEmpresa = clubEmpresa;
	}

	public String getUrlFacebook() {
		return urlFacebook;
	}

	public void setUrlFacebook(String urlFacebook) {
		this.urlFacebook = urlFacebook;
	}

	public String getUrlInstagram() {
		return urlInstagram;
	}

	public void setUrlInstagram(String urlInstagram) {
		this.urlInstagram = urlInstagram;
	}

	public String getUrlLinkedIn() {
		return urlLinkedIn;
	}

	public void setUrlLinkedIn(String urlLinkedIn) {
		this.urlLinkedIn = urlLinkedIn;
	}

	public Boolean getBdEmpresa() {
		return bdEmpresa;
	}

	public void setBdEmpresa(Boolean bdEmpresa) {
		this.bdEmpresa = bdEmpresa;
	}

	public Long getOfertaVip() {
		return ofertaVip;
	}

	public void setOfertaVip(Long ofertaVip) {
		this.ofertaVip = ofertaVip;
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
