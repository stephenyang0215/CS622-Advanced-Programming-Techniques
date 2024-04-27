package com.example.twitterapiapp.login;

import com.example.twitterapiapp.postTweets.postTweetsRepository;
import com.example.twitterapiapp.postTweets.postTweetsSpring;
import com.github.scribejava.core.model.OAuth2AccessToken;
import com.github.scribejava.core.pkce.PKCE;
import com.github.scribejava.core.pkce.PKCECodeChallengeMethod;
import com.twitter.clientlib.TwitterCredentialsOAuth2;
import com.twitter.clientlib.api.TwitterApi;
import com.twitter.clientlib.auth.TwitterOAuth20Service;
import com.twitter.clientlib.model.TweetCreateRequest;
import org.example.OAuth20GetAccessToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.util.concurrent.ExecutionException;

@Service
public class loginService {
    @Autowired
    loginRepository loginRepository;

    public String Oauth2() {
        OAuth20GetAccessToken OAuth20 = new OAuth20GetAccessToken();
        TwitterCredentialsOAuth2 credentials = OAuth20.getCredentials();
        return credentials.getTwitterOauth2AccessToken();
    }

    public String callOauth2(String code) {
//        String GET_URL = "https://twitter.com/i/oauth2/authorize?code_challenge=challenge&code_challenge_method=PLAIN&response_type=code&client_id=ckNFUk9vQ3JTX3ZVWWw4cnBkUVk6MTpjaQ&redirect_uri=https%3A%2F%2Foauth.pstmn.io%2Fv1%2Fcallback&scope=tweet.write%20tweet.read%20users.read%20offline.access&state=state";

        TwitterCredentialsOAuth2 credentials = new TwitterCredentialsOAuth2("ckNFUk9vQ3JTX3ZVWWw4cnBkUVk6MTpjaQ",
                "gtXeHyVC9K9LO3DT0zQtODb-WoeW071kOUDEe4nBqTx7WSF8vJ",
                System.getenv("TWITTER_OAUTH2_ACCESS_TOKEN"),
                System.getenv("TWITTER_OAUTH2_REFRESH_TOKEN"));
        TwitterOAuth20Service service = new TwitterOAuth20Service(
                credentials.getTwitterOauth2ClientId(),
                credentials.getTwitterOAuth2ClientSecret(),
                "http://127.0.0.1:8080/accessTokenByCode",
                "tweet.write tweet.read users.read offline.access");

        OAuth2AccessToken accessToken = null;
        try {

            final String secretState = "state";
            PKCE pkce = new PKCE();
            pkce.setCodeChallenge("challenge");
            pkce.setCodeChallengeMethod(PKCECodeChallengeMethod.PLAIN);
            pkce.setCodeVerifier("challenge");
            String authorizationUrl = service.getAuthorizationUrl(pkce, secretState);

            System.out.println("Go to the Authorization URL and authorize your App:\n" +
                    authorizationUrl + "\nAfter that paste the authorization code here\n>>");
            System.out.println("\nTrading the Authorization Code for an Access Token...");
            accessToken = service.getAccessToken(pkce, code);

            System.out.println("Access token: " + accessToken.getAccessToken());
            System.out.println("Refresh token: " + accessToken.getRefreshToken());
            return accessToken.getAccessToken();
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (ExecutionException e) {
            throw new RuntimeException(e);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
}
