import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import user from "../../Assets/Images/user.png";
import { useNavigate } from "react-router-dom";
//   import { StarIcon } from "@heroicons/react/24/solid";

export default function SharePostCard({ data, profileData }) {
  const navigate = useNavigate();
  const { text, image } = data;
  const { pimage, fname, lname, job, id } = profileData;
  return (
    <Card color="transparent" shadow={false} className="w-full max-w-[26rem]">
      <CardHeader
        onClick={() => navigate(`/profile/${id}`)}
        color="transparent"
        floated={false}
        shadow={false}
        className="mx-0 flex items-center gap-4 pb-3 mt-3 cursor-pointer"
      >
        <Avatar
          size="md"
          variant="circular"
          className="rounded-full"
          src={pimage || user}
          alt="User"
        />
        <div className="flex w-full flex-col gap-0.5">
          <div className="flex items-center justify-between">
            <Typography variant="h5" className=" text-base" color="blue-gray">
              {fname || ""} {lname || ""}
            </Typography>
          </div>
          <Typography variant="p" className="text-xs" color="blue-gray">
            {job ? `@${job}` : ""}
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="mb-2 p-0">
        <Typography> {text} </Typography>
        {
          image && 
          <div className="h-[250px]">
            <img className="w-full h-full object-cover" src={image}/>
          </div>
        }
      </CardBody>
    </Card>
  );
}
