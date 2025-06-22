import React, { useState, useEffect, memo } from "react"; // هنا استورد useState و useEffect و memo
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import { BiTrash } from "react-icons/bi";
import { PiImageSquare } from "react-icons/pi";

function SortablePhoto({ id, photo, onRemove }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const [objectURL, setObjectURL] = useState("");

  useEffect(() => {
    const url = URL.createObjectURL(photo);
    setObjectURL(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [photo]);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative group"
    >
      <img
        src={objectURL || null}
        alt="property"
        className="aspect-square object-cover h-52 w-full rounded-lg shadow-md"
      />
      <button
        type="button"
        className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md hover:bg-gray-200"
        onClick={onRemove}
      >
        <BiTrash className="text-red-600" />
      </button>
    </div>
  );
}

// طبّق memo لتحسين الأداء (يعمل إعادة رسم فقط لو تغيرت props)
const MemoizedSortablePhoto = memo(SortablePhoto);

const UploadImage = ({ setPhotos, photos }) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleUploadPhotos = (e) => {
    const newPhotos = Array.from(e.target.files);
    const filesWithIds = newPhotos?.map((file) => ({
      id: crypto.randomUUID(),
      file,
    }));
    setPhotos((prev) => [...prev, ...filesWithIds]);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = photos.findIndex((photo) => photo.id === active.id);
      const newIndex = photos.findIndex((photo) => photo.id === over.id);
      setPhotos((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  const handleRemovePhoto = (id) => {
    setPhotos((prev) => prev.filter((photo) => photo.id !== id));
  };
  return (
    <div className="flexCol sl:flex-row gap-x-16 gap-y-3 mt-6">
      <h4 className="text-[16px] font-medium">
        Include images showcasing your property?
      </h4>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={photos?.map((p) => p.id)}
          strategy={rectSortingStrategy}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4 bg-gray-50 rounded-lg shadow-lg">
            {photos.length === 0 && (
              <>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleUploadPhotos}
                  multiple
                  id="imageUpload"
                  className="hidden"
                />
                <label
                  htmlFor="imageUpload"
                  className="group flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                >
                  <div className="h-29 w-full flexCenter">
                    <PiImageSquare className="text-6xl text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </div>
                  <p className="text-gray-500 group-hover:text-gray-700">
                    Upload from your device
                  </p>
                </label>
              </>
            )}
            {photos.length > 0 && (
              <>
                {photos?.map((photoObj) => (
                  <MemoizedSortablePhoto  
                    key={photoObj.id}
                    id={photoObj.id}
                    photo={photoObj.file}
                    onRemove={() => handleRemovePhoto(photoObj.id)}
                  />
                ))}
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleUploadPhotos}
                  multiple
                  id="imageUpload"
                  className="hidden"
                />
                <label
                  htmlFor="imageUpload"
                  className="group flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                >
                  <div className="h-29 w-full flexCenter">
                    <PiImageSquare className="text-6xl text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </div>
                  <p className="text-gray-500 group-hover:text-gray-700">
                    Upload more photos
                  </p>
                </label>
              </>
            )}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default UploadImage;
