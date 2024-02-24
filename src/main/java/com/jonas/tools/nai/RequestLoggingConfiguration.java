package com.jonas.tools.nai;

import jakarta.servlet.FilterRegistration;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.CommonsRequestLoggingFilter;

@Configuration
public class RequestLoggingConfiguration {

    @Bean
    public FilterRegistrationBean<CommonsRequestLoggingFilter> commonsRequestLoggingFilterFilterRegistrationBean() {
        CommonsRequestLoggingFilter filter = new CommonsRequestLoggingFilter() {
            @Override
            protected boolean shouldLog(HttpServletRequest request) {
                return true;
            }

            @Override
            protected void beforeRequest(HttpServletRequest request, String message) {
                this.logger.info(message);
            }

            @Override
            protected void afterRequest(HttpServletRequest request, String message) {
                this.logger.info(message);
            }
        };
        filter.setIncludeHeaders(true);
        filter.setIncludeQueryString(true);
        filter.setIncludeClientInfo(true);
        filter.setIncludePayload(true);
        filter.setMaxPayloadLength(10000);
        return new FilterRegistrationBean<>(filter);
    }
}
