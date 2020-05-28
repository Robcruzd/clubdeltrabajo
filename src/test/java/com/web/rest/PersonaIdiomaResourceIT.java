package com.web.rest;

import com.CtProjectApp;
import com.domain.PersonaIdioma;
import com.domain.Persona;
import com.domain.Idioma;
import com.repository.PersonaIdiomaRepository;
import com.service.PersonaIdiomaService;
import com.service.dto.PersonaIdiomaCriteria;
import com.service.PersonaIdiomaQueryService;

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
 * Integration tests for the {@link PersonaIdiomaResource} REST controller.
 */
@SpringBootTest(classes = CtProjectApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class PersonaIdiomaResourceIT {

    private static final String DEFAULT_NIVEL = "AAAAAAAAAA";
    private static final String UPDATED_NIVEL = "BBBBBBBBBB";

    @Autowired
    private PersonaIdiomaRepository personaIdiomaRepository;

    @Autowired
    private PersonaIdiomaService personaIdiomaService;

    @Autowired
    private PersonaIdiomaQueryService personaIdiomaQueryService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPersonaIdiomaMockMvc;

    private PersonaIdioma personaIdioma;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PersonaIdioma createEntity(EntityManager em) {
        PersonaIdioma personaIdioma = new PersonaIdioma()
            .nivel(DEFAULT_NIVEL);
        // Add required entity
        Persona persona;
        if (TestUtil.findAll(em, Persona.class).isEmpty()) {
            persona = PersonaResourceIT.createEntity(em);
            em.persist(persona);
            em.flush();
        } else {
            persona = TestUtil.findAll(em, Persona.class).get(0);
        }
        personaIdioma.setIdPersona(persona);
        // Add required entity
        Idioma idioma;
        if (TestUtil.findAll(em, Idioma.class).isEmpty()) {
            idioma = IdiomaResourceIT.createEntity(em);
            em.persist(idioma);
            em.flush();
        } else {
            idioma = TestUtil.findAll(em, Idioma.class).get(0);
        }
        personaIdioma.setIdIdioma(idioma);
        return personaIdioma;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PersonaIdioma createUpdatedEntity(EntityManager em) {
        PersonaIdioma personaIdioma = new PersonaIdioma()
            .nivel(UPDATED_NIVEL);
        // Add required entity
        Persona persona;
        if (TestUtil.findAll(em, Persona.class).isEmpty()) {
            persona = PersonaResourceIT.createUpdatedEntity(em);
            em.persist(persona);
            em.flush();
        } else {
            persona = TestUtil.findAll(em, Persona.class).get(0);
        }
        personaIdioma.setIdPersona(persona);
        // Add required entity
        Idioma idioma;
        if (TestUtil.findAll(em, Idioma.class).isEmpty()) {
            idioma = IdiomaResourceIT.createUpdatedEntity(em);
            em.persist(idioma);
            em.flush();
        } else {
            idioma = TestUtil.findAll(em, Idioma.class).get(0);
        }
        personaIdioma.setIdIdioma(idioma);
        return personaIdioma;
    }

    @BeforeEach
    public void initTest() {
        personaIdioma = createEntity(em);
    }

    @Test
    @Transactional
    public void createPersonaIdioma() throws Exception {
        int databaseSizeBeforeCreate = personaIdiomaRepository.findAll().size();

        // Create the PersonaIdioma
        restPersonaIdiomaMockMvc.perform(post("/api/persona-idiomas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(personaIdioma)))
            .andExpect(status().isCreated());

        // Validate the PersonaIdioma in the database
        List<PersonaIdioma> personaIdiomaList = personaIdiomaRepository.findAll();
        assertThat(personaIdiomaList).hasSize(databaseSizeBeforeCreate + 1);
        PersonaIdioma testPersonaIdioma = personaIdiomaList.get(personaIdiomaList.size() - 1);
        assertThat(testPersonaIdioma.getNivel()).isEqualTo(DEFAULT_NIVEL);
    }

    @Test
    @Transactional
    public void createPersonaIdiomaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = personaIdiomaRepository.findAll().size();

        // Create the PersonaIdioma with an existing ID
        personaIdioma.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPersonaIdiomaMockMvc.perform(post("/api/persona-idiomas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(personaIdioma)))
            .andExpect(status().isBadRequest());

        // Validate the PersonaIdioma in the database
        List<PersonaIdioma> personaIdiomaList = personaIdiomaRepository.findAll();
        assertThat(personaIdiomaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNivelIsRequired() throws Exception {
        int databaseSizeBeforeTest = personaIdiomaRepository.findAll().size();
        // set the field null
        personaIdioma.setNivel(null);

        // Create the PersonaIdioma, which fails.

        restPersonaIdiomaMockMvc.perform(post("/api/persona-idiomas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(personaIdioma)))
            .andExpect(status().isBadRequest());

        List<PersonaIdioma> personaIdiomaList = personaIdiomaRepository.findAll();
        assertThat(personaIdiomaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPersonaIdiomas() throws Exception {
        // Initialize the database
        personaIdiomaRepository.saveAndFlush(personaIdioma);

        // Get all the personaIdiomaList
        restPersonaIdiomaMockMvc.perform(get("/api/persona-idiomas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(personaIdioma.getId().intValue())))
            .andExpect(jsonPath("$.[*].nivel").value(hasItem(DEFAULT_NIVEL)));
    }
    
    @Test
    @Transactional
    public void getPersonaIdioma() throws Exception {
        // Initialize the database
        personaIdiomaRepository.saveAndFlush(personaIdioma);

        // Get the personaIdioma
        restPersonaIdiomaMockMvc.perform(get("/api/persona-idiomas/{id}", personaIdioma.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(personaIdioma.getId().intValue()))
            .andExpect(jsonPath("$.nivel").value(DEFAULT_NIVEL));
    }


    @Test
    @Transactional
    public void getPersonaIdiomasByIdFiltering() throws Exception {
        // Initialize the database
        personaIdiomaRepository.saveAndFlush(personaIdioma);

        Long id = personaIdioma.getId();

        defaultPersonaIdiomaShouldBeFound("id.equals=" + id);
        defaultPersonaIdiomaShouldNotBeFound("id.notEquals=" + id);

        defaultPersonaIdiomaShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultPersonaIdiomaShouldNotBeFound("id.greaterThan=" + id);

        defaultPersonaIdiomaShouldBeFound("id.lessThanOrEqual=" + id);
        defaultPersonaIdiomaShouldNotBeFound("id.lessThan=" + id);
    }


    @Test
    @Transactional
    public void getAllPersonaIdiomasByNivelIsEqualToSomething() throws Exception {
        // Initialize the database
        personaIdiomaRepository.saveAndFlush(personaIdioma);

        // Get all the personaIdiomaList where nivel equals to DEFAULT_NIVEL
        defaultPersonaIdiomaShouldBeFound("nivel.equals=" + DEFAULT_NIVEL);

        // Get all the personaIdiomaList where nivel equals to UPDATED_NIVEL
        defaultPersonaIdiomaShouldNotBeFound("nivel.equals=" + UPDATED_NIVEL);
    }

    @Test
    @Transactional
    public void getAllPersonaIdiomasByNivelIsNotEqualToSomething() throws Exception {
        // Initialize the database
        personaIdiomaRepository.saveAndFlush(personaIdioma);

        // Get all the personaIdiomaList where nivel not equals to DEFAULT_NIVEL
        defaultPersonaIdiomaShouldNotBeFound("nivel.notEquals=" + DEFAULT_NIVEL);

        // Get all the personaIdiomaList where nivel not equals to UPDATED_NIVEL
        defaultPersonaIdiomaShouldBeFound("nivel.notEquals=" + UPDATED_NIVEL);
    }

    @Test
    @Transactional
    public void getAllPersonaIdiomasByNivelIsInShouldWork() throws Exception {
        // Initialize the database
        personaIdiomaRepository.saveAndFlush(personaIdioma);

        // Get all the personaIdiomaList where nivel in DEFAULT_NIVEL or UPDATED_NIVEL
        defaultPersonaIdiomaShouldBeFound("nivel.in=" + DEFAULT_NIVEL + "," + UPDATED_NIVEL);

        // Get all the personaIdiomaList where nivel equals to UPDATED_NIVEL
        defaultPersonaIdiomaShouldNotBeFound("nivel.in=" + UPDATED_NIVEL);
    }

    @Test
    @Transactional
    public void getAllPersonaIdiomasByNivelIsNullOrNotNull() throws Exception {
        // Initialize the database
        personaIdiomaRepository.saveAndFlush(personaIdioma);

        // Get all the personaIdiomaList where nivel is not null
        defaultPersonaIdiomaShouldBeFound("nivel.specified=true");

        // Get all the personaIdiomaList where nivel is null
        defaultPersonaIdiomaShouldNotBeFound("nivel.specified=false");
    }
                @Test
    @Transactional
    public void getAllPersonaIdiomasByNivelContainsSomething() throws Exception {
        // Initialize the database
        personaIdiomaRepository.saveAndFlush(personaIdioma);

        // Get all the personaIdiomaList where nivel contains DEFAULT_NIVEL
        defaultPersonaIdiomaShouldBeFound("nivel.contains=" + DEFAULT_NIVEL);

        // Get all the personaIdiomaList where nivel contains UPDATED_NIVEL
        defaultPersonaIdiomaShouldNotBeFound("nivel.contains=" + UPDATED_NIVEL);
    }

    @Test
    @Transactional
    public void getAllPersonaIdiomasByNivelNotContainsSomething() throws Exception {
        // Initialize the database
        personaIdiomaRepository.saveAndFlush(personaIdioma);

        // Get all the personaIdiomaList where nivel does not contain DEFAULT_NIVEL
        defaultPersonaIdiomaShouldNotBeFound("nivel.doesNotContain=" + DEFAULT_NIVEL);

        // Get all the personaIdiomaList where nivel does not contain UPDATED_NIVEL
        defaultPersonaIdiomaShouldBeFound("nivel.doesNotContain=" + UPDATED_NIVEL);
    }


    @Test
    @Transactional
    public void getAllPersonaIdiomasByIdPersonaIsEqualToSomething() throws Exception {
        // Get already existing entity
        Persona idPersona = personaIdioma.getIdPersona();
        personaIdiomaRepository.saveAndFlush(personaIdioma);
        Long idPersonaId = idPersona.getId();

        // Get all the personaIdiomaList where idPersona equals to idPersonaId
        defaultPersonaIdiomaShouldBeFound("idPersonaId.equals=" + idPersonaId);

        // Get all the personaIdiomaList where idPersona equals to idPersonaId + 1
        defaultPersonaIdiomaShouldNotBeFound("idPersonaId.equals=" + (idPersonaId + 1));
    }


    @Test
    @Transactional
    public void getAllPersonaIdiomasByIdIdiomaIsEqualToSomething() throws Exception {
        // Get already existing entity
        Idioma idIdioma = personaIdioma.getIdIdioma();
        personaIdiomaRepository.saveAndFlush(personaIdioma);
        Long idIdiomaId = idIdioma.getId();

        // Get all the personaIdiomaList where idIdioma equals to idIdiomaId
        defaultPersonaIdiomaShouldBeFound("idIdiomaId.equals=" + idIdiomaId);

        // Get all the personaIdiomaList where idIdioma equals to idIdiomaId + 1
        defaultPersonaIdiomaShouldNotBeFound("idIdiomaId.equals=" + (idIdiomaId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultPersonaIdiomaShouldBeFound(String filter) throws Exception {
        restPersonaIdiomaMockMvc.perform(get("/api/persona-idiomas?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(personaIdioma.getId().intValue())))
            .andExpect(jsonPath("$.[*].nivel").value(hasItem(DEFAULT_NIVEL)));

        // Check, that the count call also returns 1
        restPersonaIdiomaMockMvc.perform(get("/api/persona-idiomas/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultPersonaIdiomaShouldNotBeFound(String filter) throws Exception {
        restPersonaIdiomaMockMvc.perform(get("/api/persona-idiomas?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restPersonaIdiomaMockMvc.perform(get("/api/persona-idiomas/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingPersonaIdioma() throws Exception {
        // Get the personaIdioma
        restPersonaIdiomaMockMvc.perform(get("/api/persona-idiomas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePersonaIdioma() throws Exception {
        // Initialize the database
        personaIdiomaService.save(personaIdioma);

        int databaseSizeBeforeUpdate = personaIdiomaRepository.findAll().size();

        // Update the personaIdioma
        PersonaIdioma updatedPersonaIdioma = personaIdiomaRepository.findById(personaIdioma.getId()).get();
        // Disconnect from session so that the updates on updatedPersonaIdioma are not directly saved in db
        em.detach(updatedPersonaIdioma);
        updatedPersonaIdioma
            .nivel(UPDATED_NIVEL);

        restPersonaIdiomaMockMvc.perform(put("/api/persona-idiomas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPersonaIdioma)))
            .andExpect(status().isOk());

        // Validate the PersonaIdioma in the database
        List<PersonaIdioma> personaIdiomaList = personaIdiomaRepository.findAll();
        assertThat(personaIdiomaList).hasSize(databaseSizeBeforeUpdate);
        PersonaIdioma testPersonaIdioma = personaIdiomaList.get(personaIdiomaList.size() - 1);
        assertThat(testPersonaIdioma.getNivel()).isEqualTo(UPDATED_NIVEL);
    }

    @Test
    @Transactional
    public void updateNonExistingPersonaIdioma() throws Exception {
        int databaseSizeBeforeUpdate = personaIdiomaRepository.findAll().size();

        // Create the PersonaIdioma

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPersonaIdiomaMockMvc.perform(put("/api/persona-idiomas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(personaIdioma)))
            .andExpect(status().isBadRequest());

        // Validate the PersonaIdioma in the database
        List<PersonaIdioma> personaIdiomaList = personaIdiomaRepository.findAll();
        assertThat(personaIdiomaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePersonaIdioma() throws Exception {
        // Initialize the database
        personaIdiomaService.save(personaIdioma);

        int databaseSizeBeforeDelete = personaIdiomaRepository.findAll().size();

        // Delete the personaIdioma
        restPersonaIdiomaMockMvc.perform(delete("/api/persona-idiomas/{id}", personaIdioma.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PersonaIdioma> personaIdiomaList = personaIdiomaRepository.findAll();
        assertThat(personaIdiomaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
