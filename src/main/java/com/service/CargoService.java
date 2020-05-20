package com.service;

import com.domain.Cargo;
import com.repository.CargoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Cargo}.
 */
@Service
@Transactional
public class CargoService {

    private final Logger log = LoggerFactory.getLogger(CargoService.class);

    private final CargoRepository cargoRepository;

    public CargoService(CargoRepository cargoRepository) {
        this.cargoRepository = cargoRepository;
    }

    /**
     * Save a cargo.
     *
     * @param cargo the entity to save.
     * @return the persisted entity.
     */
    public Cargo save(Cargo cargo) {
        log.debug("Request to save Cargo : {}", cargo);
        return cargoRepository.save(cargo);
    }

    /**
     * Get all the cargos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Cargo> findAll(Pageable pageable) {
        log.debug("Request to get all Cargos");
        return cargoRepository.findAll(pageable);
    }

    /**
     * Get one cargo by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Cargo> findOne(Long id) {
        log.debug("Request to get Cargo : {}", id);
        return cargoRepository.findById(id);
    }

    /**
     * Delete the cargo by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Cargo : {}", id);
        cargoRepository.deleteById(id);
    }
}
