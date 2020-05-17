package com.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.web.rest.TestUtil;

public class InstitucionTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Institucion.class);
        Institucion institucion1 = new Institucion();
        institucion1.setId(1L);
        Institucion institucion2 = new Institucion();
        institucion2.setId(institucion1.getId());
        assertThat(institucion1).isEqualTo(institucion2);
        institucion2.setId(2L);
        assertThat(institucion1).isNotEqualTo(institucion2);
        institucion1.setId(null);
        assertThat(institucion1).isNotEqualTo(institucion2);
    }
}
