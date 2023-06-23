import { List, ListItem, Card } from "@material-tailwind/react";
import userIcon from "../../Assets/Images/user.png";

export default function ItemList({ item, user , handleListItem}) {
  const { id, pimage, fname, lname } = item || {};

  return (
    <Card className="border-none px-3 py-2 cursor-pointer" onClick={handleListItem}>
      {user ? (
        <div>
          <div
            className="flex items-center gap-2 flex-1"
            // onClick={() }
          >
            <img
              src={pimage || userIcon}
              alt=""
              className="w-[45px] h-[45px] rounded-full"
            />
            <span className="font-semibold text-[14px]">
              {`${fname} ${lname}`}
            </span>
          </div>
        </div>
      ) : (
        ""
      )}
    </Card>
  );
}
