package com.service;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.domain.BdEmpresa;
import com.domain.Cargo;
import com.domain.Empresa;
import com.domain.Persona;
import com.repository.BdEmpresaRepository;

/**
 * Service Implementation for managing {@link Cargo}.
 */
@Service
@Transactional
public class BdEmpresaService {

    private final Logger log = LoggerFactory.getLogger(BdEmpresaService.class);

    private final BdEmpresaRepository bdEmpresaRepository;

    public BdEmpresaService(BdEmpresaRepository bdEmpresaRepository) {
        this.bdEmpresaRepository = bdEmpresaRepository;
    }

    /**
     * Save a bdEmpresa.
     *
     * @param bdEmpresa the entity to save.
     * @return the persisted entity.
     */
    public BdEmpresa save(BdEmpresa bdEmpresa) {
        log.debug("Request to save BdEmpresa : {}", bdEmpresa);
        return bdEmpresaRepository.save(bdEmpresa);
    }

    /**
     * Get all the bdEmpresa.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<BdEmpresa> findAll(Pageable pageable) {
        log.debug("Request to get all BdEmpresa");
        return bdEmpresaRepository.findAll(pageable);
    }

    /**
     * Get one bdEmpresa by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<BdEmpresa> findOne(Long id) {
        log.debug("Request to get BdEmpresa : {}", id);
        return bdEmpresaRepository.findById(id);
    }

    /**
     * Delete the bdEmpresa by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete BdEmpresa : {}", id);
        bdEmpresaRepository.deleteById(id);
    }
    
    public List<BdEmpresa> getBdEmpresaByIdEmpresa(Empresa idEmpresa) {
    	return bdEmpresaRepository.findByEmpresa(idEmpresa);
    }
    
    public List<BdEmpresa> getBdEmpresaByIdEmpresaAndUsuario(Persona idUsuario,Empresa idEmpresa) {
    	return bdEmpresaRepository.findByEmpresaAndUsuario(idUsuario,idEmpresa);
    }
}
