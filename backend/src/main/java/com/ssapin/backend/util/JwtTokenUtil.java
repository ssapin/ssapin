package com.ssapin.backend.util;

import com.ssapin.backend.api.domain.entity.User;
import com.ssapin.backend.api.service.UserService;
import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


@Service
@RequiredArgsConstructor
public class JwtTokenUtil {

    private static final String SECRET_KEY = "BboBbJJuWapBboBbJJuWapBboBbJJuWapBboBbJJuWapBboBbJJuWapBboBbJJuWap";
    private static final String REFRESH_KEY = "JJuWapslovePoopJJuWapslovePoopJJuWapslovePoopJJuWapslovePoopJJuWapslovePoop";
    private static final String DATA_KEY = "userId";

    private static final String EXP_KEY = "exp";

    private final UserService userService;

    //AccessToken 발급
    public String generateJwtToken(User user) {
        return Jwts.builder()
                .setSubject(user.getId() + "")
                .setHeader(createHeader())
                .setClaims(createClaims(user))
                .setExpiration(createExpireDate(1000 * 60 * 60 * 24)) // 토큰 만료시간 24hour
                .signWith(createSigningKey(SECRET_KEY), SignatureAlgorithm.HS256) //HS256 , key로 sign
                .compact(); // 토큰 생성
    }

    //RefreshToken 발급
    public String saveRefreshToken(User user) {
        return Jwts.builder()
                .setSubject(user.getId() + "")
                .setHeader(createHeaderRefresh())
                .setClaims(createClaims(user))
                .setExpiration(createExpireDate(1000 * 60 * 60 * 24 * 7)) // 토큰 만료시간 7일
                .signWith(createSigningKey(REFRESH_KEY), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean isValidToken(String token) {

        try {
            Claims accessClaims = getClaimsFormToken(token, SECRET_KEY);
            return true;
        } catch (ExpiredJwtException exception) {
            exception.printStackTrace();
            return false;
        } catch (JwtException exception) {
            exception.printStackTrace();
            return false;
        } catch (NullPointerException exception) {
            exception.printStackTrace();
            return false;
        }
    }

    public boolean isValidRefreshToken(String token) {
        try {
            Claims accessClaims = getClaimsFormToken(token, REFRESH_KEY);
            return true;
        } catch (ExpiredJwtException exception) {
            exception.printStackTrace();
            return false;
        } catch (JwtException exception) {
            exception.printStackTrace();
            return false;
        } catch (NullPointerException exception) {
            exception.printStackTrace();
            return false;
        }
    }


    private Date createExpireDate(long expireDate) {
        long curTime = System.currentTimeMillis();
        return new Date(curTime + expireDate);
    }

    private Map<String, Object> createHeader() {
        Map<String, Object> header = new HashMap<>();

        header.put("typ", "ACCESS_TOKEN");
        header.put("alg", "HS256");
        header.put("regDate", System.currentTimeMillis());

        return header;
    }

    private Map<String, Object> createHeaderRefresh() {
        Map<String, Object> header = new HashMap<>();

        header.put("typ", "REFRESH_TOKEN");
        header.put("alg", "HS256");
        header.put("regDate", System.currentTimeMillis());

        return header;
    }

    private Map<String, Object> createClaims(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put(DATA_KEY, user.getId());
        return claims;
    }

    private Key createSigningKey(String key) {
        byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(key);
        return new SecretKeySpec(apiKeySecretBytes, SignatureAlgorithm.HS256.getJcaName());
    }

    private Claims getClaimsFormToken(String token, String key) {

        return Jwts.parserBuilder()
                .setSigningKey(DatatypeConverter.parseBase64Binary(key))
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public long getUserIdFromToken(String token) {

        Claims claims = getClaimsFormToken(token, SECRET_KEY);
        long userId = claims.get(DATA_KEY, Long.class);
        User user = userService.getUserById(userId);

        return user.getId();
    }

    public long getExpFromToken(String token) {

        Claims claims = getClaimsFormToken(token, SECRET_KEY);
        int exp = claims.get(EXP_KEY, Integer.class);

        return exp;
    }
}