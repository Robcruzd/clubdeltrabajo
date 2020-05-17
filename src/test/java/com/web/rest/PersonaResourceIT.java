package com.web.rest;

import com.CtProjectApp;
import com.domain.Persona;
import com.domain.TipoUsuario;
import com.domain.Usuario;
import com.domain.TipoDocumento;
import com.repository.PersonaRepository;
import com.service.PersonaService;
import com.service.dto.PersonaCriteria;
import com.service.PersonaQueryService;

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
 * Integration tests for the {@link PersonaResource} REST controller.
 */
@SpringBootTest(classes = CtProjectApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class PersonaResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_APELLIDO = "AAAAAAAAAA";
    private static final String UPDATED_APELLIDO = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    @Autowired
    private PersonaRepository personaRepository;

    @Autowired
    private PersonaService personaService;

    @Autowired
    private PersonaQueryService personaQueryService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPersonaMockMvc;

    private Persona persona;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Persona createEntity(EntityManager em) {
        Persona persona = new Persona()
            .nombre(DEFAULT_NOMBRE)
            .apellido(DEFAULT_APELLIDO)
            .email(DEFAULT_EMAIL);
        // Add required entity
        TipoUsuario tipoUsuario;
        if (TestUtil.findAll(em, TipoUsuario.class).isEmpty()) {
            tipoUsuario = TipoUsuarioResourceIT.createEntity(em);
            em.persist(tipoUsuario);
            em.flush();
        } else {
            tipoUsuario = TestUtil.findAll(em, TipoUsuario.class).get(0);
        }
        persona.setTipoUsuario(tipoUsuario);
        // Add required entity
        Usuario usuario;
        if (TestUtil.findAll(em, Usuario.class).isEmpty()) {
            usuario = UsuarioResourceIT.createEntity(em);
            em.persist(usuario);
            em.flush();
        } else {
            usuario = TestUtil.findAll(em, Usuario.class).get(0);
        }
        persona.setNumeroDocumento(usuario);
        // Add required entity
        TipoDocumento tipoDocumento;
        if (TestUtil.findAll(em, TipoDocumento.class).isEmpty()) {
            tipoDocumento = TipoDocumentoResourceIT.createEntity(em);
            em.persist(tipoDocumento);
            em.flush();
        } else {
            tipoDocumento = TestUtil.findAll(em, TipoDocumento.class).get(0);
        }
        persona.setTipoDocumento(tipoDocumento);
        return persona;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Persona createUpdatedEntity(EntityManager em) {
        Persona persona = new Persona()
            .nombre(UPDATED_NOMBRE)
            .apellido(UPDATED_APELLIDO)
            .email(UPDATED_EMAIL);
        // Add required entity
        TipoUsuario tipoUsuario;
        if (TestUtil.findAll(em, TipoUsuario.class).isEmpty()) {
            tipoUsuario = TipoUsuarioResourceIT.createUpdatedEntity(em);
            em.persist(tipoUsuario);
            em.flush();
        } else {
            tipoUsuario = TestUtil.findAll(em, TipoUsuario.class).get(0);
        }
        persona.setTipoUsuario(tipoUsuario);
        // Add required entity
        Usuario usuario;
        if (TestUtil.findAll(em, Usuario.class).isEmpty()) {
            usuario = UsuarioResourceIT.createUpdatedEntity(em);
            em.persist(usuario);
            em.flush();
        } else {
            usuario = TestUtil.findAll(em, Usuario.class).get(0);
        }
        persona.setNumeroDocumento(usuario);
        // Add required entity
        TipoDocumento tipoDocumento;
        if (TestUtil.findAll(em, TipoDocumento.class).isEmpty()) {
            tipoDocumento = TipoDocumentoResourceIT.createUpdatedEntity(em);
            em.persist(tipoDocumento);
            em.flush();
        } else {
            tipoDocumento = TestUtil.findAll(em, TipoDocumento.class).get(0);
        }
        persona.setTipoDocumento(tipoDocumento);
        return persona;
    }

    @BeforeEach
    public void initTest() {
        persona = createEntity(em);
    }

    @Test
    @Transactional
    public void createPersona() throws Exception {
        int databaseSizeBeforeCreate = personaRepository.findAll().size();

        // Create the Persona
        restPersonaMockMvc.perform(post("/api/personas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(persona)))
            .andExpect(status().isCreated());

        // Validate the Persona in the database
        List<Persona> personaList = personaRepository.findAll();
        assertThat(personaList).hasSize(databaseSizeBeforeCreate + 1);
        Persona testPersona = personaList.get(personaList.size() - 1);
        assertThat(testPersona.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testPersona.getApellido()).isEqualTo(DEFAULT_APELLIDO);
        assertThat(testPersona.getEmail()).isEqualTo(DEFAULT_EMAIL);
    }

    @Test
    @Transactional
    public void createPersonaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = personaRepository.findAll().size();

        // Create the Persona with an existing ID
        persona.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPersonaMockMvc.perform(post("/api/personas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(persona)))
            .andExpect(status().isBadRequest());

        // Validate the Persona in the database
        List<Persona> personaList = personaRepository.findAll();
        assertThat(personaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = personaRepository.findAll().size();
        // set the field null
        persona.setNombre(null);

        // Create the Persona, which fails.

        restPersonaMockMvc.perform(post("/api/personas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(persona)))
            .andExpect(status().isBadRequest());

        List<Persona> personaList = personaRepository.findAll();
        assertThat(personaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkApellidoIsRequired() throws Exception {
        int databaseSizeBeforeTest = personaRepository.findAll().size();
        // set the field null
        persona.setApellido(null);

        // Create the Persona, which fails.

        restPersonaMockMvc.perform(post("/api/personas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(persona)))
            .andExpect(status().isBadRequest());

        List<Persona> personaList = personaRepository.findAll();
        assertThat(personaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = personaRepository.findAll().size();
        // set the field null
        persona.setEmail(null);

        // Create the Persona, which fails.

        restPersonaMockMvc.perform(post("/api/personas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(persona)))
            .andExpect(status().isBadRequest());

        List<Persona> personaList = personaRepository.findAll();
        assertThat(personaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPersonas() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);

        // Get all the personaList
        restPersonaMockMvc.perform(get("/api/personas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(persona.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].apellido").value(hasItem(DEFAULT_APELLIDO)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)));
    }
    
    @Test
    @Transactional
    public void getPersona() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);

        // Get the persona
        restPersonaMockMvc.perform(get("/api/personas/{id}", persona.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(persona.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE))
            .andExpect(jsonPath("$.apellido").value(DEFAULT_APELLIDO))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL));
    }


    @Test
    @Transactional
    public void getPersonasByIdFiltering() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);

        Long id = persona.getId();

        defaultPersonaShouldBeFound("id.equals=" + id);
        defaultPersonaShouldNotBeFound("id.notEquals=" + id);

        defaultPersonaShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultPersonaShouldNotBeFound("id.greaterThan=" + id);

        defaultPersonaShouldBeFound("id.lessThanOrEqual=" + id);
        defaultPersonaShouldNotBeFound("id.lessThan=" + id);
    }


    @Test
    @Transactional
    public void getAllPersonasByNombreIsEqualToSomething() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);

        // Get all the personaList where nombre equals to DEFAULT_NOMBRE
        defaultPersonaShouldBeFound("nombre.equals=" + DEFAULT_NOMBRE);

        // Get all the personaList where nombre equals to UPDATED_NOMBRE
        defaultPersonaShouldNotBeFound("nombre.equals=" + UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    public void getAllPersonasByNombreIsNotEqualToSomething() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);

        // Get all the personaList where nombre not equals to DEFAULT_NOMBRE
        defaultPersonaShouldNotBeFound("nombre.notEquals=" + DEFAULT_NOMBRE);

        // Get all the personaList where nombre not equals to UPDATED_NOMBRE
        defaultPersonaShouldBeFound("nombre.notEquals=" + UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    public void getAllPersonasByNombreIsInShouldWork() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);

        // Get all the personaList where nombre in DEFAULT_NOMBRE or UPDATED_NOMBRE
        defaultPersonaShouldBeFound("nombre.in=" + DEFAULT_NOMBRE + "," + UPDATED_NOMBRE);

        // Get all the personaList where nombre equals to UPDATED_NOMBRE
        defaultPersonaShouldNotBeFound("nombre.in=" + UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    public void getAllPersonasByNombreIsNullOrNotNull() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);

        // Get all the personaList where nombre is not null
        defaultPersonaShouldBeFound("nombre.specified=true");

        // Get all the personaList where nombre is null
        defaultPersonaShouldNotBeFound("nombre.specified=false");
    }
                @Test
    @Transactional
    public void getAllPersonasByNombreContainsSomething() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);

        // Get all the personaList where nombre contains DEFAULT_NOMBRE
        defaultPersonaShouldBeFound("nombre.contains=" + DEFAULT_NOMBRE);

        // Get all the personaList where nombre contains UPDATED_NOMBRE
        defaultPersonaShouldNotBeFound("nombre.contains=" + UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    public void getAllPersonasByNombreNotContainsSomething() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);

        // Get all the personaList where nombre does not contain DEFAULT_NOMBRE
        defaultPersonaShouldNotBeFound("nombre.doesNotContain=" + DEFAULT_NOMBRE);

        // Get all the personaList where nombre does not contain UPDATED_NOMBRE
        defaultPersonaShouldBeFound("nombre.doesNotContain=" + UPDATED_NOMBRE);
    }


    @Test
    @Transactional
    public void getAllPersonasByApellidoIsEqualToSomething() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);

        // Get all the personaList where apellido equals to DEFAULT_APELLIDO
        defaultPersonaShouldBeFound("apellido.equals=" + DEFAULT_APELLIDO);

        // Get all the personaList where apellido equals to UPDATED_APELLIDO
        defaultPersonaShouldNotBeFound("apellido.equals=" + UPDATED_APELLIDO);
    }

    @Test
    @Transactional
    public void getAllPersonasByApellidoIsNotEqualToSomething() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);

        // Get all the personaList where apellido not equals to DEFAULT_APELLIDO
        defaultPersonaShouldNotBeFound("apellido.notEquals=" + DEFAULT_APELLIDO);

        // Get all the personaList where apellido not equals to UPDATED_APELLIDO
        defaultPersonaShouldBeFound("apellido.notEquals=" + UPDATED_APELLIDO);
    }

    @Test
    @Transactional
    public void getAllPersonasByApellidoIsInShouldWork() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);

        // Get all the personaList where apellido in DEFAULT_APELLIDO or UPDATED_APELLIDO
        defaultPersonaShouldBeFound("apellido.in=" + DEFAULT_APELLIDO + "," + UPDATED_APELLIDO);

        // Get all the personaList where apellido equals to UPDATED_APELLIDO
        defaultPersonaShouldNotBeFound("apellido.in=" + UPDATED_APELLIDO);
    }

    @Test
    @Transactional
    public void getAllPersonasByApellidoIsNullOrNotNull() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);

        // Get all the personaList where apellido is not null
        defaultPersonaShouldBeFound("apellido.specified=true");

        // Get all the personaList where apellido is null
        defaultPersonaShouldNotBeFound("apellido.specified=false");
    }
                @Test
    @Transactional
    public void getAllPersonasByApellidoContainsSomething() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);

        // Get all the personaList where apellido contains DEFAULT_APELLIDO
        defaultPersonaShouldBeFound("apellido.contains=" + DEFAULT_APELLIDO);

        // Get all the personaList where apellido contains UPDATED_APELLIDO
        defaultPersonaShouldNotBeFound("apellido.contains=" + UPDATED_APELLIDO);
    }

    @Test
    @Transactional
    public void getAllPersonasByApellidoNotContainsSomething() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);

        // Get all the personaList where apellido does not contain DEFAULT_APELLIDO
        defaultPersonaShouldNotBeFound("apellido.doesNotContain=" + DEFAULT_APELLIDO);

        // Get all the personaList where apellido does not contain UPDATED_APELLIDO
        defaultPersonaShouldBeFound("apellido.doesNotContain=" + UPDATED_APELLIDO);
    }


    @Test
    @Transactional
    public void getAllPersonasByEmailIsEqualToSomething() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);

        // Get all the personaList where email equals to DEFAULT_EMAIL
        defaultPersonaShouldBeFound("email.equals=" + DEFAULT_EMAIL);

        // Get all the personaList where email equals to UPDATED_EMAIL
        defaultPersonaShouldNotBeFound("email.equals=" + UPDATED_EMAIL);
    }

    @Test
    @Transactional
    public void getAllPersonasByEmailIsNotEqualToSomething() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);

        // Get all the personaList where email not equals to DEFAULT_EMAIL
        defaultPersonaShouldNotBeFound("email.notEquals=" + DEFAULT_EMAIL);

        // Get all the personaList where email not equals to UPDATED_EMAIL
        defaultPersonaShouldBeFound("email.notEquals=" + UPDATED_EMAIL);
    }

    @Test
    @Transactional
    public void getAllPersonasByEmailIsInShouldWork() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);

        // Get all the personaList where email in DEFAULT_EMAIL or UPDATED_EMAIL
        defaultPersonaShouldBeFound("email.in=" + DEFAULT_EMAIL + "," + UPDATED_EMAIL);

        // Get all the personaList where email equals to UPDATED_EMAIL
        defaultPersonaShouldNotBeFound("email.in=" + UPDATED_EMAIL);
    }

    @Test
    @Transactional
    public void getAllPersonasByEmailIsNullOrNotNull() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);

        // Get all the personaList where email is not null
        defaultPersonaShouldBeFound("email.specified=true");

        // Get all the personaList where email is null
        defaultPersonaShouldNotBeFound("email.specified=false");
    }
                @Test
    @Transactional
    public void getAllPersonasByEmailContainsSomething() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);

        // Get all the personaList where email contains DEFAULT_EMAIL
        defaultPersonaShouldBeFound("email.contains=" + DEFAULT_EMAIL);

        // Get all the personaList where email contains UPDATED_EMAIL
        defaultPersonaShouldNotBeFound("email.contains=" + UPDATED_EMAIL);
    }

    @Test
    @Transactional
    public void getAllPersonasByEmailNotContainsSomething() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);

        // Get all the personaList where email does not contain DEFAULT_EMAIL
        defaultPersonaShouldNotBeFound("email.doesNotContain=" + DEFAULT_EMAIL);

        // Get all the personaList where email does not contain UPDATED_EMAIL
        defaultPersonaShouldBeFound("email.doesNotContain=" + UPDATED_EMAIL);
    }


    @Test
    @Transactional
    public void getAllPersonasByTipoUsuarioIsEqualToSomething() throws Exception {
        // Get already existing entity
        TipoUsuario tipoUsuario = persona.getTipoUsuario();
        personaRepository.saveAndFlush(persona);
        Long tipoUsuarioId = tipoUsuario.getId();

        // Get all the personaList where tipoUsuario equals to tipoUsuarioId
        defaultPersonaShouldBeFound("tipoUsuarioId.equals=" + tipoUsuarioId);

        // Get all the personaList where tipoUsuario equals to tipoUsuarioId + 1
        defaultPersonaShouldNotBeFound("tipoUsuarioId.equals=" + (tipoUsuarioId + 1));
    }


    @Test
    @Transactional
    public void getAllPersonasByNumeroDocumentoIsEqualToSomething() throws Exception {
        // Get already existing entity
        Usuario numeroDocumento = persona.getNumeroDocumento();
        personaRepository.saveAndFlush(persona);
        Long numeroDocumentoId = numeroDocumento.getId();

        // Get all the personaList where numeroDocumento equals to numeroDocumentoId
        defaultPersonaShouldBeFound("numeroDocumentoId.equals=" + numeroDocumentoId);

        // Get all the personaList where numeroDocumento equals to numeroDocumentoId + 1
        defaultPersonaShouldNotBeFound("numeroDocumentoId.equals=" + (numeroDocumentoId + 1));
    }


    @Test
    @Transactional
    public void getAllPersonasByTipoDocumentoIsEqualToSomething() throws Exception {
        // Get already existing entity
        TipoDocumento tipoDocumento = persona.getTipoDocumento();
        personaRepository.saveAndFlush(persona);
        Long tipoDocumentoId = tipoDocumento.getId();

        // Get all the personaList where tipoDocumento equals to tipoDocumentoId
        defaultPersonaShouldBeFound("tipoDocumentoId.equals=" + tipoDocumentoId);

        // Get all the personaList where tipoDocumento equals to tipoDocumentoId + 1
        defaultPersonaShouldNotBeFound("tipoDocumentoId.equals=" + (tipoDocumentoId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultPersonaShouldBeFound(String filter) throws Exception {
        restPersonaMockMvc.perform(get("/api/personas?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(persona.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].apellido").value(hasItem(DEFAULT_APELLIDO)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)));

        // Check, that the count call also returns 1
        restPersonaMockMvc.perform(get("/api/personas/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultPersonaShouldNotBeFound(String filter) throws Exception {
        restPersonaMockMvc.perform(get("/api/personas?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restPersonaMockMvc.perform(get("/api/personas/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingPersona() throws Exception {
        // Get the persona
        restPersonaMockMvc.perform(get("/api/personas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePersona() throws Exception {
        // Initialize the database
        personaService.save(persona);

        int databaseSizeBeforeUpdate = personaRepository.findAll().size();

        // Update the persona
        Persona updatedPersona = personaRepository.findById(persona.getId()).get();
        // Disconnect from session so that the updates on updatedPersona are not directly saved in db
        em.detach(updatedPersona);
        updatedPersona
            .nombre(UPDATED_NOMBRE)
            .apellido(UPDATED_APELLIDO)
            .email(UPDATED_EMAIL);

        restPersonaMockMvc.perform(put("/api/personas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPersona)))
            .andExpect(status().isOk());

        // Validate the Persona in the database
        List<Persona> personaList = personaRepository.findAll();
        assertThat(personaList).hasSize(databaseSizeBeforeUpdate);
        Persona testPersona = personaList.get(personaList.size() - 1);
        assertThat(testPersona.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testPersona.getApellido()).isEqualTo(UPDATED_APELLIDO);
        assertThat(testPersona.getEmail()).isEqualTo(UPDATED_EMAIL);
    }

    @Test
    @Transactional
    public void updateNonExistingPersona() throws Exception {
        int databaseSizeBeforeUpdate = personaRepository.findAll().size();

        // Create the Persona

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPersonaMockMvc.perform(put("/api/personas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(persona)))
            .andExpect(status().isBadRequest());

        // Validate the Persona in the database
        List<Persona> personaList = personaRepository.findAll();
        assertThat(personaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePersona() throws Exception {
        // Initialize the database
        personaService.save(persona);

        int databaseSizeBeforeDelete = personaRepository.findAll().size();

        // Delete the persona
        restPersonaMockMvc.perform(delete("/api/personas/{id}", persona.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Persona> personaList = personaRepository.findAll();
        assertThat(personaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
