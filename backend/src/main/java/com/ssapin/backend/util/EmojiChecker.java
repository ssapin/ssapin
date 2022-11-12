package com.ssapin.backend.util;

import org.springframework.stereotype.Service;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class EmojiChecker {

    static Pattern rex = Pattern.compile("[^\\p{L}\\p{N}\\p{P}\\p{Z}]");

    public boolean isMapEmoji(String str) {
        if (str == null) return true;
        if (str.length() == 0) return false;
        if (str.length() % 2 != 0) return false;
        if (str.length() > 6) return false;

        for (int i = 0; i < str.length(); i+= 2) {
            String subStr = str.substring(i, i + 2);
            Matcher matcher = rex.matcher(subStr);

            if (!matcher.find()) return false;
        }
        return true;
    }

    public boolean isUserEmoji(String str) {
        if (str == null) return true;
        if (str.length() != 2) return false;

        Matcher matcher = rex.matcher(str);
        return matcher.find();
    }

}
