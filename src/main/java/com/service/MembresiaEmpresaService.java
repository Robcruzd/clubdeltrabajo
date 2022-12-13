package com.service;

import com.domain.MembresiaEmpresa;
import com.repository.MembresiaEmpresaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MembresiaEmpresaService {

    private final Logger log = LoggerFactory.getLogger(MembresiaEmpresaService.class);

    private final MembresiaEmpresaRepository membresiaEmpresaRepository;

    public MembresiaEmpresaService(MembresiaEmpresaRepository membresiaEmpresaRepository) {
        this.membresiaEmpresaRepository = membresiaEmpresaRepository;
    }

    /**
     * Save a membresia.
     *
     * @param membresia the entity to save.
     * @return the persisted entity.
     */
    public MembresiaEmpresa save(MembresiaEmpresa membresia) {
        log.debug("Request to save Membresia : {}", membresia);
        return membresiaEmpresaRepository.save(membresia);
    }

    /**
     * Get all the membresias.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<MembresiaEmpresa> findAll(Pageable pageable) {
        log.debug("Request to get all Membresias");
        return membresiaEmpresaRepository.findAll(pageable);
    }

    /**
     * Get one membresia by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<MembresiaEmpresa> findOne(Long id) {
        log.debug("Request to get Membresia : {}", id);
        return membresiaEmpresaRepository.findById(id);
    }

    /**
     * Delete the membresia by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Membresia : {}", id);
        membresiaEmpresaRepository.deleteById(id);
    }

    public List<MembresiaEmpresa> getByEmpresa(Long empresa) {
        return membresiaEmpresaRepository.getByEmpresa(empresa);
    }
}
