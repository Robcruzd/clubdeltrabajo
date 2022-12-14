package com.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Table(name = "ct_membresia_empresa_tb")
public class MembresiaEmpresa implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @ManyToOne(optional = false)
    @JsonIgnoreProperties("membresiaEmpresas")
    private Empresa empresa;

    @ManyToOne(optional = false)
    @JsonIgnoreProperties("membresiaEmpresas")
    private Membresia membresia;

    @Column(name = "fecha_vencimiento", nullable = true)
    private LocalDate fechaVencimiento;

    @Column(name = "publicaciones")
    private Integer publicaciones;

    @Column(name = "estado")
    private String estado;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Empresa getEmpresa() {
        return empresa;
    }

    public void setEmpresa(Empresa empresa) {
        this.empresa = empresa;
    }

    public Membresia getMembresia() {
        return membresia;
    }

    public void setMembresia(Membresia membresia) {
        this.membresia = membresia;
    }

    public LocalDate getFechaVencimiento() {
        return fechaVencimiento;
    }

    public void setFechaVencimiento(LocalDate fechaVencimiento) {
        this.fechaVencimiento = fechaVencimiento;
    }

    public Integer getPublicaciones() {
        return publicaciones;
    }

    public void setPublicaciones(Integer publicaciones) {
        this.publicaciones = publicaciones;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
}
