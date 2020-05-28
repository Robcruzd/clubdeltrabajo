package com.web.rest;

import com.CtProjectApp;
import com.domain.Empresa;
import com.domain.TipoUsuario;
import com.domain.TipoDocumento;
import com.repository.EmpresaRepository;
import com.service.EmpresaService;
import com.service.dto.EmpresaCriteria;
import com.service.EmpresaQueryService;

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
 * Integration tests for the {@link EmpresaResource} REST controller.
 */
@SpringBootTest(classes = CtProjectApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class EmpresaResourceIT {

    private static final String DEFAULT_RAZON_SOCIAL = "AAAAAAAAAA";
    private static final String UPDATED_RAZON_SOCIAL = "BBBBBBBBBB";

    private static final String DEFAULT_RAZON_COMERCIAL = "AAAAAAAAAA";
    private static final String UPDATED_RAZON_COMERCIAL = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_NUMERO_DOCUMENTO = "AAAAAAAAAA";
    private static final String UPDATED_NUMERO_DOCUMENTO = "BBBBBBBBBB";

    @Autowired
    private EmpresaRepository empresaRepository;

    @Autowired
    private EmpresaService empresaService;

    @Autowired
    private EmpresaQueryService empresaQueryService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEmpresaMockMvc;

    private Empresa empresa;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Empresa createEntity(EntityManager em) {
        Empresa empresa = new Empresa()
            .razonSocial(DEFAULT_RAZON_SOCIAL)
            .razonComercial(DEFAULT_RAZON_COMERCIAL)
            .email(DEFAULT_EMAIL)
            .numeroDocumento(DEFAULT_NUMERO_DOCUMENTO);
        // Add required entity
        TipoUsuario tipoUsuario;
        if (TestUtil.findAll(em, TipoUsuario.class).isEmpty()) {
            tipoUsuario = TipoUsuarioResourceIT.createEntity(em);
            em.persist(tipoUsuario);
            em.flush();
        } else {
            tipoUsuario = TestUtil.findAll(em, TipoUsuario.class).get(0);
        }
        empresa.setTipoUsuario(tipoUsuario);
        // Add required entity
        TipoDocumento tipoDocumento;
        if (TestUtil.findAll(em, TipoDocumento.class).isEmpty()) {
            tipoDocumento = TipoDocumentoResourceIT.createEntity(em);
            em.persist(tipoDocumento);
            em.flush();
        } else {
            tipoDocumento = TestUtil.findAll(em, TipoDocumento.class).get(0);
        }
        empresa.setTipoDocumento(tipoDocumento);
        return empresa;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Empresa createUpdatedEntity(EntityManager em) {
        Empresa empresa = new Empresa()
            .razonSocial(UPDATED_RAZON_SOCIAL)
            .razonComercial(UPDATED_RAZON_COMERCIAL)
            .email(UPDATED_EMAIL)
            .numeroDocumento(UPDATED_NUMERO_DOCUMENTO);
        // Add required entity
        TipoUsuario tipoUsuario;
        if (TestUtil.findAll(em, TipoUsuario.class).isEmpty()) {
            tipoUsuario = TipoUsuarioResourceIT.createUpdatedEntity(em);
            em.persist(tipoUsuario);
            em.flush();
        } else {
            tipoUsuario = TestUtil.findAll(em, TipoUsuario.class).get(0);
        }
        empresa.setTipoUsuario(tipoUsuario);
        // Add required entity
        TipoDocumento tipoDocumento;
        if (TestUtil.findAll(em, TipoDocumento.class).isEmpty()) {
            tipoDocumento = TipoDocumentoResourceIT.createUpdatedEntity(em);
            em.persist(tipoDocumento);
            em.flush();
        } else {
            tipoDocumento = TestUtil.findAll(em, TipoDocumento.class).get(0);
        }
        empresa.setTipoDocumento(tipoDocumento);
        return empresa;
    }

    @BeforeEach
    public void initTest() {
        empresa = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmpresa() throws Exception {
        int databaseSizeBeforeCreate = empresaRepository.findAll().size();

        // Create the Empresa
        restEmpresaMockMvc.perform(post("/api/empresas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(empresa)))
            .andExpect(status().isCreated());

        // Validate the Empresa in the database
        List<Empresa> empresaList = empresaRepository.findAll();
        assertThat(empresaList).hasSize(databaseSizeBeforeCreate + 1);
        Empresa testEmpresa = empresaList.get(empresaList.size() - 1);
        assertThat(testEmpresa.getRazonSocial()).isEqualTo(DEFAULT_RAZON_SOCIAL);
        assertThat(testEmpresa.getRazonComercial()).isEqualTo(DEFAULT_RAZON_COMERCIAL);
        assertThat(testEmpresa.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testEmpresa.getNumeroDocumento()).isEqualTo(DEFAULT_NUMERO_DOCUMENTO);
    }

    @Test
    @Transactional
    public void createEmpresaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = empresaRepository.findAll().size();

        // Create the Empresa with an existing ID
        empresa.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmpresaMockMvc.perform(post("/api/empresas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(empresa)))
            .andExpect(status().isBadRequest());

        // Validate the Empresa in the database
        List<Empresa> empresaList = empresaRepository.findAll();
        assertThat(empresaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkRazonSocialIsRequired() throws Exception {
        int databaseSizeBeforeTest = empresaRepository.findAll().size();
        // set the field null
        empresa.setRazonSocial(null);

        // Create the Empresa, which fails.

        restEmpresaMockMvc.perform(post("/api/empresas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(empresa)))
            .andExpect(status().isBadRequest());

        List<Empresa> empresaList = empresaRepository.findAll();
        assertThat(empresaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRazonComercialIsRequired() throws Exception {
        int databaseSizeBeforeTest = empresaRepository.findAll().size();
        // set the field null
        empresa.setRazonComercial(null);

        // Create the Empresa, which fails.

        restEmpresaMockMvc.perform(post("/api/empresas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(empresa)))
            .andExpect(status().isBadRequest());

        List<Empresa> empresaList = empresaRepository.findAll();
        assertThat(empresaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = empresaRepository.findAll().size();
        // set the field null
        empresa.setEmail(null);

        // Create the Empresa, which fails.

        restEmpresaMockMvc.perform(post("/api/empresas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(empresa)))
            .andExpect(status().isBadRequest());

        List<Empresa> empresaList = empresaRepository.findAll();
        assertThat(empresaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNumeroDocumentoIsRequired() throws Exception {
        int databaseSizeBeforeTest = empresaRepository.findAll().size();
        // set the field null
        empresa.setNumeroDocumento(null);

        // Create the Empresa, which fails.

        restEmpresaMockMvc.perform(post("/api/empresas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(empresa)))
            .andExpect(status().isBadRequest());

        List<Empresa> empresaList = empresaRepository.findAll();
        assertThat(empresaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEmpresas() throws Exception {
        // Initialize the database
        empresaRepository.saveAndFlush(empresa);

        // Get all the empresaList
        restEmpresaMockMvc.perform(get("/api/empresas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(empresa.getId().intValue())))
            .andExpect(jsonPath("$.[*].razonSocial").value(hasItem(DEFAULT_RAZON_SOCIAL)))
            .andExpect(jsonPath("$.[*].razonComercial").value(hasItem(DEFAULT_RAZON_COMERCIAL)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].numeroDocumento").value(hasItem(DEFAULT_NUMERO_DOCUMENTO)));
    }
    
    @Test
    @Transactional
    public void getEmpresa() throws Exception {
        // Initialize the database
        empresaRepository.saveAndFlush(empresa);

        // Get the empresa
        restEmpresaMockMvc.perform(get("/api/empresas/{id}", empresa.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(empresa.getId().intValue()))
            .andExpect(jsonPath("$.razonSocial").value(DEFAULT_RAZON_SOCIAL))
            .andExpect(jsonPath("$.razonComercial").value(DEFAULT_RAZON_COMERCIAL))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
            .andExpect(jsonPath("$.numeroDocumento").value(DEFAULT_NUMERO_DOCUMENTO));
    }


    @Test
    @Transactional
    public void getEmpresasByIdFiltering() throws Exception {
        // Initialize the database
        empresaRepository.saveAndFlush(empresa);

        Long id = empresa.getId();

        defaultEmpresaShouldBeFound("id.equals=" + id);
        defaultEmpresaShouldNotBeFound("id.notEquals=" + id);

        defaultEmpresaShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultEmpresaShouldNotBeFound("id.greaterThan=" + id);

        defaultEmpresaShouldBeFound("id.lessThanOrEqual=" + id);
        defaultEmpresaShouldNotBeFound("id.lessThan=" + id);
    }


    @Test
    @Transactional
    public void getAllEmpresasByRazonSocialIsEqualToSomething() throws Exception {
        // Initialize the database
        empresaRepository.saveAndFlush(empresa);

        // Get all the empresaList where razonSocial equals to DEFAULT_RAZON_SOCIAL
        defaultEmpresaShouldBeFound("razonSocial.equals=" + DEFAULT_RAZON_SOCIAL);

        // Get all the empresaList where razonSocial equals to UPDATED_RAZON_SOCIAL
        defaultEmpresaShouldNotBeFound("razonSocial.equals=" + UPDATED_RAZON_SOCIAL);
    }

    @Test
    @Transactional
    public void getAllEmpresasByRazonSocialIsNotEqualToSomething() throws Exception {
        // Initialize the database
        empresaRepository.saveAndFlush(empresa);

        // Get all the empresaList where razonSocial not equals to DEFAULT_RAZON_SOCIAL
        defaultEmpresaShouldNotBeFound("razonSocial.notEquals=" + DEFAULT_RAZON_SOCIAL);

        // Get all the empresaList where razonSocial not equals to UPDATED_RAZON_SOCIAL
        defaultEmpresaShouldBeFound("razonSocial.notEquals=" + UPDATED_RAZON_SOCIAL);
    }

    @Test
    @Transactional
    public void getAllEmpresasByRazonSocialIsInShouldWork() throws Exception {
        // Initialize the database
        empresaRepository.saveAndFlush(empresa);

        // Get all the empresaList where razonSocial in DEFAULT_RAZON_SOCIAL or UPDATED_RAZON_SOCIAL
        defaultEmpresaShouldBeFound("razonSocial.in=" + DEFAULT_RAZON_SOCIAL + "," + UPDATED_RAZON_SOCIAL);

        // Get all the empresaList where razonSocial equals to UPDATED_RAZON_SOCIAL
        defaultEmpresaShouldNotBeFound("razonSocial.in=" + UPDATED_RAZON_SOCIAL);
    }

    @Test
    @Transactional
    public void getAllEmpresasByRazonSocialIsNullOrNotNull() throws Exception {
        // Initialize the database
        empresaRepository.saveAndFlush(empresa);

        // Get all the empresaList where razonSocial is not null
        defaultEmpresaShouldBeFound("razonSocial.specified=true");

        // Get all the empresaList where razonSocial is null
        defaultEmpresaShouldNotBeFound("razonSocial.specified=false");
    }
                @Test
    @Transactional
    public void getAllEmpresasByRazonSocialContainsSomething() throws Exception {
        // Initialize the database
        empresaRepository.saveAndFlush(empresa);

        // Get all the empresaList where razonSocial contains DEFAULT_RAZON_SOCIAL
        defaultEmpresaShouldBeFound("razonSocial.contains=" + DEFAULT_RAZON_SOCIAL);

        // Get all the empresaList where razonSocial contains UPDATED_RAZON_SOCIAL
        defaultEmpresaShouldNotBeFound("razonSocial.contains=" + UPDATED_RAZON_SOCIAL);
    }

    @Test
    @Transactional
    public void getAllEmpresasByRazonSocialNotContainsSomething() throws Exception {
        // Initialize the database
        empresaRepository.saveAndFlush(empresa);

        // Get all the empresaList where razonSocial does not contain DEFAULT_RAZON_SOCIAL
        defaultEmpresaShouldNotBeFound("razonSocial.doesNotContain=" + DEFAULT_RAZON_SOCIAL);

        // Get all the empresaList where razonSocial does not contain UPDATED_RAZON_SOCIAL
        defaultEmpresaShouldBeFound("razonSocial.doesNotContain=" + UPDATED_RAZON_SOCIAL);
    }


    @Test
    @Transactional
    public void getAllEmpresasByRazonComercialIsEqualToSomething() throws Exception {
        // Initialize the database
        empresaRepository.saveAndFlush(empresa);

        // Get all the empresaList where razonComercial equals to DEFAULT_RAZON_COMERCIAL
        defaultEmpresaShouldBeFound("razonComercial.equals=" + DEFAULT_RAZON_COMERCIAL);

        // Get all the empresaList where razonComercial equals to UPDATED_RAZON_COMERCIAL
        defaultEmpresaShouldNotBeFound("razonComercial.equals=" + UPDATED_RAZON_COMERCIAL);
    }

    @Test
    @Transactional
    public void getAllEmpresasByRazonComercialIsNotEqualToSomething() throws Exception {
        // Initialize the database
        empresaRepository.saveAndFlush(empresa);

        // Get all the empresaList where razonComercial not equals to DEFAULT_RAZON_COMERCIAL
        defaultEmpresaShouldNotBeFound("razonComercial.notEquals=" + DEFAULT_RAZON_COMERCIAL);

        // Get all the empresaList where razonComercial not equals to UPDATED_RAZON_COMERCIAL
        defaultEmpresaShouldBeFound("razonComercial.notEquals=" + UPDATED_RAZON_COMERCIAL);
    }

    @Test
    @Transactional
    public void getAllEmpresasByRazonComercialIsInShouldWork() throws Exception {
        // Initialize the database
        empresaRepository.saveAndFlush(empresa);

        // Get all the empresaList where razonComercial in DEFAULT_RAZON_COMERCIAL or UPDATED_RAZON_COMERCIAL
        defaultEmpresaShouldBeFound("razonComercial.in=" + DEFAULT_RAZON_COMERCIAL + "," + UPDATED_RAZON_COMERCIAL);

        // Get all the empresaList where razonComercial equals to UPDATED_RAZON_COMERCIAL
        defaultEmpresaShouldNotBeFound("razonComercial.in=" + UPDATED_RAZON_COMERCIAL);
    }

    @Test
    @Transactional
    public void getAllEmpresasByRazonComercialIsNullOrNotNull() throws Exception {
        // Initialize the database
        empresaRepository.saveAndFlush(empresa);

        // Get all the empresaList where razonComercial is not null
        defaultEmpresaShouldBeFound("razonComercial.specified=true");

        // Get all the empresaList where razonComercial is null
        defaultEmpresaShouldNotBeFound("razonComercial.specified=false");
    }
                @Test
    @Transactional
    public void getAllEmpresasByRazonComercialContainsSomething() throws Exception {
        // Initialize the database
        empresaRepository.saveAndFlush(empresa);

        // Get all the empresaList where razonComercial contains DEFAULT_RAZON_COMERCIAL
        defaultEmpresaShouldBeFound("razonComercial.contains=" + DEFAULT_RAZON_COMERCIAL);

        // Get all the empresaList where razonComercial contains UPDATED_RAZON_COMERCIAL
        defaultEmpresaShouldNotBeFound("razonComercial.contains=" + UPDATED_RAZON_COMERCIAL);
    }

    @Test
    @Transactional
    public void getAllEmpresasByRazonComercialNotContainsSomething() throws Exception {
        // Initialize the database
        empresaRepository.saveAndFlush(empresa);

        // Get all the empresaList where razonComercial does not contain DEFAULT_RAZON_COMERCIAL
        defaultEmpresaShouldNotBeFound("razonComercial.doesNotContain=" + DEFAULT_RAZON_COMERCIAL);

        // Get all the empresaList where razonComercial does not contain UPDATED_RAZON_COMERCIAL
        defaultEmpresaShouldBeFound("razonComercial.doesNotContain=" + UPDATED_RAZON_COMERCIAL);
    }


    @Test
    @Transactional
    public void getAllEmpresasByEmailIsEqualToSomething() throws Exception {
        // Initialize the database
        empresaRepository.saveAndFlush(empresa);

        // Get all the empresaList where email equals to DEFAULT_EMAIL
        defaultEmpresaShouldBeFound("email.equals=" + DEFAULT_EMAIL);

        // Get all the empresaList where email equals to UPDATED_EMAIL
        defaultEmpresaShouldNotBeFound("email.equals=" + UPDATED_EMAIL);
    }

    @Test
    @Transactional
    public void getAllEmpresasByEmailIsNotEqualToSomething() throws Exception {
        // Initialize the database
        empresaRepository.saveAndFlush(empresa);

        // Get all the empresaList where email not equals to DEFAULT_EMAIL
        defaultEmpresaShouldNotBeFound("email.notEquals=" + DEFAULT_EMAIL);

        // Get all the empresaList where email not equals to UPDATED_EMAIL
        defaultEmpresaShouldBeFound("email.notEquals=" + UPDATED_EMAIL);
    }

    @Test
    @Transactional
    public void getAllEmpresasByEmailIsInShouldWork() throws Exception {
        // Initialize the database
        empresaRepository.saveAndFlush(empresa);

        // Get all the empresaList where email in DEFAULT_EMAIL or UPDATED_EMAIL
        defaultEmpresaShouldBeFound("email.in=" + DEFAULT_EMAIL + "," + UPDATED_EMAIL);

        // Get all the empresaList where email equals to UPDATED_EMAIL
        defaultEmpresaShouldNotBeFound("email.in=" + UPDATED_EMAIL);
    }

    @Test
    @Transactional
    public void getAllEmpresasByEmailIsNullOrNotNull() throws Exception {
        // Initialize the database
        empresaRepository.saveAndFlush(empresa);

        // Get all the empresaList where email is not null
        defaultEmpresaShouldBeFound("email.specified=true");

        // Get all the empresaList where email is null
        defaultEmpresaShouldNotBeFound("email.specified=false");
    }
                @Test
    @Transactional
    public void getAllEmpresasByEmailContainsSomething() throws Exception {
        // Initialize the database
        empresaRepository.saveAndFlush(empresa);

        // Get all the empresaList where email contains DEFAULT_EMAIL
        defaultEmpresaShouldBeFound("email.contains=" + DEFAULT_EMAIL);

        // Get all the empresaList where email contains UPDATED_EMAIL
        defaultEmpresaShouldNotBeFound("email.contains=" + UPDATED_EMAIL);
    }

    @Test
    @Transactional
    public void getAllEmpresasByEmailNotContainsSomething() throws Exception {
        // Initialize the database
        empresaRepository.saveAndFlush(empresa);

        // Get all the empresaList where email does not contain DEFAULT_EMAIL
        defaultEmpresaShouldNotBeFound("email.doesNotContain=" + DEFAULT_EMAIL);

        // Get all the empresaList where email does not contain UPDATED_EMAIL
        defaultEmpresaShouldBeFound("email.doesNotContain=" + UPDATED_EMAIL);
    }


    @Test
    @Transactional
    public void getAllEmpresasByNumeroDocumentoIsEqualToSomething() throws Exception {
        // Initialize the database
        empresaRepository.saveAndFlush(empresa);

        // Get all the empresaList where numeroDocumento equals to DEFAULT_NUMERO_DOCUMENTO
        defaultEmpresaShouldBeFound("numeroDocumento.equals=" + DEFAULT_NUMERO_DOCUMENTO);

        // Get all the empresaList where numeroDocumento equals to UPDATED_NUMERO_DOCUMENTO
        defaultEmpresaShouldNotBeFound("numeroDocumento.equals=" + UPDATED_NUMERO_DOCUMENTO);
    }

    @Test
    @Transactional
    public void getAllEmpresasByNumeroDocumentoIsNotEqualToSomething() throws Exception {
        // Initialize the database
        empresaRepository.saveAndFlush(empresa);

        // Get all the empresaList where numeroDocumento not equals to DEFAULT_NUMERO_DOCUMENTO
        defaultEmpresaShouldNotBeFound("numeroDocumento.notEquals=" + DEFAULT_NUMERO_DOCUMENTO);

        // Get all the empresaList where numeroDocumento not equals to UPDATED_NUMERO_DOCUMENTO
        defaultEmpresaShouldBeFound("numeroDocumento.notEquals=" + UPDATED_NUMERO_DOCUMENTO);
    }

    @Test
    @Transactional
    public void getAllEmpresasByNumeroDocumentoIsInShouldWork() throws Exception {
        // Initialize the database
        empresaRepository.saveAndFlush(empresa);

        // Get all the empresaList where numeroDocumento in DEFAULT_NUMERO_DOCUMENTO or UPDATED_NUMERO_DOCUMENTO
        defaultEmpresaShouldBeFound("numeroDocumento.in=" + DEFAULT_NUMERO_DOCUMENTO + "," + UPDATED_NUMERO_DOCUMENTO);

        // Get all the empresaList where numeroDocumento equals to UPDATED_NUMERO_DOCUMENTO
        defaultEmpresaShouldNotBeFound("numeroDocumento.in=" + UPDATED_NUMERO_DOCUMENTO);
    }

    @Test
    @Transactional
    public void getAllEmpresasByNumeroDocumentoIsNullOrNotNull() throws Exception {
        // Initialize the database
        empresaRepository.saveAndFlush(empresa);

        // Get all the empresaList where numeroDocumento is not null
        defaultEmpresaShouldBeFound("numeroDocumento.specified=true");

        // Get all the empresaList where numeroDocumento is null
        defaultEmpresaShouldNotBeFound("numeroDocumento.specified=false");
    }
                @Test
    @Transactional
    public void getAllEmpresasByNumeroDocumentoContainsSomething() throws Exception {
        // Initialize the database
        empresaRepository.saveAndFlush(empresa);

        // Get all the empresaList where numeroDocumento contains DEFAULT_NUMERO_DOCUMENTO
        defaultEmpresaShouldBeFound("numeroDocumento.contains=" + DEFAULT_NUMERO_DOCUMENTO);

        // Get all the empresaList where numeroDocumento contains UPDATED_NUMERO_DOCUMENTO
        defaultEmpresaShouldNotBeFound("numeroDocumento.contains=" + UPDATED_NUMERO_DOCUMENTO);
    }

    @Test
    @Transactional
    public void getAllEmpresasByNumeroDocumentoNotContainsSomething() throws Exception {
        // Initialize the database
        empresaRepository.saveAndFlush(empresa);

        // Get all the empresaList where numeroDocumento does not contain DEFAULT_NUMERO_DOCUMENTO
        defaultEmpresaShouldNotBeFound("numeroDocumento.doesNotContain=" + DEFAULT_NUMERO_DOCUMENTO);

        // Get all the empresaList where numeroDocumento does not contain UPDATED_NUMERO_DOCUMENTO
        defaultEmpresaShouldBeFound("numeroDocumento.doesNotContain=" + UPDATED_NUMERO_DOCUMENTO);
    }


    @Test
    @Transactional
    public void getAllEmpresasByTipoUsuarioIsEqualToSomething() throws Exception {
        // Get already existing entity
        TipoUsuario tipoUsuario = empresa.getTipoUsuario();
        empresaRepository.saveAndFlush(empresa);
        Long tipoUsuarioId = tipoUsuario.getId();

        // Get all the empresaList where tipoUsuario equals to tipoUsuarioId
        defaultEmpresaShouldBeFound("tipoUsuarioId.equals=" + tipoUsuarioId);

        // Get all the empresaList where tipoUsuario equals to tipoUsuarioId + 1
        defaultEmpresaShouldNotBeFound("tipoUsuarioId.equals=" + (tipoUsuarioId + 1));
    }


    @Test
    @Transactional
    public void getAllEmpresasByTipoDocumentoIsEqualToSomething() throws Exception {
        // Get already existing entity
        TipoDocumento tipoDocumento = empresa.getTipoDocumento();
        empresaRepository.saveAndFlush(empresa);
        Long tipoDocumentoId = tipoDocumento.getId();

        // Get all the empresaList where tipoDocumento equals to tipoDocumentoId
        defaultEmpresaShouldBeFound("tipoDocumentoId.equals=" + tipoDocumentoId);

        // Get all the empresaList where tipoDocumento equals to tipoDocumentoId + 1
        defaultEmpresaShouldNotBeFound("tipoDocumentoId.equals=" + (tipoDocumentoId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultEmpresaShouldBeFound(String filter) throws Exception {
        restEmpresaMockMvc.perform(get("/api/empresas?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(empresa.getId().intValue())))
            .andExpect(jsonPath("$.[*].razonSocial").value(hasItem(DEFAULT_RAZON_SOCIAL)))
            .andExpect(jsonPath("$.[*].razonComercial").value(hasItem(DEFAULT_RAZON_COMERCIAL)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].numeroDocumento").value(hasItem(DEFAULT_NUMERO_DOCUMENTO)));

        // Check, that the count call also returns 1
        restEmpresaMockMvc.perform(get("/api/empresas/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultEmpresaShouldNotBeFound(String filter) throws Exception {
        restEmpresaMockMvc.perform(get("/api/empresas?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restEmpresaMockMvc.perform(get("/api/empresas/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingEmpresa() throws Exception {
        // Get the empresa
        restEmpresaMockMvc.perform(get("/api/empresas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmpresa() throws Exception {
        // Initialize the database
        empresaService.save(empresa);

        int databaseSizeBeforeUpdate = empresaRepository.findAll().size();

        // Update the empresa
        Empresa updatedEmpresa = empresaRepository.findById(empresa.getId()).get();
        // Disconnect from session so that the updates on updatedEmpresa are not directly saved in db
        em.detach(updatedEmpresa);
        updatedEmpresa
            .razonSocial(UPDATED_RAZON_SOCIAL)
            .razonComercial(UPDATED_RAZON_COMERCIAL)
            .email(UPDATED_EMAIL)
            .numeroDocumento(UPDATED_NUMERO_DOCUMENTO);

        restEmpresaMockMvc.perform(put("/api/empresas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedEmpresa)))
            .andExpect(status().isOk());

        // Validate the Empresa in the database
        List<Empresa> empresaList = empresaRepository.findAll();
        assertThat(empresaList).hasSize(databaseSizeBeforeUpdate);
        Empresa testEmpresa = empresaList.get(empresaList.size() - 1);
        assertThat(testEmpresa.getRazonSocial()).isEqualTo(UPDATED_RAZON_SOCIAL);
        assertThat(testEmpresa.getRazonComercial()).isEqualTo(UPDATED_RAZON_COMERCIAL);
        assertThat(testEmpresa.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testEmpresa.getNumeroDocumento()).isEqualTo(UPDATED_NUMERO_DOCUMENTO);
    }

    @Test
    @Transactional
    public void updateNonExistingEmpresa() throws Exception {
        int databaseSizeBeforeUpdate = empresaRepository.findAll().size();

        // Create the Empresa

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEmpresaMockMvc.perform(put("/api/empresas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(empresa)))
            .andExpect(status().isBadRequest());

        // Validate the Empresa in the database
        List<Empresa> empresaList = empresaRepository.findAll();
        assertThat(empresaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEmpresa() throws Exception {
        // Initialize the database
        empresaService.save(empresa);

        int databaseSizeBeforeDelete = empresaRepository.findAll().size();

        // Delete the empresa
        restEmpresaMockMvc.perform(delete("/api/empresas/{id}", empresa.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Empresa> empresaList = empresaRepository.findAll();
        assertThat(empresaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
