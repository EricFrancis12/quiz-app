package com.example.demo.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class HashingUtil {

    private static final String SHA_256 = "SHA-256";
    private static final int SHA_256_HASH_LENGTH = 32;

    public static String hashSHA256(String input) {
        try {
            MessageDigest sha256 = MessageDigest.getInstance(SHA_256);
            byte[] bytes = sha256.digest(input.getBytes());
            if (bytes.length != SHA_256_HASH_LENGTH) {
                throw new IllegalStateException(String.format(
                        "Expected %d bytes from sha256::digest, but got: %d",
                        SHA_256_HASH_LENGTH, bytes.length));
            }
            StringBuilder sb = new StringBuilder();
            for (byte b : bytes) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException ex) {
            throw new RuntimeException(String.format(
                    "Hash algorithm '%s' not available: %s",
                    SHA_256, ex.getMessage()));
        }
    }

}
