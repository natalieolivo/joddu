import { navigate } from "@reach/router";
import config from "../config/index";

const ut = localStorage.getItem("ut");

const useProfileCheck = id => {
  let isUserWithProfile = false;

  if (id) {
    isUserWithProfile = true;
  }

  if (!ut) {
    navigate("/signin");
  }

  return isUserWithProfile;
};

export default useProfileCheck;
