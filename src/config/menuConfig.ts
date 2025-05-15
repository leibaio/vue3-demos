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
    title: "TabA",
    path: "/tab-a",
  },
  {
    title: "TabB",
    path: "/tab-b",
  },
  {
    title: "VirtualList",
    path: "/virtual-list",
  },
  {
    title: "Threejs",
    path: "/threejs",
  },
  {
    title: "Gsap",
    path: "/gsap",
  },
];
