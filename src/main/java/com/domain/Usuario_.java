package com.domain;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Usuario.class)
public abstract class Usuario_ {

	public static volatile SingularAttribute<Usuario, String> clave;
	public static volatile SingularAttribute<Usuario, String> estado;
	public static volatile SingularAttribute<Usuario, Integer> usuario;
	public static volatile SingularAttribute<Usuario, Long> id;

	public static final String CLAVE = "clave";
	public static final String ESTADO = "estado";
	public static final String USUARIO = "usuario";
	public static final String ID = "id";

}

