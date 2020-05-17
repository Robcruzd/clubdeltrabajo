package com.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.web.rest.TestUtil;

public class AplicacionOfertaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AplicacionOferta.class);
        AplicacionOferta aplicacionOferta1 = new AplicacionOferta();
        aplicacionOferta1.setId(1L);
        AplicacionOferta aplicacionOferta2 = new AplicacionOferta();
        aplicacionOferta2.setId(aplicacionOferta1.getId());
        assertThat(aplicacionOferta1).isEqualTo(aplicacionOferta2);
        aplicacionOferta2.setId(2L);
        assertThat(aplicacionOferta1).isNotEqualTo(aplicacionOferta2);
        aplicacionOferta1.setId(null);
        assertThat(aplicacionOferta1).isNotEqualTo(aplicacionOferta2);
    }
}
