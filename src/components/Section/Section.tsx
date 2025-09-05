import type { ChildrenProps } from "../../types/photo";
import style from "./Section.module.css";

export default function Section({ children }: ChildrenProps) {
  return <section className={style.section}>{children}</section>;
}
