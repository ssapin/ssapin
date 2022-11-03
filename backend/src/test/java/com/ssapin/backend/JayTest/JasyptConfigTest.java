package com.ssapin.backend.JayTest;

import com.ssapin.backend.config.JasyptConfig;
import org.assertj.core.api.Assertions;
import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.junit.jupiter.api.Test;

public class JasyptConfigTest extends JasyptConfig {

    @Test
    void jasypt_test() {
        String username = "ssapin";
        String password = "ssapin307";
        String clientId = "e3a714fa6facdc0a7b2fdc80c4cc85ef";


        String encryptUsername = jasyptEncrypt(username);
        String encryptPassword = jasyptEncrypt(password);
        String encryptClientId = jasyptEncrypt(clientId);

        System.out.println("encryptUsername : " + encryptUsername);
        System.out.println("encryptPassword : " + encryptPassword);
        System.out.println("encryptClientId : " + encryptClientId);

        Assertions.assertThat(username).isEqualTo(jasyptDecryt(encryptUsername));
    }

        private String jasyptEncrypt(String input) {
            String key = "zzuabi";
            StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();
            encryptor.setAlgorithm("PBEWithMD5AndDES");
            encryptor.setPassword(key);
            return encryptor.encrypt(input);
        }

        private String jasyptDecryt(String input){
            String key = "zzuabi";
            StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();
            encryptor.setAlgorithm("PBEWithMD5AndDES");
            encryptor.setPassword(key);
            return encryptor.decrypt(input);
        }

}
