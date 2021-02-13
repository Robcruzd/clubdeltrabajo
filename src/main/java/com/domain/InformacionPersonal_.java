package com.domain;

import java.time.LocalDate;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(InformacionPersonal.class)
public abstract class InformacionPersonal_ {

	public static volatile SingularAttribute<InformacionPersonal, LocalDate> fechaNacimiento;
	public static volatile SingularAttribute<InformacionPersonal, Integer> ciudad;
	public static volatile SingularAttribute<InformacionPersonal, String> direccionResidencia;
	public static volatile SingularAttribute<InformacionPersonal, String> genero;
	public static volatile SingularAttribute<InformacionPersonal, Integer> discapacidad;
	public static volatile SingularAttribute<InformacionPersonal, Persona> usuario;
	public static volatile SingularAttribute<InformacionPersonal, Long> id;
	public static volatile SingularAttribute<InformacionPersonal, String> telefono;
	public static volatile SingularAttribute<InformacionPersonal, Integer> redesSociales;
	public static volatile SingularAttribute<InformacionPersonal, String> lugarNacimiento;
	public static volatile SingularAttribute<InformacionPersonal, Boolean> licencenciaConduccion;

	public static final String FECHA_NACIMIENTO = "fechaNacimiento";
	public static final String CIUDAD = "ciudad";
	public static final String DIRECCION_RESIDENCIA = "direccionResidencia";
	public static final String GENERO = "genero";
	public static final String DISCAPACIDAD = "discapacidad";
	public static final String USUARIO = "usuario";
	public static final String ID = "id";
	public static final String TELEFONO = "telefono";
	public static final String REDES_SOCIALES = "redesSociales";
	public static final String LUGAR_NACIMIENTO = "lugarNacimiento";
	public static final String LICENCENCIA_CONDUCCION = "licencenciaConduccion";

}

