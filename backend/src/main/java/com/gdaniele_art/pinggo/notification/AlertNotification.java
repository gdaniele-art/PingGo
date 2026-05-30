package com.gdaniele_art.pinggo.notification;

public record AlertNotification(
        AlertType alertType,
        String serviceKey,
        String subject,
        String emailBody,
        String slackMessage) {
}