package com.config;

import com.security.*;
import com.security.jwt.*;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.header.writers.ReferrerPolicyHeaderWriter;
import org.springframework.web.filter.CorsFilter;
import org.zalando.problem.spring.web.advice.security.SecurityProblemSupport;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
@Import(SecurityProblemSupport.class)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    private final TokenProvider tokenProvider;

    private final CorsFilter corsFilter;
    private final SecurityProblemSupport problemSupport;

    public SecurityConfiguration(TokenProvider tokenProvider, CorsFilter corsFilter, SecurityProblemSupport problemSupport) {
        this.tokenProvider = tokenProvider;
        this.corsFilter = corsFilter;
        this.problemSupport = problemSupport;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public void configure(WebSecurity web) {
        web.ignoring()
            .antMatchers(HttpMethod.OPTIONS, "/**")
            .antMatchers("/app/**/*.{js,html}")
            .antMatchers("/i18n/**")
            .antMatchers("/content/**")
            .antMatchers("/swagger-ui/index.html")
            .antMatchers("/test/**");
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        // @formatter:off
        http
            .csrf()
            .disable()
            .addFilterBefore(corsFilter, UsernamePasswordAuthenticationFilter.class)
            .exceptionHandling()
                .authenticationEntryPoint(problemSupport)
                .accessDeniedHandler(problemSupport)
        .and()
            .headers()
            .contentSecurityPolicy("default-src 'self' 'unsafe-inline' https://www.datos.gov.co https://restcountries.eu https://www.clubdeltrabajo.com https://www.google-analytics.com http://cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/alertify.min.css;"+
                "frame-src 'self' https://www.mercadopago.com.co/ https: data:;"+
                "worker-src 'self' https://www.clubdeltrabajo.com;"+
                "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com http://cdn.jsdelivr.net https://storage.googleapis.com https://www.googletagmanager.com https://www.google-analytics.com https://http2.mlstatic.com/storage/event-metrics-sdk/js https://sdk.mercadopago.com/js/v2 https://apis.google.com/js;"+
                "style-src 'self' 'unsafe-inline' http://cdn.jsdelivr.net https://fonts.googleapis.com https://apis.google.com;"+
                "style-src-elem 'self' 'unsafe-inline' http://cdn.jsdelivr.net https://fonts.googleapis.com/css https://fonts.googleapis.com/css2 data:;"+
                "img-src 'self' https://www.google-analytics.com https://d1jbv8ig3bmrxx.cloudfront.net data:;"+
                "font-src 'self' https://fonts.gstatic.com data:;"+
                "media-src 'self' https://d1jbv8ig3bmrxx.cloudfront.net data:;")
        .and()
            .referrerPolicy(ReferrerPolicyHeaderWriter.ReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN)
        .and()
            .featurePolicy("geolocation 'none'; midi 'none'; sync-xhr 'none'; microphone 'none'; camera 'none'; magnetometer 'none'; gyroscope 'none'; speaker 'none'; fullscreen 'self'; payment 'none'")
        .and()
            .frameOptions()
            .deny()
        .and()
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
            .authorizeRequests()
            .antMatchers("/api/empresas/user").permitAll()
            .antMatchers("/api/sector").permitAll()
            .antMatchers("/api/profesions/getByProfesion").permitAll()
            .antMatchers("/api/ofertas/obtenerOfertas").permitAll()
            .antMatchers("/api/ofertas/getOfertasDestacadas").permitAll()
            .antMatchers("/api/authenticate").permitAll()
            .antMatchers("/api/register").permitAll()
            .antMatchers("/api/usuarios/validar-captcha").permitAll()
            .antMatchers("/api/activate").permitAll()
            .antMatchers("/api/account/reset-password/init").permitAll()
            .antMatchers("/api/account/reset-password/finish").permitAll()
            .antMatchers("/api/account/").permitAll()
            .antMatchers("/api/registrar").permitAll()
            .antMatchers("/api/empresas/user").permitAll()
            .antMatchers("/api/tipo-documentos").permitAll()
            .antMatchers("/api/regiones").permitAll()
            .antMatchers("/api/paises").permitAll()
            .antMatchers("/api/profesions").permitAll()
            .antMatchers(HttpMethod.GET, "/api/commonMessages").permitAll()
            .antMatchers("/api/ofertas/**").permitAll()
            .antMatchers("/api/archivos/tipo/5/empPerfil/**").permitAll()
            .antMatchers("/api/hoja-vida/0").permitAll()
            .antMatchers("/api/mercado-pago").permitAll()
            .antMatchers("/api/notiMercadoPago").permitAll()
            .antMatchers("/api/ofertas/filtroOfertas").permitAll()
            .antMatchers("/api/users/countPer").permitAll()
            .antMatchers("/api/users/countEmp").permitAll()
            .antMatchers("/api/users/analytics").permitAll()
            .antMatchers("/api/usuarios/validar-captcha").permitAll()
            .antMatchers("/api/getFileS3/**").permitAll()
            .antMatchers("/api/**").authenticated()
            .antMatchers("/api/commonMessages").hasAuthority(AuthoritiesConstants.ADMIN)
            .antMatchers("/management/health").permitAll()
            .antMatchers("/management/info").permitAll()
            .antMatchers("/management/prometheus").permitAll()
            .antMatchers("/management/**").hasAuthority(AuthoritiesConstants.ADMIN)
        .and()
            .httpBasic()
        .and()
            .apply(securityConfigurerAdapter());
        // @formatter:on
    }

    private JWTConfigurer securityConfigurerAdapter() {
        return new JWTConfigurer(tokenProvider);
    }
}
