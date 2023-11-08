export interface SidebarItem {
  id: string;
  sectionTitle?: string;
  name: string;
  icon: React.ReactNode;
  href: string;
  children?: SidebarItem[];
}
