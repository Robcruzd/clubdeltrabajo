package com.web.rest;

import com.CtProjectApp;
import com.domain.Cargo;
import com.repository.CargoRepository;
import com.service.CargoService;
import com.service.dto.CargoCriteria;
import com.service.CargoQueryService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link CargoResource} REST controller.
 */
@SpringBootTest(classes = CtProjectApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class CargoResourceIT {

    private static final String DEFAULT_CARGO = "AAAAAAAAAA";
    private static final String UPDATED_CARGO = "BBBBBBBBBB";

    @Autowired
    private CargoRepository cargoRepository;

    @Autowired
    private CargoService cargoService;

    @Autowired
    private CargoQueryService cargoQueryService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCargoMockMvc;

    private Cargo cargo;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Cargo createEntity(EntityManager em) {
        Cargo cargo = new Cargo()
            .cargo(DEFAULT_CARGO);
        return cargo;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Cargo createUpdatedEntity(EntityManager em) {
        Cargo cargo = new Cargo()
            .cargo(UPDATED_CARGO);
        return cargo;
    }

    @BeforeEach
    public void initTest() {
        cargo = createEntity(em);
    }

    @Test
    @Transactional
    public void createCargo() throws Exception {
        int databaseSizeBeforeCreate = cargoRepository.findAll().size();

        // Create the Cargo
        restCargoMockMvc.perform(post("/api/cargos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(cargo)))
            .andExpect(status().isCreated());

        // Validate the Cargo in the database
        List<Cargo> cargoList = cargoRepository.findAll();
        assertThat(cargoList).hasSize(databaseSizeBeforeCreate + 1);
        Cargo testCargo = cargoList.get(cargoList.size() - 1);
        assertThat(testCargo.getCargo()).isEqualTo(DEFAULT_CARGO);
    }

    @Test
    @Transactional
    public void createCargoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cargoRepository.findAll().size();

        // Create the Cargo with an existing ID
        cargo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCargoMockMvc.perform(post("/api/cargos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(cargo)))
            .andExpect(status().isBadRequest());

        // Validate the Cargo in the database
        List<Cargo> cargoList = cargoRepository.findAll();
        assertThat(cargoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkCargoIsRequired() throws Exception {
        int databaseSizeBeforeTest = cargoRepository.findAll().size();
        // set the field null
        cargo.setCargo(null);

        // Create the Cargo, which fails.

        restCargoMockMvc.perform(post("/api/cargos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(cargo)))
            .andExpect(status().isBadRequest());

        List<Cargo> cargoList = cargoRepository.findAll();
        assertThat(cargoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCargos() throws Exception {
        // Initialize the database
        cargoRepository.saveAndFlush(cargo);

        // Get all the cargoList
        restCargoMockMvc.perform(get("/api/cargos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cargo.getId().intValue())))
            .andExpect(jsonPath("$.[*].cargo").value(hasItem(DEFAULT_CARGO)));
    }
    
    @Test
    @Transactional
    public void getCargo() throws Exception {
        // Initialize the database
        cargoRepository.saveAndFlush(cargo);

        // Get the cargo
        restCargoMockMvc.perform(get("/api/cargos/{id}", cargo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cargo.getId().intValue()))
            .andExpect(jsonPath("$.cargo").value(DEFAULT_CARGO));
    }


    @Test
    @Transactional
    public void getCargosByIdFiltering() throws Exception {
        // Initialize the database
        cargoRepository.saveAndFlush(cargo);

        Long id = cargo.getId();

        defaultCargoShouldBeFound("id.equals=" + id);
        defaultCargoShouldNotBeFound("id.notEquals=" + id);

        defaultCargoShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultCargoShouldNotBeFound("id.greaterThan=" + id);

        defaultCargoShouldBeFound("id.lessThanOrEqual=" + id);
        defaultCargoShouldNotBeFound("id.lessThan=" + id);
    }


    @Test
    @Transactional
    public void getAllCargosByCargoIsEqualToSomething() throws Exception {
        // Initialize the database
        cargoRepository.saveAndFlush(cargo);

        // Get all the cargoList where cargo equals to DEFAULT_CARGO
        defaultCargoShouldBeFound("cargo.equals=" + DEFAULT_CARGO);

        // Get all the cargoList where cargo equals to UPDATED_CARGO
        defaultCargoShouldNotBeFound("cargo.equals=" + UPDATED_CARGO);
    }

    @Test
    @Transactional
    public void getAllCargosByCargoIsNotEqualToSomething() throws Exception {
        // Initialize the database
        cargoRepository.saveAndFlush(cargo);

        // Get all the cargoList where cargo not equals to DEFAULT_CARGO
        defaultCargoShouldNotBeFound("cargo.notEquals=" + DEFAULT_CARGO);

        // Get all the cargoList where cargo not equals to UPDATED_CARGO
        defaultCargoShouldBeFound("cargo.notEquals=" + UPDATED_CARGO);
    }

    @Test
    @Transactional
    public void getAllCargosByCargoIsInShouldWork() throws Exception {
        // Initialize the database
        cargoRepository.saveAndFlush(cargo);

        // Get all the cargoList where cargo in DEFAULT_CARGO or UPDATED_CARGO
        defaultCargoShouldBeFound("cargo.in=" + DEFAULT_CARGO + "," + UPDATED_CARGO);

        // Get all the cargoList where cargo equals to UPDATED_CARGO
        defaultCargoShouldNotBeFound("cargo.in=" + UPDATED_CARGO);
    }

    @Test
    @Transactional
    public void getAllCargosByCargoIsNullOrNotNull() throws Exception {
        // Initialize the database
        cargoRepository.saveAndFlush(cargo);

        // Get all the cargoList where cargo is not null
        defaultCargoShouldBeFound("cargo.specified=true");

        // Get all the cargoList where cargo is null
        defaultCargoShouldNotBeFound("cargo.specified=false");
    }
                @Test
    @Transactional
    public void getAllCargosByCargoContainsSomething() throws Exception {
        // Initialize the database
        cargoRepository.saveAndFlush(cargo);

        // Get all the cargoList where cargo contains DEFAULT_CARGO
        defaultCargoShouldBeFound("cargo.contains=" + DEFAULT_CARGO);

        // Get all the cargoList where cargo contains UPDATED_CARGO
        defaultCargoShouldNotBeFound("cargo.contains=" + UPDATED_CARGO);
    }

    @Test
    @Transactional
    public void getAllCargosByCargoNotContainsSomething() throws Exception {
        // Initialize the database
        cargoRepository.saveAndFlush(cargo);

        // Get all the cargoList where cargo does not contain DEFAULT_CARGO
        defaultCargoShouldNotBeFound("cargo.doesNotContain=" + DEFAULT_CARGO);

        // Get all the cargoList where cargo does not contain UPDATED_CARGO
        defaultCargoShouldBeFound("cargo.doesNotContain=" + UPDATED_CARGO);
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultCargoShouldBeFound(String filter) throws Exception {
        restCargoMockMvc.perform(get("/api/cargos?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cargo.getId().intValue())))
            .andExpect(jsonPath("$.[*].cargo").value(hasItem(DEFAULT_CARGO)));

        // Check, that the count call also returns 1
        restCargoMockMvc.perform(get("/api/cargos/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultCargoShouldNotBeFound(String filter) throws Exception {
        restCargoMockMvc.perform(get("/api/cargos?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restCargoMockMvc.perform(get("/api/cargos/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingCargo() throws Exception {
        // Get the cargo
        restCargoMockMvc.perform(get("/api/cargos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCargo() throws Exception {
        // Initialize the database
        cargoService.save(cargo);

        int databaseSizeBeforeUpdate = cargoRepository.findAll().size();

        // Update the cargo
        Cargo updatedCargo = cargoRepository.findById(cargo.getId()).get();
        // Disconnect from session so that the updates on updatedCargo are not directly saved in db
        em.detach(updatedCargo);
        updatedCargo
            .cargo(UPDATED_CARGO);

        restCargoMockMvc.perform(put("/api/cargos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCargo)))
            .andExpect(status().isOk());

        // Validate the Cargo in the database
        List<Cargo> cargoList = cargoRepository.findAll();
        assertThat(cargoList).hasSize(databaseSizeBeforeUpdate);
        Cargo testCargo = cargoList.get(cargoList.size() - 1);
        assertThat(testCargo.getCargo()).isEqualTo(UPDATED_CARGO);
    }

    @Test
    @Transactional
    public void updateNonExistingCargo() throws Exception {
        int databaseSizeBeforeUpdate = cargoRepository.findAll().size();

        // Create the Cargo

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCargoMockMvc.perform(put("/api/cargos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(cargo)))
            .andExpect(status().isBadRequest());

        // Validate the Cargo in the database
        List<Cargo> cargoList = cargoRepository.findAll();
        assertThat(cargoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCargo() throws Exception {
        // Initialize the database
        cargoService.save(cargo);

        int databaseSizeBeforeDelete = cargoRepository.findAll().size();

        // Delete the cargo
        restCargoMockMvc.perform(delete("/api/cargos/{id}", cargo.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Cargo> cargoList = cargoRepository.findAll();
        assertThat(cargoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
