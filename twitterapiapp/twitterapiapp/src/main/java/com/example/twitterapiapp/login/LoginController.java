package com.example.twitterapiapp.login;

import ch.qos.logback.core.model.Model;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.Map;

@RestController
public class LoginController {
    @GetMapping("/")
    public String login() {
        return "This is home page";
    }

    @GetMapping("/secured")
    public String secured() {
        return "This is secured page";
    }



    @GetMapping("/lookup")
    public String lookup() {
        return "This is lookup page";
    }


    @GetMapping("/user")
    public Map<String, Object> user(@AuthenticationPrincipal OAuth2User principal) {
        return Collections.singletonMap("name", principal.getAttribute("name"));
    }

    @GetMapping("/findMyUser")
    public String find() {
        new findMyUser(accessToken, db);
    }
    }
