package com.web.rest;

import com.CtProjectApp;
import com.domain.InformacionAcademica;
import com.domain.Persona;
import com.domain.Institucion;
import com.repository.InformacionAcademicaRepository;
import com.service.InformacionAcademicaService;
import com.service.dto.InformacionAcademicaCriteria;
import com.service.InformacionAcademicaQueryService;

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
 * Integration tests for the {@link InformacionAcademicaResource} REST controller.
 */
@SpringBootTest(classes = CtProjectApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class InformacionAcademicaResourceIT {

    private static final Integer DEFAULT_NIVEL_ESTUDIO = 1;
    private static final Integer UPDATED_NIVEL_ESTUDIO = 2;
    private static final Integer SMALLER_NIVEL_ESTUDIO = 1 - 1;

    private static final Integer DEFAULT_ESTADO = 1;
    private static final Integer UPDATED_ESTADO = 2;
    private static final Integer SMALLER_ESTADO = 1 - 1;

    private static final LocalDate DEFAULT_FECHA_INICIO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_INICIO = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_FECHA_INICIO = LocalDate.ofEpochDay(-1L);

    private static final LocalDate DEFAULT_FECHA_FIN = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_FIN = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_FECHA_FIN = LocalDate.ofEpochDay(-1L);

    private static final String DEFAULT_TITULO_OTORGADO = "AAAAAAAAAA";
    private static final String UPDATED_TITULO_OTORGADO = "BBBBBBBBBB";

    @Autowired
    private InformacionAcademicaRepository informacionAcademicaRepository;

    @Autowired
    private InformacionAcademicaService informacionAcademicaService;

    @Autowired
    private InformacionAcademicaQueryService informacionAcademicaQueryService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restInformacionAcademicaMockMvc;

    private InformacionAcademica informacionAcademica;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static InformacionAcademica createEntity(EntityManager em) {
        InformacionAcademica informacionAcademica = new InformacionAcademica()
            .nivelEstudio(DEFAULT_NIVEL_ESTUDIO)
            .estado(DEFAULT_ESTADO)
            .fechaInicio(DEFAULT_FECHA_INICIO)
            .fechaFin(DEFAULT_FECHA_FIN)
            .tituloOtorgado(DEFAULT_TITULO_OTORGADO);
        // Add required entity
        Persona persona;
        if (TestUtil.findAll(em, Persona.class).isEmpty()) {
            persona = PersonaResourceIT.createEntity(em);
            em.persist(persona);
            em.flush();
        } else {
            persona = TestUtil.findAll(em, Persona.class).get(0);
        }
        informacionAcademica.setUsuario(persona);
        return informacionAcademica;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static InformacionAcademica createUpdatedEntity(EntityManager em) {
        InformacionAcademica informacionAcademica = new InformacionAcademica()
            .nivelEstudio(UPDATED_NIVEL_ESTUDIO)
            .estado(UPDATED_ESTADO)
            .fechaInicio(UPDATED_FECHA_INICIO)
            .fechaFin(UPDATED_FECHA_FIN)
            .tituloOtorgado(UPDATED_TITULO_OTORGADO);
        // Add required entity
        Persona persona;
        if (TestUtil.findAll(em, Persona.class).isEmpty()) {
            persona = PersonaResourceIT.createUpdatedEntity(em);
            em.persist(persona);
            em.flush();
        } else {
            persona = TestUtil.findAll(em, Persona.class).get(0);
        }
        informacionAcademica.setUsuario(persona);
        return informacionAcademica;
    }

    @BeforeEach
    public void initTest() {
        informacionAcademica = createEntity(em);
    }

    @Test
    @Transactional
    public void createInformacionAcademica() throws Exception {
        int databaseSizeBeforeCreate = informacionAcademicaRepository.findAll().size();

        // Create the InformacionAcademica
        restInformacionAcademicaMockMvc.perform(post("/api/informacion-academicas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(informacionAcademica)))
            .andExpect(status().isCreated());

        // Validate the InformacionAcademica in the database
        List<InformacionAcademica> informacionAcademicaList = informacionAcademicaRepository.findAll();
        assertThat(informacionAcademicaList).hasSize(databaseSizeBeforeCreate + 1);
        InformacionAcademica testInformacionAcademica = informacionAcademicaList.get(informacionAcademicaList.size() - 1);
        assertThat(testInformacionAcademica.getNivelEstudio()).isEqualTo(DEFAULT_NIVEL_ESTUDIO);
        assertThat(testInformacionAcademica.getEstado()).isEqualTo(DEFAULT_ESTADO);
        assertThat(testInformacionAcademica.getFechaInicio()).isEqualTo(DEFAULT_FECHA_INICIO);
        assertThat(testInformacionAcademica.getFechaFin()).isEqualTo(DEFAULT_FECHA_FIN);
        assertThat(testInformacionAcademica.getTituloOtorgado()).isEqualTo(DEFAULT_TITULO_OTORGADO);
    }

    @Test
    @Transactional
    public void createInformacionAcademicaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = informacionAcademicaRepository.findAll().size();

        // Create the InformacionAcademica with an existing ID
        informacionAcademica.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInformacionAcademicaMockMvc.perform(post("/api/informacion-academicas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(informacionAcademica)))
            .andExpect(status().isBadRequest());

        // Validate the InformacionAcademica in the database
        List<InformacionAcademica> informacionAcademicaList = informacionAcademicaRepository.findAll();
        assertThat(informacionAcademicaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkEstadoIsRequired() throws Exception {
        int databaseSizeBeforeTest = informacionAcademicaRepository.findAll().size();
        // set the field null
        informacionAcademica.setEstado(null);

        // Create the InformacionAcademica, which fails.

        restInformacionAcademicaMockMvc.perform(post("/api/informacion-academicas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(informacionAcademica)))
            .andExpect(status().isBadRequest());

        List<InformacionAcademica> informacionAcademicaList = informacionAcademicaRepository.findAll();
        assertThat(informacionAcademicaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllInformacionAcademicas() throws Exception {
        // Initialize the database
        informacionAcademicaRepository.saveAndFlush(informacionAcademica);

        // Get all the informacionAcademicaList
        restInformacionAcademicaMockMvc.perform(get("/api/informacion-academicas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(informacionAcademica.getId().intValue())))
            .andExpect(jsonPath("$.[*].nivelEstudio").value(hasItem(DEFAULT_NIVEL_ESTUDIO)))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO)))
            .andExpect(jsonPath("$.[*].fechaInicio").value(hasItem(DEFAULT_FECHA_INICIO.toString())))
            .andExpect(jsonPath("$.[*].fechaFin").value(hasItem(DEFAULT_FECHA_FIN.toString())))
            .andExpect(jsonPath("$.[*].tituloOtorgado").value(hasItem(DEFAULT_TITULO_OTORGADO)));
    }
    
    @Test
    @Transactional
    public void getInformacionAcademica() throws Exception {
        // Initialize the database
        informacionAcademicaRepository.saveAndFlush(informacionAcademica);

        // Get the informacionAcademica
        restInformacionAcademicaMockMvc.perform(get("/api/informacion-academicas/{id}", informacionAcademica.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(informacionAcademica.getId().intValue()))
            .andExpect(jsonPath("$.nivelEstudio").value(DEFAULT_NIVEL_ESTUDIO))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO))
            .andExpect(jsonPath("$.fechaInicio").value(DEFAULT_FECHA_INICIO.toString()))
            .andExpect(jsonPath("$.fechaFin").value(DEFAULT_FECHA_FIN.toString()))
            .andExpect(jsonPath("$.tituloOtorgado").value(DEFAULT_TITULO_OTORGADO));
    }


    @Test
    @Transactional
    public void getInformacionAcademicasByIdFiltering() throws Exception {
        // Initialize the database
        informacionAcademicaRepository.saveAndFlush(informacionAcademica);

        Long id = informacionAcademica.getId();

        defaultInformacionAcademicaShouldBeFound("id.equals=" + id);
        defaultInformacionAcademicaShouldNotBeFound("id.notEquals=" + id);

        defaultInformacionAcademicaShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultInformacionAcademicaShouldNotBeFound("id.greaterThan=" + id);

        defaultInformacionAcademicaShouldBeFound("id.lessThanOrEqual=" + id);
        defaultInformacionAcademicaShouldNotBeFound("id.lessThan=" + id);
    }


    @Test
    @Transactional
    public void getAllInformacionAcademicasByNivelEstudioIsEqualToSomething() throws Exception {
        // Initialize the database
        informacionAcademicaRepository.saveAndFlush(informacionAcademica);

        // Get all the informacionAcademicaList where nivelEstudio equals to DEFAULT_NIVEL_ESTUDIO
        defaultInformacionAcademicaShouldBeFound("nivelEstudio.equals=" + DEFAULT_NIVEL_ESTUDIO);

        // Get all the informacionAcademicaList where nivelEstudio equals to UPDATED_NIVEL_ESTUDIO
        defaultInformacionAcademicaShouldNotBeFound("nivelEstudio.equals=" + UPDATED_NIVEL_ESTUDIO);
    }

    @Test
    @Transactional
    public void getAllInformacionAcademicasByNivelEstudioIsNotEqualToSomething() throws Exception {
        // Initialize the database
        informacionAcademicaRepository.saveAndFlush(informacionAcademica);

        // Get all the informacionAcademicaList where nivelEstudio not equals to DEFAULT_NIVEL_ESTUDIO
        defaultInformacionAcademicaShouldNotBeFound("nivelEstudio.notEquals=" + DEFAULT_NIVEL_ESTUDIO);

        // Get all the informacionAcademicaList where nivelEstudio not equals to UPDATED_NIVEL_ESTUDIO
        defaultInformacionAcademicaShouldBeFound("nivelEstudio.notEquals=" + UPDATED_NIVEL_ESTUDIO);
    }

    @Test
    @Transactional
    public void getAllInformacionAcademicasByNivelEstudioIsInShouldWork() throws Exception {
        // Initialize the database
        informacionAcademicaRepository.saveAndFlush(informacionAcademica);

        // Get all the informacionAcademicaList where nivelEstudio in DEFAULT_NIVEL_ESTUDIO or UPDATED_NIVEL_ESTUDIO
        defaultInformacionAcademicaShouldBeFound("nivelEstudio.in=" + DEFAULT_NIVEL_ESTUDIO + "," + UPDATED_NIVEL_ESTUDIO);

        // Get all the informacionAcademicaList where nivelEstudio equals to UPDATED_NIVEL_ESTUDIO
        defaultInformacionAcademicaShouldNotBeFound("nivelEstudio.in=" + UPDATED_NIVEL_ESTUDIO);
    }

    @Test
    @Transactional
    public void getAllInformacionAcademicasByNivelEstudioIsNullOrNotNull() throws Exception {
        // Initialize the database
        informacionAcademicaRepository.saveAndFlush(informacionAcademica);

        // Get all the informacionAcademicaList where nivelEstudio is not null
        defaultInformacionAcademicaShouldBeFound("nivelEstudio.specified=true");

        // Get all the informacionAcademicaList where nivelEstudio is null
        defaultInformacionAcademicaShouldNotBeFound("nivelEstudio.specified=false");
    }

    @Test
    @Transactional
    public void getAllInformacionAcademicasByNivelEstudioIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        informacionAcademicaRepository.saveAndFlush(informacionAcademica);

        // Get all the informacionAcademicaList where nivelEstudio is greater than or equal to DEFAULT_NIVEL_ESTUDIO
        defaultInformacionAcademicaShouldBeFound("nivelEstudio.greaterThanOrEqual=" + DEFAULT_NIVEL_ESTUDIO);

        // Get all the informacionAcademicaList where nivelEstudio is greater than or equal to UPDATED_NIVEL_ESTUDIO
        defaultInformacionAcademicaShouldNotBeFound("nivelEstudio.greaterThanOrEqual=" + UPDATED_NIVEL_ESTUDIO);
    }

    @Test
    @Transactional
    public void getAllInformacionAcademicasByNivelEstudioIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        informacionAcademicaRepository.saveAndFlush(informacionAcademica);

        // Get all the informacionAcademicaList where nivelEstudio is less than or equal to DEFAULT_NIVEL_ESTUDIO
        defaultInformacionAcademicaShouldBeFound("nivelEstudio.lessThanOrEqual=" + DEFAULT_NIVEL_ESTUDIO);

        // Get all the informacionAcademicaList where nivelEstudio is less than or equal to SMALLER_NIVEL_ESTUDIO
        defaultInformacionAcademicaShouldNotBeFound("nivelEstudio.lessThanOrEqual=" + SMALLER_NIVEL_ESTUDIO);
    }

    @Test
    @Transactional
    public void getAllInformacionAcademicasByNivelEstudioIsLessThanSomething() throws Exception {
        // Initialize the database
        informacionAcademicaRepository.saveAndFlush(informacionAcademica);

        // Get all the informacionAcademicaList where nivelEstudio is less than DEFAULT_NIVEL_ESTUDIO
        defaultInformacionAcademicaShouldNotBeFound("nivelEstudio.lessThan=" + DEFAULT_NIVEL_ESTUDIO);

        // Get all the informacionAcademicaList where nivelEstudio is less than UPDATED_NIVEL_ESTUDIO
        defaultInformacionAcademicaShouldBeFound("nivelEstudio.lessThan=" + UPDATED_NIVEL_ESTUDIO);
    }

    @Test
    @Transactional
    public void getAllInformacionAcademicasByNivelEstudioIsGreaterThanSomething() throws Exception {
        // Initialize the database
        informacionAcademicaRepository.saveAndFlush(informacionAcademica);

        // Get all the informacionAcademicaList where nivelEstudio is greater than DEFAULT_NIVEL_ESTUDIO
        defaultInformacionAcademicaShouldNotBeFound("nivelEstudio.greaterThan=" + DEFAULT_NIVEL_ESTUDIO);

        // Get all the informacionAcademicaList where nivelEstudio is greater than SMALLER_NIVEL_ESTUDIO
        defaultInformacionAcademicaShouldBeFound("nivelEstudio.greaterThan=" + SMALLER_NIVEL_ESTUDIO);
    }


    @Test
    @Transactional
    public void getAllInformacionAcademicasByEstadoIsEqualToSomething() throws Exception {
        // Initialize the database
        informacionAcademicaRepository.saveAndFlush(informacionAcademica);

        // Get all the informacionAcademicaList where estado equals to DEFAULT_ESTADO
        defaultInformacionAcademicaShouldBeFound("estado.equals=" + DEFAULT_ESTADO);

        // Get all the informacionAcademicaList where estado equals to UPDATED_ESTADO
        defaultInformacionAcademicaShouldNotBeFound("estado.equals=" + UPDATED_ESTADO);
    }

    @Test
    @Transactional
    public void getAllInformacionAcademicasByEstadoIsNotEqualToSomething() throws Exception {
        // Initialize the database
        informacionAcademicaRepository.saveAndFlush(informacionAcademica);

        // Get all the informacionAcademicaList where estado not equals to DEFAULT_ESTADO
        defaultInformacionAcademicaShouldNotBeFound("estado.notEquals=" + DEFAULT_ESTADO);

        // Get all the informacionAcademicaList where estado not equals to UPDATED_ESTADO
        defaultInformacionAcademicaShouldBeFound("estado.notEquals=" + UPDATED_ESTADO);
    }

    @Test
    @Transactional
    public void getAllInformacionAcademicasByEstadoIsInShouldWork() throws Exception {
        // Initialize the database
        informacionAcademicaRepository.saveAndFlush(informacionAcademica);

        // Get all the informacionAcademicaList where estado in DEFAULT_ESTADO or UPDATED_ESTADO
        defaultInformacionAcademicaShouldBeFound("estado.in=" + DEFAULT_ESTADO + "," + UPDATED_ESTADO);

        // Get all the informacionAcademicaList where estado equals to UPDATED_ESTADO
        defaultInformacionAcademicaShouldNotBeFound("estado.in=" + UPDATED_ESTADO);
    }

    @Test
    @Transactional
    public void getAllInformacionAcademicasByEstadoIsNullOrNotNull() throws Exception {
        // Initialize the database
        informacionAcademicaRepository.saveAndFlush(informacionAcademica);

        // Get all the informacionAcademicaList where estado is not null
        defaultInformacionAcademicaShouldBeFound("estado.specified=true");

        // Get all the informacionAcademicaList where estado is null
        defaultInformacionAcademicaShouldNotBeFound("estado.specified=false");
    }

    @Test
    @Transactional
    public void getAllInformacionAcademicasByEstadoIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        informacionAcademicaRepository.saveAndFlush(informacionAcademica);

        // Get all the informacionAcademicaList where estado is greater than or equal to DEFAULT_ESTADO
        defaultInformacionAcademicaShouldBeFound("estado.greaterThanOrEqual=" + DEFAULT_ESTADO);

        // Get all the informacionAcademicaList where estado is greater than or equal to UPDATED_ESTADO
        defaultInformacionAcademicaShouldNotBeFound("estado.greaterThanOrEqual=" + UPDATED_ESTADO);
    }

    @Test
    @Transactional
    public void getAllInformacionAcademicasByEstadoIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        informacionAcademicaRepository.saveAndFlush(informacionAcademica);

        // Get all the informacionAcademicaList where estado is less than or equal to DEFAULT_ESTADO
        defaultInformacionAcademicaShouldBeFound("estado.lessThanOrEqual=" + DEFAULT_ESTADO);

        // Get all the informacionAcademicaList where estado is less than or equal to SMALLER_ESTADO
        defaultInformacionAcademicaShouldNotBeFound("estado.lessThanOrEqual=" + SMALLER_ESTADO);
    }

    @Test
    @Transactional
    public void getAllInformacionAcademicasByEstadoIsLessThanSomething() throws Exception {
        // Initialize the database
        informacionAcademicaRepository.saveAndFlush(informacionAcademica);

        // Get all the informacionAcademicaList where estado is less than DEFAULT_ESTADO
        defaultInformacionAcademicaShouldNotBeFound("estado.lessThan=" + DEFAULT_ESTADO);

        // Get all the informacionAcademicaList where estado is less than UPDATED_ESTADO
        defaultInformacionAcademicaShouldBeFound("estado.lessThan=" + UPDATED_ESTADO);
    }

    @Test
    @Transactional
    public void getAllInformacionAcademicasByEstadoIsGreaterThanSomething() throws Exception {
        // Initialize the database
        informacionAcademicaRepository.saveAndFlush(informacionAcademica);

        // Get all the informacionAcademicaList where estado is greater than DEFAULT_ESTADO
        defaultInformacionAcademicaShouldNotBeFound("estado.greaterThan=" + DEFAULT_ESTADO);

        // Get all the informacionAcademicaList where estado is greater than SMALLER_ESTADO
        defaultInformacionAcademicaShouldBeFound("estado.greaterThan=" + SMALLER_ESTADO);
    }


    @Test
    @Transactional
    public void getAllInformacionAcademicasByFechaInicioIsEqualToSomething() throws Exception {
        // Initialize the database
        informacionAcademicaRepository.saveAndFlush(informacionAcademica);

        // Get all the informacionAcademicaList where fechaInicio equals to DEFAULT_FECHA_INICIO
        defaultInformacionAcademicaShouldBeFound("fechaInicio.equals=" + DEFAULT_FECHA_INICIO);

        // Get all the informacionAcademicaList where fechaInicio equals to UPDATED_FECHA_INICIO
        defaultInformacionAcademicaShouldNotBeFound("fechaInicio.equals=" + UPDATED_FECHA_INICIO);
    }

    @Test
    @Transactional
    public void getAllInformacionAcademicasByFechaInicioIsNotEqualToSomething() throws Exception {
        // Initialize the database
        informacionAcademicaRepository.saveAndFlush(informacionAcademica);

        // Get all the informacionAcademicaList where fechaInicio not equals to DEFAULT_FECHA_INICIO
        defaultInformacionAcademicaShouldNotBeFound("fechaInicio.notEquals=" + DEFAULT_FECHA_INICIO);

        // Get all the informacionAcademicaList where fechaInicio not equals to UPDATED_FECHA_INICIO
        defaultInformacionAcademicaShouldBeFound("fechaInicio.notEquals=" + UPDATED_FECHA_INICIO);
    }

    @Test
    @Transactional
    public void getAllInformacionAcademicasByFechaInicioIsInShouldWork() throws Exception {
        // Initialize the database
        informacionAcademicaRepository.saveAndFlush(informacionAcademica);

        // Get all the informacionAcademicaList where fechaInicio in DEFAULT_FECHA_INICIO or UPDATED_FECHA_INICIO
        defaultInformacionAcademicaShouldBeFound("fechaInicio.in=" + DEFAULT_FECHA_INICIO + "," + UPDATED_FECHA_INICIO);

        // Get all the informacionAcademicaList where fechaInicio equals to UPDATED_FECHA_INICIO
        defaultInformacionAcademicaShouldNotBeFound("fechaInicio.in=" + UPDATED_FECHA_INICIO);
    }

    @Test
    @Transactional
    public void getAllInformacionAcademicasByFechaInicioIsNullOrNotNull() throws Exception {
        // Initialize the database
        informacionAcademicaRepository.saveAndFlush(informacionAcademica);

        // Get all the informacionAcademicaList where fechaInicio is not null
        defaultInformacionAcademicaShouldBeFound("fechaInicio.specified=true");

        // Get all the informacionAcademicaList where fechaInicio is null
        defaultInformacionAcademicaShouldNotBeFound("fechaInicio.specified=false");
    }

    @Test
    @Transactional
    public void getAllInformacionAcademicasByFechaInicioIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        informacionAcademicaRepository.saveAndFlush(informacionAcademica);

        // Get all the informacionAcademicaList where fechaInicio is greater than or equal to DEFAULT_FECHA_INICIO
        defaultInformacionAcademicaShouldBeFound("fechaInicio.greaterThanOrEqual=" + DEFAULT_FECHA_INICIO);

        // Get all the informacionAcademicaList where fechaInicio is greater than or equal to UPDATED_FECHA_INICIO
        defaultInformacionAcademicaShouldNotBeFound("fechaInicio.greaterThanOrEqual=" + UPDATED_FECHA_INICIO);
    }

    @Test
    @Transactional
    public void getAllInformacionAcademicasByFechaInicioIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        informacionAcademicaRepository.saveAndFlush(informacionAcademica);

        // Get all the informacionAcademicaList where fechaInicio is less than or equal to DEFAULT_FECHA_INICIO
        defaultInformacionAcademicaShouldBeFound("fechaInicio.lessThanOrEqual=" + DEFAULT_FECHA_INICIO);

        // Get all the informacionAcademicaList where fechaInicio is less than or equal to SMALLER_FECHA_INICIO
        defaultInformacionAcademicaShouldNotBeFound("fechaInicio.lessThanOrEqual=" + SMALLER_FECHA_INICIO);
    }

    @Test
    @Transactional
    public void getAllInformacionAcademicasByFechaInicioIsLessThanSomething() throws Exception {
        // Initialize the database
        informacionAcademicaRepository.saveAndFlush(informacionAcademica);

        // Get all the informacionAcademicaList where fechaInicio is less than DEFAULT_FECHA_INICIO
        defaultInformacionAcademicaShouldNotBeFound("fechaInicio.lessThan=" + DEFAULT_FECHA_INICIO);

        // Get all the informacionAcademicaList where fechaInicio is less than UPDATED_FECHA_INICIO
        defaultInformacionAcademicaShouldBeFound("fechaInicio.lessThan=" + UPDATED_FECHA_INICIO);
    }

    @Test
    @Transactional
    public void getAllInformacionAcademicasByFechaInicioIsGreaterThanSomething() throws Exception {
        // Initialize the database
        informacionAcademicaRepository.saveAndFlush(informacionAcademica);

        // Get all the informacionAcademicaList where fechaInicio is greater than DEFAULT_FECHA_INICIO
        defaultInformacionAcademicaShouldNotBeFound("fechaInicio.greaterThan=" + DEFAULT_FECHA_INICIO);

        // Get all the informacionAcademicaList where fechaInicio is greater than SMALLER_FECHA_INICIO
        defaultInformacionAcademicaShouldBeFound("fechaInicio.greaterThan=" + SMALLER_FECHA_INICIO);
    }


    @Test
    @Transactional
    public void getAllInformacionAcademicasByFechaFinIsEqualToSomething() throws Exception {
        // Initialize the database
        informacionAcademicaRepository.saveAndFlush(informacionAcademica);

        // Get all the informacionAcademicaList where fechaFin equals to DEFAULT_FECHA_FIN
        defaultInformacionAcademicaShouldBeFound("fechaFin.equals=" + DEFAULT_FECHA_FIN);

        // Get all the informacionAcademicaList where fechaFin equals to UPDATED_FECHA_FIN
        defaultInformacionAcademicaShouldNotBeFound("fechaFin.equals=" + UPDATED_FECHA_FIN);
    }

    @Test
    @Transactional
    public void getAllInformacionAcademicasByFechaFinIsNotEqualToSomething() throws Exception {
        // Initialize the database
        informacionAcademicaRepository.saveAndFlush(informacionAcademica);

        // Get all the informacionAcademicaList where fechaFin not equals to DEFAULT_FECHA_FIN
        defaultInformacionAcademicaShouldNotBeFound("fechaFin.notEquals=" + DEFAULT_FECHA_FIN);

        // Get all the informacionAcademicaList where fechaFin not equals to UPDATED_FECHA_FIN
        defaultInformacionAcademicaShouldBeFound("fechaFin.notEquals=" + UPDATED_FECHA_FIN);
    }

    @Test
    @Transactional
    public void getAllInformacionAcademicasByFechaFinIsInShouldWork() throws Exception {
        // Initialize the database
        informacionAcademicaRepository.saveAndFlush(informacionAcademica);

        // Get all the informacionAcademicaList where fechaFin in DEFAULT_FECHA_FIN or UPDATED_FECHA_FIN
        defaultInformacionAcademicaShouldBeFound("fechaFin.in=" + DEFAULT_FECHA_FIN + "," + UPDATED_FECHA_FIN);

        // Get all the informacionAcademicaList where fechaFin equals to UPDATED_FECHA_FIN
        defaultInformacionAcademicaShouldNotBeFound("fechaFin.in=" + UPDATED_FECHA_FIN);
    }

    @Test
    @Transactional
    public void getAllInformacionAcademicasByFechaFinIsNullOrNotNull() throws Exception {
        // Initialize the database
        informacionAcademicaRepository.saveAndFlush(informacionAcademica);

        // Get all the informacionAcademicaList where fechaFin is not null
        defaultInformacionAcademicaShouldBeFound("fechaFin.specified=true");

        // Get all the informacionAcademicaList where fechaFin is null
        defaultInformacionAcademicaShouldNotBeFound("fechaFin.specified=false");
    }

    @Test
    @Transactional
    public void getAllInformacionAcademicasByFechaFinIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        informacionAcademicaRepository.saveAndFlush(informacionAcademica);

        // Get all the informacionAcademicaList where fechaFin is greater than or equal to DEFAULT_FECHA_FIN
        defaultInformacionAcademicaShouldBeFound("fechaFin.greaterThanOrEqual=" + DEFAULT_FECHA_FIN);

        // Get all the informacionAcademicaList where fechaFin is greater than or equal to UPDATED_FECHA_FIN
        defaultInformacionAcademicaShouldNotBeFound("fechaFin.greaterThanOrEqual=" + UPDATED_FECHA_FIN);
    }

    @Test
    @Transactional
    public void getAllInformacionAcademicasByFechaFinIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        informacionAcademicaRepository.saveAndFlush(informacionAcademica);

        // Get all the informacionAcademicaList where fechaFin is less than or equal to DEFAULT_FECHA_FIN
        defaultInformacionAcademicaShouldBeFound("fechaFin.lessThanOrEqual=" + DEFAULT_FECHA_FIN);

        // Get all the informacionAcademicaList where fechaFin is less than or equal to SMALLER_FECHA_FIN
        defaultInformacionAcademicaShouldNotBeFound("fechaFin.lessThanOrEqual=" + SMALLER_FECHA_FIN);
    }

    @Test
    @Transactional
    public void getAllInformacionAcademicasByFechaFinIsLessThanSomething() throws Exception {
        // Initialize the database
        informacionAcademicaRepository.saveAndFlush(informacionAcademica);

        // Get all the informacionAcademicaList where fechaFin is less than DEFAULT_FECHA_FIN
        defaultInformacionAcademicaShouldNotBeFound("fechaFin.lessThan=" + DEFAULT_FECHA_FIN);

        // Get all the informacionAcademicaList where fechaFin is less than UPDATED_FECHA_FIN
        defaultInformacionAcademicaShouldBeFound("fechaFin.lessThan=" + UPDATED_FECHA_FIN);
    }

    @Test
    @Transactional
    public void getAllInformacionAcademicasByFechaFinIsGreaterThanSomething() throws Exception {
        // Initialize the database
        informacionAcademicaRepository.saveAndFlush(informacionAcademica);

        // Get all the informacionAcademicaList where fechaFin is greater than DEFAULT_FECHA_FIN
        defaultInformacionAcademicaShouldNotBeFound("fechaFin.greaterThan=" + DEFAULT_FECHA_FIN);

        // Get all the informacionAcademicaList where fechaFin is greater than SMALLER_FECHA_FIN
        defaultInformacionAcademicaShouldBeFound("fechaFin.greaterThan=" + SMALLER_FECHA_FIN);
    }


    @Test
    @Transactional
    public void getAllInformacionAcademicasByTituloOtorgadoIsEqualToSomething() throws Exception {
        // Initialize the database
        informacionAcademicaRepository.saveAndFlush(informacionAcademica);

        // Get all the informacionAcademicaList where tituloOtorgado equals to DEFAULT_TITULO_OTORGADO
        defaultInformacionAcademicaShouldBeFound("tituloOtorgado.equals=" + DEFAULT_TITULO_OTORGADO);

        // Get all the informacionAcademicaList where tituloOtorgado equals to UPDATED_TITULO_OTORGADO
        defaultInformacionAcademicaShouldNotBeFound("tituloOtorgado.equals=" + UPDATED_TITULO_OTORGADO);
    }

    @Test
    @Transactional
    public void getAllInformacionAcademicasByTituloOtorgadoIsNotEqualToSomething() throws Exception {
        // Initialize the database
        informacionAcademicaRepository.saveAndFlush(informacionAcademica);

        // Get all the informacionAcademicaList where tituloOtorgado not equals to DEFAULT_TITULO_OTORGADO
        defaultInformacionAcademicaShouldNotBeFound("tituloOtorgado.notEquals=" + DEFAULT_TITULO_OTORGADO);

        // Get all the informacionAcademicaList where tituloOtorgado not equals to UPDATED_TITULO_OTORGADO
        defaultInformacionAcademicaShouldBeFound("tituloOtorgado.notEquals=" + UPDATED_TITULO_OTORGADO);
    }

    @Test
    @Transactional
    public void getAllInformacionAcademicasByTituloOtorgadoIsInShouldWork() throws Exception {
        // Initialize the database
        informacionAcademicaRepository.saveAndFlush(informacionAcademica);

        // Get all the informacionAcademicaList where tituloOtorgado in DEFAULT_TITULO_OTORGADO or UPDATED_TITULO_OTORGADO
        defaultInformacionAcademicaShouldBeFound("tituloOtorgado.in=" + DEFAULT_TITULO_OTORGADO + "," + UPDATED_TITULO_OTORGADO);

        // Get all the informacionAcademicaList where tituloOtorgado equals to UPDATED_TITULO_OTORGADO
        defaultInformacionAcademicaShouldNotBeFound("tituloOtorgado.in=" + UPDATED_TITULO_OTORGADO);
    }

    @Test
    @Transactional
    public void getAllInformacionAcademicasByTituloOtorgadoIsNullOrNotNull() throws Exception {
        // Initialize the database
        informacionAcademicaRepository.saveAndFlush(informacionAcademica);

        // Get all the informacionAcademicaList where tituloOtorgado is not null
        defaultInformacionAcademicaShouldBeFound("tituloOtorgado.specified=true");

        // Get all the informacionAcademicaList where tituloOtorgado is null
        defaultInformacionAcademicaShouldNotBeFound("tituloOtorgado.specified=false");
    }
                @Test
    @Transactional
    public void getAllInformacionAcademicasByTituloOtorgadoContainsSomething() throws Exception {
        // Initialize the database
        informacionAcademicaRepository.saveAndFlush(informacionAcademica);

        // Get all the informacionAcademicaList where tituloOtorgado contains DEFAULT_TITULO_OTORGADO
        defaultInformacionAcademicaShouldBeFound("tituloOtorgado.contains=" + DEFAULT_TITULO_OTORGADO);

        // Get all the informacionAcademicaList where tituloOtorgado contains UPDATED_TITULO_OTORGADO
        defaultInformacionAcademicaShouldNotBeFound("tituloOtorgado.contains=" + UPDATED_TITULO_OTORGADO);
    }

    @Test
    @Transactional
    public void getAllInformacionAcademicasByTituloOtorgadoNotContainsSomething() throws Exception {
        // Initialize the database
        informacionAcademicaRepository.saveAndFlush(informacionAcademica);

        // Get all the informacionAcademicaList where tituloOtorgado does not contain DEFAULT_TITULO_OTORGADO
        defaultInformacionAcademicaShouldNotBeFound("tituloOtorgado.doesNotContain=" + DEFAULT_TITULO_OTORGADO);

        // Get all the informacionAcademicaList where tituloOtorgado does not contain UPDATED_TITULO_OTORGADO
        defaultInformacionAcademicaShouldBeFound("tituloOtorgado.doesNotContain=" + UPDATED_TITULO_OTORGADO);
    }


    @Test
    @Transactional
    public void getAllInformacionAcademicasByUsuarioIsEqualToSomething() throws Exception {
        // Get already existing entity
        Persona usuario = informacionAcademica.getUsuario();
        informacionAcademicaRepository.saveAndFlush(informacionAcademica);
        Long usuarioId = usuario.getId();

        // Get all the informacionAcademicaList where usuario equals to usuarioId
        defaultInformacionAcademicaShouldBeFound("usuarioId.equals=" + usuarioId);

        // Get all the informacionAcademicaList where usuario equals to usuarioId + 1
        defaultInformacionAcademicaShouldNotBeFound("usuarioId.equals=" + (usuarioId + 1));
    }


    @Test
    @Transactional
    public void getAllInformacionAcademicasByInstitucionIsEqualToSomething() throws Exception {
        // Initialize the database
        informacionAcademicaRepository.saveAndFlush(informacionAcademica);
        Institucion institucion = InstitucionResourceIT.createEntity(em);
        em.persist(institucion);
        em.flush();
        informacionAcademica.setInstitucion(institucion);
        informacionAcademicaRepository.saveAndFlush(informacionAcademica);
        Long institucionId = institucion.getId();

        // Get all the informacionAcademicaList where institucion equals to institucionId
        defaultInformacionAcademicaShouldBeFound("institucionId.equals=" + institucionId);

        // Get all the informacionAcademicaList where institucion equals to institucionId + 1
        defaultInformacionAcademicaShouldNotBeFound("institucionId.equals=" + (institucionId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultInformacionAcademicaShouldBeFound(String filter) throws Exception {
        restInformacionAcademicaMockMvc.perform(get("/api/informacion-academicas?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(informacionAcademica.getId().intValue())))
            .andExpect(jsonPath("$.[*].nivelEstudio").value(hasItem(DEFAULT_NIVEL_ESTUDIO)))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO)))
            .andExpect(jsonPath("$.[*].fechaInicio").value(hasItem(DEFAULT_FECHA_INICIO.toString())))
            .andExpect(jsonPath("$.[*].fechaFin").value(hasItem(DEFAULT_FECHA_FIN.toString())))
            .andExpect(jsonPath("$.[*].tituloOtorgado").value(hasItem(DEFAULT_TITULO_OTORGADO)));

        // Check, that the count call also returns 1
        restInformacionAcademicaMockMvc.perform(get("/api/informacion-academicas/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultInformacionAcademicaShouldNotBeFound(String filter) throws Exception {
        restInformacionAcademicaMockMvc.perform(get("/api/informacion-academicas?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restInformacionAcademicaMockMvc.perform(get("/api/informacion-academicas/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingInformacionAcademica() throws Exception {
        // Get the informacionAcademica
        restInformacionAcademicaMockMvc.perform(get("/api/informacion-academicas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInformacionAcademica() throws Exception {
        // Initialize the database
        informacionAcademicaService.save(informacionAcademica);

        int databaseSizeBeforeUpdate = informacionAcademicaRepository.findAll().size();

        // Update the informacionAcademica
        InformacionAcademica updatedInformacionAcademica = informacionAcademicaRepository.findById(informacionAcademica.getId()).get();
        // Disconnect from session so that the updates on updatedInformacionAcademica are not directly saved in db
        em.detach(updatedInformacionAcademica);
        updatedInformacionAcademica
            .nivelEstudio(UPDATED_NIVEL_ESTUDIO)
            .estado(UPDATED_ESTADO)
            .fechaInicio(UPDATED_FECHA_INICIO)
            .fechaFin(UPDATED_FECHA_FIN)
            .tituloOtorgado(UPDATED_TITULO_OTORGADO);

        restInformacionAcademicaMockMvc.perform(put("/api/informacion-academicas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedInformacionAcademica)))
            .andExpect(status().isOk());

        // Validate the InformacionAcademica in the database
        List<InformacionAcademica> informacionAcademicaList = informacionAcademicaRepository.findAll();
        assertThat(informacionAcademicaList).hasSize(databaseSizeBeforeUpdate);
        InformacionAcademica testInformacionAcademica = informacionAcademicaList.get(informacionAcademicaList.size() - 1);
        assertThat(testInformacionAcademica.getNivelEstudio()).isEqualTo(UPDATED_NIVEL_ESTUDIO);
        assertThat(testInformacionAcademica.getEstado()).isEqualTo(UPDATED_ESTADO);
        assertThat(testInformacionAcademica.getFechaInicio()).isEqualTo(UPDATED_FECHA_INICIO);
        assertThat(testInformacionAcademica.getFechaFin()).isEqualTo(UPDATED_FECHA_FIN);
        assertThat(testInformacionAcademica.getTituloOtorgado()).isEqualTo(UPDATED_TITULO_OTORGADO);
    }

    @Test
    @Transactional
    public void updateNonExistingInformacionAcademica() throws Exception {
        int databaseSizeBeforeUpdate = informacionAcademicaRepository.findAll().size();

        // Create the InformacionAcademica

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInformacionAcademicaMockMvc.perform(put("/api/informacion-academicas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(informacionAcademica)))
            .andExpect(status().isBadRequest());

        // Validate the InformacionAcademica in the database
        List<InformacionAcademica> informacionAcademicaList = informacionAcademicaRepository.findAll();
        assertThat(informacionAcademicaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteInformacionAcademica() throws Exception {
        // Initialize the database
        informacionAcademicaService.save(informacionAcademica);

        int databaseSizeBeforeDelete = informacionAcademicaRepository.findAll().size();

        // Delete the informacionAcademica
        restInformacionAcademicaMockMvc.perform(delete("/api/informacion-academicas/{id}", informacionAcademica.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<InformacionAcademica> informacionAcademicaList = informacionAcademicaRepository.findAll();
        assertThat(informacionAcademicaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
