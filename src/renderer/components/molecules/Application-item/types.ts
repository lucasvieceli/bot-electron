import { ApplicationMenuItem } from '../../organisms/Applications-menu/types';

export interface ContainerImage {
    backgroundColor?: string;
}
export interface ApplicationItemProps {
    data: ApplicationMenuItem;
    onPress: () => void;
}
