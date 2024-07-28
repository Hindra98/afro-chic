import "../../../styles/components/_sidebar.scss"
import { useGlobalAppContext } from "../../../core/hooks/use-app-context";
import { useLocalizer } from "../../../core/Localization";
import SidebarItem from "./sidebar-item";

type Props = {
  open: boolean;
}
type Item = {
  name?: string;
  css?: string;
  link?: string;
  icon?: string;
  id?: string;
  title?: boolean;
  separate?: boolean;
  items?: Item[];
};

const Sidebar = ({ open }: Props) => {

  const commonLocalizer = useLocalizer("Common-ResCommon");

  const { claims } = useGlobalAppContext();
  const tenantId = claims?.get("tenantid");
  const role = claims?.get("role");

  let menus: Item[] = [
    {
      name: commonLocalizer("MODULE_COMMON_SIDEBAR_DASHBOARD"),
      title: true,
      css: "e-title",
      icon: "title-icons e-title " + commonLocalizer("MODULE_COMMON_SIDEBAR_DASHBOARD").charAt(0).toLowerCase(),
      id: "dashboard",
    },
    {
      name: commonLocalizer("MODULE_COMMON_SIDEBAR_DASHBOARD_OVERVIEW"),
      link: "/dashboard",
      icon: "e-icons chart-baricon-"
    },

    { name: "", icon: "", separate: true, css: "separate" },

    {
      name: commonLocalizer("MODULE_COMMON_SIDEBAR_MANGEMENT"),
      title: true,
      css: "e-title",
      icon: "e-icons e-title " + commonLocalizer("MODULE_COMMON_SIDEBAR_MANGEMENT").charAt(0).toLowerCase(),
      id: "management",
    }]

  if (role === 'SuperAdmin') {
    menus = [...menus, {
      name: commonLocalizer("MODULE_COMMON_SIDEBAR_TENANTS"),
      icon: "e-icons user-1icon- icon", link: '/tenants'
    }]
  }

  menus = [...menus, {
    name: commonLocalizer("MODULE_COMMON_SIDEBAR_AGENCIES"),
    icon: "e-icons buildingicon-", link: '/agencies'
  },
  {
    name: commonLocalizer("MODULE_COMMON_SIDEBAR_USERS"),
    icon: "e-icons usersicon- icon", link: '/users'
  },
  { name: "", icon: "", separate: true, css: "separate" },

  {
    name: commonLocalizer("MODULE_COMMON_SIDEBAR_PACKAGES"),
    title: true,
    css: "e-title",
    icon: "title-icons e-title " + commonLocalizer("MODULE_COMMON_SIDEBAR_PACKAGES").charAt(0).toLowerCase(),
    id: "package",
  },
  { name: commonLocalizer("MODULE_COMMON_SIDEBAR_PACKAGES_TRANSACTIONS"), link: "/", icon: "e-icons sort-alt-upicon- icon" },
  { name: commonLocalizer("MODULE_COMMON_SIDEBAR_NOTIFICATIONS"), icon: "e-icons comment-alt-1icon- icon", link: "/notifications" },
  { name: commonLocalizer("MODULE_COMMON_SIDEBAR_HISTORY"), icon: "e-icons historyicon- icon" },
  { name: commonLocalizer("MODULE_COMMON_SIDEBAR_OVERALL_STATUS"), icon: "e-icons eye-2icon- icon" },
  { name: commonLocalizer("MODULE_COMMON_SIDEBAR_PACKAGES_MAINTENANCE"), link: "/", icon: "e-icons cogsicon- icon" },

  {
    name: "Système",
    icon: "e-icons cog-5icon- icon",
    css: "setting",
    id: "setting",
    items: [
      {
        name: "Audit", icon: "e-icons cog-5icon- icon",
      },
      {
        name: commonLocalizer("MODULE_COMMON_NAVBAR_SETTINGS"), icon: "e-icons cog-5icon- icon", link: "/app-settings",
      },
    ],
  }
]
  return (
    <div className={`${open ? "open" : "close"} text-gray-100 sidebar`}>
      <div className={`sidebar-menu flex flex-col`}>
        {menus.map((menu, key) => (
          <SidebarItem menu={menu} open={open} key={key} />
        ))}
      </div>
    </div>
  );

}

export default Sidebar