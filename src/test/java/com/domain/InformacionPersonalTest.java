package com.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.web.rest.TestUtil;

public class InformacionPersonalTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(InformacionPersonal.class);
        InformacionPersonal informacionPersonal1 = new InformacionPersonal();
        informacionPersonal1.setId(1L);
        InformacionPersonal informacionPersonal2 = new InformacionPersonal();
        informacionPersonal2.setId(informacionPersonal1.getId());
        assertThat(informacionPersonal1).isEqualTo(informacionPersonal2);
        informacionPersonal2.setId(2L);
        assertThat(informacionPersonal1).isNotEqualTo(informacionPersonal2);
        informacionPersonal1.setId(null);
        assertThat(informacionPersonal1).isNotEqualTo(informacionPersonal2);
    }
}
