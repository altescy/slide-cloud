export interface ViewMode {
    mode: 'edit' | 'show';
}

export interface SlideNumber {
    h: number;  // holizontal number
    v: number;  // vertical number
}

export interface State {
    view_mode: ViewMode;
    editor_content: string;
    slide_number: SlideNumber;
}
