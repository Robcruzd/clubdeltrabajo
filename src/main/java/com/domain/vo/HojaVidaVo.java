package com.domain.vo;

import java.io.Serializable;
import java.util.List;

import com.domain.InformacionAcademica;
import com.domain.InformacionLaboral;
import com.domain.InformacionPersonal;
import com.domain.Persona;
import com.domain.PersonaIdioma;
import com.domain.Archivo;

public class HojaVidaVo implements Serializable {

	private static final long serialVersionUID = 1L;

	private Persona persona;
	private InformacionPersonal informacionPersonal;
	private List<InformacionAcademica> informacionAcademica;
	private List<InformacionLaboral> experienciaLaboral;
	private List<PersonaIdioma> idiomas;
	private List<Archivo> archivos;

	public HojaVidaVo() {

	}

	public List<Archivo> getArchivos() {
		return this.archivos;
	}

	public void setArchivos(List<Archivo> archivos) {
		this.archivos = archivos;
	}

	public Persona getPersona() {
		return persona;
	}

	public void setPersona(Persona persona) {
		this.persona = persona;
	}

	public void setInformacionPersonal(InformacionPersonal informacionPersonal) {
		this.informacionPersonal = informacionPersonal;
	}

	public InformacionPersonal getInformacionPersonal() {
		return this.informacionPersonal;
	}

	public void setInformacionAcademica(List<InformacionAcademica> informacionAcademica) {
		this.informacionAcademica = informacionAcademica;
	}

	public List<InformacionAcademica> getInformacionAcademica() {
		return this.informacionAcademica;
	}

	public void setExperienciaLaboral(List<InformacionLaboral> experienciaLaboral) {
		this.experienciaLaboral = experienciaLaboral;
	}

	public List<InformacionLaboral> getExperienciaLaboral() {
		return this.experienciaLaboral;
	}

	public List<PersonaIdioma> getIdiomas() {
		return idiomas;
	}

	public void setIdiomas(List<PersonaIdioma> idiomas) {
		this.idiomas = idiomas;
	}

}