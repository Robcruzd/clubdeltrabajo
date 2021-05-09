package com;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Properties;
import java.util.TimerTask;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import javax.annotation.PostConstruct;

import com.service.PersonaService;

@Component
public class TareaNullDate extends TimerTask {
	

    @Autowired
    private PersonaService personaService;

    public TareaNullDate(
    ) {
    }

    @PostConstruct
    public void run() {
        System.out.println("Probaaaaaaaaaaaaaaaaaaaaaaaando");
        // this.personaService.updateFechaRem();
    }

}
