import type { ChildrenProps } from "../../types/photo";
import style from "./GridItem.module.css";

export default function GridItem({ children }: ChildrenProps) {
  return <li className={style.item}>{children}</li>;
}
