package com.web.rest;

import com.CtProjectApp;
import com.domain.InformacionLaboral;
import com.domain.Persona;
import com.domain.Dependencia;
import com.domain.Cargo;
import com.repository.InformacionLaboralRepository;
import com.service.InformacionLaboralService;
import com.service.dto.InformacionLaboralCriteria;
import com.service.InformacionLaboralQueryService;

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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link InformacionLaboralResource} REST controller.
 */
@SpringBootTest(classes = CtProjectApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class InformacionLaboralResourceIT {

    private static final String DEFAULT_NOMBRE_EMPRESA = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_EMPRESA = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_FECHA_INICIO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_INICIO = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_FECHA_INICIO = LocalDate.ofEpochDay(-1L);

    private static final LocalDate DEFAULT_FECHA_FIN = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_FIN = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_FECHA_FIN = LocalDate.ofEpochDay(-1L);

    private static final String DEFAULT_DIRECCION = "AAAAAAAAAA";
    private static final String UPDATED_DIRECCION = "BBBBBBBBBB";

    private static final Integer DEFAULT_CUIDAD = 1;
    private static final Integer UPDATED_CUIDAD = 2;
    private static final Integer SMALLER_CUIDAD = 1 - 1;

    private static final Integer DEFAULT_DEPARTAMENTO = 1;
    private static final Integer UPDATED_DEPARTAMENTO = 2;
    private static final Integer SMALLER_DEPARTAMENTO = 1 - 1;

    private static final Integer DEFAULT_PAIS = 1;
    private static final Integer UPDATED_PAIS = 2;
    private static final Integer SMALLER_PAIS = 1 - 1;

    private static final String DEFAULT_TELEFONO_EMPRESA = "AAAAAAAAAA";
    private static final String UPDATED_TELEFONO_EMPRESA = "BBBBBBBBBB";

    @Autowired
    private InformacionLaboralRepository informacionLaboralRepository;

    @Autowired
    private InformacionLaboralService informacionLaboralService;

    @Autowired
    private InformacionLaboralQueryService informacionLaboralQueryService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restInformacionLaboralMockMvc;

    private InformacionLaboral informacionLaboral;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static InformacionLaboral createEntity(EntityManager em) {
        InformacionLaboral informacionLaboral = new InformacionLaboral()
            .nombreEmpresa(DEFAULT_NOMBRE_EMPRESA)
            .fechaInicio(DEFAULT_FECHA_INICIO)
            .fechaFin(DEFAULT_FECHA_FIN)
            .direccion(DEFAULT_DIRECCION)
            .cuidad(DEFAULT_CUIDAD)
            .departamento(DEFAULT_DEPARTAMENTO)
            .pais(DEFAULT_PAIS)
            .telefonoEmpresa(DEFAULT_TELEFONO_EMPRESA);
        // Add required entity
        Persona persona;
        if (TestUtil.findAll(em, Persona.class).isEmpty()) {
            persona = PersonaResourceIT.createEntity(em);
            em.persist(persona);
            em.flush();
        } else {
            persona = TestUtil.findAll(em, Persona.class).get(0);
        }
        informacionLaboral.setUsuario(persona);
        // Add required entity
        Dependencia dependencia;
        if (TestUtil.findAll(em, Dependencia.class).isEmpty()) {
            dependencia = DependenciaResourceIT.createEntity(em);
            em.persist(dependencia);
            em.flush();
        } else {
            dependencia = TestUtil.findAll(em, Dependencia.class).get(0);
        }
        informacionLaboral.setDependencia(dependencia);
        // Add required entity
        Cargo cargo;
        if (TestUtil.findAll(em, Cargo.class).isEmpty()) {
            cargo = CargoResourceIT.createEntity(em);
            em.persist(cargo);
            em.flush();
        } else {
            cargo = TestUtil.findAll(em, Cargo.class).get(0);
        }
        informacionLaboral.setCargo(cargo);
        return informacionLaboral;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static InformacionLaboral createUpdatedEntity(EntityManager em) {
        InformacionLaboral informacionLaboral = new InformacionLaboral()
            .nombreEmpresa(UPDATED_NOMBRE_EMPRESA)
            .fechaInicio(UPDATED_FECHA_INICIO)
            .fechaFin(UPDATED_FECHA_FIN)
            .direccion(UPDATED_DIRECCION)
            .cuidad(UPDATED_CUIDAD)
            .departamento(UPDATED_DEPARTAMENTO)
            .pais(UPDATED_PAIS)
            .telefonoEmpresa(UPDATED_TELEFONO_EMPRESA);
        // Add required entity
        Persona persona;
        if (TestUtil.findAll(em, Persona.class).isEmpty()) {
            persona = PersonaResourceIT.createUpdatedEntity(em);
            em.persist(persona);
            em.flush();
        } else {
            persona = TestUtil.findAll(em, Persona.class).get(0);
        }
        informacionLaboral.setUsuario(persona);
        // Add required entity
        Dependencia dependencia;
        if (TestUtil.findAll(em, Dependencia.class).isEmpty()) {
            dependencia = DependenciaResourceIT.createUpdatedEntity(em);
            em.persist(dependencia);
            em.flush();
        } else {
            dependencia = TestUtil.findAll(em, Dependencia.class).get(0);
        }
        informacionLaboral.setDependencia(dependencia);
        // Add required entity
        Cargo cargo;
        if (TestUtil.findAll(em, Cargo.class).isEmpty()) {
            cargo = CargoResourceIT.createUpdatedEntity(em);
            em.persist(cargo);
            em.flush();
        } else {
            cargo = TestUtil.findAll(em, Cargo.class).get(0);
        }
        informacionLaboral.setCargo(cargo);
        return informacionLaboral;
    }

    @BeforeEach
    public void initTest() {
        informacionLaboral = createEntity(em);
    }

    @Test
    @Transactional
    public void createInformacionLaboral() throws Exception {
        int databaseSizeBeforeCreate = informacionLaboralRepository.findAll().size();

        // Create the InformacionLaboral
        restInformacionLaboralMockMvc.perform(post("/api/informacion-laborals")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(informacionLaboral)))
            .andExpect(status().isCreated());

        // Validate the InformacionLaboral in the database
        List<InformacionLaboral> informacionLaboralList = informacionLaboralRepository.findAll();
        assertThat(informacionLaboralList).hasSize(databaseSizeBeforeCreate + 1);
        InformacionLaboral testInformacionLaboral = informacionLaboralList.get(informacionLaboralList.size() - 1);
        assertThat(testInformacionLaboral.getNombreEmpresa()).isEqualTo(DEFAULT_NOMBRE_EMPRESA);
        assertThat(testInformacionLaboral.getFechaInicio()).isEqualTo(DEFAULT_FECHA_INICIO);
        assertThat(testInformacionLaboral.getFechaFin()).isEqualTo(DEFAULT_FECHA_FIN);
        assertThat(testInformacionLaboral.getDireccion()).isEqualTo(DEFAULT_DIRECCION);
        assertThat(testInformacionLaboral.getCuidad()).isEqualTo(DEFAULT_CUIDAD);
        assertThat(testInformacionLaboral.getDepartamento()).isEqualTo(DEFAULT_DEPARTAMENTO);
        assertThat(testInformacionLaboral.getPais()).isEqualTo(DEFAULT_PAIS);
        assertThat(testInformacionLaboral.getTelefonoEmpresa()).isEqualTo(DEFAULT_TELEFONO_EMPRESA);
    }

    @Test
    @Transactional
    public void createInformacionLaboralWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = informacionLaboralRepository.findAll().size();

        // Create the InformacionLaboral with an existing ID
        informacionLaboral.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInformacionLaboralMockMvc.perform(post("/api/informacion-laborals")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(informacionLaboral)))
            .andExpect(status().isBadRequest());

        // Validate the InformacionLaboral in the database
        List<InformacionLaboral> informacionLaboralList = informacionLaboralRepository.findAll();
        assertThat(informacionLaboralList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNombreEmpresaIsRequired() throws Exception {
        int databaseSizeBeforeTest = informacionLaboralRepository.findAll().size();
        // set the field null
        informacionLaboral.setNombreEmpresa(null);

        // Create the InformacionLaboral, which fails.

        restInformacionLaboralMockMvc.perform(post("/api/informacion-laborals")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(informacionLaboral)))
            .andExpect(status().isBadRequest());

        List<InformacionLaboral> informacionLaboralList = informacionLaboralRepository.findAll();
        assertThat(informacionLaboralList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkFechaInicioIsRequired() throws Exception {
        int databaseSizeBeforeTest = informacionLaboralRepository.findAll().size();
        // set the field null
        informacionLaboral.setFechaInicio(null);

        // Create the InformacionLaboral, which fails.

        restInformacionLaboralMockMvc.perform(post("/api/informacion-laborals")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(informacionLaboral)))
            .andExpect(status().isBadRequest());

        List<InformacionLaboral> informacionLaboralList = informacionLaboralRepository.findAll();
        assertThat(informacionLaboralList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkFechaFinIsRequired() throws Exception {
        int databaseSizeBeforeTest = informacionLaboralRepository.findAll().size();
        // set the field null
        informacionLaboral.setFechaFin(null);

        // Create the InformacionLaboral, which fails.

        restInformacionLaboralMockMvc.perform(post("/api/informacion-laborals")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(informacionLaboral)))
            .andExpect(status().isBadRequest());

        List<InformacionLaboral> informacionLaboralList = informacionLaboralRepository.findAll();
        assertThat(informacionLaboralList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDireccionIsRequired() throws Exception {
        int databaseSizeBeforeTest = informacionLaboralRepository.findAll().size();
        // set the field null
        informacionLaboral.setDireccion(null);

        // Create the InformacionLaboral, which fails.

        restInformacionLaboralMockMvc.perform(post("/api/informacion-laborals")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(informacionLaboral)))
            .andExpect(status().isBadRequest());

        List<InformacionLaboral> informacionLaboralList = informacionLaboralRepository.findAll();
        assertThat(informacionLaboralList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCuidadIsRequired() throws Exception {
        int databaseSizeBeforeTest = informacionLaboralRepository.findAll().size();
        // set the field null
        informacionLaboral.setCuidad(null);

        // Create the InformacionLaboral, which fails.

        restInformacionLaboralMockMvc.perform(post("/api/informacion-laborals")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(informacionLaboral)))
            .andExpect(status().isBadRequest());

        List<InformacionLaboral> informacionLaboralList = informacionLaboralRepository.findAll();
        assertThat(informacionLaboralList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDepartamentoIsRequired() throws Exception {
        int databaseSizeBeforeTest = informacionLaboralRepository.findAll().size();
        // set the field null
        informacionLaboral.setDepartamento(null);

        // Create the InformacionLaboral, which fails.

        restInformacionLaboralMockMvc.perform(post("/api/informacion-laborals")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(informacionLaboral)))
            .andExpect(status().isBadRequest());

        List<InformacionLaboral> informacionLaboralList = informacionLaboralRepository.findAll();
        assertThat(informacionLaboralList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPaisIsRequired() throws Exception {
        int databaseSizeBeforeTest = informacionLaboralRepository.findAll().size();
        // set the field null
        informacionLaboral.setPais(null);

        // Create the InformacionLaboral, which fails.

        restInformacionLaboralMockMvc.perform(post("/api/informacion-laborals")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(informacionLaboral)))
            .andExpect(status().isBadRequest());

        List<InformacionLaboral> informacionLaboralList = informacionLaboralRepository.findAll();
        assertThat(informacionLaboralList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTelefonoEmpresaIsRequired() throws Exception {
        int databaseSizeBeforeTest = informacionLaboralRepository.findAll().size();
        // set the field null
        informacionLaboral.setTelefonoEmpresa(null);

        // Create the InformacionLaboral, which fails.

        restInformacionLaboralMockMvc.perform(post("/api/informacion-laborals")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(informacionLaboral)))
            .andExpect(status().isBadRequest());

        List<InformacionLaboral> informacionLaboralList = informacionLaboralRepository.findAll();
        assertThat(informacionLaboralList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllInformacionLaborals() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList
        restInformacionLaboralMockMvc.perform(get("/api/informacion-laborals?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(informacionLaboral.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreEmpresa").value(hasItem(DEFAULT_NOMBRE_EMPRESA)))
            .andExpect(jsonPath("$.[*].fechaInicio").value(hasItem(DEFAULT_FECHA_INICIO.toString())))
            .andExpect(jsonPath("$.[*].fechaFin").value(hasItem(DEFAULT_FECHA_FIN.toString())))
            .andExpect(jsonPath("$.[*].direccion").value(hasItem(DEFAULT_DIRECCION)))
            .andExpect(jsonPath("$.[*].cuidad").value(hasItem(DEFAULT_CUIDAD)))
            .andExpect(jsonPath("$.[*].departamento").value(hasItem(DEFAULT_DEPARTAMENTO)))
            .andExpect(jsonPath("$.[*].pais").value(hasItem(DEFAULT_PAIS)))
            .andExpect(jsonPath("$.[*].telefonoEmpresa").value(hasItem(DEFAULT_TELEFONO_EMPRESA)));
    }
    
    @Test
    @Transactional
    public void getInformacionLaboral() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get the informacionLaboral
        restInformacionLaboralMockMvc.perform(get("/api/informacion-laborals/{id}", informacionLaboral.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(informacionLaboral.getId().intValue()))
            .andExpect(jsonPath("$.nombreEmpresa").value(DEFAULT_NOMBRE_EMPRESA))
            .andExpect(jsonPath("$.fechaInicio").value(DEFAULT_FECHA_INICIO.toString()))
            .andExpect(jsonPath("$.fechaFin").value(DEFAULT_FECHA_FIN.toString()))
            .andExpect(jsonPath("$.direccion").value(DEFAULT_DIRECCION))
            .andExpect(jsonPath("$.cuidad").value(DEFAULT_CUIDAD))
            .andExpect(jsonPath("$.departamento").value(DEFAULT_DEPARTAMENTO))
            .andExpect(jsonPath("$.pais").value(DEFAULT_PAIS))
            .andExpect(jsonPath("$.telefonoEmpresa").value(DEFAULT_TELEFONO_EMPRESA));
    }


    @Test
    @Transactional
    public void getInformacionLaboralsByIdFiltering() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        Long id = informacionLaboral.getId();

        defaultInformacionLaboralShouldBeFound("id.equals=" + id);
        defaultInformacionLaboralShouldNotBeFound("id.notEquals=" + id);

        defaultInformacionLaboralShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultInformacionLaboralShouldNotBeFound("id.greaterThan=" + id);

        defaultInformacionLaboralShouldBeFound("id.lessThanOrEqual=" + id);
        defaultInformacionLaboralShouldNotBeFound("id.lessThan=" + id);
    }


    @Test
    @Transactional
    public void getAllInformacionLaboralsByNombreEmpresaIsEqualToSomething() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where nombreEmpresa equals to DEFAULT_NOMBRE_EMPRESA
        defaultInformacionLaboralShouldBeFound("nombreEmpresa.equals=" + DEFAULT_NOMBRE_EMPRESA);

        // Get all the informacionLaboralList where nombreEmpresa equals to UPDATED_NOMBRE_EMPRESA
        defaultInformacionLaboralShouldNotBeFound("nombreEmpresa.equals=" + UPDATED_NOMBRE_EMPRESA);
    }

    @Test
    @Transactional
    public void getAllInformacionLaboralsByNombreEmpresaIsNotEqualToSomething() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where nombreEmpresa not equals to DEFAULT_NOMBRE_EMPRESA
        defaultInformacionLaboralShouldNotBeFound("nombreEmpresa.notEquals=" + DEFAULT_NOMBRE_EMPRESA);

        // Get all the informacionLaboralList where nombreEmpresa not equals to UPDATED_NOMBRE_EMPRESA
        defaultInformacionLaboralShouldBeFound("nombreEmpresa.notEquals=" + UPDATED_NOMBRE_EMPRESA);
    }

    @Test
    @Transactional
    public void getAllInformacionLaboralsByNombreEmpresaIsInShouldWork() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where nombreEmpresa in DEFAULT_NOMBRE_EMPRESA or UPDATED_NOMBRE_EMPRESA
        defaultInformacionLaboralShouldBeFound("nombreEmpresa.in=" + DEFAULT_NOMBRE_EMPRESA + "," + UPDATED_NOMBRE_EMPRESA);

        // Get all the informacionLaboralList where nombreEmpresa equals to UPDATED_NOMBRE_EMPRESA
        defaultInformacionLaboralShouldNotBeFound("nombreEmpresa.in=" + UPDATED_NOMBRE_EMPRESA);
    }

    @Test
    @Transactional
    public void getAllInformacionLaboralsByNombreEmpresaIsNullOrNotNull() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where nombreEmpresa is not null
        defaultInformacionLaboralShouldBeFound("nombreEmpresa.specified=true");

        // Get all the informacionLaboralList where nombreEmpresa is null
        defaultInformacionLaboralShouldNotBeFound("nombreEmpresa.specified=false");
    }
                @Test
    @Transactional
    public void getAllInformacionLaboralsByNombreEmpresaContainsSomething() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where nombreEmpresa contains DEFAULT_NOMBRE_EMPRESA
        defaultInformacionLaboralShouldBeFound("nombreEmpresa.contains=" + DEFAULT_NOMBRE_EMPRESA);

        // Get all the informacionLaboralList where nombreEmpresa contains UPDATED_NOMBRE_EMPRESA
        defaultInformacionLaboralShouldNotBeFound("nombreEmpresa.contains=" + UPDATED_NOMBRE_EMPRESA);
    }

    @Test
    @Transactional
    public void getAllInformacionLaboralsByNombreEmpresaNotContainsSomething() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where nombreEmpresa does not contain DEFAULT_NOMBRE_EMPRESA
        defaultInformacionLaboralShouldNotBeFound("nombreEmpresa.doesNotContain=" + DEFAULT_NOMBRE_EMPRESA);

        // Get all the informacionLaboralList where nombreEmpresa does not contain UPDATED_NOMBRE_EMPRESA
        defaultInformacionLaboralShouldBeFound("nombreEmpresa.doesNotContain=" + UPDATED_NOMBRE_EMPRESA);
    }


    @Test
    @Transactional
    public void getAllInformacionLaboralsByFechaInicioIsEqualToSomething() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where fechaInicio equals to DEFAULT_FECHA_INICIO
        defaultInformacionLaboralShouldBeFound("fechaInicio.equals=" + DEFAULT_FECHA_INICIO);

        // Get all the informacionLaboralList where fechaInicio equals to UPDATED_FECHA_INICIO
        defaultInformacionLaboralShouldNotBeFound("fechaInicio.equals=" + UPDATED_FECHA_INICIO);
    }

    @Test
    @Transactional
    public void getAllInformacionLaboralsByFechaInicioIsNotEqualToSomething() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where fechaInicio not equals to DEFAULT_FECHA_INICIO
        defaultInformacionLaboralShouldNotBeFound("fechaInicio.notEquals=" + DEFAULT_FECHA_INICIO);

        // Get all the informacionLaboralList where fechaInicio not equals to UPDATED_FECHA_INICIO
        defaultInformacionLaboralShouldBeFound("fechaInicio.notEquals=" + UPDATED_FECHA_INICIO);
    }

    @Test
    @Transactional
    public void getAllInformacionLaboralsByFechaInicioIsInShouldWork() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where fechaInicio in DEFAULT_FECHA_INICIO or UPDATED_FECHA_INICIO
        defaultInformacionLaboralShouldBeFound("fechaInicio.in=" + DEFAULT_FECHA_INICIO + "," + UPDATED_FECHA_INICIO);

        // Get all the informacionLaboralList where fechaInicio equals to UPDATED_FECHA_INICIO
        defaultInformacionLaboralShouldNotBeFound("fechaInicio.in=" + UPDATED_FECHA_INICIO);
    }

    @Test
    @Transactional
    public void getAllInformacionLaboralsByFechaInicioIsNullOrNotNull() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where fechaInicio is not null
        defaultInformacionLaboralShouldBeFound("fechaInicio.specified=true");

        // Get all the informacionLaboralList where fechaInicio is null
        defaultInformacionLaboralShouldNotBeFound("fechaInicio.specified=false");
    }

    @Test
    @Transactional
    public void getAllInformacionLaboralsByFechaInicioIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where fechaInicio is greater than or equal to DEFAULT_FECHA_INICIO
        defaultInformacionLaboralShouldBeFound("fechaInicio.greaterThanOrEqual=" + DEFAULT_FECHA_INICIO);

        // Get all the informacionLaboralList where fechaInicio is greater than or equal to UPDATED_FECHA_INICIO
        defaultInformacionLaboralShouldNotBeFound("fechaInicio.greaterThanOrEqual=" + UPDATED_FECHA_INICIO);
    }

    @Test
    @Transactional
    public void getAllInformacionLaboralsByFechaInicioIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where fechaInicio is less than or equal to DEFAULT_FECHA_INICIO
        defaultInformacionLaboralShouldBeFound("fechaInicio.lessThanOrEqual=" + DEFAULT_FECHA_INICIO);

        // Get all the informacionLaboralList where fechaInicio is less than or equal to SMALLER_FECHA_INICIO
        defaultInformacionLaboralShouldNotBeFound("fechaInicio.lessThanOrEqual=" + SMALLER_FECHA_INICIO);
    }

    @Test
    @Transactional
    public void getAllInformacionLaboralsByFechaInicioIsLessThanSomething() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where fechaInicio is less than DEFAULT_FECHA_INICIO
        defaultInformacionLaboralShouldNotBeFound("fechaInicio.lessThan=" + DEFAULT_FECHA_INICIO);

        // Get all the informacionLaboralList where fechaInicio is less than UPDATED_FECHA_INICIO
        defaultInformacionLaboralShouldBeFound("fechaInicio.lessThan=" + UPDATED_FECHA_INICIO);
    }

    @Test
    @Transactional
    public void getAllInformacionLaboralsByFechaInicioIsGreaterThanSomething() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where fechaInicio is greater than DEFAULT_FECHA_INICIO
        defaultInformacionLaboralShouldNotBeFound("fechaInicio.greaterThan=" + DEFAULT_FECHA_INICIO);

        // Get all the informacionLaboralList where fechaInicio is greater than SMALLER_FECHA_INICIO
        defaultInformacionLaboralShouldBeFound("fechaInicio.greaterThan=" + SMALLER_FECHA_INICIO);
    }


    @Test
    @Transactional
    public void getAllInformacionLaboralsByFechaFinIsEqualToSomething() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where fechaFin equals to DEFAULT_FECHA_FIN
        defaultInformacionLaboralShouldBeFound("fechaFin.equals=" + DEFAULT_FECHA_FIN);

        // Get all the informacionLaboralList where fechaFin equals to UPDATED_FECHA_FIN
        defaultInformacionLaboralShouldNotBeFound("fechaFin.equals=" + UPDATED_FECHA_FIN);
    }

    @Test
    @Transactional
    public void getAllInformacionLaboralsByFechaFinIsNotEqualToSomething() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where fechaFin not equals to DEFAULT_FECHA_FIN
        defaultInformacionLaboralShouldNotBeFound("fechaFin.notEquals=" + DEFAULT_FECHA_FIN);

        // Get all the informacionLaboralList where fechaFin not equals to UPDATED_FECHA_FIN
        defaultInformacionLaboralShouldBeFound("fechaFin.notEquals=" + UPDATED_FECHA_FIN);
    }

    @Test
    @Transactional
    public void getAllInformacionLaboralsByFechaFinIsInShouldWork() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where fechaFin in DEFAULT_FECHA_FIN or UPDATED_FECHA_FIN
        defaultInformacionLaboralShouldBeFound("fechaFin.in=" + DEFAULT_FECHA_FIN + "," + UPDATED_FECHA_FIN);

        // Get all the informacionLaboralList where fechaFin equals to UPDATED_FECHA_FIN
        defaultInformacionLaboralShouldNotBeFound("fechaFin.in=" + UPDATED_FECHA_FIN);
    }

    @Test
    @Transactional
    public void getAllInformacionLaboralsByFechaFinIsNullOrNotNull() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where fechaFin is not null
        defaultInformacionLaboralShouldBeFound("fechaFin.specified=true");

        // Get all the informacionLaboralList where fechaFin is null
        defaultInformacionLaboralShouldNotBeFound("fechaFin.specified=false");
    }

    @Test
    @Transactional
    public void getAllInformacionLaboralsByFechaFinIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where fechaFin is greater than or equal to DEFAULT_FECHA_FIN
        defaultInformacionLaboralShouldBeFound("fechaFin.greaterThanOrEqual=" + DEFAULT_FECHA_FIN);

        // Get all the informacionLaboralList where fechaFin is greater than or equal to UPDATED_FECHA_FIN
        defaultInformacionLaboralShouldNotBeFound("fechaFin.greaterThanOrEqual=" + UPDATED_FECHA_FIN);
    }

    @Test
    @Transactional
    public void getAllInformacionLaboralsByFechaFinIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where fechaFin is less than or equal to DEFAULT_FECHA_FIN
        defaultInformacionLaboralShouldBeFound("fechaFin.lessThanOrEqual=" + DEFAULT_FECHA_FIN);

        // Get all the informacionLaboralList where fechaFin is less than or equal to SMALLER_FECHA_FIN
        defaultInformacionLaboralShouldNotBeFound("fechaFin.lessThanOrEqual=" + SMALLER_FECHA_FIN);
    }

    @Test
    @Transactional
    public void getAllInformacionLaboralsByFechaFinIsLessThanSomething() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where fechaFin is less than DEFAULT_FECHA_FIN
        defaultInformacionLaboralShouldNotBeFound("fechaFin.lessThan=" + DEFAULT_FECHA_FIN);

        // Get all the informacionLaboralList where fechaFin is less than UPDATED_FECHA_FIN
        defaultInformacionLaboralShouldBeFound("fechaFin.lessThan=" + UPDATED_FECHA_FIN);
    }

    @Test
    @Transactional
    public void getAllInformacionLaboralsByFechaFinIsGreaterThanSomething() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where fechaFin is greater than DEFAULT_FECHA_FIN
        defaultInformacionLaboralShouldNotBeFound("fechaFin.greaterThan=" + DEFAULT_FECHA_FIN);

        // Get all the informacionLaboralList where fechaFin is greater than SMALLER_FECHA_FIN
        defaultInformacionLaboralShouldBeFound("fechaFin.greaterThan=" + SMALLER_FECHA_FIN);
    }


    @Test
    @Transactional
    public void getAllInformacionLaboralsByDireccionIsEqualToSomething() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where direccion equals to DEFAULT_DIRECCION
        defaultInformacionLaboralShouldBeFound("direccion.equals=" + DEFAULT_DIRECCION);

        // Get all the informacionLaboralList where direccion equals to UPDATED_DIRECCION
        defaultInformacionLaboralShouldNotBeFound("direccion.equals=" + UPDATED_DIRECCION);
    }

    @Test
    @Transactional
    public void getAllInformacionLaboralsByDireccionIsNotEqualToSomething() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where direccion not equals to DEFAULT_DIRECCION
        defaultInformacionLaboralShouldNotBeFound("direccion.notEquals=" + DEFAULT_DIRECCION);

        // Get all the informacionLaboralList where direccion not equals to UPDATED_DIRECCION
        defaultInformacionLaboralShouldBeFound("direccion.notEquals=" + UPDATED_DIRECCION);
    }

    @Test
    @Transactional
    public void getAllInformacionLaboralsByDireccionIsInShouldWork() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where direccion in DEFAULT_DIRECCION or UPDATED_DIRECCION
        defaultInformacionLaboralShouldBeFound("direccion.in=" + DEFAULT_DIRECCION + "," + UPDATED_DIRECCION);

        // Get all the informacionLaboralList where direccion equals to UPDATED_DIRECCION
        defaultInformacionLaboralShouldNotBeFound("direccion.in=" + UPDATED_DIRECCION);
    }

    @Test
    @Transactional
    public void getAllInformacionLaboralsByDireccionIsNullOrNotNull() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where direccion is not null
        defaultInformacionLaboralShouldBeFound("direccion.specified=true");

        // Get all the informacionLaboralList where direccion is null
        defaultInformacionLaboralShouldNotBeFound("direccion.specified=false");
    }
                @Test
    @Transactional
    public void getAllInformacionLaboralsByDireccionContainsSomething() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where direccion contains DEFAULT_DIRECCION
        defaultInformacionLaboralShouldBeFound("direccion.contains=" + DEFAULT_DIRECCION);

        // Get all the informacionLaboralList where direccion contains UPDATED_DIRECCION
        defaultInformacionLaboralShouldNotBeFound("direccion.contains=" + UPDATED_DIRECCION);
    }

    @Test
    @Transactional
    public void getAllInformacionLaboralsByDireccionNotContainsSomething() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where direccion does not contain DEFAULT_DIRECCION
        defaultInformacionLaboralShouldNotBeFound("direccion.doesNotContain=" + DEFAULT_DIRECCION);

        // Get all the informacionLaboralList where direccion does not contain UPDATED_DIRECCION
        defaultInformacionLaboralShouldBeFound("direccion.doesNotContain=" + UPDATED_DIRECCION);
    }


    @Test
    @Transactional
    public void getAllInformacionLaboralsByCuidadIsEqualToSomething() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where cuidad equals to DEFAULT_CUIDAD
        defaultInformacionLaboralShouldBeFound("cuidad.equals=" + DEFAULT_CUIDAD);

        // Get all the informacionLaboralList where cuidad equals to UPDATED_CUIDAD
        defaultInformacionLaboralShouldNotBeFound("cuidad.equals=" + UPDATED_CUIDAD);
    }

    @Test
    @Transactional
    public void getAllInformacionLaboralsByCuidadIsNotEqualToSomething() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where cuidad not equals to DEFAULT_CUIDAD
        defaultInformacionLaboralShouldNotBeFound("cuidad.notEquals=" + DEFAULT_CUIDAD);

        // Get all the informacionLaboralList where cuidad not equals to UPDATED_CUIDAD
        defaultInformacionLaboralShouldBeFound("cuidad.notEquals=" + UPDATED_CUIDAD);
    }

    @Test
    @Transactional
    public void getAllInformacionLaboralsByCuidadIsInShouldWork() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where cuidad in DEFAULT_CUIDAD or UPDATED_CUIDAD
        defaultInformacionLaboralShouldBeFound("cuidad.in=" + DEFAULT_CUIDAD + "," + UPDATED_CUIDAD);

        // Get all the informacionLaboralList where cuidad equals to UPDATED_CUIDAD
        defaultInformacionLaboralShouldNotBeFound("cuidad.in=" + UPDATED_CUIDAD);
    }

    @Test
    @Transactional
    public void getAllInformacionLaboralsByCuidadIsNullOrNotNull() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where cuidad is not null
        defaultInformacionLaboralShouldBeFound("cuidad.specified=true");

        // Get all the informacionLaboralList where cuidad is null
        defaultInformacionLaboralShouldNotBeFound("cuidad.specified=false");
    }

    @Test
    @Transactional
    public void getAllInformacionLaboralsByCuidadIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where cuidad is greater than or equal to DEFAULT_CUIDAD
        defaultInformacionLaboralShouldBeFound("cuidad.greaterThanOrEqual=" + DEFAULT_CUIDAD);

        // Get all the informacionLaboralList where cuidad is greater than or equal to UPDATED_CUIDAD
        defaultInformacionLaboralShouldNotBeFound("cuidad.greaterThanOrEqual=" + UPDATED_CUIDAD);
    }

    @Test
    @Transactional
    public void getAllInformacionLaboralsByCuidadIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where cuidad is less than or equal to DEFAULT_CUIDAD
        defaultInformacionLaboralShouldBeFound("cuidad.lessThanOrEqual=" + DEFAULT_CUIDAD);

        // Get all the informacionLaboralList where cuidad is less than or equal to SMALLER_CUIDAD
        defaultInformacionLaboralShouldNotBeFound("cuidad.lessThanOrEqual=" + SMALLER_CUIDAD);
    }

    @Test
    @Transactional
    public void getAllInformacionLaboralsByCuidadIsLessThanSomething() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where cuidad is less than DEFAULT_CUIDAD
        defaultInformacionLaboralShouldNotBeFound("cuidad.lessThan=" + DEFAULT_CUIDAD);

        // Get all the informacionLaboralList where cuidad is less than UPDATED_CUIDAD
        defaultInformacionLaboralShouldBeFound("cuidad.lessThan=" + UPDATED_CUIDAD);
    }

    @Test
    @Transactional
    public void getAllInformacionLaboralsByCuidadIsGreaterThanSomething() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where cuidad is greater than DEFAULT_CUIDAD
        defaultInformacionLaboralShouldNotBeFound("cuidad.greaterThan=" + DEFAULT_CUIDAD);

        // Get all the informacionLaboralList where cuidad is greater than SMALLER_CUIDAD
        defaultInformacionLaboralShouldBeFound("cuidad.greaterThan=" + SMALLER_CUIDAD);
    }


    @Test
    @Transactional
    public void getAllInformacionLaboralsByDepartamentoIsEqualToSomething() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where departamento equals to DEFAULT_DEPARTAMENTO
        defaultInformacionLaboralShouldBeFound("departamento.equals=" + DEFAULT_DEPARTAMENTO);

        // Get all the informacionLaboralList where departamento equals to UPDATED_DEPARTAMENTO
        defaultInformacionLaboralShouldNotBeFound("departamento.equals=" + UPDATED_DEPARTAMENTO);
    }

    @Test
    @Transactional
    public void getAllInformacionLaboralsByDepartamentoIsNotEqualToSomething() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where departamento not equals to DEFAULT_DEPARTAMENTO
        defaultInformacionLaboralShouldNotBeFound("departamento.notEquals=" + DEFAULT_DEPARTAMENTO);

        // Get all the informacionLaboralList where departamento not equals to UPDATED_DEPARTAMENTO
        defaultInformacionLaboralShouldBeFound("departamento.notEquals=" + UPDATED_DEPARTAMENTO);
    }

    @Test
    @Transactional
    public void getAllInformacionLaboralsByDepartamentoIsInShouldWork() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where departamento in DEFAULT_DEPARTAMENTO or UPDATED_DEPARTAMENTO
        defaultInformacionLaboralShouldBeFound("departamento.in=" + DEFAULT_DEPARTAMENTO + "," + UPDATED_DEPARTAMENTO);

        // Get all the informacionLaboralList where departamento equals to UPDATED_DEPARTAMENTO
        defaultInformacionLaboralShouldNotBeFound("departamento.in=" + UPDATED_DEPARTAMENTO);
    }

    @Test
    @Transactional
    public void getAllInformacionLaboralsByDepartamentoIsNullOrNotNull() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where departamento is not null
        defaultInformacionLaboralShouldBeFound("departamento.specified=true");

        // Get all the informacionLaboralList where departamento is null
        defaultInformacionLaboralShouldNotBeFound("departamento.specified=false");
    }

    @Test
    @Transactional
    public void getAllInformacionLaboralsByDepartamentoIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where departamento is greater than or equal to DEFAULT_DEPARTAMENTO
        defaultInformacionLaboralShouldBeFound("departamento.greaterThanOrEqual=" + DEFAULT_DEPARTAMENTO);

        // Get all the informacionLaboralList where departamento is greater than or equal to UPDATED_DEPARTAMENTO
        defaultInformacionLaboralShouldNotBeFound("departamento.greaterThanOrEqual=" + UPDATED_DEPARTAMENTO);
    }

    @Test
    @Transactional
    public void getAllInformacionLaboralsByDepartamentoIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where departamento is less than or equal to DEFAULT_DEPARTAMENTO
        defaultInformacionLaboralShouldBeFound("departamento.lessThanOrEqual=" + DEFAULT_DEPARTAMENTO);

        // Get all the informacionLaboralList where departamento is less than or equal to SMALLER_DEPARTAMENTO
        defaultInformacionLaboralShouldNotBeFound("departamento.lessThanOrEqual=" + SMALLER_DEPARTAMENTO);
    }

    @Test
    @Transactional
    public void getAllInformacionLaboralsByDepartamentoIsLessThanSomething() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where departamento is less than DEFAULT_DEPARTAMENTO
        defaultInformacionLaboralShouldNotBeFound("departamento.lessThan=" + DEFAULT_DEPARTAMENTO);

        // Get all the informacionLaboralList where departamento is less than UPDATED_DEPARTAMENTO
        defaultInformacionLaboralShouldBeFound("departamento.lessThan=" + UPDATED_DEPARTAMENTO);
    }

    @Test
    @Transactional
    public void getAllInformacionLaboralsByDepartamentoIsGreaterThanSomething() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where departamento is greater than DEFAULT_DEPARTAMENTO
        defaultInformacionLaboralShouldNotBeFound("departamento.greaterThan=" + DEFAULT_DEPARTAMENTO);

        // Get all the informacionLaboralList where departamento is greater than SMALLER_DEPARTAMENTO
        defaultInformacionLaboralShouldBeFound("departamento.greaterThan=" + SMALLER_DEPARTAMENTO);
    }


    @Test
    @Transactional
    public void getAllInformacionLaboralsByPaisIsEqualToSomething() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where pais equals to DEFAULT_PAIS
        defaultInformacionLaboralShouldBeFound("pais.equals=" + DEFAULT_PAIS);

        // Get all the informacionLaboralList where pais equals to UPDATED_PAIS
        defaultInformacionLaboralShouldNotBeFound("pais.equals=" + UPDATED_PAIS);
    }

    @Test
    @Transactional
    public void getAllInformacionLaboralsByPaisIsNotEqualToSomething() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where pais not equals to DEFAULT_PAIS
        defaultInformacionLaboralShouldNotBeFound("pais.notEquals=" + DEFAULT_PAIS);

        // Get all the informacionLaboralList where pais not equals to UPDATED_PAIS
        defaultInformacionLaboralShouldBeFound("pais.notEquals=" + UPDATED_PAIS);
    }

    @Test
    @Transactional
    public void getAllInformacionLaboralsByPaisIsInShouldWork() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where pais in DEFAULT_PAIS or UPDATED_PAIS
        defaultInformacionLaboralShouldBeFound("pais.in=" + DEFAULT_PAIS + "," + UPDATED_PAIS);

        // Get all the informacionLaboralList where pais equals to UPDATED_PAIS
        defaultInformacionLaboralShouldNotBeFound("pais.in=" + UPDATED_PAIS);
    }

    @Test
    @Transactional
    public void getAllInformacionLaboralsByPaisIsNullOrNotNull() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where pais is not null
        defaultInformacionLaboralShouldBeFound("pais.specified=true");

        // Get all the informacionLaboralList where pais is null
        defaultInformacionLaboralShouldNotBeFound("pais.specified=false");
    }

    @Test
    @Transactional
    public void getAllInformacionLaboralsByPaisIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where pais is greater than or equal to DEFAULT_PAIS
        defaultInformacionLaboralShouldBeFound("pais.greaterThanOrEqual=" + DEFAULT_PAIS);

        // Get all the informacionLaboralList where pais is greater than or equal to UPDATED_PAIS
        defaultInformacionLaboralShouldNotBeFound("pais.greaterThanOrEqual=" + UPDATED_PAIS);
    }

    @Test
    @Transactional
    public void getAllInformacionLaboralsByPaisIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where pais is less than or equal to DEFAULT_PAIS
        defaultInformacionLaboralShouldBeFound("pais.lessThanOrEqual=" + DEFAULT_PAIS);

        // Get all the informacionLaboralList where pais is less than or equal to SMALLER_PAIS
        defaultInformacionLaboralShouldNotBeFound("pais.lessThanOrEqual=" + SMALLER_PAIS);
    }

    @Test
    @Transactional
    public void getAllInformacionLaboralsByPaisIsLessThanSomething() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where pais is less than DEFAULT_PAIS
        defaultInformacionLaboralShouldNotBeFound("pais.lessThan=" + DEFAULT_PAIS);

        // Get all the informacionLaboralList where pais is less than UPDATED_PAIS
        defaultInformacionLaboralShouldBeFound("pais.lessThan=" + UPDATED_PAIS);
    }

    @Test
    @Transactional
    public void getAllInformacionLaboralsByPaisIsGreaterThanSomething() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where pais is greater than DEFAULT_PAIS
        defaultInformacionLaboralShouldNotBeFound("pais.greaterThan=" + DEFAULT_PAIS);

        // Get all the informacionLaboralList where pais is greater than SMALLER_PAIS
        defaultInformacionLaboralShouldBeFound("pais.greaterThan=" + SMALLER_PAIS);
    }


    @Test
    @Transactional
    public void getAllInformacionLaboralsByTelefonoEmpresaIsEqualToSomething() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where telefonoEmpresa equals to DEFAULT_TELEFONO_EMPRESA
        defaultInformacionLaboralShouldBeFound("telefonoEmpresa.equals=" + DEFAULT_TELEFONO_EMPRESA);

        // Get all the informacionLaboralList where telefonoEmpresa equals to UPDATED_TELEFONO_EMPRESA
        defaultInformacionLaboralShouldNotBeFound("telefonoEmpresa.equals=" + UPDATED_TELEFONO_EMPRESA);
    }

    @Test
    @Transactional
    public void getAllInformacionLaboralsByTelefonoEmpresaIsNotEqualToSomething() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where telefonoEmpresa not equals to DEFAULT_TELEFONO_EMPRESA
        defaultInformacionLaboralShouldNotBeFound("telefonoEmpresa.notEquals=" + DEFAULT_TELEFONO_EMPRESA);

        // Get all the informacionLaboralList where telefonoEmpresa not equals to UPDATED_TELEFONO_EMPRESA
        defaultInformacionLaboralShouldBeFound("telefonoEmpresa.notEquals=" + UPDATED_TELEFONO_EMPRESA);
    }

    @Test
    @Transactional
    public void getAllInformacionLaboralsByTelefonoEmpresaIsInShouldWork() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where telefonoEmpresa in DEFAULT_TELEFONO_EMPRESA or UPDATED_TELEFONO_EMPRESA
        defaultInformacionLaboralShouldBeFound("telefonoEmpresa.in=" + DEFAULT_TELEFONO_EMPRESA + "," + UPDATED_TELEFONO_EMPRESA);

        // Get all the informacionLaboralList where telefonoEmpresa equals to UPDATED_TELEFONO_EMPRESA
        defaultInformacionLaboralShouldNotBeFound("telefonoEmpresa.in=" + UPDATED_TELEFONO_EMPRESA);
    }

    @Test
    @Transactional
    public void getAllInformacionLaboralsByTelefonoEmpresaIsNullOrNotNull() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where telefonoEmpresa is not null
        defaultInformacionLaboralShouldBeFound("telefonoEmpresa.specified=true");

        // Get all the informacionLaboralList where telefonoEmpresa is null
        defaultInformacionLaboralShouldNotBeFound("telefonoEmpresa.specified=false");
    }
                @Test
    @Transactional
    public void getAllInformacionLaboralsByTelefonoEmpresaContainsSomething() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where telefonoEmpresa contains DEFAULT_TELEFONO_EMPRESA
        defaultInformacionLaboralShouldBeFound("telefonoEmpresa.contains=" + DEFAULT_TELEFONO_EMPRESA);

        // Get all the informacionLaboralList where telefonoEmpresa contains UPDATED_TELEFONO_EMPRESA
        defaultInformacionLaboralShouldNotBeFound("telefonoEmpresa.contains=" + UPDATED_TELEFONO_EMPRESA);
    }

    @Test
    @Transactional
    public void getAllInformacionLaboralsByTelefonoEmpresaNotContainsSomething() throws Exception {
        // Initialize the database
        informacionLaboralRepository.saveAndFlush(informacionLaboral);

        // Get all the informacionLaboralList where telefonoEmpresa does not contain DEFAULT_TELEFONO_EMPRESA
        defaultInformacionLaboralShouldNotBeFound("telefonoEmpresa.doesNotContain=" + DEFAULT_TELEFONO_EMPRESA);

        // Get all the informacionLaboralList where telefonoEmpresa does not contain UPDATED_TELEFONO_EMPRESA
        defaultInformacionLaboralShouldBeFound("telefonoEmpresa.doesNotContain=" + UPDATED_TELEFONO_EMPRESA);
    }


    @Test
    @Transactional
    public void getAllInformacionLaboralsByUsuarioIsEqualToSomething() throws Exception {
        // Get already existing entity
        Persona usuario = informacionLaboral.getUsuario();
        informacionLaboralRepository.saveAndFlush(informacionLaboral);
        Long usuarioId = usuario.getId();

        // Get all the informacionLaboralList where usuario equals to usuarioId
        defaultInformacionLaboralShouldBeFound("usuarioId.equals=" + usuarioId);

        // Get all the informacionLaboralList where usuario equals to usuarioId + 1
        defaultInformacionLaboralShouldNotBeFound("usuarioId.equals=" + (usuarioId + 1));
    }


    @Test
    @Transactional
    public void getAllInformacionLaboralsByDependenciaIsEqualToSomething() throws Exception {
        // Get already existing entity
        Dependencia dependencia = informacionLaboral.getDependencia();
        informacionLaboralRepository.saveAndFlush(informacionLaboral);
        Long dependenciaId = dependencia.getId();

        // Get all the informacionLaboralList where dependencia equals to dependenciaId
        defaultInformacionLaboralShouldBeFound("dependenciaId.equals=" + dependenciaId);

        // Get all the informacionLaboralList where dependencia equals to dependenciaId + 1
        defaultInformacionLaboralShouldNotBeFound("dependenciaId.equals=" + (dependenciaId + 1));
    }


    @Test
    @Transactional
    public void getAllInformacionLaboralsByCargoIsEqualToSomething() throws Exception {
        // Get already existing entity
        Cargo cargo = informacionLaboral.getCargo();
        informacionLaboralRepository.saveAndFlush(informacionLaboral);
        Long cargoId = cargo.getId();

        // Get all the informacionLaboralList where cargo equals to cargoId
        defaultInformacionLaboralShouldBeFound("cargoId.equals=" + cargoId);

        // Get all the informacionLaboralList where cargo equals to cargoId + 1
        defaultInformacionLaboralShouldNotBeFound("cargoId.equals=" + (cargoId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultInformacionLaboralShouldBeFound(String filter) throws Exception {
        restInformacionLaboralMockMvc.perform(get("/api/informacion-laborals?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(informacionLaboral.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreEmpresa").value(hasItem(DEFAULT_NOMBRE_EMPRESA)))
            .andExpect(jsonPath("$.[*].fechaInicio").value(hasItem(DEFAULT_FECHA_INICIO.toString())))
            .andExpect(jsonPath("$.[*].fechaFin").value(hasItem(DEFAULT_FECHA_FIN.toString())))
            .andExpect(jsonPath("$.[*].direccion").value(hasItem(DEFAULT_DIRECCION)))
            .andExpect(jsonPath("$.[*].cuidad").value(hasItem(DEFAULT_CUIDAD)))
            .andExpect(jsonPath("$.[*].departamento").value(hasItem(DEFAULT_DEPARTAMENTO)))
            .andExpect(jsonPath("$.[*].pais").value(hasItem(DEFAULT_PAIS)))
            .andExpect(jsonPath("$.[*].telefonoEmpresa").value(hasItem(DEFAULT_TELEFONO_EMPRESA)));

        // Check, that the count call also returns 1
        restInformacionLaboralMockMvc.perform(get("/api/informacion-laborals/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultInformacionLaboralShouldNotBeFound(String filter) throws Exception {
        restInformacionLaboralMockMvc.perform(get("/api/informacion-laborals?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restInformacionLaboralMockMvc.perform(get("/api/informacion-laborals/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingInformacionLaboral() throws Exception {
        // Get the informacionLaboral
        restInformacionLaboralMockMvc.perform(get("/api/informacion-laborals/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInformacionLaboral() throws Exception {
        // Initialize the database
        informacionLaboralService.save(informacionLaboral);

        int databaseSizeBeforeUpdate = informacionLaboralRepository.findAll().size();

        // Update the informacionLaboral
        InformacionLaboral updatedInformacionLaboral = informacionLaboralRepository.findById(informacionLaboral.getId()).get();
        // Disconnect from session so that the updates on updatedInformacionLaboral are not directly saved in db
        em.detach(updatedInformacionLaboral);
        updatedInformacionLaboral
            .nombreEmpresa(UPDATED_NOMBRE_EMPRESA)
            .fechaInicio(UPDATED_FECHA_INICIO)
            .fechaFin(UPDATED_FECHA_FIN)
            .direccion(UPDATED_DIRECCION)
            .cuidad(UPDATED_CUIDAD)
            .departamento(UPDATED_DEPARTAMENTO)
            .pais(UPDATED_PAIS)
            .telefonoEmpresa(UPDATED_TELEFONO_EMPRESA);

        restInformacionLaboralMockMvc.perform(put("/api/informacion-laborals")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedInformacionLaboral)))
            .andExpect(status().isOk());

        // Validate the InformacionLaboral in the database
        List<InformacionLaboral> informacionLaboralList = informacionLaboralRepository.findAll();
        assertThat(informacionLaboralList).hasSize(databaseSizeBeforeUpdate);
        InformacionLaboral testInformacionLaboral = informacionLaboralList.get(informacionLaboralList.size() - 1);
        assertThat(testInformacionLaboral.getNombreEmpresa()).isEqualTo(UPDATED_NOMBRE_EMPRESA);
        assertThat(testInformacionLaboral.getFechaInicio()).isEqualTo(UPDATED_FECHA_INICIO);
        assertThat(testInformacionLaboral.getFechaFin()).isEqualTo(UPDATED_FECHA_FIN);
        assertThat(testInformacionLaboral.getDireccion()).isEqualTo(UPDATED_DIRECCION);
        assertThat(testInformacionLaboral.getCuidad()).isEqualTo(UPDATED_CUIDAD);
        assertThat(testInformacionLaboral.getDepartamento()).isEqualTo(UPDATED_DEPARTAMENTO);
        assertThat(testInformacionLaboral.getPais()).isEqualTo(UPDATED_PAIS);
        assertThat(testInformacionLaboral.getTelefonoEmpresa()).isEqualTo(UPDATED_TELEFONO_EMPRESA);
    }

    @Test
    @Transactional
    public void updateNonExistingInformacionLaboral() throws Exception {
        int databaseSizeBeforeUpdate = informacionLaboralRepository.findAll().size();

        // Create the InformacionLaboral

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInformacionLaboralMockMvc.perform(put("/api/informacion-laborals")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(informacionLaboral)))
            .andExpect(status().isBadRequest());

        // Validate the InformacionLaboral in the database
        List<InformacionLaboral> informacionLaboralList = informacionLaboralRepository.findAll();
        assertThat(informacionLaboralList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteInformacionLaboral() throws Exception {
        // Initialize the database
        informacionLaboralService.save(informacionLaboral);

        int databaseSizeBeforeDelete = informacionLaboralRepository.findAll().size();

        // Delete the informacionLaboral
        restInformacionLaboralMockMvc.perform(delete("/api/informacion-laborals/{id}", informacionLaboral.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<InformacionLaboral> informacionLaboralList = informacionLaboralRepository.findAll();
        assertThat(informacionLaboralList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
