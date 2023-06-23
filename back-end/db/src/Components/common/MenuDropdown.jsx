import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";

export default function MenuDropdown({ button, options, handleOption, arrow,itemClass, placement, classes }) {
  return (
    <Menu placement={placement}>
      <MenuHandler >
        <Button variant="text" className="text-gray-700 p-0">{button}</Button>
      </MenuHandler>
      <MenuList className={`z-10 overflow-visible relative left-0 p-0 ${classes}`}>
      {/* {
        arrow &&
        <div className="absolute -right-6 border-4">HH</div>
      } */}
        {options?.map((item) => {
          return <MenuItem className="px-4 hover:bg-gray-300 py-2 flex rounded-none"
          onClick={() => handleOption(item.name)} key={item?.name}>
          {item.icon && <img src={item.icon} className="w-6 mr-2"/>} 
          <span className={itemClass}>{item.name}</span> </MenuItem>;
        })}
        {/* <MenuItem>Menu Item 1</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <MenuItem>Menu Item 3</MenuItem> */}
      </MenuList>
    </Menu>
  );
}
