/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-template */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable prettier/prettier */
export const concatErrors = (err_res: any) => {
  const errs = err_res?.data?.data;
  // //no-console("errs === ",err_res?.data?.message)
  if (errs && Object.keys(errs).length > 0) {
    const err_key = Object.keys(errs);
    // //no-console("errs keys",err_key)
    let err_str = "";
    err_key.forEach((key) => {
      err_str +=
        " - " + key + ":" + errs[key].message;
      ("");
    });
    return err_str;
  }
  if (err_res?.data?.message) {
    return err_res?.data?.message;
  }
  if (err_res.message) return err_res.message;

  return err_res;
};
