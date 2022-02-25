import { IsNotEmpty, IsString, MinLength, NotEquals } from 'class-validator';
import { MIN_LENGTH, NOT_EMPTY } from '../util/msg-error';

export class AccountCreate {
    @IsNotEmpty({ message: NOT_EMPTY })
    @IsString()
    @MinLength(3, { message: MIN_LENGTH })
    name: string;

    @IsNotEmpty({ message: NOT_EMPTY })
    @IsString()
    @MinLength(3, { message: MIN_LENGTH })
    metamaskId: string;

    @IsNotEmpty({ message: NOT_EMPTY })
    @IsString()
    @NotEquals(null)
    @MinLength(3, { message: MIN_LENGTH })
    user: string;

    @IsNotEmpty({ message: NOT_EMPTY })
    @IsString()
    @MinLength(3, { message: MIN_LENGTH })
    password: string;
}
