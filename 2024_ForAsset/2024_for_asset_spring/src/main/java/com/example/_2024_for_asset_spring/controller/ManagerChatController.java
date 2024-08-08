package com.example._2024_for_asset_spring.controller;

import com.example._2024_for_asset_spring.service.Manager.ManagerChatService;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Mono;

import java.io.IOException;

@RestController
public class ManagerChatController {

    private final ManagerChatService managerChatService;

    @Autowired
    public ManagerChatController(ManagerChatService managerChatService) {
        this.managerChatService = managerChatService;
    }

    @GetMapping("/chat")
    public Mono<String> chat(@RequestParam String message) {
        return managerChatService.getGptResponse(message);
    }

    @PostMapping("/upload")
    public Mono<ResponseEntity<String>> uploadPdfAndChat(@RequestParam("file") MultipartFile file) {
        try {
            // PDF 파일에서 텍스트 추출
            String text = extractTextFromPdf(file);

            String additionalText = "\n\n 앞에 보냈던 내용을 기반으로 운용보고 500자 향후 운용계획 500자 작성해줘";

            String textWithAdditional = text + additionalText;

            // 추출된 텍스트를 1000자씩 나누어 OpenAI API에 전송하고 응답 받기
            return managerChatService.getGptResponsesForLargeText(textWithAdditional)
                    .map(ResponseEntity::ok)
                    .defaultIfEmpty(ResponseEntity.badRequest().body("Failed to get response from API"));

        } catch (IOException e) {
            return Mono.just(ResponseEntity.badRequest().body("Failed to read PDF file: " + e.getMessage()));
        }
    }

    private String extractTextFromPdf(MultipartFile file) throws IOException {
        try (PDDocument document = PDDocument.load(file.getInputStream())) {
            PDFTextStripper pdfTextStripper = new PDFTextStripper();
            return pdfTextStripper.getText(document);
        }
    }
}