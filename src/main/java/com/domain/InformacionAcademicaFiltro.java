package com.domain;

import java.time.LocalDate;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(InformacionAcademica.class)
public abstract class InformacionAcademicaFiltro {

	public static volatile SingularAttribute<InformacionAcademica, Integer> estado;
	public static volatile SingularAttribute<InformacionAcademica, LocalDate> fechaInicio;
	public static volatile SingularAttribute<InformacionAcademica, Integer> nivelEstudio;
	public static volatile SingularAttribute<InformacionAcademica, Institucion> institucion;
	public static volatile SingularAttribute<InformacionAcademica, Persona> usuario;
	public static volatile SingularAttribute<InformacionAcademica, Idioma> idioma;
	public static volatile SingularAttribute<InformacionAcademica, Long> id;
	public static volatile SingularAttribute<InformacionAcademica, NivelIdioma> nivelIdioma;
	public static volatile SingularAttribute<InformacionAcademica, LocalDate> fechaFin;
	public static volatile SingularAttribute<InformacionAcademica, String> tituloOtorgado;
	public static volatile SingularAttribute<InformacionAcademica, String> perfilProfesional;

	public static final String ESTADO = "estado";
	public static final String FECHA_INICIO = "fechaInicio";
	public static final String NIVEL_ESTUDIO = "nivelEstudio";
	public static final String INSTITUCION = "institucion";
	public static final String USUARIO = "usuario";
	public static final String IDIOMA = "idioma";
	public static final String ID = "id";
	public static final String NIVEL_IDIOMA = "nivelIdioma";
	public static final String FECHA_FIN = "fechaFin";
	public static final String TITULO_OTORGADO = "tituloOtorgado";
	public static final String PERFIL_PROFESIONAL = "perfilProfesional";

}

