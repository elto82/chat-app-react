import { horaMes } from "../helpers/horaMes";

export const OutgoingMessage = ({ msg }) => {
  return (
    <>
      {/* <!-- Mensaje enviado inicio --> */}
      <div className="outgoing_msg">
        <div className="sent_msg">
          <p>{msg.message}</p>
          <span className="time_date"> {horaMes(msg.createdAt)}</span>
        </div>
      </div>
      {/* <!-- Mensaje enviado inicio --> */}
    </>
  );
};
