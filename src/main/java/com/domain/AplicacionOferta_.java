package com.domain;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(AplicacionOferta.class)
public abstract class AplicacionOferta_ {

	public static volatile SingularAttribute<AplicacionOferta, Oferta> oferta;
	public static volatile SingularAttribute<AplicacionOferta, Persona> usuario;
	public static volatile SingularAttribute<AplicacionOferta, Long> id;

	public static final String OFERTA = "oferta";
	public static final String USUARIO = "usuario";
	public static final String ID = "id";

}

