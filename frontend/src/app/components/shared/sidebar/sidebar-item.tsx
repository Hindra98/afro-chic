import React from "react";

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

const SidebarItem: React.FC<{menu:Item, open:boolean}> = ({menu, open}) => {

  const handleClick = (link: string) => {
    if (link) window.location.href = link;
  }

  return (
    <div
      className={`${menu?.css} menu-item group flex items-start justify-between text-sm gap-3.5 font-medium`}
      id={menu?.id}
    >
      <div className={`flex flex-row justify-between gap-5 p-3 w-full ${menu?.link ? "cursor-pointer" : "cursor-default"}`} title={menu?.name} onClick={()=>handleClick(menu?.link)}>
        <div className="flex flex-row gap-3.5 items-center justify-start">
          <span className={`icon ${menu?.icon}`}></span>
          <div
            className={`whitespace-pre duration-500 item-name ${!open && "opacity-0 -translate-x-28 overflow-hidden"}`}>
            {menu?.name}
          </div>
        </div>
        <div
          className={`arrow duration-500 flex justify-end ${
            !open && "opacity-0 -translate-x-28 overflow-hidden"
          }`}
        >
          {menu.items && (
            <span className={`icon right-open-5icon-`}></span>
          )}
        </div>
      </div>

      {menu?.items?.length > 0 && (
        <div
          className={`${
            open ? "group-hover:left-[270px]" : "group-hover:left-[50px]"
          } group-menu-item absolute top-auto font-semibold whitespace-pre rounded-sm drop-shdow-lg p-0 h-0 w-0 overflow-hidden group-hover:duration-300 group-hover:w-fit group-hover:h-fit`}
        >
          {(menu?.items ?? []).map((item, keys) => (
            <SidebarItem menu={item} open={true} key={keys} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarItem;
