interface MenuItem {
  title: string;
  src: string;
  gap?: boolean; // Optional property for spacing
}

const Sidebar = ({
  open,
  setOpen,
  menus,
  onMenuClick,
}: {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  menus: MenuItem[];
  onMenuClick?: (title: string) => void;
}) => {
  const handleClick = (menu: MenuItem) => {
    setOpen(false); // Close sidebar on click (optional)
    if (onMenuClick) {
      onMenuClick(menu.title); // Call the provided onMenuClick function
    }
  };
  return (
    <div
      className={` ${
        open ? "w-72" : "w-20 "
      } bg-dark-purple h-screen p-5 pt-8 relative duration-300`}
    >
      <img
        src="./src/assets/control.png"
        className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
                   border-2 rounded-full ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
      />
      <div className="flex gap-x-4 items-center">
        <img
          src="./src/assets/Biblo.png"
          className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
        />
        <h1
          className={`text-white origin-left font-medium text-xl duration-200 ${
            !open && "scale-0"
          }`}
        >
          Designer
        </h1>
      </div>
      <ul className="pt-6">
        {menus.map((menu, index) => (
          <li
            key={index}
            className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4
                       ${menu.gap ? "mt-9" : "mt-2"} ${
              index === 0 && "bg-light-white"
            } `}
            onClick={() => handleClick(menu)}
          >
            <img src={`./src/assets/${menu.src}.png`} />
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              {menu.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
