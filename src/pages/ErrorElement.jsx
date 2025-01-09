import { useRouteError } from "react-router-dom";

const ErrorElement = () => {
  const error = useRouteError();

  return <div>{error.message}</div>;
};
export default ErrorElement;
