// @/types/menu/menu.ts
export interface MenuItem {
    menu: string;
    icon?: string;
    child?: MenuItem[];
    show?: boolean;
    link?:string;
    module?:string;
}

export interface IMenuChildDropDown {
    item: MenuItem;
    parent?: boolean;
    position?: string;
    isOpen?: boolean;
}
export interface IMenuResponsive  {
   type?: string
   show?:boolean
}
