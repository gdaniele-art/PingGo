package com.gdaniele_art.pinggo.notification;

import com.gdaniele_art.pinggo.entity.CheckLog;
import com.gdaniele_art.pinggo.entity.CheckLog.StatusService;
import com.gdaniele_art.pinggo.entity.MonitoredService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class MonitoringAlertService {
    private static final Logger log = LoggerFactory.getLogger(MonitoringAlertService.class);

    private final EmailNotificationService emailNotificationService;
    private final SlackNotificationService slackNotificationService;

    @Value("${alerts.enabled:false}")
    private boolean alertsEnabled;

    public MonitoringAlertService(
            EmailNotificationService emailNotificationService,
            SlackNotificationService slackNotificationService
    ) {
        this.emailNotificationService = emailNotificationService;
        this.slackNotificationService = slackNotificationService;
    }

    public void handleCheckResultTransition(CheckLog previousLog, CheckLog currentLog) {
        if (!alertsEnabled) {
            return;
        }

        if (currentLog == null) {
            return;
        }

        AlertType alertType = resolveAlertType(previousLog, currentLog);

        if (alertType == null) {
            return;
        }

        MonitoredService monitoredService = currentLog.getMonitoredService();

        String subject = buildSubject(alertType, monitoredService);
        String emailBody = buildEmailBody(alertType, previousLog, currentLog, monitoredService);
        String slackMessage = buildSlackMessage(alertType, previousLog, currentLog, monitoredService);

        emailNotificationService.send(subject, emailBody);
        slackNotificationService.send(slackMessage);

        log.info("Monitoring alert processed. alertType={}, serviceKey={}",
                alertType,
                monitoredService.getServiceKey());
    }

    private AlertType resolveAlertType(CheckLog previousLog, CheckLog currentLog) {
        StatusService currentStatus = currentLog.getStatus();

        if (previousLog == null) {
            if (currentStatus == StatusService.DOWN) {
                return AlertType.SERVICE_DOWN;
            }

            return null;
        }

        StatusService previousStatus = previousLog.getStatus();

        if (previousStatus == StatusService.UP && currentStatus == StatusService.DOWN) {
            return AlertType.SERVICE_DOWN;
        }

        if (previousStatus == StatusService.DOWN && currentStatus == StatusService.UP) {
            return AlertType.SERVICE_RECOVERED;
        }

        return null;
    }

    private String buildSubject(AlertType alertType, MonitoredService monitoredService) {
        if (alertType == AlertType.SERVICE_DOWN) {
            return "[PingGo] Service DOWN: " + monitoredService.getName();
        }

        return "[PingGo] Service RECOVERED: " + monitoredService.getName();
    }

    private String buildEmailBody(
            AlertType alertType,
            CheckLog previousLog,
            CheckLog currentLog,
            MonitoredService monitoredService
    ) {
        String previousStatus = previousLog != null ? previousLog.getStatus().name() : "UNKNOWN";
        String errorMessage = currentLog.getErrorMessage() != null ? currentLog.getErrorMessage() : "-";

        return """
                PingGo Alert

                Event: %s

                Service:
                - Name: %s
                - Key: %s
                - URL: %s
                - Method: %s

                Agent:
                - ID: %s
                - Name: %s

                Status:
                - Previous: %s
                - Current: %s

                Check:
                - HTTP status code: %s
                - Latency: %s ms
                - Error: %s
                - Checked at: %s
                """.formatted(
                alertType,
                monitoredService.getName(),
                monitoredService.getServiceKey(),
                monitoredService.getUrl(),
                monitoredService.getCheckMethod(),
                monitoredService.getAgent().getId(),
                monitoredService.getAgent().getName(),
                previousStatus,
                currentLog.getStatus(),
                currentLog.getHttpStatusCode(),
                currentLog.getLatencyMs(),
                errorMessage,
                currentLog.getCheckedAt()
        );
    }

    private String buildSlackMessage(
            AlertType alertType,
            CheckLog previousLog,
            CheckLog currentLog,
            MonitoredService monitoredService
    ) {
        String emoji = alertType == AlertType.SERVICE_DOWN ? ":rotating_light:" : ":white_check_mark:";
        String title = alertType == AlertType.SERVICE_DOWN ? "Service DOWN" : "Service RECOVERED";
        String previousStatus = previousLog != null ? previousLog.getStatus().name() : "UNKNOWN";
        String errorMessage = currentLog.getErrorMessage() != null ? currentLog.getErrorMessage() : "-";

        return """
                %s *PingGo Alert - %s*

                *Service:* %s
                *Key:* `%s`
                *URL:* `%s`
                *Agent:* %s

                *Previous:* %s
                *Current:* %s
                *HTTP status:* %s
                *Latency:* %s ms
                *Error:* %s
                *Checked at:* %s
                """.formatted(
                emoji,
                title,
                monitoredService.getName(),
                monitoredService.getServiceKey(),
                monitoredService.getUrl(),
                monitoredService.getAgent().getName(),
                previousStatus,
                currentLog.getStatus(),
                currentLog.getHttpStatusCode(),
                currentLog.getLatencyMs(),
                errorMessage,
                currentLog.getCheckedAt()
        );
    }

    private enum AlertType {
        SERVICE_DOWN,
        SERVICE_RECOVERED
    }
}