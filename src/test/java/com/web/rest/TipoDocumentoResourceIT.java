package com.web.rest;

import com.CtProjectApp;
import com.domain.TipoDocumento;
import com.repository.TipoDocumentoRepository;
import com.service.TipoDocumentoService;
import com.service.dto.TipoDocumentoCriteria;
import com.service.TipoDocumentoQueryService;

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
 * Integration tests for the {@link TipoDocumentoResource} REST controller.
 */
@SpringBootTest(classes = CtProjectApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class TipoDocumentoResourceIT {

    private static final String DEFAULT_NOMBRE_TIPO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_TIPO = "BBBBBBBBBB";

    @Autowired
    private TipoDocumentoRepository tipoDocumentoRepository;

    @Autowired
    private TipoDocumentoService tipoDocumentoService;

    @Autowired
    private TipoDocumentoQueryService tipoDocumentoQueryService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTipoDocumentoMockMvc;

    private TipoDocumento tipoDocumento;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoDocumento createEntity(EntityManager em) {
        TipoDocumento tipoDocumento = new TipoDocumento()
            .nombreTipo(DEFAULT_NOMBRE_TIPO);
        return tipoDocumento;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoDocumento createUpdatedEntity(EntityManager em) {
        TipoDocumento tipoDocumento = new TipoDocumento()
            .nombreTipo(UPDATED_NOMBRE_TIPO);
        return tipoDocumento;
    }

    @BeforeEach
    public void initTest() {
        tipoDocumento = createEntity(em);
    }

    @Test
    @Transactional
    public void createTipoDocumento() throws Exception {
        int databaseSizeBeforeCreate = tipoDocumentoRepository.findAll().size();

        // Create the TipoDocumento
        restTipoDocumentoMockMvc.perform(post("/api/tipo-documentos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoDocumento)))
            .andExpect(status().isCreated());

        // Validate the TipoDocumento in the database
        List<TipoDocumento> tipoDocumentoList = tipoDocumentoRepository.findAll();
        assertThat(tipoDocumentoList).hasSize(databaseSizeBeforeCreate + 1);
        TipoDocumento testTipoDocumento = tipoDocumentoList.get(tipoDocumentoList.size() - 1);
        assertThat(testTipoDocumento.getNombreTipo()).isEqualTo(DEFAULT_NOMBRE_TIPO);
    }

    @Test
    @Transactional
    public void createTipoDocumentoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipoDocumentoRepository.findAll().size();

        // Create the TipoDocumento with an existing ID
        tipoDocumento.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoDocumentoMockMvc.perform(post("/api/tipo-documentos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoDocumento)))
            .andExpect(status().isBadRequest());

        // Validate the TipoDocumento in the database
        List<TipoDocumento> tipoDocumentoList = tipoDocumentoRepository.findAll();
        assertThat(tipoDocumentoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNombreTipoIsRequired() throws Exception {
        int databaseSizeBeforeTest = tipoDocumentoRepository.findAll().size();
        // set the field null
        tipoDocumento.setNombreTipo(null);

        // Create the TipoDocumento, which fails.

        restTipoDocumentoMockMvc.perform(post("/api/tipo-documentos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoDocumento)))
            .andExpect(status().isBadRequest());

        List<TipoDocumento> tipoDocumentoList = tipoDocumentoRepository.findAll();
        assertThat(tipoDocumentoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTipoDocumentos() throws Exception {
        // Initialize the database
        tipoDocumentoRepository.saveAndFlush(tipoDocumento);

        // Get all the tipoDocumentoList
        restTipoDocumentoMockMvc.perform(get("/api/tipo-documentos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoDocumento.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreTipo").value(hasItem(DEFAULT_NOMBRE_TIPO)));
    }
    
    @Test
    @Transactional
    public void getTipoDocumento() throws Exception {
        // Initialize the database
        tipoDocumentoRepository.saveAndFlush(tipoDocumento);

        // Get the tipoDocumento
        restTipoDocumentoMockMvc.perform(get("/api/tipo-documentos/{id}", tipoDocumento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tipoDocumento.getId().intValue()))
            .andExpect(jsonPath("$.nombreTipo").value(DEFAULT_NOMBRE_TIPO));
    }


    @Test
    @Transactional
    public void getTipoDocumentosByIdFiltering() throws Exception {
        // Initialize the database
        tipoDocumentoRepository.saveAndFlush(tipoDocumento);

        Long id = tipoDocumento.getId();

        defaultTipoDocumentoShouldBeFound("id.equals=" + id);
        defaultTipoDocumentoShouldNotBeFound("id.notEquals=" + id);

        defaultTipoDocumentoShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultTipoDocumentoShouldNotBeFound("id.greaterThan=" + id);

        defaultTipoDocumentoShouldBeFound("id.lessThanOrEqual=" + id);
        defaultTipoDocumentoShouldNotBeFound("id.lessThan=" + id);
    }


    @Test
    @Transactional
    public void getAllTipoDocumentosByNombreTipoIsEqualToSomething() throws Exception {
        // Initialize the database
        tipoDocumentoRepository.saveAndFlush(tipoDocumento);

        // Get all the tipoDocumentoList where nombreTipo equals to DEFAULT_NOMBRE_TIPO
        defaultTipoDocumentoShouldBeFound("nombreTipo.equals=" + DEFAULT_NOMBRE_TIPO);

        // Get all the tipoDocumentoList where nombreTipo equals to UPDATED_NOMBRE_TIPO
        defaultTipoDocumentoShouldNotBeFound("nombreTipo.equals=" + UPDATED_NOMBRE_TIPO);
    }

    @Test
    @Transactional
    public void getAllTipoDocumentosByNombreTipoIsNotEqualToSomething() throws Exception {
        // Initialize the database
        tipoDocumentoRepository.saveAndFlush(tipoDocumento);

        // Get all the tipoDocumentoList where nombreTipo not equals to DEFAULT_NOMBRE_TIPO
        defaultTipoDocumentoShouldNotBeFound("nombreTipo.notEquals=" + DEFAULT_NOMBRE_TIPO);

        // Get all the tipoDocumentoList where nombreTipo not equals to UPDATED_NOMBRE_TIPO
        defaultTipoDocumentoShouldBeFound("nombreTipo.notEquals=" + UPDATED_NOMBRE_TIPO);
    }

    @Test
    @Transactional
    public void getAllTipoDocumentosByNombreTipoIsInShouldWork() throws Exception {
        // Initialize the database
        tipoDocumentoRepository.saveAndFlush(tipoDocumento);

        // Get all the tipoDocumentoList where nombreTipo in DEFAULT_NOMBRE_TIPO or UPDATED_NOMBRE_TIPO
        defaultTipoDocumentoShouldBeFound("nombreTipo.in=" + DEFAULT_NOMBRE_TIPO + "," + UPDATED_NOMBRE_TIPO);

        // Get all the tipoDocumentoList where nombreTipo equals to UPDATED_NOMBRE_TIPO
        defaultTipoDocumentoShouldNotBeFound("nombreTipo.in=" + UPDATED_NOMBRE_TIPO);
    }

    @Test
    @Transactional
    public void getAllTipoDocumentosByNombreTipoIsNullOrNotNull() throws Exception {
        // Initialize the database
        tipoDocumentoRepository.saveAndFlush(tipoDocumento);

        // Get all the tipoDocumentoList where nombreTipo is not null
        defaultTipoDocumentoShouldBeFound("nombreTipo.specified=true");

        // Get all the tipoDocumentoList where nombreTipo is null
        defaultTipoDocumentoShouldNotBeFound("nombreTipo.specified=false");
    }
                @Test
    @Transactional
    public void getAllTipoDocumentosByNombreTipoContainsSomething() throws Exception {
        // Initialize the database
        tipoDocumentoRepository.saveAndFlush(tipoDocumento);

        // Get all the tipoDocumentoList where nombreTipo contains DEFAULT_NOMBRE_TIPO
        defaultTipoDocumentoShouldBeFound("nombreTipo.contains=" + DEFAULT_NOMBRE_TIPO);

        // Get all the tipoDocumentoList where nombreTipo contains UPDATED_NOMBRE_TIPO
        defaultTipoDocumentoShouldNotBeFound("nombreTipo.contains=" + UPDATED_NOMBRE_TIPO);
    }

    @Test
    @Transactional
    public void getAllTipoDocumentosByNombreTipoNotContainsSomething() throws Exception {
        // Initialize the database
        tipoDocumentoRepository.saveAndFlush(tipoDocumento);

        // Get all the tipoDocumentoList where nombreTipo does not contain DEFAULT_NOMBRE_TIPO
        defaultTipoDocumentoShouldNotBeFound("nombreTipo.doesNotContain=" + DEFAULT_NOMBRE_TIPO);

        // Get all the tipoDocumentoList where nombreTipo does not contain UPDATED_NOMBRE_TIPO
        defaultTipoDocumentoShouldBeFound("nombreTipo.doesNotContain=" + UPDATED_NOMBRE_TIPO);
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultTipoDocumentoShouldBeFound(String filter) throws Exception {
        restTipoDocumentoMockMvc.perform(get("/api/tipo-documentos?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoDocumento.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreTipo").value(hasItem(DEFAULT_NOMBRE_TIPO)));

        // Check, that the count call also returns 1
        restTipoDocumentoMockMvc.perform(get("/api/tipo-documentos/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultTipoDocumentoShouldNotBeFound(String filter) throws Exception {
        restTipoDocumentoMockMvc.perform(get("/api/tipo-documentos?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restTipoDocumentoMockMvc.perform(get("/api/tipo-documentos/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingTipoDocumento() throws Exception {
        // Get the tipoDocumento
        restTipoDocumentoMockMvc.perform(get("/api/tipo-documentos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTipoDocumento() throws Exception {
        // Initialize the database
        tipoDocumentoService.save(tipoDocumento);

        int databaseSizeBeforeUpdate = tipoDocumentoRepository.findAll().size();

        // Update the tipoDocumento
        TipoDocumento updatedTipoDocumento = tipoDocumentoRepository.findById(tipoDocumento.getId()).get();
        // Disconnect from session so that the updates on updatedTipoDocumento are not directly saved in db
        em.detach(updatedTipoDocumento);
        updatedTipoDocumento
            .nombreTipo(UPDATED_NOMBRE_TIPO);

        restTipoDocumentoMockMvc.perform(put("/api/tipo-documentos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTipoDocumento)))
            .andExpect(status().isOk());

        // Validate the TipoDocumento in the database
        List<TipoDocumento> tipoDocumentoList = tipoDocumentoRepository.findAll();
        assertThat(tipoDocumentoList).hasSize(databaseSizeBeforeUpdate);
        TipoDocumento testTipoDocumento = tipoDocumentoList.get(tipoDocumentoList.size() - 1);
        assertThat(testTipoDocumento.getNombreTipo()).isEqualTo(UPDATED_NOMBRE_TIPO);
    }

    @Test
    @Transactional
    public void updateNonExistingTipoDocumento() throws Exception {
        int databaseSizeBeforeUpdate = tipoDocumentoRepository.findAll().size();

        // Create the TipoDocumento

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoDocumentoMockMvc.perform(put("/api/tipo-documentos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoDocumento)))
            .andExpect(status().isBadRequest());

        // Validate the TipoDocumento in the database
        List<TipoDocumento> tipoDocumentoList = tipoDocumentoRepository.findAll();
        assertThat(tipoDocumentoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTipoDocumento() throws Exception {
        // Initialize the database
        tipoDocumentoService.save(tipoDocumento);

        int databaseSizeBeforeDelete = tipoDocumentoRepository.findAll().size();

        // Delete the tipoDocumento
        restTipoDocumentoMockMvc.perform(delete("/api/tipo-documentos/{id}", tipoDocumento.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TipoDocumento> tipoDocumentoList = tipoDocumentoRepository.findAll();
        assertThat(tipoDocumentoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
