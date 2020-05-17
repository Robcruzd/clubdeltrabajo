package com.web.rest;

import com.CtProjectApp;
import com.domain.Usuario;
import com.repository.UsuarioRepository;
import com.service.UsuarioService;
import com.service.dto.UsuarioCriteria;
import com.service.UsuarioQueryService;

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
 * Integration tests for the {@link UsuarioResource} REST controller.
 */
@SpringBootTest(classes = CtProjectApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class UsuarioResourceIT {

    private static final Integer DEFAULT_USUARIO = 1;
    private static final Integer UPDATED_USUARIO = 2;
    private static final Integer SMALLER_USUARIO = 1 - 1;

    private static final String DEFAULT_CLAVE = "AAAAAAAAAA";
    private static final String UPDATED_CLAVE = "BBBBBBBBBB";

    private static final String DEFAULT_ESTADO = "AAAAAAAAAA";
    private static final String UPDATED_ESTADO = "BBBBBBBBBB";

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private UsuarioQueryService usuarioQueryService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restUsuarioMockMvc;

    private Usuario usuario;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Usuario createEntity(EntityManager em) {
        Usuario usuario = new Usuario()
            .usuario(DEFAULT_USUARIO)
            .clave(DEFAULT_CLAVE)
            .estado(DEFAULT_ESTADO);
        return usuario;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Usuario createUpdatedEntity(EntityManager em) {
        Usuario usuario = new Usuario()
            .usuario(UPDATED_USUARIO)
            .clave(UPDATED_CLAVE)
            .estado(UPDATED_ESTADO);
        return usuario;
    }

    @BeforeEach
    public void initTest() {
        usuario = createEntity(em);
    }

    @Test
    @Transactional
    public void createUsuario() throws Exception {
        int databaseSizeBeforeCreate = usuarioRepository.findAll().size();

        // Create the Usuario
        restUsuarioMockMvc.perform(post("/api/usuarios")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(usuario)))
            .andExpect(status().isCreated());

        // Validate the Usuario in the database
        List<Usuario> usuarioList = usuarioRepository.findAll();
        assertThat(usuarioList).hasSize(databaseSizeBeforeCreate + 1);
        Usuario testUsuario = usuarioList.get(usuarioList.size() - 1);
        assertThat(testUsuario.getUsuario()).isEqualTo(DEFAULT_USUARIO);
        assertThat(testUsuario.getClave()).isEqualTo(DEFAULT_CLAVE);
        assertThat(testUsuario.getEstado()).isEqualTo(DEFAULT_ESTADO);
    }

    @Test
    @Transactional
    public void createUsuarioWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = usuarioRepository.findAll().size();

        // Create the Usuario with an existing ID
        usuario.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUsuarioMockMvc.perform(post("/api/usuarios")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(usuario)))
            .andExpect(status().isBadRequest());

        // Validate the Usuario in the database
        List<Usuario> usuarioList = usuarioRepository.findAll();
        assertThat(usuarioList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkUsuarioIsRequired() throws Exception {
        int databaseSizeBeforeTest = usuarioRepository.findAll().size();
        // set the field null
        usuario.setUsuario(null);

        // Create the Usuario, which fails.

        restUsuarioMockMvc.perform(post("/api/usuarios")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(usuario)))
            .andExpect(status().isBadRequest());

        List<Usuario> usuarioList = usuarioRepository.findAll();
        assertThat(usuarioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkClaveIsRequired() throws Exception {
        int databaseSizeBeforeTest = usuarioRepository.findAll().size();
        // set the field null
        usuario.setClave(null);

        // Create the Usuario, which fails.

        restUsuarioMockMvc.perform(post("/api/usuarios")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(usuario)))
            .andExpect(status().isBadRequest());

        List<Usuario> usuarioList = usuarioRepository.findAll();
        assertThat(usuarioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEstadoIsRequired() throws Exception {
        int databaseSizeBeforeTest = usuarioRepository.findAll().size();
        // set the field null
        usuario.setEstado(null);

        // Create the Usuario, which fails.

        restUsuarioMockMvc.perform(post("/api/usuarios")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(usuario)))
            .andExpect(status().isBadRequest());

        List<Usuario> usuarioList = usuarioRepository.findAll();
        assertThat(usuarioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllUsuarios() throws Exception {
        // Initialize the database
        usuarioRepository.saveAndFlush(usuario);

        // Get all the usuarioList
        restUsuarioMockMvc.perform(get("/api/usuarios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(usuario.getId().intValue())))
            .andExpect(jsonPath("$.[*].usuario").value(hasItem(DEFAULT_USUARIO)))
            .andExpect(jsonPath("$.[*].clave").value(hasItem(DEFAULT_CLAVE)))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO)));
    }
    
    @Test
    @Transactional
    public void getUsuario() throws Exception {
        // Initialize the database
        usuarioRepository.saveAndFlush(usuario);

        // Get the usuario
        restUsuarioMockMvc.perform(get("/api/usuarios/{id}", usuario.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(usuario.getId().intValue()))
            .andExpect(jsonPath("$.usuario").value(DEFAULT_USUARIO))
            .andExpect(jsonPath("$.clave").value(DEFAULT_CLAVE))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO));
    }


    @Test
    @Transactional
    public void getUsuariosByIdFiltering() throws Exception {
        // Initialize the database
        usuarioRepository.saveAndFlush(usuario);

        Long id = usuario.getId();

        defaultUsuarioShouldBeFound("id.equals=" + id);
        defaultUsuarioShouldNotBeFound("id.notEquals=" + id);

        defaultUsuarioShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultUsuarioShouldNotBeFound("id.greaterThan=" + id);

        defaultUsuarioShouldBeFound("id.lessThanOrEqual=" + id);
        defaultUsuarioShouldNotBeFound("id.lessThan=" + id);
    }


    @Test
    @Transactional
    public void getAllUsuariosByUsuarioIsEqualToSomething() throws Exception {
        // Initialize the database
        usuarioRepository.saveAndFlush(usuario);

        // Get all the usuarioList where usuario equals to DEFAULT_USUARIO
        defaultUsuarioShouldBeFound("usuario.equals=" + DEFAULT_USUARIO);

        // Get all the usuarioList where usuario equals to UPDATED_USUARIO
        defaultUsuarioShouldNotBeFound("usuario.equals=" + UPDATED_USUARIO);
    }

    @Test
    @Transactional
    public void getAllUsuariosByUsuarioIsNotEqualToSomething() throws Exception {
        // Initialize the database
        usuarioRepository.saveAndFlush(usuario);

        // Get all the usuarioList where usuario not equals to DEFAULT_USUARIO
        defaultUsuarioShouldNotBeFound("usuario.notEquals=" + DEFAULT_USUARIO);

        // Get all the usuarioList where usuario not equals to UPDATED_USUARIO
        defaultUsuarioShouldBeFound("usuario.notEquals=" + UPDATED_USUARIO);
    }

    @Test
    @Transactional
    public void getAllUsuariosByUsuarioIsInShouldWork() throws Exception {
        // Initialize the database
        usuarioRepository.saveAndFlush(usuario);

        // Get all the usuarioList where usuario in DEFAULT_USUARIO or UPDATED_USUARIO
        defaultUsuarioShouldBeFound("usuario.in=" + DEFAULT_USUARIO + "," + UPDATED_USUARIO);

        // Get all the usuarioList where usuario equals to UPDATED_USUARIO
        defaultUsuarioShouldNotBeFound("usuario.in=" + UPDATED_USUARIO);
    }

    @Test
    @Transactional
    public void getAllUsuariosByUsuarioIsNullOrNotNull() throws Exception {
        // Initialize the database
        usuarioRepository.saveAndFlush(usuario);

        // Get all the usuarioList where usuario is not null
        defaultUsuarioShouldBeFound("usuario.specified=true");

        // Get all the usuarioList where usuario is null
        defaultUsuarioShouldNotBeFound("usuario.specified=false");
    }

    @Test
    @Transactional
    public void getAllUsuariosByUsuarioIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        usuarioRepository.saveAndFlush(usuario);

        // Get all the usuarioList where usuario is greater than or equal to DEFAULT_USUARIO
        defaultUsuarioShouldBeFound("usuario.greaterThanOrEqual=" + DEFAULT_USUARIO);

        // Get all the usuarioList where usuario is greater than or equal to UPDATED_USUARIO
        defaultUsuarioShouldNotBeFound("usuario.greaterThanOrEqual=" + UPDATED_USUARIO);
    }

    @Test
    @Transactional
    public void getAllUsuariosByUsuarioIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        usuarioRepository.saveAndFlush(usuario);

        // Get all the usuarioList where usuario is less than or equal to DEFAULT_USUARIO
        defaultUsuarioShouldBeFound("usuario.lessThanOrEqual=" + DEFAULT_USUARIO);

        // Get all the usuarioList where usuario is less than or equal to SMALLER_USUARIO
        defaultUsuarioShouldNotBeFound("usuario.lessThanOrEqual=" + SMALLER_USUARIO);
    }

    @Test
    @Transactional
    public void getAllUsuariosByUsuarioIsLessThanSomething() throws Exception {
        // Initialize the database
        usuarioRepository.saveAndFlush(usuario);

        // Get all the usuarioList where usuario is less than DEFAULT_USUARIO
        defaultUsuarioShouldNotBeFound("usuario.lessThan=" + DEFAULT_USUARIO);

        // Get all the usuarioList where usuario is less than UPDATED_USUARIO
        defaultUsuarioShouldBeFound("usuario.lessThan=" + UPDATED_USUARIO);
    }

    @Test
    @Transactional
    public void getAllUsuariosByUsuarioIsGreaterThanSomething() throws Exception {
        // Initialize the database
        usuarioRepository.saveAndFlush(usuario);

        // Get all the usuarioList where usuario is greater than DEFAULT_USUARIO
        defaultUsuarioShouldNotBeFound("usuario.greaterThan=" + DEFAULT_USUARIO);

        // Get all the usuarioList where usuario is greater than SMALLER_USUARIO
        defaultUsuarioShouldBeFound("usuario.greaterThan=" + SMALLER_USUARIO);
    }


    @Test
    @Transactional
    public void getAllUsuariosByClaveIsEqualToSomething() throws Exception {
        // Initialize the database
        usuarioRepository.saveAndFlush(usuario);

        // Get all the usuarioList where clave equals to DEFAULT_CLAVE
        defaultUsuarioShouldBeFound("clave.equals=" + DEFAULT_CLAVE);

        // Get all the usuarioList where clave equals to UPDATED_CLAVE
        defaultUsuarioShouldNotBeFound("clave.equals=" + UPDATED_CLAVE);
    }

    @Test
    @Transactional
    public void getAllUsuariosByClaveIsNotEqualToSomething() throws Exception {
        // Initialize the database
        usuarioRepository.saveAndFlush(usuario);

        // Get all the usuarioList where clave not equals to DEFAULT_CLAVE
        defaultUsuarioShouldNotBeFound("clave.notEquals=" + DEFAULT_CLAVE);

        // Get all the usuarioList where clave not equals to UPDATED_CLAVE
        defaultUsuarioShouldBeFound("clave.notEquals=" + UPDATED_CLAVE);
    }

    @Test
    @Transactional
    public void getAllUsuariosByClaveIsInShouldWork() throws Exception {
        // Initialize the database
        usuarioRepository.saveAndFlush(usuario);

        // Get all the usuarioList where clave in DEFAULT_CLAVE or UPDATED_CLAVE
        defaultUsuarioShouldBeFound("clave.in=" + DEFAULT_CLAVE + "," + UPDATED_CLAVE);

        // Get all the usuarioList where clave equals to UPDATED_CLAVE
        defaultUsuarioShouldNotBeFound("clave.in=" + UPDATED_CLAVE);
    }

    @Test
    @Transactional
    public void getAllUsuariosByClaveIsNullOrNotNull() throws Exception {
        // Initialize the database
        usuarioRepository.saveAndFlush(usuario);

        // Get all the usuarioList where clave is not null
        defaultUsuarioShouldBeFound("clave.specified=true");

        // Get all the usuarioList where clave is null
        defaultUsuarioShouldNotBeFound("clave.specified=false");
    }
                @Test
    @Transactional
    public void getAllUsuariosByClaveContainsSomething() throws Exception {
        // Initialize the database
        usuarioRepository.saveAndFlush(usuario);

        // Get all the usuarioList where clave contains DEFAULT_CLAVE
        defaultUsuarioShouldBeFound("clave.contains=" + DEFAULT_CLAVE);

        // Get all the usuarioList where clave contains UPDATED_CLAVE
        defaultUsuarioShouldNotBeFound("clave.contains=" + UPDATED_CLAVE);
    }

    @Test
    @Transactional
    public void getAllUsuariosByClaveNotContainsSomething() throws Exception {
        // Initialize the database
        usuarioRepository.saveAndFlush(usuario);

        // Get all the usuarioList where clave does not contain DEFAULT_CLAVE
        defaultUsuarioShouldNotBeFound("clave.doesNotContain=" + DEFAULT_CLAVE);

        // Get all the usuarioList where clave does not contain UPDATED_CLAVE
        defaultUsuarioShouldBeFound("clave.doesNotContain=" + UPDATED_CLAVE);
    }


    @Test
    @Transactional
    public void getAllUsuariosByEstadoIsEqualToSomething() throws Exception {
        // Initialize the database
        usuarioRepository.saveAndFlush(usuario);

        // Get all the usuarioList where estado equals to DEFAULT_ESTADO
        defaultUsuarioShouldBeFound("estado.equals=" + DEFAULT_ESTADO);

        // Get all the usuarioList where estado equals to UPDATED_ESTADO
        defaultUsuarioShouldNotBeFound("estado.equals=" + UPDATED_ESTADO);
    }

    @Test
    @Transactional
    public void getAllUsuariosByEstadoIsNotEqualToSomething() throws Exception {
        // Initialize the database
        usuarioRepository.saveAndFlush(usuario);

        // Get all the usuarioList where estado not equals to DEFAULT_ESTADO
        defaultUsuarioShouldNotBeFound("estado.notEquals=" + DEFAULT_ESTADO);

        // Get all the usuarioList where estado not equals to UPDATED_ESTADO
        defaultUsuarioShouldBeFound("estado.notEquals=" + UPDATED_ESTADO);
    }

    @Test
    @Transactional
    public void getAllUsuariosByEstadoIsInShouldWork() throws Exception {
        // Initialize the database
        usuarioRepository.saveAndFlush(usuario);

        // Get all the usuarioList where estado in DEFAULT_ESTADO or UPDATED_ESTADO
        defaultUsuarioShouldBeFound("estado.in=" + DEFAULT_ESTADO + "," + UPDATED_ESTADO);

        // Get all the usuarioList where estado equals to UPDATED_ESTADO
        defaultUsuarioShouldNotBeFound("estado.in=" + UPDATED_ESTADO);
    }

    @Test
    @Transactional
    public void getAllUsuariosByEstadoIsNullOrNotNull() throws Exception {
        // Initialize the database
        usuarioRepository.saveAndFlush(usuario);

        // Get all the usuarioList where estado is not null
        defaultUsuarioShouldBeFound("estado.specified=true");

        // Get all the usuarioList where estado is null
        defaultUsuarioShouldNotBeFound("estado.specified=false");
    }
                @Test
    @Transactional
    public void getAllUsuariosByEstadoContainsSomething() throws Exception {
        // Initialize the database
        usuarioRepository.saveAndFlush(usuario);

        // Get all the usuarioList where estado contains DEFAULT_ESTADO
        defaultUsuarioShouldBeFound("estado.contains=" + DEFAULT_ESTADO);

        // Get all the usuarioList where estado contains UPDATED_ESTADO
        defaultUsuarioShouldNotBeFound("estado.contains=" + UPDATED_ESTADO);
    }

    @Test
    @Transactional
    public void getAllUsuariosByEstadoNotContainsSomething() throws Exception {
        // Initialize the database
        usuarioRepository.saveAndFlush(usuario);

        // Get all the usuarioList where estado does not contain DEFAULT_ESTADO
        defaultUsuarioShouldNotBeFound("estado.doesNotContain=" + DEFAULT_ESTADO);

        // Get all the usuarioList where estado does not contain UPDATED_ESTADO
        defaultUsuarioShouldBeFound("estado.doesNotContain=" + UPDATED_ESTADO);
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultUsuarioShouldBeFound(String filter) throws Exception {
        restUsuarioMockMvc.perform(get("/api/usuarios?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(usuario.getId().intValue())))
            .andExpect(jsonPath("$.[*].usuario").value(hasItem(DEFAULT_USUARIO)))
            .andExpect(jsonPath("$.[*].clave").value(hasItem(DEFAULT_CLAVE)))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO)));

        // Check, that the count call also returns 1
        restUsuarioMockMvc.perform(get("/api/usuarios/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultUsuarioShouldNotBeFound(String filter) throws Exception {
        restUsuarioMockMvc.perform(get("/api/usuarios?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restUsuarioMockMvc.perform(get("/api/usuarios/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingUsuario() throws Exception {
        // Get the usuario
        restUsuarioMockMvc.perform(get("/api/usuarios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUsuario() throws Exception {
        // Initialize the database
        usuarioService.save(usuario);

        int databaseSizeBeforeUpdate = usuarioRepository.findAll().size();

        // Update the usuario
        Usuario updatedUsuario = usuarioRepository.findById(usuario.getId()).get();
        // Disconnect from session so that the updates on updatedUsuario are not directly saved in db
        em.detach(updatedUsuario);
        updatedUsuario
            .usuario(UPDATED_USUARIO)
            .clave(UPDATED_CLAVE)
            .estado(UPDATED_ESTADO);

        restUsuarioMockMvc.perform(put("/api/usuarios")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedUsuario)))
            .andExpect(status().isOk());

        // Validate the Usuario in the database
        List<Usuario> usuarioList = usuarioRepository.findAll();
        assertThat(usuarioList).hasSize(databaseSizeBeforeUpdate);
        Usuario testUsuario = usuarioList.get(usuarioList.size() - 1);
        assertThat(testUsuario.getUsuario()).isEqualTo(UPDATED_USUARIO);
        assertThat(testUsuario.getClave()).isEqualTo(UPDATED_CLAVE);
        assertThat(testUsuario.getEstado()).isEqualTo(UPDATED_ESTADO);
    }

    @Test
    @Transactional
    public void updateNonExistingUsuario() throws Exception {
        int databaseSizeBeforeUpdate = usuarioRepository.findAll().size();

        // Create the Usuario

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUsuarioMockMvc.perform(put("/api/usuarios")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(usuario)))
            .andExpect(status().isBadRequest());

        // Validate the Usuario in the database
        List<Usuario> usuarioList = usuarioRepository.findAll();
        assertThat(usuarioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUsuario() throws Exception {
        // Initialize the database
        usuarioService.save(usuario);

        int databaseSizeBeforeDelete = usuarioRepository.findAll().size();

        // Delete the usuario
        restUsuarioMockMvc.perform(delete("/api/usuarios/{id}", usuario.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Usuario> usuarioList = usuarioRepository.findAll();
        assertThat(usuarioList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
