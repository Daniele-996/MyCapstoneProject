package MyCapstoneProject.capstone.tools;

import MyCapstoneProject.capstone.entities.User;
import kong.unirest.core.HttpResponse;
import kong.unirest.core.JsonNode;
import kong.unirest.core.Unirest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class MailgunSender {
    private String apiKey;
    private String domain;

    public MailgunSender(@Value("${mailgun.apikey}") String apiKey, @Value("${mailgun.domain}") String domain) {
        this.apiKey = apiKey;
        this.domain = domain;
    }

    public void sendRegistrationEmail(User recipient) {
        HttpResponse<JsonNode> response = Unirest.post("https://api.mailgun.net/v3/" + this.domain + "/messages")
                .basicAuth("api", this.apiKey)
                .field("from", "danielesanza@gmail.com")
                .field("to", recipient.getEmail())
                .field("subject", "Registrazione Completata a Reservation Office")
                .field("text", "Benvenuto " + recipient.getFirstName() + " nella nostra community! Siamo a vostra disposizione!")
                .asJson();

    }

    public void sendBillingEmail() {
    }
}
