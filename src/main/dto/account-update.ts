import { IsNotEmpty, IsString, MinLength, NotEquals, IsOptional } from 'class-validator';
import { MIN_LENGTH, NOT_EMPTY } from '../util/msg-error';

export class AccountUpdate {
    @IsNotEmpty({ message: NOT_EMPTY })
    @IsString()
    @IsOptional()
    @MinLength(3, { message: MIN_LENGTH })
    name: string;

    @IsNotEmpty({ message: NOT_EMPTY })
    @IsString()
    @IsOptional()
    @MinLength(3, { message: MIN_LENGTH })
    metamaskId: string;

    @IsNotEmpty({ message: NOT_EMPTY })
    @IsString()
    @IsOptional()
    @NotEquals(null)
    @MinLength(3, { message: MIN_LENGTH })
    user: string;

    @IsNotEmpty({ message: NOT_EMPTY })
    @IsString()
    @IsOptional()
    @MinLength(3, { message: MIN_LENGTH })
    password: string;
}
