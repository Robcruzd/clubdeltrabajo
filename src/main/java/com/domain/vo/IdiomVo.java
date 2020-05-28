package com.domain.vo;

import java.io.Serializable;

import com.domain.Idioma;
import com.domain.NivelIdioma;

public class IdiomVo implements Serializable {

    private static final long serialVersionUID = 1L;

    private Idioma idioma;
    private NivelIdioma nivel;

    public Idioma getIdioma() {
        return idioma;
    }

    public void setIdioma(Idioma idioma) {
        this.idioma = idioma;
    }

    public NivelIdioma getNivel() {
        return nivel;
    }

    public void setNivel(NivelIdioma nivel) {
        this.nivel = nivel;
    }

}