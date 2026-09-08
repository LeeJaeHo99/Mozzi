import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiBody, ApiOperation } from '@nestjs/swagger';

export function ApiGetUserProfile(summary: string) {
    return applyDecorators(
        ApiOperation({ summary }),
        ApiOkResponse({
            schema: {
                example: {
                    isSuccess: true,
                    data: {
                        id: 'string',
                        createdAt: 'Date',
                        updatedAt: 'Date',
                        nickname: 'string',
                        hiddenNickname: 'string',
                        profileImgUrl: 'string',
                        hiddenProfileEmoji: 'string',
                        email: 'string',
                        birthday: 'Date',
                        description: 'string',
                        role: 'USER',
                        gender: 'MALE',
                    },
                    message: '요청이 성공적으로 처리되었습니다.',
                },
            },
        }),
    );
}

export function ApiSignUp(summary: string) {
    return applyDecorators(
        ApiOperation({ summary }),
        ApiBody({
            schema: {
                example: {
                    idToken: 'string',
                    nickname: 'string',
                    hiddenNickname: 'string',
                    profileImgUrl: 'string',
                    hiddenProfileEmoji: 'string',
                    description: 'string',
                    birthday: 'Date',
                    gender: 'MALE',
                }
            }
        }),
        ApiOkResponse({
            schema: {
                example: {
                    isSuccess: true,
                    data: {
                        id: 'string',
                        createdAt: 'Date',
                        updatedAt: 'Date',
                        nickname: 'string',
                        hiddenNickname: 'string',
                        profileImgUrl: 'string',
                        hiddenProfileEmoji: 'string',
                        email: 'string',
                        birthday: 'Date',
                        description: 'string',
                        role: 'USER',
                        gender: 'MALE',
                    },
                    message: '요청이 성공적으로 처리되었습니다.',
                },
            },
        }),
    );
}

export function ApiUpdateUserProfile(summary: string) {
    return applyDecorators(
        ApiOperation({ summary }),
        ApiBody({
            schema: {
                example: {
                    nickname: 'string',
                    hiddenNickname: 'string',
                    profileImgUrl: 'string',
                    hiddenProfileEmoji: 'string',
                    description: 'string',
                }
            }
        }),
        ApiOkResponse({
            schema: {
                example: {
                    isSuccess: true,
                    data: {
                        id: 'string',
                        createdAt: 'Date',
                        updatedAt: 'Date',
                        nickname: 'string',
                        hiddenNickname: 'string',
                        profileImgUrl: 'string',
                        hiddenProfileEmoji: 'string',
                        email: 'string',
                        birthday: 'Date',
                        description: 'string',
                        role: 'USER',
                        gender: 'MALE',
                    },
                    message: '요청이 성공적으로 처리되었습니다.',
                },
            },
        }),
    );
}