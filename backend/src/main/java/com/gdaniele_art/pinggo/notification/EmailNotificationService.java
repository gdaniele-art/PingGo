package com.gdaniele_art.pinggo.notification;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailNotificationService {
    private static final Logger log = LoggerFactory.getLogger(EmailNotificationService.class);

    private final ObjectProvider<JavaMailSender> mailSenderProvider;

    @Value("${alerts.mail.enabled:false}")
    private boolean mailAlertsEnabled;

    @Value("${alerts.mail.to:}")
    private String alertMailTo;

    @Value("${alerts.mail.from:}")
    private String alertMailFrom;

    public EmailNotificationService(ObjectProvider<JavaMailSender> mailSenderProvider) {
        this.mailSenderProvider = mailSenderProvider;
    }

    public void send(String subject, String body) {
        if (!mailAlertsEnabled) {
            return;
        }

        if (alertMailTo == null || alertMailTo.isBlank()) {
            log.warn("Email alerts are enabled but alerts.mail.to is empty");
            return;
        }

        JavaMailSender mailSender = mailSenderProvider.getIfAvailable();

        if (mailSender == null) {
            log.warn("Email alerts are enabled but JavaMailSender is not available");
            return;
        }

        try {
            SimpleMailMessage message = new SimpleMailMessage();

            if (alertMailFrom != null && !alertMailFrom.isBlank()) {
                message.setFrom(alertMailFrom);
            }

            message.setTo(alertMailTo);
            message.setSubject(subject);
            message.setText(body);

            mailSender.send(message);

            log.info("Email alert sent to {}", alertMailTo);

        } catch (Exception exception) {
            log.warn("Failed to send email alert. error={}", exception.getMessage());
        }
    }
}