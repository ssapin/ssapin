package com.ssapin.backend.config;

import com.fasterxml.classmate.TypeResolver;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.Pageable;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.schema.AlternateTypeRules;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.List;

@Configuration
@EnableSwagger2
// http://localhost:8080/swagger-ui/#
public class SwaggerConfig {
    TypeResolver typeResolver = new TypeResolver();
    @Bean
    public Docket swagger() {
        final ApiInfo apiInfo = new ApiInfoBuilder()
                .title("SSAPIN 테스트 API SWAGGER")
                .description("SSAPIN 관련 테스트 API 상세소개 및 사용법")
                .version("1.0")
                .build();

        return new Docket(DocumentationType.SWAGGER_2)
                .alternateTypeRules(AlternateTypeRules.newRule(typeResolver.resolve(Pageable.class), typeResolver.resolve(MyPageable.class)))
                .ignoredParameterTypes(java.sql.Date.class)
                .forCodeGeneration(true)
                .apiInfo(apiInfo)
                .select()
                .apis(RequestHandlerSelectors.any())
                .paths(PathSelectors.any())
                .build();
    }

    @Data
    @ApiModel
    static class MyPageable {
        @ApiModelProperty(value = "페이지 번호(0..N)")
        private Integer page;

        @ApiModelProperty(value = "페이지 크기", allowableValues = "range[0,100]")
        private Integer size;

        @ApiModelProperty(value = "정렬(사용법 : 컬럼명,ASC|DESC)")
        private List<String> sort;
    }
}
