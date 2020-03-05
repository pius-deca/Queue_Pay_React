import React, { useContext } from "react";
import { authContext } from "../../auth-context/authProvider";

const Success = () => {
  const { success_msg } = useContext(authContext);
  console.log(success_msg);
  return (
    <div>
      <h1>{success_msg}</h1>
      <div>Successfully registered</div>
    </div>
  );
};

export default Success;
