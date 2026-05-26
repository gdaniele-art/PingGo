package com.gdaniele_art.pinggo.alert;

import com.gdaniele_art.pinggo.alert.AlertEventPayload.AlertEventType;
import com.gdaniele_art.pinggo.entity.CheckLog;
import com.gdaniele_art.pinggo.entity.CheckLog.StatusService;
import com.gdaniele_art.pinggo.entity.MonitoredService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class AlertService {
    private static final Logger log = LoggerFactory.getLogger(AlertService.class);

    private final RestClient restClient;

    @Value("${alerts.enabled:false}")
    private boolean alertsEnabled;

    @Value("${alerts.n8n-webhook-url:}")
    private String n8nWebhookUrl;

    public AlertService(RestClient.Builder restClientBuilder) {
        this.restClient = restClientBuilder.build();
    }

    public void handleCheckResultTransition(CheckLog previousLog, CheckLog currentLog) {
        if (!alertsEnabled) {
            return;
        }

        if (n8nWebhookUrl == null || n8nWebhookUrl.isBlank()) {
            return;
        }

        if (currentLog == null) {
            return;
        }

        AlertEventType eventType = resolveEventType(previousLog, currentLog);

        if (eventType == null) {
            return;
        }

        AlertEventPayload payload = buildPayload(eventType, previousLog, currentLog);

        sendAlert(payload);
    }

    private AlertEventType resolveEventType(CheckLog previousLog, CheckLog currentLog) {
        StatusService currentStatus = currentLog.getStatus();

        if (previousLog == null) {
            if (currentStatus == StatusService.DOWN) {
                return AlertEventType.SERVICE_DOWN;
            }

            return null;
        }

        StatusService previousStatus = previousLog.getStatus();

        if (previousStatus == StatusService.UP && currentStatus == StatusService.DOWN) {
            return AlertEventType.SERVICE_DOWN;
        }

        if (previousStatus == StatusService.DOWN && currentStatus == StatusService.UP) {
            return AlertEventType.SERVICE_RECOVERED;
        }

        return null;
    }

    private AlertEventPayload buildPayload(AlertEventType eventType, CheckLog previousLog, CheckLog currentLog) {
        MonitoredService monitoredService = currentLog.getMonitoredService();

        AlertEventPayload payload = new AlertEventPayload();

        payload.setEventType(eventType);
        payload.setAgentId(monitoredService.getAgent().getId());
        payload.setAgentName(monitoredService.getAgent().getName());
        payload.setMonitoredServiceId(monitoredService.getId());
        payload.setServiceKey(monitoredService.getServiceKey());
        payload.setServiceName(monitoredService.getName());
        payload.setPreviousStatus(previousLog != null ? previousLog.getStatus() : null);
        payload.setCurrentStatus(currentLog.getStatus());
        payload.setHttpStatusCode(currentLog.getHttpStatusCode());
        payload.setLatencyMs(currentLog.getLatencyMs());
        payload.setErrorMessage(currentLog.getErrorMessage());
        payload.setCheckedAt(currentLog.getCheckedAt());

        return payload;
    }

    private void sendAlert(AlertEventPayload payload) {
        try {
            restClient.post()
                    .uri(n8nWebhookUrl)
                    .body(payload)
                    .retrieve()
                    .toBodilessEntity();

            log.info("Alert sent to n8n. eventType={}, serviceKey={}",
                    payload.getEventType(),
                    payload.getServiceKey());

        } catch (Exception exception) {
            log.warn("Failed to send alert to n8n: {}", exception.getMessage());
        }
    }
}