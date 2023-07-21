import { useState } from "react";
import { IComment } from "../types/comment";

const Comment = (props: IComment) => {
  const { ...comment } = props;

  const [isOpen, setIsOpen] = useState(false);

  const imgs = [
    { id: "2", src: "/mp.jpg" },
    { id: "1", src: "/mp.jpg" },
    { id: "3", src: "/mp.jpg" },
    { id: "4", src: "/mp.jpg" },
  ];
  function formatDateTime(dateTime: string): string {
    const dateDB = new Date(
      Number(dateTime.slice(0, 4)),
      Number(dateTime.slice(5, 7)) - 1,
      Number(dateTime.slice(8, 10))
    );

    const time = `${dateTime.slice(11, 13)}.${dateTime.slice(14, 16)} น.`;

    const date = dateDB.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return `${date} เวลา ${time}`;
  }

  return (
    <>
      <div className="flex flex-col gap-[2px] bg-white w-[800px]">
        <div>
          <img
            src="/threedot.svg"
            alt="threedt"
            className="threedot-mpdetail z-50 absolute ml-[750px]"
            onClick={() => setIsOpen(!isOpen)}
          />
          {isOpen && (
            <div className="w-[113px] h-[63px] bg-neutral-100 rounded-[5px] mt-[30px] ml-[670px] z-[100] absolute flex flex-col justify-evenly">
              <button className="flex ml-[2px]">
                <img src="/pencil.svg" />
                <p className="ml-[5px]">แก้ไขข้อมูล</p>
              </button>
              <hr />
              <button className="flex ml-[2px]">
                <img src="/trash.svg" />
                <p className="ml-[5px]">ลบข้อมูล</p>
              </button>
            </div>
          )}
        </div>
        <p className="subtopic-mpdetail pl-[18px] pt-[18px]">
          {"ผู้พบเห็น "}
          <span className="detail-mpdetail">
            {/* {comment.user.name} {comment.user.surname} */}
          </span>
        </p>
        <p className="subtopic-mpdetail pl-[18px]">
          {"วันที่พบเห็น "}
          <span className="detail-mpdetail">{comment.foundDatetime}</span>
        </p>
        <p className="subtopic-mpdetail pl-[18px]">
          {"สถานที่ "}
          <span className="detail-mpdetail">{comment.foundPlace}</span>
        </p>
        <p className="subtopic-mpdetail pl-[18px]">
          {"รายละเอียด "}
          <span className="detail-mpdetail">{comment.foundDetail}</span>
        </p>
        <div className="flex flex-row pl-[18px] gap-[4px] my-[10px]">
          {imgs.map((img) => {
            return (
              <img
                src={img.src}
                key={img.id}
                alt=""
                className="w-[100px] h-[100px] object-cover"
              />
            );
          })}
        </div>
        <p className="text-[12px] pl-[18px]">
          {`แจ้งเบาะแสเมื่อวันที่ {formatDateTime(comment.createdAt)}`}
          {comment.createdAt === comment.updatedAt ? null : (
            <span>{`(แก้ไขข้อมูลล่าสุดวันที่ {formatDateTime(
            comment.updatedAt
          )})`}</span>
          )}
        </p>
      </div>
    </>
  );
};

export default Comment;