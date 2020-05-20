package com.web.rest;

import com.CtProjectApp;
import com.domain.Institucion;
import com.repository.InstitucionRepository;
import com.service.InstitucionService;
import com.service.dto.InstitucionCriteria;
import com.service.InstitucionQueryService;

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
 * Integration tests for the {@link InstitucionResource} REST controller.
 */
@SpringBootTest(classes = CtProjectApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class InstitucionResourceIT {

    private static final String DEFAULT_INSTITUCION = "AAAAAAAAAA";
    private static final String UPDATED_INSTITUCION = "BBBBBBBBBB";

    @Autowired
    private InstitucionRepository institucionRepository;

    @Autowired
    private InstitucionService institucionService;

    @Autowired
    private InstitucionQueryService institucionQueryService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restInstitucionMockMvc;

    private Institucion institucion;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Institucion createEntity(EntityManager em) {
        Institucion institucion = new Institucion()
            .institucion(DEFAULT_INSTITUCION);
        return institucion;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Institucion createUpdatedEntity(EntityManager em) {
        Institucion institucion = new Institucion()
            .institucion(UPDATED_INSTITUCION);
        return institucion;
    }

    @BeforeEach
    public void initTest() {
        institucion = createEntity(em);
    }

    @Test
    @Transactional
    public void createInstitucion() throws Exception {
        int databaseSizeBeforeCreate = institucionRepository.findAll().size();

        // Create the Institucion
        restInstitucionMockMvc.perform(post("/api/institucions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(institucion)))
            .andExpect(status().isCreated());

        // Validate the Institucion in the database
        List<Institucion> institucionList = institucionRepository.findAll();
        assertThat(institucionList).hasSize(databaseSizeBeforeCreate + 1);
        Institucion testInstitucion = institucionList.get(institucionList.size() - 1);
        assertThat(testInstitucion.getInstitucion()).isEqualTo(DEFAULT_INSTITUCION);
    }

    @Test
    @Transactional
    public void createInstitucionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = institucionRepository.findAll().size();

        // Create the Institucion with an existing ID
        institucion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInstitucionMockMvc.perform(post("/api/institucions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(institucion)))
            .andExpect(status().isBadRequest());

        // Validate the Institucion in the database
        List<Institucion> institucionList = institucionRepository.findAll();
        assertThat(institucionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkInstitucionIsRequired() throws Exception {
        int databaseSizeBeforeTest = institucionRepository.findAll().size();
        // set the field null
        institucion.setInstitucion(null);

        // Create the Institucion, which fails.

        restInstitucionMockMvc.perform(post("/api/institucions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(institucion)))
            .andExpect(status().isBadRequest());

        List<Institucion> institucionList = institucionRepository.findAll();
        assertThat(institucionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllInstitucions() throws Exception {
        // Initialize the database
        institucionRepository.saveAndFlush(institucion);

        // Get all the institucionList
        restInstitucionMockMvc.perform(get("/api/institucions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(institucion.getId().intValue())))
            .andExpect(jsonPath("$.[*].institucion").value(hasItem(DEFAULT_INSTITUCION)));
    }
    
    @Test
    @Transactional
    public void getInstitucion() throws Exception {
        // Initialize the database
        institucionRepository.saveAndFlush(institucion);

        // Get the institucion
        restInstitucionMockMvc.perform(get("/api/institucions/{id}", institucion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(institucion.getId().intValue()))
            .andExpect(jsonPath("$.institucion").value(DEFAULT_INSTITUCION));
    }


    @Test
    @Transactional
    public void getInstitucionsByIdFiltering() throws Exception {
        // Initialize the database
        institucionRepository.saveAndFlush(institucion);

        Long id = institucion.getId();

        defaultInstitucionShouldBeFound("id.equals=" + id);
        defaultInstitucionShouldNotBeFound("id.notEquals=" + id);

        defaultInstitucionShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultInstitucionShouldNotBeFound("id.greaterThan=" + id);

        defaultInstitucionShouldBeFound("id.lessThanOrEqual=" + id);
        defaultInstitucionShouldNotBeFound("id.lessThan=" + id);
    }


    @Test
    @Transactional
    public void getAllInstitucionsByInstitucionIsEqualToSomething() throws Exception {
        // Initialize the database
        institucionRepository.saveAndFlush(institucion);

        // Get all the institucionList where institucion equals to DEFAULT_INSTITUCION
        defaultInstitucionShouldBeFound("institucion.equals=" + DEFAULT_INSTITUCION);

        // Get all the institucionList where institucion equals to UPDATED_INSTITUCION
        defaultInstitucionShouldNotBeFound("institucion.equals=" + UPDATED_INSTITUCION);
    }

    @Test
    @Transactional
    public void getAllInstitucionsByInstitucionIsNotEqualToSomething() throws Exception {
        // Initialize the database
        institucionRepository.saveAndFlush(institucion);

        // Get all the institucionList where institucion not equals to DEFAULT_INSTITUCION
        defaultInstitucionShouldNotBeFound("institucion.notEquals=" + DEFAULT_INSTITUCION);

        // Get all the institucionList where institucion not equals to UPDATED_INSTITUCION
        defaultInstitucionShouldBeFound("institucion.notEquals=" + UPDATED_INSTITUCION);
    }

    @Test
    @Transactional
    public void getAllInstitucionsByInstitucionIsInShouldWork() throws Exception {
        // Initialize the database
        institucionRepository.saveAndFlush(institucion);

        // Get all the institucionList where institucion in DEFAULT_INSTITUCION or UPDATED_INSTITUCION
        defaultInstitucionShouldBeFound("institucion.in=" + DEFAULT_INSTITUCION + "," + UPDATED_INSTITUCION);

        // Get all the institucionList where institucion equals to UPDATED_INSTITUCION
        defaultInstitucionShouldNotBeFound("institucion.in=" + UPDATED_INSTITUCION);
    }

    @Test
    @Transactional
    public void getAllInstitucionsByInstitucionIsNullOrNotNull() throws Exception {
        // Initialize the database
        institucionRepository.saveAndFlush(institucion);

        // Get all the institucionList where institucion is not null
        defaultInstitucionShouldBeFound("institucion.specified=true");

        // Get all the institucionList where institucion is null
        defaultInstitucionShouldNotBeFound("institucion.specified=false");
    }
                @Test
    @Transactional
    public void getAllInstitucionsByInstitucionContainsSomething() throws Exception {
        // Initialize the database
        institucionRepository.saveAndFlush(institucion);

        // Get all the institucionList where institucion contains DEFAULT_INSTITUCION
        defaultInstitucionShouldBeFound("institucion.contains=" + DEFAULT_INSTITUCION);

        // Get all the institucionList where institucion contains UPDATED_INSTITUCION
        defaultInstitucionShouldNotBeFound("institucion.contains=" + UPDATED_INSTITUCION);
    }

    @Test
    @Transactional
    public void getAllInstitucionsByInstitucionNotContainsSomething() throws Exception {
        // Initialize the database
        institucionRepository.saveAndFlush(institucion);

        // Get all the institucionList where institucion does not contain DEFAULT_INSTITUCION
        defaultInstitucionShouldNotBeFound("institucion.doesNotContain=" + DEFAULT_INSTITUCION);

        // Get all the institucionList where institucion does not contain UPDATED_INSTITUCION
        defaultInstitucionShouldBeFound("institucion.doesNotContain=" + UPDATED_INSTITUCION);
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultInstitucionShouldBeFound(String filter) throws Exception {
        restInstitucionMockMvc.perform(get("/api/institucions?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(institucion.getId().intValue())))
            .andExpect(jsonPath("$.[*].institucion").value(hasItem(DEFAULT_INSTITUCION)));

        // Check, that the count call also returns 1
        restInstitucionMockMvc.perform(get("/api/institucions/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultInstitucionShouldNotBeFound(String filter) throws Exception {
        restInstitucionMockMvc.perform(get("/api/institucions?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restInstitucionMockMvc.perform(get("/api/institucions/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingInstitucion() throws Exception {
        // Get the institucion
        restInstitucionMockMvc.perform(get("/api/institucions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInstitucion() throws Exception {
        // Initialize the database
        institucionService.save(institucion);

        int databaseSizeBeforeUpdate = institucionRepository.findAll().size();

        // Update the institucion
        Institucion updatedInstitucion = institucionRepository.findById(institucion.getId()).get();
        // Disconnect from session so that the updates on updatedInstitucion are not directly saved in db
        em.detach(updatedInstitucion);
        updatedInstitucion
            .institucion(UPDATED_INSTITUCION);

        restInstitucionMockMvc.perform(put("/api/institucions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedInstitucion)))
            .andExpect(status().isOk());

        // Validate the Institucion in the database
        List<Institucion> institucionList = institucionRepository.findAll();
        assertThat(institucionList).hasSize(databaseSizeBeforeUpdate);
        Institucion testInstitucion = institucionList.get(institucionList.size() - 1);
        assertThat(testInstitucion.getInstitucion()).isEqualTo(UPDATED_INSTITUCION);
    }

    @Test
    @Transactional
    public void updateNonExistingInstitucion() throws Exception {
        int databaseSizeBeforeUpdate = institucionRepository.findAll().size();

        // Create the Institucion

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInstitucionMockMvc.perform(put("/api/institucions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(institucion)))
            .andExpect(status().isBadRequest());

        // Validate the Institucion in the database
        List<Institucion> institucionList = institucionRepository.findAll();
        assertThat(institucionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteInstitucion() throws Exception {
        // Initialize the database
        institucionService.save(institucion);

        int databaseSizeBeforeDelete = institucionRepository.findAll().size();

        // Delete the institucion
        restInstitucionMockMvc.perform(delete("/api/institucions/{id}", institucion.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Institucion> institucionList = institucionRepository.findAll();
        assertThat(institucionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
