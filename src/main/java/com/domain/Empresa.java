package com.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

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
    @Column(name = "email", nullable = false)
    private String email;

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private Usuario numeroDocumento;

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private TipoUsuario tipoUsuario;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("empresas")
    private TipoDocumento tipoDocumento;

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

    public Usuario getNumeroDocumento() {
        return numeroDocumento;
    }

    public Empresa numeroDocumento(Usuario usuario) {
        this.numeroDocumento = usuario;
        return this;
    }

    public void setNumeroDocumento(Usuario usuario) {
        this.numeroDocumento = usuario;
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
            "}";
    }
}
