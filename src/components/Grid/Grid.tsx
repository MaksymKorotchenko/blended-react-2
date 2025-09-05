import type { ChildrenProps } from "../../types/photo";
import style from "./Grid.module.css";

export default function Grid({ children }: ChildrenProps) {
  return <ul className={style.list}>{children}</ul>;
}
