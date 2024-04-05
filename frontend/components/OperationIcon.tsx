import { Operation } from "./FormFields";
import {
  BabyChangingStation,
  LocalCafe,
  RoomService,
  WaterDrop,
} from "@mui/icons-material";

type OperationIconProps = {
  value: Operation;
};
export default function OperationIcon({ value }: OperationIconProps) {
  switch (value) {
    case "BREAST_MILK":
      return <RoomService />;
    case "BOTTLE_FEEDING":
      return <WaterDrop />;
    case "MILK_POWDER":
      return <LocalCafe />;
    case "BIG_ONE":
      return "💩";
    case "LITTLE_ONE":
      return <BabyChangingStation />;
  }
}
