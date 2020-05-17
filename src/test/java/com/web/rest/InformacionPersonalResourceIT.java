package com.web.rest;

import com.CtProjectApp;
import com.domain.InformacionPersonal;
import com.domain.Persona;
import com.repository.InformacionPersonalRepository;
import com.service.InformacionPersonalService;
import com.service.dto.InformacionPersonalCriteria;
import com.service.InformacionPersonalQueryService;

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
 * Integration tests for the {@link InformacionPersonalResource} REST controller.
 */
@SpringBootTest(classes = CtProjectApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class InformacionPersonalResourceIT {

    private static final LocalDate DEFAULT_FECHA_NACIMIENTO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_NACIMIENTO = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_FECHA_NACIMIENTO = LocalDate.ofEpochDay(-1L);

    private static final String DEFAULT_LUGAR_NACIMIENTO = "AAAAAAAAAA";
    private static final String UPDATED_LUGAR_NACIMIENTO = "BBBBBBBBBB";

    private static final String DEFAULT_DIRECCION_RESIDENCIA = "AAAAAAAAAA";
    private static final String UPDATED_DIRECCION_RESIDENCIA = "BBBBBBBBBB";

    private static final String DEFAULT_GENERO = "AAAAAAAAAA";
    private static final String UPDATED_GENERO = "BBBBBBBBBB";

    private static final Integer DEFAULT_CIUDAD = 1;
    private static final Integer UPDATED_CIUDAD = 2;
    private static final Integer SMALLER_CIUDAD = 1 - 1;

    private static final String DEFAULT_TELEFONO = "AAAAAAAAAA";
    private static final String UPDATED_TELEFONO = "BBBBBBBBBB";

    private static final Integer DEFAULT_DISCAPACIDAD = 1;
    private static final Integer UPDATED_DISCAPACIDAD = 2;
    private static final Integer SMALLER_DISCAPACIDAD = 1 - 1;

    private static final Integer DEFAULT_REDES_SOCIALES = 1;
    private static final Integer UPDATED_REDES_SOCIALES = 2;
    private static final Integer SMALLER_REDES_SOCIALES = 1 - 1;

    private static final Boolean DEFAULT_LICENCENCIA_CONDUCCION = false;
    private static final Boolean UPDATED_LICENCENCIA_CONDUCCION = true;

    @Autowired
    private InformacionPersonalRepository informacionPersonalRepository;

    @Autowired
    private InformacionPersonalService informacionPersonalService;

    @Autowired
    private InformacionPersonalQueryService informacionPersonalQueryService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restInformacionPersonalMockMvc;

    private InformacionPersonal informacionPersonal;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static InformacionPersonal createEntity(EntityManager em) {
        InformacionPersonal informacionPersonal = new InformacionPersonal()
            .fechaNacimiento(DEFAULT_FECHA_NACIMIENTO)
            .lugarNacimiento(DEFAULT_LUGAR_NACIMIENTO)
            .direccionResidencia(DEFAULT_DIRECCION_RESIDENCIA)
            .genero(DEFAULT_GENERO)
            .ciudad(DEFAULT_CIUDAD)
            .telefono(DEFAULT_TELEFONO)
            .discapacidad(DEFAULT_DISCAPACIDAD)
            .redesSociales(DEFAULT_REDES_SOCIALES)
            .licencenciaConduccion(DEFAULT_LICENCENCIA_CONDUCCION);
        // Add required entity
        Persona persona;
        if (TestUtil.findAll(em, Persona.class).isEmpty()) {
            persona = PersonaResourceIT.createEntity(em);
            em.persist(persona);
            em.flush();
        } else {
            persona = TestUtil.findAll(em, Persona.class).get(0);
        }
        informacionPersonal.setUsuario(persona);
        return informacionPersonal;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static InformacionPersonal createUpdatedEntity(EntityManager em) {
        InformacionPersonal informacionPersonal = new InformacionPersonal()
            .fechaNacimiento(UPDATED_FECHA_NACIMIENTO)
            .lugarNacimiento(UPDATED_LUGAR_NACIMIENTO)
            .direccionResidencia(UPDATED_DIRECCION_RESIDENCIA)
            .genero(UPDATED_GENERO)
            .ciudad(UPDATED_CIUDAD)
            .telefono(UPDATED_TELEFONO)
            .discapacidad(UPDATED_DISCAPACIDAD)
            .redesSociales(UPDATED_REDES_SOCIALES)
            .licencenciaConduccion(UPDATED_LICENCENCIA_CONDUCCION);
        // Add required entity
        Persona persona;
        if (TestUtil.findAll(em, Persona.class).isEmpty()) {
            persona = PersonaResourceIT.createUpdatedEntity(em);
            em.persist(persona);
            em.flush();
        } else {
            persona = TestUtil.findAll(em, Persona.class).get(0);
        }
        informacionPersonal.setUsuario(persona);
        return informacionPersonal;
    }

    @BeforeEach
    public void initTest() {
        informacionPersonal = createEntity(em);
    }

    @Test
    @Transactional
    public void createInformacionPersonal() throws Exception {
        int databaseSizeBeforeCreate = informacionPersonalRepository.findAll().size();

        // Create the InformacionPersonal
        restInformacionPersonalMockMvc.perform(post("/api/informacion-personals")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(informacionPersonal)))
            .andExpect(status().isCreated());

        // Validate the InformacionPersonal in the database
        List<InformacionPersonal> informacionPersonalList = informacionPersonalRepository.findAll();
        assertThat(informacionPersonalList).hasSize(databaseSizeBeforeCreate + 1);
        InformacionPersonal testInformacionPersonal = informacionPersonalList.get(informacionPersonalList.size() - 1);
        assertThat(testInformacionPersonal.getFechaNacimiento()).isEqualTo(DEFAULT_FECHA_NACIMIENTO);
        assertThat(testInformacionPersonal.getLugarNacimiento()).isEqualTo(DEFAULT_LUGAR_NACIMIENTO);
        assertThat(testInformacionPersonal.getDireccionResidencia()).isEqualTo(DEFAULT_DIRECCION_RESIDENCIA);
        assertThat(testInformacionPersonal.getGenero()).isEqualTo(DEFAULT_GENERO);
        assertThat(testInformacionPersonal.getCiudad()).isEqualTo(DEFAULT_CIUDAD);
        assertThat(testInformacionPersonal.getTelefono()).isEqualTo(DEFAULT_TELEFONO);
        assertThat(testInformacionPersonal.getDiscapacidad()).isEqualTo(DEFAULT_DISCAPACIDAD);
        assertThat(testInformacionPersonal.getRedesSociales()).isEqualTo(DEFAULT_REDES_SOCIALES);
        assertThat(testInformacionPersonal.isLicencenciaConduccion()).isEqualTo(DEFAULT_LICENCENCIA_CONDUCCION);
    }

    @Test
    @Transactional
    public void createInformacionPersonalWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = informacionPersonalRepository.findAll().size();

        // Create the InformacionPersonal with an existing ID
        informacionPersonal.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInformacionPersonalMockMvc.perform(post("/api/informacion-personals")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(informacionPersonal)))
            .andExpect(status().isBadRequest());

        // Validate the InformacionPersonal in the database
        List<InformacionPersonal> informacionPersonalList = informacionPersonalRepository.findAll();
        assertThat(informacionPersonalList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkFechaNacimientoIsRequired() throws Exception {
        int databaseSizeBeforeTest = informacionPersonalRepository.findAll().size();
        // set the field null
        informacionPersonal.setFechaNacimiento(null);

        // Create the InformacionPersonal, which fails.

        restInformacionPersonalMockMvc.perform(post("/api/informacion-personals")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(informacionPersonal)))
            .andExpect(status().isBadRequest());

        List<InformacionPersonal> informacionPersonalList = informacionPersonalRepository.findAll();
        assertThat(informacionPersonalList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLugarNacimientoIsRequired() throws Exception {
        int databaseSizeBeforeTest = informacionPersonalRepository.findAll().size();
        // set the field null
        informacionPersonal.setLugarNacimiento(null);

        // Create the InformacionPersonal, which fails.

        restInformacionPersonalMockMvc.perform(post("/api/informacion-personals")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(informacionPersonal)))
            .andExpect(status().isBadRequest());

        List<InformacionPersonal> informacionPersonalList = informacionPersonalRepository.findAll();
        assertThat(informacionPersonalList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDireccionResidenciaIsRequired() throws Exception {
        int databaseSizeBeforeTest = informacionPersonalRepository.findAll().size();
        // set the field null
        informacionPersonal.setDireccionResidencia(null);

        // Create the InformacionPersonal, which fails.

        restInformacionPersonalMockMvc.perform(post("/api/informacion-personals")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(informacionPersonal)))
            .andExpect(status().isBadRequest());

        List<InformacionPersonal> informacionPersonalList = informacionPersonalRepository.findAll();
        assertThat(informacionPersonalList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkGeneroIsRequired() throws Exception {
        int databaseSizeBeforeTest = informacionPersonalRepository.findAll().size();
        // set the field null
        informacionPersonal.setGenero(null);

        // Create the InformacionPersonal, which fails.

        restInformacionPersonalMockMvc.perform(post("/api/informacion-personals")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(informacionPersonal)))
            .andExpect(status().isBadRequest());

        List<InformacionPersonal> informacionPersonalList = informacionPersonalRepository.findAll();
        assertThat(informacionPersonalList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCiudadIsRequired() throws Exception {
        int databaseSizeBeforeTest = informacionPersonalRepository.findAll().size();
        // set the field null
        informacionPersonal.setCiudad(null);

        // Create the InformacionPersonal, which fails.

        restInformacionPersonalMockMvc.perform(post("/api/informacion-personals")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(informacionPersonal)))
            .andExpect(status().isBadRequest());

        List<InformacionPersonal> informacionPersonalList = informacionPersonalRepository.findAll();
        assertThat(informacionPersonalList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTelefonoIsRequired() throws Exception {
        int databaseSizeBeforeTest = informacionPersonalRepository.findAll().size();
        // set the field null
        informacionPersonal.setTelefono(null);

        // Create the InformacionPersonal, which fails.

        restInformacionPersonalMockMvc.perform(post("/api/informacion-personals")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(informacionPersonal)))
            .andExpect(status().isBadRequest());

        List<InformacionPersonal> informacionPersonalList = informacionPersonalRepository.findAll();
        assertThat(informacionPersonalList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllInformacionPersonals() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList
        restInformacionPersonalMockMvc.perform(get("/api/informacion-personals?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(informacionPersonal.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaNacimiento").value(hasItem(DEFAULT_FECHA_NACIMIENTO.toString())))
            .andExpect(jsonPath("$.[*].lugarNacimiento").value(hasItem(DEFAULT_LUGAR_NACIMIENTO)))
            .andExpect(jsonPath("$.[*].direccionResidencia").value(hasItem(DEFAULT_DIRECCION_RESIDENCIA)))
            .andExpect(jsonPath("$.[*].genero").value(hasItem(DEFAULT_GENERO)))
            .andExpect(jsonPath("$.[*].ciudad").value(hasItem(DEFAULT_CIUDAD)))
            .andExpect(jsonPath("$.[*].telefono").value(hasItem(DEFAULT_TELEFONO)))
            .andExpect(jsonPath("$.[*].discapacidad").value(hasItem(DEFAULT_DISCAPACIDAD)))
            .andExpect(jsonPath("$.[*].redesSociales").value(hasItem(DEFAULT_REDES_SOCIALES)))
            .andExpect(jsonPath("$.[*].licencenciaConduccion").value(hasItem(DEFAULT_LICENCENCIA_CONDUCCION.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getInformacionPersonal() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get the informacionPersonal
        restInformacionPersonalMockMvc.perform(get("/api/informacion-personals/{id}", informacionPersonal.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(informacionPersonal.getId().intValue()))
            .andExpect(jsonPath("$.fechaNacimiento").value(DEFAULT_FECHA_NACIMIENTO.toString()))
            .andExpect(jsonPath("$.lugarNacimiento").value(DEFAULT_LUGAR_NACIMIENTO))
            .andExpect(jsonPath("$.direccionResidencia").value(DEFAULT_DIRECCION_RESIDENCIA))
            .andExpect(jsonPath("$.genero").value(DEFAULT_GENERO))
            .andExpect(jsonPath("$.ciudad").value(DEFAULT_CIUDAD))
            .andExpect(jsonPath("$.telefono").value(DEFAULT_TELEFONO))
            .andExpect(jsonPath("$.discapacidad").value(DEFAULT_DISCAPACIDAD))
            .andExpect(jsonPath("$.redesSociales").value(DEFAULT_REDES_SOCIALES))
            .andExpect(jsonPath("$.licencenciaConduccion").value(DEFAULT_LICENCENCIA_CONDUCCION.booleanValue()));
    }


    @Test
    @Transactional
    public void getInformacionPersonalsByIdFiltering() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        Long id = informacionPersonal.getId();

        defaultInformacionPersonalShouldBeFound("id.equals=" + id);
        defaultInformacionPersonalShouldNotBeFound("id.notEquals=" + id);

        defaultInformacionPersonalShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultInformacionPersonalShouldNotBeFound("id.greaterThan=" + id);

        defaultInformacionPersonalShouldBeFound("id.lessThanOrEqual=" + id);
        defaultInformacionPersonalShouldNotBeFound("id.lessThan=" + id);
    }


    @Test
    @Transactional
    public void getAllInformacionPersonalsByFechaNacimientoIsEqualToSomething() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where fechaNacimiento equals to DEFAULT_FECHA_NACIMIENTO
        defaultInformacionPersonalShouldBeFound("fechaNacimiento.equals=" + DEFAULT_FECHA_NACIMIENTO);

        // Get all the informacionPersonalList where fechaNacimiento equals to UPDATED_FECHA_NACIMIENTO
        defaultInformacionPersonalShouldNotBeFound("fechaNacimiento.equals=" + UPDATED_FECHA_NACIMIENTO);
    }

    @Test
    @Transactional
    public void getAllInformacionPersonalsByFechaNacimientoIsNotEqualToSomething() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where fechaNacimiento not equals to DEFAULT_FECHA_NACIMIENTO
        defaultInformacionPersonalShouldNotBeFound("fechaNacimiento.notEquals=" + DEFAULT_FECHA_NACIMIENTO);

        // Get all the informacionPersonalList where fechaNacimiento not equals to UPDATED_FECHA_NACIMIENTO
        defaultInformacionPersonalShouldBeFound("fechaNacimiento.notEquals=" + UPDATED_FECHA_NACIMIENTO);
    }

    @Test
    @Transactional
    public void getAllInformacionPersonalsByFechaNacimientoIsInShouldWork() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where fechaNacimiento in DEFAULT_FECHA_NACIMIENTO or UPDATED_FECHA_NACIMIENTO
        defaultInformacionPersonalShouldBeFound("fechaNacimiento.in=" + DEFAULT_FECHA_NACIMIENTO + "," + UPDATED_FECHA_NACIMIENTO);

        // Get all the informacionPersonalList where fechaNacimiento equals to UPDATED_FECHA_NACIMIENTO
        defaultInformacionPersonalShouldNotBeFound("fechaNacimiento.in=" + UPDATED_FECHA_NACIMIENTO);
    }

    @Test
    @Transactional
    public void getAllInformacionPersonalsByFechaNacimientoIsNullOrNotNull() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where fechaNacimiento is not null
        defaultInformacionPersonalShouldBeFound("fechaNacimiento.specified=true");

        // Get all the informacionPersonalList where fechaNacimiento is null
        defaultInformacionPersonalShouldNotBeFound("fechaNacimiento.specified=false");
    }

    @Test
    @Transactional
    public void getAllInformacionPersonalsByFechaNacimientoIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where fechaNacimiento is greater than or equal to DEFAULT_FECHA_NACIMIENTO
        defaultInformacionPersonalShouldBeFound("fechaNacimiento.greaterThanOrEqual=" + DEFAULT_FECHA_NACIMIENTO);

        // Get all the informacionPersonalList where fechaNacimiento is greater than or equal to UPDATED_FECHA_NACIMIENTO
        defaultInformacionPersonalShouldNotBeFound("fechaNacimiento.greaterThanOrEqual=" + UPDATED_FECHA_NACIMIENTO);
    }

    @Test
    @Transactional
    public void getAllInformacionPersonalsByFechaNacimientoIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where fechaNacimiento is less than or equal to DEFAULT_FECHA_NACIMIENTO
        defaultInformacionPersonalShouldBeFound("fechaNacimiento.lessThanOrEqual=" + DEFAULT_FECHA_NACIMIENTO);

        // Get all the informacionPersonalList where fechaNacimiento is less than or equal to SMALLER_FECHA_NACIMIENTO
        defaultInformacionPersonalShouldNotBeFound("fechaNacimiento.lessThanOrEqual=" + SMALLER_FECHA_NACIMIENTO);
    }

    @Test
    @Transactional
    public void getAllInformacionPersonalsByFechaNacimientoIsLessThanSomething() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where fechaNacimiento is less than DEFAULT_FECHA_NACIMIENTO
        defaultInformacionPersonalShouldNotBeFound("fechaNacimiento.lessThan=" + DEFAULT_FECHA_NACIMIENTO);

        // Get all the informacionPersonalList where fechaNacimiento is less than UPDATED_FECHA_NACIMIENTO
        defaultInformacionPersonalShouldBeFound("fechaNacimiento.lessThan=" + UPDATED_FECHA_NACIMIENTO);
    }

    @Test
    @Transactional
    public void getAllInformacionPersonalsByFechaNacimientoIsGreaterThanSomething() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where fechaNacimiento is greater than DEFAULT_FECHA_NACIMIENTO
        defaultInformacionPersonalShouldNotBeFound("fechaNacimiento.greaterThan=" + DEFAULT_FECHA_NACIMIENTO);

        // Get all the informacionPersonalList where fechaNacimiento is greater than SMALLER_FECHA_NACIMIENTO
        defaultInformacionPersonalShouldBeFound("fechaNacimiento.greaterThan=" + SMALLER_FECHA_NACIMIENTO);
    }


    @Test
    @Transactional
    public void getAllInformacionPersonalsByLugarNacimientoIsEqualToSomething() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where lugarNacimiento equals to DEFAULT_LUGAR_NACIMIENTO
        defaultInformacionPersonalShouldBeFound("lugarNacimiento.equals=" + DEFAULT_LUGAR_NACIMIENTO);

        // Get all the informacionPersonalList where lugarNacimiento equals to UPDATED_LUGAR_NACIMIENTO
        defaultInformacionPersonalShouldNotBeFound("lugarNacimiento.equals=" + UPDATED_LUGAR_NACIMIENTO);
    }

    @Test
    @Transactional
    public void getAllInformacionPersonalsByLugarNacimientoIsNotEqualToSomething() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where lugarNacimiento not equals to DEFAULT_LUGAR_NACIMIENTO
        defaultInformacionPersonalShouldNotBeFound("lugarNacimiento.notEquals=" + DEFAULT_LUGAR_NACIMIENTO);

        // Get all the informacionPersonalList where lugarNacimiento not equals to UPDATED_LUGAR_NACIMIENTO
        defaultInformacionPersonalShouldBeFound("lugarNacimiento.notEquals=" + UPDATED_LUGAR_NACIMIENTO);
    }

    @Test
    @Transactional
    public void getAllInformacionPersonalsByLugarNacimientoIsInShouldWork() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where lugarNacimiento in DEFAULT_LUGAR_NACIMIENTO or UPDATED_LUGAR_NACIMIENTO
        defaultInformacionPersonalShouldBeFound("lugarNacimiento.in=" + DEFAULT_LUGAR_NACIMIENTO + "," + UPDATED_LUGAR_NACIMIENTO);

        // Get all the informacionPersonalList where lugarNacimiento equals to UPDATED_LUGAR_NACIMIENTO
        defaultInformacionPersonalShouldNotBeFound("lugarNacimiento.in=" + UPDATED_LUGAR_NACIMIENTO);
    }

    @Test
    @Transactional
    public void getAllInformacionPersonalsByLugarNacimientoIsNullOrNotNull() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where lugarNacimiento is not null
        defaultInformacionPersonalShouldBeFound("lugarNacimiento.specified=true");

        // Get all the informacionPersonalList where lugarNacimiento is null
        defaultInformacionPersonalShouldNotBeFound("lugarNacimiento.specified=false");
    }
                @Test
    @Transactional
    public void getAllInformacionPersonalsByLugarNacimientoContainsSomething() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where lugarNacimiento contains DEFAULT_LUGAR_NACIMIENTO
        defaultInformacionPersonalShouldBeFound("lugarNacimiento.contains=" + DEFAULT_LUGAR_NACIMIENTO);

        // Get all the informacionPersonalList where lugarNacimiento contains UPDATED_LUGAR_NACIMIENTO
        defaultInformacionPersonalShouldNotBeFound("lugarNacimiento.contains=" + UPDATED_LUGAR_NACIMIENTO);
    }

    @Test
    @Transactional
    public void getAllInformacionPersonalsByLugarNacimientoNotContainsSomething() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where lugarNacimiento does not contain DEFAULT_LUGAR_NACIMIENTO
        defaultInformacionPersonalShouldNotBeFound("lugarNacimiento.doesNotContain=" + DEFAULT_LUGAR_NACIMIENTO);

        // Get all the informacionPersonalList where lugarNacimiento does not contain UPDATED_LUGAR_NACIMIENTO
        defaultInformacionPersonalShouldBeFound("lugarNacimiento.doesNotContain=" + UPDATED_LUGAR_NACIMIENTO);
    }


    @Test
    @Transactional
    public void getAllInformacionPersonalsByDireccionResidenciaIsEqualToSomething() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where direccionResidencia equals to DEFAULT_DIRECCION_RESIDENCIA
        defaultInformacionPersonalShouldBeFound("direccionResidencia.equals=" + DEFAULT_DIRECCION_RESIDENCIA);

        // Get all the informacionPersonalList where direccionResidencia equals to UPDATED_DIRECCION_RESIDENCIA
        defaultInformacionPersonalShouldNotBeFound("direccionResidencia.equals=" + UPDATED_DIRECCION_RESIDENCIA);
    }

    @Test
    @Transactional
    public void getAllInformacionPersonalsByDireccionResidenciaIsNotEqualToSomething() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where direccionResidencia not equals to DEFAULT_DIRECCION_RESIDENCIA
        defaultInformacionPersonalShouldNotBeFound("direccionResidencia.notEquals=" + DEFAULT_DIRECCION_RESIDENCIA);

        // Get all the informacionPersonalList where direccionResidencia not equals to UPDATED_DIRECCION_RESIDENCIA
        defaultInformacionPersonalShouldBeFound("direccionResidencia.notEquals=" + UPDATED_DIRECCION_RESIDENCIA);
    }

    @Test
    @Transactional
    public void getAllInformacionPersonalsByDireccionResidenciaIsInShouldWork() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where direccionResidencia in DEFAULT_DIRECCION_RESIDENCIA or UPDATED_DIRECCION_RESIDENCIA
        defaultInformacionPersonalShouldBeFound("direccionResidencia.in=" + DEFAULT_DIRECCION_RESIDENCIA + "," + UPDATED_DIRECCION_RESIDENCIA);

        // Get all the informacionPersonalList where direccionResidencia equals to UPDATED_DIRECCION_RESIDENCIA
        defaultInformacionPersonalShouldNotBeFound("direccionResidencia.in=" + UPDATED_DIRECCION_RESIDENCIA);
    }

    @Test
    @Transactional
    public void getAllInformacionPersonalsByDireccionResidenciaIsNullOrNotNull() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where direccionResidencia is not null
        defaultInformacionPersonalShouldBeFound("direccionResidencia.specified=true");

        // Get all the informacionPersonalList where direccionResidencia is null
        defaultInformacionPersonalShouldNotBeFound("direccionResidencia.specified=false");
    }
                @Test
    @Transactional
    public void getAllInformacionPersonalsByDireccionResidenciaContainsSomething() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where direccionResidencia contains DEFAULT_DIRECCION_RESIDENCIA
        defaultInformacionPersonalShouldBeFound("direccionResidencia.contains=" + DEFAULT_DIRECCION_RESIDENCIA);

        // Get all the informacionPersonalList where direccionResidencia contains UPDATED_DIRECCION_RESIDENCIA
        defaultInformacionPersonalShouldNotBeFound("direccionResidencia.contains=" + UPDATED_DIRECCION_RESIDENCIA);
    }

    @Test
    @Transactional
    public void getAllInformacionPersonalsByDireccionResidenciaNotContainsSomething() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where direccionResidencia does not contain DEFAULT_DIRECCION_RESIDENCIA
        defaultInformacionPersonalShouldNotBeFound("direccionResidencia.doesNotContain=" + DEFAULT_DIRECCION_RESIDENCIA);

        // Get all the informacionPersonalList where direccionResidencia does not contain UPDATED_DIRECCION_RESIDENCIA
        defaultInformacionPersonalShouldBeFound("direccionResidencia.doesNotContain=" + UPDATED_DIRECCION_RESIDENCIA);
    }


    @Test
    @Transactional
    public void getAllInformacionPersonalsByGeneroIsEqualToSomething() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where genero equals to DEFAULT_GENERO
        defaultInformacionPersonalShouldBeFound("genero.equals=" + DEFAULT_GENERO);

        // Get all the informacionPersonalList where genero equals to UPDATED_GENERO
        defaultInformacionPersonalShouldNotBeFound("genero.equals=" + UPDATED_GENERO);
    }

    @Test
    @Transactional
    public void getAllInformacionPersonalsByGeneroIsNotEqualToSomething() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where genero not equals to DEFAULT_GENERO
        defaultInformacionPersonalShouldNotBeFound("genero.notEquals=" + DEFAULT_GENERO);

        // Get all the informacionPersonalList where genero not equals to UPDATED_GENERO
        defaultInformacionPersonalShouldBeFound("genero.notEquals=" + UPDATED_GENERO);
    }

    @Test
    @Transactional
    public void getAllInformacionPersonalsByGeneroIsInShouldWork() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where genero in DEFAULT_GENERO or UPDATED_GENERO
        defaultInformacionPersonalShouldBeFound("genero.in=" + DEFAULT_GENERO + "," + UPDATED_GENERO);

        // Get all the informacionPersonalList where genero equals to UPDATED_GENERO
        defaultInformacionPersonalShouldNotBeFound("genero.in=" + UPDATED_GENERO);
    }

    @Test
    @Transactional
    public void getAllInformacionPersonalsByGeneroIsNullOrNotNull() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where genero is not null
        defaultInformacionPersonalShouldBeFound("genero.specified=true");

        // Get all the informacionPersonalList where genero is null
        defaultInformacionPersonalShouldNotBeFound("genero.specified=false");
    }
                @Test
    @Transactional
    public void getAllInformacionPersonalsByGeneroContainsSomething() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where genero contains DEFAULT_GENERO
        defaultInformacionPersonalShouldBeFound("genero.contains=" + DEFAULT_GENERO);

        // Get all the informacionPersonalList where genero contains UPDATED_GENERO
        defaultInformacionPersonalShouldNotBeFound("genero.contains=" + UPDATED_GENERO);
    }

    @Test
    @Transactional
    public void getAllInformacionPersonalsByGeneroNotContainsSomething() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where genero does not contain DEFAULT_GENERO
        defaultInformacionPersonalShouldNotBeFound("genero.doesNotContain=" + DEFAULT_GENERO);

        // Get all the informacionPersonalList where genero does not contain UPDATED_GENERO
        defaultInformacionPersonalShouldBeFound("genero.doesNotContain=" + UPDATED_GENERO);
    }


    @Test
    @Transactional
    public void getAllInformacionPersonalsByCiudadIsEqualToSomething() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where ciudad equals to DEFAULT_CIUDAD
        defaultInformacionPersonalShouldBeFound("ciudad.equals=" + DEFAULT_CIUDAD);

        // Get all the informacionPersonalList where ciudad equals to UPDATED_CIUDAD
        defaultInformacionPersonalShouldNotBeFound("ciudad.equals=" + UPDATED_CIUDAD);
    }

    @Test
    @Transactional
    public void getAllInformacionPersonalsByCiudadIsNotEqualToSomething() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where ciudad not equals to DEFAULT_CIUDAD
        defaultInformacionPersonalShouldNotBeFound("ciudad.notEquals=" + DEFAULT_CIUDAD);

        // Get all the informacionPersonalList where ciudad not equals to UPDATED_CIUDAD
        defaultInformacionPersonalShouldBeFound("ciudad.notEquals=" + UPDATED_CIUDAD);
    }

    @Test
    @Transactional
    public void getAllInformacionPersonalsByCiudadIsInShouldWork() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where ciudad in DEFAULT_CIUDAD or UPDATED_CIUDAD
        defaultInformacionPersonalShouldBeFound("ciudad.in=" + DEFAULT_CIUDAD + "," + UPDATED_CIUDAD);

        // Get all the informacionPersonalList where ciudad equals to UPDATED_CIUDAD
        defaultInformacionPersonalShouldNotBeFound("ciudad.in=" + UPDATED_CIUDAD);
    }

    @Test
    @Transactional
    public void getAllInformacionPersonalsByCiudadIsNullOrNotNull() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where ciudad is not null
        defaultInformacionPersonalShouldBeFound("ciudad.specified=true");

        // Get all the informacionPersonalList where ciudad is null
        defaultInformacionPersonalShouldNotBeFound("ciudad.specified=false");
    }

    @Test
    @Transactional
    public void getAllInformacionPersonalsByCiudadIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where ciudad is greater than or equal to DEFAULT_CIUDAD
        defaultInformacionPersonalShouldBeFound("ciudad.greaterThanOrEqual=" + DEFAULT_CIUDAD);

        // Get all the informacionPersonalList where ciudad is greater than or equal to UPDATED_CIUDAD
        defaultInformacionPersonalShouldNotBeFound("ciudad.greaterThanOrEqual=" + UPDATED_CIUDAD);
    }

    @Test
    @Transactional
    public void getAllInformacionPersonalsByCiudadIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where ciudad is less than or equal to DEFAULT_CIUDAD
        defaultInformacionPersonalShouldBeFound("ciudad.lessThanOrEqual=" + DEFAULT_CIUDAD);

        // Get all the informacionPersonalList where ciudad is less than or equal to SMALLER_CIUDAD
        defaultInformacionPersonalShouldNotBeFound("ciudad.lessThanOrEqual=" + SMALLER_CIUDAD);
    }

    @Test
    @Transactional
    public void getAllInformacionPersonalsByCiudadIsLessThanSomething() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where ciudad is less than DEFAULT_CIUDAD
        defaultInformacionPersonalShouldNotBeFound("ciudad.lessThan=" + DEFAULT_CIUDAD);

        // Get all the informacionPersonalList where ciudad is less than UPDATED_CIUDAD
        defaultInformacionPersonalShouldBeFound("ciudad.lessThan=" + UPDATED_CIUDAD);
    }

    @Test
    @Transactional
    public void getAllInformacionPersonalsByCiudadIsGreaterThanSomething() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where ciudad is greater than DEFAULT_CIUDAD
        defaultInformacionPersonalShouldNotBeFound("ciudad.greaterThan=" + DEFAULT_CIUDAD);

        // Get all the informacionPersonalList where ciudad is greater than SMALLER_CIUDAD
        defaultInformacionPersonalShouldBeFound("ciudad.greaterThan=" + SMALLER_CIUDAD);
    }


    @Test
    @Transactional
    public void getAllInformacionPersonalsByTelefonoIsEqualToSomething() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where telefono equals to DEFAULT_TELEFONO
        defaultInformacionPersonalShouldBeFound("telefono.equals=" + DEFAULT_TELEFONO);

        // Get all the informacionPersonalList where telefono equals to UPDATED_TELEFONO
        defaultInformacionPersonalShouldNotBeFound("telefono.equals=" + UPDATED_TELEFONO);
    }

    @Test
    @Transactional
    public void getAllInformacionPersonalsByTelefonoIsNotEqualToSomething() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where telefono not equals to DEFAULT_TELEFONO
        defaultInformacionPersonalShouldNotBeFound("telefono.notEquals=" + DEFAULT_TELEFONO);

        // Get all the informacionPersonalList where telefono not equals to UPDATED_TELEFONO
        defaultInformacionPersonalShouldBeFound("telefono.notEquals=" + UPDATED_TELEFONO);
    }

    @Test
    @Transactional
    public void getAllInformacionPersonalsByTelefonoIsInShouldWork() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where telefono in DEFAULT_TELEFONO or UPDATED_TELEFONO
        defaultInformacionPersonalShouldBeFound("telefono.in=" + DEFAULT_TELEFONO + "," + UPDATED_TELEFONO);

        // Get all the informacionPersonalList where telefono equals to UPDATED_TELEFONO
        defaultInformacionPersonalShouldNotBeFound("telefono.in=" + UPDATED_TELEFONO);
    }

    @Test
    @Transactional
    public void getAllInformacionPersonalsByTelefonoIsNullOrNotNull() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where telefono is not null
        defaultInformacionPersonalShouldBeFound("telefono.specified=true");

        // Get all the informacionPersonalList where telefono is null
        defaultInformacionPersonalShouldNotBeFound("telefono.specified=false");
    }
                @Test
    @Transactional
    public void getAllInformacionPersonalsByTelefonoContainsSomething() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where telefono contains DEFAULT_TELEFONO
        defaultInformacionPersonalShouldBeFound("telefono.contains=" + DEFAULT_TELEFONO);

        // Get all the informacionPersonalList where telefono contains UPDATED_TELEFONO
        defaultInformacionPersonalShouldNotBeFound("telefono.contains=" + UPDATED_TELEFONO);
    }

    @Test
    @Transactional
    public void getAllInformacionPersonalsByTelefonoNotContainsSomething() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where telefono does not contain DEFAULT_TELEFONO
        defaultInformacionPersonalShouldNotBeFound("telefono.doesNotContain=" + DEFAULT_TELEFONO);

        // Get all the informacionPersonalList where telefono does not contain UPDATED_TELEFONO
        defaultInformacionPersonalShouldBeFound("telefono.doesNotContain=" + UPDATED_TELEFONO);
    }


    @Test
    @Transactional
    public void getAllInformacionPersonalsByDiscapacidadIsEqualToSomething() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where discapacidad equals to DEFAULT_DISCAPACIDAD
        defaultInformacionPersonalShouldBeFound("discapacidad.equals=" + DEFAULT_DISCAPACIDAD);

        // Get all the informacionPersonalList where discapacidad equals to UPDATED_DISCAPACIDAD
        defaultInformacionPersonalShouldNotBeFound("discapacidad.equals=" + UPDATED_DISCAPACIDAD);
    }

    @Test
    @Transactional
    public void getAllInformacionPersonalsByDiscapacidadIsNotEqualToSomething() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where discapacidad not equals to DEFAULT_DISCAPACIDAD
        defaultInformacionPersonalShouldNotBeFound("discapacidad.notEquals=" + DEFAULT_DISCAPACIDAD);

        // Get all the informacionPersonalList where discapacidad not equals to UPDATED_DISCAPACIDAD
        defaultInformacionPersonalShouldBeFound("discapacidad.notEquals=" + UPDATED_DISCAPACIDAD);
    }

    @Test
    @Transactional
    public void getAllInformacionPersonalsByDiscapacidadIsInShouldWork() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where discapacidad in DEFAULT_DISCAPACIDAD or UPDATED_DISCAPACIDAD
        defaultInformacionPersonalShouldBeFound("discapacidad.in=" + DEFAULT_DISCAPACIDAD + "," + UPDATED_DISCAPACIDAD);

        // Get all the informacionPersonalList where discapacidad equals to UPDATED_DISCAPACIDAD
        defaultInformacionPersonalShouldNotBeFound("discapacidad.in=" + UPDATED_DISCAPACIDAD);
    }

    @Test
    @Transactional
    public void getAllInformacionPersonalsByDiscapacidadIsNullOrNotNull() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where discapacidad is not null
        defaultInformacionPersonalShouldBeFound("discapacidad.specified=true");

        // Get all the informacionPersonalList where discapacidad is null
        defaultInformacionPersonalShouldNotBeFound("discapacidad.specified=false");
    }

    @Test
    @Transactional
    public void getAllInformacionPersonalsByDiscapacidadIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where discapacidad is greater than or equal to DEFAULT_DISCAPACIDAD
        defaultInformacionPersonalShouldBeFound("discapacidad.greaterThanOrEqual=" + DEFAULT_DISCAPACIDAD);

        // Get all the informacionPersonalList where discapacidad is greater than or equal to UPDATED_DISCAPACIDAD
        defaultInformacionPersonalShouldNotBeFound("discapacidad.greaterThanOrEqual=" + UPDATED_DISCAPACIDAD);
    }

    @Test
    @Transactional
    public void getAllInformacionPersonalsByDiscapacidadIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where discapacidad is less than or equal to DEFAULT_DISCAPACIDAD
        defaultInformacionPersonalShouldBeFound("discapacidad.lessThanOrEqual=" + DEFAULT_DISCAPACIDAD);

        // Get all the informacionPersonalList where discapacidad is less than or equal to SMALLER_DISCAPACIDAD
        defaultInformacionPersonalShouldNotBeFound("discapacidad.lessThanOrEqual=" + SMALLER_DISCAPACIDAD);
    }

    @Test
    @Transactional
    public void getAllInformacionPersonalsByDiscapacidadIsLessThanSomething() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where discapacidad is less than DEFAULT_DISCAPACIDAD
        defaultInformacionPersonalShouldNotBeFound("discapacidad.lessThan=" + DEFAULT_DISCAPACIDAD);

        // Get all the informacionPersonalList where discapacidad is less than UPDATED_DISCAPACIDAD
        defaultInformacionPersonalShouldBeFound("discapacidad.lessThan=" + UPDATED_DISCAPACIDAD);
    }

    @Test
    @Transactional
    public void getAllInformacionPersonalsByDiscapacidadIsGreaterThanSomething() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where discapacidad is greater than DEFAULT_DISCAPACIDAD
        defaultInformacionPersonalShouldNotBeFound("discapacidad.greaterThan=" + DEFAULT_DISCAPACIDAD);

        // Get all the informacionPersonalList where discapacidad is greater than SMALLER_DISCAPACIDAD
        defaultInformacionPersonalShouldBeFound("discapacidad.greaterThan=" + SMALLER_DISCAPACIDAD);
    }


    @Test
    @Transactional
    public void getAllInformacionPersonalsByRedesSocialesIsEqualToSomething() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where redesSociales equals to DEFAULT_REDES_SOCIALES
        defaultInformacionPersonalShouldBeFound("redesSociales.equals=" + DEFAULT_REDES_SOCIALES);

        // Get all the informacionPersonalList where redesSociales equals to UPDATED_REDES_SOCIALES
        defaultInformacionPersonalShouldNotBeFound("redesSociales.equals=" + UPDATED_REDES_SOCIALES);
    }

    @Test
    @Transactional
    public void getAllInformacionPersonalsByRedesSocialesIsNotEqualToSomething() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where redesSociales not equals to DEFAULT_REDES_SOCIALES
        defaultInformacionPersonalShouldNotBeFound("redesSociales.notEquals=" + DEFAULT_REDES_SOCIALES);

        // Get all the informacionPersonalList where redesSociales not equals to UPDATED_REDES_SOCIALES
        defaultInformacionPersonalShouldBeFound("redesSociales.notEquals=" + UPDATED_REDES_SOCIALES);
    }

    @Test
    @Transactional
    public void getAllInformacionPersonalsByRedesSocialesIsInShouldWork() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where redesSociales in DEFAULT_REDES_SOCIALES or UPDATED_REDES_SOCIALES
        defaultInformacionPersonalShouldBeFound("redesSociales.in=" + DEFAULT_REDES_SOCIALES + "," + UPDATED_REDES_SOCIALES);

        // Get all the informacionPersonalList where redesSociales equals to UPDATED_REDES_SOCIALES
        defaultInformacionPersonalShouldNotBeFound("redesSociales.in=" + UPDATED_REDES_SOCIALES);
    }

    @Test
    @Transactional
    public void getAllInformacionPersonalsByRedesSocialesIsNullOrNotNull() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where redesSociales is not null
        defaultInformacionPersonalShouldBeFound("redesSociales.specified=true");

        // Get all the informacionPersonalList where redesSociales is null
        defaultInformacionPersonalShouldNotBeFound("redesSociales.specified=false");
    }

    @Test
    @Transactional
    public void getAllInformacionPersonalsByRedesSocialesIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where redesSociales is greater than or equal to DEFAULT_REDES_SOCIALES
        defaultInformacionPersonalShouldBeFound("redesSociales.greaterThanOrEqual=" + DEFAULT_REDES_SOCIALES);

        // Get all the informacionPersonalList where redesSociales is greater than or equal to UPDATED_REDES_SOCIALES
        defaultInformacionPersonalShouldNotBeFound("redesSociales.greaterThanOrEqual=" + UPDATED_REDES_SOCIALES);
    }

    @Test
    @Transactional
    public void getAllInformacionPersonalsByRedesSocialesIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where redesSociales is less than or equal to DEFAULT_REDES_SOCIALES
        defaultInformacionPersonalShouldBeFound("redesSociales.lessThanOrEqual=" + DEFAULT_REDES_SOCIALES);

        // Get all the informacionPersonalList where redesSociales is less than or equal to SMALLER_REDES_SOCIALES
        defaultInformacionPersonalShouldNotBeFound("redesSociales.lessThanOrEqual=" + SMALLER_REDES_SOCIALES);
    }

    @Test
    @Transactional
    public void getAllInformacionPersonalsByRedesSocialesIsLessThanSomething() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where redesSociales is less than DEFAULT_REDES_SOCIALES
        defaultInformacionPersonalShouldNotBeFound("redesSociales.lessThan=" + DEFAULT_REDES_SOCIALES);

        // Get all the informacionPersonalList where redesSociales is less than UPDATED_REDES_SOCIALES
        defaultInformacionPersonalShouldBeFound("redesSociales.lessThan=" + UPDATED_REDES_SOCIALES);
    }

    @Test
    @Transactional
    public void getAllInformacionPersonalsByRedesSocialesIsGreaterThanSomething() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where redesSociales is greater than DEFAULT_REDES_SOCIALES
        defaultInformacionPersonalShouldNotBeFound("redesSociales.greaterThan=" + DEFAULT_REDES_SOCIALES);

        // Get all the informacionPersonalList where redesSociales is greater than SMALLER_REDES_SOCIALES
        defaultInformacionPersonalShouldBeFound("redesSociales.greaterThan=" + SMALLER_REDES_SOCIALES);
    }


    @Test
    @Transactional
    public void getAllInformacionPersonalsByLicencenciaConduccionIsEqualToSomething() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where licencenciaConduccion equals to DEFAULT_LICENCENCIA_CONDUCCION
        defaultInformacionPersonalShouldBeFound("licencenciaConduccion.equals=" + DEFAULT_LICENCENCIA_CONDUCCION);

        // Get all the informacionPersonalList where licencenciaConduccion equals to UPDATED_LICENCENCIA_CONDUCCION
        defaultInformacionPersonalShouldNotBeFound("licencenciaConduccion.equals=" + UPDATED_LICENCENCIA_CONDUCCION);
    }

    @Test
    @Transactional
    public void getAllInformacionPersonalsByLicencenciaConduccionIsNotEqualToSomething() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where licencenciaConduccion not equals to DEFAULT_LICENCENCIA_CONDUCCION
        defaultInformacionPersonalShouldNotBeFound("licencenciaConduccion.notEquals=" + DEFAULT_LICENCENCIA_CONDUCCION);

        // Get all the informacionPersonalList where licencenciaConduccion not equals to UPDATED_LICENCENCIA_CONDUCCION
        defaultInformacionPersonalShouldBeFound("licencenciaConduccion.notEquals=" + UPDATED_LICENCENCIA_CONDUCCION);
    }

    @Test
    @Transactional
    public void getAllInformacionPersonalsByLicencenciaConduccionIsInShouldWork() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where licencenciaConduccion in DEFAULT_LICENCENCIA_CONDUCCION or UPDATED_LICENCENCIA_CONDUCCION
        defaultInformacionPersonalShouldBeFound("licencenciaConduccion.in=" + DEFAULT_LICENCENCIA_CONDUCCION + "," + UPDATED_LICENCENCIA_CONDUCCION);

        // Get all the informacionPersonalList where licencenciaConduccion equals to UPDATED_LICENCENCIA_CONDUCCION
        defaultInformacionPersonalShouldNotBeFound("licencenciaConduccion.in=" + UPDATED_LICENCENCIA_CONDUCCION);
    }

    @Test
    @Transactional
    public void getAllInformacionPersonalsByLicencenciaConduccionIsNullOrNotNull() throws Exception {
        // Initialize the database
        informacionPersonalRepository.saveAndFlush(informacionPersonal);

        // Get all the informacionPersonalList where licencenciaConduccion is not null
        defaultInformacionPersonalShouldBeFound("licencenciaConduccion.specified=true");

        // Get all the informacionPersonalList where licencenciaConduccion is null
        defaultInformacionPersonalShouldNotBeFound("licencenciaConduccion.specified=false");
    }

    @Test
    @Transactional
    public void getAllInformacionPersonalsByUsuarioIsEqualToSomething() throws Exception {
        // Get already existing entity
        Persona usuario = informacionPersonal.getUsuario();
        informacionPersonalRepository.saveAndFlush(informacionPersonal);
        Long usuarioId = usuario.getId();

        // Get all the informacionPersonalList where usuario equals to usuarioId
        defaultInformacionPersonalShouldBeFound("usuarioId.equals=" + usuarioId);

        // Get all the informacionPersonalList where usuario equals to usuarioId + 1
        defaultInformacionPersonalShouldNotBeFound("usuarioId.equals=" + (usuarioId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultInformacionPersonalShouldBeFound(String filter) throws Exception {
        restInformacionPersonalMockMvc.perform(get("/api/informacion-personals?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(informacionPersonal.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaNacimiento").value(hasItem(DEFAULT_FECHA_NACIMIENTO.toString())))
            .andExpect(jsonPath("$.[*].lugarNacimiento").value(hasItem(DEFAULT_LUGAR_NACIMIENTO)))
            .andExpect(jsonPath("$.[*].direccionResidencia").value(hasItem(DEFAULT_DIRECCION_RESIDENCIA)))
            .andExpect(jsonPath("$.[*].genero").value(hasItem(DEFAULT_GENERO)))
            .andExpect(jsonPath("$.[*].ciudad").value(hasItem(DEFAULT_CIUDAD)))
            .andExpect(jsonPath("$.[*].telefono").value(hasItem(DEFAULT_TELEFONO)))
            .andExpect(jsonPath("$.[*].discapacidad").value(hasItem(DEFAULT_DISCAPACIDAD)))
            .andExpect(jsonPath("$.[*].redesSociales").value(hasItem(DEFAULT_REDES_SOCIALES)))
            .andExpect(jsonPath("$.[*].licencenciaConduccion").value(hasItem(DEFAULT_LICENCENCIA_CONDUCCION.booleanValue())));

        // Check, that the count call also returns 1
        restInformacionPersonalMockMvc.perform(get("/api/informacion-personals/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultInformacionPersonalShouldNotBeFound(String filter) throws Exception {
        restInformacionPersonalMockMvc.perform(get("/api/informacion-personals?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restInformacionPersonalMockMvc.perform(get("/api/informacion-personals/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingInformacionPersonal() throws Exception {
        // Get the informacionPersonal
        restInformacionPersonalMockMvc.perform(get("/api/informacion-personals/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInformacionPersonal() throws Exception {
        // Initialize the database
        informacionPersonalService.save(informacionPersonal);

        int databaseSizeBeforeUpdate = informacionPersonalRepository.findAll().size();

        // Update the informacionPersonal
        InformacionPersonal updatedInformacionPersonal = informacionPersonalRepository.findById(informacionPersonal.getId()).get();
        // Disconnect from session so that the updates on updatedInformacionPersonal are not directly saved in db
        em.detach(updatedInformacionPersonal);
        updatedInformacionPersonal
            .fechaNacimiento(UPDATED_FECHA_NACIMIENTO)
            .lugarNacimiento(UPDATED_LUGAR_NACIMIENTO)
            .direccionResidencia(UPDATED_DIRECCION_RESIDENCIA)
            .genero(UPDATED_GENERO)
            .ciudad(UPDATED_CIUDAD)
            .telefono(UPDATED_TELEFONO)
            .discapacidad(UPDATED_DISCAPACIDAD)
            .redesSociales(UPDATED_REDES_SOCIALES)
            .licencenciaConduccion(UPDATED_LICENCENCIA_CONDUCCION);

        restInformacionPersonalMockMvc.perform(put("/api/informacion-personals")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedInformacionPersonal)))
            .andExpect(status().isOk());

        // Validate the InformacionPersonal in the database
        List<InformacionPersonal> informacionPersonalList = informacionPersonalRepository.findAll();
        assertThat(informacionPersonalList).hasSize(databaseSizeBeforeUpdate);
        InformacionPersonal testInformacionPersonal = informacionPersonalList.get(informacionPersonalList.size() - 1);
        assertThat(testInformacionPersonal.getFechaNacimiento()).isEqualTo(UPDATED_FECHA_NACIMIENTO);
        assertThat(testInformacionPersonal.getLugarNacimiento()).isEqualTo(UPDATED_LUGAR_NACIMIENTO);
        assertThat(testInformacionPersonal.getDireccionResidencia()).isEqualTo(UPDATED_DIRECCION_RESIDENCIA);
        assertThat(testInformacionPersonal.getGenero()).isEqualTo(UPDATED_GENERO);
        assertThat(testInformacionPersonal.getCiudad()).isEqualTo(UPDATED_CIUDAD);
        assertThat(testInformacionPersonal.getTelefono()).isEqualTo(UPDATED_TELEFONO);
        assertThat(testInformacionPersonal.getDiscapacidad()).isEqualTo(UPDATED_DISCAPACIDAD);
        assertThat(testInformacionPersonal.getRedesSociales()).isEqualTo(UPDATED_REDES_SOCIALES);
        assertThat(testInformacionPersonal.isLicencenciaConduccion()).isEqualTo(UPDATED_LICENCENCIA_CONDUCCION);
    }

    @Test
    @Transactional
    public void updateNonExistingInformacionPersonal() throws Exception {
        int databaseSizeBeforeUpdate = informacionPersonalRepository.findAll().size();

        // Create the InformacionPersonal

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInformacionPersonalMockMvc.perform(put("/api/informacion-personals")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(informacionPersonal)))
            .andExpect(status().isBadRequest());

        // Validate the InformacionPersonal in the database
        List<InformacionPersonal> informacionPersonalList = informacionPersonalRepository.findAll();
        assertThat(informacionPersonalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteInformacionPersonal() throws Exception {
        // Initialize the database
        informacionPersonalService.save(informacionPersonal);

        int databaseSizeBeforeDelete = informacionPersonalRepository.findAll().size();

        // Delete the informacionPersonal
        restInformacionPersonalMockMvc.perform(delete("/api/informacion-personals/{id}", informacionPersonal.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<InformacionPersonal> informacionPersonalList = informacionPersonalRepository.findAll();
        assertThat(informacionPersonalList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
