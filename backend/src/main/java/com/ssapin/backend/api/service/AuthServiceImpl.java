package com.ssapin.backend.api.service;

import com.ssapin.backend.api.domain.dto.response.AuthResponse;
import com.ssapin.backend.util.KakaoOAuth2;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{

    private final KakaoOAuth2 kakaoOAuth2;
    // properties 파일에 숨길 예정
    private final String CLIENT_ID = "e3a714fa6facdc0a7b2fdc80c4cc85ef";
    // 테스트용
    private final String REDIRECT_URI = "http://localhost:8080/auth/login";

    public AuthResponse.Detail login(String authorizeCode) throws IOException {

        String accessToken = kakaoOAuth2.getKakaoToken(authorizeCode);
        long kakaoId = kakaoOAuth2.getKakaoId(accessToken);

        return null;
    }

//    public String getKakaoToken(String authorizeCode) throws IOException {
//
//        final String BASE_URL = "https://kauth.kakao.com/oauth/token";
//        final String GRANT_TYPE = "authorization_code";
//
//        String accessToken = null;
//
//        URL url = new URL(BASE_URL);
//        HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
//
//        try {
//
//            urlConnection.setRequestMethod("POST");
//            urlConnection.setRequestProperty("Content-Type", "application/json; utf-8");
//            urlConnection.setRequestProperty("Accept", "application/json");
//            urlConnection.setDoOutput(true);
//
//            BufferedWriter bufferedWriter = new BufferedWriter(new OutputStreamWriter(urlConnection.getOutputStream()));
//            StringBuilder stringBuilder = new StringBuilder();
//
//            stringBuilder.append("grant_type=" + GRANT_TYPE);
//            stringBuilder.append("&client_id=" + CLIENT_ID);
//            stringBuilder.append("&redirect_uri=" + REDIRECT_URI);
//            stringBuilder.append("&code" + authorizeCode);
//
//            bufferedWriter.write(bufferedWriter.toString());
//            bufferedWriter.flush();
//
//            int responseCode = urlConnection.getResponseCode();
//
//            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
//            String responseData = "";
//            String inputLine;
//            while ((inputLine = bufferedReader.readLine()) != null) responseData += inputLine;
//            bufferedReader.close();
//            bufferedWriter.close();
//            JSONParser jsonParser = new JSONParser();
//            JSONObject jsonObject = (JSONObject) jsonParser.parse(responseData);
//            accessToken = jsonObject.get("access_token").toString();
//        } catch (IOException e) {
//            e.printStackTrace();
//        } catch (ParseException e) {
//            throw new RuntimeException(e);
//        }
//        return accessToken;
//    }
//
//    public String getKakaoEmail(String accessToken) throws IOException {
//
//        final String BASE_URL = "https://kapi.kakao.com/v2/user/me";
//        String email = null;
//
//        URL url = new URL(BASE_URL);
//        HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
//
//        try {
//            urlConnection.setRequestMethod("GET");
//            urlConnection.setRequestProperty("Content-Type", "application/json; utf-8");
//            urlConnection.setRequestProperty("Accept", "application/json");
//            urlConnection.setRequestProperty("Authorization", "Bearer " + accessToken);
//
//            int responseCode = urlConnection.getResponseCode();
//            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
//            String responseData = "";
//            String inputLine;
//
//            while ((inputLine = bufferedReader.readLine()) != null) responseData += inputLine;
//            bufferedReader.close();
//
//            JSONParser jsonParser = new JSONParser();
//            JSONObject jsonObject = (JSONObject) jsonParser.parse(responseData);
//            JSONObject kakaoAccount = (JSONObject) jsonObject.get("kakao_account");
//            email = kakaoAccount.get("email").toString();
//
//        } catch (ParseException e) {
//            throw new RuntimeException(e);
//        }
//        return email;
//    }
}
