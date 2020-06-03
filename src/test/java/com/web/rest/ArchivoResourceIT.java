package com.web.rest;

import com.CtProjectApp;
import com.domain.Archivo;
import com.domain.Persona;
import com.repository.ArchivoRepository;
import com.service.ArchivoService;
import com.service.dto.ArchivoCriteria;
import com.service.ArchivoQueryService;

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
 * Integration tests for the {@link ArchivoResource} REST controller.
 */
@SpringBootTest(classes = CtProjectApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class ArchivoResourceIT {

    private static final Integer DEFAULT_TIPO = 1;
    private static final Integer UPDATED_TIPO = 2;
    private static final Integer SMALLER_TIPO = 1 - 1;

    private static final String DEFAULT_ARCHIVO = "AAAAAAAAAA";
    private static final String UPDATED_ARCHIVO = "BBBBBBBBBB";

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_EXTENSION = "AAAAAAAAAA";
    private static final String UPDATED_EXTENSION = "BBBBBBBBBB";

    @Autowired
    private ArchivoRepository archivoRepository;

    @Autowired
    private ArchivoService archivoService;

    @Autowired
    private ArchivoQueryService archivoQueryService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restArchivoMockMvc;

    private Archivo archivo;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Archivo createEntity(EntityManager em) {
        Archivo archivo = new Archivo()
            .tipo(DEFAULT_TIPO)
            .archivo(DEFAULT_ARCHIVO)
            .nombre(DEFAULT_NOMBRE)
            .extension(DEFAULT_EXTENSION);
        // Add required entity
        Persona persona;
        if (TestUtil.findAll(em, Persona.class).isEmpty()) {
            persona = PersonaResourceIT.createEntity(em);
            em.persist(persona);
            em.flush();
        } else {
            persona = TestUtil.findAll(em, Persona.class).get(0);
        }
        archivo.setUsuario(persona);
        return archivo;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Archivo createUpdatedEntity(EntityManager em) {
        Archivo archivo = new Archivo()
            .tipo(UPDATED_TIPO)
            .archivo(UPDATED_ARCHIVO)
            .nombre(UPDATED_NOMBRE)
            .extension(UPDATED_EXTENSION);
        // Add required entity
        Persona persona;
        if (TestUtil.findAll(em, Persona.class).isEmpty()) {
            persona = PersonaResourceIT.createUpdatedEntity(em);
            em.persist(persona);
            em.flush();
        } else {
            persona = TestUtil.findAll(em, Persona.class).get(0);
        }
        archivo.setUsuario(persona);
        return archivo;
    }

    @BeforeEach
    public void initTest() {
        archivo = createEntity(em);
    }

    @Test
    @Transactional
    public void createArchivo() throws Exception {
        int databaseSizeBeforeCreate = archivoRepository.findAll().size();

        // Create the Archivo
        restArchivoMockMvc.perform(post("/api/archivos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(archivo)))
            .andExpect(status().isCreated());

        // Validate the Archivo in the database
        List<Archivo> archivoList = archivoRepository.findAll();
        assertThat(archivoList).hasSize(databaseSizeBeforeCreate + 1);
        Archivo testArchivo = archivoList.get(archivoList.size() - 1);
        assertThat(testArchivo.getTipo()).isEqualTo(DEFAULT_TIPO);
        assertThat(testArchivo.getArchivo()).isEqualTo(DEFAULT_ARCHIVO);
        assertThat(testArchivo.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testArchivo.getExtension()).isEqualTo(DEFAULT_EXTENSION);
    }

    @Test
    @Transactional
    public void createArchivoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = archivoRepository.findAll().size();

        // Create the Archivo with an existing ID
        archivo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restArchivoMockMvc.perform(post("/api/archivos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(archivo)))
            .andExpect(status().isBadRequest());

        // Validate the Archivo in the database
        List<Archivo> archivoList = archivoRepository.findAll();
        assertThat(archivoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTipoIsRequired() throws Exception {
        int databaseSizeBeforeTest = archivoRepository.findAll().size();
        // set the field null
        archivo.setTipo(null);

        // Create the Archivo, which fails.

        restArchivoMockMvc.perform(post("/api/archivos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(archivo)))
            .andExpect(status().isBadRequest());

        List<Archivo> archivoList = archivoRepository.findAll();
        assertThat(archivoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkArchivoIsRequired() throws Exception {
        int databaseSizeBeforeTest = archivoRepository.findAll().size();
        // set the field null
        archivo.setArchivo(null);

        // Create the Archivo, which fails.

        restArchivoMockMvc.perform(post("/api/archivos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(archivo)))
            .andExpect(status().isBadRequest());

        List<Archivo> archivoList = archivoRepository.findAll();
        assertThat(archivoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = archivoRepository.findAll().size();
        // set the field null
        archivo.setNombre(null);

        // Create the Archivo, which fails.

        restArchivoMockMvc.perform(post("/api/archivos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(archivo)))
            .andExpect(status().isBadRequest());

        List<Archivo> archivoList = archivoRepository.findAll();
        assertThat(archivoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkExtensionIsRequired() throws Exception {
        int databaseSizeBeforeTest = archivoRepository.findAll().size();
        // set the field null
        archivo.setExtension(null);

        // Create the Archivo, which fails.

        restArchivoMockMvc.perform(post("/api/archivos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(archivo)))
            .andExpect(status().isBadRequest());

        List<Archivo> archivoList = archivoRepository.findAll();
        assertThat(archivoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllArchivos() throws Exception {
        // Initialize the database
        archivoRepository.saveAndFlush(archivo);

        // Get all the archivoList
        restArchivoMockMvc.perform(get("/api/archivos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(archivo.getId().intValue())))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO)))
            .andExpect(jsonPath("$.[*].archivo").value(hasItem(DEFAULT_ARCHIVO)))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].extension").value(hasItem(DEFAULT_EXTENSION)));
    }
    
    @Test
    @Transactional
    public void getArchivo() throws Exception {
        // Initialize the database
        archivoRepository.saveAndFlush(archivo);

        // Get the archivo
        restArchivoMockMvc.perform(get("/api/archivos/{id}", archivo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(archivo.getId().intValue()))
            .andExpect(jsonPath("$.tipo").value(DEFAULT_TIPO))
            .andExpect(jsonPath("$.archivo").value(DEFAULT_ARCHIVO))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE))
            .andExpect(jsonPath("$.extension").value(DEFAULT_EXTENSION));
    }


    @Test
    @Transactional
    public void getArchivosByIdFiltering() throws Exception {
        // Initialize the database
        archivoRepository.saveAndFlush(archivo);

        Long id = archivo.getId();

        defaultArchivoShouldBeFound("id.equals=" + id);
        defaultArchivoShouldNotBeFound("id.notEquals=" + id);

        defaultArchivoShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultArchivoShouldNotBeFound("id.greaterThan=" + id);

        defaultArchivoShouldBeFound("id.lessThanOrEqual=" + id);
        defaultArchivoShouldNotBeFound("id.lessThan=" + id);
    }


    @Test
    @Transactional
    public void getAllArchivosByTipoIsEqualToSomething() throws Exception {
        // Initialize the database
        archivoRepository.saveAndFlush(archivo);

        // Get all the archivoList where tipo equals to DEFAULT_TIPO
        defaultArchivoShouldBeFound("tipo.equals=" + DEFAULT_TIPO);

        // Get all the archivoList where tipo equals to UPDATED_TIPO
        defaultArchivoShouldNotBeFound("tipo.equals=" + UPDATED_TIPO);
    }

    @Test
    @Transactional
    public void getAllArchivosByTipoIsNotEqualToSomething() throws Exception {
        // Initialize the database
        archivoRepository.saveAndFlush(archivo);

        // Get all the archivoList where tipo not equals to DEFAULT_TIPO
        defaultArchivoShouldNotBeFound("tipo.notEquals=" + DEFAULT_TIPO);

        // Get all the archivoList where tipo not equals to UPDATED_TIPO
        defaultArchivoShouldBeFound("tipo.notEquals=" + UPDATED_TIPO);
    }

    @Test
    @Transactional
    public void getAllArchivosByTipoIsInShouldWork() throws Exception {
        // Initialize the database
        archivoRepository.saveAndFlush(archivo);

        // Get all the archivoList where tipo in DEFAULT_TIPO or UPDATED_TIPO
        defaultArchivoShouldBeFound("tipo.in=" + DEFAULT_TIPO + "," + UPDATED_TIPO);

        // Get all the archivoList where tipo equals to UPDATED_TIPO
        defaultArchivoShouldNotBeFound("tipo.in=" + UPDATED_TIPO);
    }

    @Test
    @Transactional
    public void getAllArchivosByTipoIsNullOrNotNull() throws Exception {
        // Initialize the database
        archivoRepository.saveAndFlush(archivo);

        // Get all the archivoList where tipo is not null
        defaultArchivoShouldBeFound("tipo.specified=true");

        // Get all the archivoList where tipo is null
        defaultArchivoShouldNotBeFound("tipo.specified=false");
    }

    @Test
    @Transactional
    public void getAllArchivosByTipoIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        archivoRepository.saveAndFlush(archivo);

        // Get all the archivoList where tipo is greater than or equal to DEFAULT_TIPO
        defaultArchivoShouldBeFound("tipo.greaterThanOrEqual=" + DEFAULT_TIPO);

        // Get all the archivoList where tipo is greater than or equal to UPDATED_TIPO
        defaultArchivoShouldNotBeFound("tipo.greaterThanOrEqual=" + UPDATED_TIPO);
    }

    @Test
    @Transactional
    public void getAllArchivosByTipoIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        archivoRepository.saveAndFlush(archivo);

        // Get all the archivoList where tipo is less than or equal to DEFAULT_TIPO
        defaultArchivoShouldBeFound("tipo.lessThanOrEqual=" + DEFAULT_TIPO);

        // Get all the archivoList where tipo is less than or equal to SMALLER_TIPO
        defaultArchivoShouldNotBeFound("tipo.lessThanOrEqual=" + SMALLER_TIPO);
    }

    @Test
    @Transactional
    public void getAllArchivosByTipoIsLessThanSomething() throws Exception {
        // Initialize the database
        archivoRepository.saveAndFlush(archivo);

        // Get all the archivoList where tipo is less than DEFAULT_TIPO
        defaultArchivoShouldNotBeFound("tipo.lessThan=" + DEFAULT_TIPO);

        // Get all the archivoList where tipo is less than UPDATED_TIPO
        defaultArchivoShouldBeFound("tipo.lessThan=" + UPDATED_TIPO);
    }

    @Test
    @Transactional
    public void getAllArchivosByTipoIsGreaterThanSomething() throws Exception {
        // Initialize the database
        archivoRepository.saveAndFlush(archivo);

        // Get all the archivoList where tipo is greater than DEFAULT_TIPO
        defaultArchivoShouldNotBeFound("tipo.greaterThan=" + DEFAULT_TIPO);

        // Get all the archivoList where tipo is greater than SMALLER_TIPO
        defaultArchivoShouldBeFound("tipo.greaterThan=" + SMALLER_TIPO);
    }


    @Test
    @Transactional
    public void getAllArchivosByArchivoIsEqualToSomething() throws Exception {
        // Initialize the database
        archivoRepository.saveAndFlush(archivo);

        // Get all the archivoList where archivo equals to DEFAULT_ARCHIVO
        defaultArchivoShouldBeFound("archivo.equals=" + DEFAULT_ARCHIVO);

        // Get all the archivoList where archivo equals to UPDATED_ARCHIVO
        defaultArchivoShouldNotBeFound("archivo.equals=" + UPDATED_ARCHIVO);
    }

    @Test
    @Transactional
    public void getAllArchivosByArchivoIsNotEqualToSomething() throws Exception {
        // Initialize the database
        archivoRepository.saveAndFlush(archivo);

        // Get all the archivoList where archivo not equals to DEFAULT_ARCHIVO
        defaultArchivoShouldNotBeFound("archivo.notEquals=" + DEFAULT_ARCHIVO);

        // Get all the archivoList where archivo not equals to UPDATED_ARCHIVO
        defaultArchivoShouldBeFound("archivo.notEquals=" + UPDATED_ARCHIVO);
    }

    @Test
    @Transactional
    public void getAllArchivosByArchivoIsInShouldWork() throws Exception {
        // Initialize the database
        archivoRepository.saveAndFlush(archivo);

        // Get all the archivoList where archivo in DEFAULT_ARCHIVO or UPDATED_ARCHIVO
        defaultArchivoShouldBeFound("archivo.in=" + DEFAULT_ARCHIVO + "," + UPDATED_ARCHIVO);

        // Get all the archivoList where archivo equals to UPDATED_ARCHIVO
        defaultArchivoShouldNotBeFound("archivo.in=" + UPDATED_ARCHIVO);
    }

    @Test
    @Transactional
    public void getAllArchivosByArchivoIsNullOrNotNull() throws Exception {
        // Initialize the database
        archivoRepository.saveAndFlush(archivo);

        // Get all the archivoList where archivo is not null
        defaultArchivoShouldBeFound("archivo.specified=true");

        // Get all the archivoList where archivo is null
        defaultArchivoShouldNotBeFound("archivo.specified=false");
    }
                @Test
    @Transactional
    public void getAllArchivosByArchivoContainsSomething() throws Exception {
        // Initialize the database
        archivoRepository.saveAndFlush(archivo);

        // Get all the archivoList where archivo contains DEFAULT_ARCHIVO
        defaultArchivoShouldBeFound("archivo.contains=" + DEFAULT_ARCHIVO);

        // Get all the archivoList where archivo contains UPDATED_ARCHIVO
        defaultArchivoShouldNotBeFound("archivo.contains=" + UPDATED_ARCHIVO);
    }

    @Test
    @Transactional
    public void getAllArchivosByArchivoNotContainsSomething() throws Exception {
        // Initialize the database
        archivoRepository.saveAndFlush(archivo);

        // Get all the archivoList where archivo does not contain DEFAULT_ARCHIVO
        defaultArchivoShouldNotBeFound("archivo.doesNotContain=" + DEFAULT_ARCHIVO);

        // Get all the archivoList where archivo does not contain UPDATED_ARCHIVO
        defaultArchivoShouldBeFound("archivo.doesNotContain=" + UPDATED_ARCHIVO);
    }


    @Test
    @Transactional
    public void getAllArchivosByNombreIsEqualToSomething() throws Exception {
        // Initialize the database
        archivoRepository.saveAndFlush(archivo);

        // Get all the archivoList where nombre equals to DEFAULT_NOMBRE
        defaultArchivoShouldBeFound("nombre.equals=" + DEFAULT_NOMBRE);

        // Get all the archivoList where nombre equals to UPDATED_NOMBRE
        defaultArchivoShouldNotBeFound("nombre.equals=" + UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    public void getAllArchivosByNombreIsNotEqualToSomething() throws Exception {
        // Initialize the database
        archivoRepository.saveAndFlush(archivo);

        // Get all the archivoList where nombre not equals to DEFAULT_NOMBRE
        defaultArchivoShouldNotBeFound("nombre.notEquals=" + DEFAULT_NOMBRE);

        // Get all the archivoList where nombre not equals to UPDATED_NOMBRE
        defaultArchivoShouldBeFound("nombre.notEquals=" + UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    public void getAllArchivosByNombreIsInShouldWork() throws Exception {
        // Initialize the database
        archivoRepository.saveAndFlush(archivo);

        // Get all the archivoList where nombre in DEFAULT_NOMBRE or UPDATED_NOMBRE
        defaultArchivoShouldBeFound("nombre.in=" + DEFAULT_NOMBRE + "," + UPDATED_NOMBRE);

        // Get all the archivoList where nombre equals to UPDATED_NOMBRE
        defaultArchivoShouldNotBeFound("nombre.in=" + UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    public void getAllArchivosByNombreIsNullOrNotNull() throws Exception {
        // Initialize the database
        archivoRepository.saveAndFlush(archivo);

        // Get all the archivoList where nombre is not null
        defaultArchivoShouldBeFound("nombre.specified=true");

        // Get all the archivoList where nombre is null
        defaultArchivoShouldNotBeFound("nombre.specified=false");
    }
                @Test
    @Transactional
    public void getAllArchivosByNombreContainsSomething() throws Exception {
        // Initialize the database
        archivoRepository.saveAndFlush(archivo);

        // Get all the archivoList where nombre contains DEFAULT_NOMBRE
        defaultArchivoShouldBeFound("nombre.contains=" + DEFAULT_NOMBRE);

        // Get all the archivoList where nombre contains UPDATED_NOMBRE
        defaultArchivoShouldNotBeFound("nombre.contains=" + UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    public void getAllArchivosByNombreNotContainsSomething() throws Exception {
        // Initialize the database
        archivoRepository.saveAndFlush(archivo);

        // Get all the archivoList where nombre does not contain DEFAULT_NOMBRE
        defaultArchivoShouldNotBeFound("nombre.doesNotContain=" + DEFAULT_NOMBRE);

        // Get all the archivoList where nombre does not contain UPDATED_NOMBRE
        defaultArchivoShouldBeFound("nombre.doesNotContain=" + UPDATED_NOMBRE);
    }


    @Test
    @Transactional
    public void getAllArchivosByExtensionIsEqualToSomething() throws Exception {
        // Initialize the database
        archivoRepository.saveAndFlush(archivo);

        // Get all the archivoList where extension equals to DEFAULT_EXTENSION
        defaultArchivoShouldBeFound("extension.equals=" + DEFAULT_EXTENSION);

        // Get all the archivoList where extension equals to UPDATED_EXTENSION
        defaultArchivoShouldNotBeFound("extension.equals=" + UPDATED_EXTENSION);
    }

    @Test
    @Transactional
    public void getAllArchivosByExtensionIsNotEqualToSomething() throws Exception {
        // Initialize the database
        archivoRepository.saveAndFlush(archivo);

        // Get all the archivoList where extension not equals to DEFAULT_EXTENSION
        defaultArchivoShouldNotBeFound("extension.notEquals=" + DEFAULT_EXTENSION);

        // Get all the archivoList where extension not equals to UPDATED_EXTENSION
        defaultArchivoShouldBeFound("extension.notEquals=" + UPDATED_EXTENSION);
    }

    @Test
    @Transactional
    public void getAllArchivosByExtensionIsInShouldWork() throws Exception {
        // Initialize the database
        archivoRepository.saveAndFlush(archivo);

        // Get all the archivoList where extension in DEFAULT_EXTENSION or UPDATED_EXTENSION
        defaultArchivoShouldBeFound("extension.in=" + DEFAULT_EXTENSION + "," + UPDATED_EXTENSION);

        // Get all the archivoList where extension equals to UPDATED_EXTENSION
        defaultArchivoShouldNotBeFound("extension.in=" + UPDATED_EXTENSION);
    }

    @Test
    @Transactional
    public void getAllArchivosByExtensionIsNullOrNotNull() throws Exception {
        // Initialize the database
        archivoRepository.saveAndFlush(archivo);

        // Get all the archivoList where extension is not null
        defaultArchivoShouldBeFound("extension.specified=true");

        // Get all the archivoList where extension is null
        defaultArchivoShouldNotBeFound("extension.specified=false");
    }
                @Test
    @Transactional
    public void getAllArchivosByExtensionContainsSomething() throws Exception {
        // Initialize the database
        archivoRepository.saveAndFlush(archivo);

        // Get all the archivoList where extension contains DEFAULT_EXTENSION
        defaultArchivoShouldBeFound("extension.contains=" + DEFAULT_EXTENSION);

        // Get all the archivoList where extension contains UPDATED_EXTENSION
        defaultArchivoShouldNotBeFound("extension.contains=" + UPDATED_EXTENSION);
    }

    @Test
    @Transactional
    public void getAllArchivosByExtensionNotContainsSomething() throws Exception {
        // Initialize the database
        archivoRepository.saveAndFlush(archivo);

        // Get all the archivoList where extension does not contain DEFAULT_EXTENSION
        defaultArchivoShouldNotBeFound("extension.doesNotContain=" + DEFAULT_EXTENSION);

        // Get all the archivoList where extension does not contain UPDATED_EXTENSION
        defaultArchivoShouldBeFound("extension.doesNotContain=" + UPDATED_EXTENSION);
    }


    @Test
    @Transactional
    public void getAllArchivosByUsuarioIsEqualToSomething() throws Exception {
        // Get already existing entity
        Persona usuario = archivo.getUsuario();
        archivoRepository.saveAndFlush(archivo);
        Long usuarioId = usuario.getId();

        // Get all the archivoList where usuario equals to usuarioId
        defaultArchivoShouldBeFound("usuarioId.equals=" + usuarioId);

        // Get all the archivoList where usuario equals to usuarioId + 1
        defaultArchivoShouldNotBeFound("usuarioId.equals=" + (usuarioId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultArchivoShouldBeFound(String filter) throws Exception {
        restArchivoMockMvc.perform(get("/api/archivos?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(archivo.getId().intValue())))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO)))
            .andExpect(jsonPath("$.[*].archivo").value(hasItem(DEFAULT_ARCHIVO)))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].extension").value(hasItem(DEFAULT_EXTENSION)));

        // Check, that the count call also returns 1
        restArchivoMockMvc.perform(get("/api/archivos/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultArchivoShouldNotBeFound(String filter) throws Exception {
        restArchivoMockMvc.perform(get("/api/archivos?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restArchivoMockMvc.perform(get("/api/archivos/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingArchivo() throws Exception {
        // Get the archivo
        restArchivoMockMvc.perform(get("/api/archivos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateArchivo() throws Exception {
        // Initialize the database
        archivoService.save(archivo);

        int databaseSizeBeforeUpdate = archivoRepository.findAll().size();

        // Update the archivo
        Archivo updatedArchivo = archivoRepository.findById(archivo.getId()).get();
        // Disconnect from session so that the updates on updatedArchivo are not directly saved in db
        em.detach(updatedArchivo);
        updatedArchivo
            .tipo(UPDATED_TIPO)
            .archivo(UPDATED_ARCHIVO)
            .nombre(UPDATED_NOMBRE)
            .extension(UPDATED_EXTENSION);

        restArchivoMockMvc.perform(put("/api/archivos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedArchivo)))
            .andExpect(status().isOk());

        // Validate the Archivo in the database
        List<Archivo> archivoList = archivoRepository.findAll();
        assertThat(archivoList).hasSize(databaseSizeBeforeUpdate);
        Archivo testArchivo = archivoList.get(archivoList.size() - 1);
        assertThat(testArchivo.getTipo()).isEqualTo(UPDATED_TIPO);
        assertThat(testArchivo.getArchivo()).isEqualTo(UPDATED_ARCHIVO);
        assertThat(testArchivo.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testArchivo.getExtension()).isEqualTo(UPDATED_EXTENSION);
    }

    @Test
    @Transactional
    public void updateNonExistingArchivo() throws Exception {
        int databaseSizeBeforeUpdate = archivoRepository.findAll().size();

        // Create the Archivo

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restArchivoMockMvc.perform(put("/api/archivos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(archivo)))
            .andExpect(status().isBadRequest());

        // Validate the Archivo in the database
        List<Archivo> archivoList = archivoRepository.findAll();
        assertThat(archivoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteArchivo() throws Exception {
        // Initialize the database
        archivoService.save(archivo);

        int databaseSizeBeforeDelete = archivoRepository.findAll().size();

        // Delete the archivo
        restArchivoMockMvc.perform(delete("/api/archivos/{id}", archivo.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Archivo> archivoList = archivoRepository.findAll();
        assertThat(archivoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
