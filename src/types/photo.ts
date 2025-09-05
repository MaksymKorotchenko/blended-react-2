import type React from "react";

export interface Photo {
  id: number;
  avg_color: string;
  alt: string;
  src: {
    original: string;
    large: string;
  };
}

export interface ChildrenProps {
  children: React.ReactNode;
}
