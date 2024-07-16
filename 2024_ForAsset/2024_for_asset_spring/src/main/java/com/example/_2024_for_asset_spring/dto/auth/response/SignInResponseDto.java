package com.example._2024_for_asset_spring.dto.auth.response;

import com.example._2024_for_asset_spring.common.ResponseCode;
import com.example._2024_for_asset_spring.common.ResponseMessage;
import com.example._2024_for_asset_spring.dto.auth.ResponseDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class SignInResponseDto extends ResponseDto{

    private String accessToken;
    private int accessTokenExpiresIn;

    private SignInResponseDto(String accessToken) {
        super();
        this.accessToken = accessToken;
        this.accessTokenExpiresIn = 3600;
    }

    public static ResponseEntity<SignInResponseDto> success(String accessToken) {
        SignInResponseDto responseBody = new SignInResponseDto(accessToken);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> signInFail() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.SIGN_IN_FAIL, ResponseMessage.SIGN_IN_FAIL);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
    }
}
