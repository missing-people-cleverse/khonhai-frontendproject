import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { host } from "../constant";
import useUserProfile from "../hooks/useUserProfile";
import { toast } from "react-toastify";

const EditComment = ({ openComment, onClose, comment }: any) => {
  const { userProfile } = useUserProfile();
  const token = localStorage.getItem("token");

  const [foundDate, setfoundDate] = useState(dayjs());
  const [foundDetail, setFoundDetail] = useState<string>("");
  const [foundPlace, setFoundPlace] = useState<string>("");

  useEffect(() => {
    if (comment) {
      setFoundDetail(comment.foundDetail);
      setFoundPlace(comment.foundPlace);
      const foundDatetime = dayjs(comment.foundDatetime);
      setfoundDate(foundDatetime);
    }
  }, [comment]);

  const handleChangeFoundDate = (value: any) => {
    setfoundDate(value);
  };
  const handleChangeFoundDetail = (e: any) => {
    const value = e.target.value;
    setFoundDetail(value);
  };
  const handleChangeFoundPlace = (e: any) => {
    const value = e.target.value;
    setFoundPlace(value);
  };

  const handleEdit = async (e: any) => {
    e.preventDefault();
    try {
      await fetch(`${host}/comment/edit/${comment.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          foundPlace: foundPlace,
          foundDatetime: foundDate,
          foundDetail: foundDetail,
          img: comment.img,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("แก้ไขเบาะแสสำเร็จ");
      setTimeout(() => {
        window.location.reload();
      }, 1300);
    } catch (err) {
      toast.error("แก้ไขเบาะแสไม่สำเร็จ");
      console.log(err);
    }
  };

  return (
    <>
      {openComment && (
        <div
          className="modal-container"
          onClick={(e) => {
            e.stopPropagation();
            onClose;
          }}
        >
          <div className="bg-white h-[486px] w-[880px] rounded-[10px] ">
            <div className="bg-primary rounded-t-[10px]">
              <div className="flex justify-between">
                <div className="font-bold text-2xl text-text_light pt-[30px] pl-[40px] pb-[17px] ">
                  แก้ไขข้อมูลเบาะแสคนหาย
                </div>
                <img
                  src="/Close_round.svg"
                  className="mr-[20px] mb-[20px] cursor-pointer "
                  onClick={onClose}
                />
              </div>
            </div>
            <form onSubmit={handleEdit} encType="multipart/form-data">
              <div className="flex flex-col ml-[40px] mr-[40px] mt-[26px] gap-[12px]">
                <p className="subtopic-mpdetail text-black">
                  {"ผู้พบเห็น "}
                  <span>
                    {userProfile!.user.name} {userProfile!.user.surname}
                  </span>
                </p>

                <div
                  className="form-user"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <label>วันที่พบ</label>
                  <DatePicker
                    label="วันที่พบ"
                    value={foundDate}
                    onChange={handleChangeFoundDate}
                    className="w-[30%] z-[9000] max-md:w-[50%]"
                  />
                </div>
                <div className="form-user">
                  <label>สถานที่ที่พบ</label>
                  <input
                    type="text"
                    placeholder="สถานที่ที่พบ"
                    className="inputBox-user w-[90%]"
                    required
                    value={foundPlace}
                    onChange={handleChangeFoundPlace}
                  />
                </div>
                <div className="form-user">
                  <label>รายละเอียดเพิ่มเติม</label>
                  <input
                    type="text"
                    placeholder="รายละเอียดเพิ่มเติม"
                    className="inputBox-user w-[90%]"
                    required
                    value={foundDetail}
                    onChange={handleChangeFoundDetail}
                  />
                </div>
              </div>
              <div className="flex flex-row justify-center gap-[50px] mt-[30px]">
                <button className="btn-pink w-[80px]" type="submit">
                  แก้ไข
                </button>
                <button className="btn-grey w-[80px]" onClick={onClose}>
                  ยกเลิก
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditComment;
