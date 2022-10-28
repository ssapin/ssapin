//package com.ssapin.backend.config;
//
//import com.ssapin.backend.util.KakaoOAuth2;
//import io.netty.channel.ChannelOption;
//import io.netty.handler.timeout.ReadTimeoutHandler;
//import io.netty.handler.timeout.WriteTimeoutHandler;
//import lombok.RequiredArgsConstructor;
//import org.json.simple.JSONObject;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.MediaType;
//import org.springframework.http.client.reactive.ReactorClientHttpConnector;
//import org.springframework.web.reactive.function.client.WebClient;
//import reactor.netty.http.client.HttpClient;
//
//import java.time.Duration;
//import java.util.concurrent.TimeUnit;
//
//@RequiredArgsConstructor
//public class APITEST {
//    private static final String CLIENT_ID = "e3a714fa6facdc0a7b2fdc80c4cc85ef";
//    // 테스트용
//    private static final String REDIRECT_URI = "http://localhost:8080/auth/login";
//
//    public static void main(String[] args) {
//
//        String accessToken = "MmG47t9_I1Htu9pYpyioaf64EgDJtC248VGSGNjHCj1z7AAAAYQdloJQ";
//        WebClient webClient = webClient();
//        System.out.println("ssssssssssssssssssssssssibal");
//        long id = getKakaoId(webClient, accessToken);
//        System.out.println(id);
//    }
//
//    public static WebClient webClient(){
//        HttpClient httpClient = HttpClient.create()
//                .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, 5000)
//                .responseTimeout(Duration.ofMillis(5000))
//                .doOnConnected(conn -> conn
//                        .addHandlerLast(new ReadTimeoutHandler(5000, TimeUnit.MILLISECONDS))
//                        .addHandlerLast(new WriteTimeoutHandler(5000, TimeUnit.MILLISECONDS)));
//
//        return WebClient.builder()
//                .clientConnector(new ReactorClientHttpConnector(httpClient))
//                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
//                .build();
//    }
//
//    public static String getKakaoToken(WebClient webClient, String authorizeCode) {
//
//        return webClient.post()
//                .uri(uriBuilder -> uriBuilder
//                        .path("https://kauth.kakao.com/oauth/token")
//                        .queryParam("grant_type", "authorization_code")
//                        .queryParam("client_id", CLIENT_ID)
//                        .queryParam("redirect_uri", REDIRECT_URI)
//                        .queryParam("code", authorizeCode)
//                        .build())
//                .retrieve()
//                .bodyToMono(JSONObject.class)
//                .block()
//                .get("access_token")
//                .toString();
//    }
//
//    public static long getKakaoId(WebClient webClient, String accessToken) {
//
//        return Long.parseLong(
//                webClient.get()
//                        .uri(uriBuilder -> uriBuilder
//                                .path("https://kapi.kakao.com/v2/user/me")
//                                .build())
//                        .header("Authorization", "Bearer " + accessToken)
//                        .retrieve()
//                        .bodyToMono(JSONObject.class)
//                        .block()
//                        .get("id")
//                        .toString());
//    }
//}
