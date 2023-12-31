interface IService {
  name: string;
  link?: string;
  phoneNumber: string;
}

const ServiceCard = (props: IService) => {
  return (
    <>
      <div className="w-[17rem] h-[7rem] flex flex-col rounded-[10px] bg-bg_light_grey border-b-[3px] border-b-bg_light_grey  hover:border-b-[3px] hover:border-b-primary">
        <a
          href={props.link}
          className="text-black text-center text-lg font-semibold mt-5 px-5 underline underline-offset-2 decoration-1"
          target="_blank"
        >
          {props.name}
        </a>
        <p className="text-black text-center text-base not-italic font-normal mt-2">
          {props.phoneNumber}
        </p>
      </div>
    </>
  );
};

export default ServiceCard;
