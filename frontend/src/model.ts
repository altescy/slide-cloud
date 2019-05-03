export type ModalType = 'signup' | 'signin' | 'addslide';
export type ViewMode = 'edit' | 'show';

export interface User {
    id: number;
    name: string;
}

export interface SigninInfo {
    username: string;
    password: string;
}

export interface SlideNumber {
    h: number;  // holizontal number
    v: number;  // vertical number
}

export interface Slide {
    id: number;
    user_id: number;
    access_token: string;
    public: boolean;
    name: string;
    content: string;
    created_at: string;
    updated_at: string;
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
    slides: Slide[];
}
