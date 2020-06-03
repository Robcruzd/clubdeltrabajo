package com.domain;

import java.time.LocalDate;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(InformacionLaboral.class)
public abstract class InformacionLaboral_ {

	public static volatile SingularAttribute<InformacionLaboral, String> direccion;
	public static volatile SingularAttribute<InformacionLaboral, String> ciudadExtranjera;
	public static volatile SingularAttribute<InformacionLaboral, LocalDate> fechaFin;
	public static volatile SingularAttribute<InformacionLaboral, String> telefonoEmpresa;
	public static volatile SingularAttribute<InformacionLaboral, String> dependencia;
	public static volatile SingularAttribute<InformacionLaboral, String> nombreEmpresa;
	public static volatile SingularAttribute<InformacionLaboral, String> pais;
	public static volatile SingularAttribute<InformacionLaboral, LocalDate> fechaInicio;
	public static volatile SingularAttribute<InformacionLaboral, Integer> ciudad;
	public static volatile SingularAttribute<InformacionLaboral, Integer> departamento;
	public static volatile SingularAttribute<InformacionLaboral, Persona> usuario;
	public static volatile SingularAttribute<InformacionLaboral, Long> id;
	public static volatile SingularAttribute<InformacionLaboral, Cargo> cargo;

	public static final String DIRECCION = "direccion";
	public static final String CIUDAD_EXTRANJERA = "ciudadExtranjera";
	public static final String FECHA_FIN = "fechaFin";
	public static final String TELEFONO_EMPRESA = "telefonoEmpresa";
	public static final String DEPENDENCIA = "dependencia";
	public static final String NOMBRE_EMPRESA = "nombreEmpresa";
	public static final String PAIS = "pais";
	public static final String FECHA_INICIO = "fechaInicio";
	public static final String CIUDAD = "ciudad";
	public static final String DEPARTAMENTO = "departamento";
	public static final String USUARIO = "usuario";
	public static final String ID = "id";
	public static final String CARGO = "cargo";

}

