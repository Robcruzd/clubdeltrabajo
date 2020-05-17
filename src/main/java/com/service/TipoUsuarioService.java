package com.service;

import com.domain.TipoUsuario;
import com.repository.TipoUsuarioRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link TipoUsuario}.
 */
@Service
@Transactional
public class TipoUsuarioService {

    private final Logger log = LoggerFactory.getLogger(TipoUsuarioService.class);

    private final TipoUsuarioRepository tipoUsuarioRepository;

    public TipoUsuarioService(TipoUsuarioRepository tipoUsuarioRepository) {
        this.tipoUsuarioRepository = tipoUsuarioRepository;
    }

    /**
     * Save a tipoUsuario.
     *
     * @param tipoUsuario the entity to save.
     * @return the persisted entity.
     */
    public TipoUsuario save(TipoUsuario tipoUsuario) {
        log.debug("Request to save TipoUsuario : {}", tipoUsuario);
        return tipoUsuarioRepository.save(tipoUsuario);
    }

    /**
     * Get all the tipoUsuarios.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<TipoUsuario> findAll(Pageable pageable) {
        log.debug("Request to get all TipoUsuarios");
        return tipoUsuarioRepository.findAll(pageable);
    }

    /**
     * Get one tipoUsuario by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<TipoUsuario> findOne(Long id) {
        log.debug("Request to get TipoUsuario : {}", id);
        return tipoUsuarioRepository.findById(id);
    }

    /**
     * Delete the tipoUsuario by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete TipoUsuario : {}", id);
        tipoUsuarioRepository.deleteById(id);
    }
}
