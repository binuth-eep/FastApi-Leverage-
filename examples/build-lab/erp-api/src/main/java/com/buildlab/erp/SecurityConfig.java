package com.buildlab.erp;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.intercept.AuthorizationFilter;
import org.springframework.web.filter.OncePerRequestFilter;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {
  @Bean
  UserDetailsService accounts(Environment env) {
    String manager=env.getRequiredProperty("MANAGER_USERNAME"),staff=env.getRequiredProperty("STAFF_USERNAME");
    String managerPassword=env.getRequiredProperty("MANAGER_PASSWORD"),staffPassword=env.getRequiredProperty("STAFF_PASSWORD");
    if(manager.equals(staff)||managerPassword.length()<12||staffPassword.length()<12)throw new IllegalStateException("Use different usernames and passwords of at least 12 characters in .env");
    var encoder=new BCryptPasswordEncoder();
    return new InMemoryUserDetailsManager(
      User.withUsername(manager).password("{bcrypt}"+encoder.encode(managerPassword)).roles("MANAGER").build(),
      User.withUsername(staff).password("{bcrypt}"+encoder.encode(staffPassword)).roles("STAFF").build());
  }

  @Bean
  SecurityFilterChain security(HttpSecurity http) throws Exception {
    return http.sessionManagement(s->s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
      // This same-origin JSON API requires an explicit custom header for writes instead of cookie CSRF tokens.
      // No cross-origin CORS policy is enabled. Revisit CSRF if changing this authentication design.
      .csrf(csrf->csrf.disable())
      .authorizeHttpRequests(auth->auth.requestMatchers(HttpMethod.GET,"/api/products","/api/health","/api/ready").permitAll().anyRequest().authenticated())
      .httpBasic(Customizer.withDefaults())
      .addFilterAfter(new OncePerRequestFilter(){
        @Override protected void doFilterInternal(HttpServletRequest req,HttpServletResponse res,FilterChain chain) throws ServletException,IOException {
          if(!java.util.Set.of("GET","HEAD","OPTIONS").contains(req.getMethod())&&!"1".equals(req.getHeader("X-Build-Lab"))){res.sendError(403,"X-Build-Lab header required");return;}
          chain.doFilter(req,res);
        }
      },AuthorizationFilter.class).build();
  }
}
