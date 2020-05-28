package com.web.rest;

import com.CtProjectApp;
import com.domain.Oferta;
import com.domain.Empresa;
import com.repository.OfertaRepository;
import com.service.OfertaService;
import com.service.dto.OfertaCriteria;
import com.service.OfertaQueryService;

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
 * Integration tests for the {@link OfertaResource} REST controller.
 */
@SpringBootTest(classes = CtProjectApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class OfertaResourceIT {

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final String DEFAULT_TITULO = "AAAAAAAAAA";
    private static final String UPDATED_TITULO = "BBBBBBBBBB";

    private static final Integer DEFAULT_SALARIO = 1;
    private static final Integer UPDATED_SALARIO = 2;
    private static final Integer SMALLER_SALARIO = 1 - 1;

    private static final Integer DEFAULT_CARGO = 1;
    private static final Integer UPDATED_CARGO = 2;
    private static final Integer SMALLER_CARGO = 1 - 1;

    private static final String DEFAULT_EXPERIENCIA = "AAAAAAAAAA";
    private static final String UPDATED_EXPERIENCIA = "BBBBBBBBBB";

    private static final Integer DEFAULT_CIUDAD = 1;
    private static final Integer UPDATED_CIUDAD = 2;
    private static final Integer SMALLER_CIUDAD = 1 - 1;

    private static final Integer DEFAULT_AREA = 1;
    private static final Integer UPDATED_AREA = 2;
    private static final Integer SMALLER_AREA = 1 - 1;

    private static final LocalDate DEFAULT_FECHA_PUBLICACION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_PUBLICACION = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_FECHA_PUBLICACION = LocalDate.ofEpochDay(-1L);

    private static final String DEFAULT_ESTADO = "A";
    private static final String UPDATED_ESTADO = "B";

    @Autowired
    private OfertaRepository ofertaRepository;

    @Autowired
    private OfertaService ofertaService;

    @Autowired
    private OfertaQueryService ofertaQueryService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restOfertaMockMvc;

    private Oferta oferta;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Oferta createEntity(EntityManager em) {
        Oferta oferta = new Oferta()
            .descripcion(DEFAULT_DESCRIPCION)
            .titulo(DEFAULT_TITULO)
            .salario(DEFAULT_SALARIO)
            .cargo(DEFAULT_CARGO)
            .experiencia(DEFAULT_EXPERIENCIA)
            .ciudad(DEFAULT_CIUDAD)
            .area(DEFAULT_AREA)
            .fechaPublicacion(DEFAULT_FECHA_PUBLICACION)
            .estado(DEFAULT_ESTADO);
        // Add required entity
        Empresa empresa;
        if (TestUtil.findAll(em, Empresa.class).isEmpty()) {
            empresa = EmpresaResourceIT.createEntity(em);
            em.persist(empresa);
            em.flush();
        } else {
            empresa = TestUtil.findAll(em, Empresa.class).get(0);
        }
        oferta.setUsuario(empresa);
        return oferta;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Oferta createUpdatedEntity(EntityManager em) {
        Oferta oferta = new Oferta()
            .descripcion(UPDATED_DESCRIPCION)
            .titulo(UPDATED_TITULO)
            .salario(UPDATED_SALARIO)
            .cargo(UPDATED_CARGO)
            .experiencia(UPDATED_EXPERIENCIA)
            .ciudad(UPDATED_CIUDAD)
            .area(UPDATED_AREA)
            .fechaPublicacion(UPDATED_FECHA_PUBLICACION)
            .estado(UPDATED_ESTADO);
        // Add required entity
        Empresa empresa;
        if (TestUtil.findAll(em, Empresa.class).isEmpty()) {
            empresa = EmpresaResourceIT.createUpdatedEntity(em);
            em.persist(empresa);
            em.flush();
        } else {
            empresa = TestUtil.findAll(em, Empresa.class).get(0);
        }
        oferta.setUsuario(empresa);
        return oferta;
    }

    @BeforeEach
    public void initTest() {
        oferta = createEntity(em);
    }

    @Test
    @Transactional
    public void createOferta() throws Exception {
        int databaseSizeBeforeCreate = ofertaRepository.findAll().size();

        // Create the Oferta
        restOfertaMockMvc.perform(post("/api/ofertas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(oferta)))
            .andExpect(status().isCreated());

        // Validate the Oferta in the database
        List<Oferta> ofertaList = ofertaRepository.findAll();
        assertThat(ofertaList).hasSize(databaseSizeBeforeCreate + 1);
        Oferta testOferta = ofertaList.get(ofertaList.size() - 1);
        assertThat(testOferta.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testOferta.getTitulo()).isEqualTo(DEFAULT_TITULO);
        assertThat(testOferta.getSalario()).isEqualTo(DEFAULT_SALARIO);
        assertThat(testOferta.getCargo()).isEqualTo(DEFAULT_CARGO);
        assertThat(testOferta.getExperiencia()).isEqualTo(DEFAULT_EXPERIENCIA);
        assertThat(testOferta.getCiudad()).isEqualTo(DEFAULT_CIUDAD);
        assertThat(testOferta.getArea()).isEqualTo(DEFAULT_AREA);
        assertThat(testOferta.getFechaPublicacion()).isEqualTo(DEFAULT_FECHA_PUBLICACION);
        assertThat(testOferta.getEstado()).isEqualTo(DEFAULT_ESTADO);
    }

    @Test
    @Transactional
    public void createOfertaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ofertaRepository.findAll().size();

        // Create the Oferta with an existing ID
        oferta.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOfertaMockMvc.perform(post("/api/ofertas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(oferta)))
            .andExpect(status().isBadRequest());

        // Validate the Oferta in the database
        List<Oferta> ofertaList = ofertaRepository.findAll();
        assertThat(ofertaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkDescripcionIsRequired() throws Exception {
        int databaseSizeBeforeTest = ofertaRepository.findAll().size();
        // set the field null
        oferta.setDescripcion(null);

        // Create the Oferta, which fails.

        restOfertaMockMvc.perform(post("/api/ofertas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(oferta)))
            .andExpect(status().isBadRequest());

        List<Oferta> ofertaList = ofertaRepository.findAll();
        assertThat(ofertaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTituloIsRequired() throws Exception {
        int databaseSizeBeforeTest = ofertaRepository.findAll().size();
        // set the field null
        oferta.setTitulo(null);

        // Create the Oferta, which fails.

        restOfertaMockMvc.perform(post("/api/ofertas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(oferta)))
            .andExpect(status().isBadRequest());

        List<Oferta> ofertaList = ofertaRepository.findAll();
        assertThat(ofertaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSalarioIsRequired() throws Exception {
        int databaseSizeBeforeTest = ofertaRepository.findAll().size();
        // set the field null
        oferta.setSalario(null);

        // Create the Oferta, which fails.

        restOfertaMockMvc.perform(post("/api/ofertas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(oferta)))
            .andExpect(status().isBadRequest());

        List<Oferta> ofertaList = ofertaRepository.findAll();
        assertThat(ofertaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCargoIsRequired() throws Exception {
        int databaseSizeBeforeTest = ofertaRepository.findAll().size();
        // set the field null
        oferta.setCargo(null);

        // Create the Oferta, which fails.

        restOfertaMockMvc.perform(post("/api/ofertas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(oferta)))
            .andExpect(status().isBadRequest());

        List<Oferta> ofertaList = ofertaRepository.findAll();
        assertThat(ofertaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCiudadIsRequired() throws Exception {
        int databaseSizeBeforeTest = ofertaRepository.findAll().size();
        // set the field null
        oferta.setCiudad(null);

        // Create the Oferta, which fails.

        restOfertaMockMvc.perform(post("/api/ofertas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(oferta)))
            .andExpect(status().isBadRequest());

        List<Oferta> ofertaList = ofertaRepository.findAll();
        assertThat(ofertaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAreaIsRequired() throws Exception {
        int databaseSizeBeforeTest = ofertaRepository.findAll().size();
        // set the field null
        oferta.setArea(null);

        // Create the Oferta, which fails.

        restOfertaMockMvc.perform(post("/api/ofertas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(oferta)))
            .andExpect(status().isBadRequest());

        List<Oferta> ofertaList = ofertaRepository.findAll();
        assertThat(ofertaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkFechaPublicacionIsRequired() throws Exception {
        int databaseSizeBeforeTest = ofertaRepository.findAll().size();
        // set the field null
        oferta.setFechaPublicacion(null);

        // Create the Oferta, which fails.

        restOfertaMockMvc.perform(post("/api/ofertas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(oferta)))
            .andExpect(status().isBadRequest());

        List<Oferta> ofertaList = ofertaRepository.findAll();
        assertThat(ofertaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEstadoIsRequired() throws Exception {
        int databaseSizeBeforeTest = ofertaRepository.findAll().size();
        // set the field null
        oferta.setEstado(null);

        // Create the Oferta, which fails.

        restOfertaMockMvc.perform(post("/api/ofertas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(oferta)))
            .andExpect(status().isBadRequest());

        List<Oferta> ofertaList = ofertaRepository.findAll();
        assertThat(ofertaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllOfertas() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList
        restOfertaMockMvc.perform(get("/api/ofertas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(oferta.getId().intValue())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)))
            .andExpect(jsonPath("$.[*].titulo").value(hasItem(DEFAULT_TITULO)))
            .andExpect(jsonPath("$.[*].salario").value(hasItem(DEFAULT_SALARIO)))
            .andExpect(jsonPath("$.[*].cargo").value(hasItem(DEFAULT_CARGO)))
            .andExpect(jsonPath("$.[*].experiencia").value(hasItem(DEFAULT_EXPERIENCIA)))
            .andExpect(jsonPath("$.[*].ciudad").value(hasItem(DEFAULT_CIUDAD)))
            .andExpect(jsonPath("$.[*].area").value(hasItem(DEFAULT_AREA)))
            .andExpect(jsonPath("$.[*].fechaPublicacion").value(hasItem(DEFAULT_FECHA_PUBLICACION.toString())))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO)));
    }
    
    @Test
    @Transactional
    public void getOferta() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get the oferta
        restOfertaMockMvc.perform(get("/api/ofertas/{id}", oferta.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(oferta.getId().intValue()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION))
            .andExpect(jsonPath("$.titulo").value(DEFAULT_TITULO))
            .andExpect(jsonPath("$.salario").value(DEFAULT_SALARIO))
            .andExpect(jsonPath("$.cargo").value(DEFAULT_CARGO))
            .andExpect(jsonPath("$.experiencia").value(DEFAULT_EXPERIENCIA))
            .andExpect(jsonPath("$.ciudad").value(DEFAULT_CIUDAD))
            .andExpect(jsonPath("$.area").value(DEFAULT_AREA))
            .andExpect(jsonPath("$.fechaPublicacion").value(DEFAULT_FECHA_PUBLICACION.toString()))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO));
    }


    @Test
    @Transactional
    public void getOfertasByIdFiltering() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        Long id = oferta.getId();

        defaultOfertaShouldBeFound("id.equals=" + id);
        defaultOfertaShouldNotBeFound("id.notEquals=" + id);

        defaultOfertaShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultOfertaShouldNotBeFound("id.greaterThan=" + id);

        defaultOfertaShouldBeFound("id.lessThanOrEqual=" + id);
        defaultOfertaShouldNotBeFound("id.lessThan=" + id);
    }


    @Test
    @Transactional
    public void getAllOfertasByDescripcionIsEqualToSomething() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where descripcion equals to DEFAULT_DESCRIPCION
        defaultOfertaShouldBeFound("descripcion.equals=" + DEFAULT_DESCRIPCION);

        // Get all the ofertaList where descripcion equals to UPDATED_DESCRIPCION
        defaultOfertaShouldNotBeFound("descripcion.equals=" + UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void getAllOfertasByDescripcionIsNotEqualToSomething() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where descripcion not equals to DEFAULT_DESCRIPCION
        defaultOfertaShouldNotBeFound("descripcion.notEquals=" + DEFAULT_DESCRIPCION);

        // Get all the ofertaList where descripcion not equals to UPDATED_DESCRIPCION
        defaultOfertaShouldBeFound("descripcion.notEquals=" + UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void getAllOfertasByDescripcionIsInShouldWork() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where descripcion in DEFAULT_DESCRIPCION or UPDATED_DESCRIPCION
        defaultOfertaShouldBeFound("descripcion.in=" + DEFAULT_DESCRIPCION + "," + UPDATED_DESCRIPCION);

        // Get all the ofertaList where descripcion equals to UPDATED_DESCRIPCION
        defaultOfertaShouldNotBeFound("descripcion.in=" + UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void getAllOfertasByDescripcionIsNullOrNotNull() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where descripcion is not null
        defaultOfertaShouldBeFound("descripcion.specified=true");

        // Get all the ofertaList where descripcion is null
        defaultOfertaShouldNotBeFound("descripcion.specified=false");
    }
                @Test
    @Transactional
    public void getAllOfertasByDescripcionContainsSomething() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where descripcion contains DEFAULT_DESCRIPCION
        defaultOfertaShouldBeFound("descripcion.contains=" + DEFAULT_DESCRIPCION);

        // Get all the ofertaList where descripcion contains UPDATED_DESCRIPCION
        defaultOfertaShouldNotBeFound("descripcion.contains=" + UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void getAllOfertasByDescripcionNotContainsSomething() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where descripcion does not contain DEFAULT_DESCRIPCION
        defaultOfertaShouldNotBeFound("descripcion.doesNotContain=" + DEFAULT_DESCRIPCION);

        // Get all the ofertaList where descripcion does not contain UPDATED_DESCRIPCION
        defaultOfertaShouldBeFound("descripcion.doesNotContain=" + UPDATED_DESCRIPCION);
    }


    @Test
    @Transactional
    public void getAllOfertasByTituloIsEqualToSomething() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where titulo equals to DEFAULT_TITULO
        defaultOfertaShouldBeFound("titulo.equals=" + DEFAULT_TITULO);

        // Get all the ofertaList where titulo equals to UPDATED_TITULO
        defaultOfertaShouldNotBeFound("titulo.equals=" + UPDATED_TITULO);
    }

    @Test
    @Transactional
    public void getAllOfertasByTituloIsNotEqualToSomething() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where titulo not equals to DEFAULT_TITULO
        defaultOfertaShouldNotBeFound("titulo.notEquals=" + DEFAULT_TITULO);

        // Get all the ofertaList where titulo not equals to UPDATED_TITULO
        defaultOfertaShouldBeFound("titulo.notEquals=" + UPDATED_TITULO);
    }

    @Test
    @Transactional
    public void getAllOfertasByTituloIsInShouldWork() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where titulo in DEFAULT_TITULO or UPDATED_TITULO
        defaultOfertaShouldBeFound("titulo.in=" + DEFAULT_TITULO + "," + UPDATED_TITULO);

        // Get all the ofertaList where titulo equals to UPDATED_TITULO
        defaultOfertaShouldNotBeFound("titulo.in=" + UPDATED_TITULO);
    }

    @Test
    @Transactional
    public void getAllOfertasByTituloIsNullOrNotNull() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where titulo is not null
        defaultOfertaShouldBeFound("titulo.specified=true");

        // Get all the ofertaList where titulo is null
        defaultOfertaShouldNotBeFound("titulo.specified=false");
    }
                @Test
    @Transactional
    public void getAllOfertasByTituloContainsSomething() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where titulo contains DEFAULT_TITULO
        defaultOfertaShouldBeFound("titulo.contains=" + DEFAULT_TITULO);

        // Get all the ofertaList where titulo contains UPDATED_TITULO
        defaultOfertaShouldNotBeFound("titulo.contains=" + UPDATED_TITULO);
    }

    @Test
    @Transactional
    public void getAllOfertasByTituloNotContainsSomething() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where titulo does not contain DEFAULT_TITULO
        defaultOfertaShouldNotBeFound("titulo.doesNotContain=" + DEFAULT_TITULO);

        // Get all the ofertaList where titulo does not contain UPDATED_TITULO
        defaultOfertaShouldBeFound("titulo.doesNotContain=" + UPDATED_TITULO);
    }


    @Test
    @Transactional
    public void getAllOfertasBySalarioIsEqualToSomething() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where salario equals to DEFAULT_SALARIO
        defaultOfertaShouldBeFound("salario.equals=" + DEFAULT_SALARIO);

        // Get all the ofertaList where salario equals to UPDATED_SALARIO
        defaultOfertaShouldNotBeFound("salario.equals=" + UPDATED_SALARIO);
    }

    @Test
    @Transactional
    public void getAllOfertasBySalarioIsNotEqualToSomething() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where salario not equals to DEFAULT_SALARIO
        defaultOfertaShouldNotBeFound("salario.notEquals=" + DEFAULT_SALARIO);

        // Get all the ofertaList where salario not equals to UPDATED_SALARIO
        defaultOfertaShouldBeFound("salario.notEquals=" + UPDATED_SALARIO);
    }

    @Test
    @Transactional
    public void getAllOfertasBySalarioIsInShouldWork() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where salario in DEFAULT_SALARIO or UPDATED_SALARIO
        defaultOfertaShouldBeFound("salario.in=" + DEFAULT_SALARIO + "," + UPDATED_SALARIO);

        // Get all the ofertaList where salario equals to UPDATED_SALARIO
        defaultOfertaShouldNotBeFound("salario.in=" + UPDATED_SALARIO);
    }

    @Test
    @Transactional
    public void getAllOfertasBySalarioIsNullOrNotNull() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where salario is not null
        defaultOfertaShouldBeFound("salario.specified=true");

        // Get all the ofertaList where salario is null
        defaultOfertaShouldNotBeFound("salario.specified=false");
    }

    @Test
    @Transactional
    public void getAllOfertasBySalarioIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where salario is greater than or equal to DEFAULT_SALARIO
        defaultOfertaShouldBeFound("salario.greaterThanOrEqual=" + DEFAULT_SALARIO);

        // Get all the ofertaList where salario is greater than or equal to UPDATED_SALARIO
        defaultOfertaShouldNotBeFound("salario.greaterThanOrEqual=" + UPDATED_SALARIO);
    }

    @Test
    @Transactional
    public void getAllOfertasBySalarioIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where salario is less than or equal to DEFAULT_SALARIO
        defaultOfertaShouldBeFound("salario.lessThanOrEqual=" + DEFAULT_SALARIO);

        // Get all the ofertaList where salario is less than or equal to SMALLER_SALARIO
        defaultOfertaShouldNotBeFound("salario.lessThanOrEqual=" + SMALLER_SALARIO);
    }

    @Test
    @Transactional
    public void getAllOfertasBySalarioIsLessThanSomething() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where salario is less than DEFAULT_SALARIO
        defaultOfertaShouldNotBeFound("salario.lessThan=" + DEFAULT_SALARIO);

        // Get all the ofertaList where salario is less than UPDATED_SALARIO
        defaultOfertaShouldBeFound("salario.lessThan=" + UPDATED_SALARIO);
    }

    @Test
    @Transactional
    public void getAllOfertasBySalarioIsGreaterThanSomething() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where salario is greater than DEFAULT_SALARIO
        defaultOfertaShouldNotBeFound("salario.greaterThan=" + DEFAULT_SALARIO);

        // Get all the ofertaList where salario is greater than SMALLER_SALARIO
        defaultOfertaShouldBeFound("salario.greaterThan=" + SMALLER_SALARIO);
    }


    @Test
    @Transactional
    public void getAllOfertasByCargoIsEqualToSomething() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where cargo equals to DEFAULT_CARGO
        defaultOfertaShouldBeFound("cargo.equals=" + DEFAULT_CARGO);

        // Get all the ofertaList where cargo equals to UPDATED_CARGO
        defaultOfertaShouldNotBeFound("cargo.equals=" + UPDATED_CARGO);
    }

    @Test
    @Transactional
    public void getAllOfertasByCargoIsNotEqualToSomething() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where cargo not equals to DEFAULT_CARGO
        defaultOfertaShouldNotBeFound("cargo.notEquals=" + DEFAULT_CARGO);

        // Get all the ofertaList where cargo not equals to UPDATED_CARGO
        defaultOfertaShouldBeFound("cargo.notEquals=" + UPDATED_CARGO);
    }

    @Test
    @Transactional
    public void getAllOfertasByCargoIsInShouldWork() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where cargo in DEFAULT_CARGO or UPDATED_CARGO
        defaultOfertaShouldBeFound("cargo.in=" + DEFAULT_CARGO + "," + UPDATED_CARGO);

        // Get all the ofertaList where cargo equals to UPDATED_CARGO
        defaultOfertaShouldNotBeFound("cargo.in=" + UPDATED_CARGO);
    }

    @Test
    @Transactional
    public void getAllOfertasByCargoIsNullOrNotNull() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where cargo is not null
        defaultOfertaShouldBeFound("cargo.specified=true");

        // Get all the ofertaList where cargo is null
        defaultOfertaShouldNotBeFound("cargo.specified=false");
    }

    @Test
    @Transactional
    public void getAllOfertasByCargoIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where cargo is greater than or equal to DEFAULT_CARGO
        defaultOfertaShouldBeFound("cargo.greaterThanOrEqual=" + DEFAULT_CARGO);

        // Get all the ofertaList where cargo is greater than or equal to UPDATED_CARGO
        defaultOfertaShouldNotBeFound("cargo.greaterThanOrEqual=" + UPDATED_CARGO);
    }

    @Test
    @Transactional
    public void getAllOfertasByCargoIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where cargo is less than or equal to DEFAULT_CARGO
        defaultOfertaShouldBeFound("cargo.lessThanOrEqual=" + DEFAULT_CARGO);

        // Get all the ofertaList where cargo is less than or equal to SMALLER_CARGO
        defaultOfertaShouldNotBeFound("cargo.lessThanOrEqual=" + SMALLER_CARGO);
    }

    @Test
    @Transactional
    public void getAllOfertasByCargoIsLessThanSomething() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where cargo is less than DEFAULT_CARGO
        defaultOfertaShouldNotBeFound("cargo.lessThan=" + DEFAULT_CARGO);

        // Get all the ofertaList where cargo is less than UPDATED_CARGO
        defaultOfertaShouldBeFound("cargo.lessThan=" + UPDATED_CARGO);
    }

    @Test
    @Transactional
    public void getAllOfertasByCargoIsGreaterThanSomething() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where cargo is greater than DEFAULT_CARGO
        defaultOfertaShouldNotBeFound("cargo.greaterThan=" + DEFAULT_CARGO);

        // Get all the ofertaList where cargo is greater than SMALLER_CARGO
        defaultOfertaShouldBeFound("cargo.greaterThan=" + SMALLER_CARGO);
    }


    @Test
    @Transactional
    public void getAllOfertasByExperienciaIsEqualToSomething() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where experiencia equals to DEFAULT_EXPERIENCIA
        defaultOfertaShouldBeFound("experiencia.equals=" + DEFAULT_EXPERIENCIA);

        // Get all the ofertaList where experiencia equals to UPDATED_EXPERIENCIA
        defaultOfertaShouldNotBeFound("experiencia.equals=" + UPDATED_EXPERIENCIA);
    }

    @Test
    @Transactional
    public void getAllOfertasByExperienciaIsNotEqualToSomething() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where experiencia not equals to DEFAULT_EXPERIENCIA
        defaultOfertaShouldNotBeFound("experiencia.notEquals=" + DEFAULT_EXPERIENCIA);

        // Get all the ofertaList where experiencia not equals to UPDATED_EXPERIENCIA
        defaultOfertaShouldBeFound("experiencia.notEquals=" + UPDATED_EXPERIENCIA);
    }

    @Test
    @Transactional
    public void getAllOfertasByExperienciaIsInShouldWork() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where experiencia in DEFAULT_EXPERIENCIA or UPDATED_EXPERIENCIA
        defaultOfertaShouldBeFound("experiencia.in=" + DEFAULT_EXPERIENCIA + "," + UPDATED_EXPERIENCIA);

        // Get all the ofertaList where experiencia equals to UPDATED_EXPERIENCIA
        defaultOfertaShouldNotBeFound("experiencia.in=" + UPDATED_EXPERIENCIA);
    }

    @Test
    @Transactional
    public void getAllOfertasByExperienciaIsNullOrNotNull() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where experiencia is not null
        defaultOfertaShouldBeFound("experiencia.specified=true");

        // Get all the ofertaList where experiencia is null
        defaultOfertaShouldNotBeFound("experiencia.specified=false");
    }
                @Test
    @Transactional
    public void getAllOfertasByExperienciaContainsSomething() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where experiencia contains DEFAULT_EXPERIENCIA
        defaultOfertaShouldBeFound("experiencia.contains=" + DEFAULT_EXPERIENCIA);

        // Get all the ofertaList where experiencia contains UPDATED_EXPERIENCIA
        defaultOfertaShouldNotBeFound("experiencia.contains=" + UPDATED_EXPERIENCIA);
    }

    @Test
    @Transactional
    public void getAllOfertasByExperienciaNotContainsSomething() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where experiencia does not contain DEFAULT_EXPERIENCIA
        defaultOfertaShouldNotBeFound("experiencia.doesNotContain=" + DEFAULT_EXPERIENCIA);

        // Get all the ofertaList where experiencia does not contain UPDATED_EXPERIENCIA
        defaultOfertaShouldBeFound("experiencia.doesNotContain=" + UPDATED_EXPERIENCIA);
    }


    @Test
    @Transactional
    public void getAllOfertasByCiudadIsEqualToSomething() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where ciudad equals to DEFAULT_CIUDAD
        defaultOfertaShouldBeFound("ciudad.equals=" + DEFAULT_CIUDAD);

        // Get all the ofertaList where ciudad equals to UPDATED_CIUDAD
        defaultOfertaShouldNotBeFound("ciudad.equals=" + UPDATED_CIUDAD);
    }

    @Test
    @Transactional
    public void getAllOfertasByCiudadIsNotEqualToSomething() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where ciudad not equals to DEFAULT_CIUDAD
        defaultOfertaShouldNotBeFound("ciudad.notEquals=" + DEFAULT_CIUDAD);

        // Get all the ofertaList where ciudad not equals to UPDATED_CIUDAD
        defaultOfertaShouldBeFound("ciudad.notEquals=" + UPDATED_CIUDAD);
    }

    @Test
    @Transactional
    public void getAllOfertasByCiudadIsInShouldWork() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where ciudad in DEFAULT_CIUDAD or UPDATED_CIUDAD
        defaultOfertaShouldBeFound("ciudad.in=" + DEFAULT_CIUDAD + "," + UPDATED_CIUDAD);

        // Get all the ofertaList where ciudad equals to UPDATED_CIUDAD
        defaultOfertaShouldNotBeFound("ciudad.in=" + UPDATED_CIUDAD);
    }

    @Test
    @Transactional
    public void getAllOfertasByCiudadIsNullOrNotNull() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where ciudad is not null
        defaultOfertaShouldBeFound("ciudad.specified=true");

        // Get all the ofertaList where ciudad is null
        defaultOfertaShouldNotBeFound("ciudad.specified=false");
    }

    @Test
    @Transactional
    public void getAllOfertasByCiudadIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where ciudad is greater than or equal to DEFAULT_CIUDAD
        defaultOfertaShouldBeFound("ciudad.greaterThanOrEqual=" + DEFAULT_CIUDAD);

        // Get all the ofertaList where ciudad is greater than or equal to UPDATED_CIUDAD
        defaultOfertaShouldNotBeFound("ciudad.greaterThanOrEqual=" + UPDATED_CIUDAD);
    }

    @Test
    @Transactional
    public void getAllOfertasByCiudadIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where ciudad is less than or equal to DEFAULT_CIUDAD
        defaultOfertaShouldBeFound("ciudad.lessThanOrEqual=" + DEFAULT_CIUDAD);

        // Get all the ofertaList where ciudad is less than or equal to SMALLER_CIUDAD
        defaultOfertaShouldNotBeFound("ciudad.lessThanOrEqual=" + SMALLER_CIUDAD);
    }

    @Test
    @Transactional
    public void getAllOfertasByCiudadIsLessThanSomething() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where ciudad is less than DEFAULT_CIUDAD
        defaultOfertaShouldNotBeFound("ciudad.lessThan=" + DEFAULT_CIUDAD);

        // Get all the ofertaList where ciudad is less than UPDATED_CIUDAD
        defaultOfertaShouldBeFound("ciudad.lessThan=" + UPDATED_CIUDAD);
    }

    @Test
    @Transactional
    public void getAllOfertasByCiudadIsGreaterThanSomething() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where ciudad is greater than DEFAULT_CIUDAD
        defaultOfertaShouldNotBeFound("ciudad.greaterThan=" + DEFAULT_CIUDAD);

        // Get all the ofertaList where ciudad is greater than SMALLER_CIUDAD
        defaultOfertaShouldBeFound("ciudad.greaterThan=" + SMALLER_CIUDAD);
    }


    @Test
    @Transactional
    public void getAllOfertasByAreaIsEqualToSomething() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where area equals to DEFAULT_AREA
        defaultOfertaShouldBeFound("area.equals=" + DEFAULT_AREA);

        // Get all the ofertaList where area equals to UPDATED_AREA
        defaultOfertaShouldNotBeFound("area.equals=" + UPDATED_AREA);
    }

    @Test
    @Transactional
    public void getAllOfertasByAreaIsNotEqualToSomething() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where area not equals to DEFAULT_AREA
        defaultOfertaShouldNotBeFound("area.notEquals=" + DEFAULT_AREA);

        // Get all the ofertaList where area not equals to UPDATED_AREA
        defaultOfertaShouldBeFound("area.notEquals=" + UPDATED_AREA);
    }

    @Test
    @Transactional
    public void getAllOfertasByAreaIsInShouldWork() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where area in DEFAULT_AREA or UPDATED_AREA
        defaultOfertaShouldBeFound("area.in=" + DEFAULT_AREA + "," + UPDATED_AREA);

        // Get all the ofertaList where area equals to UPDATED_AREA
        defaultOfertaShouldNotBeFound("area.in=" + UPDATED_AREA);
    }

    @Test
    @Transactional
    public void getAllOfertasByAreaIsNullOrNotNull() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where area is not null
        defaultOfertaShouldBeFound("area.specified=true");

        // Get all the ofertaList where area is null
        defaultOfertaShouldNotBeFound("area.specified=false");
    }

    @Test
    @Transactional
    public void getAllOfertasByAreaIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where area is greater than or equal to DEFAULT_AREA
        defaultOfertaShouldBeFound("area.greaterThanOrEqual=" + DEFAULT_AREA);

        // Get all the ofertaList where area is greater than or equal to UPDATED_AREA
        defaultOfertaShouldNotBeFound("area.greaterThanOrEqual=" + UPDATED_AREA);
    }

    @Test
    @Transactional
    public void getAllOfertasByAreaIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where area is less than or equal to DEFAULT_AREA
        defaultOfertaShouldBeFound("area.lessThanOrEqual=" + DEFAULT_AREA);

        // Get all the ofertaList where area is less than or equal to SMALLER_AREA
        defaultOfertaShouldNotBeFound("area.lessThanOrEqual=" + SMALLER_AREA);
    }

    @Test
    @Transactional
    public void getAllOfertasByAreaIsLessThanSomething() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where area is less than DEFAULT_AREA
        defaultOfertaShouldNotBeFound("area.lessThan=" + DEFAULT_AREA);

        // Get all the ofertaList where area is less than UPDATED_AREA
        defaultOfertaShouldBeFound("area.lessThan=" + UPDATED_AREA);
    }

    @Test
    @Transactional
    public void getAllOfertasByAreaIsGreaterThanSomething() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where area is greater than DEFAULT_AREA
        defaultOfertaShouldNotBeFound("area.greaterThan=" + DEFAULT_AREA);

        // Get all the ofertaList where area is greater than SMALLER_AREA
        defaultOfertaShouldBeFound("area.greaterThan=" + SMALLER_AREA);
    }


    @Test
    @Transactional
    public void getAllOfertasByFechaPublicacionIsEqualToSomething() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where fechaPublicacion equals to DEFAULT_FECHA_PUBLICACION
        defaultOfertaShouldBeFound("fechaPublicacion.equals=" + DEFAULT_FECHA_PUBLICACION);

        // Get all the ofertaList where fechaPublicacion equals to UPDATED_FECHA_PUBLICACION
        defaultOfertaShouldNotBeFound("fechaPublicacion.equals=" + UPDATED_FECHA_PUBLICACION);
    }

    @Test
    @Transactional
    public void getAllOfertasByFechaPublicacionIsNotEqualToSomething() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where fechaPublicacion not equals to DEFAULT_FECHA_PUBLICACION
        defaultOfertaShouldNotBeFound("fechaPublicacion.notEquals=" + DEFAULT_FECHA_PUBLICACION);

        // Get all the ofertaList where fechaPublicacion not equals to UPDATED_FECHA_PUBLICACION
        defaultOfertaShouldBeFound("fechaPublicacion.notEquals=" + UPDATED_FECHA_PUBLICACION);
    }

    @Test
    @Transactional
    public void getAllOfertasByFechaPublicacionIsInShouldWork() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where fechaPublicacion in DEFAULT_FECHA_PUBLICACION or UPDATED_FECHA_PUBLICACION
        defaultOfertaShouldBeFound("fechaPublicacion.in=" + DEFAULT_FECHA_PUBLICACION + "," + UPDATED_FECHA_PUBLICACION);

        // Get all the ofertaList where fechaPublicacion equals to UPDATED_FECHA_PUBLICACION
        defaultOfertaShouldNotBeFound("fechaPublicacion.in=" + UPDATED_FECHA_PUBLICACION);
    }

    @Test
    @Transactional
    public void getAllOfertasByFechaPublicacionIsNullOrNotNull() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where fechaPublicacion is not null
        defaultOfertaShouldBeFound("fechaPublicacion.specified=true");

        // Get all the ofertaList where fechaPublicacion is null
        defaultOfertaShouldNotBeFound("fechaPublicacion.specified=false");
    }

    @Test
    @Transactional
    public void getAllOfertasByFechaPublicacionIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where fechaPublicacion is greater than or equal to DEFAULT_FECHA_PUBLICACION
        defaultOfertaShouldBeFound("fechaPublicacion.greaterThanOrEqual=" + DEFAULT_FECHA_PUBLICACION);

        // Get all the ofertaList where fechaPublicacion is greater than or equal to UPDATED_FECHA_PUBLICACION
        defaultOfertaShouldNotBeFound("fechaPublicacion.greaterThanOrEqual=" + UPDATED_FECHA_PUBLICACION);
    }

    @Test
    @Transactional
    public void getAllOfertasByFechaPublicacionIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where fechaPublicacion is less than or equal to DEFAULT_FECHA_PUBLICACION
        defaultOfertaShouldBeFound("fechaPublicacion.lessThanOrEqual=" + DEFAULT_FECHA_PUBLICACION);

        // Get all the ofertaList where fechaPublicacion is less than or equal to SMALLER_FECHA_PUBLICACION
        defaultOfertaShouldNotBeFound("fechaPublicacion.lessThanOrEqual=" + SMALLER_FECHA_PUBLICACION);
    }

    @Test
    @Transactional
    public void getAllOfertasByFechaPublicacionIsLessThanSomething() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where fechaPublicacion is less than DEFAULT_FECHA_PUBLICACION
        defaultOfertaShouldNotBeFound("fechaPublicacion.lessThan=" + DEFAULT_FECHA_PUBLICACION);

        // Get all the ofertaList where fechaPublicacion is less than UPDATED_FECHA_PUBLICACION
        defaultOfertaShouldBeFound("fechaPublicacion.lessThan=" + UPDATED_FECHA_PUBLICACION);
    }

    @Test
    @Transactional
    public void getAllOfertasByFechaPublicacionIsGreaterThanSomething() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where fechaPublicacion is greater than DEFAULT_FECHA_PUBLICACION
        defaultOfertaShouldNotBeFound("fechaPublicacion.greaterThan=" + DEFAULT_FECHA_PUBLICACION);

        // Get all the ofertaList where fechaPublicacion is greater than SMALLER_FECHA_PUBLICACION
        defaultOfertaShouldBeFound("fechaPublicacion.greaterThan=" + SMALLER_FECHA_PUBLICACION);
    }


    @Test
    @Transactional
    public void getAllOfertasByEstadoIsEqualToSomething() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where estado equals to DEFAULT_ESTADO
        defaultOfertaShouldBeFound("estado.equals=" + DEFAULT_ESTADO);

        // Get all the ofertaList where estado equals to UPDATED_ESTADO
        defaultOfertaShouldNotBeFound("estado.equals=" + UPDATED_ESTADO);
    }

    @Test
    @Transactional
    public void getAllOfertasByEstadoIsNotEqualToSomething() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where estado not equals to DEFAULT_ESTADO
        defaultOfertaShouldNotBeFound("estado.notEquals=" + DEFAULT_ESTADO);

        // Get all the ofertaList where estado not equals to UPDATED_ESTADO
        defaultOfertaShouldBeFound("estado.notEquals=" + UPDATED_ESTADO);
    }

    @Test
    @Transactional
    public void getAllOfertasByEstadoIsInShouldWork() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where estado in DEFAULT_ESTADO or UPDATED_ESTADO
        defaultOfertaShouldBeFound("estado.in=" + DEFAULT_ESTADO + "," + UPDATED_ESTADO);

        // Get all the ofertaList where estado equals to UPDATED_ESTADO
        defaultOfertaShouldNotBeFound("estado.in=" + UPDATED_ESTADO);
    }

    @Test
    @Transactional
    public void getAllOfertasByEstadoIsNullOrNotNull() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where estado is not null
        defaultOfertaShouldBeFound("estado.specified=true");

        // Get all the ofertaList where estado is null
        defaultOfertaShouldNotBeFound("estado.specified=false");
    }
                @Test
    @Transactional
    public void getAllOfertasByEstadoContainsSomething() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where estado contains DEFAULT_ESTADO
        defaultOfertaShouldBeFound("estado.contains=" + DEFAULT_ESTADO);

        // Get all the ofertaList where estado contains UPDATED_ESTADO
        defaultOfertaShouldNotBeFound("estado.contains=" + UPDATED_ESTADO);
    }

    @Test
    @Transactional
    public void getAllOfertasByEstadoNotContainsSomething() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList where estado does not contain DEFAULT_ESTADO
        defaultOfertaShouldNotBeFound("estado.doesNotContain=" + DEFAULT_ESTADO);

        // Get all the ofertaList where estado does not contain UPDATED_ESTADO
        defaultOfertaShouldBeFound("estado.doesNotContain=" + UPDATED_ESTADO);
    }


    @Test
    @Transactional
    public void getAllOfertasByUsuarioIsEqualToSomething() throws Exception {
        // Get already existing entity
        Empresa usuario = oferta.getUsuario();
        ofertaRepository.saveAndFlush(oferta);
        Long usuarioId = usuario.getId();

        // Get all the ofertaList where usuario equals to usuarioId
        defaultOfertaShouldBeFound("usuarioId.equals=" + usuarioId);

        // Get all the ofertaList where usuario equals to usuarioId + 1
        defaultOfertaShouldNotBeFound("usuarioId.equals=" + (usuarioId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultOfertaShouldBeFound(String filter) throws Exception {
        restOfertaMockMvc.perform(get("/api/ofertas?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(oferta.getId().intValue())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)))
            .andExpect(jsonPath("$.[*].titulo").value(hasItem(DEFAULT_TITULO)))
            .andExpect(jsonPath("$.[*].salario").value(hasItem(DEFAULT_SALARIO)))
            .andExpect(jsonPath("$.[*].cargo").value(hasItem(DEFAULT_CARGO)))
            .andExpect(jsonPath("$.[*].experiencia").value(hasItem(DEFAULT_EXPERIENCIA)))
            .andExpect(jsonPath("$.[*].ciudad").value(hasItem(DEFAULT_CIUDAD)))
            .andExpect(jsonPath("$.[*].area").value(hasItem(DEFAULT_AREA)))
            .andExpect(jsonPath("$.[*].fechaPublicacion").value(hasItem(DEFAULT_FECHA_PUBLICACION.toString())))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO)));

        // Check, that the count call also returns 1
        restOfertaMockMvc.perform(get("/api/ofertas/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultOfertaShouldNotBeFound(String filter) throws Exception {
        restOfertaMockMvc.perform(get("/api/ofertas?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restOfertaMockMvc.perform(get("/api/ofertas/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingOferta() throws Exception {
        // Get the oferta
        restOfertaMockMvc.perform(get("/api/ofertas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOferta() throws Exception {
        // Initialize the database
        ofertaService.save(oferta);

        int databaseSizeBeforeUpdate = ofertaRepository.findAll().size();

        // Update the oferta
        Oferta updatedOferta = ofertaRepository.findById(oferta.getId()).get();
        // Disconnect from session so that the updates on updatedOferta are not directly saved in db
        em.detach(updatedOferta);
        updatedOferta
            .descripcion(UPDATED_DESCRIPCION)
            .titulo(UPDATED_TITULO)
            .salario(UPDATED_SALARIO)
            .cargo(UPDATED_CARGO)
            .experiencia(UPDATED_EXPERIENCIA)
            .ciudad(UPDATED_CIUDAD)
            .area(UPDATED_AREA)
            .fechaPublicacion(UPDATED_FECHA_PUBLICACION)
            .estado(UPDATED_ESTADO);

        restOfertaMockMvc.perform(put("/api/ofertas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedOferta)))
            .andExpect(status().isOk());

        // Validate the Oferta in the database
        List<Oferta> ofertaList = ofertaRepository.findAll();
        assertThat(ofertaList).hasSize(databaseSizeBeforeUpdate);
        Oferta testOferta = ofertaList.get(ofertaList.size() - 1);
        assertThat(testOferta.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testOferta.getTitulo()).isEqualTo(UPDATED_TITULO);
        assertThat(testOferta.getSalario()).isEqualTo(UPDATED_SALARIO);
        assertThat(testOferta.getCargo()).isEqualTo(UPDATED_CARGO);
        assertThat(testOferta.getExperiencia()).isEqualTo(UPDATED_EXPERIENCIA);
        assertThat(testOferta.getCiudad()).isEqualTo(UPDATED_CIUDAD);
        assertThat(testOferta.getArea()).isEqualTo(UPDATED_AREA);
        assertThat(testOferta.getFechaPublicacion()).isEqualTo(UPDATED_FECHA_PUBLICACION);
        assertThat(testOferta.getEstado()).isEqualTo(UPDATED_ESTADO);
    }

    @Test
    @Transactional
    public void updateNonExistingOferta() throws Exception {
        int databaseSizeBeforeUpdate = ofertaRepository.findAll().size();

        // Create the Oferta

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOfertaMockMvc.perform(put("/api/ofertas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(oferta)))
            .andExpect(status().isBadRequest());

        // Validate the Oferta in the database
        List<Oferta> ofertaList = ofertaRepository.findAll();
        assertThat(ofertaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteOferta() throws Exception {
        // Initialize the database
        ofertaService.save(oferta);

        int databaseSizeBeforeDelete = ofertaRepository.findAll().size();

        // Delete the oferta
        restOfertaMockMvc.perform(delete("/api/ofertas/{id}", oferta.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Oferta> ofertaList = ofertaRepository.findAll();
        assertThat(ofertaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
