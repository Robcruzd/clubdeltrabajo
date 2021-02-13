package com.domain;

import java.time.LocalDate;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Oferta.class)
public abstract class Oferta_ {

	public static volatile SingularAttribute<Oferta, String> descripcion;
	public static volatile SingularAttribute<Oferta, Integer> area;
	public static volatile SingularAttribute<Oferta, String> estado;
	public static volatile SingularAttribute<Oferta, Integer> ciudad;
	public static volatile SingularAttribute<Oferta, Integer> salario;
	public static volatile SingularAttribute<Oferta, String> experiencia;
	public static volatile SingularAttribute<Oferta, Integer> titulo;
	public static volatile SingularAttribute<Oferta, Empresa> usuario;
	public static volatile SingularAttribute<Oferta, Long> id;
	public static volatile SingularAttribute<Oferta, Integer> cargo;
	public static volatile SingularAttribute<Oferta, LocalDate> fechaPublicacion;

	public static final String DESCRIPCION = "descripcion";
	public static final String AREA = "area";
	public static final String ESTADO = "estado";
	public static final String CIUDAD = "ciudad";
	public static final String SALARIO = "salario";
	public static final String EXPERIENCIA = "experiencia";
	public static final String TITULO = "titulo";
	public static final String USUARIO = "usuario";
	public static final String ID = "id";
	public static final String CARGO = "cargo";
	public static final String FECHA_PUBLICACION = "fechaPublicacion";

}

