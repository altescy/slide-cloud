export type ModalType = 'signup' | 'signin';

export interface User {
    id: number;
    name: string;
}

export interface SigninInfo {
    username: string;
    password: string;
}

export interface ViewMode {
    mode: 'edit' | 'show';
}

export interface SlideNumber {
    h: number;  // holizontal number
    v: number;  // vertical number
}

export interface State {
    user: User | null;
    hasSigninError: boolean;
    hasSignupError: boolean;
    isModalOpen: boolean;
    modalType: ModalType;
    view_mode: ViewMode;
    editor_content: string;
    slide_number: SlideNumber;
}
