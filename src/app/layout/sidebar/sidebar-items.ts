import { RouteInfo } from "./sidebar.metadata";
export const ROUTES: RouteInfo[] = [
  {
    path: "",
    title: "MAIN",
    moduleName: "",
    iconType: "",
    icon: "",
    class: "",
    groupTitle: true,
    badge: "",
    badgeClass: "",
    role: ["All"],
    submenu: [],
  },

  // Admin Modules
  {
    path: "/admin/users",
    title: "User Accounts",
    moduleName: "users",
    iconType: "feather",
    icon: "users",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_ADMIN"],
    submenu: [
    ],
  },

  {
    path: "/admin/roles",
    title: "User Roles",
    moduleName: "roles",
    iconType: "feather",
    icon: "user-check",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_ADMIN"],
    submenu: [],
  },
  
  {
    path: "/admin/privelege",
    title: "Add Privilege",
    moduleName: "roles",
    iconType: "feather",
    icon: "user-check",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_ADMIN"],
    submenu: [],
  },
  {
    path: "/property/dashboard/dashboard",
    title: "Dashboard",
    moduleName: "processing",
    iconType: "feather",
    icon: "monitor",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_AGENT", "ROLE_LANDLORD"],
    submenu: [],
  },
  // {
  //   path: "/propertyConfiguration/property-config",
  //   title: "Property Configuration",
  //   moduleName: "configuration",
  //   iconType: "feather",
  //   icon: "activity",
  //   class: "",
  //   groupTitle: false,
  //   badge: "",
  //   badgeClass: "",
  //   role: ["ROLE_AGENT", "ROLE_LANDLORD"],
  //   submenu: [],
  // },
  // {
  //   path: "/property/main",
  //   title: "Property Management",
  //   moduleName: "property",
  //   iconType: 'feather',
  //   icon: 'home',
  //   class: '',
  //   groupTitle: false,
  //   badge: '',
  //   badgeClass: '',
  //   role: ["ROLE_AGENT", "ROLE_LANDLORD"],
  //   submenu: []
  // },
  {
    path: "/tenants/meter",
    title: "Water Configuration",
    moduleName: "tenants",
    iconType: "feather",
    icon: "divide",
    class: '',
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_AGENT", "ROLE_LANDLORD"],
    submenu: []
  },

 
  {
    path: "/leasing/lease",
    title: "Members",
    moduleName: "lease",
    iconType: "feather",
    icon: "server",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_AGENT", "ROLE_LANDLORD"],
    submenu: [],
  },
  {
    path: "/billing/main",
    title: "Bill Management",
    moduleName: "billing",
    iconType: "feather",
    icon: "briefcase",
    class: '',
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_AGENT", "ROLE_LANDLORD"],
    submenu: [
    ]
  },
  


];