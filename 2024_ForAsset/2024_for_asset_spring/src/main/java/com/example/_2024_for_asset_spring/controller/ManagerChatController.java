package com.example._2024_for_asset_spring.controller;

import com.example._2024_for_asset_spring.service.ManagerChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
public class ManagerChatController {

    @Autowired
    private ManagerChatService managerChatService;

    @GetMapping("/chat")
    public Mono<String> chat(@RequestParam String message) {
        return managerChatService.getGptResponse(message);
    }
}
