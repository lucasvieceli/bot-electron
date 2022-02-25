export enum ButtonType {
    DANGER = 'DANGER',
    SUCCESS = 'SUCCESS',
}
export type ButtonColor = { background: string; text: string };

export type ButtonColors = {
    [key in keyof typeof ButtonType]: ButtonColor;
};

export interface ButtonProps {
    type: ButtonType;
    text: string;
    isLoading?: boolean;
    onPress: () => void;
}

export type ContainerProps = {
    typeButton: ButtonType;
};
