package com.gdaniele_art.pinggo.notification;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.Map;

@Service
public class SlackNotificationService {
    private static final Logger log = LoggerFactory.getLogger(SlackNotificationService.class);
    private final RestClient restClient;
    @Value("${alerts.slack.enabled:false}")
    private boolean slackAlertsEnabled;
    @Value("${alerts.slack.webhook-url:}")
    private String slackWebhookUrl;

    public SlackNotificationService(RestClient.Builder restClientBuilder) {
        this.restClient = restClientBuilder.build();
    }

    public void send(String message) {
        if (!slackAlertsEnabled) {
            return;
        }
        if (slackWebhookUrl == null || slackWebhookUrl.isBlank()) {
            log.warn("Slack alerts are enabled but alerts.slack.webhook-url is empty");
            return;
        }
        try {
            restClient.post()
                    .uri(slackWebhookUrl)
                    .body(Map.of("text", message))
                    .retrieve()
                    .toBodilessEntity();

            log.info("Slack alert sent");

        } catch (Exception exception) {
            log.warn("Failed to send Slack alert. error={}", exception.getMessage());
        }
    }
}