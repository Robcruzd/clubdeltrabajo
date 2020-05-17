package com.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.web.rest.TestUtil;

public class InformacionAcademicaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(InformacionAcademica.class);
        InformacionAcademica informacionAcademica1 = new InformacionAcademica();
        informacionAcademica1.setId(1L);
        InformacionAcademica informacionAcademica2 = new InformacionAcademica();
        informacionAcademica2.setId(informacionAcademica1.getId());
        assertThat(informacionAcademica1).isEqualTo(informacionAcademica2);
        informacionAcademica2.setId(2L);
        assertThat(informacionAcademica1).isNotEqualTo(informacionAcademica2);
        informacionAcademica1.setId(null);
        assertThat(informacionAcademica1).isNotEqualTo(informacionAcademica2);
    }
}
