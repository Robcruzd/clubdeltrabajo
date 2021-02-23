package com.domain;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Archivo.class)
public abstract class ArchivoFiltro {

	public static volatile SingularAttribute<Archivo, Integer> tipo;
	public static volatile SingularAttribute<Archivo, String> archivo;
	public static volatile SingularAttribute<Archivo, Persona> usuario;
	public static volatile SingularAttribute<Archivo, Long> id;
	public static volatile SingularAttribute<Archivo, Empresa> empresa;

	public static final String TIPO = "tipo";
	public static final String ARCHIVO = "archivo";
	public static final String USUARIO = "usuario";
	public static final String ID = "id";
	public static final String EMPRESA = "empresa";

}

