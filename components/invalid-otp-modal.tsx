import ModalContainer from "./ui/modal-container";
import { Typography } from "./ui/typography";
import { Player } from "@lottiefiles/react-lottie-player";
import { useModal } from "./ui/modalcontext";
import { ReactNode } from "react";
const InvalidOTPModal = ({
  showModal,
  setCloseModal,
  InvalidAnimationUrl,
  modalMessage,
  modalHeader,
  buttonProps,
}: {
  showModal: any;
  setCloseModal: any;
  InvalidAnimationUrl?: string;
  modalMessage: string;
  modalHeader: string;
  buttonProps: ReactNode;
}) => {
  const defaultAnimationUrl = "animations/error-animation-url.json";
  return (
    <ModalContainer showModal={showModal} setCloseModal={setCloseModal}>
      <div className="rounded-t-xl text-center text-white">
        <Player
          src={InvalidAnimationUrl ? InvalidAnimationUrl : defaultAnimationUrl}
          autoplay
          keepLastFrame={true}
          className="w-28 h-28"
        />
      </div>
      <Typography size={"xl"} bold={"bold"} alignment={"horizontalCenter"}>
        {modalHeader}
      </Typography>
      <div className=" p-5 text-center">
        <Typography
          variant={"paragraph"}
          size={"sm"}
          alignment={"horizontalCenter"}
        >
          {modalMessage}
          {/* {notValidModalMessage} */}
        </Typography>
      </div>
      {buttonProps}
    </ModalContainer>
  );
};

export default InvalidOTPModal;
