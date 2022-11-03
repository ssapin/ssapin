package com.ssapin.backend.interceptor;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssapin.backend.api.domain.dto.response.InterceptorResponse;
import com.ssapin.backend.api.service.AuthService;
import com.ssapin.backend.api.service.UserService;
import com.ssapin.backend.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class JwtTokenInterceptor implements HandlerInterceptor {

    private final JwtTokenUtil jwtTokenUtil;
    private final static String TOKEN_EXPIRED = "Token Expired";
    private final static String AUTHENTICATION_FAILED = "Authentication Failed";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException {

        String accessToken = request.getHeader("accessToken");

        if (isPreflightRequest(request)) return true;

        ObjectMapper objectMapper = new ObjectMapper();
        InterceptorResponse.Jwt jwtResponse;

        if (accessToken != null) {
            int status = jwtTokenUtil.isValidToken(accessToken);

            if (status == 2) {
                return true;
            }
            else if (status == 1) {
                response.setStatus(401);
                jwtResponse = InterceptorResponse.Jwt.builder()
                        .accessToken(accessToken)
                        .message(TOKEN_EXPIRED)
                        .build();

                response.getWriter().write(objectMapper.writeValueAsString(jwtResponse));
                response.getWriter().close();
                return false;
            }
        }

        response.setStatus(403);
        jwtResponse = InterceptorResponse.Jwt.builder()
                .accessToken(accessToken)
                .message(AUTHENTICATION_FAILED)
                .build();
        response.getWriter().write(objectMapper.writeValueAsString(jwtResponse));
        response.getWriter().close();
        return false;
    }

    private boolean isPreflightRequest(HttpServletRequest request) {
        return isOptions(request) && hasHeaders(request) && hasMethod(request) && hasOrigin(request);
    }

    private boolean isOptions(HttpServletRequest request) {
        return request.getMethod().equalsIgnoreCase(HttpMethod.OPTIONS.toString());
    }

    private boolean hasHeaders(HttpServletRequest request) {
        return Objects.nonNull(request.getHeader("Access-Control-Request-Headers"));
    }

    private boolean hasMethod(HttpServletRequest request) {
        return Objects.nonNull(request.getHeader("Access-Control-Request-Method"));
    }

    private boolean hasOrigin(HttpServletRequest request) {
        return Objects.nonNull(request.getHeader("Origin"));
    }
}