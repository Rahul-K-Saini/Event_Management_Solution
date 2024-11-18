export type UserItems = {
    title: string;
    icon?: React.ReactNode;
    url?: string;
    submenu?: UserItems[];
};