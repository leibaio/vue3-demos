interface MenuItem {
  title: string;
  path: string;
  icon?: string;
  children?: MenuItem[];
}

export const menuItems: MenuItem[] = [
  {
    title: "Home",
    path: "/home",
  },
  {
    title: "Add",
    path: "/add",
  },
  {
    title: "MouseLight",
    path: "/mouse-light",
  },
  {
    title: "Communication",
    path: "/communication",
  },
  {
    title: "Canvas",
    path: "/canvas",
  },
  {
    title: "Gsap",
    path: "/gsap",
  },
];
