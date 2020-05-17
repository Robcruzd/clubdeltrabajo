package com.web.rest;

import com.CtProjectApp;
import com.domain.Dependencia;
import com.repository.DependenciaRepository;
import com.service.DependenciaService;
import com.service.dto.DependenciaCriteria;
import com.service.DependenciaQueryService;

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
 * Integration tests for the {@link DependenciaResource} REST controller.
 */
@SpringBootTest(classes = CtProjectApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class DependenciaResourceIT {

    private static final String DEFAULT_DEPENDENCIA = "AAAAAAAAAA";
    private static final String UPDATED_DEPENDENCIA = "BBBBBBBBBB";

    @Autowired
    private DependenciaRepository dependenciaRepository;

    @Autowired
    private DependenciaService dependenciaService;

    @Autowired
    private DependenciaQueryService dependenciaQueryService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDependenciaMockMvc;

    private Dependencia dependencia;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Dependencia createEntity(EntityManager em) {
        Dependencia dependencia = new Dependencia()
            .dependencia(DEFAULT_DEPENDENCIA);
        return dependencia;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Dependencia createUpdatedEntity(EntityManager em) {
        Dependencia dependencia = new Dependencia()
            .dependencia(UPDATED_DEPENDENCIA);
        return dependencia;
    }

    @BeforeEach
    public void initTest() {
        dependencia = createEntity(em);
    }

    @Test
    @Transactional
    public void createDependencia() throws Exception {
        int databaseSizeBeforeCreate = dependenciaRepository.findAll().size();

        // Create the Dependencia
        restDependenciaMockMvc.perform(post("/api/dependencias")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(dependencia)))
            .andExpect(status().isCreated());

        // Validate the Dependencia in the database
        List<Dependencia> dependenciaList = dependenciaRepository.findAll();
        assertThat(dependenciaList).hasSize(databaseSizeBeforeCreate + 1);
        Dependencia testDependencia = dependenciaList.get(dependenciaList.size() - 1);
        assertThat(testDependencia.getDependencia()).isEqualTo(DEFAULT_DEPENDENCIA);
    }

    @Test
    @Transactional
    public void createDependenciaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = dependenciaRepository.findAll().size();

        // Create the Dependencia with an existing ID
        dependencia.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDependenciaMockMvc.perform(post("/api/dependencias")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(dependencia)))
            .andExpect(status().isBadRequest());

        // Validate the Dependencia in the database
        List<Dependencia> dependenciaList = dependenciaRepository.findAll();
        assertThat(dependenciaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkDependenciaIsRequired() throws Exception {
        int databaseSizeBeforeTest = dependenciaRepository.findAll().size();
        // set the field null
        dependencia.setDependencia(null);

        // Create the Dependencia, which fails.

        restDependenciaMockMvc.perform(post("/api/dependencias")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(dependencia)))
            .andExpect(status().isBadRequest());

        List<Dependencia> dependenciaList = dependenciaRepository.findAll();
        assertThat(dependenciaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDependencias() throws Exception {
        // Initialize the database
        dependenciaRepository.saveAndFlush(dependencia);

        // Get all the dependenciaList
        restDependenciaMockMvc.perform(get("/api/dependencias?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dependencia.getId().intValue())))
            .andExpect(jsonPath("$.[*].dependencia").value(hasItem(DEFAULT_DEPENDENCIA)));
    }
    
    @Test
    @Transactional
    public void getDependencia() throws Exception {
        // Initialize the database
        dependenciaRepository.saveAndFlush(dependencia);

        // Get the dependencia
        restDependenciaMockMvc.perform(get("/api/dependencias/{id}", dependencia.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(dependencia.getId().intValue()))
            .andExpect(jsonPath("$.dependencia").value(DEFAULT_DEPENDENCIA));
    }


    @Test
    @Transactional
    public void getDependenciasByIdFiltering() throws Exception {
        // Initialize the database
        dependenciaRepository.saveAndFlush(dependencia);

        Long id = dependencia.getId();

        defaultDependenciaShouldBeFound("id.equals=" + id);
        defaultDependenciaShouldNotBeFound("id.notEquals=" + id);

        defaultDependenciaShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultDependenciaShouldNotBeFound("id.greaterThan=" + id);

        defaultDependenciaShouldBeFound("id.lessThanOrEqual=" + id);
        defaultDependenciaShouldNotBeFound("id.lessThan=" + id);
    }


    @Test
    @Transactional
    public void getAllDependenciasByDependenciaIsEqualToSomething() throws Exception {
        // Initialize the database
        dependenciaRepository.saveAndFlush(dependencia);

        // Get all the dependenciaList where dependencia equals to DEFAULT_DEPENDENCIA
        defaultDependenciaShouldBeFound("dependencia.equals=" + DEFAULT_DEPENDENCIA);

        // Get all the dependenciaList where dependencia equals to UPDATED_DEPENDENCIA
        defaultDependenciaShouldNotBeFound("dependencia.equals=" + UPDATED_DEPENDENCIA);
    }

    @Test
    @Transactional
    public void getAllDependenciasByDependenciaIsNotEqualToSomething() throws Exception {
        // Initialize the database
        dependenciaRepository.saveAndFlush(dependencia);

        // Get all the dependenciaList where dependencia not equals to DEFAULT_DEPENDENCIA
        defaultDependenciaShouldNotBeFound("dependencia.notEquals=" + DEFAULT_DEPENDENCIA);

        // Get all the dependenciaList where dependencia not equals to UPDATED_DEPENDENCIA
        defaultDependenciaShouldBeFound("dependencia.notEquals=" + UPDATED_DEPENDENCIA);
    }

    @Test
    @Transactional
    public void getAllDependenciasByDependenciaIsInShouldWork() throws Exception {
        // Initialize the database
        dependenciaRepository.saveAndFlush(dependencia);

        // Get all the dependenciaList where dependencia in DEFAULT_DEPENDENCIA or UPDATED_DEPENDENCIA
        defaultDependenciaShouldBeFound("dependencia.in=" + DEFAULT_DEPENDENCIA + "," + UPDATED_DEPENDENCIA);

        // Get all the dependenciaList where dependencia equals to UPDATED_DEPENDENCIA
        defaultDependenciaShouldNotBeFound("dependencia.in=" + UPDATED_DEPENDENCIA);
    }

    @Test
    @Transactional
    public void getAllDependenciasByDependenciaIsNullOrNotNull() throws Exception {
        // Initialize the database
        dependenciaRepository.saveAndFlush(dependencia);

        // Get all the dependenciaList where dependencia is not null
        defaultDependenciaShouldBeFound("dependencia.specified=true");

        // Get all the dependenciaList where dependencia is null
        defaultDependenciaShouldNotBeFound("dependencia.specified=false");
    }
                @Test
    @Transactional
    public void getAllDependenciasByDependenciaContainsSomething() throws Exception {
        // Initialize the database
        dependenciaRepository.saveAndFlush(dependencia);

        // Get all the dependenciaList where dependencia contains DEFAULT_DEPENDENCIA
        defaultDependenciaShouldBeFound("dependencia.contains=" + DEFAULT_DEPENDENCIA);

        // Get all the dependenciaList where dependencia contains UPDATED_DEPENDENCIA
        defaultDependenciaShouldNotBeFound("dependencia.contains=" + UPDATED_DEPENDENCIA);
    }

    @Test
    @Transactional
    public void getAllDependenciasByDependenciaNotContainsSomething() throws Exception {
        // Initialize the database
        dependenciaRepository.saveAndFlush(dependencia);

        // Get all the dependenciaList where dependencia does not contain DEFAULT_DEPENDENCIA
        defaultDependenciaShouldNotBeFound("dependencia.doesNotContain=" + DEFAULT_DEPENDENCIA);

        // Get all the dependenciaList where dependencia does not contain UPDATED_DEPENDENCIA
        defaultDependenciaShouldBeFound("dependencia.doesNotContain=" + UPDATED_DEPENDENCIA);
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultDependenciaShouldBeFound(String filter) throws Exception {
        restDependenciaMockMvc.perform(get("/api/dependencias?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dependencia.getId().intValue())))
            .andExpect(jsonPath("$.[*].dependencia").value(hasItem(DEFAULT_DEPENDENCIA)));

        // Check, that the count call also returns 1
        restDependenciaMockMvc.perform(get("/api/dependencias/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultDependenciaShouldNotBeFound(String filter) throws Exception {
        restDependenciaMockMvc.perform(get("/api/dependencias?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restDependenciaMockMvc.perform(get("/api/dependencias/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingDependencia() throws Exception {
        // Get the dependencia
        restDependenciaMockMvc.perform(get("/api/dependencias/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDependencia() throws Exception {
        // Initialize the database
        dependenciaService.save(dependencia);

        int databaseSizeBeforeUpdate = dependenciaRepository.findAll().size();

        // Update the dependencia
        Dependencia updatedDependencia = dependenciaRepository.findById(dependencia.getId()).get();
        // Disconnect from session so that the updates on updatedDependencia are not directly saved in db
        em.detach(updatedDependencia);
        updatedDependencia
            .dependencia(UPDATED_DEPENDENCIA);

        restDependenciaMockMvc.perform(put("/api/dependencias")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedDependencia)))
            .andExpect(status().isOk());

        // Validate the Dependencia in the database
        List<Dependencia> dependenciaList = dependenciaRepository.findAll();
        assertThat(dependenciaList).hasSize(databaseSizeBeforeUpdate);
        Dependencia testDependencia = dependenciaList.get(dependenciaList.size() - 1);
        assertThat(testDependencia.getDependencia()).isEqualTo(UPDATED_DEPENDENCIA);
    }

    @Test
    @Transactional
    public void updateNonExistingDependencia() throws Exception {
        int databaseSizeBeforeUpdate = dependenciaRepository.findAll().size();

        // Create the Dependencia

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDependenciaMockMvc.perform(put("/api/dependencias")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(dependencia)))
            .andExpect(status().isBadRequest());

        // Validate the Dependencia in the database
        List<Dependencia> dependenciaList = dependenciaRepository.findAll();
        assertThat(dependenciaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDependencia() throws Exception {
        // Initialize the database
        dependenciaService.save(dependencia);

        int databaseSizeBeforeDelete = dependenciaRepository.findAll().size();

        // Delete the dependencia
        restDependenciaMockMvc.perform(delete("/api/dependencias/{id}", dependencia.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Dependencia> dependenciaList = dependenciaRepository.findAll();
        assertThat(dependenciaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
