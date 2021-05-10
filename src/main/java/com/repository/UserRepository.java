package com.repository;

import com.domain.User;
import com.domain.Persona;

import org.springframework.data.domain.Page;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.time.Instant;

/**
 * Spring Data JPA repository for the {@link User} entity.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findOneByActivationKey(String activationKey);

    List<User> findAllByActivatedIsFalseAndActivationKeyIsNotNullAndCreatedDateBefore(Instant dateTime);

    Optional<User> findOneByResetKey(String resetKey);

    Optional<User> findOneByEmailIgnoreCase(String email);

    Optional<User> findOneByLogin(String login);

    User findOneByUserEmpresa(Long empresa);
    
    User findByLogin(String email);

    @EntityGraph(attributePaths = "authorities")
    Optional<User> findOneWithAuthoritiesById(Long id);

    @EntityGraph(attributePaths = "authorities")
    Optional<User> findOneWithAuthoritiesByLogin(String login);

    @EntityGraph(attributePaths = "authorities")
    Optional<User> findOneWithAuthoritiesByEmailIgnoreCase(String email);

    Page<User> findAllByLoginNot(Pageable pageable, String login);
    
    Page<User> findOneById(Pageable pageable,Long id);

    @Query(value = "select per.id \r\n" + 
        "from ct_persona_tb per\r\n" + 
        "left join ct_informacon_laboral_tb inf on inf.usuario_id = per.id\r\n" + 
        "inner join jhi_user jhi on per.id = jhi.usuario_id\r\n" + 
        "where inf.id is null and per.fecha_recordatorio is null \r\n" +
        "group by 1 limit 300",
        nativeQuery = true)
	List<Long> findEmailByQuery();
}
