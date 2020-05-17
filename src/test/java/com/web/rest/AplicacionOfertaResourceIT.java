package com.web.rest;

import com.CtProjectApp;
import com.domain.AplicacionOferta;
import com.domain.Persona;
import com.domain.Oferta;
import com.repository.AplicacionOfertaRepository;
import com.service.AplicacionOfertaService;
import com.service.dto.AplicacionOfertaCriteria;
import com.service.AplicacionOfertaQueryService;

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
 * Integration tests for the {@link AplicacionOfertaResource} REST controller.
 */
@SpringBootTest(classes = CtProjectApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class AplicacionOfertaResourceIT {

    @Autowired
    private AplicacionOfertaRepository aplicacionOfertaRepository;

    @Autowired
    private AplicacionOfertaService aplicacionOfertaService;

    @Autowired
    private AplicacionOfertaQueryService aplicacionOfertaQueryService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAplicacionOfertaMockMvc;

    private AplicacionOferta aplicacionOferta;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AplicacionOferta createEntity(EntityManager em) {
        AplicacionOferta aplicacionOferta = new AplicacionOferta();
        // Add required entity
        Persona persona;
        if (TestUtil.findAll(em, Persona.class).isEmpty()) {
            persona = PersonaResourceIT.createEntity(em);
            em.persist(persona);
            em.flush();
        } else {
            persona = TestUtil.findAll(em, Persona.class).get(0);
        }
        aplicacionOferta.setUsuario(persona);
        // Add required entity
        Oferta oferta;
        if (TestUtil.findAll(em, Oferta.class).isEmpty()) {
            oferta = OfertaResourceIT.createEntity(em);
            em.persist(oferta);
            em.flush();
        } else {
            oferta = TestUtil.findAll(em, Oferta.class).get(0);
        }
        aplicacionOferta.setOferta(oferta);
        return aplicacionOferta;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AplicacionOferta createUpdatedEntity(EntityManager em) {
        AplicacionOferta aplicacionOferta = new AplicacionOferta();
        // Add required entity
        Persona persona;
        if (TestUtil.findAll(em, Persona.class).isEmpty()) {
            persona = PersonaResourceIT.createUpdatedEntity(em);
            em.persist(persona);
            em.flush();
        } else {
            persona = TestUtil.findAll(em, Persona.class).get(0);
        }
        aplicacionOferta.setUsuario(persona);
        // Add required entity
        Oferta oferta;
        if (TestUtil.findAll(em, Oferta.class).isEmpty()) {
            oferta = OfertaResourceIT.createUpdatedEntity(em);
            em.persist(oferta);
            em.flush();
        } else {
            oferta = TestUtil.findAll(em, Oferta.class).get(0);
        }
        aplicacionOferta.setOferta(oferta);
        return aplicacionOferta;
    }

    @BeforeEach
    public void initTest() {
        aplicacionOferta = createEntity(em);
    }

    @Test
    @Transactional
    public void createAplicacionOferta() throws Exception {
        int databaseSizeBeforeCreate = aplicacionOfertaRepository.findAll().size();

        // Create the AplicacionOferta
        restAplicacionOfertaMockMvc.perform(post("/api/aplicacion-ofertas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(aplicacionOferta)))
            .andExpect(status().isCreated());

        // Validate the AplicacionOferta in the database
        List<AplicacionOferta> aplicacionOfertaList = aplicacionOfertaRepository.findAll();
        assertThat(aplicacionOfertaList).hasSize(databaseSizeBeforeCreate + 1);
        AplicacionOferta testAplicacionOferta = aplicacionOfertaList.get(aplicacionOfertaList.size() - 1);
    }

    @Test
    @Transactional
    public void createAplicacionOfertaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = aplicacionOfertaRepository.findAll().size();

        // Create the AplicacionOferta with an existing ID
        aplicacionOferta.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAplicacionOfertaMockMvc.perform(post("/api/aplicacion-ofertas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(aplicacionOferta)))
            .andExpect(status().isBadRequest());

        // Validate the AplicacionOferta in the database
        List<AplicacionOferta> aplicacionOfertaList = aplicacionOfertaRepository.findAll();
        assertThat(aplicacionOfertaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAplicacionOfertas() throws Exception {
        // Initialize the database
        aplicacionOfertaRepository.saveAndFlush(aplicacionOferta);

        // Get all the aplicacionOfertaList
        restAplicacionOfertaMockMvc.perform(get("/api/aplicacion-ofertas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(aplicacionOferta.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getAplicacionOferta() throws Exception {
        // Initialize the database
        aplicacionOfertaRepository.saveAndFlush(aplicacionOferta);

        // Get the aplicacionOferta
        restAplicacionOfertaMockMvc.perform(get("/api/aplicacion-ofertas/{id}", aplicacionOferta.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(aplicacionOferta.getId().intValue()));
    }


    @Test
    @Transactional
    public void getAplicacionOfertasByIdFiltering() throws Exception {
        // Initialize the database
        aplicacionOfertaRepository.saveAndFlush(aplicacionOferta);

        Long id = aplicacionOferta.getId();

        defaultAplicacionOfertaShouldBeFound("id.equals=" + id);
        defaultAplicacionOfertaShouldNotBeFound("id.notEquals=" + id);

        defaultAplicacionOfertaShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultAplicacionOfertaShouldNotBeFound("id.greaterThan=" + id);

        defaultAplicacionOfertaShouldBeFound("id.lessThanOrEqual=" + id);
        defaultAplicacionOfertaShouldNotBeFound("id.lessThan=" + id);
    }


    @Test
    @Transactional
    public void getAllAplicacionOfertasByUsuarioIsEqualToSomething() throws Exception {
        // Get already existing entity
        Persona usuario = aplicacionOferta.getUsuario();
        aplicacionOfertaRepository.saveAndFlush(aplicacionOferta);
        Long usuarioId = usuario.getId();

        // Get all the aplicacionOfertaList where usuario equals to usuarioId
        defaultAplicacionOfertaShouldBeFound("usuarioId.equals=" + usuarioId);

        // Get all the aplicacionOfertaList where usuario equals to usuarioId + 1
        defaultAplicacionOfertaShouldNotBeFound("usuarioId.equals=" + (usuarioId + 1));
    }


    @Test
    @Transactional
    public void getAllAplicacionOfertasByOfertaIsEqualToSomething() throws Exception {
        // Get already existing entity
        Oferta oferta = aplicacionOferta.getOferta();
        aplicacionOfertaRepository.saveAndFlush(aplicacionOferta);
        Long ofertaId = oferta.getId();

        // Get all the aplicacionOfertaList where oferta equals to ofertaId
        defaultAplicacionOfertaShouldBeFound("ofertaId.equals=" + ofertaId);

        // Get all the aplicacionOfertaList where oferta equals to ofertaId + 1
        defaultAplicacionOfertaShouldNotBeFound("ofertaId.equals=" + (ofertaId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultAplicacionOfertaShouldBeFound(String filter) throws Exception {
        restAplicacionOfertaMockMvc.perform(get("/api/aplicacion-ofertas?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(aplicacionOferta.getId().intValue())));

        // Check, that the count call also returns 1
        restAplicacionOfertaMockMvc.perform(get("/api/aplicacion-ofertas/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultAplicacionOfertaShouldNotBeFound(String filter) throws Exception {
        restAplicacionOfertaMockMvc.perform(get("/api/aplicacion-ofertas?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restAplicacionOfertaMockMvc.perform(get("/api/aplicacion-ofertas/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingAplicacionOferta() throws Exception {
        // Get the aplicacionOferta
        restAplicacionOfertaMockMvc.perform(get("/api/aplicacion-ofertas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAplicacionOferta() throws Exception {
        // Initialize the database
        aplicacionOfertaService.save(aplicacionOferta);

        int databaseSizeBeforeUpdate = aplicacionOfertaRepository.findAll().size();

        // Update the aplicacionOferta
        AplicacionOferta updatedAplicacionOferta = aplicacionOfertaRepository.findById(aplicacionOferta.getId()).get();
        // Disconnect from session so that the updates on updatedAplicacionOferta are not directly saved in db
        em.detach(updatedAplicacionOferta);

        restAplicacionOfertaMockMvc.perform(put("/api/aplicacion-ofertas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAplicacionOferta)))
            .andExpect(status().isOk());

        // Validate the AplicacionOferta in the database
        List<AplicacionOferta> aplicacionOfertaList = aplicacionOfertaRepository.findAll();
        assertThat(aplicacionOfertaList).hasSize(databaseSizeBeforeUpdate);
        AplicacionOferta testAplicacionOferta = aplicacionOfertaList.get(aplicacionOfertaList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingAplicacionOferta() throws Exception {
        int databaseSizeBeforeUpdate = aplicacionOfertaRepository.findAll().size();

        // Create the AplicacionOferta

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAplicacionOfertaMockMvc.perform(put("/api/aplicacion-ofertas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(aplicacionOferta)))
            .andExpect(status().isBadRequest());

        // Validate the AplicacionOferta in the database
        List<AplicacionOferta> aplicacionOfertaList = aplicacionOfertaRepository.findAll();
        assertThat(aplicacionOfertaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAplicacionOferta() throws Exception {
        // Initialize the database
        aplicacionOfertaService.save(aplicacionOferta);

        int databaseSizeBeforeDelete = aplicacionOfertaRepository.findAll().size();

        // Delete the aplicacionOferta
        restAplicacionOfertaMockMvc.perform(delete("/api/aplicacion-ofertas/{id}", aplicacionOferta.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AplicacionOferta> aplicacionOfertaList = aplicacionOfertaRepository.findAll();
        assertThat(aplicacionOfertaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
