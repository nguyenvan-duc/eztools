import {
  TrashIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PencilIcon,
  CheckIcon,
} from "@heroicons/react/outline";
import React from "react";

const Item = ({
  id,
  desc,
  completed,
  handleDelete,
  handleCheck,
  dateCreated,
  handleEdit,
  dateCompleted
}) => {
  return (
    <div className="flex items-center justify-between border border-black bg-white w-full">
      <div className="flex flex-row w-full h-auto">
        <div className=" w-10 flex justify-center items-center py-3  ">
          <input
            checked={completed}
            onChange={() => handleCheck(desc, id, dateCreated)}
            onClick={() => handleCheck(desc, id, dateCreated)}
            id="candidates"
            name="candidates"
            type="checkbox"
            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
        </div>
        <div className=" w-9/12   ">
          <div className="px-2 py-2 text-lg">
            <p className={completed && "line-through italic"}>{desc}</p>
          </div>
          <div className="w-full px-2 py-1">
            <div className="text-sm text-gray-600">Thời gian tạo: {dateCreated}</div>
            {dateCompleted && (<div className="text-sm text-gray-600">Hoàn Thành: {dateCompleted}</div>)}
          </div>
        </div>
        <div className=" w-2/12  flex justify-center items-center ">
          <div className="flex justify-end">
            <button
              onClick={() => handleEdit(id)}
              className="mr-2 hover:text-orange-500 outline-none text-gray-500"
            >
              <PencilIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => handleDelete(id)}
              className="mr-2 hover:text-red-500 outline-none text-gray-500"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
            <div>
              <ChevronUpIcon className="h-3 w-3" />
              <ChevronDownIcon className="h-3 w-3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
