package com.web.rest;

import com.CtProjectApp;
import com.domain.NivelIdioma;
import com.repository.NivelIdiomaRepository;
import com.service.NivelIdiomaService;
import com.service.dto.NivelIdiomaCriteria;
import com.service.NivelIdiomaQueryService;

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
 * Integration tests for the {@link NivelIdiomaResource} REST controller.
 */
@SpringBootTest(classes = CtProjectApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class NivelIdiomaResourceIT {

    private static final String DEFAULT_NIVEL = "AAAAAAAAAA";
    private static final String UPDATED_NIVEL = "BBBBBBBBBB";

    @Autowired
    private NivelIdiomaRepository nivelIdiomaRepository;

    @Autowired
    private NivelIdiomaService nivelIdiomaService;

    @Autowired
    private NivelIdiomaQueryService nivelIdiomaQueryService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restNivelIdiomaMockMvc;

    private NivelIdioma nivelIdioma;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NivelIdioma createEntity(EntityManager em) {
        NivelIdioma nivelIdioma = new NivelIdioma()
            .nivel(DEFAULT_NIVEL);
        return nivelIdioma;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NivelIdioma createUpdatedEntity(EntityManager em) {
        NivelIdioma nivelIdioma = new NivelIdioma()
            .nivel(UPDATED_NIVEL);
        return nivelIdioma;
    }

    @BeforeEach
    public void initTest() {
        nivelIdioma = createEntity(em);
    }

    @Test
    @Transactional
    public void createNivelIdioma() throws Exception {
        int databaseSizeBeforeCreate = nivelIdiomaRepository.findAll().size();

        // Create the NivelIdioma
        restNivelIdiomaMockMvc.perform(post("/api/nivel-idiomas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(nivelIdioma)))
            .andExpect(status().isCreated());

        // Validate the NivelIdioma in the database
        List<NivelIdioma> nivelIdiomaList = nivelIdiomaRepository.findAll();
        assertThat(nivelIdiomaList).hasSize(databaseSizeBeforeCreate + 1);
        NivelIdioma testNivelIdioma = nivelIdiomaList.get(nivelIdiomaList.size() - 1);
        assertThat(testNivelIdioma.getNivel()).isEqualTo(DEFAULT_NIVEL);
    }

    @Test
    @Transactional
    public void createNivelIdiomaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = nivelIdiomaRepository.findAll().size();

        // Create the NivelIdioma with an existing ID
        nivelIdioma.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNivelIdiomaMockMvc.perform(post("/api/nivel-idiomas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(nivelIdioma)))
            .andExpect(status().isBadRequest());

        // Validate the NivelIdioma in the database
        List<NivelIdioma> nivelIdiomaList = nivelIdiomaRepository.findAll();
        assertThat(nivelIdiomaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNivelIsRequired() throws Exception {
        int databaseSizeBeforeTest = nivelIdiomaRepository.findAll().size();
        // set the field null
        nivelIdioma.setNivel(null);

        // Create the NivelIdioma, which fails.

        restNivelIdiomaMockMvc.perform(post("/api/nivel-idiomas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(nivelIdioma)))
            .andExpect(status().isBadRequest());

        List<NivelIdioma> nivelIdiomaList = nivelIdiomaRepository.findAll();
        assertThat(nivelIdiomaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllNivelIdiomas() throws Exception {
        // Initialize the database
        nivelIdiomaRepository.saveAndFlush(nivelIdioma);

        // Get all the nivelIdiomaList
        restNivelIdiomaMockMvc.perform(get("/api/nivel-idiomas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(nivelIdioma.getId().intValue())))
            .andExpect(jsonPath("$.[*].nivel").value(hasItem(DEFAULT_NIVEL)));
    }
    
    @Test
    @Transactional
    public void getNivelIdioma() throws Exception {
        // Initialize the database
        nivelIdiomaRepository.saveAndFlush(nivelIdioma);

        // Get the nivelIdioma
        restNivelIdiomaMockMvc.perform(get("/api/nivel-idiomas/{id}", nivelIdioma.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(nivelIdioma.getId().intValue()))
            .andExpect(jsonPath("$.nivel").value(DEFAULT_NIVEL));
    }


    @Test
    @Transactional
    public void getNivelIdiomasByIdFiltering() throws Exception {
        // Initialize the database
        nivelIdiomaRepository.saveAndFlush(nivelIdioma);

        Long id = nivelIdioma.getId();

        defaultNivelIdiomaShouldBeFound("id.equals=" + id);
        defaultNivelIdiomaShouldNotBeFound("id.notEquals=" + id);

        defaultNivelIdiomaShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultNivelIdiomaShouldNotBeFound("id.greaterThan=" + id);

        defaultNivelIdiomaShouldBeFound("id.lessThanOrEqual=" + id);
        defaultNivelIdiomaShouldNotBeFound("id.lessThan=" + id);
    }


    @Test
    @Transactional
    public void getAllNivelIdiomasByNivelIsEqualToSomething() throws Exception {
        // Initialize the database
        nivelIdiomaRepository.saveAndFlush(nivelIdioma);

        // Get all the nivelIdiomaList where nivel equals to DEFAULT_NIVEL
        defaultNivelIdiomaShouldBeFound("nivel.equals=" + DEFAULT_NIVEL);

        // Get all the nivelIdiomaList where nivel equals to UPDATED_NIVEL
        defaultNivelIdiomaShouldNotBeFound("nivel.equals=" + UPDATED_NIVEL);
    }

    @Test
    @Transactional
    public void getAllNivelIdiomasByNivelIsNotEqualToSomething() throws Exception {
        // Initialize the database
        nivelIdiomaRepository.saveAndFlush(nivelIdioma);

        // Get all the nivelIdiomaList where nivel not equals to DEFAULT_NIVEL
        defaultNivelIdiomaShouldNotBeFound("nivel.notEquals=" + DEFAULT_NIVEL);

        // Get all the nivelIdiomaList where nivel not equals to UPDATED_NIVEL
        defaultNivelIdiomaShouldBeFound("nivel.notEquals=" + UPDATED_NIVEL);
    }

    @Test
    @Transactional
    public void getAllNivelIdiomasByNivelIsInShouldWork() throws Exception {
        // Initialize the database
        nivelIdiomaRepository.saveAndFlush(nivelIdioma);

        // Get all the nivelIdiomaList where nivel in DEFAULT_NIVEL or UPDATED_NIVEL
        defaultNivelIdiomaShouldBeFound("nivel.in=" + DEFAULT_NIVEL + "," + UPDATED_NIVEL);

        // Get all the nivelIdiomaList where nivel equals to UPDATED_NIVEL
        defaultNivelIdiomaShouldNotBeFound("nivel.in=" + UPDATED_NIVEL);
    }

    @Test
    @Transactional
    public void getAllNivelIdiomasByNivelIsNullOrNotNull() throws Exception {
        // Initialize the database
        nivelIdiomaRepository.saveAndFlush(nivelIdioma);

        // Get all the nivelIdiomaList where nivel is not null
        defaultNivelIdiomaShouldBeFound("nivel.specified=true");

        // Get all the nivelIdiomaList where nivel is null
        defaultNivelIdiomaShouldNotBeFound("nivel.specified=false");
    }
                @Test
    @Transactional
    public void getAllNivelIdiomasByNivelContainsSomething() throws Exception {
        // Initialize the database
        nivelIdiomaRepository.saveAndFlush(nivelIdioma);

        // Get all the nivelIdiomaList where nivel contains DEFAULT_NIVEL
        defaultNivelIdiomaShouldBeFound("nivel.contains=" + DEFAULT_NIVEL);

        // Get all the nivelIdiomaList where nivel contains UPDATED_NIVEL
        defaultNivelIdiomaShouldNotBeFound("nivel.contains=" + UPDATED_NIVEL);
    }

    @Test
    @Transactional
    public void getAllNivelIdiomasByNivelNotContainsSomething() throws Exception {
        // Initialize the database
        nivelIdiomaRepository.saveAndFlush(nivelIdioma);

        // Get all the nivelIdiomaList where nivel does not contain DEFAULT_NIVEL
        defaultNivelIdiomaShouldNotBeFound("nivel.doesNotContain=" + DEFAULT_NIVEL);

        // Get all the nivelIdiomaList where nivel does not contain UPDATED_NIVEL
        defaultNivelIdiomaShouldBeFound("nivel.doesNotContain=" + UPDATED_NIVEL);
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultNivelIdiomaShouldBeFound(String filter) throws Exception {
        restNivelIdiomaMockMvc.perform(get("/api/nivel-idiomas?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(nivelIdioma.getId().intValue())))
            .andExpect(jsonPath("$.[*].nivel").value(hasItem(DEFAULT_NIVEL)));

        // Check, that the count call also returns 1
        restNivelIdiomaMockMvc.perform(get("/api/nivel-idiomas/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultNivelIdiomaShouldNotBeFound(String filter) throws Exception {
        restNivelIdiomaMockMvc.perform(get("/api/nivel-idiomas?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restNivelIdiomaMockMvc.perform(get("/api/nivel-idiomas/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingNivelIdioma() throws Exception {
        // Get the nivelIdioma
        restNivelIdiomaMockMvc.perform(get("/api/nivel-idiomas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNivelIdioma() throws Exception {
        // Initialize the database
        nivelIdiomaService.save(nivelIdioma);

        int databaseSizeBeforeUpdate = nivelIdiomaRepository.findAll().size();

        // Update the nivelIdioma
        NivelIdioma updatedNivelIdioma = nivelIdiomaRepository.findById(nivelIdioma.getId()).get();
        // Disconnect from session so that the updates on updatedNivelIdioma are not directly saved in db
        em.detach(updatedNivelIdioma);
        updatedNivelIdioma
            .nivel(UPDATED_NIVEL);

        restNivelIdiomaMockMvc.perform(put("/api/nivel-idiomas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedNivelIdioma)))
            .andExpect(status().isOk());

        // Validate the NivelIdioma in the database
        List<NivelIdioma> nivelIdiomaList = nivelIdiomaRepository.findAll();
        assertThat(nivelIdiomaList).hasSize(databaseSizeBeforeUpdate);
        NivelIdioma testNivelIdioma = nivelIdiomaList.get(nivelIdiomaList.size() - 1);
        assertThat(testNivelIdioma.getNivel()).isEqualTo(UPDATED_NIVEL);
    }

    @Test
    @Transactional
    public void updateNonExistingNivelIdioma() throws Exception {
        int databaseSizeBeforeUpdate = nivelIdiomaRepository.findAll().size();

        // Create the NivelIdioma

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNivelIdiomaMockMvc.perform(put("/api/nivel-idiomas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(nivelIdioma)))
            .andExpect(status().isBadRequest());

        // Validate the NivelIdioma in the database
        List<NivelIdioma> nivelIdiomaList = nivelIdiomaRepository.findAll();
        assertThat(nivelIdiomaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteNivelIdioma() throws Exception {
        // Initialize the database
        nivelIdiomaService.save(nivelIdioma);

        int databaseSizeBeforeDelete = nivelIdiomaRepository.findAll().size();

        // Delete the nivelIdioma
        restNivelIdiomaMockMvc.perform(delete("/api/nivel-idiomas/{id}", nivelIdioma.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<NivelIdioma> nivelIdiomaList = nivelIdiomaRepository.findAll();
        assertThat(nivelIdiomaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
