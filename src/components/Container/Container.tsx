import styled from "./Container.module.css";
import type { ChildrenProps } from "../../types/photo";

export default function Container({ children }: ChildrenProps) {
  return <div className={styled.container}>{children}</div>;
}
