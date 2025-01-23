export interface MenuItem {
    id: string;
    index: string;
    icon?: string;
    title: string;
    path?: string;
    children?: MenuItem[];
    permissions?: string[];
}

export interface MenuState {
    menus: MenuItem[];
    loading: boolean;
    error: string | null;
}
