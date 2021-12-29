package com.domain;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(CommonMessages.class)
public abstract class CommonMessagesFiltro {

	public static volatile SingularAttribute<CommonMessages, Long> id;
	public static volatile SingularAttribute<CommonMessages, String> tipoMensaje;
	public static volatile SingularAttribute<CommonMessages, String> mensajes;

	public static final String ID = "id";
	public static final String TIPOMENSAJE = "tipoMensaje";
	public static final String MENSAJES = "mensajes";

}

