package com.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.web.rest.TestUtil;

public class PersonaIdiomaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PersonaIdioma.class);
        PersonaIdioma personaIdioma1 = new PersonaIdioma();
        personaIdioma1.setId(1L);
        PersonaIdioma personaIdioma2 = new PersonaIdioma();
        personaIdioma2.setId(personaIdioma1.getId());
        assertThat(personaIdioma1).isEqualTo(personaIdioma2);
        personaIdioma2.setId(2L);
        assertThat(personaIdioma1).isNotEqualTo(personaIdioma2);
        personaIdioma1.setId(null);
        assertThat(personaIdioma1).isNotEqualTo(personaIdioma2);
    }
}
