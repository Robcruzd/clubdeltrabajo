package com.web.rest;

import com.CtProjectApp;
import com.domain.TipoUsuario;
import com.repository.TipoUsuarioRepository;
import com.service.TipoUsuarioService;
import com.service.dto.TipoUsuarioCriteria;
import com.service.TipoUsuarioQueryService;

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
 * Integration tests for the {@link TipoUsuarioResource} REST controller.
 */
@SpringBootTest(classes = CtProjectApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class TipoUsuarioResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    @Autowired
    private TipoUsuarioRepository tipoUsuarioRepository;

    @Autowired
    private TipoUsuarioService tipoUsuarioService;

    @Autowired
    private TipoUsuarioQueryService tipoUsuarioQueryService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTipoUsuarioMockMvc;

    private TipoUsuario tipoUsuario;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoUsuario createEntity(EntityManager em) {
        TipoUsuario tipoUsuario = new TipoUsuario()
            .nombre(DEFAULT_NOMBRE);
        return tipoUsuario;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoUsuario createUpdatedEntity(EntityManager em) {
        TipoUsuario tipoUsuario = new TipoUsuario()
            .nombre(UPDATED_NOMBRE);
        return tipoUsuario;
    }

    @BeforeEach
    public void initTest() {
        tipoUsuario = createEntity(em);
    }

    @Test
    @Transactional
    public void createTipoUsuario() throws Exception {
        int databaseSizeBeforeCreate = tipoUsuarioRepository.findAll().size();

        // Create the TipoUsuario
        restTipoUsuarioMockMvc.perform(post("/api/tipo-usuarios")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoUsuario)))
            .andExpect(status().isCreated());

        // Validate the TipoUsuario in the database
        List<TipoUsuario> tipoUsuarioList = tipoUsuarioRepository.findAll();
        assertThat(tipoUsuarioList).hasSize(databaseSizeBeforeCreate + 1);
        TipoUsuario testTipoUsuario = tipoUsuarioList.get(tipoUsuarioList.size() - 1);
        assertThat(testTipoUsuario.getNombre()).isEqualTo(DEFAULT_NOMBRE);
    }

    @Test
    @Transactional
    public void createTipoUsuarioWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipoUsuarioRepository.findAll().size();

        // Create the TipoUsuario with an existing ID
        tipoUsuario.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoUsuarioMockMvc.perform(post("/api/tipo-usuarios")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoUsuario)))
            .andExpect(status().isBadRequest());

        // Validate the TipoUsuario in the database
        List<TipoUsuario> tipoUsuarioList = tipoUsuarioRepository.findAll();
        assertThat(tipoUsuarioList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = tipoUsuarioRepository.findAll().size();
        // set the field null
        tipoUsuario.setNombre(null);

        // Create the TipoUsuario, which fails.

        restTipoUsuarioMockMvc.perform(post("/api/tipo-usuarios")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoUsuario)))
            .andExpect(status().isBadRequest());

        List<TipoUsuario> tipoUsuarioList = tipoUsuarioRepository.findAll();
        assertThat(tipoUsuarioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTipoUsuarios() throws Exception {
        // Initialize the database
        tipoUsuarioRepository.saveAndFlush(tipoUsuario);

        // Get all the tipoUsuarioList
        restTipoUsuarioMockMvc.perform(get("/api/tipo-usuarios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoUsuario.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)));
    }
    
    @Test
    @Transactional
    public void getTipoUsuario() throws Exception {
        // Initialize the database
        tipoUsuarioRepository.saveAndFlush(tipoUsuario);

        // Get the tipoUsuario
        restTipoUsuarioMockMvc.perform(get("/api/tipo-usuarios/{id}", tipoUsuario.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tipoUsuario.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE));
    }


    @Test
    @Transactional
    public void getTipoUsuariosByIdFiltering() throws Exception {
        // Initialize the database
        tipoUsuarioRepository.saveAndFlush(tipoUsuario);

        Long id = tipoUsuario.getId();

        defaultTipoUsuarioShouldBeFound("id.equals=" + id);
        defaultTipoUsuarioShouldNotBeFound("id.notEquals=" + id);

        defaultTipoUsuarioShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultTipoUsuarioShouldNotBeFound("id.greaterThan=" + id);

        defaultTipoUsuarioShouldBeFound("id.lessThanOrEqual=" + id);
        defaultTipoUsuarioShouldNotBeFound("id.lessThan=" + id);
    }


    @Test
    @Transactional
    public void getAllTipoUsuariosByNombreIsEqualToSomething() throws Exception {
        // Initialize the database
        tipoUsuarioRepository.saveAndFlush(tipoUsuario);

        // Get all the tipoUsuarioList where nombre equals to DEFAULT_NOMBRE
        defaultTipoUsuarioShouldBeFound("nombre.equals=" + DEFAULT_NOMBRE);

        // Get all the tipoUsuarioList where nombre equals to UPDATED_NOMBRE
        defaultTipoUsuarioShouldNotBeFound("nombre.equals=" + UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    public void getAllTipoUsuariosByNombreIsNotEqualToSomething() throws Exception {
        // Initialize the database
        tipoUsuarioRepository.saveAndFlush(tipoUsuario);

        // Get all the tipoUsuarioList where nombre not equals to DEFAULT_NOMBRE
        defaultTipoUsuarioShouldNotBeFound("nombre.notEquals=" + DEFAULT_NOMBRE);

        // Get all the tipoUsuarioList where nombre not equals to UPDATED_NOMBRE
        defaultTipoUsuarioShouldBeFound("nombre.notEquals=" + UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    public void getAllTipoUsuariosByNombreIsInShouldWork() throws Exception {
        // Initialize the database
        tipoUsuarioRepository.saveAndFlush(tipoUsuario);

        // Get all the tipoUsuarioList where nombre in DEFAULT_NOMBRE or UPDATED_NOMBRE
        defaultTipoUsuarioShouldBeFound("nombre.in=" + DEFAULT_NOMBRE + "," + UPDATED_NOMBRE);

        // Get all the tipoUsuarioList where nombre equals to UPDATED_NOMBRE
        defaultTipoUsuarioShouldNotBeFound("nombre.in=" + UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    public void getAllTipoUsuariosByNombreIsNullOrNotNull() throws Exception {
        // Initialize the database
        tipoUsuarioRepository.saveAndFlush(tipoUsuario);

        // Get all the tipoUsuarioList where nombre is not null
        defaultTipoUsuarioShouldBeFound("nombre.specified=true");

        // Get all the tipoUsuarioList where nombre is null
        defaultTipoUsuarioShouldNotBeFound("nombre.specified=false");
    }
                @Test
    @Transactional
    public void getAllTipoUsuariosByNombreContainsSomething() throws Exception {
        // Initialize the database
        tipoUsuarioRepository.saveAndFlush(tipoUsuario);

        // Get all the tipoUsuarioList where nombre contains DEFAULT_NOMBRE
        defaultTipoUsuarioShouldBeFound("nombre.contains=" + DEFAULT_NOMBRE);

        // Get all the tipoUsuarioList where nombre contains UPDATED_NOMBRE
        defaultTipoUsuarioShouldNotBeFound("nombre.contains=" + UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    public void getAllTipoUsuariosByNombreNotContainsSomething() throws Exception {
        // Initialize the database
        tipoUsuarioRepository.saveAndFlush(tipoUsuario);

        // Get all the tipoUsuarioList where nombre does not contain DEFAULT_NOMBRE
        defaultTipoUsuarioShouldNotBeFound("nombre.doesNotContain=" + DEFAULT_NOMBRE);

        // Get all the tipoUsuarioList where nombre does not contain UPDATED_NOMBRE
        defaultTipoUsuarioShouldBeFound("nombre.doesNotContain=" + UPDATED_NOMBRE);
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultTipoUsuarioShouldBeFound(String filter) throws Exception {
        restTipoUsuarioMockMvc.perform(get("/api/tipo-usuarios?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoUsuario.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)));

        // Check, that the count call also returns 1
        restTipoUsuarioMockMvc.perform(get("/api/tipo-usuarios/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultTipoUsuarioShouldNotBeFound(String filter) throws Exception {
        restTipoUsuarioMockMvc.perform(get("/api/tipo-usuarios?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restTipoUsuarioMockMvc.perform(get("/api/tipo-usuarios/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingTipoUsuario() throws Exception {
        // Get the tipoUsuario
        restTipoUsuarioMockMvc.perform(get("/api/tipo-usuarios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTipoUsuario() throws Exception {
        // Initialize the database
        tipoUsuarioService.save(tipoUsuario);

        int databaseSizeBeforeUpdate = tipoUsuarioRepository.findAll().size();

        // Update the tipoUsuario
        TipoUsuario updatedTipoUsuario = tipoUsuarioRepository.findById(tipoUsuario.getId()).get();
        // Disconnect from session so that the updates on updatedTipoUsuario are not directly saved in db
        em.detach(updatedTipoUsuario);
        updatedTipoUsuario
            .nombre(UPDATED_NOMBRE);

        restTipoUsuarioMockMvc.perform(put("/api/tipo-usuarios")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTipoUsuario)))
            .andExpect(status().isOk());

        // Validate the TipoUsuario in the database
        List<TipoUsuario> tipoUsuarioList = tipoUsuarioRepository.findAll();
        assertThat(tipoUsuarioList).hasSize(databaseSizeBeforeUpdate);
        TipoUsuario testTipoUsuario = tipoUsuarioList.get(tipoUsuarioList.size() - 1);
        assertThat(testTipoUsuario.getNombre()).isEqualTo(UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    public void updateNonExistingTipoUsuario() throws Exception {
        int databaseSizeBeforeUpdate = tipoUsuarioRepository.findAll().size();

        // Create the TipoUsuario

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoUsuarioMockMvc.perform(put("/api/tipo-usuarios")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoUsuario)))
            .andExpect(status().isBadRequest());

        // Validate the TipoUsuario in the database
        List<TipoUsuario> tipoUsuarioList = tipoUsuarioRepository.findAll();
        assertThat(tipoUsuarioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTipoUsuario() throws Exception {
        // Initialize the database
        tipoUsuarioService.save(tipoUsuario);

        int databaseSizeBeforeDelete = tipoUsuarioRepository.findAll().size();

        // Delete the tipoUsuario
        restTipoUsuarioMockMvc.perform(delete("/api/tipo-usuarios/{id}", tipoUsuario.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TipoUsuario> tipoUsuarioList = tipoUsuarioRepository.findAll();
        assertThat(tipoUsuarioList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
