package com.gdaniele_art.pinggo.exception;

public class NotFoundException extends RuntimeException{
    public NotFoundException (String msj){
        super(msj);
    }
}