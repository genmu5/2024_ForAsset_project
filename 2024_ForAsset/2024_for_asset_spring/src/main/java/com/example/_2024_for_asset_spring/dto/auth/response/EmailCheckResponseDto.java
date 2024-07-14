package com.example._2024_for_asset_spring.dto.auth.response;

import com.example._2024_for_asset_spring.common.ResponseCode;
import com.example._2024_for_asset_spring.common.ResponseMessage;
import com.example._2024_for_asset_spring.dto.auth.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class EmailCheckResponseDto extends ResponseDto {

    private EmailCheckResponseDto() {
        super();
    }

    public static ResponseEntity<EmailCheckResponseDto> success() {
        EmailCheckResponseDto responseBody = new EmailCheckResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> duplicateEmail() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.DUPLICATED_EMAIL, ResponseMessage.DUPLICATE_EMAIL);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }
}
