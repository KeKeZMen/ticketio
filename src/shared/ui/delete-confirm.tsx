import { Button } from "@shared";
import { FC } from "react";

type PropsType = {
  onDelete: () => void;
  onClose: () => void;
};

export const DeleteConfirm: FC<PropsType> = ({ onDelete, onClose }) => {
  return (
    <div className="flex flex-col">
      <p className="uppercase font-bold text-center">
        Действительно хотите удалить элемент?
      </p>
      <div className="flex justify-between mt-5">
        <Button onClick={onClose} variant="outline">Отмена</Button>

        <Button variant={"destructive"} onClick={onDelete}>
          Удалить
        </Button>
      </div>
    </div>
  );
};
