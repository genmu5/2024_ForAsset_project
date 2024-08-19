//package com.example._2024_for_asset_spring.controller.customer;
//
//import com.example._2024_for_asset_spring.dto.customer.CreateChatRoomRequestDto;
//import com.example._2024_for_asset_spring.entity.spring.chat.ChatRoom;
//import com.example._2024_for_asset_spring.service.customer.ChatRoomService;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.Map;
//
//@RestController
//@RequestMapping("/api/chatrooms")
//public class ChatRoomController {
//
//    private final ChatRoomService chatRoomService;
//
//    public ChatRoomController(ChatRoomService chatRoomService) {
//        this.chatRoomService = chatRoomService;
//    }
//
//    @PostMapping
//    public ResponseEntity<?> createChatRoom(@RequestBody CreateChatRoomRequestDto request) {
//        ChatRoom chatRoom = chatRoomService.createChatRoom(request.getMemberEmail(), request.getTopic());
//        if (chatRoom != null) {
//            return ResponseEntity.ok().body(Map.of("chatRoomId", chatRoom.getId()));
//        } else {
//            return ResponseEntity.status(400).body("Member not found.");
//        }
//    }
//}
