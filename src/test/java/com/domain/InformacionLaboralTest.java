package com.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.web.rest.TestUtil;

public class InformacionLaboralTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(InformacionLaboral.class);
        InformacionLaboral informacionLaboral1 = new InformacionLaboral();
        informacionLaboral1.setId(1L);
        InformacionLaboral informacionLaboral2 = new InformacionLaboral();
        informacionLaboral2.setId(informacionLaboral1.getId());
        assertThat(informacionLaboral1).isEqualTo(informacionLaboral2);
        informacionLaboral2.setId(2L);
        assertThat(informacionLaboral1).isNotEqualTo(informacionLaboral2);
        informacionLaboral1.setId(null);
        assertThat(informacionLaboral1).isNotEqualTo(informacionLaboral2);
    }
}
