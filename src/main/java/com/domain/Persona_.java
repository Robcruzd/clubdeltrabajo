package com.domain;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Persona.class)
public abstract class Persona_ {

	public static volatile SingularAttribute<Persona, TipoDocumento> tipoDocumento;
	public static volatile SingularAttribute<Persona, String> apellido;
	public static volatile SingularAttribute<Persona, TipoUsuario> tipoUsuario;
	public static volatile SingularAttribute<Persona, Long> id;
	public static volatile SingularAttribute<Persona, Usuario> numeroDocumento;
	public static volatile SingularAttribute<Persona, String> nombre;
	public static volatile SingularAttribute<Persona, String> email;

	public static final String TIPO_DOCUMENTO = "tipoDocumento";
	public static final String APELLIDO = "apellido";
	public static final String TIPO_USUARIO = "tipoUsuario";
	public static final String ID = "id";
	public static final String NUMERO_DOCUMENTO = "numeroDocumento";
	public static final String NOMBRE = "nombre";
	public static final String EMAIL = "email";

}

