package com.service;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.domain.Sector;
import com.repository.SectorRepository;

/**
 * Service Implementation for managing {@link Sector}.
 */
@Service
@Transactional
public class SectorService {

    private final Logger log = LoggerFactory.getLogger(SectorService.class);

    private final SectorRepository sectorRepository;

    public SectorService(SectorRepository sectorRepository) {
        this.sectorRepository = sectorRepository;
    }

    /**
     * Save a sector.
     *
     * @param sector the entity to save.
     * @return the persisted entity.
     */
    public Sector save(Sector sector) {
        log.debug("Request to save Sector : {}", sector);
        return sectorRepository.save(sector);
    }

    /**
     * Get all the sector.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Sector> findAll(Pageable pageable) {
        log.debug("Request to get all Sector");
        return sectorRepository.findAll(pageable);
    }

    /**
     * Get one sector by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Sector> findOne(Long id) {
        log.debug("Request to get Sector : {}", id);
        return sectorRepository.findById(id);
    }

    /**
     * Delete the sector by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Sector : {}", id);
        sectorRepository.deleteById(id);
    }
    
    public List<Sector> findAllSector() {
    	return sectorRepository.findAllSector();
    }
    
    public List<Sector> findSectorById(Long id) {
    	return sectorRepository.findSectorById(id);
    }
}
