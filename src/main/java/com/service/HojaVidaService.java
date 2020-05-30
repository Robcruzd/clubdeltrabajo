package com.service;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.domain.InformacionAcademica;
import com.domain.InformacionLaboral;
import com.domain.InformacionPersonal;
import com.domain.Persona;
import com.domain.PersonaIdioma;
import com.domain.vo.HojaVidaVo;
import com.repository.InformacionAcademicaRepository;
import com.repository.InformacionLaboralRepository;
import com.repository.InformacionPersonalRepository;
import com.repository.PersonaIdiomaRepository;
import com.repository.PersonaRepository;

@Service
@Transactional
public class HojaVidaService {
	private final Logger log = LoggerFactory.getLogger(HojaVidaService.class);

	private final PersonaRepository personaRepository;
	private final InformacionPersonalRepository personalRepository;
	private final InformacionAcademicaRepository academicaRepository;
	private final InformacionLaboralRepository experienciaRepository;
	private final PersonaIdiomaRepository idiomaRepository;

	public HojaVidaService(InformacionPersonalRepository personalRepository,
			InformacionAcademicaRepository academicaRepository, InformacionLaboralRepository experienciaRepository,
			PersonaIdiomaRepository idiomaRepository, PersonaRepository personaRepository) {
		this.personalRepository = personalRepository;
		this.academicaRepository = academicaRepository;
		this.experienciaRepository = experienciaRepository;
		this.idiomaRepository = idiomaRepository;
		this.personaRepository = personaRepository;
	}

	/**
	 * Save a HojaVidaVo.
	 *
	 * @param hojaVidaVo the entity to manage to persist.
	 * @return the persisted entity.
	 */
	public HojaVidaVo save(HojaVidaVo hojaVida) {
		log.debug("Request to save Hoja de vida : {}", hojaVida);

		this.personalRepository.save(hojaVida.getInformacionPersonal());

		for (InformacionAcademica academica : hojaVida.getInformacionAcademica()) {
			this.academicaRepository.save(academica);
		}

		for (InformacionLaboral laboral : hojaVida.getExperienciaLaboral()) {
			this.experienciaRepository.save(laboral);
		}

		for (PersonaIdioma idioma : hojaVida.getIdiomas()) {
			idiomaRepository.save(idioma);
		}

		return hojaVida;
	}

	/**
	 * get a HojaVidaVo
	 * 
	 * @param id the persona's id
	 * @return the result entity
	 */
	public Optional<HojaVidaVo> get(Long id) {
		HojaVidaVo hojaVidaVo = new HojaVidaVo();
		Persona persona = personaRepository.findById(id).get();
		InformacionPersonal personal = this.personalRepository.findByUsuario(persona);
		List<InformacionAcademica> academica = this.academicaRepository.findByUsuario(persona);
		List<InformacionLaboral> experiencia = this.experienciaRepository.findByUsuario(persona);
		List<PersonaIdioma> idiomas = this.idiomaRepository.findByIdPersona(persona);

		hojaVidaVo.setInformacionPersonal(personal);
		hojaVidaVo.setInformacionAcademica(academica);
		hojaVidaVo.setExperienciaLaboral(experiencia);
		hojaVidaVo.setIdiomas(idiomas);
		Optional<HojaVidaVo> opt = Optional.ofNullable(hojaVidaVo);
		return opt;
	}

}