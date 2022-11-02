package com.ssapin.backend.interceptor;
import com.ssapin.backend.api.service.AuthService;
import com.ssapin.backend.api.service.UserService;
import com.ssapin.backend.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class JwtTokenInterceptor implements HandlerInterceptor {

    private final JwtTokenUtil jwtTokenUtil;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {

        String accessToken = request.getHeader("accessToken");

        if (isPreflightRequest(request)) return true;

        if (accessToken != null) {
            int status = jwtTokenUtil.isValidToken(accessToken);

            if (status == 2) return true;
            else if (status == 1) {
                response.setStatus(401);
                response.setHeader("accessToken", accessToken);
                response.setHeader("message", "Token Expired");
                return false;
            }
        }

        response.setStatus(403);
        response.setHeader("accessToken", accessToken);
        response.setHeader("message", "Authentication Failed");
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