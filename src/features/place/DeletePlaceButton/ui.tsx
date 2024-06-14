"use client";

import React, { FC, useState } from "react";
import { deletePlace } from "./api";
import { useRouter } from "next/navigation";
import { DeleteConfirm, Dialog, DialogContent } from "@shared";
import toast from "react-hot-toast";
import { RxCross1 } from "react-icons/rx";

type PropsType = {
  placeId: number;
};

export const DeletePlaceButton: FC<PropsType> = ({ placeId }) => {
  const router = useRouter();
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const handleModal = () => setIsOpenedModal((prev) => !prev);
  const onClose = () => setIsOpenedModal(false);

  const handleDelete = async () => {
    const res = await deletePlace(placeId);
    if (res.data?.message) {
      toast.success(res.data.message);
      router.refresh();
    } else if (res.error?.message) {
      toast.error(res.error.message);
    }
    onClose();
  };

  return (
    <>
      <button className="text-2xl" onClick={handleModal}>
        <RxCross1 />
      </button>

      <Dialog open={isOpenedModal} onOpenChange={handleModal}>
        <DialogContent>
          <DeleteConfirm onClose={handleModal} onDelete={handleDelete} />
        </DialogContent>
      </Dialog>
    </>
  );
};
