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
    title: "Gtag",
    path: "/gtag",
  },
  {
    title: "Gsap",
    path: "/gsap",
  },
  {
    title: "P-Queue",
    path: "/p-queue",
  },
  {
    title: "EventBus",
    path: "/eventbus",
  },
  {
    title: "BookCover",
    path: "/book-cover",
  },
  {
    title: "PDFParse",
    path: "/pdf-parse",
  },
  {
    title: "Vue3Grammar",
    path: "/vue3-grammar",
  },
];
