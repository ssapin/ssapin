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
import java.io.IOException;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class JwtTokenInterceptor implements HandlerInterceptor {

    private final JwtTokenUtil jwtTokenUtil;
    private final AuthService authService;
    private final UserService userService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws IOException {

        String accessToken = request.getHeader("ACCESS_TOKEN");
        String refreshToken = request.getHeader("REFRESH_TOKEN");

        if (isPreflightRequest(request)) return true;

        if (accessToken == null && refreshToken == null){
            response.setStatus(400);
            response.setHeader("ACCESS_TOKEN", accessToken);
            response.setHeader("REFRESH_TOKEN", refreshToken);
            response.setHeader("message", "There is no Tokens.");
            return false;
        }

        if (accessToken != null) {
            if (accessToken.length() < 1){
                response.setStatus(400);
                response.setHeader("ACCESS_TOKEN", accessToken);
                response.setHeader("REFRESH_TOKEN", refreshToken);
                response.setHeader("msg", "AccessToken is empty.");
                return false;
            }
            if (jwtTokenUtil.isValidToken(accessToken)) {
                Optional<User> user = userRepository.findById(jwtTokenUtil.getUserIdFromToken(accessToken));
                if (user.isPresent()) {
                    Optional<Auth> auth = authRepository.findByUser(user.get());
                    if (auth.isPresent()) {
                        return true;
                    }
                }
            }

            else {
                if (refreshToken == null){
                    response.setStatus(401);
                    response.setHeader("ACCESS_TOKEN", accessToken);
                    response.setHeader("REFRESH_TOKEN", refreshToken);
                    response.setHeader("msg", "Invalid AccessToken Error.");
                    return false;
                }
            }
        }

        if (refreshToken != null) {
            if (refreshToken.length() < 1){
                response.setStatus(400);
                response.setHeader("ACCESS_TOKEN", accessToken);
                response.setHeader("REFRESH_TOKEN", refreshToken);
                response.setHeader("msg", "RefreshToken is empty.");
                return false;
            }

            if (jwtTokenUtil.isValidToken(refreshToken)) {
                Optional<User> user = userRepository.findById(jwtTokenUtil.getUserIdFromToken(accessToken));
                if (user.isPresent()) {
                    Optional<Auth> auth = authRepository.findByUser(user.get());
                    if (auth.isPresent()) {
                        return true;
                    }
                }
            }
        }

        response.setStatus(403);
        response.setHeader("ACCESS_TOKEN", accessToken);
        response.setHeader("REFRESH_TOKEN", refreshToken);
        response.setHeader("msg", "Invalid RefreshToken Error.");
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