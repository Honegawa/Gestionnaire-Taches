export const priorityFromNum = (num: number): string => {
  let res = "";

  switch (num) {
    case 1:
      res = "Urgent";
      break;
    case 2:
      res = "Important";
      break;
    case 3:
      res = "Delegable";
      break;
    case 4:
      res = "Optionnel";
      break;

    default:
      break;
  }

  return res;
};
