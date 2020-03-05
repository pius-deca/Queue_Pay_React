import React, { useContext } from "react";
import { authContext } from "../../auth-context/authProvider";

const Success = () => {
  const { success_msg } = useContext(authContext);
  console.log(success_msg);
  return (
    <div>
      <h3>{success_msg}</h3>
    </div>
  );
};

export default Success;
