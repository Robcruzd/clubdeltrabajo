package com.service;

import com.domain.Archivo;
import com.domain.Persona;
import com.repository.ArchivoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Archivo}.
 */
@Service
@Transactional
public class ArchivoService {

    private final Logger log = LoggerFactory.getLogger(ArchivoService.class);

    private final ArchivoRepository archivoRepository;

    public ArchivoService(ArchivoRepository archivoRepository) {
        this.archivoRepository = archivoRepository;
    }

    /**
     * Save a archivo.
     *
     * @param archivo the entity to save.
     * @return the persisted entity.
     */
    public Archivo save(Archivo archivo) {
        log.debug("Request to save Archivo : {}", archivo);
        return archivoRepository.save(archivo);
    }
    
    /**
     * Save all archivos.
     *
     * @param archivos the entities to save.
     * @return the persisted entities.
     */
    public List<Archivo> saveAll(List<Archivo> archivos) {
        log.debug("Request to save Archivos : {}", archivos);
        return archivoRepository.saveAll(archivos);
    }

    /**
     * Get all the archivos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Archivo> findAll(Pageable pageable) {
        log.debug("Request to get all Archivos");
        return archivoRepository.findAll(pageable);
    }

    /**
     * Get one archivo by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Archivo> findOne(Long id) {
        log.debug("Request to get Archivo : {}", id);
        return archivoRepository.findById(id);
    }

    /**
     * Delete the archivo by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Archivo : {}", id);
        archivoRepository.deleteById(id);
    }

    /**
     * Get one archivo by usuario and tipo.
     *
     * @param usuario the persona.
     * @param tipo the tipo of archivo.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Archivo> get(Long usuarioId, Integer tipo) {
        log.debug("Request to get Archivo : {}", usuarioId);
        Persona usuario = new Persona();
        usuario.setId(usuarioId);
        Optional<Archivo> opt = Optional.ofNullable(archivoRepository.findFirstByUsuarioAndTipoOrderByIdDesc(usuario, tipo));
		return opt;
    }
}
