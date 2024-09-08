import { useState } from "react";

export const useToggleList = <T>(initialList: T[] = []) => {
  const [list, setList] = useState(initialList);

  const toggle = (item: T) => {
    setList((currentList) => {
      if (currentList.includes(item)) {
        return currentList.filter((i) => i !== item);
      } else {
        return [...currentList, item];
      }
    });
  };

  return [list, toggle] as const;
};
