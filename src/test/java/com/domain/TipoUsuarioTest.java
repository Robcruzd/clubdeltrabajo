package com.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.web.rest.TestUtil;

public class TipoUsuarioTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoUsuario.class);
        TipoUsuario tipoUsuario1 = new TipoUsuario();
        tipoUsuario1.setId(1L);
        TipoUsuario tipoUsuario2 = new TipoUsuario();
        tipoUsuario2.setId(tipoUsuario1.getId());
        assertThat(tipoUsuario1).isEqualTo(tipoUsuario2);
        tipoUsuario2.setId(2L);
        assertThat(tipoUsuario1).isNotEqualTo(tipoUsuario2);
        tipoUsuario1.setId(null);
        assertThat(tipoUsuario1).isNotEqualTo(tipoUsuario2);
    }
}
