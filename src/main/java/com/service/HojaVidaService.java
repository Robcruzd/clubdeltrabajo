package com.service;

import com.domain.InformacionAcademica;
import com.domain.InformacionLaboral;
import com.domain.vo.HojaVidaVo;
import com.repository.InformacionAcademicaRepository;
import com.repository.InformacionLaboralRepository;
import com.repository.InformacionPersonalRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class HojaVidaService {
    private final Logger log = LoggerFactory.getLogger(HojaVidaService.class);

    private final InformacionPersonalRepository personalRepository;

    private final InformacionAcademicaRepository academicaRepository;
    private final InformacionLaboralRepository experienciaRepository;

    public HojaVidaService(InformacionPersonalRepository personalRepository,
            InformacionAcademicaRepository academicaRepository, InformacionLaboralRepository experienciaRepository) {
        this.personalRepository = personalRepository;
        this.academicaRepository = academicaRepository;
        this.experienciaRepository = experienciaRepository;
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

        return hojaVida;

    }
}