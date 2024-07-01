package com.example._2024_for_asset_spring.controller;

import com.example._2024_for_asset_spring.service.ManagerChatService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
public class ManagerChatController {

    private ManagerChatService managerChatService;

    public ManagerChatController(ManagerChatService managerChatService) {
        this.managerChatService = managerChatService;
    }

    @GetMapping("/chat")
    public Mono<String> chat(@RequestParam String message) {
        return managerChatService.getGptResponse(message);
    }
}
