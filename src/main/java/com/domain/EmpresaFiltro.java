package com.domain;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Empresa.class)
public abstract class EmpresaFiltro {

	public static volatile SingularAttribute<Empresa, TipoDocumento> tipoDocumento;
	public static volatile SingularAttribute<Empresa, String> razonSocial;
	public static volatile SingularAttribute<Empresa, TipoUsuario> tipoUsuario;
	public static volatile SingularAttribute<Empresa, Long> id;
	public static volatile SingularAttribute<Empresa, Usuario> numeroDocumento;
	public static volatile SingularAttribute<Empresa, String> razonComercial;
	public static volatile SingularAttribute<Empresa, String> email;

	public static final String TIPO_DOCUMENTO = "tipoDocumento";
	public static final String RAZON_SOCIAL = "razonSocial";
	public static final String TIPO_USUARIO = "tipoUsuario";
	public static final String ID = "id";
	public static final String NUMERO_DOCUMENTO = "numeroDocumento";
	public static final String RAZON_COMERCIAL = "razonComercial";
	public static final String EMAIL = "email";

}

