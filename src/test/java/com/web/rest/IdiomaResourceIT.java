package com.web.rest;

import com.CtProjectApp;
import com.domain.Idioma;
import com.repository.IdiomaRepository;
import com.service.IdiomaService;
import com.service.dto.IdiomaCriteria;
import com.service.IdiomaQueryService;

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
 * Integration tests for the {@link IdiomaResource} REST controller.
 */
@SpringBootTest(classes = CtProjectApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class IdiomaResourceIT {

    private static final String DEFAULT_IDIOMA = "AAAAAAAAAA";
    private static final String UPDATED_IDIOMA = "BBBBBBBBBB";

    @Autowired
    private IdiomaRepository idiomaRepository;

    @Autowired
    private IdiomaService idiomaService;

    @Autowired
    private IdiomaQueryService idiomaQueryService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restIdiomaMockMvc;

    private Idioma idioma;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Idioma createEntity(EntityManager em) {
        Idioma idioma = new Idioma()
            .idioma(DEFAULT_IDIOMA);
        return idioma;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Idioma createUpdatedEntity(EntityManager em) {
        Idioma idioma = new Idioma()
            .idioma(UPDATED_IDIOMA);
        return idioma;
    }

    @BeforeEach
    public void initTest() {
        idioma = createEntity(em);
    }

    @Test
    @Transactional
    public void createIdioma() throws Exception {
        int databaseSizeBeforeCreate = idiomaRepository.findAll().size();

        // Create the Idioma
        restIdiomaMockMvc.perform(post("/api/idiomas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(idioma)))
            .andExpect(status().isCreated());

        // Validate the Idioma in the database
        List<Idioma> idiomaList = idiomaRepository.findAll();
        assertThat(idiomaList).hasSize(databaseSizeBeforeCreate + 1);
        Idioma testIdioma = idiomaList.get(idiomaList.size() - 1);
        assertThat(testIdioma.getIdioma()).isEqualTo(DEFAULT_IDIOMA);
    }

    @Test
    @Transactional
    public void createIdiomaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = idiomaRepository.findAll().size();

        // Create the Idioma with an existing ID
        idioma.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restIdiomaMockMvc.perform(post("/api/idiomas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(idioma)))
            .andExpect(status().isBadRequest());

        // Validate the Idioma in the database
        List<Idioma> idiomaList = idiomaRepository.findAll();
        assertThat(idiomaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkIdiomaIsRequired() throws Exception {
        int databaseSizeBeforeTest = idiomaRepository.findAll().size();
        // set the field null
        idioma.setIdioma(null);

        // Create the Idioma, which fails.

        restIdiomaMockMvc.perform(post("/api/idiomas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(idioma)))
            .andExpect(status().isBadRequest());

        List<Idioma> idiomaList = idiomaRepository.findAll();
        assertThat(idiomaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllIdiomas() throws Exception {
        // Initialize the database
        idiomaRepository.saveAndFlush(idioma);

        // Get all the idiomaList
        restIdiomaMockMvc.perform(get("/api/idiomas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(idioma.getId().intValue())))
            .andExpect(jsonPath("$.[*].idioma").value(hasItem(DEFAULT_IDIOMA)));
    }
    
    @Test
    @Transactional
    public void getIdioma() throws Exception {
        // Initialize the database
        idiomaRepository.saveAndFlush(idioma);

        // Get the idioma
        restIdiomaMockMvc.perform(get("/api/idiomas/{id}", idioma.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(idioma.getId().intValue()))
            .andExpect(jsonPath("$.idioma").value(DEFAULT_IDIOMA));
    }


    @Test
    @Transactional
    public void getIdiomasByIdFiltering() throws Exception {
        // Initialize the database
        idiomaRepository.saveAndFlush(idioma);

        Long id = idioma.getId();

        defaultIdiomaShouldBeFound("id.equals=" + id);
        defaultIdiomaShouldNotBeFound("id.notEquals=" + id);

        defaultIdiomaShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultIdiomaShouldNotBeFound("id.greaterThan=" + id);

        defaultIdiomaShouldBeFound("id.lessThanOrEqual=" + id);
        defaultIdiomaShouldNotBeFound("id.lessThan=" + id);
    }


    @Test
    @Transactional
    public void getAllIdiomasByIdiomaIsEqualToSomething() throws Exception {
        // Initialize the database
        idiomaRepository.saveAndFlush(idioma);

        // Get all the idiomaList where idioma equals to DEFAULT_IDIOMA
        defaultIdiomaShouldBeFound("idioma.equals=" + DEFAULT_IDIOMA);

        // Get all the idiomaList where idioma equals to UPDATED_IDIOMA
        defaultIdiomaShouldNotBeFound("idioma.equals=" + UPDATED_IDIOMA);
    }

    @Test
    @Transactional
    public void getAllIdiomasByIdiomaIsNotEqualToSomething() throws Exception {
        // Initialize the database
        idiomaRepository.saveAndFlush(idioma);

        // Get all the idiomaList where idioma not equals to DEFAULT_IDIOMA
        defaultIdiomaShouldNotBeFound("idioma.notEquals=" + DEFAULT_IDIOMA);

        // Get all the idiomaList where idioma not equals to UPDATED_IDIOMA
        defaultIdiomaShouldBeFound("idioma.notEquals=" + UPDATED_IDIOMA);
    }

    @Test
    @Transactional
    public void getAllIdiomasByIdiomaIsInShouldWork() throws Exception {
        // Initialize the database
        idiomaRepository.saveAndFlush(idioma);

        // Get all the idiomaList where idioma in DEFAULT_IDIOMA or UPDATED_IDIOMA
        defaultIdiomaShouldBeFound("idioma.in=" + DEFAULT_IDIOMA + "," + UPDATED_IDIOMA);

        // Get all the idiomaList where idioma equals to UPDATED_IDIOMA
        defaultIdiomaShouldNotBeFound("idioma.in=" + UPDATED_IDIOMA);
    }

    @Test
    @Transactional
    public void getAllIdiomasByIdiomaIsNullOrNotNull() throws Exception {
        // Initialize the database
        idiomaRepository.saveAndFlush(idioma);

        // Get all the idiomaList where idioma is not null
        defaultIdiomaShouldBeFound("idioma.specified=true");

        // Get all the idiomaList where idioma is null
        defaultIdiomaShouldNotBeFound("idioma.specified=false");
    }
                @Test
    @Transactional
    public void getAllIdiomasByIdiomaContainsSomething() throws Exception {
        // Initialize the database
        idiomaRepository.saveAndFlush(idioma);

        // Get all the idiomaList where idioma contains DEFAULT_IDIOMA
        defaultIdiomaShouldBeFound("idioma.contains=" + DEFAULT_IDIOMA);

        // Get all the idiomaList where idioma contains UPDATED_IDIOMA
        defaultIdiomaShouldNotBeFound("idioma.contains=" + UPDATED_IDIOMA);
    }

    @Test
    @Transactional
    public void getAllIdiomasByIdiomaNotContainsSomething() throws Exception {
        // Initialize the database
        idiomaRepository.saveAndFlush(idioma);

        // Get all the idiomaList where idioma does not contain DEFAULT_IDIOMA
        defaultIdiomaShouldNotBeFound("idioma.doesNotContain=" + DEFAULT_IDIOMA);

        // Get all the idiomaList where idioma does not contain UPDATED_IDIOMA
        defaultIdiomaShouldBeFound("idioma.doesNotContain=" + UPDATED_IDIOMA);
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultIdiomaShouldBeFound(String filter) throws Exception {
        restIdiomaMockMvc.perform(get("/api/idiomas?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(idioma.getId().intValue())))
            .andExpect(jsonPath("$.[*].idioma").value(hasItem(DEFAULT_IDIOMA)));

        // Check, that the count call also returns 1
        restIdiomaMockMvc.perform(get("/api/idiomas/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultIdiomaShouldNotBeFound(String filter) throws Exception {
        restIdiomaMockMvc.perform(get("/api/idiomas?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restIdiomaMockMvc.perform(get("/api/idiomas/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingIdioma() throws Exception {
        // Get the idioma
        restIdiomaMockMvc.perform(get("/api/idiomas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateIdioma() throws Exception {
        // Initialize the database
        idiomaService.save(idioma);

        int databaseSizeBeforeUpdate = idiomaRepository.findAll().size();

        // Update the idioma
        Idioma updatedIdioma = idiomaRepository.findById(idioma.getId()).get();
        // Disconnect from session so that the updates on updatedIdioma are not directly saved in db
        em.detach(updatedIdioma);
        updatedIdioma
            .idioma(UPDATED_IDIOMA);

        restIdiomaMockMvc.perform(put("/api/idiomas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedIdioma)))
            .andExpect(status().isOk());

        // Validate the Idioma in the database
        List<Idioma> idiomaList = idiomaRepository.findAll();
        assertThat(idiomaList).hasSize(databaseSizeBeforeUpdate);
        Idioma testIdioma = idiomaList.get(idiomaList.size() - 1);
        assertThat(testIdioma.getIdioma()).isEqualTo(UPDATED_IDIOMA);
    }

    @Test
    @Transactional
    public void updateNonExistingIdioma() throws Exception {
        int databaseSizeBeforeUpdate = idiomaRepository.findAll().size();

        // Create the Idioma

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restIdiomaMockMvc.perform(put("/api/idiomas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(idioma)))
            .andExpect(status().isBadRequest());

        // Validate the Idioma in the database
        List<Idioma> idiomaList = idiomaRepository.findAll();
        assertThat(idiomaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteIdioma() throws Exception {
        // Initialize the database
        idiomaService.save(idioma);

        int databaseSizeBeforeDelete = idiomaRepository.findAll().size();

        // Delete the idioma
        restIdiomaMockMvc.perform(delete("/api/idiomas/{id}", idioma.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Idioma> idiomaList = idiomaRepository.findAll();
        assertThat(idiomaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
