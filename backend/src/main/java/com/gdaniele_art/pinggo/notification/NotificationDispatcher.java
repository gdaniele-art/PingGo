package com.gdaniele_art.pinggo.notification;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class NotificationDispatcher {
    private static final Logger log = LoggerFactory.getLogger(NotificationDispatcher.class);

    @Autowired
    private  EmailNotificationService emailNotificationService;

    @Autowired
    private  SlackNotificationService slackNotificationService;

    public NotificationDispatcher(EmailNotificationService emailNotificationService, SlackNotificationService slackNotificationService) {
        this.emailNotificationService = emailNotificationService;
        this.slackNotificationService = slackNotificationService;
    }

    @Async("notificationTaskExecutor")
    public void dispatch(AlertNotification notification) {
        boolean emailSent = emailNotificationService.send(
                notification.subject(),
                notification.emailBody());

        boolean slackSent = slackNotificationService.send(
                notification.slackMessage());

        log.info(
                "Notification dispatch finished. alertType={}, serviceKey={}, emailSent={}, slackSent={}",
                notification.alertType(),
                notification.serviceKey(),
                emailSent,
                slackSent);
    }
}